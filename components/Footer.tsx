import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#1A6B8A] flex items-center justify-center">
                <span className="text-white font-bold text-lg">נ</span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold">מתווך נדל&quot;ן</div>
                <div className="text-[#D4A843] text-xs">בית שמש</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              מעל 20 שנות ניסיון בשוק הנדל&quot;ן של בית שמש. היכרות עמוקה עם כל שכונה, מחיר וגורם מקומי.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "דף הבית" },
                { href: "/about", label: "אודות" },
                { href: "/properties", label: "נכסים" },
                { href: "/neighborhoods", label: "מדריך שכונות" },
                { href: "/faq", label: "שאלות נפוצות" },
                { href: "/blog", label: "בלוג" },
                { href: "/contact", label: "צור קשר" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#D4A843] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">יצירת קשר</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-[#D4A843]">📍</span>
                <span>בית שמש, ישראל</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4A843]">📞</span>
                <a href="tel:0527609172" className="hover:text-[#D4A843] transition-colors">
                  052-760-9172
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4A843]">📧</span>
                <a href="mailto:7609172@gmail.com" className="hover:text-[#D4A843] transition-colors">
                  7609172@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} מתווך נדל&quot;ן בית שמש | כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
}
