"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { useRouter } from "next/navigation";

type Settings = {
  siteName: string; heroTitle: string; heroTitleHighlight: string;
  heroSubtitle: string; heroBadge: string; phone: string; phoneRaw: string;
  email: string; address: string; availability: string;
  aboutTitle: string; aboutBio: string; gaId: string;
};

export default function AdminSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pw, setPw] = useState({ cur: "", nxt: "", cnf: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => {
      if (!r.ok) { router.push("/admin"); return; }
      return r.json().then(setSettings);
    });
  }, [router]);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaved(true); setTimeout(() => setSaved(false), 3000); setSaving(false);
  };

  const changePw = async () => {
    if (pw.nxt !== pw.cnf) { setPwMsg({ ok: false, text: "הסיסמאות אינן תואמות" }); return; }
    if (pw.nxt.length < 6) { setPwMsg({ ok: false, text: "מינימום 6 תווים" }); return; }
    setPwSaving(true);
    const res = await fetch("/api/admin/change-password", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: pw.cur, newPassword: pw.nxt }) });
    const data = await res.json();
    setPwMsg(res.ok ? { ok: true, text: "הסיסמה עודכנה!" } : { ok: false, text: data.error || "שגיאה" });
    if (res.ok) setPw({ cur: "", nxt: "", cnf: "" });
    setPwSaving(false); setTimeout(() => setPwMsg(null), 4000);
  };

  if (!settings) return <AdminShell><div className="text-center py-20 text-gray-400">טוען...</div></AdminShell>;

  const Sec = ({ t, children }: { t: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h2 className="font-bold text-[#1A1A2E] mb-4 pb-3 border-b border-gray-100">{t}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const Fld = ({ label, field, multi = false, rows = 3, hint = "" }: { label: string; field: keyof Settings; multi?: boolean; rows?: number; hint?: string }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {multi
        ? <textarea rows={rows} value={settings[field]} onChange={(e) => setSettings({ ...settings, [field]: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A] resize-none" />
        : <input type="text" value={settings[field]} onChange={(e) => setSettings({ ...settings, [field]: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A]" />
      }
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-[#1A1A2E]">הגדרות האתר</h1><p className="text-gray-500 text-sm">שינוי תוכן, פרטי קשר וסיסמה</p></div>
          <button onClick={save} disabled={saving} className="bg-[#1A6B8A] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#155a73] disabled:opacity-60">{saved ? "נשמר!" : saving ? "שומר..." : "שמור שינויים"}</button>
        </div>

        <Sec t="פרטי יצירת קשר">
          <div className="grid grid-cols-2 gap-4"><Fld label="טלפון (להצגה)" field="phone" /><Fld label="טלפון (לחיוג, ללא מקפים)" field="phoneRaw" /></div>
          <Fld label="כתובת אימייל" field="email" />
          <Fld label="כתובת / עיר" field="address" />
          <Fld label="שעות זמינות" field="availability" hint="לדוגמה: זמין בימים א-ה, 9:00–20:00" />
        </Sec>

        <Sec t="דף הבית – Hero">
          <Fld label="תגית עליונה (Badge)" field="heroBadge" />
          <div className="grid grid-cols-2 gap-4"><Fld label="כותרת ראשית" field="heroTitle" /><Fld label="חלק מודגש בכתום" field="heroTitleHighlight" /></div>
          <Fld label="תיאור" field="heroSubtitle" multi rows={3} />
        </Sec>

        <Sec t="עמוד אודות">
          <Fld label="כותרת" field="aboutTitle" />
          <Fld label="ביוגרפיה" field="aboutBio" multi rows={8} />
        </Sec>

        <Sec t="Google Analytics">
          <Fld label="מזהה GA4 (Measurement ID)" field="gaId" hint="לדוגמה: G-XXXXXXXXXX – ניתן למצוא בהגדרות Google Analytics" />
        </Sec>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-[#1A1A2E] mb-4 pb-3 border-b border-gray-100">שינוי סיסמת כניסה</h2>
          <div className="space-y-4 max-w-sm">
            <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">סיסמה נוכחית</label><input type="password" value={pw.cur} onChange={(e) => setPw({...pw, cur: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A]" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">סיסמה חדשה (לפחות 6 תווים)</label><input type="password" value={pw.nxt} onChange={(e) => setPw({...pw, nxt: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A]" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">אישור סיסמה חדשה</label><input type="password" value={pw.cnf} onChange={(e) => setPw({...pw, cnf: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A]" /></div>
            {pwMsg && <p className={pwMsg.ok ? "text-sm font-medium text-green-600" : "text-sm font-medium text-red-500"}>{pwMsg.text}</p>}
            <button onClick={changePw} disabled={pwSaving||!pw.cur||!pw.nxt||!pw.cnf} className="bg-[#1A1A2E] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-black transition-colors disabled:opacity-50 text-sm">
              {pwSaving ? "מעדכן..." : "עדכן סיסמה"}
            </button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
