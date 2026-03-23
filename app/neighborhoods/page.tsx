import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Link from "next/link";
import neighborhoodsData from "@/data/neighborhoods.json";

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

export default function NeighborhoodsPage() {
  const neighborhoods = (neighborhoodsData as Neighborhood[]).filter((n) => n.active);

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-[#1A1A2E] to-[#1A6B8A] pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <span className="inline-block bg-[#D4A843]/20 text-[#D4A843] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              🗺️ מדריך שכונות
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              שכונות בית שמש
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              מדריך מקיף לכל שכונות בית שמש ורמת בית שמש – מחירים, אופי, יתרונות ומה כדאי לדעת לפני הרכישה
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white py-10 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {neighborhoods.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.slug}`}
                  className="text-center py-3 px-2 rounded-xl border border-gray-200 hover:border-[#1A6B8A] hover:bg-[#1A6B8A]/5 transition-all text-sm font-medium text-[#1A1A2E]"
                >
                  📍 {n.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="bg-[#F8FAFB] py-16">
          <div className="max-w-6xl mx-auto px-4 space-y-10">
            {neighborhoods.map((n, idx) => (
              <div
                key={n.id}
                id={n.slug}
                className="bg-white rounded-2xl shadow-sm overflow-hidden scroll-mt-24"
              >
                <div className={`p-6 md:p-8 border-r-4 ${idx % 2 === 0 ? "border-[#1A6B8A]" : "border-[#D4A843]"}`}>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Left */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl mt-1">🏘️</span>
                        <div>
                          <h2 className="text-2xl font-bold text-[#1A1A2E]">{n.name}</h2>
                          <p className="text-[#1A6B8A] font-medium text-sm mt-0.5">{n.character}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-5">{n.description}</p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {n.highlights.map((h) => (
                          <span
                            key={h}
                            className="bg-[#F8FAFB] border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right - Prices */}
                    <div className="space-y-4">
                      <div className="bg-[#1A6B8A]/5 rounded-xl p-4 border border-[#1A6B8A]/20">
                        <div className="text-xs text-gray-500 mb-1">💰 מחיר ממוצע למכירה</div>
                        <div className="font-bold text-[#1A1A2E] text-sm">₪{n.avgPriceSale}</div>
                      </div>
                      <div className="bg-[#D4A843]/5 rounded-xl p-4 border border-[#D4A843]/20">
                        <div className="text-xs text-gray-500 mb-1">🔑 שכירות חודשית</div>
                        <div className="font-bold text-[#1A1A2E] text-sm">₪{n.avgPriceRent}/חודש</div>
                      </div>
                      <Link
                        href={`/properties?neighborhood=${encodeURIComponent(n.name)}`}
                        className="block text-center bg-[#1A6B8A] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#155a73] transition-colors"
                      >
                        נכסים ב{n.name} →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1A6B8A] py-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">לא בטוח באיזו שכונה להתחיל?</h2>
            <p className="text-blue-100 mb-8">
              עם 20 שנות ניסיון בבית שמש, אוכל לעזור לך למצוא את השכונה שמתאימה בדיוק לצרכים שלך
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-[#1A6B8A] px-8 py-3.5 rounded-full font-bold hover:bg-gray-50 transition-colors"
              >
                ייעוץ אישי חינם
              </Link>
              <a
                href="tel:0527609172"
                className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                📞 052-760-9172
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
