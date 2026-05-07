"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import settings from "@/data/settings.json";

const navLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/about", label: "אודותי" },
  { href: "/properties", label: "נכסים" },
  { href: "/neighborhoods", label: "אזורי פעילות" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "צור קשר" },
];

export default function Navbar({ transparentTop = false }: { transparentTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = transparentTop && !scrolled;
  const closeMenu = () => setOpen(false);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent py-4"
          : "bg-white/95 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(15,110,86,0.18)] py-2"
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo variant={transparent ? "light" : "dark"} size="md" />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3.5 py-2 text-[15px] font-semibold rounded-full transition-colors ${
                    active
                      ? transparent
                        ? "text-[#EF9F27]"
                        : "text-[#0F6E56] bg-[#1D9E75]/10"
                      : transparent
                      ? "text-white/90 hover:text-[#EF9F27]"
                      : "text-[#0E1B17] hover:text-[#0F6E56]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="ms-3 flex items-center gap-2">
            <a
              href={`https://wa.me/${settings.phoneIntl}`}
              target="_blank"
              rel="noopener"
              className="btn-primary !py-2 !px-4 !text-sm"
            >
              <span aria-hidden="true">💬</span> WhatsApp
            </a>
            <a
              href={`tel:${settings.phoneRaw}`}
              className={`text-sm font-bold ${transparent ? "text-white" : "text-[#0F6E56]"}`}
            >
              {settings.phone}
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="פתח תפריט"
          aria-expanded={open}
          className={`lg:hidden p-2 rounded-lg transition ${
            transparent ? "text-white" : "text-[#0E1B17]"
          }`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#1D9E75]/10 animate-fade-up">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block px-6 py-3 font-semibold ${
                      active ? "text-[#0F6E56] bg-[#1D9E75]/8" : "text-[#0E1B17]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="px-6 py-3 flex flex-col gap-2">
              <a
                href={`https://wa.me/${settings.phoneIntl}`}
                target="_blank"
                rel="noopener"
                className="btn-primary justify-center"
              >
                💬 שלחו הודעת WhatsApp
              </a>
              <a href={`tel:${settings.phoneRaw}`} className="btn-gold justify-center">
                📞 {settings.phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
