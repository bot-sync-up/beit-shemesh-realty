import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { siteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "שלחו לי הודעה, התקשרו או קבעו פגישה אישית. ייעוץ ראשוני חינם, ללא התחייבות.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar transparentTop />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-12 bg-gradient-to-br from-[#094534] via-[#0F6E56] to-[#1D9E75] text-white overflow-hidden">
          <div className="absolute -top-32 -right-20 w-[36rem] h-[36rem] bg-[#1D9E75]/40 blur-3xl animate-blob opacity-70" aria-hidden="true" />
          <div className="container-x relative">
            <span className="tag bg-white/10 text-[#EF9F27] border border-[#EF9F27]/30">צור קשר</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight text-balance">
              בואו <span className="bg-gradient-to-l from-[#EF9F27] to-[#FFD27F] bg-clip-text text-transparent">נתחיל לדבר.</span>
            </h1>
            <p className="text-emerald-50/90 mt-3 max-w-2xl text-lg">
              שלחו פנייה דרך הטופס, התקשרו, או קבעו פגישה ביומן. הראשונה תמיד חינם וללא התחייבות.
            </p>
          </div>
        </section>

        {/* CONTACT METHODS */}
        <section className="bg-[#FBF8F3] py-14">
          <div className="container-x grid sm:grid-cols-3 gap-5">
            <Reveal>
              <a
                href={`https://wa.me/${siteSettings.phoneIntl}`}
                target="_blank"
                rel="noopener"
                className="group bg-white rounded-3xl border border-[#1D9E75]/10 p-6 card-hover flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 grid place-items-center text-[#25D366] text-2xl group-hover:scale-110 transition-transform">💬</div>
                <div>
                  <div className="text-xs font-semibold text-[#5A6B66]">WhatsApp</div>
                  <div className="font-bold text-[#0E1B17]">שלחו הודעה</div>
                  <div className="text-xs text-[#5A6B66] mt-0.5">מענה מהיר תוך דקות</div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={100}>
              <a
                href={`tel:${siteSettings.phoneRaw}`}
                className="group bg-white rounded-3xl border border-[#1D9E75]/10 p-6 card-hover flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1D9E75]/15 grid place-items-center text-[#0F6E56] text-2xl group-hover:scale-110 transition-transform">📞</div>
                <div>
                  <div className="text-xs font-semibold text-[#5A6B66]">טלפון</div>
                  <div className="font-bold text-[#0E1B17]">{siteSettings.phone}</div>
                  <div className="text-xs text-[#5A6B66] mt-0.5">{siteSettings.availability}</div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={200}>
              <a
                href={`mailto:${siteSettings.email}`}
                className="group bg-white rounded-3xl border border-[#1D9E75]/10 p-6 card-hover flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EF9F27]/15 grid place-items-center text-[#BA7517] text-2xl group-hover:scale-110 transition-transform">✉️</div>
                <div>
                  <div className="text-xs font-semibold text-[#5A6B66]">אימייל</div>
                  <div className="font-bold text-[#0E1B17] break-all">{siteSettings.emailDisplay}</div>
                  <div className="text-xs text-[#5A6B66] mt-0.5">תשובה תוך 24 שעות</div>
                </div>
              </a>
            </Reveal>
          </div>
        </section>

        {/* FORM + MAP */}
        <section className="bg-[#FBF8F3] section pt-0">
          <div className="container-x grid lg:grid-cols-[1.1fr_1fr] gap-8">
            <Reveal>
              <div className="bg-white rounded-3xl border border-[#1D9E75]/10 p-7 md:p-9 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0E1B17] mb-2">שלחו לי הודעה</h2>
                <p className="text-[#5A6B66] mb-6">אחזור אליכם בהקדם — בדרך כלל בתוך שעות בודדות.</p>
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="space-y-6 h-full flex flex-col">
                <div className="bg-white rounded-3xl border border-[#1D9E75]/10 p-7 shadow-sm">
                  <h3 className="font-bold text-lg text-[#0E1B17] mb-3">פרטי קשר</h3>
                  <ul className="space-y-3 text-sm text-[#3A4A45]">
                    <li className="flex items-start gap-2"><span className="text-[#0F6E56] mt-0.5">📍</span><span>{siteSettings.address}</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#0F6E56] mt-0.5">📞</span><a href={`tel:${siteSettings.phoneRaw}`} className="hover:text-[#0F6E56]">{siteSettings.phone}</a></li>
                    <li className="flex items-start gap-2"><span className="text-[#0F6E56] mt-0.5">✉️</span><a href={`mailto:${siteSettings.email}`} className="hover:text-[#0F6E56] break-all">{siteSettings.emailDisplay}</a></li>
                    <li className="flex items-start gap-2"><span className="text-[#0F6E56] mt-0.5">🕒</span><span>{siteSettings.availability}</span></li>
                  </ul>
                </div>

                <div className="rounded-3xl overflow-hidden border border-[#1D9E75]/10 shadow-sm flex-1 min-h-[280px]">
                  <iframe
                    src={siteSettings.officeMapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 280 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="מפת בית שמש"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CALENDLY */}
        <section id="calendly" className="bg-white section">
          <div className="container-x">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="tag bg-[#EF9F27]/15 text-[#BA7517]">קביעת פגישה</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0E1B17] mt-3 text-balance">
                  בחרו מועד שנוח לכם <span className="gradient-text">ביומן.</span>
                </h2>
                <p className="text-[#5A6B66] mt-3 text-lg">
                  פגישת היכרות וירטואלית או טלפונית, 30 דקות, ללא עלות.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-3xl overflow-hidden border border-[#1D9E75]/15 shadow-md">
                <iframe
                  src={siteSettings.calendlyUrl}
                  width="100%"
                  height="700"
                  style={{ border: 0, minHeight: 700 }}
                  title="קביעת פגישה ב-Calendly"
                />
              </div>
            </Reveal>

            <Reveal delay={250}>
              <p className="text-center text-sm text-[#5A6B66] mt-5">
                מעדיפים מועד אחר? <a href={`https://wa.me/${siteSettings.phoneIntl}`} target="_blank" rel="noopener" className="text-[#0F6E56] font-bold hover:underline">שלחו לי הודעה</a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
