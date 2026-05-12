"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="w-full text-center text-xs text-[#5A6B66] hover:text-red-600 py-1"
    >
      יציאה
    </button>
  );
}
