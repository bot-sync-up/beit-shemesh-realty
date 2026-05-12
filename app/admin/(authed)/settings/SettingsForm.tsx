"use client";
import { useState } from "react";
import type { Settings } from "@/lib/data";

export default function SettingsForm({ initial }: { initial: Settings }) {
  const [s, setS] = useState<Settings>(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  function update<K extends keyof Settings>(k: K, v: Settings[K]) {
    setS({ ...s, [k]: v });
  }

  async function save() {
    setMsg(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "שגיאה");
      }
      setMsg({ kind: "ok", text: "נשמר. השינויים יופיעו באתר תוך כדקה." });
    } catch (e) {
      setMsg({ kind: "err", text: e instanceof Error ? e.message : "שגיאה" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <Section title="פרטי קשר">
        <Field label="טלפון לתצוגה"><input value={s.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="052-760-9172" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="טלפון נקי (לחיוג)"><input value={s.phoneRaw} onChange={(e) => update("phoneRaw", e.target.value)} className={inputCls} placeholder="0527609172" /></Field>
          <Field label="טלפון בינ״ל (לווטסאפ)"><input value={s.phoneIntl} onChange={(e) => update("phoneIntl", e.target.value)} className={inputCls} placeholder="972527609172" /></Field>
        </div>
        <Field label="אימייל"><input type="email" value={s.email} onChange={(e) => update("email", e.target.value)} className={inputCls} /></Field>
        <Field label="כתובת משרד / אזור פעילות"><input value={s.address} onChange={(e) => update("address", e.target.value)} className={inputCls} /></Field>
        <Field label="שעות פעילות"><input value={s.availability} onChange={(e) => update("availability", e.target.value)} className={inputCls} /></Field>
        <Field label="הודעת ברירת מחדל לווטסאפ"><input value={s.whatsappMessage} onChange={(e) => update("whatsappMessage", e.target.value)} className={inputCls} /></Field>
      </Section>

      <Section title="מותג וכותרות">
        <div className="grid grid-cols-2 gap-3">
          <Field label="שם המותג (עברית)"><input value={s.brand} onChange={(e) => update("brand", e.target.value)} className={inputCls} /></Field>
          <Field label="שם המותג (אנגלית)"><input value={s.brandEn} onChange={(e) => update("brandEn", e.target.value)} className={inputCls} /></Field>
        </div>
        <Field label="תיוג / סלוגן"><input value={s.tagline} onChange={(e) => update("tagline", e.target.value)} className={inputCls} /></Field>
        <Field label="טקסט בולט בראש דף הבית"><input value={s.heroBadge} onChange={(e) => update("heroBadge", e.target.value)} className={inputCls} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label='כותרת ראשית — חלק א׳'><input value={s.heroTitleA} onChange={(e) => update("heroTitleA", e.target.value)} className={inputCls} /></Field>
          <Field label='כותרת ראשית — חלק ב׳'><input value={s.heroTitleB} onChange={(e) => update("heroTitleB", e.target.value)} className={inputCls} /></Field>
        </div>
        <Field label="תקציר מתחת לכותרת"><textarea rows={3} value={s.heroSubtitle} onChange={(e) => update("heroSubtitle", e.target.value)} className={`${inputCls} h-auto`} /></Field>
      </Section>

      <Section title="רשתות חברתיות וקישורים">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Instagram URL"><input value={s.instagramUrl} onChange={(e) => update("instagramUrl", e.target.value)} className={inputCls} placeholder="https://..." /></Field>
          <Field label="Facebook URL"><input value={s.facebookUrl} onChange={(e) => update("facebookUrl", e.target.value)} className={inputCls} placeholder="https://..." /></Field>
        </div>
        <Field label="Calendly URL (לקביעת פגישה)"><input value={s.calendlyUrl} onChange={(e) => update("calendlyUrl", e.target.value)} className={inputCls} placeholder="https://calendly.com/..." /></Field>
        <Field label="Google Maps embed URL"><input value={s.officeMapEmbed} onChange={(e) => update("officeMapEmbed", e.target.value)} className={inputCls} /></Field>
      </Section>

      <Section title="זיהוי ומסחר">
        <div className="grid grid-cols-2 gap-3">
          <Field label="דומיין"><input value={s.domain} onChange={(e) => update("domain", e.target.value)} className={inputCls} /></Field>
          <Field label='מס׳ רישיון מתווך'><input value={s.realtorLicense} onChange={(e) => update("realtorLicense", e.target.value)} className={inputCls} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Google Analytics ID"><input value={s.gaId} onChange={(e) => update("gaId", e.target.value)} className={inputCls} placeholder="G-XXXXXXXXXX" /></Field>
          <Field label="Meta Pixel ID"><input value={s.metaPixelId} onChange={(e) => update("metaPixelId", e.target.value)} className={inputCls} /></Field>
        </div>
      </Section>

      <div className="bg-[#F1F7F4] rounded-2xl p-4 text-sm text-[#5A6B66]">
        💡 רוצה לערוך גם את המספרים בדף הבית (שנות ניסיון, עסקאות, דירוג), הערכים והתהליך? <br/>
        אלה חלקים מובנים יותר — בשלב הזה הם נערכים ישירות בקובץ. דבר איתי אם רוצה ממשק עריכה גם להם.
      </div>

      {msg && (
        <div className={`rounded-xl px-4 py-3 text-sm font-bold ${msg.kind === "ok" ? "bg-[#1D9E75]/10 text-[#0F6E56]" : "bg-red-100 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      <div className="flex gap-3 sticky bottom-4 bg-[#FBF8F3]/95 backdrop-blur p-3 -mx-3 rounded-2xl border border-[#1D9E75]/15">
        <button onClick={save} disabled={busy} className="bg-gradient-to-l from-[#1D9E75] to-[#0F6E56] text-white font-extrabold rounded-full px-6 py-3 hover:opacity-95 disabled:opacity-60">
          {busy ? "שומר..." : "שמור שינויים"}
        </button>
      </div>
    </div>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl border border-[#1D9E75]/20 focus:border-[#0F6E56] focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/15 text-[15px] bg-white";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-[#1D9E75]/12 p-6 space-y-4">
      <h2 className="text-lg font-extrabold text-[#0E1B17]">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-sm font-bold text-[#0E1B17] mb-1.5">{label}</span>{children}</label>;
}
