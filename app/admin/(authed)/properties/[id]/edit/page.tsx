import { notFound } from "next/navigation";
import PropertyForm from "../../PropertyForm";
import { allNeighborhoods, getPropertyById } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(parseInt(id, 10));
  if (!property) notFound();

  const neighborhoods = Array.from(new Set(allNeighborhoods.map((n) => n.name)));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold text-[#0E1B17] mb-1">עריכה — {property.title}</h1>
      <p className="text-[#5A6B66] mb-6">מזהה נכס: {property.id}</p>
      <PropertyForm initial={property} neighborhoods={neighborhoods} />
    </div>
  );
}
