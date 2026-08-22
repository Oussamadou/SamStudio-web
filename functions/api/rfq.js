// Cloudflare Pages Serverless Function: /api/rfq
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { product, quantity, country, contact, notes, lang } = body;

    if (!contact) {
      return new Response(JSON.stringify({ error: "Contact information (Email/WhatsApp) is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resendApiKey = env.RESEND_API_KEY;
    const targetInbox = env.NOTIFICATION_EMAIL || "contact@samstudio.agency";

    // If Resend API Key is not yet configured, provide helpful mock success
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY environment variable not set. Running in development/demo mode.");
      return new Response(JSON.stringify({
        success: true,
        mode: "mock",
        message: "RFQ received in demo mode. Configure RESEND_API_KEY in Cloudflare Pages to send real emails."
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Compose HTML Email for B2B RFQ
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #09090B; color: #FAFAFA; padding: 24px; border-radius: 12px; border: 1px solid #E5C158;">
        <h2 style="color: #E5C158; margin-bottom: 8px;">🇹🇷 Official B2B Export RFQ — SamStudio Portal</h2>
        <p style="color: #A1A1AA; font-size: 14px;">An international buyer has generated an official Request for Quote (RFQ) for Turkish goods.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Target Product:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #FFFFFF; font-weight: bold;">${product || "Custom Turkish Sourcing"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Order Quantity:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #10B981; font-weight: bold;">${quantity || "Negotiable"} units</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Destination Country:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #FFFFFF;">${country || "Global Export"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Buyer Email / WhatsApp:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #E5C158; font-weight: bold;">${contact}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Customization Notes:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #D4D4D8;">${notes || "No custom notes provided."}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Language:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #FFFFFF;">${lang || "EN"}</td>
          </tr>
        </table>
        
        <p style="margin-top: 24px; font-size: 12px; color: #71717A;">Sent automatically via SamStudio Turkish B2B Export Gateway.</p>
      </div>
    `;

    // Dispatch email through Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SamStudio B2B Export <onboarding@resend.dev>",
        to: [targetInbox],
        subject: `🇹🇷 New B2B RFQ: ${product} (${quantity} units to ${country})`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(resendData.message || "Failed to dispatch RFQ via Resend");
    }

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
