"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { useRouter } from "next/navigation";

type Testimonial = { id: number; name: string; text: string; area: string; rating: number; active: boolean };
const empty = { name: "", text: "", area: "", rating: 5, active: true };

export default function AdminTestimonials() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<typeof empty | Testimonial>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/admin/testimonials").then((r) => {
    if (!r.ok) { router.push("/admin"); return; }
    return r.json().then((d) => { setItems(d); setLoading(false); });
  });
  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/testimonials", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, id: editing } : form),
    });
    await load(); setShowForm(false); setEditing(null); setSaving(false);
  };

  const remove = async (id: number) => {
    if (!confirm("למחוק?")) return;
    await fetch("/api/admin/testimonials", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
  };

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">ניהול המלצות</h1>
            <p className="text-gray-500 text-sm">{items.length} המלצות</p>
          </div>
          <button onClick={() => { setForm(empty); setEditing(null); setShowForm(true); }} className="bg-[#1A6B8A] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#155a73] flex items-center gap-2">
            <span>+</span> המלצה חדשה
          </button>
        </div>

        {loading ? <div className="text-center py-20 text-gray-400">טוען...</div> : (
          <div className="space-y-3">
            {items.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-yellow-400 text-sm">{"★".repeat(t.rating)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">&ldquo;{t.text}&rdquo;</p>
                  <span className="text-xs text-gray-400">{t.area}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setForm(t); setEditing(t.id); setShowForm(true); }} className="px-3 py-1.5 border border-[#1A6B8A] text-[#1A6B8A] rounded-lg text-sm hover:bg-[#1A6B8A]/5">עריכה</button>
                  <button onClick={() => remove(t.id)} className="px-3 py-1.5 border border-red-300 text-red-500 rounded-lg text-sm hover:bg-red-50">מחק</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-bold text-lg">{editing ? "עריכת המלצה" : "המלצה חדשה"}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 text-xl">✕</button>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: "שם הלקוח", key: "name" },
                  { label: "אזור", key: "area" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                    <input value={(form as Testimonial)[key as keyof Testimonial] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A]" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">טקסט ההמלצה</label>
                  <textarea rows={4} value={(form as Testimonial).text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">דירוג</label>
                  <select value={(form as Testimonial).rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none">
                    {[5, 4, 3].map((r) => <option key={r} value={r}>{r} כוכבים</option>)}
                  </select>
                </div>
              </div>
              <div className="p-6 border-t flex gap-3 justify-end">
                <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border rounded-xl text-sm">ביטול</button>
                <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-[#1A6B8A] text-white rounded-xl text-sm font-semibold disabled:opacity-60">{saving ? "שומר..." : "שמור"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
