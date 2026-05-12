import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "תנאי שימוש ועמלות תיווך",
  description: "תנאי שימוש באתר הכתובת הנכונה ותעריפי עמלות תיווך, בהתאם לחוק המתווכים במקרקעין.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FBF8F3] pt-28 pb-20 min-h-screen">
        <div className="container-x max-w-4xl">
          <header className="mb-10">
            <span className="tag bg-[#1D9E75]/10 text-[#0F6E56]">משפטי</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0E1B17] mt-3">תנאי שימוש ועמלות תיווך</h1>
            <p className="text-[#5A6B66] mt-3">עודכן לאחרונה: ינואר 2026</p>
          </header>

          <article className="bg-white rounded-3xl border border-[#1D9E75]/10 p-7 md:p-10 leading-loose text-[#3A4A45]">
            <Section title="1. כללי">
              <p>
                אתר &ldquo;הכתובת הנכונה&rdquo; (להלן: &ldquo;האתר&rdquo;) מופעל על ידי מתווך נדל&quot;ן מורשה הפועל
                בהתאם לחוק המתווכים במקרקעין, התשנ&quot;ו-1996. השימוש באתר מהווה הסכמה לתנאי השימוש המפורטים להלן.
              </p>
            </Section>

            <Section title="2. השירות המוצע">
              <p>
                האתר מספק מידע על נכסי נדל&quot;ן בבית שמש ובסביבה, הצגת המתווך ופרטי קשר. המידע באתר
                מסופק כמיטב הידיעה ועשוי להשתנות. אין להסתמך על האתר בלבד לשם קבלת החלטות עסקיות.
              </p>
            </Section>

            <Section title="3. עמלות תיווך">
              <p className="mb-3">
                עמלות התיווך מוסכמות מראש ובכתב בהתאם להוראות החוק, ומשולמות רק במקרה של עסקה שהושלמה.
                התעריפים המקובלים:
              </p>
              <ul className="list-disc ps-6 space-y-2">
                <li><b>מכירה / קנייה:</b> 2% ממחיר העסקה + מע&quot;מ — מכל צד.</li>
                <li><b>השכרה:</b> חודש שכירות אחד + מע&quot;מ — מכל צד.</li>
                <li><b>נכסים מסחריים וקרקעות:</b> בהתאם להסכם פרטני שיוסכם מראש.</li>
              </ul>
              <p className="mt-3">
                כל הסכם תיווך נחתם בכתב ולא משולמת עמלה אלא אם נחתם הסכם מראש בכתב, כפי שמחייב החוק.
              </p>
            </Section>

            <Section title="4. שימוש בתכנים">
              <p>
                אין להעתיק, לשכפל, להפיץ או לעשות שימוש מסחרי בתכני האתר ללא אישור מראש ובכתב. כל הזכויות
                שמורות. תמונות הנכסים מתפרסמות בהסכמת בעליהן ולמטרת שיווק בלבד.
              </p>
            </Section>

            <Section title="5. הגבלת אחריות">
              <p>
                המידע המוצג באתר נועד למטרות מידע כללי בלבד. אין לראות בו ייעוץ משפטי, מיסויי או פיננסי.
                לפני קבלת כל החלטה מומלץ להתייעץ עם עורך דין, שמאי ויועץ משכנתאות.
              </p>
            </Section>

            <Section title="6. שינויים">
              <p>
                המתווך שומר לעצמו את הזכות לעדכן תנאים אלו מעת לעת. השימוש המתמשך באתר לאחר עדכון מהווה
                הסכמה לתנאים המעודכנים.
              </p>
            </Section>

            <Section title="7. סמכות שיפוט">
              <p>
                על תנאים אלו יחול הדין הישראלי בלבד. סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים בישראל.
              </p>
            </Section>

            <Section title="8. יצירת קשר">
              <p>
                לכל שאלה על תנאי השימוש או עמלות התיווך, אפשר לפנות באמצעות עמוד <a href="/contact" className="text-[#0F6E56] font-bold underline">צור קשר</a>.
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
