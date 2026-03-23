"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { useRouter } from "next/navigation";

type Neighborhood = {
  id: number;
  name: string;
  slug: string;
  character: string;
  description: string;
  avgPriceSale: string;
  avgPriceRent: string;
  highlights: string[];
  active: boolean;
};

const empty: Omit<Neighborhood, "id" | "slug"> = {
  name: "",
  character: "",
  description: "",
  avgPriceSale: "",
  avgPriceRent: "",
  highlights: [],
  active: true,
};

export default function AdminNeighborhoods() {
  const router = useRouter();
  const [items, setItems] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Neighborhood, "id" | "slug"> | Neighborhood>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [highlightInput, setHighlightInput] = useState("");

  const load = () =>
    fetch("/api/admin/neighborhoods").then((r) => {
      if (!r.ok) { router.push("/admin"); return; }
      return r.json().then((d) => { setItems(d); setLoading(false); });
    });

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setEditing(null); setHighlightInput(""); setShowForm(true); };
  const openEdit = (n: Neighborhood) => { setForm(n); setEditing(n.id); setHighlightInput(""); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    const current = (form as Neighborhood).highlights || [];
    setForm({ ...form, highlights: [...current, highlightInput.trim()] });
    setHighlightInput("");
  };

  const removeHighlight = (idx: number) => {
    const current = (form as Neighborhood).highlights || [];
    setForm({ ...form, highlights: current.filter((_, i) => i !== idx) });
  };

  const save = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    await fetch("/api/admin/neighborhoods", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, id: editing } : form),
    });
    await load();
    closeForm();
    setSaving(false);
  };

  const remove = async (id: number) => {
    if (!confirm("למחוק שכונה זו?")) return;
    await fetch("/api/admin/neighborhoods", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  };

  const toggleActive = async (n: Neighborhood) => {
    await fetch("/api/admin/neighborhoods", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...n, active: !n.active }),
    });
    await load();
  };

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">ניהול שכונות</h1>
            <p className="text-gray-500 text-sm">{items.length} שכונות במערכת</p>
          </div>
          <button
            onClick={openNew}
            className="bg-[#1A6B8A] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#155a73] transition-colors flex items-center gap-2"
          >
            <span>+</span> שכונה חדשה
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">טוען...</div>
        ) : (
          <div className="space-y-3">
            {items.map((n) => (
              <div key={n.id} className={`bg-white rounded-2xl border p-5 flex items-start gap-4 ${!n.active ? "opacity-50" : "border-gray-200"}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-[#1A1A2E]">{n.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{n.character}</span>
                    {!n.active && <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">מוסתר</span>}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500 flex-wrap">
                    <span>💰 מכירה: ₪{n.avgPriceSale}</span>
                    <span>🔑 שכירות: ₪{n.avgPriceRent}/חודש</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(n)} className={`px-3 py-1.5 border rounded-lg text-sm transition-colors ${n.active ? "border-gray-300 text-gray-500 hover:bg-gray-50" : "border-green-300 text-green-600 hover:bg-green-50"}`}>
                    {n.active ? "הסתר" : "הצג"}
                  </button>
                  <button onClick={() => openEdit(n)} className="px-3 py-1.5 border border-[#1A6B8A] text-[#1A6B8A] rounded-lg text-sm hover:bg-[#1A6B8A]/5 transition-colors">
                    עריכה
                  </button>
                  <button onClick={() => remove(n.id)} className="px-3 py-1.5 border border-red-300 text-red-500 rounded-lg text-sm hover:bg-red-50 transition-colors">
                    מחק
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeForm}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold">{editing ? "עריכת שכונה" : "שכונה חדשה"}</h2>
                <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <Field label="שם השכונה *" value={(form as Neighborhood).name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="אופי השכונה" value={(form as Neighborhood).character} onChange={(v) => setForm({ ...form, character: v })} />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">תיאור</label>
                  <textarea rows={3} value={(form as Neighborhood).description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A] resize-none text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="מחיר מכירה" value={(form as Neighborhood).avgPriceSale} onChange={(v) => setForm({ ...form, avgPriceSale: v })} placeholder="1,500,000 – 2,200,000" />
                  <Field label="שכירות חודשית" value={(form as Neighborhood).avgPriceRent} onChange={(v) => setForm({ ...form, avgPriceRent: v })} placeholder="4,000 – 6,500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">יתרונות / מאפיינים</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                      placeholder="הוסף יתרון..."
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1A6B8A]"
                    />
                    <button type="button" onClick={addHighlight} className="bg-[#1A6B8A] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#155a73]">
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {((form as Neighborhood).highlights || []).map((h, idx) => (
                      <span key={idx} className="bg-[#1A6B8A]/10 text-[#1A6B8A] text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                        {h}
                        <button onClick={() => removeHighlight(idx)} className="text-red-400 hover:text-red-600 mr-1">✕</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                <button onClick={closeForm} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm hover:bg-gray-50">ביטול</button>
                <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-[#1A6B8A] text-white rounded-xl text-sm font-semibold hover:bg-[#155a73] disabled:opacity-60">
                  {saving ? "שומר..." : "שמור"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function Field({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A] text-sm" />
    </div>
  );
}
