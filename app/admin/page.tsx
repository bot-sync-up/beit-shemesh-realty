"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("סיסמה שגויה. נסה שוב.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1A6B8A] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">נ</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">ניהול האתר</h1>
          <p className="text-gray-500 text-sm mt-1">הזן סיסמה כדי להיכנס</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1A6B8A] focus:ring-1 focus:ring-[#1A6B8A] text-right"
              placeholder="הזן סיסמה..."
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A6B8A] text-white py-3 rounded-xl font-bold hover:bg-[#155a73] transition-colors disabled:opacity-60"
          >
            {loading ? "נכנס..." : "כניסה לניהול"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          סיסמת ברירת מחדל: <code className="bg-gray-100 px-1 rounded">admin123</code>
        </p>
      </div>
    </div>
  );
}
