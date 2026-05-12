import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import NeighborhoodsMap from "@/components/NeighborhoodsMap";
import { allNeighborhoods, siteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "אזורי פעילות ושכונות בית שמש",
  description: "מדריך מקיף לשכונות בית שמש: אופי, טווחי מחירים, יתרונות ומה שצריך לדעת. כתוב על ידי מתווך ותיק.",
  alternates: { canonical: "/neighborhoods" },
  openGraph: { url: "/neighborhoods" },
};

export default function NeighborhoodsPage() {
  return (
    <>
      <Navbar transparentTop />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-12 bg-gradient-to-br from-[#094534] via-[#0F6E56] to-[#1D9E75] text-white overflow-hidden">
          <div className="absolute -top-32 -right-20 w-[36rem] h-[36rem] bg-[#1D9E75]/40 blur-3xl animate-blob opacity-70" aria-hidden="true" />
          <div className="container-x relative">
            <span className="tag bg-white/10 text-[#EF9F27] border border-[#EF9F27]/30">אזורי פעילות</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight text-balance">
              מכיר את בית שמש <span className="bg-gradient-to-l from-[#EF9F27] to-[#FFD27F] bg-clip-text text-transparent">משכונה לשכונה.</span>
            </h1>
            <p className="text-emerald-50/90 mt-3 max-w-2xl text-lg">
              לכל שכונה אופי משלה — אוכלוסייה, מחיר, אטמוספירה. הנה המדריך שלי, אחרי 20 שנה בשטח.
            </p>
          </div>
        </section>

        {/* MAP */}
        <section className="bg-[#FBF8F3] section">
          <div className="container-x">
            <Reveal>
              <div className="mb-8">
                <span className="tag bg-[#EF9F27]/15 text-[#BA7517]">מפה אינטראקטיבית</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E1B17] mt-3 text-balance">
                  בחרו שכונה כדי לראות פרטים
                </h2>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <NeighborhoodsMap neighborhoods={allNeighborhoods} />
            </Reveal>
          </div>
        </section>

        {/* GRID */}
        <section className="bg-white section">
          <div className="container-x">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <span className="tag bg-[#1D9E75]/10 text-[#0F6E56]">סקירה מלאה</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E1B17] mt-3 text-balance">
                  כל השכונות. <span className="gradient-text">בקליק.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allNeighborhoods.map((n, i) => (
                <Reveal key={n.id} delay={i * 60}>
                  <article className="bg-[#FBF8F3] rounded-3xl border border-[#1D9E75]/10 p-6 card-hover h-full flex flex-col">
                    <div
                      className="rounded-2xl mb-5 aspect-[16/9] grid place-items-center text-white relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${n.imageColor}, #094534)` }}
                    >
                      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                        style={{
                          backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1.4px, transparent 1.4px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      <div className="relative text-center">
                        <div className="text-2xl font-extrabold">{n.name}</div>
                        <div className="text-xs opacity-90 mt-1 font-semibold">{n.character}</div>
                      </div>
                    </div>

                    <p className="text-[#3A4A45] text-sm leading-relaxed mb-4 flex-1">{n.description}</p>

                    <dl className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div>
                        <dt className="text-xs font-semibold text-[#5A6B66] mb-1">מכירה</dt>
                        <dd className="font-extrabold text-[#0F6E56] text-[13px]">{n.avgPriceSale}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-[#5A6B66] mb-1">שכירות</dt>
                        <dd className="font-extrabold text-[#BA7517] text-[13px]">{n.avgPriceRent}</dd>
                      </div>
                    </dl>

                    <ul className="space-y-1 mb-5">
                      {n.highlights.slice(0, 4).map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-[#5A6B66]">
                          <span className="text-[#1D9E75]">✓</span> {h}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/properties?neighborhood=${encodeURIComponent(n.name)}`}
                      className="text-[#0F6E56] font-bold text-sm hover:underline mt-auto"
                    >
                      נכסים זמינים בשכונה ←
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#FBF8F3] py-20">
          <div className="container-x text-center max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E1B17] mb-3 text-balance">
                לא מצאתם את השכונה שלכם?
              </h2>
              <p className="text-[#5A6B66] text-lg mb-7">
                אני מכיר גם שכונות צמודות, ומכסה את כל בית שמש ואת היישובים בסביבה. שאלו אותי.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`https://wa.me/${siteSettings.phoneIntl}`} target="_blank" rel="noopener" className="btn-primary">
                  <span aria-hidden="true">💬</span>
                  <span>שלחו לי שאלה</span>
                </a>
                <Link href="/contact" className="btn-gold">
                  <span aria-hidden="true">📞</span>
                  <span>צרו קשר</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
