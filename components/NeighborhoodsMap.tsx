"use client";
import { useState } from "react";
import type { Neighborhood } from "@/lib/data";

const positions: Record<string, { x: number; y: number }> = {
  "ramat-bet-shemesh-alef":  { x: 64, y: 30 },
  "ramat-bet-shemesh-bet":   { x: 76, y: 44 },
  "ramat-bet-shemesh-gimel": { x: 86, y: 60 },
  "nachal-bashor":           { x: 50, y: 38 },
  "merkaz-hair":             { x: 36, y: 52 },
  "givat-sharet":            { x: 28, y: 68 },
  "shkunat-hagafen":         { x: 42, y: 74 },
  "neve-avraham":            { x: 18, y: 40 },
};

export default function NeighborhoodsMap({ neighborhoods }: { neighborhoods: Neighborhood[] }) {
  const [active, setActive] = useState<Neighborhood | null>(neighborhoods[0] ?? null);

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch">
      {/* MAP */}
      <div className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F6E56] via-[#1D9E75] to-[#094534] shadow-xl border border-[#1D9E75]/20">
        {/* "topo" pattern */}
        <svg viewBox="0 0 200 160" className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay">
          <defs>
            <pattern id="topo" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 10 5 20 20 T 40 20" stroke="white" strokeWidth="0.5" fill="none" opacity="0.4"/>
              <path d="M0 30 Q 10 15 20 30 T 40 30" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="200" height="160" fill="url(#topo)"/>
        </svg>

        {/* roads */}
        <svg viewBox="0 0 100 80" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 0 50 Q 40 30 60 50 T 100 50" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
          <path d="M 50 0 L 50 80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" fill="none" />
          <path d="M 20 80 L 80 0" stroke="rgba(255,255,255,0.10)" strokeWidth="0.4" fill="none" />
        </svg>

        {/* city label */}
        <div className="absolute top-5 right-5 text-white">
          <div className="text-xs opacity-70 font-semibold">מפת אזורי פעילות</div>
          <div className="text-2xl font-extrabold">בית שמש</div>
        </div>

        {/* north arrow */}
        <div className="absolute bottom-5 left-5 text-white text-center text-xs font-bold opacity-80">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="mx-auto">
            <polygon points="12,2 18,22 12,18 6,22"/>
          </svg>
          N
        </div>

        {/* pins */}
        {neighborhoods.map((n) => {
          const pos = positions[n.slug] ?? { x: 50, y: 50 };
          const isActive = active?.id === n.id;
          return (
            <button
              key={n.slug}
              onClick={() => setActive(n)}
              onMouseEnter={() => setActive(n)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                isActive ? "z-20 scale-110" : "z-10 scale-100 hover:scale-110"
              }`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              aria-label={n.name}
            >
              <span className={`relative flex w-4 h-4`}>
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${
                    isActive ? "animate-ping" : ""
                  }`}
                  style={{ background: n.imageColor }}
                />
                <span
                  className="relative inline-flex rounded-full w-4 h-4 ring-2 ring-white shadow"
                  style={{ background: n.imageColor }}
                />
              </span>
              <span
                className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold rounded-full px-2 py-0.5 ${
                  isActive ? "bg-white text-[#0E1B17]" : "bg-black/30 text-white"
                }`}
              >
                {n.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* DETAILS */}
      <div className="bg-white rounded-3xl border border-[#1D9E75]/12 p-7 shadow-sm flex flex-col">
        {active ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full" style={{ background: active.imageColor }} />
              <span className="text-xs font-semibold text-[#5A6B66]">{active.character}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0E1B17] mb-3">{active.name}</h3>
            <p className="text-[#3A4A45] leading-relaxed mb-5">{active.description}</p>

            <dl className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#F1F7F4] rounded-2xl p-4">
                <dt className="text-xs text-[#5A6B66] font-semibold mb-0.5">טווח מכירה</dt>
                <dd className="text-sm font-extrabold text-[#0F6E56]">{active.avgPriceSale}</dd>
              </div>
              <div className="bg-[#FFF5E2] rounded-2xl p-4">
                <dt className="text-xs text-[#5A6B66] font-semibold mb-0.5">טווח שכירות</dt>
                <dd className="text-sm font-extrabold text-[#BA7517]">{active.avgPriceRent}</dd>
              </div>
            </dl>

            <div>
              <div className="text-xs font-semibold text-[#5A6B66] mb-2">דגשים</div>
              <ul className="flex flex-wrap gap-2">
                {active.highlights.map((h) => (
                  <li key={h} className="tag bg-[#1D9E75]/10 text-[#0F6E56]">✓ {h}</li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-5">
              <a
                href={`/properties?neighborhood=${encodeURIComponent(active.name)}`}
                className="btn-primary w-full justify-center"
              >
                נכסים זמינים ב{active.name}
              </a>
            </div>
          </>
        ) : (
          <p className="text-[#5A6B66]">בחרו שכונה במפה כדי לראות פרטים</p>
        )}
      </div>
    </div>
  );
}
