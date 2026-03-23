import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Link from "next/link";

const specializations = [
  { icon: "🏠", title: "דירות למגורים", desc: "שכונות מגורים, מרכז העיר – כל גודל וסגנון" },
  { icon: "🏢", title: "נכסים מסחריים", desc: "חנויות, משרדים, שטחי מסחר" },
  { icon: "🏗️", title: "פרויקטים חדשים", desc: "קבלנים ויזמים – ייצוג מקצועי" },
  { icon: "🌱", title: "קרקעות", desc: "מכירה ורכישה של קרקעות בית שמש" },
];

const neighborhoods = [
  "נחל בשור", "רמת בית שמש א'", "רמת בית שמש ב'", "רמת בית שמש ג'",
  "מרכז העיר", "גבעת שרת", "שכונת הגפן", "נווה אברהם",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1A1A2E] to-[#1A6B8A] pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                אודות
              </h1>
              <p className="text-blue-100 text-lg">
                20 שנות ניסיון, אלפי עסקאות מוצלחות, ואהבה אמיתית לבית שמש
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Photo placeholder */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#1A6B8A]/10 to-[#D4A843]/10 rounded-3xl h-96 flex items-center justify-center border-2 border-[#1A6B8A]/20">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👤</div>
                    <p className="text-gray-400 text-sm">תמונה מקצועית</p>
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 -left-4 bg-[#D4A843] text-white rounded-2xl px-6 py-4 shadow-lg">
                  <div className="text-3xl font-extrabold">20+</div>
                  <div className="text-sm font-medium">שנות ניסיון</div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <span className="inline-block bg-[#1A6B8A]/10 text-[#1A6B8A] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  הסיפור שלי
                </span>
                <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">
                  המומחה המקומי שלכם לנדל&quot;ן
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    כבר מעל שני עשורים אני מלווה משפחות, זוגות ומשקיעים במסע החשוב ביותר שלהם – רכישת בית.
                    בית שמש היא לא רק מקום עבודתי – היא ביתי, הקהילה שלי, האנשים שאני מכיר.
                  </p>
                  <p>
                    הכרת כל שכונה, כל סמטה, כל מגמת מחיר – זו לא רק מקצועיות, זו תשוקה אמיתית.
                    כשאתם מחפשים נכס, אתם לא מקבלים סוכן – אתם מקבלים שותף אמיתי.
                  </p>
                  <p>
                    מה שמייחד אותי: אתם מקבלים אותי. לא מזכירה, לא עוזר – ישיר, מהיר, אישי.
                    כי כל לקוח אצלי הוא לקוח VIP.
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                  <Link href="/contact" className="bg-[#1A6B8A] text-white px-6 py-3 rounded-full font-bold hover:bg-[#155a73] transition-colors">
                    צור קשר
                  </Link>
                  <Link href="/properties" className="border-2 border-[#1A6B8A] text-[#1A6B8A] px-6 py-3 rounded-full font-bold hover:bg-[#1A6B8A]/5 transition-colors">
                    הנכסים שלי
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specializations */}
        <section className="bg-[#F8FAFB] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">תחומי התמחות</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specializations.map((s) => (
                <div key={s.title} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="font-bold text-[#1A1A2E] mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">אזורי פעילות בבית שמש</h2>
              <p className="text-gray-500">פעיל בכל שכונות בית שמש ורמת בית שמש</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {neighborhoods.map((n) => (
                <span key={n} className="bg-[#1A6B8A]/10 text-[#1A6B8A] px-5 py-2 rounded-full font-medium text-sm hover:bg-[#1A6B8A] hover:text-white transition-colors cursor-default">
                  📍 {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#1A1A2E] py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { v: "20+", l: "שנות ניסיון" },
                { v: "500+", l: "עסקאות" },
                { v: "98%", l: "שביעות רצון" },
                { v: "8", l: "שכונות פעילות" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-4xl font-extrabold text-[#D4A843] mb-1">{s.v}</div>
                  <div className="text-gray-400 text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

    </>
  );
}
