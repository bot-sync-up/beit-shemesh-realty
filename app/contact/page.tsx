"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

function ContactForm() {
  const searchParams = useSearchParams();
  const propertyName = searchParams.get("property") || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: propertyName ? `פנייה לגבי: ${propertyName}` : "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "אירעה שגיאה, נסה שנית");
      }
    } catch {
      setError("אירעה שגיאה, נסה שנית");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    { icon: "📞", label: "טלפון", value: "052-760-9172", href: "tel:0527609172", desc: "לחץ לחייג" },
    { icon: "📧", label: "אימייל", value: "7609172@gmail.com", href: "mailto:7609172@gmail.com", desc: "שלח אימייל" },
    { icon: "📍", label: "אזור פעילות", value: "בית שמש וסביבתה", href: "#", desc: "" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        {submitted ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3">הפנייה נשלחה!</h3>
            <p className="text-gray-600 mb-6">נחזור אליכם בהקדם האפשרי.</p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", subject: "", message: "" }); }}
              className="bg-[#1A6B8A] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#155a73] transition-colors"
            >
              שלח פנייה נוספת
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">שלח הודעה</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">שם מלא *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="ישראל ישראלי" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1A6B8A] focus:ring-1 focus:ring-[#1A6B8A]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">טלפון *</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="052-000-0000" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1A6B8A] focus:ring-1 focus:ring-[#1A6B8A]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">נושא הפנייה</label>
                <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1A6B8A] bg-white">
                  <option value="">בחר נושא...</option>
                  <option>רכישת דירה</option>
                  <option>השכרת דירה</option>
                  <option>מכירת נכס</option>
                  <option>נכס מסחרי</option>
                  <option>ייעוץ כללי</option>
                  {propertyName && <option>{`פנייה לגבי: ${propertyName}`}</option>}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">הודעה</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="ספר לנו על הצרכים שלך..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1A6B8A] focus:ring-1 focus:ring-[#1A6B8A] resize-none" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="w-full bg-[#1A6B8A] text-white py-3.5 rounded-xl font-bold hover:bg-[#155a73] transition-colors text-lg disabled:opacity-60">
                {loading ? "שולח..." : "שלח פנייה"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Contact info */}
      <div>
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">דרכי יצירת קשר</h2>
        <div className="space-y-4 mb-8">
          {contactMethods.map((m) => (
            <a key={m.label} href={m.href} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="text-3xl">{m.icon}</div>
              <div>
                <div className="text-xs text-gray-400">{m.label}</div>
                <div className="font-semibold text-[#1A1A2E] group-hover:text-[#1A6B8A] transition-colors">{m.value}</div>
                {m.desc && <div className="text-xs text-[#1A6B8A]">{m.desc}</div>}
              </div>
            </a>
          ))}
        </div>

        <div className="bg-[#1A6B8A] text-white rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-2">⚡ מענה אישי מהיר</h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            מתקשרים? מקבלים מענה ישיר. אין מזכירות, אין תורים – ישיר ומהיר.
          </p>
          <a href="tel:0527609172" className="mt-4 inline-flex items-center gap-2 bg-white text-[#1A6B8A] px-5 py-2.5 rounded-full font-bold hover:bg-gray-50 transition-colors text-sm">
            📞 052-760-9172
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-[#1A1A2E] to-[#1A6B8A] pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-3">צור קשר</h1>
            <p className="text-blue-100">מוכנים לעזור – פנו אלינו בכל שאלה</p>
          </div>
        </section>

        <section className="bg-[#F8FAFB] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <Suspense fallback={<div className="text-center py-20 text-gray-400">טוען...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
