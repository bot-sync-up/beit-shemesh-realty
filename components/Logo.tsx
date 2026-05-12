type Props = { variant?: "light" | "dark"; size?: "sm" | "md" | "lg" };

export default function Logo({ variant = "dark", size = "md" }: Props) {
  const dim = size === "sm" ? 36 : size === "lg" ? 56 : 44;
  const titleClass = variant === "light" ? "text-white" : "text-[#0E1B17]";
  const subClass = variant === "light" ? "text-white/90" : "text-[#0F6E56]";

  return (
    <div className="flex items-center gap-3">
      <svg width={dim} height={dim} viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1D9E75" />
            <stop offset="1" stopColor="#0F6E56" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#logo-grad)" />
        <path
          d="M 32 14 L 50 30 L 46 30 L 46 48 L 36 48 L 36 36 L 28 36 L 28 48 L 18 48 L 18 30 L 14 30 Z"
          fill="white"
        />
        <circle cx="46" cy="20" r="4" fill="#EF9F27" />
      </svg>
      <div className="leading-tight">
        <div className={`font-bold text-base md:text-lg ${titleClass}`}>הכתובת הנכונה</div>
        <div className={`text-[11px] md:text-xs font-semibold tracking-wide ${subClass}`}>
          תיווך נדל&quot;ן · בית שמש
        </div>
      </div>
    </div>
  );
}
