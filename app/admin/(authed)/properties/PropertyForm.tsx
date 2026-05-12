"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Property } from "@/lib/data";

type Props = {
  initial?: Property;
  neighborhoods: string[];
};

const TYPES: Property["type"][] = ["למכירה", "להשכרה", "נמכר"];
const CATEGORIES: Property["category"][] = ["דירה", "דירת גן", "פנטהאוז", "בית פרטי", "מסחרי", "קרקע"];
const STATUSES: { value: Property["status"]; label: string }[] = [
  { value: "active", label: "פעיל" },
  { value: "sold", label: "נמכר" },
  { value: "hidden", label: "מוסתר" },
];

const blank: Property = {
  id: 0, title: "", type: "למכירה", category: "דירה", status: "active",
  price: 0, priceLabel: "", rooms: 4, area: 100, floor: 0, totalFloors: 0,
  neighborhood: "", address: "", lat: 0, lng: 0,
  shortDescription: "", description: "", features: [], images: [], featured: false,
};

export default function PropertyForm({ initial, neighborhoods }: Props) {
  const router = useRouter();
  const [p, setP] = useState<Property>(initial ?? blank);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [uploadErr, setUploadErr] = useState("");
  const isEdit = !!initial;

  function update<K extends keyof Property>(k: K, v: Property[K]) {
    setP({ ...p, [k]: v });
  }

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploadErr("");
    const uploaded: string[] = [];
    for (const f of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setUploadErr(data.error || "שגיאה בהעלאת הקובץ");
        return;
      }
      const data = (await res.json()) as { url: string };
      uploaded.push(data.url);
    }
    setP({ ...p, images: [...p.images, ...uploaded] });
  }

  function removeImage(idx: number) {
    setP({ ...p, images: p.images.filter((_, i) => i !== idx) });
  }

  function addFeature() {
    const v = featureInput.trim();
    if (!v) return;
    setP({ ...p, features: [...p.features, v] });
    setFeatureInput("");
  }

  function removeFeature(i: number) {
    setP({ ...p, features: p.features.filter((_, idx) => idx !== i) });
  }

  async function save() {
    setErr("");
    if (!p.title.trim()) {
      setErr("חובה למלא כותרת");
      return;
    }
    setBusy(true);
    try {
      const url = isEdit ? `/api/admin/properties/${p.id}` : "/api/admin/properties";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "שגיאה בשמירה");
      }
      router.push("/admin/properties");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Section title="פרטים בסיסיים">
        <Field label="כותרת *">
          <input value={p.title} onChange={(e) => update("title", e.target.value)} className={inputCls} placeholder="לדוגמה: דירת 4 חדרים עם נוף, מעלות החן" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="סוג">
            <select value={p.type} onChange={(e) => update("type", e.target.value as Property["type"])} className={inputCls}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="קטגוריה">
            <select value={p.category} onChange={(e) => update("category", e.target.value as Property["category"])} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="סטטוס">
            <select value={p.status} onChange={(e) => update("status", e.target.value as Property["status"])} className={inputCls}>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="מומלץ (יופיע בדף הבית)">
            <label className="flex items-center gap-2 h-12 px-3">
              <input type="checkbox" checked={p.featured} onChange={(e) => update("featured", e.target.checked)} />
              <span className="text-sm">{p.featured ? "כן" : "לא"}</span>
            </label>
          </Field>
        </div>
      </Section>

      <Section title="מחיר וגודל">
        <div className="grid grid-cols-2 gap-4">
          <Field label="מחיר (₪)">
            <input type="number" value={p.price || ""} onChange={(e) => update("price", parseInt(e.target.value, 10) || 0)} className={inputCls} />
          </Field>
          <Field label="תווית מחיר (אופציונלי)">
            <input value={p.priceLabel} onChange={(e) => update("priceLabel", e.target.value)} className={inputCls} placeholder="ריק = יחושב אוטומטית" />
          </Field>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Field label="חדרים"><input type="number" step="0.5" value={p.rooms || ""} onChange={(e) => update("rooms", parseFloat(e.target.value) || 0)} className={inputCls} /></Field>
          <Field label='שטח (מ"ר)'><input type="number" value={p.area || ""} onChange={(e) => update("area", parseInt(e.target.value, 10) || 0)} className={inputCls} /></Field>
          <Field label="קומה"><input type="number" value={p.floor || ""} onChange={(e) => update("floor", parseInt(e.target.value, 10) || 0)} className={inputCls} /></Field>
          <Field label="קומות סה״כ"><input type="number" value={p.totalFloors || ""} onChange={(e) => update("totalFloors", parseInt(e.target.value, 10) || 0)} className={inputCls} /></Field>
        </div>
      </Section>

      <Section title="מיקום">
        <Field label="שכונה">
          <input list="neighborhoods-list" value={p.neighborhood} onChange={(e) => update("neighborhood", e.target.value)} className={inputCls} />
          <datalist id="neighborhoods-list">
            {neighborhoods.map((n) => <option key={n} value={n} />)}
          </datalist>
        </Field>
        <Field label="כתובת מלאה">
          <input value={p.address} onChange={(e) => update("address", e.target.value)} className={inputCls} placeholder="רחוב, מספר, בית שמש" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="קו רוחב (lat) — אופציונלי"><input type="number" step="0.000001" value={p.lat || ""} onChange={(e) => update("lat", parseFloat(e.target.value) || 0)} className={inputCls} /></Field>
          <Field label="קו אורך (lng) — אופציונלי"><input type="number" step="0.000001" value={p.lng || ""} onChange={(e) => update("lng", parseFloat(e.target.value) || 0)} className={inputCls} /></Field>
        </div>
      </Section>

      <Section title="תיאור">
        <Field label="תיאור קצר (כרטיס נכס)">
          <input value={p.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className={inputCls} maxLength={140} placeholder="שורה אחת, מה הכי מיוחד בנכס" />
        </Field>
        <Field label="תיאור מלא (דף הנכס)">
          <textarea value={p.description} onChange={(e) => update("description", e.target.value)} rows={6} className={`${inputCls} h-auto`} />
        </Field>
      </Section>

      <Section title="מאפיינים">
        <div className="flex flex-wrap gap-2 mb-3">
          {p.features.map((f, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-[#F1F7F4] text-[#0E1B17] rounded-full px-3 py-1.5 text-sm">
              {f}
              <button type="button" onClick={() => removeFeature(i)} aria-label="הסר" className="text-[#5A6B66] hover:text-red-600">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
            className={inputCls}
            placeholder='הקלד מאפיין ולחץ Enter (לדוגמה: "מעלית", "מרפסת שמש")'
          />
          <button type="button" onClick={addFeature} className="bg-[#0F6E56] text-white font-bold rounded-xl px-5">הוסף</button>
        </div>
      </Section>

      <Section title="תמונות">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          {p.images.map((src, i) => (
            <div key={i} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full aspect-square object-cover rounded-xl bg-[#F1F7F4]" />
              <button type="button" onClick={() => removeImage(i)} className="absolute top-1.5 left-1.5 bg-red-600 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                הסר
              </button>
            </div>
          ))}
        </div>
        <label className="block border-2 border-dashed border-[#1D9E75]/30 rounded-2xl p-6 text-center cursor-pointer hover:bg-[#F1F7F4] transition">
          <div className="text-[#0F6E56] font-bold mb-1">📁 לחץ או גרור תמונות לכאן</div>
          <div className="text-xs text-[#5A6B66]">JPG / PNG / WebP / GIF / SVG · עד 8MB לקובץ</div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onUpload(e.target.files)}
            className="hidden"
          />
        </label>
        {uploadErr && <p className="text-sm text-red-600 font-bold mt-2">{uploadErr}</p>}
      </Section>

      {err && <p className="text-sm text-red-600 font-bold">{err}</p>}

      <div className="flex gap-3 sticky bottom-4 bg-[#FBF8F3]/95 backdrop-blur p-3 -mx-3 rounded-2xl border border-[#1D9E75]/15">
        <button
          onClick={save}
          disabled={busy}
          className="bg-gradient-to-l from-[#1D9E75] to-[#0F6E56] text-white font-extrabold rounded-full px-6 py-3 hover:opacity-95 disabled:opacity-60 transition"
        >
          {busy ? "שומר..." : isEdit ? "שמור שינויים" : "צור נכס"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/properties")}
          className="bg-white border border-[#1D9E75]/30 text-[#0F6E56] font-bold rounded-full px-6 py-3 hover:bg-[#F1F7F4]"
        >
          ביטול
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
  return (
    <label className="block">
      <span className="block text-sm font-bold text-[#0E1B17] mb-1.5">{label}</span>
      {children}
    </label>
  );
}
