import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, phone, subject, message } = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ error: "שדות חובה חסרים" }, { status: 400 });
  }

  // If SMTP not configured, just return success (for development/demo)
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("📧 Contact form submission (SMTP not configured):", { name, phone, subject, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"אתר מתווך בית שמש" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `פנייה חדשה מהאתר${subject ? ` – ${subject}` : ""}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #1A1A2E; margin-bottom: 20px;">📩 פנייה חדשה מהאתר</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">שם:</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">טלפון:</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:${phone}" style="color: #1A6B8A;">${phone}</a></td></tr>
            ${subject ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">נושא:</td><td style="padding: 8px 0;">${subject}</td></tr>` : ""}
            ${message ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">הודעה:</td><td style="padding: 8px 0;">${message}</td></tr>` : ""}
          </table>
          <hr style="margin: 20px 0; border-color: #e5e7eb;" />
          <p style="color: #9ca3af; font-size: 12px;">נשלח מאתר מתווך נדל&quot;ן בית שמש</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "שגיאה בשליחת המייל" }, { status: 500 });
  }
}
