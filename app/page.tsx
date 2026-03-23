import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import PropertyCard, { type Property } from "@/components/PropertyCard";
import MortgageCalculator from "@/components/MortgageCalculator";

const featuredProperties: Property[] = [
  {
    id: 1,
    title: "דירת 4 חדרים – שכונת נחל בשור",
    type: "למכירה",
    price: "₪1,750,000",
    rooms: 4,
    area: 110,
    neighborhood: "נחל בשור",
    description: "דירה מרווחת בקומה שלישית עם מרפסת שמש גדולה ונוף מרהיב.",
    image: "",
  },
  {
    id: 2,
    title: "דירת 3 חדרים – מרכז העיר",
    type: "להשכרה",
    price: "₪4,500/חודש",
    rooms: 3,
    area: 80,
    neighborhood: "מרכז העיר",
    description: "דירה משופצת עם חניה ומחסן בלב ליבה של בית שמש.",
    image: "",
  },
  {
    id: 3,
    title: "דירת גן 5 חדרים – רמת בית שמש",
    type: "למכירה",
    price: "₪2,200,000",
    rooms: 5,
    area: 145,
    neighborhood: "רמת בית שמש",
    description: "דירת גן פינתית עם גינה פרטית וחדר ממ\"ד.",
    image: "",
  },
];

const stats = [
  { value: "20+", label: "שנות ניסיון" },
  { value: "500+", label: "עסקאות סגורות" },
  { value: "98%", label: "לקוחות מרוצים" },
  { value: "#1", label: "מתווך בבית שמש" },
];

const advantages = [
  {
    icon: "📍",
    title: "היכרות עמוקה עם האזור",
    desc: "20 שנה בבית שמש – מכיר כל שכונה, מחיר, וגורם מקומי",
  },
  {
    icon: "⚡",
    title: "מענה מהיר וזמינות גבוהה",
    desc: "לקוח שמתקשר – מקבל מענה. אין מזכירות, אין תורים – ישיר ומהיר",
  },
  {
    icon: "🤝",
    title: "ליווי אישי מלא",
    desc: "מהחיפוש הראשון ועד החתימה הסופית – לצידך בכל שלב",
  },
  {
    icon: "💡",
    title: "ייעוץ מקצועי ואמין",
    desc: "ניסיון רב בכל סוגי הנכסים: מגורים, מסחרי, קרקעות ופרויקטים",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#1A1A2E] via-[#1A6B8A] to-[#155a73] overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-white" />
            <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full border border-white" />
            <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full border border-white" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-16 w-full">
            <div className="max-w-2xl">
              <span className="inline-block bg-[#D4A843]/20 text-[#D4A843] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                🏆 מתווך הנדל&quot;ן המוביל בבית שמש
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                הנכס הנכון,<br />
                <span className="text-[#D4A843]">במחיר הנכון</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                מעל 20 שנות ניסיון בשוק הנדל&quot;ן של בית שמש. היכרות עמוקה עם כל שכונה,
                זמינות גבוהה ותוצאות מוכחות – זה מה שמייחד אותי.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/properties"
                  className="bg-[#D4A843] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#b8922e] transition-colors text-lg"
                >
                  צפה בנכסים
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 backdrop-blur text-white border border-white/30 px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-colors text-lg"
                >
                  צור קשר
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-[#1A6B8A] mb-2">
                    {s.value}
                  </div>
                  <div className="text-gray-600 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section className="bg-[#F8FAFB] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[#1A1A2E]">נכסים זמינים</h2>
                <p className="text-gray-500 mt-1">נכסים נבחרים למכירה ולהשכרה בבית שמש</p>
              </div>
              <Link href="/properties" className="text-[#1A6B8A] font-semibold hover:underline">
                כל הנכסים ←
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>

        {/* WHY ME */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3">למה לבחור בי?</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                הניסיון, הזמינות וההיכרות העמוקה עם שוק בית שמש – אלו היתרונות שמביאים תוצאות
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((adv) => (
                <div key={adv.title} className="bg-[#F8FAFB] rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{adv.icon}</div>
                  <h3 className="font-bold text-[#1A1A2E] mb-2">{adv.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MORTGAGE CALCULATOR */}
        <section className="bg-[#F8FAFB] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <MortgageCalculator />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-[#1A6B8A] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">לקוחות מרוצים</h2>
              <p className="text-blue-100">מה אומרים עלי לקוחותי</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "משפחת כהן", text: "מצאנו את דירת החלומות שלנו תוך שבועיים! הזמינות והמקצועיות יוצאות מן הכלל.", area: "רמת בית שמש" },
                { name: "אבי לוי", text: "ניסיון של 20 שנה ניכר בכל שלב. ידע שוק מדהים, מחירים מדויקים, תוצאות מוכחות.", area: "נחל בשור" },
                { name: "שרה ויסמן", text: "ליווי אישי, סבלנות אין סופית ותשובה לכל שאלה. ממליצה בחום לכולם!", area: "מרכז העיר" },
              ].map((t) => (
                <div key={t.name} className="bg-white/10 backdrop-blur rounded-2xl p-6">
                  <div className="text-[#D4A843] text-2xl mb-3">★★★★★</div>
                  <p className="text-white leading-relaxed mb-4 text-sm">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-blue-200 text-xs">{t.area}, בית שמש</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#D4A843] py-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">מוכנים למצוא את הנכס שלכם?</h2>
            <p className="text-yellow-100 mb-8">צרו קשר עכשיו לייעוץ חינם ומחויבות אישית לצרכיכם</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-[#D4A843] px-8 py-3.5 rounded-full font-bold hover:bg-gray-50 transition-colors">
                צור קשר
              </Link>
              <a href="tel:0527609172" className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors">
                📞 052-760-9172
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

    </>
  );
}
