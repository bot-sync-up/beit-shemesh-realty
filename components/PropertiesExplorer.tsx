"use client";
import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/lib/data";

type ViewMode = "grid" | "list";

const TYPES = ["הכל", "למכירה", "להשכרה", "נמכר"] as const;
const CATEGORIES = ["הכל", "דירה", "דירת גן", "פנטהאוז", "בית פרטי", "מסחרי", "קרקע"] as const;

export default function PropertiesExplorer({
  properties,
  neighborhoods,
}: {
  properties: Property[];
  neighborhoods: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialType = (searchParams.get("type") as (typeof TYPES)[number]) || "הכל";
  const initialCategory = (searchParams.get("category") as (typeof CATEGORIES)[number]) || "הכל";
  const initialNeighborhood = searchParams.get("neighborhood") || "הכל";

  const [type, setType] = useState<(typeof TYPES)[number]>(initialType);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>(initialCategory);
  const [neighborhood, setNeighborhood] = useState<string>(initialNeighborhood);
  const [rooms, setRooms] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [view, setView] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<"newest" | "priceAsc" | "priceDesc" | "areaDesc">("newest");

  const maxPriceCap = useMemo(() => {
    const m = Math.max(...properties.filter(p => p.type !== "להשכרה").map(p => p.price));
    return Math.ceil(m / 100000) * 100000;
  }, [properties]);

  useEffect(() => {
    setMaxPrice(maxPriceCap);
  }, [maxPriceCap]);

  // sync URL on filter change
  useEffect(() => {
    const sp = new URLSearchParams();
    if (type !== "הכל") sp.set("type", type);
    if (category !== "הכל") sp.set("category", category);
    if (neighborhood !== "הכל") sp.set("neighborhood", neighborhood);
    const qs = sp.toString();
    router.replace(qs ? `/properties?${qs}` : "/properties", { scroll: false });
  }, [type, category, neighborhood, router]);

  const filtered = useMemo(() => {
    let list = properties.slice();
    if (type !== "הכל") list = list.filter(p => p.type === type);
    if (category !== "הכל") list = list.filter(p => p.category === category);
    if (neighborhood !== "הכל") list = list.filter(p => p.neighborhood === neighborhood);
    if (rooms > 0) list = list.filter(p => p.rooms >= rooms);
    if (maxPrice > 0) list = list.filter(p => p.type === "להשכרה" || p.price <= maxPrice);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q),
      );
    }
    if (sortBy === "priceAsc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceDesc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "areaDesc") list.sort((a, b) => b.area - a.area);
    else list.sort((a, b) => b.id - a.id);
    return list;
  }, [properties, type, category, neighborhood, rooms, maxPrice, query, sortBy]);

  const reset = () => {
    setType("הכל");
    setCategory("הכל");
    setNeighborhood("הכל");
    setRooms(0);
    setMaxPrice(maxPriceCap);
    setQuery("");
  };

  const fmt = (n: number) => `₪${n.toLocaleString("he-IL")}`;

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-8">
      {/* SIDEBAR FILTERS */}
      <aside className="lg:sticky lg:top-24 lg:self-start bg-white rounded-3xl p-6 border border-[#1D9E75]/10 shadow-sm h-fit">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-extrabold text-[#0E1B17]">סינון</h2>
          <button onClick={reset} className="text-xs font-bold text-[#0F6E56] hover:underline">
            איפוס
          </button>
        </div>

        {/* search */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#5A6B66] mb-2">חיפוש חופשי</label>
          <div className="relative">
            <svg className="absolute top-1/2 -translate-y-1/2 text-[#5A6B66]" style={{ insetInlineStart: "0.75rem" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="שכונה, רחוב, מילה…"
              className="w-full ps-10 pe-3 py-2.5 rounded-xl border border-[#1D9E75]/20 focus:border-[#0F6E56] focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/15 text-sm"
            />
          </div>
        </div>

        {/* type */}
        <FilterGroup label="עסקה">
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`text-sm font-semibold py-2 rounded-xl border transition ${
                  type === t
                    ? "bg-[#0F6E56] text-white border-[#0F6E56]"
                    : "bg-white text-[#0E1B17] border-[#1D9E75]/20 hover:border-[#0F6E56]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* category */}
        <FilterGroup label="סוג נכס">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number])}
            className="w-full px-3 py-2.5 rounded-xl border border-[#1D9E75]/20 focus:border-[#0F6E56] focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/15 text-sm"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </FilterGroup>

        {/* neighborhood */}
        <FilterGroup label="שכונה">
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-[#1D9E75]/20 focus:border-[#0F6E56] focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/15 text-sm"
          >
            <option value="הכל">כל השכונות</option>
            {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </FilterGroup>

        {/* rooms */}
        <FilterGroup label="חדרים (מינימום)">
          <div className="flex flex-wrap gap-2">
            {[0, 2, 3, 4, 5, 6].map(r => (
              <button
                key={r}
                onClick={() => setRooms(r)}
                className={`text-sm font-semibold w-10 h-10 rounded-xl border transition ${
                  rooms === r
                    ? "bg-[#EF9F27] text-white border-[#EF9F27]"
                    : "bg-white text-[#0E1B17] border-[#1D9E75]/20 hover:border-[#EF9F27]"
                }`}
              >
                {r === 0 ? "הכל" : `${r}+`}
              </button>
            ))}
          </div>
        </FilterGroup>

        {/* price */}
        <FilterGroup label={`מחיר עד: ${fmt(maxPrice || maxPriceCap)}`}>
          <input
            type="range"
            min={500000}
            max={maxPriceCap}
            step={50000}
            value={maxPrice || maxPriceCap}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
            className="w-full accent-[#0F6E56]"
          />
          <div className="flex justify-between text-[11px] text-[#5A6B66] mt-1">
            <span>{fmt(500000)}</span>
            <span>{fmt(maxPriceCap)}</span>
          </div>
        </FilterGroup>
      </aside>

      {/* RESULTS */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="text-[#0E1B17]">
            <span className="text-2xl font-extrabold gradient-text">{filtered.length}</span>{" "}
            <span className="text-[#5A6B66]">{filtered.length === 1 ? "נכס נמצא" : "נכסים נמצאו"}</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-xl border border-[#1D9E75]/20 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/15"
            >
              <option value="newest">הכי חדשים</option>
              <option value="priceAsc">מחיר: נמוך לגבוה</option>
              <option value="priceDesc">מחיר: גבוה לנמוך</option>
              <option value="areaDesc">שטח: גדול לקטן</option>
            </select>
            <div className="flex bg-white border border-[#1D9E75]/20 rounded-xl overflow-hidden">
              <button
                aria-label="תצוגת רשת"
                onClick={() => setView("grid")}
                className={`px-3 py-2 ${view === "grid" ? "bg-[#0F6E56] text-white" : "text-[#0E1B17]"}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
              </button>
              <button
                aria-label="תצוגת רשימה"
                onClick={() => setView("list")}
                className={`px-3 py-2 ${view === "list" ? "bg-[#0F6E56] text-white" : "text-[#0E1B17]"}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#1D9E75]/10">
            <div className="text-5xl mb-4">🏚️</div>
            <h3 className="font-bold text-xl text-[#0E1B17] mb-2">לא מצאנו נכסים שתואמים את החיפוש</h3>
            <p className="text-[#5A6B66] mb-5">נסו לשנות את הפילטרים או לאפס. או — דברו איתי ישירות, יש נכסים שלא מתפרסמים.</p>
            <button onClick={reset} className="btn-primary">איפוס סינון</button>
          </div>
        ) : view === "grid" ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {filtered.map((p) => (
              <li key={p.id}>
                <a
                  href={`/properties/${p.id}`}
                  className="grid sm:grid-cols-[180px_1fr] gap-5 bg-white rounded-2xl border border-[#1D9E75]/10 overflow-hidden card-hover"
                >
                  <div className="relative aspect-[4/3] sm:aspect-auto bg-gradient-to-br from-[#1D9E75]/15 to-[#0F6E56]/15">
                    {p.images[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="tag bg-[#0F6E56] text-white">{p.type}</span>
                      <span className="tag bg-[#EF9F27]/15 text-[#BA7517]">{p.category}</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#0E1B17] mb-1">{p.title}</h3>
                    <p className="text-sm text-[#5A6B66] line-clamp-2 mb-3">{p.shortDescription}</p>
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                      <div className="flex gap-4 text-[#0E1B17]">
                        {p.rooms > 0 && <span><b>{p.rooms}</b> חדרים</span>}
                        <span><b>{p.area}</b> מ&quot;ר</span>
                        <span>{p.neighborhood}</span>
                      </div>
                      <div className="font-extrabold text-[#0F6E56] text-lg">{p.priceLabel}</div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-semibold text-[#5A6B66] mb-2">{label}</label>
      {children}
    </div>
  );
}
