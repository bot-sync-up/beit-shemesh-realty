import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getTestimonials, getSettings } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "המלצות לקוחות",
  description: "מה אומרים עליי הלקוחות שלי. סיפורים אמיתיים מתוך 500+ עסקאות בבית שמש.",
  alternates: { canonical: "/testimonials" },
  openGraph: { url: "/testimonials" },
};

export default async function TestimonialsPage() {
  const [allTestimonials, siteSettings] = await Promise.all([getTestimonials(), getSettings()]);
  return (
    <>
      <Navbar transparentTop />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-12 bg-gradient-to-br from-[#094534] via-[#0F6E56] to-[#1D9E75] text-white overflow-hidden">
          <div className="absolute -top-32 -left-20 w-[36rem] h-[36rem] bg-[#EF9F27]/20 blur-3xl animate-blob opacity-70" aria-hidden="true" />
          <div className="container-x relative">
            <span className="tag bg-white/10 text-[#EF9F27] border border-[#EF9F27]/30">המלצות</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight text-balance">
              מה <span className="bg-gradient-to-l from-[#EF9F27] to-[#FFD27F] bg-clip-text text-transparent">לקוחותיי</span> אומרים
            </h1>
            <p className="text-emerald-50/90 mt-3 max-w-2xl text-lg">
              בסוף כל עסקה — לקוח. וכל לקוח שמחזיר אליי משפחה או חבר זה הקומפלימנט הכי גדול שיכולתי לקבל.
            </p>
          </div>
        </section>

        {/* TESTIMONIAL GRID */}
        <section className="bg-[#FBF8F3] section">
          <div className="container-x">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {allTestimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 80}>
                  <article className="bg-white rounded-3xl p-7 md:p-9 border border-[#1D9E75]/10 card-hover h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-1 text-[#EF9F27]">
                        {Array.from({ length: t.rating }).map((_, k) => (
                          <svg key={k} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .587l3.668 7.431L24 9.748l-6 5.852L19.336 24 12 19.897 4.664 24 6 15.6 0 9.748l8.332-1.73z"/>
                          </svg>
                        ))}
                      </div>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="#1D9E75" opacity="0.18">
                        <path d="M3 17h3l2-4V7H2v6h3zm10 0h3l2-4V7h-6v6h3z"/>
                      </svg>
                    </div>

                    <p className="text-[#0E1B17] text-lg leading-relaxed mb-6 flex-1">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-5 border-t border-[#1D9E75]/12">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] grid place-items-center text-white font-bold text-lg">
                        {t.name.split(" ").map(s => s[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-[#0E1B17]">{t.name}</div>
                        <div className="text-xs text-[#5A6B66]">{t.role} · {t.area}</div>
                        <div className="text-[11px] text-[#5A6B66]/70">{t.date}</div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SUMMARY STATS */}
        <section className="bg-white border-y border-[#1D9E75]/10 py-14">
          <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {siteSettings.stats.map((s) => (
              <div key={s.label}>
                <div
                  className="text-4xl md:text-5xl font-extrabold gradient-text mb-1.5"
                  dir="ltr"
                  style={{ unicodeBidi: "isolate" }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-[#5A6B66] font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#FBF8F3] py-20">
          <div className="container-x text-center max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E1B17] mb-3 text-balance">
                הצטרפו אל <span className="gradient-text">הלקוחות המרוצים.</span>
              </h2>
              <p className="text-[#5A6B66] text-lg mb-7">
                בואו נדבר. בלי מחויבות, בלי לחץ — רק לראות איך אפשר לעזור לכם.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`https://wa.me/${siteSettings.phoneIntl}`} target="_blank" rel="noopener" className="btn-primary">
                  <span aria-hidden="true">💬</span>
                  <span>דברו איתי</span>
                </a>
                <Link href="/contact#calendly" className="btn-gold">
                  <span aria-hidden="true">📅</span>
                  <span>קבעו פגישה</span>
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
