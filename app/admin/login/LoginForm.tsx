"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "שגיאה");
      }
      router.replace("/admin");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "שגיאה");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="pw" className="block text-sm font-bold text-[#0E1B17] mb-1.5">סיסמה</label>
        <input
          id="pw"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#1D9E75]/20 focus:border-[#0F6E56] focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/15 bg-white"
          required
        />
      </div>
      {err && <p className="text-sm text-red-600 font-bold">{err}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full bg-gradient-to-l from-[#1D9E75] to-[#0F6E56] text-white font-extrabold rounded-full py-3 hover:opacity-95 disabled:opacity-60 transition"
      >
        {busy ? "מתחבר..." : "כניסה"}
      </button>
    </form>
  );
}
