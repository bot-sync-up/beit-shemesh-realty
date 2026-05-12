import { getNeighborhoods } from "@/lib/data";
import NeighborhoodsManager from "./NeighborhoodsManager";

export const dynamic = "force-dynamic";

export default async function AdminNeighborhoodsPage() {
  const list = await getNeighborhoods();
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-[#0E1B17] mb-1">שכונות</h1>
      <p className="text-[#5A6B66] mb-6">סך הכל: <span className="font-bold tabular-nums">{list.length}</span></p>
      <NeighborhoodsManager initial={list} />
    </div>
  );
}
