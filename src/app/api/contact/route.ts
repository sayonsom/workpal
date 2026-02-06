import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, company, role, inquiryType, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Workpal Contact <onboarding@resend.dev>",
      to: "chanda.sayonsom@gmail.com",
      replyTo: email,
      subject: `[Workpal Contact] ${inquiryType || "General"} from ${name}`,
      html: `
        <div style="font-family: Lato, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1D1C1D; margin-bottom: 24px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13); width: 140px;">Name</td>
              <td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">Email</td>
              <td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${company ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">Company</td><td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">${company}</td></tr>` : ""}
            ${role ? `<tr><td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">Role</td><td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">${role}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">Inquiry Type</td>
              <td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">${inquiryType || "General"}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #F8F8F8; border-radius: 8px;">
            <p style="font-weight: bold; color: #1D1C1D; margin: 0 0 8px 0;">Message</p>
            <p style="color: #1D1C1D; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
