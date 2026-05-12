"use client";
import { useState, useTransition } from "react";
import type { Neighborhood } from "@/lib/data";

const blank: Omit<Neighborhood, "id"> = {
  name: "", slug: "", character: "", description: "",
  avgPriceSale: "", avgPriceRent: "", highlights: [], imageColor: "#0F6E56",
};

export default function NeighborhoodsManager({ initial }: { initial: Neighborhood[] }) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Neighborhood | (Omit<Neighborhood, "id"> & { id?: number }) | null>(null);
  const [highlightInput, setHighlightInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [pending, startTransition] = useTransition();
  const [err, setErr] = useState("");

  function update<K extends keyof Neighborhood>(k: K, v: Neighborhood[K]) {
    if (!editing) return;
    setEditing({ ...editing, [k]: v });
  }

  function addHighlight() {
    const v = highlightInput.trim();
    if (!v || !editing) return;
    setEditing({ ...editing, highlights: [...editing.highlights, v] });
    setHighlightInput("");
  }

  function removeHighlight(i: number) {
    if (!editing) return;
    setEditing({ ...editing, highlights: editing.highlights.filter((_, idx) => idx !== i) });
  }

  async function save() {
    if (!editing) return;
    setErr("");
    if (!editing.name.trim()) { setErr("חובה למלא שם"); return; }
    setBusy(true);
    try {
      const isNew = !("id" in editing) || editing.id === undefined;
      const res = await fetch(isNew ? "/api/admin/neighborhoods" : `/api/admin/neighborhoods/${editing.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "שגיאה");
      }
      const saved = (await res.json()) as Neighborhood;
      setItems(isNew ? [...items, saved] : items.map((n) => (n.id === saved.id ? saved : n)));
      setEditing(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("למחוק את השכונה?")) return;
    setItems(items.filter((n) => n.id !== id));
    startTransition(async () => {
      await fetch(`/api/admin/neighborhoods/${id}`, { method: "DELETE" });
    });
  }

  return (
    <div className="space-y-4">
      {!editing && (
        <button onClick={() => setEditing({ ...blank })} className="bg-[#0F6E56] text-white font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#0c5a47]">
          + הוסף שכונה
        </button>
      )}

      {editing && (
        <div className="bg-white rounded-2xl border border-[#1D9E75]/12 p-6 space-y-4">
          <h2 className="font-extrabold text-[#0E1B17]">{("id" in editing && editing.id) ? "עריכה" : "שכונה חדשה"}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Field label="שם השכונה *"><input value={editing.name} onChange={(e) => update("name", e.target.value)} className={inputCls} /></Field>
            <Field label="Slug (לכתובת URL)"><input value={editing.slug} onChange={(e) => update("slug", e.target.value)} className={inputCls} placeholder="ריק = יווצר אוטומטית" /></Field>
          </div>
          <Field label="אופי השכונה"><input value={editing.character} onChange={(e) => update("character", e.target.value)} className={inputCls} placeholder="לדוגמה: שכונה משפחתית שקטה" /></Field>
          <Field label="תיאור"><textarea rows={3} value={editing.description} onChange={(e) => update("description", e.target.value)} className={`${inputCls} h-auto`} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="טווח מחירים — מכירה"><input value={editing.avgPriceSale} onChange={(e) => update("avgPriceSale", e.target.value)} className={inputCls} placeholder="₪2.0M – ₪3.5M" /></Field>
            <Field label="טווח מחירים — השכרה"><input value={editing.avgPriceRent} onChange={(e) => update("avgPriceRent", e.target.value)} className={inputCls} placeholder="₪5,500 – ₪8,000" /></Field>
          </div>
          <Field label="צבע (HEX, לצריך תצוגה)">
            <div className="flex gap-2 items-center">
              <input type="color" value={editing.imageColor} onChange={(e) => update("imageColor", e.target.value)} className="w-12 h-12 rounded-lg border border-[#1D9E75]/20" />
              <input value={editing.imageColor} onChange={(e) => update("imageColor", e.target.value)} className={inputCls} />
            </div>
          </Field>

          <div>
            <span className="block text-sm font-bold text-[#0E1B17] mb-1">נקודות מרכזיות</span>
            <div className="flex flex-wrap gap-2 mb-2">
              {editing.highlights.map((h, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-[#F1F7F4] text-[#0E1B17] rounded-full px-3 py-1 text-sm">
                  {h}
                  <button type="button" onClick={() => removeHighlight(i)} className="text-[#5A6B66] hover:text-red-600">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addHighlight(); } }}
                className={inputCls}
                placeholder="הקלד נקודה ולחץ Enter"
              />
              <button type="button" onClick={addHighlight} className="bg-[#0F6E56] text-white font-bold rounded-xl px-4">הוסף</button>
            </div>
          </div>

          {err && <p className="text-sm text-red-600 font-bold">{err}</p>}
          <div className="flex gap-3">
            <button onClick={save} disabled={busy} className="bg-gradient-to-l from-[#1D9E75] to-[#0F6E56] text-white font-extrabold rounded-full px-5 py-2.5 hover:opacity-95 disabled:opacity-60">
              {busy ? "שומר..." : "שמור"}
            </button>
            <button onClick={() => setEditing(null)} className="bg-white border border-[#1D9E75]/30 text-[#0F6E56] font-bold rounded-full px-5 py-2.5">ביטול</button>
          </div>
        </div>
      )}

      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map((n) => (
          <li key={n.id} className="bg-white rounded-2xl border border-[#1D9E75]/12 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl" style={{ background: n.imageColor }} aria-hidden="true" />
              <div>
                <div className="font-extrabold text-[#0E1B17]">{n.name}</div>
                <div className="text-xs text-[#5A6B66]">{n.character || "—"}</div>
              </div>
            </div>
            <p className="text-sm text-[#3A4A45] line-clamp-2">{n.description}</p>
            <div className="mt-3 flex gap-3 text-sm">
              <button onClick={() => setEditing(n)} className="text-[#0F6E56] font-bold hover:underline">ערוך</button>
              <button onClick={() => remove(n.id)} className="text-red-600 hover:underline" disabled={pending}>מחק</button>
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
