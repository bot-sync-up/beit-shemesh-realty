import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של אתר הכתובת הנכונה — תיווך נדל\"ן בבית שמש.",
  alternates: { canonical: "/accessibility" },
  openGraph: { url: "/accessibility" },
};

export default async function AccessibilityPage() {
  const siteSettings = await getSettings();
  const lastUpdated = "מאי 2026";

  return (
    <>
      <Navbar />
      <main className="bg-[#FBF8F3] pt-32 pb-20">
        <div className="container-x max-w-3xl">
          <span className="tag bg-[#1D9E75]/10 text-[#0F6E56]">נגישות</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-3 mb-6 text-balance">
            הצהרת נגישות
          </h1>

          <article className="bg-white rounded-3xl p-8 md:p-10 border border-[#1D9E75]/10 space-y-5 text-[#3A4A45] leading-loose">
            <p>
              אתר &quot;הכתובת הנכונה&quot; שואף להיות נגיש לכלל הציבור, לרבות אנשים עם מוגבלות,
              בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח–1998 ולתקנות שוויון זכויות לאנשים
              עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג–2013.
            </p>

            <h2 className="text-xl font-extrabold text-[#0E1B17] pt-3">רמת הנגישות באתר</h2>
            <p>
              האתר נבנה בהתאם להמלצות התקן הישראלי ת&quot;י 5568 — מבוסס על הנחיות WCAG 2.1
              ברמה AA. בין היתר ננקטו הצעדים הבאים:
            </p>
            <ul className="list-disc ps-6 space-y-1.5">
              <li>תמיכה מלאה בקריאה והפעלה באמצעות מקלדת.</li>
              <li>סימון פוקוס ויזואלי ברור על כל הרכיבים האינטראקטיביים.</li>
              <li>טקסט חלופי (alt) לכל התמונות.</li>
              <li>היררכיית כותרות תקינה (h1, h2, h3) לנגישות לקוראי מסך.</li>
              <li>ניגודיות צבעים בהתאם לדרישות התקן.</li>
              <li>תמיכה בכיוון מימין-לשמאל ובעברית כשפת ברירת המחדל.</li>
              <li>הימנעות מהבזקים העלולים לעורר התקפים.</li>
              <li>אפשרות להפחתת אנימציות (prefers-reduced-motion).</li>
            </ul>

            <h2 className="text-xl font-extrabold text-[#0E1B17] pt-3">חלקים שאינם נגישים</h2>
            <p>
              חלק מהרכיבים המוטמעים מצדדים שלישיים (לדוגמה: מפות Google) עשויים להיות נגישים
              חלקית בלבד. אנו פועלים לשפר זאת באופן מתמיד.
            </p>

            <h2 className="text-xl font-extrabold text-[#0E1B17] pt-3">פנייה לרכז הנגישות</h2>
            <p>
              נתקלתם בבעיית נגישות? נשמח לדעת כדי שנוכל לתקן. תוכלו לפנות אלינו דרך:
            </p>
            <ul className="space-y-1.5">
              <li>
                טלפון:{" "}
                <a href={`tel:${siteSettings.phoneRaw}`} className="text-[#0F6E56] font-bold hover:underline" dir="ltr" style={{ unicodeBidi: "isolate" }}>
                  {siteSettings.phone}
                </a>
              </li>
              <li>
                אימייל:{" "}
                <a href={`mailto:${siteSettings.email}`} className="text-[#0F6E56] font-bold hover:underline break-all">
                  {siteSettings.emailDisplay}
                </a>
              </li>
            </ul>
            <p className="text-sm text-[#5A6B66] pt-4 border-t border-[#1D9E75]/10">
              הצהרה זו עודכנה לאחרונה: {lastUpdated}.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
