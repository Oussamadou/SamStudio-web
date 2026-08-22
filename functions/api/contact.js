// Cloudflare Pages Serverless Function: /api/contact
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { name, contact, service, lang } = body;

    if (!contact || !name) {
      return new Response(JSON.stringify({ error: "Name and Contact (Email/WhatsApp) are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resendApiKey = env.RESEND_API_KEY;
    const targetInbox = env.NOTIFICATION_EMAIL || "contact@samstudio.agency";

    // Demo mode fallback if API key is not yet set
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY environment variable not set. Running in development/demo mode.");
      return new Response(JSON.stringify({
        success: true,
        mode: "mock",
        message: "Strategy session request received in demo mode. Set RESEND_API_KEY in Cloudflare Pages for live email delivery."
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Compose HTML Email for Strategy Meeting Request
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #09090B; color: #FAFAFA; padding: 24px; border-radius: 12px; border: 1px solid #6366F1;">
        <h2 style="color: #818CF8; margin-bottom: 8px;">🚀 New Strategy Session Request — SamStudio</h2>
        <p style="color: #A1A1AA; font-size: 14px;">A new client has scheduled an agency strategy consultation.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Client / Company:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #FFFFFF; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Email / WhatsApp:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #E5C158; font-weight: bold;">${contact}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Selected Service:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #818CF8; font-weight: bold;">${service || "Complete Hybrid Retainer"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #A1A1AA;"><strong>Language:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #27272A; color: #FFFFFF;">${lang || "EN"}</td>
          </tr>
        </table>
        
        <p style="margin-top: 24px; font-size: 12px; color: #71717A;">Sent automatically via SamStudio Agency Portal.</p>
      </div>
    `;

    // Dispatch email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SamStudio Strategy <onboarding@resend.dev>",
        to: [targetInbox],
        subject: `🚀 New Strategy Request: ${name} (${service || "Agency Consultation"})`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(resendData.message || "Failed to dispatch email via Resend");
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
