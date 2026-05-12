import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import { getAllProperties, getPropertyById, siteSettings } from "@/lib/data";

type RouteParams = { id: string };

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const all = await getAllProperties();
  return all.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(parseInt(id, 10));
  if (!property) return { title: "נכס לא נמצא" };
  const path = `/properties/${id}`;
  return {
    title: `${property.title}`,
    description: property.shortDescription,
    alternates: { canonical: path },
    openGraph: {
      title: property.title,
      description: property.shortDescription,
      url: path,
      images: property.images.length ? property.images.map((src) => ({ url: src })) : undefined,
    },
  };
}

export default async function PropertyPage({ params }: { params: Promise<RouteParams> }) {
  const { id } = await params;
  const property = await getPropertyById(parseInt(id, 10));
  if (!property) notFound();

  const all = await getAllProperties();
  const related = all
    .filter((p) => p.id !== property.id && p.neighborhood === property.neighborhood && p.status === "active")
    .slice(0, 3);

  const sold = property.status === "sold";
  const waText = `שלום, אני מתעניין/ת ב: ${property.title} (${property.priceLabel})`;
  const mapQuery = property.lat && property.lng
    ? `${property.lat},${property.lng}`
    : encodeURIComponent(property.address);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`;

  return (
    <>
      <Navbar />
      <main className="bg-[#FBF8F3] pt-24 pb-20">
        <div className="container-x">
          {/* breadcrumbs */}
          <nav aria-label="breadcrumbs" className="text-sm text-[#5A6B66] mb-5 flex flex-wrap gap-1 items-center">
            <Link href="/" className="hover:text-[#0F6E56]">דף הבית</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-[#0F6E56]">נכסים</Link>
            <span>/</span>
            <span className="text-[#0E1B17]">{property.title}</span>
          </nav>

          {/* header */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`tag ${sold ? "bg-gray-700" : "bg-[#0F6E56]"} text-white`}>{property.type}</span>
                <span className="tag bg-[#EF9F27]/15 text-[#BA7517]">{property.category}</span>
                {sold && <span className="tag bg-red-100 text-red-700">לא זמין</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0E1B17] text-balance">
                {property.title}
              </h1>
              <p className="text-[#5A6B66] mt-2 flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0F6E56"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                {property.address}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#1D9E75]/12 p-6 shadow-sm">
              <div className="text-sm text-[#5A6B66]">מחיר</div>
              <div className="text-3xl font-extrabold gradient-text mb-3 tabular-nums">{property.priceLabel}</div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm border-y border-[#1D9E75]/10 py-3 mb-4">
                {property.rooms > 0 && (
                  <div>
                    <div className="font-extrabold text-[#0E1B17]">{property.rooms}</div>
                    <div className="text-xs text-[#5A6B66]">חדרים</div>
                  </div>
                )}
                <div>
                  <div className="font-extrabold text-[#0E1B17]">{property.area}</div>
                  <div className="text-xs text-[#5A6B66]">מ&quot;ר</div>
                </div>
                {property.floor > 0 && (
                  <div>
                    <div className="font-extrabold text-[#0E1B17]">{property.floor}/{property.totalFloors}</div>
                    <div className="text-xs text-[#5A6B66]">קומה</div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <a href={`https://wa.me/${siteSettings.phoneIntl}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener" className="btn-primary justify-center">
                  <span aria-hidden="true">💬</span>
                  <span>שלחו הודעה בווטסאפ</span>
                </a>
                <a href={`tel:${siteSettings.phoneRaw}`} className="btn-gold justify-center">
                  <span aria-hidden="true">📞</span>
                  <span dir="ltr" style={{ unicodeBidi: "isolate" }}>{siteSettings.phone}</span>
                </a>
                <Link href="/contact" className="text-center text-[#0F6E56] font-bold text-sm hover:underline mt-1">
                  או שלחו טופס בקשה
                </Link>
              </div>
            </div>
          </div>

          {/* gallery */}
          <Reveal>
            <PropertyGallery images={property.images} title={property.title} />
          </Reveal>

          {/* details */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-10">
            <div className="space-y-8">
              <Reveal>
                <article className="bg-white rounded-3xl p-7 border border-[#1D9E75]/10">
                  <h2 className="text-2xl font-extrabold text-[#0E1B17] mb-3">תיאור הנכס</h2>
                  <p className="text-[#3A4A45] leading-loose whitespace-pre-line">
                    {property.description}
                  </p>
                </article>
              </Reveal>

              <Reveal>
                <article className="bg-white rounded-3xl p-7 border border-[#1D9E75]/10">
                  <h2 className="text-2xl font-extrabold text-[#0E1B17] mb-5">מאפיינים</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {property.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 bg-[#F1F7F4] rounded-xl px-4 py-2.5 text-sm font-medium text-[#0E1B17]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>

              <Reveal>
                <article className="bg-white rounded-3xl p-7 border border-[#1D9E75]/10">
                  <h2 className="text-2xl font-extrabold text-[#0E1B17] mb-4">מיקום</h2>
                  <p className="text-[#5A6B66] mb-4">{property.address}</p>
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#1D9E75]/15">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="מפה של מיקום הנכס"
                    />
                  </div>
                </article>
              </Reveal>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <div className="bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] text-white rounded-3xl p-7 shadow-xl shadow-[#0F6E56]/15">
                  <h3 className="font-bold text-xl mb-2">מתעניינים בנכס?</h3>
                  <p className="text-emerald-50/90 text-sm leading-relaxed mb-5">
                    אשמח לתת לכם מידע נוסף, לתאם סיור או לענות על כל שאלה.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a href={`https://wa.me/${siteSettings.phoneIntl}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener" className="bg-white text-[#0F6E56] font-bold rounded-full py-2.5 text-center hover:bg-emerald-50 transition">
                      <span aria-hidden="true">💬</span> שלחו לי ווטסאפ
                    </a>
                    <Link href="/contact#calendly" className="bg-white/15 backdrop-blur border border-white/30 text-white font-bold rounded-full py-2.5 text-center hover:bg-white/25 transition">
                      <span aria-hidden="true">📅</span> קביעת פגישה
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-3xl p-7 border border-[#1D9E75]/10">
                  <h3 className="font-bold text-lg text-[#0E1B17] mb-4">שכונה: {property.neighborhood}</h3>
                  <Link href="/neighborhoods" className="text-[#0F6E56] font-bold text-sm hover:underline">
                    מידע על השכונה ←
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* related */}
          {related.length > 0 && (
            <section className="mt-16">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0E1B17] mb-6">
                  עוד נכסים בשכונה <span className="gradient-text">{property.neighborhood}</span>
                </h2>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => <PropertyCard key={p.id} property={p} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
