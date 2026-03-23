"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [counts, setCounts] = useState({ properties: 0, testimonials: 0, faq: 0, blog: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/properties").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/admin/testimonials").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/admin/faq").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/admin/blog").then((r) => (r.ok ? r.json() : null)),
    ]).then(([props, tests, faq, blog]) => {
      if (!props) { router.push("/admin"); return; }
      setCounts({
        properties: props?.length || 0,
        testimonials: tests?.length || 0,
        faq: faq?.length || 0,
        blog: blog?.length || 0,
      });
      setLoading(false);
    });
  }, [router]);

  const cards = [
    { label: "נכסים", count: counts.properties, icon: "🏠", href: "/admin/properties", color: "bg-blue-50 border-blue-200" },
    { label: "המלצות", count: counts.testimonials, icon: "⭐", href: "/admin/testimonials", color: "bg-yellow-50 border-yellow-200" },
    { label: "שאלות נפוצות", count: counts.faq, icon: "❓", href: "/admin/faq", color: "bg-green-50 border-green-200" },
    { label: "מאמרי בלוג", count: counts.blog, icon: "📝", href: "/admin/blog", color: "bg-purple-50 border-purple-200" },
  ];

  return (
    <AdminShell>
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">לוח בקרה</h1>
        <p className="text-gray-500 mb-8">ברוך הבא לניהול האתר</p>

        {loading ? (
          <div className="text-center py-20 text-gray-400">טוען...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {cards.map((c) => (
                <Link key={c.label} href={c.href} className={`border rounded-2xl p-5 hover:shadow-md transition-shadow ${c.color}`}>
                  <div className="text-3xl mb-2">{c.icon}</div>
                  <div className="text-3xl font-bold text-[#1A1A2E]">{c.count}</div>
                  <div className="text-sm text-gray-600 mt-1">{c.label}</div>
                </Link>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-[#1A1A2E] mb-4">פעולות מהירות</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "הוסף נכס", href: "/admin/properties", icon: "➕" },
                  { label: "הוסף המלצה", href: "/admin/testimonials", icon: "⭐" },
                  { label: "הגדרות", href: "/admin/settings", icon: "⚙️" },
                  { label: "צפה באתר", href: "/", icon: "🌐" },
                ].map((a) => (
                  <Link
                    key={a.label}
                    href={a.href}
                    target={a.href === "/" ? "_blank" : undefined}
                    className="flex items-center gap-2 bg-[#F8FAFB] px-4 py-3 rounded-xl text-sm font-medium hover:bg-[#1A6B8A] hover:text-white transition-colors"
                  >
                    <span>{a.icon}</span>
                    <span>{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
