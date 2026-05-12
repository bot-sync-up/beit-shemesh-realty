"use client";
import { useState, useTransition } from "react";
import type { Testimonial } from "@/lib/data";

const blank: Omit<Testimonial, "id"> = {
  name: "", role: "", area: "", date: new Date().toISOString().slice(0, 10),
  rating: 5, text: "",
};

export default function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Testimonial | (Omit<Testimonial, "id"> & { id?: number }) | null>(null);
  const [busy, setBusy] = useState(false);
  const [pending, startTransition] = useTransition();
  const [err, setErr] = useState("");

  async function save() {
    if (!editing) return;
    setErr("");
    if (!editing.name.trim() || !editing.text.trim()) {
      setErr("חובה: שם ותוכן ההמלצה");
      return;
    }
    setBusy(true);
    try {
      const isNew = !("id" in editing) || editing.id === undefined;
      const res = await fetch(isNew ? "/api/admin/testimonials" : `/api/admin/testimonials/${editing.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "שגיאה");
      }
      const saved = (await res.json()) as Testimonial;
      setItems(isNew ? [...items, saved] : items.map((t) => (t.id === saved.id ? saved : t)));
      setEditing(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("למחוק את ההמלצה?")) return;
    setItems(items.filter((t) => t.id !== id));
    startTransition(async () => {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    });
  }

  return (
    <div className="space-y-4">
      {!editing && (
        <button
          onClick={() => setEditing({ ...blank })}
          className="bg-[#0F6E56] text-white font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#0c5a47]"
        >
          + הוסף המלצה
        </button>
      )}

      {editing && (
        <div className="bg-white rounded-2xl border border-[#1D9E75]/12 p-6 space-y-4">
          <h2 className="font-extrabold text-[#0E1B17]">{("id" in editing && editing.id) ? "עריכת המלצה" : "המלצה חדשה"}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Field label="שם הממליץ *"><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputCls} /></Field>
            <Field label="תפקיד / סוג"><input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className={inputCls} placeholder="לדוגמה: רוכש דירה" /></Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="אזור / שכונה"><input value={editing.area} onChange={(e) => setEditing({ ...editing, area: e.target.value })} className={inputCls} /></Field>
            <Field label="תאריך"><input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className={inputCls} /></Field>
            <Field label="דירוג (1–5)"><input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value, 10) || 5 })} className={inputCls} /></Field>
          </div>
          <Field label="טקסט ההמלצה *">
            <textarea rows={4} value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} className={`${inputCls} h-auto`} />
          </Field>
          {err && <p className="text-sm text-red-600 font-bold">{err}</p>}
          <div className="flex gap-3">
            <button onClick={save} disabled={busy} className="bg-gradient-to-l from-[#1D9E75] to-[#0F6E56] text-white font-extrabold rounded-full px-5 py-2.5 hover:opacity-95 disabled:opacity-60">
              {busy ? "שומר..." : "שמור"}
            </button>
            <button onClick={() => setEditing(null)} className="bg-white border border-[#1D9E75]/30 text-[#0F6E56] font-bold rounded-full px-5 py-2.5">ביטול</button>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {items.map((t) => (
          <li key={t.id} className="bg-white rounded-2xl border border-[#1D9E75]/12 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <div className="font-extrabold text-[#0E1B17]">{t.name}</div>
                <div className="text-xs text-[#5A6B66]">{[t.role, t.area, t.date].filter(Boolean).join(" · ")}</div>
              </div>
              <div className="text-[#EF9F27]" aria-label={`דירוג: ${t.rating}`}>{"★".repeat(t.rating)}<span className="text-[#1D9E75]/30">{"★".repeat(5 - t.rating)}</span></div>
            </div>
            <p className="text-[#3A4A45] mt-2 leading-relaxed">{t.text}</p>
            <div className="mt-3 flex gap-3 text-sm">
              <button onClick={() => setEditing(t)} className="text-[#0F6E56] font-bold hover:underline">ערוך</button>
              <button onClick={() => remove(t.id)} className="text-red-600 hover:underline" disabled={pending}>מחק</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-[#1D9E75]/20 focus:border-[#0F6E56] focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/15 bg-white";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-sm font-bold text-[#0E1B17] mb-1">{label}</span>{children}</label>;
}
