"use client";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const reasons = [
  "אני מחפש דירה לקנייה",
  "אני מחפש דירה להשכרה",
  "אני רוצה למכור נכס",
  "אני משקיע ומחפש הזדמנויות",
  "ייעוץ ראשוני / שאלה כללית",
  "אחר",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      consent: !!fd.get("consent"),
    };

    if (!payload.name.trim() || !payload.phone.trim()) {
      setError("שם וטלפון הם שדות חובה");
      return;
    }
    if (!payload.consent) {
      setError("יש לאשר את מדיניות הפרטיות לפני שליחה");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "שגיאה בשליחה");
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "שגיאה בשליחה");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-3xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#1D9E75] text-white grid place-items-center mx-auto mb-4">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="text-2xl font-extrabold text-[#0E1B17] mb-2">תודה! קיבלתי את הפנייה.</h3>
        <p className="text-[#5A6B66] mb-5">אחזור אליכם תוך 24 שעות (לרוב הרבה לפני).</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#0F6E56] font-bold hover:underline"
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-[#1D9E75]/20 focus:border-[#0F6E56] focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/15 text-[15px] bg-white";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="שם מלא *">
          <input type="text" name="name" required autoComplete="name" placeholder="ישראל ישראלי" className={inputCls} />
        </Field>
        <Field label="טלפון *">
          <input type="tel" name="phone" required autoComplete="tel" inputMode="tel" placeholder="050-0000000" className={inputCls} />
        </Field>
      </div>
      <Field label="אימייל">
        <input type="email" name="email" autoComplete="email" placeholder="email@example.com" className={inputCls} />
      </Field>
      <Field label="במה אוכל לעזור?">
        <select name="subject" defaultValue="" className={inputCls}>
          <option value="" disabled>בחרו נושא…</option>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </Field>
      <Field label="הודעה">
        <textarea name="message" rows={4} placeholder="ספרו לי קצת על מה שאתם מחפשים…" className={inputCls} />
      </Field>

      <label className="flex items-start gap-2 text-sm text-[#5A6B66] cursor-pointer">
        <input type="checkbox" name="consent" required aria-required="true" className="mt-1 accent-[#0F6E56]" />
        <span>
          <span className="text-red-600 font-bold" aria-hidden="true">* </span>
          קראתי ואישרתי את <a href="/privacy" className="text-[#0F6E56] underline">מדיניות הפרטיות</a> ואני מסכים/ה לקבל
          חזרה ממתווך הכתובת הנכונה בקשר לפנייתי. <span className="sr-only">(שדה חובה)</span>
        </span>
      </label>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "שולח…" : "שלחו פנייה"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-[#0E1B17] mb-1.5">{label}</span>
      {children}
    </label>
  );
}
