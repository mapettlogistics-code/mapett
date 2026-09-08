import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Campaign {
  id: string;
  name: string;
  type: string;
  subject: string | null;
  content: string;
  status: string;
}

// Resend allows up to 100 recipients per batch send request
const BATCH_SIZE = 100;

const chunk = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "Email service not configured" }), { status: 500, headers: corsHeaders });
  }

  try {
    const { campaignId } = await req.json();
    if (!campaignId) {
      return new Response(JSON.stringify({ error: "campaignId is required" }), { status: 400, headers: corsHeaders });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: campaign, error: campaignError } = await supabase
      .from("marketing_campaigns")
      .select("*")
      .eq("id", campaignId)
      .maybeSingle<Campaign>();

    if (campaignError || !campaign) {
      return new Response(JSON.stringify({ error: "Campaign not found" }), { status: 404, headers: corsHeaders });
    }

    if (campaign.type !== "email") {
      return new Response(JSON.stringify({ error: "Only email campaigns can be sent via this function" }), { status: 400, headers: corsHeaders });
    }

    const { data: subscribers, error: subscribersError } = await supabase
      .from("subscribers")
      .select("email, name")
      .eq("subscribed", true);

    if (subscribersError) {
      console.error("Subscriber fetch error:", subscribersError);
      return new Response(JSON.stringify({ error: "Failed to load subscribers" }), { status: 500, headers: corsHeaders });
    }

    const recipients = subscribers || [];
    if (recipients.length === 0) {
      return new Response(JSON.stringify({ error: "No subscribed contacts to send to" }), { status: 400, headers: corsHeaders });
    }

    const subject = campaign.subject || campaign.name;
    const htmlBody = campaign.content.replace(/\n/g, "<br>");

    for (const batch of chunk(recipients, BATCH_SIZE)) {
      const payload = batch.map((recipient) => ({
        from: "Mapett Logistics <enquiries@mapettlogistics.com>",
        to: recipient.email,
        subject,
        html: `<p>Hi ${recipient.name || "there"},</p>${htmlBody}<hr/><p style="font-size:12px;color:#888">You are receiving this because you opted in on mapettlogistics.com. Reply STOP or contact sales@mapettlogistics.com to unsubscribe.</p>`,
      }));

      const response = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Resend batch send error:", error);
        return new Response(JSON.stringify({ error: "Failed to send campaign" }), { status: 500, headers: corsHeaders });
      }
    }

    const { error: updateError } = await supabase
      .from("marketing_campaigns")
      .update({ status: "sent", sent_at: new Date().toISOString(), recipient_count: recipients.length })
      .eq("id", campaignId);

    if (updateError) {
      console.error("Campaign update error:", updateError);
    }

    return new Response(
      JSON.stringify({ success: true, recipientCount: recipients.length }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: corsHeaders });
  }
});
