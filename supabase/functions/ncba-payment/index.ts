import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NCBA_BASE_URL = "https://c2bapis.ncbagroup.com";

async function getNcbaToken(): Promise<string> {
  const username = Deno.env.get("NCBA_API_USERNAME")!;
  const password = Deno.env.get("NCBA_API_PASSWORD")!;
  const credentials = btoa(`${username}:${password}`);

  const res = await fetch(`${NCBA_BASE_URL}/payments/api/v1/auth/token`, {
    method: "GET",
    headers: { Authorization: `Basic ${credentials}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`NCBA token error: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;
    const body = await req.json();
    const { action } = body;

    // Service role client for DB writes
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (action === "stk-push") {
      const { phone, amount, orderId, accountNo } = body;

      if (!phone || !amount) {
        return new Response(JSON.stringify({ error: "Phone and amount are required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Format phone to 254XXXXXXXXX
      let formattedPhone = phone.replace(/\s+/g, "").replace(/^0/, "254").replace(/^\+/, "");
      if (!formattedPhone.startsWith("254")) {
        formattedPhone = "254" + formattedPhone;
      }

      const ncbaToken = await getNcbaToken();
      const paybill = Deno.env.get("NCBA_PAYBILL_NUMBER")!;

      const stkPayload = {
        TelephoneNo: formattedPhone,
        Amount: String(amount),
        PayBillNo: paybill,
        AccountNo: accountNo || orderId || "PAYMENT",
        Network: "Safaricom",
        TransactionType: "CustomerPayBillOnline",
      };

      const stkRes = await fetch(`${NCBA_BASE_URL}/payments/api/v1/stk-push/initiate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ncbaToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stkPayload),
      });

      const stkData = await stkRes.json();

      // Save payment transaction
      const { data: payment, error: paymentError } = await supabaseAdmin
        .from("payment_transactions")
        .insert({
          order_id: orderId || null,
          user_id: userId,
          amount,
          phone_number: formattedPhone,
          payment_method: "mpesa_stk",
          ncba_transaction_id: stkData.TransactionID || null,
          ncba_reference_id: stkData.ReferenceID || null,
          status: stkData.StatusCode === "0" ? "initiated" : "failed",
          status_description: stkData.StatusDescription || null,
        })
        .select()
        .single();

      if (paymentError) {
        console.error("Payment insert error:", paymentError);
      }

      return new Response(
        JSON.stringify({
          success: stkData.StatusCode === "0",
          transactionId: stkData.TransactionID,
          referenceId: stkData.ReferenceID,
          statusDescription: stkData.StatusDescription,
          paymentId: payment?.id,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "query") {
      const { transactionId, paymentId } = body;

      if (!transactionId) {
        return new Response(JSON.stringify({ error: "TransactionID is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const ncbaToken = await getNcbaToken();

      const queryRes = await fetch(`${NCBA_BASE_URL}/payments/api/v1/stk-push/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ncbaToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ TransactionID: transactionId }),
      });

      const queryData = await queryRes.json();

      // Update payment status
      if (paymentId) {
        const newStatus = queryData.status === "SUCCESS" ? "completed" : 
                          queryData.status === "FAILED" ? "failed" : "pending";
        await supabaseAdmin
          .from("payment_transactions")
          .update({ status: newStatus, status_description: queryData.description })
          .eq("id", paymentId);

        // If payment succeeded, update the order status
        if (newStatus === "completed") {
          const { data: payment } = await supabaseAdmin
            .from("payment_transactions")
            .select("order_id")
            .eq("id", paymentId)
            .single();

          if (payment?.order_id) {
            await supabaseAdmin
              .from("orders")
              .update({ status: "confirmed" })
              .eq("id", payment.order_id);
          }
        }
      }

      return new Response(
        JSON.stringify({
          status: queryData.status,
          description: queryData.description,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "qr-code") {
      const { amount } = body;
      const ncbaToken = await getNcbaToken();
      const till = Deno.env.get("NCBA_TILL_CODE")!;

      const qrPayload: Record<string, unknown> = { till };
      if (amount) qrPayload.amount = Number(amount);

      const qrRes = await fetch(`${NCBA_BASE_URL}/payments/api/v1/qr/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ncbaToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qrPayload),
      });

      const qrData = await qrRes.json();

      return new Response(
        JSON.stringify({
          success: qrData.StatusCode === "0",
          qrCode: qrData.Base64QrCode,
          statusDescription: qrData.StatusDescription,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("NCBA Payment Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
