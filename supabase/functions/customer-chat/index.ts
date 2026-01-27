import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are Maya, Mapett Logistics' friendly AI customer service assistant. You help customers with:

1. **Logistics Services**: Air freight, ocean freight, road transport, warehousing, and customs clearance across Kenya and East Africa.

2. **Marketplace Products**: Automotive lubricants (engine oils, hydraulic oils), coolants, greases, vehicle batteries, and accessories. Prices are in Kenya Shillings (KES).

3. **Company Info**:
   - Location: Mombasa Road, Industrial Area, Nairobi, Kenya
   - Phone: +254 700 000 000
   - Email: info@mapettlogistics.com
   - Hours: Mon-Fri 8AM-6PM, Sat 9AM-2PM
   - Free delivery on orders above KES 5,001

4. **Social Media**:
   - Facebook: facebook.com/profile.php?id=61584459897045
   - Instagram: @mapettlogisticsltd
   - YouTube: @MapettLogisticsLtd
   - TikTok: @mapettlogisticsltd

Be helpful, professional, and friendly. Keep responses concise. If you don't know something specific, offer to connect them with our human support team via WhatsApp at +254 700 000 000.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
