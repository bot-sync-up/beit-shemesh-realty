import { getJson } from "@/lib/storage";
import type { Lead } from "@/lib/types";
import LeadsTable from "./LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = (await getJson<Lead[]>("data/leads.json")) ?? [];
  const sorted = [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0E1B17]">לידים מהאתר</h1>
          <p className="text-[#5A6B66] mt-1">פניות מטופס "צור קשר" באתר. נשמרים אוטומטית.</p>
        </div>
        <div className="text-sm text-[#5A6B66]">סה"כ: <span className="font-bold tabular-nums">{sorted.length}</span></div>
      </div>
      <LeadsTable initial={sorted} />
    </div>
  );
}
