"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import faqData from "@/data/faq.json";

type FaqItem = { id: number; question: string; answer: string; category: string; order: number; active: boolean };
const categories = ["הכל", ...Array.from(new Set((faqData as FaqItem[]).map((f) => f.category)))];

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("הכל");

  const items = (faqData as FaqItem[])
    .filter((f) => f.active && (activeCategory === "הכל" || f.category === activeCategory))
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-[#1A1A2E] to-[#1A6B8A] pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-3">שאלות נפוצות</h1>
            <p className="text-blue-100">תשובות לשאלות הנפוצות ביותר על תהליך רכישה, מכירה ושכירות</p>
          </div>
        </section>

        <section className="bg-[#F8FAFB] py-12">
          <div className="max-w-3xl mx-auto px-4">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === c
                      ? "bg-[#1A6B8A] text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[#1A6B8A]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  >
                    <span className="font-semibold text-[#1A1A2E] pr-2">{item.question}</span>
                    <span className={`text-[#1A6B8A] transition-transform flex-shrink-0 ${openId === item.id ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {openId === item.id && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 bg-[#1A6B8A] rounded-2xl p-8 text-center text-white">
              <h2 className="text-xl font-bold mb-2">לא מצאת תשובה?</h2>
              <p className="text-blue-100 mb-5">צור קשר ישירות ואשמח לענות על כל שאלה</p>
              <div className="flex justify-center gap-4">
                <Link href="/contact" className="bg-white text-[#1A6B8A] px-6 py-2.5 rounded-full font-bold hover:bg-gray-50 transition-colors">
                  צור קשר
                </Link>
                <a href="tel:0527609172" className="border-2 border-white text-white px-6 py-2.5 rounded-full font-bold hover:bg-white/10 transition-colors">
                  📞 052-760-9172
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
