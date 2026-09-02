import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "inquiry" | "quote"; // inquiry for contact/send inquiry, quote for request a quote
  category?: "services" | "insurance" | "travel"; // for quote forms
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  details?: Record<string, any>;
}

const handler = async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const emailRequest: EmailRequest = await req.json();

    // Validate required fields
    if (!emailRequest.name || !emailRequest.email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Format the email content based on type
    let htmlContent = "";
    let subject = "";

    if (emailRequest.type === "inquiry") {
      subject = `New Inquiry from ${emailRequest.name}`;
      htmlContent = `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${emailRequest.name}</p>
        <p><strong>Email:</strong> ${emailRequest.email}</p>
        ${emailRequest.phone ? `<p><strong>Phone:</strong> ${emailRequest.phone}</p>` : ""}
        ${emailRequest.company ? `<p><strong>Company:</strong> ${emailRequest.company}</p>` : ""}
        ${emailRequest.service ? `<p><strong>Service:</strong> ${emailRequest.service}</p>` : ""}
        ${emailRequest.message ? `<p><strong>Message:</strong><br/>${emailRequest.message.replace(/\n/g, "<br>")}</p>` : ""}
        <hr/>
        <p><em>This inquiry was submitted through the Mapett Logistics website.</em></p>
      `;
    } else if (emailRequest.type === "quote") {
      subject = `New Quote Request - ${emailRequest.category || "General"} from ${emailRequest.name}`;
      htmlContent = `
        <h2>New Quote Request Received</h2>
        <p><strong>Category:</strong> ${emailRequest.category || "General"}</p>
        <p><strong>Name:</strong> ${emailRequest.name}</p>
        <p><strong>Email:</strong> ${emailRequest.email}</p>
        ${emailRequest.phone ? `<p><strong>Phone:</strong> ${emailRequest.phone}</p>` : ""}
        ${emailRequest.company ? `<p><strong>Company:</strong> ${emailRequest.company}</p>` : ""}
        ${emailRequest.service ? `<p><strong>Service/Product:</strong> ${emailRequest.service}</p>` : ""}
        ${emailRequest.message ? `<p><strong>Details:</strong><br/>${emailRequest.message.replace(/\n/g, "<br>")}</p>` : ""}
        ${emailRequest.details ? `<p><strong>Additional Info:</strong><br/>${JSON.stringify(emailRequest.details, null, 2).replace(/\n/g, "<br>")}</p>` : ""}
        <hr/>
        <p><em>This quote request was submitted through the Mapett Logistics website.</em></p>
      `;
    }

    // Send email using Resend API
    if (RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Mapett Logistics Enquiries <enquiries@mapettlogistics.com>",
          to: "sales@mapettlogistics.com",
          reply_to: emailRequest.email,
          subject: subject,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Resend API error:", error);
        return new Response(
          JSON.stringify({ error: "Failed to send email" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Also store in database for record keeping
      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { error: dbError } = await supabase.from("inquiries").insert({
          name: emailRequest.name,
          email: emailRequest.email,
          phone: emailRequest.phone || null,
          company: emailRequest.company || null,
          type: emailRequest.type,
          category: emailRequest.category || null,
          service: emailRequest.service || null,
          message: emailRequest.message || null,
          details: emailRequest.details || null,
          created_at: new Date().toISOString(),
        });

        if (dbError) {
          console.error("Database error:", dbError);
        }
      }

      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
};

serve(handler);
