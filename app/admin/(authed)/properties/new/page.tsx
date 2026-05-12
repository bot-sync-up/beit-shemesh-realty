import PropertyForm from "../PropertyForm";
import { allNeighborhoods } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  const neighborhoods = Array.from(new Set(allNeighborhoods.map((n) => n.name)));
  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold text-[#0E1B17] mb-6">נכס חדש</h1>
      <PropertyForm neighborhoods={neighborhoods} />
    </div>
  );
}
