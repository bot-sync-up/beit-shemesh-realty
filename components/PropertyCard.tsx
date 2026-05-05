import Link from "next/link";
import type { Property } from "@/lib/data";

const typeStyles: Record<Property["type"], { bg: string; label: string }> = {
  "למכירה": { bg: "bg-[#0F6E56] text-white", label: "למכירה" },
  "להשכרה": { bg: "bg-[#EF9F27] text-white", label: "להשכרה" },
  "נמכר":   { bg: "bg-gray-700 text-white", label: "נמכר" },
};

export default function PropertyCard({ property }: { property: Property }) {
  const style = typeStyles[property.type];
  const cover = property.images[0];
  const sold = property.status === "sold";

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#1D9E75]/8 card-hover block"
      aria-label={`צפייה בפרטים: ${property.title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#1D9E75]/15 to-[#0F6E56]/15">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={property.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              sold ? "grayscale-[0.5]" : ""
            }`}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-7xl opacity-25">🏠</div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 pointer-events-none" />

        <span
          className={`absolute top-3 ${style.bg} text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}
          style={{ insetInlineStart: "0.85rem" }}
        >
          {style.label}
        </span>

        <span
          className="absolute top-3 bg-white/95 backdrop-blur text-[#0E1B17] text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
          style={{ insetInlineEnd: "0.85rem" }}
        >
          {property.category}
        </span>

        <div
          className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none"
        >
          <div className="font-extrabold text-lg drop-shadow tabular-nums">{property.priceLabel}</div>
          <div className="text-[11px] opacity-90 flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
            {property.neighborhood}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-[17px] text-[#0E1B17] mb-2 line-clamp-1 group-hover:text-[#0F6E56] transition-colors">
          {property.title}
        </h3>
        <p className="text-sm text-[#5A6B66] mb-4 line-clamp-2 leading-relaxed">
          {property.shortDescription}
        </p>

        <div className="flex items-center gap-4 text-[13px] text-[#0E1B17] border-t border-[#1D9E75]/12 pt-4">
          {property.rooms > 0 && (
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4M3 12v6h18v-6M3 16h18M7 12V8" />
              </svg>
              <span><b>{property.rooms}</b> חדרים</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M4 9h16M9 4v16" />
            </svg>
            <span><b>{property.area}</b> מ&quot;ר</span>
          </span>
          {property.floor > 0 && (
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <span>קומה <b>{property.floor}</b></span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
