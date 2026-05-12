import Link from "next/link";
import { getAllProperties } from "@/lib/data";
import PropertiesList from "./PropertiesList";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const props = await getAllProperties();
  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0E1B17]">נכסים</h1>
          <p className="text-[#5A6B66] mt-1">סך הכל: <span className="font-bold tabular-nums">{props.length}</span></p>
        </div>
        <Link
          href="/admin/properties/new"
          className="bg-[#0F6E56] text-white font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#0c5a47]"
        >
          + הוסף נכס
        </Link>
      </div>
      <PropertiesList initial={props} />
    </div>
  );
}
