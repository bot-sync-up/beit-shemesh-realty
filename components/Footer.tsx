import Link from "next/link";
import Logo from "./Logo";
import { getSettings } from "@/lib/data";

const footerLinks = [
  {
    title: "ניווט",
    items: [
      { href: "/", label: "דף הבית" },
      { href: "/about", label: "אודותי" },
      { href: "/properties", label: "נכסים" },
      { href: "/neighborhoods", label: "אזורי פעילות" },
      { href: "/testimonials", label: "המלצות" },
      { href: "/contact", label: "צור קשר" },
    ],
  },
  {
    title: "סוגי נכסים",
    items: [
      { href: "/properties?type=למכירה", label: "דירות למכירה" },
      { href: "/properties?type=להשכרה", label: "דירות להשכרה" },
      { href: "/properties?category=פנטהאוז", label: "פנטהאוזים" },
      { href: "/properties?category=בית פרטי", label: "בתים פרטיים" },
      { href: "/properties?category=מסחרי", label: "נכסים מסחריים" },
      { href: "/properties?category=קרקע", label: "קרקעות" },
    ],
  },
  {
    title: "מידע משפטי",
    items: [
      { href: "/terms", label: "תנאי שימוש ועמלות" },
      { href: "/privacy", label: "מדיניות פרטיות" },
      { href: "/accessibility", label: "הצהרת נגישות" },
    ],
  },
];

export default async function Footer() {
  const settings = await getSettings();
  return (
    <footer className="relative bg-[#0E1B17] text-gray-300 pt-20 pb-8 overflow-hidden">
      <div
        className="absolute -top-32 -right-20 w-96 h-96 bg-[#1D9E75]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-20 w-96 h-96 bg-[#EF9F27]/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-4">
            <Logo variant="light" size="lg" />
            <p className="text-sm leading-relaxed text-gray-400 mt-5 max-w-sm">
              {settings.tagline}. מעל 20 שנות ניסיון בשוק הנדל&quot;ן של בית שמש — היכרות
              עמוקה, ליווי אישי, ותוצאות מוכחות.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={`https://wa.me/${settings.phoneIntl}`}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 grid place-items-center transition"
              >
                <span className="text-lg" aria-hidden="true">💬</span>
              </a>
              <a
                href={`tel:${settings.phoneRaw}`}
                aria-label="טלפון"
                className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 grid place-items-center transition"
              >
                <span className="text-lg" aria-hidden="true">📞</span>
              </a>
              <a
                href={`mailto:${settings.email}`}
                aria-label="אימייל"
                className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 grid place-items-center transition"
              >
                <span className="text-lg" aria-hidden="true">✉️</span>
              </a>
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 grid place-items-center transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z"/></svg>
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 grid place-items-center transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16z"/></svg>
                </a>
              )}
            </div>
            {settings.realtorLicense && (
              <p className="text-xs text-gray-500 mt-5">
                מתווך מורשה · רישיון מס&apos; <span dir="ltr" style={{ unicodeBidi: "isolate" }}>{settings.realtorLicense}</span> · לפי חוק המתווכים במקרקעין, התשנ&quot;ו–1996
              </p>
            )}
          </div>

          {footerLinks.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="text-white font-bold mb-4 text-sm tracking-wide">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-[#EF9F27] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-4 text-sm tracking-wide">יצירת קשר</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#EF9F27] mt-0.5">📍</span>
                <span>{settings.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF9F27] mt-0.5">📞</span>
                <a href={`tel:${settings.phoneRaw}`} className="hover:text-[#EF9F27]">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF9F27] mt-0.5">✉️</span>
                <a href={`mailto:${settings.email}`} className="hover:text-[#EF9F27] break-all">
                  {settings.emailDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF9F27] mt-0.5">🕒</span>
                <span>{settings.availability}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} הכתובת הנכונה · כל הזכויות שמורות.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
            <Link href="/terms" className="hover:text-[#EF9F27]">תנאי שימוש</Link>
            <Link href="/privacy" className="hover:text-[#EF9F27]">מדיניות פרטיות</Link>
            <Link href="/accessibility" className="hover:text-[#EF9F27]">הצהרת נגישות</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
