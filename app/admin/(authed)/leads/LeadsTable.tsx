"use client";
import { Fragment, useState, useTransition } from "react";
import type { Lead } from "@/lib/types";

export default function LeadsTable({ initial }: { initial: Lead[] }) {
  const [leads, setLeads] = useState(initial);
  const [open, setOpen] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function toggleRead(id: string, read: boolean) {
    setLeads(leads.map((l) => (l.id === id ? { ...l, read } : l)));
    startTransition(async () => {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
    });
  }

  async function remove(id: string) {
    if (!confirm("למחוק את הליד?")) return;
    setLeads(leads.filter((l) => l.id !== id));
    if (open === id) setOpen(null);
    startTransition(async () => {
      await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    });
  }

  if (!leads.length) {
    return (
      <div className="bg-white rounded-2xl border border-[#1D9E75]/12 p-10 text-center text-[#5A6B66]">
        עוד אין לידים. כשמישהו ימלא את טופס "צור קשר" באתר — תקבל אותו כאן.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#1D9E75]/12 overflow-hidden">
      <table className="w-full text-right text-sm">
        <thead className="bg-[#F1F7F4] text-[#0E1B17]">
          <tr>
            <th className="px-4 py-3 font-bold">תאריך</th>
            <th className="px-4 py-3 font-bold">שם</th>
            <th className="px-4 py-3 font-bold">טלפון</th>
            <th className="px-4 py-3 font-bold">נושא</th>
            <th className="px-4 py-3 font-bold">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <Fragment key={l.id}>
              <tr className={`border-t border-[#1D9E75]/10 ${!l.read ? "bg-[#EF9F27]/8" : ""}`}>
                <td className="px-4 py-3 text-[#5A6B66] whitespace-nowrap tabular-nums">{fmt(l.createdAt)}</td>
                <td className="px-4 py-3 font-bold text-[#0E1B17]">
                  {!l.read && <span className="inline-block w-2 h-2 rounded-full bg-[#EF9F27] ml-1.5" aria-label="חדש" />}
                  {l.name}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  <a href={`tel:${l.phone}`} className="text-[#0F6E56] hover:underline">{l.phone}</a>
                </td>
                <td className="px-4 py-3 text-[#5A6B66]">{l.subject || "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button onClick={() => setOpen(open === l.id ? null : l.id)} className="text-[#0F6E56] font-bold hover:underline">
                    {open === l.id ? "סגור" : "פרטים"}
                  </button>
                  <button onClick={() => toggleRead(l.id, !l.read)} className="mr-3 text-[#5A6B66] hover:text-[#0F6E56]" disabled={pending}>
                    {l.read ? "סמן כחדש" : "סמן כנקרא"}
                  </button>
                  <button onClick={() => remove(l.id)} className="mr-3 text-red-600 hover:underline" disabled={pending}>
                    מחק
                  </button>
                </td>
              </tr>
              {open === l.id && (
                <tr className="bg-[#FBF8F3]">
                  <td colSpan={5} className="px-6 py-4">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#0E1B17]">
                      {l.email && (
                        <div>
                          <dt className="text-xs text-[#5A6B66] font-bold">אימייל</dt>
                          <dd><a className="text-[#0F6E56] hover:underline" href={`mailto:${l.email}`}>{l.email}</a></dd>
                        </div>
                      )}
                      {l.message && (
                        <div className="md:col-span-2">
                          <dt className="text-xs text-[#5A6B66] font-bold">הודעה</dt>
                          <dd className="whitespace-pre-line">{l.message}</dd>
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <a href={`https://wa.me/${l.phone.replace(/\D/g, "").replace(/^0/, "972")}`} target="_blank" rel="noopener" className="inline-block bg-[#0F6E56] text-white font-bold rounded-full px-4 py-2 text-xs">
                          פתח בווטסאפ
                        </a>
                      </div>
                    </dl>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function fmt(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}
