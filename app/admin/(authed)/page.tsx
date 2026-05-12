import Link from "next/link";
import { getJson } from "@/lib/storage";
import propertiesJson from "@/data/properties.json";
import testimonialsJson from "@/data/testimonials.json";
import type { Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [propsFromR2, testFromR2, leads] = await Promise.all([
    getJson<unknown[]>("data/properties.json"),
    getJson<unknown[]>("data/testimonials.json"),
    getJson<Lead[]>("data/leads.json"),
  ]);
  const propCount = (propsFromR2 ?? propertiesJson).length;
  const testCount = (testFromR2 ?? testimonialsJson).length;
  const leadCount = leads?.length ?? 0;
  const unreadLeads = (leads ?? []).filter((l) => !l.read).length;

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-extrabold text-[#0E1B17] mb-1">ברוכים הבאים 👋</h1>
      <p className="text-[#5A6B66] mb-8">סקירה כללית של האתר</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Stat label="נכסים פעילים" value={propCount} href="/admin/properties" />
        <Stat label="לידים" value={leadCount} sub={unreadLeads ? `${unreadLeads} חדשים` : undefined} href="/admin/leads" highlight={unreadLeads > 0} />
        <Stat label="המלצות" value={testCount} href="/admin/testimonials" />
        <Stat label="פתח אתר" value="↗" href="/" newTab />
      </div>

      <section className="bg-white rounded-2xl p-6 border border-[#1D9E75]/12">
        <h2 className="font-extrabold text-[#0E1B17] mb-3">פעולות מהירות</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/properties/new" className="bg-[#0F6E56] text-white font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#0c5a47]">
            + הוסף נכס חדש
          </Link>
          <Link href="/admin/leads" className="bg-white border border-[#1D9E75]/30 text-[#0F6E56] font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#F1F7F4]">
            בדוק לידים חדשים
          </Link>
          <Link href="/admin/settings" className="bg-white border border-[#1D9E75]/30 text-[#0F6E56] font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#F1F7F4]">
            הגדרות כלליות
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub, href, highlight, newTab }: { label: string; value: number | string; sub?: string; href: string; highlight?: boolean; newTab?: boolean }) {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      className={`block rounded-2xl p-5 border transition ${highlight ? "bg-[#EF9F27]/12 border-[#EF9F27]/40" : "bg-white border-[#1D9E75]/12 hover:border-[#1D9E75]/30"}`}
    >
      <div className="text-xs text-[#5A6B66] font-bold mb-1">{label}</div>
      <div className="text-3xl font-extrabold text-[#0E1B17] tabular-nums">{value}</div>
      {sub && <div className="text-xs text-[#BA7517] font-bold mt-1">{sub}</div>}
    </Link>
  );
}
