import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { getFeaturedProperties, allTestimonials, siteSettings, allNeighborhoods } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const featured = (await getFeaturedProperties()).slice(0, 6);
  const testimonials = allTestimonials.slice(0, 3);
  const topNeighborhoods = allNeighborhoods.slice(0, 4);

  return (
    <>
      <Navbar transparentTop />

      <main>
        {/* ============ HERO ============ */}
        <section className="relative min-h-[100svh] flex items-center overflow-hidden">
          {/* gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#094534] via-[#0F6E56] to-[#1D9E75]" />

          {/* animated blobs */}
          <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-[#1D9E75]/40 blur-3xl animate-blob opacity-70" aria-hidden="true" />
          <div className="absolute -bottom-32 -left-32 w-[36rem] h-[36rem] bg-[#EF9F27]/25 blur-3xl animate-blob opacity-70" style={{ animationDelay: "3s" }} aria-hidden="true" />

          {/* dotted pattern */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />

          <div className="container-x relative pt-32 pb-20 w-full">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-[#EF9F27] text-sm font-bold px-4 py-1.5 rounded-full border border-[#EF9F27]/30 animate-fade-up">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.852L19.336 24 12 19.897 4.664 24 6 15.6 0 9.748l8.332-1.73z"/></svg>
                {siteSettings.heroBadge}
              </span>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mt-6 mb-6 text-balance animate-fade-up delay-100">
                {siteSettings.heroTitleA}
                <br />
                <span className="bg-gradient-to-l from-[#EF9F27] to-[#FFD27F] bg-clip-text text-transparent">
                  {siteSettings.heroTitleB}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-emerald-50/90 max-w-2xl leading-relaxed mb-9 animate-fade-up delay-200">
                {siteSettings.heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
                <Link href="/properties" className="btn-gold">
                  צפו בנכסים זמינים
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-scale-x-100">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a
                  href={`https://wa.me/${siteSettings.phoneIntl}`}
                  target="_blank"
                  rel="noopener"
                  className="btn-ghost"
                >
                  <span aria-hidden="true">💬</span>
                  <span>שלחו לי הודעה</span>
                </a>
                <Link href="/contact#calendly" className="btn-ghost">
                  <span aria-hidden="true">📅</span>
                  <span>קביעת פגישה</span>
                </Link>
              </div>

              {/* quick stats */}
              <dl className="grid grid-cols-3 gap-6 mt-12 max-w-xl animate-fade-up delay-400">
                {siteSettings.stats.slice(0, 3).map((s) => (
                  <div key={s.label} className="border-s-2 border-[#EF9F27]/60 ps-4">
                    <dt
                      className="text-2xl md:text-3xl font-extrabold text-white tabular-nums"
                      dir="ltr"
                      style={{ unicodeBidi: "isolate" }}
                    >
                      {s.value}
                    </dt>
                    <dd className="text-sm text-emerald-100/80">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* scroll indicator */}
          <a
            href="#about"
            aria-label="גלילה לתוכן"
            className="absolute bottom-6 inset-x-0 mx-auto w-fit text-white/80 hover:text-white animate-float"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </section>

        {/* ============ ABOUT TEASER ============ */}
        <section id="about" className="bg-[#FBF8F3] py-20 md:py-24">
          <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative">
                <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] p-1 shadow-2xl shadow-[#0F6E56]/20">
                  <div className="w-full h-full rounded-[1.85rem] bg-[#FBF8F3] grid place-items-center overflow-hidden">
                    <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 opacity-90">
                      <defs>
                        <linearGradient id="abt" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#1D9E75"/>
                          <stop offset="1" stopColor="#0F6E56"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="80" r="40" fill="url(#abt)"/>
                      <path d="M 30 180 Q 100 120 170 180 Z" fill="url(#abt)"/>
                      <circle cx="155" cy="55" r="10" fill="#EF9F27"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl shadow-[#0F6E56]/10 px-5 py-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#EF9F27]/15 grid place-items-center text-2xl">⭐</div>
                  <div>
                    <div className="text-2xl font-extrabold text-[#0F6E56] leading-none">98%</div>
                    <div className="text-xs text-[#5A6B66]">לקוחות ממליצים</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <span className="tag bg-[#1D9E75]/10 text-[#0F6E56]">אודותי</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-4 mb-5 text-balance">
                המומחה המקומי שלכם, <span className="gradient-text">בלי מתווכים מהצד.</span>
              </h2>
              <p className="text-[#5A6B66] text-lg leading-relaxed mb-4">
                כבר 20 שנה אני מלווה משפחות, זוגות ומשקיעים במסע החשוב ביותר שלהם — מציאת בית.
                בית שמש היא לא רק מקום העבודה שלי, היא הקהילה שלי, האנשים שאני מכיר.
              </p>
              <p className="text-[#5A6B66] text-lg leading-relaxed mb-8">
                כל לקוח מקבל אותי אישית — לא מזכירה, לא עוזרת. מענה מהיר, ייעוץ ישר,
                והיכרות אמיתית עם השכונה שאתם מתעניינים בה.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="btn-primary">קראו עליי עוד</Link>
                <Link href="/contact" className="text-[#0F6E56] font-bold hover:underline self-center">
                  או צרו קשר ←
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="bg-white py-16 border-y border-[#1D9E75]/10">
          <div className="container-x">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {siteSettings.stats.map((s) => (
                <Counter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURED PROPERTIES ============ */}
        <section className="bg-[#F1F7F4] section">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                <div>
                  <span className="tag bg-[#EF9F27]/15 text-[#BA7517]">נכסים נבחרים</span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-3 text-balance">
                    הכי מבוקשים <span className="gradient-text">בבית שמש</span>
                  </h2>
                  <p className="text-[#5A6B66] mt-2 text-lg">
                    מבחר נכסים זמינים — מדירות 3 חדרים ועד פנטהאוזים יוקרתיים.
                  </p>
                </div>
                <Link href="/properties" className="btn-primary">
                  כל הנכסים
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-scale-x-100">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ VALUES ============ */}
        <section className="bg-[#FBF8F3] section">
          <div className="container-x">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="tag bg-[#1D9E75]/10 text-[#0F6E56]">למה לבחור בי</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-3 text-balance">
                  ארבעה ערכים שמובילים <span className="gradient-text">כל עסקה.</span>
                </h2>
                <p className="text-[#5A6B66] mt-3 text-lg">
                  לא סתם 20 שנה. אני מאמין בעבודה כנה, מקצועית ובמהירות שמכבדת את הזמן שלכם.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteSettings.values.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="group bg-white rounded-3xl p-7 border border-[#1D9E75]/10 card-hover h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] grid place-items-center text-white shadow-lg shadow-[#0F6E56]/25 mb-5 group-hover:scale-110 transition-transform">
                      <ValueIcon name={v.icon} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0E1B17] mb-2">{v.title}</h3>
                    <p className="text-[#5A6B66] text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ NEIGHBORHOODS PREVIEW ============ */}
        <section className="bg-white section">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
                <div>
                  <span className="tag bg-[#EF9F27]/15 text-[#BA7517]">אזורי פעילות</span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-3 text-balance">
                    מכיר כל שכונה <span className="gradient-text">לעומק.</span>
                  </h2>
                  <p className="text-[#5A6B66] mt-2 text-lg">
                    טווחי מחירים, אופי, יתרונות — מידע אמיתי מבן בית שמש.
                  </p>
                </div>
                <Link href="/neighborhoods" className="text-[#0F6E56] font-bold hover:underline">
                  כל השכונות ←
                </Link>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {topNeighborhoods.map((n, i) => (
                <Reveal key={n.id} delay={i * 80}>
                  <Link
                    href="/neighborhoods"
                    className="group block rounded-2xl overflow-hidden card-hover relative h-44"
                    style={{ background: `linear-gradient(135deg, ${n.imageColor}, #094534)` }}
                  >
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                      style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1.4px, transparent 1.4px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
                      <span className="text-xs font-semibold opacity-90">{n.character}</span>
                      <div>
                        <h3 className="text-lg font-extrabold">{n.name}</h3>
                        <p className="text-xs opacity-90 mt-1">מכירה: {n.avgPriceSale}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section className="bg-[#0E1B17] text-white section relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1D9E75]/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#EF9F27]/15 blur-3xl rounded-full" />

          <div className="container-x relative">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="tag bg-white/8 text-[#EF9F27] border border-[#EF9F27]/20">תהליך העבודה</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-balance">
                  איך אני עובד — <span className="bg-gradient-to-l from-[#EF9F27] to-[#FFD27F] bg-clip-text text-transparent">צעד אחרי צעד.</span>
                </h2>
                <p className="text-white/70 mt-3 text-lg">
                  שקיפות מלאה: תדעו מה קורה בכל שלב, ומה השלב הבא.
                </p>
              </div>
            </Reveal>

            <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 relative">
              {siteSettings.process.map((p, i) => (
                <Reveal key={p.step} delay={i * 100} as="li">
                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors">
                    <div className="text-3xl font-extrabold text-[#EF9F27] mb-3">{p.step}</div>
                    <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="bg-[#F1F7F4] section">
          <div className="container-x">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="tag bg-[#1D9E75]/10 text-[#0F6E56]">המלצות לקוחות</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-3 text-balance">
                  אומרים עליי. <span className="gradient-text">בלי תסריט.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 80}>
                  <article className="bg-white rounded-3xl p-7 border border-[#1D9E75]/10 card-hover h-full flex flex-col">
                    <div className="flex items-center gap-1 text-[#EF9F27] mb-4">
                      {Array.from({ length: t.rating }).map((_, k) => (
                        <svg key={k} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.852L19.336 24 12 19.897 4.664 24 6 15.6 0 9.748l8.332-1.73z"/></svg>
                      ))}
                    </div>
                    <p className="text-[#0E1B17] leading-relaxed mb-5 flex-1">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-5 border-t border-[#1D9E75]/12">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] grid place-items-center text-white font-bold">
                        {t.name.split(" ").map(s => s[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-[#0E1B17]">{t.name}</div>
                        <div className="text-xs text-[#5A6B66]">{t.area} · {t.date}</div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="text-center mt-10">
                <Link href="/testimonials" className="text-[#0F6E56] font-bold hover:underline">
                  כל ההמלצות ←
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="relative section overflow-hidden bg-gradient-to-br from-[#0F6E56] via-[#1D9E75] to-[#0F6E56]">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1.4px, transparent 1.4px)",
              backgroundSize: "26px 26px",
            }}
            aria-hidden="true"
          />
          <div className="container-x relative text-center text-white max-w-3xl">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-balance">
                מוכנים למצוא את <span className="text-[#EF9F27]">הבית שלכם?</span>
              </h2>
              <p className="text-emerald-50/90 text-lg mb-8 max-w-xl mx-auto">
                ייעוץ ראשוני חינם, בלי התחייבות. נתחיל מפגישת היכרות קצרה ונראה מה מתאים לכם.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-gold">צור קשר עכשיו</Link>
                <a
                  href={`https://wa.me/${siteSettings.phoneIntl}`}
                  target="_blank"
                  rel="noopener"
                  className="btn-ghost"
                >
                  <span aria-hidden="true">💬</span>
                  <span>WhatsApp</span>
                </a>
                <a href={`tel:${siteSettings.phoneRaw}`} className="btn-ghost">
                  <span aria-hidden="true">📞</span>
                  <span dir="ltr" style={{ unicodeBidi: "isolate" }}>{siteSettings.phone}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function ValueIcon({ name }: { name: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "shield") return (<svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
  if (name === "user")   return (<svg {...common}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
  if (name === "map")    return (<svg {...common}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>);
  return (<svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
}
