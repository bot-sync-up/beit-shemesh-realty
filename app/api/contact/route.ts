import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import settings from "@/data/settings.json";
import { getJson, putJson } from "@/lib/storage";
import type { Lead } from "@/lib/types";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();
  const consent = Boolean(body.consent);

  if (!name || !phone) {
    return NextResponse.json({ error: "שם וטלפון הם שדות חובה" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "יש לאשר את מדיניות הפרטיות" }, { status: 400 });
  }

  // Persist as a lead (always, regardless of SMTP)
  try {
    const existing = (await getJson<Lead[]>("data/leads.json")) ?? [];
    const lead: Lead = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email: email || undefined,
      subject: subject || undefined,
      message: message || undefined,
      read: false,
    };
    await putJson("data/leads.json", [lead, ...existing]);
  } catch (e) {
    console.error("Failed to persist lead:", e);
  }

  // SMTP not configured → log and return success (demo / staging mode)
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("📧 Contact form (SMTP not configured):", { name, phone, email, subject, message });
    return NextResponse.json({ ok: true, mode: "log" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const html = `
      <div dir="rtl" style="font-family: 'Assistant', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 28px; background: #FBF8F3; border-radius: 14px;">
        <div style="background: linear-gradient(135deg, #1D9E75, #0F6E56); color: white; padding: 22px 24px; border-radius: 12px; margin-bottom: 18px;">
          <div style="font-size: 13px; opacity: 0.9; font-weight: 600;">הכתובת הנכונה</div>
          <div style="font-size: 20px; font-weight: 800; margin-top: 4px;">📩 פנייה חדשה מהאתר</div>
        </div>
        <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden;">
          <tr><td style="padding: 12px 16px; color: #5A6B66; font-size: 13px; width: 90px;">שם:</td><td style="padding: 12px 16px; font-weight: 700; color: #0E1B17;">${escapeHtml(name)}</td></tr>
          <tr style="background:#F1F7F4;"><td style="padding: 12px 16px; color: #5A6B66; font-size: 13px;">טלפון:</td><td style="padding: 12px 16px;"><a href="tel:${escapeHtml(phone)}" style="color: #0F6E56; font-weight: 700;">${escapeHtml(phone)}</a></td></tr>
          ${email ? `<tr><td style="padding: 12px 16px; color: #5A6B66; font-size: 13px;">אימייל:</td><td style="padding: 12px 16px;"><a href="mailto:${escapeHtml(email)}" style="color: #0F6E56;">${escapeHtml(email)}</a></td></tr>` : ""}
          ${subject ? `<tr style="background:#F1F7F4;"><td style="padding: 12px 16px; color: #5A6B66; font-size: 13px;">נושא:</td><td style="padding: 12px 16px;">${escapeHtml(subject)}</td></tr>` : ""}
          ${message ? `<tr><td style="padding: 12px 16px; color: #5A6B66; font-size: 13px; vertical-align: top;">הודעה:</td><td style="padding: 12px 16px; line-height: 1.6;">${escapeHtml(message).replace(/\n/g, "<br/>")}</td></tr>` : ""}
        </table>
        <p style="color: #5A6B66; font-size: 12px; margin-top: 14px; text-align: center;">נשלח מהאתר haktovet-hanevona.co.il</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"אתר הכתובת הנכונה" <${process.env.SMTP_USER}>`,
      to: settings.email,
      replyTo: email || undefined,
      subject: `[הכתובת הנכונה] פנייה: ${subject || name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "שגיאה בשליחת המייל" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
