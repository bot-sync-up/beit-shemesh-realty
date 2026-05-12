"use client";
import Link from "next/link";
import { useState, useTransition } from "react";
import type { Property } from "@/lib/data";

export default function PropertiesList({ initial }: { initial: Property[] }) {
  const [items, setItems] = useState(initial);
  const [pending, startTransition] = useTransition();

  async function remove(id: number, title: string) {
    if (!confirm(`למחוק את "${title}"?`)) return;
    setItems(items.filter((p) => p.id !== id));
    startTransition(async () => {
      await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    });
  }

  if (!items.length) {
    return (
      <div className="bg-white rounded-2xl border border-[#1D9E75]/12 p-10 text-center text-[#5A6B66]">
        עוד אין נכסים. <Link href="/admin/properties/new" className="text-[#0F6E56] font-bold hover:underline">הוסף את הראשון →</Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#1D9E75]/12 overflow-hidden">
      <table className="w-full text-right text-sm">
        <thead className="bg-[#F1F7F4] text-[#0E1B17]">
          <tr>
            <th className="px-4 py-3 font-bold w-16">תמונה</th>
            <th className="px-4 py-3 font-bold">כותרת</th>
            <th className="px-4 py-3 font-bold">סוג</th>
            <th className="px-4 py-3 font-bold">שכונה</th>
            <th className="px-4 py-3 font-bold">מחיר</th>
            <th className="px-4 py-3 font-bold">סטטוס</th>
            <th className="px-4 py-3 font-bold">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-t border-[#1D9E75]/10">
              <td className="px-4 py-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images[0] || "/file.svg"} alt="" className="w-12 h-12 rounded-lg object-cover bg-[#F1F7F4]" />
              </td>
              <td className="px-4 py-3 font-bold text-[#0E1B17]">
                <Link href={`/admin/properties/${p.id}/edit`} className="hover:text-[#0F6E56]">
                  {p.title}
                </Link>
                {p.featured && <span className="mr-2 text-xs bg-[#EF9F27]/15 text-[#BA7517] px-2 py-0.5 rounded-full">מומלץ</span>}
              </td>
              <td className="px-4 py-3 text-[#5A6B66]">{p.type} · {p.category}</td>
              <td className="px-4 py-3 text-[#5A6B66]">{p.neighborhood}</td>
              <td className="px-4 py-3 tabular-nums">{p.priceLabel}</td>
              <td className="px-4 py-3">
                <StatusBadge status={p.status} />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <Link href={`/admin/properties/${p.id}/edit`} className="text-[#0F6E56] font-bold hover:underline">ערוך</Link>
                <button onClick={() => remove(p.id, p.title)} className="mr-3 text-red-600 hover:underline" disabled={pending}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: Property["status"] }) {
  const map = {
    active: { label: "פעיל", cls: "bg-[#1D9E75]/15 text-[#0F6E56]" },
    sold: { label: "נמכר", cls: "bg-gray-200 text-gray-700" },
    hidden: { label: "מוסתר", cls: "bg-red-100 text-red-700" },
  } as const;
  const v = map[status];
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${v.cls}`}>{v.label}</span>;
}
