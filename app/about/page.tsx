import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { siteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "אודותי",
  description: "20 שנות ניסיון בנדל\"ן בבית שמש. ערכים, שיטת עבודה ומה שמייחד אותי.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar transparentTop />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#094534] via-[#0F6E56] to-[#1D9E75] overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] bg-[#1D9E75]/40 blur-3xl animate-blob opacity-70" aria-hidden="true" />
          <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="tag bg-white/10 backdrop-blur text-[#EF9F27] border border-[#EF9F27]/30 animate-fade-up">אודותי</span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-5 mb-5 text-balance animate-fade-up delay-100">
                שותף אמיתי למסע
                <br />
                <span className="bg-gradient-to-l from-[#EF9F27] to-[#FFD27F] bg-clip-text text-transparent">
                  הנדל&quot;ן שלכם.
                </span>
              </h1>
              <p className="text-emerald-50/90 text-lg leading-relaxed max-w-xl animate-fade-up delay-200">
                כבר 20 שנה אני עוסק בנדל&quot;ן בבית שמש. יותר מ-500 משפחות עברו דרכי, וכל אחת קיבלה
                את אותו השירות: אישי, מקצועי, ובלי טריקים.
              </p>
              <div className="flex flex-wrap gap-3 mt-8 animate-fade-up delay-300">
                <a href={`https://wa.me/${siteSettings.phoneIntl}`} target="_blank" rel="noopener" className="btn-gold">💬 דברו איתי</a>
                <Link href="/contact" className="btn-ghost">קבעו פגישה</Link>
              </div>
            </div>

            <Reveal delay={200} className="relative">
              <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-white/15 to-white/5 backdrop-blur border border-white/20 grid place-items-center overflow-hidden p-6">
                <svg viewBox="0 0 200 250" className="w-3/4 h-3/4">
                  <defs>
                    <linearGradient id="ph" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#EF9F27"/>
                      <stop offset="1" stopColor="#FBF8F3"/>
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="90" r="50" fill="url(#ph)"/>
                  <path d="M 30 230 Q 100 150 170 230 Z" fill="url(#ph)"/>
                </svg>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white text-[#0E1B17] rounded-2xl shadow-xl px-5 py-4">
                <div className="text-sm text-[#5A6B66]">תפקיד</div>
                <div className="font-bold">מתווך נדל&quot;ן מורשה</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STORY */}
        <section className="bg-[#FBF8F3] section">
          <div className="container-x grid lg:grid-cols-3 gap-12">
            <Reveal>
              <span className="tag bg-[#1D9E75]/10 text-[#0F6E56]">הסיפור שלי</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E1B17] mt-4 leading-tight text-balance">
                בית שמש איננה רק העיר שלי — היא <span className="gradient-text">המקצוע שלי.</span>
              </h2>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-2 text-[#3A4A45] text-lg leading-loose space-y-4">
              <p>
                התחלתי לעסוק בנדל&quot;ן בבית שמש בשנת 2005, אחרי שנים שבהן ליוויתי את משפחתי
                ואת חבריי בעסקאות שונות בעיר. הבנתי משהו פשוט: אנשים זקוקים למתווך שלא רק
                יודע מחירים — אלא <b>מבין את הקהילה</b>, את האופי של כל שכונה, ואת מה שחשוב למשפחה ספציפית.
              </p>
              <p>
                מאז עברו עשרות שכונות, מאות בניינים ויותר מ-500 עסקאות. מה שלא השתנה — הגישה.
                כל לקוח מקבל אותי <b>אישית</b>: לא מזכירה, לא עוזרת. מענה מהיר גם בערב, גם בסופ&quot;ש.
                כי כשמדובר בעסקה הכי גדולה בחיים — אסור להיות חתיכה אחת ברצועת ייצור.
              </p>
              <p>
                אני מאמין בעבודה ישרה: מחיר אמיתי, חוות דעת אמיתית על מצב הנכס, וייעוץ
                שלעיתים אומר לכם &ldquo;לא&rdquo; — כי זה לא מתאים לכם. כי כשאני ממליץ על נכס, אתם
                יודעים שזה אחרי סינון אמיתי.
              </p>
            </Reveal>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-white section">
          <div className="container-x">
            <Reveal>
              <div className="max-w-2xl mb-12">
                <span className="tag bg-[#EF9F27]/15 text-[#BA7517]">הערכים שלי</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-3 text-balance">
                  ארבעה עקרונות. <span className="gradient-text">בכל עסקה.</span>
                </h2>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              {siteSettings.values.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="bg-[#FBF8F3] rounded-3xl p-7 border border-[#1D9E75]/10 hover:bg-white hover:shadow-xl hover:shadow-[#0F6E56]/8 transition-all">
                    <h3 className="font-bold text-xl text-[#0E1B17] mb-2">{v.title}</h3>
                    <p className="text-[#5A6B66] leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-[#0E1B17] text-white section relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1D9E75]/20 blur-3xl rounded-full" />
          <div className="container-x relative">
            <Reveal>
              <div className="max-w-2xl mb-14">
                <span className="tag bg-white/8 text-[#EF9F27] border border-[#EF9F27]/30">תהליך העבודה</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-balance">
                  מהפגישה הראשונה ועד <span className="bg-gradient-to-l from-[#EF9F27] to-[#FFD27F] bg-clip-text text-transparent">המפתחות.</span>
                </h2>
              </div>
            </Reveal>

            <ol className="space-y-5">
              {siteSettings.process.map((p, i) => (
                <Reveal key={p.step} delay={i * 100} as="li">
                  <div className="grid md:grid-cols-[120px_1fr] gap-6 items-start bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <div className="text-5xl font-extrabold text-[#EF9F27]">{p.step}</div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                      <p className="text-white/70 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#FBF8F3] py-20">
          <div className="container-x">
            <Reveal>
              <div className="bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] rounded-[2rem] p-10 md:p-14 text-white text-center max-w-3xl mx-auto shadow-xl shadow-[#0F6E56]/20">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-balance">בואו נכיר.</h2>
                <p className="text-emerald-50 text-lg mb-7 max-w-xl mx-auto">
                  פגישת היכרות חינם, ללא התחייבות. נראה אם אנחנו מתאימים — ואם כן, ניצא לדרך.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/contact#calendly" className="btn-gold">📅 קבעו פגישה</Link>
                  <a href={`https://wa.me/${siteSettings.phoneIntl}`} target="_blank" rel="noopener" className="btn-ghost">💬 WhatsApp</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
