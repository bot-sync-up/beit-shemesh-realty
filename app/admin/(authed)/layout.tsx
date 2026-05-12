import Link from "next/link";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AuthedAdminLayout({ children }: { children: React.ReactNode }) {
  const ok = await isLoggedIn();
  if (!ok) redirect("/admin/login");

  return (
    <div className="min-h-screen flex bg-[#FBF8F3]" dir="rtl">
      <aside className="w-64 bg-white border-l border-[#1D9E75]/15 flex flex-col">
        <div className="px-5 py-5 border-b border-[#1D9E75]/15">
          <div className="text-[15px] font-extrabold text-[#0E1B17]">לוח ניהול</div>
          <div className="text-xs text-[#5A6B66]">הכתובת הנכונה</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavLink href="/admin" label="בית" />
          <NavLink href="/admin/properties" label="נכסים" />
          <NavLink href="/admin/testimonials" label="המלצות" />
          <NavLink href="/admin/neighborhoods" label="שכונות" />
          <NavLink href="/admin/settings" label="הגדרות" />
          <NavLink href="/admin/leads" label="לידים מהאתר" />
        </nav>
        <div className="p-3 border-t border-[#1D9E75]/15 space-y-2">
          <Link href="/" target="_blank" className="block text-center text-xs text-[#5A6B66] hover:text-[#0F6E56]">
            פתח את האתר ↗
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto">{children}</main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg text-[#0E1B17] hover:bg-[#F1F7F4] hover:text-[#0F6E56] font-medium"
    >
      {label}
    </Link>
  );
}
