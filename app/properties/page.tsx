"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import PropertyCard, { type Property } from "@/components/PropertyCard";

const allProperties: Property[] = [
  { id: 1, title: "דירת 4 חדרים – נחל בשור", type: "למכירה", price: "₪1,750,000", rooms: 4, area: 110, neighborhood: "נחל בשור", description: "דירה מרווחת בקומה שלישית עם מרפסת שמש גדולה.", image: "" },
  { id: 2, title: "דירת 3 חדרים – מרכז העיר", type: "להשכרה", price: "₪4,500/חודש", rooms: 3, area: 80, neighborhood: "מרכז העיר", description: "דירה משופצת עם חניה ומחסן.", image: "" },
  { id: 3, title: "דירת גן 5 חדרים – רמת בית שמש", type: "למכירה", price: "₪2,200,000", rooms: 5, area: 145, neighborhood: "רמת בית שמש", description: "דירת גן פינתית עם גינה פרטית.", image: "" },
  { id: 4, title: "דירת 2 חדרים – גבעת שרת", type: "להשכרה", price: "₪3,200/חודש", rooms: 2, area: 60, neighborhood: "גבעת שרת", description: "דירה קומפקטית ומשופצת.", image: "" },
  { id: 5, title: "פנטהאוז 6 חדרים – רמת בית שמש", type: "למכירה", price: "₪3,500,000", rooms: 6, area: 200, neighborhood: "רמת בית שמש", description: "פנטהאוז יוקרתי עם גג פרטי.", image: "" },
  { id: 6, title: "חנות מסחרית – מרכז מסחרי", type: "למכירה", price: "₪950,000", rooms: 1, area: 55, neighborhood: "מרכז העיר", description: "חנות בקניון פעיל עם תנועת לקוחות גבוהה.", image: "" },
  { id: 7, title: "דירת 4 חדרים – שכונת הגפן", type: "נמכר", price: "₪1,600,000", rooms: 4, area: 105, neighborhood: "שכונת הגפן", description: "נמכרה בהצלחה!", image: "" },
  { id: 8, title: "דירת 3 חדרים – נווה אברהם", type: "למכירה", price: "₪1,450,000", rooms: 3, area: 90, neighborhood: "נווה אברהם", description: "דירה מטופחת עם חניה בטאבו.", image: "" },
  { id: 9, title: "משרד 80 מ\"ר – מרכז עסקים", type: "להשכרה", price: "₪5,500/חודש", rooms: 3, area: 80, neighborhood: "מרכז העיר", description: "משרד מאובזר בבניין משרדים מודרני.", image: "" },
];

const neighborhoods = ["הכל", "נחל בשור", "מרכז העיר", "רמת בית שמש", "גבעת שרת", "שכונת הגפן", "נווה אברהם"];
const types = ["הכל", "למכירה", "להשכרה", "נמכר"];

export default function PropertiesPage() {
  const [filterType, setFilterType] = useState("הכל");
  const [filterNeighborhood, setFilterNeighborhood] = useState("הכל");
  const [filterRooms, setFilterRooms] = useState("הכל");
  const [search, setSearch] = useState("");

  const filtered = allProperties.filter((p) => {
    if (filterType !== "הכל" && p.type !== filterType) return false;
    if (filterNeighborhood !== "הכל" && p.neighborhood !== filterNeighborhood) return false;
    if (filterRooms !== "הכל" && p.rooms !== Number(filterRooms)) return false;
    if (search && !p.title.includes(search) && !p.neighborhood.includes(search)) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-[#1A1A2E] to-[#1A6B8A] pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-3">נכסים</h1>
            <p className="text-blue-100">כל הנכסים הזמינים למכירה ולהשכרה בבית שמש</p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white shadow-sm sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <input
                type="text"
                placeholder="חיפוש חופשי..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#1A6B8A] w-48"
              />

              {/* Type filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#1A6B8A] bg-white"
              >
                {types.map((t) => <option key={t} value={t}>{t === "הכל" ? "סוג נכס" : t}</option>)}
              </select>

              {/* Neighborhood filter */}
              <select
                value={filterNeighborhood}
                onChange={(e) => setFilterNeighborhood(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#1A6B8A] bg-white"
              >
                {neighborhoods.map((n) => <option key={n} value={n}>{n === "הכל" ? "שכונה" : n}</option>)}
              </select>

              {/* Rooms filter */}
              <select
                value={filterRooms}
                onChange={(e) => setFilterRooms(e.target.value)}
                className="border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#1A6B8A] bg-white"
              >
                <option value="הכל">מספר חדרים</option>
                {[1, 2, 3, 4, 5, 6].map((r) => <option key={r} value={r}>{r} חדרים</option>)}
              </select>

              {/* Clear */}
              {(filterType !== "הכל" || filterNeighborhood !== "הכל" || filterRooms !== "הכל" || search) && (
                <button
                  onClick={() => { setFilterType("הכל"); setFilterNeighborhood("הכל"); setFilterRooms("הכל"); setSearch(""); }}
                  className="text-sm text-red-500 hover:underline"
                >
                  נקה סינונים
                </button>
              )}

              <span className="text-sm text-gray-500 mr-auto">{filtered.length} נכסים</span>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-[#F8FAFB] py-12">
          <div className="max-w-6xl mx-auto px-4">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">לא נמצאו נכסים</h3>
                <p className="text-gray-500">נסה לשנות את הפילטרים</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

    </>
  );
}
