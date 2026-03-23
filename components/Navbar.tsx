"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/about", label: "אודות" },
  { href: "/properties", label: "נכסים" },
  { href: "/neighborhoods", label: "שכונות" },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/blog", label: "בלוג" },
  { href: "/contact", label: "צור קשר" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#1A6B8A] flex items-center justify-center">
            <span className="text-white font-bold text-lg">נ</span>
          </div>
          <div className="leading-tight">
            <div className={`font-bold text-base ${scrolled ? "text-[#1A1A2E]" : "text-white"}`}>
              מתווך נדל&quot;ן
            </div>
            <div className={`text-xs ${scrolled ? "text-[#1A6B8A]" : "text-[#D4A843]"}`}>
              בית שמש
            </div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-medium text-sm transition-colors hover:text-[#D4A843] ${
                  pathname === link.href
                    ? "text-[#D4A843]"
                    : scrolled
                    ? "text-[#1A1A2E]"
                    : "text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="tel:0527609172"
              className="bg-[#D4A843] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#b8922e] transition-colors text-sm"
            >
              📞 052-760-9172
            </a>
          </li>
        </ul>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="תפריט"
        >
          <span className={`block w-6 h-0.5 ${scrolled ? "bg-[#1A1A2E]" : "bg-white"}`} />
          <span className={`block w-6 h-0.5 ${scrolled ? "bg-[#1A1A2E]" : "bg-white"}`} />
          <span className={`block w-6 h-0.5 ${scrolled ? "bg-[#1A1A2E]" : "bg-white"}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-6 py-3 font-medium hover:bg-[#F8FAFB] ${
                    pathname === link.href ? "text-[#1A6B8A]" : "text-[#1A1A2E]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-6 py-3">
              <a href="tel:0527609172" className="block bg-[#D4A843] text-white text-center py-2.5 rounded-full font-bold">
                📞 052-760-9172
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
