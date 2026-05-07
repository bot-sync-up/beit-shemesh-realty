"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const numericMatch = value.match(/^(\d+)/);
  const [display, setDisplay] = useState(numericMatch ? `0${value.slice(numericMatch[1].length)}` : value);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !numericMatch) return;
    const target = parseInt(numericMatch[1], 10);
    const suffix = value.slice(numericMatch[1].length);
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(target * eased);
      setDisplay(`${cur}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, numericMatch]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-1.5 tabular-nums">{display}</div>
      <div className="text-sm md:text-[15px] text-[#5A6B66] font-semibold">{label}</div>
    </div>
  );
}
