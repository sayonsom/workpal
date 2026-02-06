import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, company, meetingType, timezone, date, time, notes } =
      body;

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Name, email, date, and time are required." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Workpal Booking <onboarding@resend.dev>",
      to: "chanda.sayonsom@gmail.com",
      replyTo: email,
      subject: `[Workpal Booking] Call request from ${name} \u2014 ${date} at ${time}`,
      html: `
        <div style="font-family: Lato, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1D1C1D; margin-bottom: 8px;">New Call Booking Request</h2>
          <p style="color: rgba(29,28,29,0.70); margin: 0 0 24px 0;">30-minute Discovery Call</p>
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
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">Meeting Type</td>
              <td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">${meetingType || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">Timezone</td>
              <td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">${timezone || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">Date</td>
              <td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">Time</td>
              <td style="padding: 8px 12px; color: #1D1C1D; border-bottom: 1px solid rgba(29,28,29,0.13);">${time}</td>
            </tr>
          </table>
          ${
            notes
              ? `<div style="margin-top: 24px; padding: 16px; background: #F8F8F8; border-radius: 8px;">
            <p style="font-weight: bold; color: #1D1C1D; margin: 0 0 8px 0;">Notes</p>
            <p style="color: #1D1C1D; margin: 0; white-space: pre-wrap;">${notes}</p>
          </div>`
              : ""
          }
          <div style="margin-top: 24px; padding: 12px 16px; background: #007A5A; border-radius: 6px; text-align: center;">
            <p style="color: white; margin: 0; font-weight: bold;">Action required: Send calendar invite to ${email}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send booking request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
