import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של אתר הכתובת הנכונה — איך אנחנו מטפלים במידע שלכם.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FBF8F3] pt-28 pb-20 min-h-screen">
        <div className="container-x max-w-4xl">
          <header className="mb-10">
            <span className="tag bg-[#1D9E75]/10 text-[#0F6E56]">פרטיות</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-3">מדיניות פרטיות</h1>
            <p className="text-[#5A6B66] mt-3">עודכן לאחרונה: ינואר 2026</p>
          </header>

          <article className="bg-white rounded-3xl border border-[#1D9E75]/10 p-7 md:p-10 leading-loose text-[#3A4A45]">
            <Section title="1. מבוא">
              <p>
                הפרטיות שלכם חשובה לנו. מסמך זה מסביר איזה מידע אנחנו אוספים, איך אנחנו משתמשים בו, ואילו
                זכויות עומדות לכם בהתאם לחוק הגנת הפרטיות הישראלי ול-GDPR האירופי.
              </p>
            </Section>

            <Section title="2. איזה מידע נאסף">
              <ul className="list-disc ps-6 space-y-2">
                <li><b>מידע שאתם שולחים:</b> שם, טלפון, אימייל, ותוכן ההודעה — כשאתם ממלאים את טופס יצירת הקשר.</li>
                <li><b>מידע אנליטי:</b> נתוני שימוש כלליים באתר (דפים שנצפו, מקור תנועה) באמצעות Google Analytics.</li>
                <li><b>עוגיות:</b> עוגיות בסיסיות לתפעול האתר ולזיהוי מבקרים חוזרים.</li>
                <li><b>פיקסלים שיווקיים:</b> במקרים מסוימים נשתמש ב-Meta Pixel למדידת קמפיינים.</li>
              </ul>
            </Section>

            <Section title="3. איך אנחנו משתמשים במידע">
              <ul className="list-disc ps-6 space-y-2">
                <li>חזרה אליכם בעקבות פנייה.</li>
                <li>שיפור חוויית השימוש באתר.</li>
                <li>שליחת מידע רלוונטי על נכסים — רק אם ביקשתם זאת.</li>
                <li>עמידה בדרישות החוק.</li>
              </ul>
              <p className="mt-3">
                <b>אנחנו לא מוכרים, לא משכירים ולא מעבירים את המידע שלכם לצדדים שלישיים</b> — למעט במקרים
                הנדרשים על פי דין.
              </p>
            </Section>

            <Section title="4. הזכויות שלכם">
              <p className="mb-3">בכל זמן אתם רשאים:</p>
              <ul className="list-disc ps-6 space-y-2">
                <li>לבקש לעיין במידע שנאסף עליכם.</li>
                <li>לבקש לתקן או למחוק את המידע.</li>
                <li>לחזור בכם מהסכמתכם לקבלת תקשורת שיווקית.</li>
                <li>להגיש תלונה לרשות להגנת הפרטיות.</li>
              </ul>
              <p className="mt-3">
                לבקשה — שלחו אימייל לכתובת המופיעה ב<a href="/contact" className="text-[#0F6E56] font-bold underline">דף יצירת הקשר</a>.
              </p>
            </Section>

            <Section title="5. אבטחת מידע">
              <p>
                האתר עובר על HTTPS, מחובר ל-SSL מאובטח, ומגובה אוטומטית. אנחנו עושים מאמצים סבירים לאבטח
                את המידע שלכם, אבל אין מערכת מקוונת חסינה ב-100%.
              </p>
            </Section>

            <Section title="6. שימוש בעוגיות (Cookies)">
              <p>
                האתר עושה שימוש בעוגיות בסיסיות לתפקוד תקין ובעוגיות אנליטיקה. אפשר לחסום עוגיות בהגדרות
                הדפדפן — חלק מהפונקציות עשויות לא לעבוד כתקנן אם תעשו זאת.
              </p>
            </Section>

            <Section title="7. שינויים במדיניות">
              <p>
                ייתכן שנעדכן את המדיניות מעת לעת. עדכון משמעותי יפורסם בעמוד זה עם תאריך עדכון חדש.
              </p>
            </Section>

            <Section title="8. יצירת קשר">
              <p>
                לכל שאלה בנושא פרטיות, אנא פנו אלינו דרך עמוד <a href="/contact" className="text-[#0F6E56] font-bold underline">צור קשר</a>.
              </p>
            </Section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="text-xl font-extrabold text-[#0E1B17] mb-2">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
