"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-[#1A6B8A] text-white rounded-full shadow-lg hover:bg-[#155a73] transition-all hover:scale-110 flex items-center justify-center text-xl"
      aria-label="חזרה למעלה"
    >
      ↑
    </button>
  );
}
