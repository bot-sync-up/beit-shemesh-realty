"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="חזרה לראש העמוד"
      className={`fixed bottom-24 z-30 w-11 h-11 rounded-full bg-white text-[#0F6E56] shadow-lg shadow-black/15 border border-[#1D9E75]/20 hover:scale-110 hover:bg-[#1D9E75] hover:text-white transition-all grid place-items-center ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ insetInlineStart: "1.45rem" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 14 12 8 18 14" />
      </svg>
    </button>
  );
}
