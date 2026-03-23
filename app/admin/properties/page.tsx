"use client";
import { useEffect, useState, useRef } from "react";
import AdminShell from "@/components/AdminShell";
import { useRouter } from "next/navigation";

type Property = {
  id: number;
  title: string;
  type: string;
  price: string;
  rooms: number;
  area: number;
  neighborhood: string;
  description: string;
  image: string;
  active: boolean;
};

const empty: Omit<Property, "id"> = {
  title: "", type: "למכירה", price: "", rooms: 3, area: 80,
  neighborhood: "בית שמש", description: "", image: "", active: true,
};

export default function AdminProperties() {
  const router = useRouter();
  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Property, "id"> | Property>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () =>
    fetch("/api/admin/properties").then((r) => {
      if (!r.ok) { router.push("/admin"); return; }
      return r.json().then((d) => { setItems(d); setLoading(false); });
    });

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setEditing(null); setShowForm(true); };
  const openEdit = (p: Property) => { setForm(p); setEditing(p.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) setForm((f) => ({ ...f, image: data.url }));
    else alert(data.error || "שגיאה בהעלאת התמונה");
    setUploading(false);
  };

  const save = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    await fetch("/api/admin/properties", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, id: editing } : form),
    });
    await load();
    closeForm();
    setSaving(false);
  };

  const remove = async (id: number) => {
    if (!confirm("למחוק נכס זה?")) return;
    await fetch("/api/admin/properties", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  };

  const typeColors: Record<string, string> = {
    "למכירה": "bg-blue-100 text-blue-700",
    "להשכרה": "bg-green-100 text-green-700",
    "נמכר": "bg-gray-100 text-gray-600",
  };

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">ניהול נכסים</h1>
            <p className="text-gray-500 text-sm">{items.length} נכסים במערכת</p>
          </div>
          <button
            onClick={openNew}
            className="bg-[#1A6B8A] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#155a73] transition-colors flex items-center gap-2"
          >
            <span>+</span> נכס חדש
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">טוען...</div>
        ) : (
          <div className="space-y-3">
            {items.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
                {p.image ? <img src={p.image} alt="" className="w-16 h-16 object-cover rounded-xl flex-shrink-0" /> : <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">🏠</div>}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#1A1A2E]">{p.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[p.type]}`}>{p.type}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>📍 {p.neighborhood}</span>
                    <span>🛏 {p.rooms} חדרים</span>
                    <span>📐 {p.area} מ"ר</span>
                    <span className="font-semibold text-[#1A6B8A]">{p.price}</span>
                  </div>
                  {p.description && <p className="text-xs text-gray-400 mt-1 truncate">{p.description}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(p)} className="px-3 py-1.5 border border-[#1A6B8A] text-[#1A6B8A] rounded-lg text-sm hover:bg-[#1A6B8A]/5 transition-colors">
                    עריכה
                  </button>
                  <button onClick={() => remove(p.id)} className="px-3 py-1.5 border border-red-300 text-red-500 rounded-lg text-sm hover:bg-red-50 transition-colors">
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
                <h2 className="text-lg font-bold">{editing ? "עריכת נכס" : "נכס חדש"}</h2>
                <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">תמונת הנכס</label>
                  <div className="flex items-center gap-3">
                    {(form as Property).image ? <img src={(form as Property).image} alt="" className="w-20 h-20 object-cover rounded-xl border" /> : <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">🏠</div>}
                    <div>
                      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
                      <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="bg-[#1A6B8A] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#155a73] disabled:opacity-60">{uploading ? "מעלה..." : "בחר תמונה"}</button>
                      {(form as Property).image && <button type="button" onClick={() => setForm({...form, image: ""})} className="block mt-1 text-xs text-red-500 hover:underline">הסר תמונה</button>}
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP עד 5MB</p>
                    </div>
                  </div>
                </div>
                <Field label="כותרת *" value={(form as Property).title} onChange={(v) => setForm({ ...form, title: v })} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">סוג</label>
                    <select value={(form as Property).type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-[#1A6B8A]">
                      <option>למכירה</option>
                      <option>להשכרה</option>
                      <option>נמכר</option>
                    </select>
                  </div>
                  <Field label="מחיר" value={(form as Property).price} onChange={(v) => setForm({ ...form, price: v })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="חדרים" type="number" value={String((form as Property).rooms)} onChange={(v) => setForm({ ...form, rooms: Number(v) })} />
                  <Field label='שטח (מ"ר)' type="number" value={String((form as Property).area)} onChange={(v) => setForm({ ...form, area: Number(v) })} />
                </div>
                <Field label="שכונה" value={(form as Property).neighborhood} onChange={(v) => setForm({ ...form, neighborhood: v })} />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">תיאור</label>
                  <textarea rows={3} value={(form as Property).description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A] resize-none" />
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

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A]" />
    </div>
  );
}
