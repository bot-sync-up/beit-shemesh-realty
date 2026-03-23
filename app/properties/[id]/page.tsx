import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Link from "next/link";
import propertiesData from "@/data/properties.json";

type Property = {
  id: number;
  title: string;
  type: string;
  price: string;
  rooms: number;
  area: number;
  neighborhood: string;
  description: string;
  image: string;
  active: boolean;
};

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  const property = (propertiesData as Property[]).find((p) => p.id === id);

  if (!property) return notFound();

  const statusColors: Record<string, string> = {
    "למכירה": "bg-[#1A6B8A] text-white",
    "להשכרה": "bg-[#D4A843] text-white",
    "נמכר": "bg-gray-500 text-white",
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-[#1A1A2E] to-[#1A6B8A] pt-32 pb-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">דף הבית</Link>
              <span>›</span>
              <Link href="/properties" className="hover:text-white transition-colors">נכסים</Link>
              <span>›</span>
              <span className="text-white">{property.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{property.title}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColors[property.type] || "bg-gray-500 text-white"}`}>
                {property.type}
              </span>
              <span className="text-blue-200 text-sm">📍 {property.neighborhood}, בית שמש</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#F8FAFB] py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main column */}
              <div className="md:col-span-2 space-y-6">
                {/* Image */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ aspectRatio: "16/9" }}>
                  {property.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1A6B8A]/10 to-[#1A6B8A]/5 text-gray-300">
                      <div className="text-7xl mb-3">🏠</div>
                      <p className="text-sm">תמונה תתווסף בקרוב</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">תיאור הנכס</h2>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {property.description || "לפרטים נוספים אודות הנכס, אנא צרו קשר."}
                  </p>
                </div>

                {/* Details grid */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">פרטי הנכס</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { icon: "🛏", label: "חדרים", value: `${property.rooms} חדרים` },
                      { icon: "📐", label: "שטח", value: `${property.area} מ"ר` },
                      { icon: "📍", label: "שכונה", value: property.neighborhood },
                      { icon: "🏷️", label: "סטטוס", value: property.type },
                      { icon: "💰", label: "מחיר", value: property.price },
                    ].map((d) => (
                      <div key={d.label} className="bg-[#F8FAFB] rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl mb-1">{d.icon}</div>
                        <div className="text-xs text-gray-400 mb-0.5">{d.label}</div>
                        <div className="font-semibold text-[#1A1A2E] text-sm">{d.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Back link */}
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 text-[#1A6B8A] text-sm font-medium hover:underline"
                >
                  ← חזרה לכל הנכסים
                </Link>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                  <div className="text-2xl font-bold text-[#1A6B8A] mb-1">{property.price}</div>
                  <div className="text-sm text-gray-500 mb-6">
                    📍 {property.neighborhood}, בית שמש
                  </div>

                  <div className="space-y-3">
                    <a
                      href="tel:0527609172"
                      className="flex items-center justify-center gap-2 w-full bg-[#1A6B8A] text-white py-3.5 rounded-xl font-bold hover:bg-[#155a73] transition-colors"
                    >
                      📞 052-760-9172
                    </a>
                    <a
                      href="mailto:7609172@gmail.com"
                      className="flex items-center justify-center gap-2 w-full border-2 border-[#1A6B8A] text-[#1A6B8A] py-3.5 rounded-xl font-bold hover:bg-[#1A6B8A]/5 transition-colors"
                    >
                      📧 שלח מייל
                    </a>
                    <Link
                      href={`/contact?property=${encodeURIComponent(property.title)}`}
                      className="flex items-center justify-center gap-2 w-full bg-[#D4A843] text-white py-3.5 rounded-xl font-bold hover:bg-[#b8922e] transition-colors"
                    >
                      📩 השאר פרטים
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <div className="text-xs text-gray-400 mb-1">מתווך מוביל בבית שמש</div>
                    <div className="font-semibold text-[#1A1A2E] text-sm">20+ שנות ניסיון</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
