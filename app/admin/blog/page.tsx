"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import { useRouter } from "next/navigation";

type BlogPost = { id: number; title: string; slug: string; excerpt: string; content: string; category: string; date: string; image: string; active: boolean };
const empty = { title: "", slug: "", excerpt: "", content: "", category: "כללי", date: "", image: "", active: true };

export default function AdminBlog() {
  const router = useRouter();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<typeof empty | BlogPost>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => fetch("/api/admin/blog").then((r) => {
    if (!r.ok) { router.push("/admin"); return; }
    return r.json().then((d) => { setItems(d); setLoading(false); });
  });
  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    const f = form as BlogPost;
    const slug = f.slug || f.title.replace(/\s+/g, "-").replace(/[^\w\u0590-\u05ff-]/g, "");
    await fetch("/api/admin/blog", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...f, id: editing, slug } : { ...f, slug }),
    });
    await load(); setShowForm(false); setEditing(null); setSaving(false);
  };

  const remove = async (id: number) => {
    if (!confirm("למחוק מאמר זה?")) return;
    await fetch("/api/admin/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
  };

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">ניהול בלוג</h1>
            <p className="text-gray-500 text-sm">{items.length} מאמרים</p>
          </div>
          <button onClick={() => { setForm(empty); setEditing(null); setShowForm(true); }} className="bg-[#1A6B8A] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#155a73] flex items-center gap-2">
            <span>+</span> מאמר חדש
          </button>
        </div>

        {loading ? <div className="text-center py-20 text-gray-400">טוען...</div> : (
          <div className="space-y-3">
            {items.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{b.title}</h3>
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">{b.category}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1 mb-1">{b.excerpt}</p>
                  <span className="text-xs text-gray-400">{b.date}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setForm(b); setEditing(b.id); setShowForm(true); }} className="px-3 py-1.5 border border-[#1A6B8A] text-[#1A6B8A] rounded-lg text-sm hover:bg-[#1A6B8A]/5">עריכה</button>
                  <button onClick={() => remove(b.id)} className="px-3 py-1.5 border border-red-300 text-red-500 rounded-lg text-sm hover:bg-red-50">מחק</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-bold text-lg">{editing ? "עריכת מאמר" : "מאמר חדש"}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 text-xl">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">כותרת</label>
                    <input value={(form as BlogPost).title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">קטגוריה</label>
                    <select value={(form as BlogPost).category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white">
                      {["מחירי שוק", "טיפים", "כללי", "בית שמש"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">תקציר קצר</label>
                  <textarea rows={2} value={(form as BlogPost).excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A] resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">תוכן המאמר</label>
                  <textarea rows={8} value={(form as BlogPost).content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1A6B8A] resize-none" placeholder="כתוב את תוכן המאמר כאן..." />
                </div>
              </div>
              <div className="p-6 border-t flex gap-3 justify-end">
                <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border rounded-xl text-sm">ביטול</button>
                <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-[#1A6B8A] text-white rounded-xl text-sm font-semibold disabled:opacity-60">{saving ? "שומר..." : "פרסם מאמר"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
