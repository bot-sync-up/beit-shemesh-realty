"use client";
import { useEffect, useState } from "react";

export default function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i! + 1) % images.length);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, images.length]);

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gradient-to-br from-[#1D9E75]/15 to-[#0F6E56]/15 grid place-items-center rounded-3xl">
        <span className="text-7xl opacity-40">🏠</span>
      </div>
    );
  }

  const main = images[active];

  return (
    <>
      <div className="grid md:grid-cols-[1fr_120px] gap-3">
        <button
          onClick={() => setOpenIdx(active)}
          className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-[#1D9E75]/15 to-[#0F6E56]/15 group"
          aria-label="הגדל תמונה"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={main}
            alt={`${title} - תמונה ${active + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur">
            🔍 הגדל · {images.length} תמונות
          </div>
        </button>

        <div className="grid grid-cols-4 md:grid-cols-1 gap-3 max-h-[480px] overflow-auto">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border-2 transition ${
                active === i ? "border-[#0F6E56] ring-2 ring-[#1D9E75]/30" : "border-transparent hover:border-[#1D9E75]/40"
              }`}
              aria-label={`תמונה ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="גלריית תמונות מוגדלת"
          className="fixed inset-0 z-[80] grid place-items-center lightbox-backdrop animate-fade-in"
          onClick={() => setOpenIdx(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setOpenIdx(null); }}
            aria-label="סגור"
            className="absolute top-5 right-5 text-white w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpenIdx((i) => (i! - 1 + images.length) % images.length); }}
            aria-label="הקודם"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpenIdx((i) => (i! + 1) % images.length); }}
            aria-label="הבא"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[openIdx]}
            alt={`${title} - תמונה ${openIdx + 1}`}
            className="max-w-[92vw] max-h-[88vh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-5 inset-x-0 text-center text-white/90 text-sm font-bold">
            {openIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
