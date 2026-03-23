import Link from "next/link";

export type Property = {
  id: number;
  title: string;
  type: "למכירה" | "להשכרה" | "נמכר";
  price: string;
  rooms: number;
  area: number;
  neighborhood: string;
  description: string;
  image: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  const statusColors: Record<string, string> = {
    "למכירה": "bg-[#1A6B8A] text-white",
    "להשכרה": "bg-[#D4A843] text-white",
    "נמכר": "bg-gray-500 text-white",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#1A6B8A]/20 to-[#1A6B8A]/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-20">🏠</span>
        </div>
        {property.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[property.type]}`}
        >
          {property.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-[#1A1A2E] mb-1">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <span>📍</span> {property.neighborhood}, בית שמש
        </p>

        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <span>🛏</span> {property.rooms} חדרים
          </span>
          <span className="flex items-center gap-1">
            <span>📐</span> {property.area} מ&quot;ר
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#1A6B8A]">{property.price}</span>
          <Link
            href={`/properties/${property.id}`}
            className="bg-[#1A6B8A] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#155a73] transition-colors"
          >
            פרטים נוספים
          </Link>
        </div>
      </div>
    </div>
  );
}
