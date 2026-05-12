"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const numericMatch = value.match(/^(\d+(?:\.\d+)?)/);
  const target = numericMatch ? parseFloat(numericMatch[1]) : null;
  const suffix = numericMatch ? value.slice(numericMatch[1].length) : "";
  const decimals = numericMatch && numericMatch[1].includes(".") ? (numericMatch[1].split(".")[1]?.length ?? 0) : 0;

  const [current, setCurrent] = useState<number>(target ?? 0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            setCurrent(0);
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
    if (!active || target === null) return;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = target * eased;
      setCurrent(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  const formatted = target === null ? value : current.toFixed(decimals);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl md:text-5xl font-extrabold gradient-text mb-1.5 tabular-nums"
        dir="ltr"
        style={{ unicodeBidi: "isolate" }}
      >
        {target === null ? (
          value
        ) : (
          <>
            <span>{formatted}</span>
            <span>{suffix}</span>
          </>
        )}
      </div>
      <div className="text-sm md:text-[15px] text-[#5A6B66] font-semibold">{label}</div>
    </div>
  );
}
