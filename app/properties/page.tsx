import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertiesExplorer from "@/components/PropertiesExplorer";
import { getActiveProperties, allNeighborhoods } from "@/lib/data";

export const metadata: Metadata = {
  title: 'נכסים זמינים | דירות למכירה ולהשכרה בבית שמש',
  description: 'מבחר עדכני של דירות למכירה ולהשכרה, פנטהאוזים, בתים פרטיים, מסחרי וקרקעות בבית שמש. סינון בזמן אמת.',
  alternates: { canonical: "/properties" },
  openGraph: { url: "/properties" },
};

export const revalidate = 60;

export default async function PropertiesPage() {
  const properties = await getActiveProperties();
  const neighborhoods = Array.from(new Set(allNeighborhoods.map(n => n.name)));

  return (
    <>
      <Navbar />
      <main className="bg-[#FBF8F3] min-h-screen">
        {/* HERO */}
        <section className="relative pt-32 pb-12 bg-gradient-to-br from-[#094534] via-[#0F6E56] to-[#1D9E75] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="container-x relative">
            <span className="tag bg-white/10 text-[#EF9F27] border border-[#EF9F27]/30">נכסים</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight text-balance">
              כל הנכסים <span className="bg-gradient-to-l from-[#EF9F27] to-[#FFD27F] bg-clip-text text-transparent">בבית שמש.</span>
            </h1>
            <p className="text-emerald-50/90 mt-3 max-w-2xl text-lg">
              מבחר נכסים עדכני — דירות, פנטהאוזים, בתים, מסחרי וקרקעות. סננו לפי שכונה, מחיר וגודל.
            </p>
          </div>
        </section>

        <section className="container-x py-10 md:py-14">
          <Suspense fallback={<div className="text-center py-20 text-[#5A6B66]">טוען נכסים…</div>}>
            <PropertiesExplorer properties={properties} neighborhoods={neighborhoods} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
