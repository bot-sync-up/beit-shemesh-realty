"use client";
import { useState } from "react";

export default function MortgageCalculator() {
  const [loan, setLoan] = useState(1000000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);

  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  const monthly =
    monthlyRate === 0
      ? loan / numPayments
      : (loan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = monthly * numPayments;
  const totalInterest = totalPayment - loan;

  const fmt = (n: number) =>
    Math.round(n).toLocaleString("he-IL");

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
        <span>🧮</span> מחשבון משכנתא
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Loan amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            סכום הלוואה (₪)
          </label>
          <input
            type="range"
            min={100000}
            max={5000000}
            step={50000}
            value={loan}
            onChange={(e) => setLoan(Number(e.target.value))}
            className="w-full accent-[#1A6B8A] mb-2"
          />
          <div className="text-center font-bold text-[#1A6B8A] text-lg">
            ₪{fmt(loan)}
          </div>
        </div>

        {/* Interest rate */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ריבית שנתית (%)
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-[#1A6B8A] mb-2"
          />
          <div className="text-center font-bold text-[#1A6B8A] text-lg">
            {rate.toFixed(1)}%
          </div>
        </div>

        {/* Years */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            תקופת ההחזר (שנים)
          </label>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-[#1A6B8A] mb-2"
          />
          <div className="text-center font-bold text-[#1A6B8A] text-lg">
            {years} שנה
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4 bg-[#F8FAFB] rounded-xl p-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#1A6B8A]">₪{fmt(monthly)}</div>
          <div className="text-xs text-gray-500 mt-1">החזר חודשי</div>
        </div>
        <div className="text-center border-x border-gray-200">
          <div className="text-2xl font-bold text-[#D4A843]">₪{fmt(totalInterest)}</div>
          <div className="text-xs text-gray-500 mt-1">סך ריבית</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#1A1A2E]">₪{fmt(totalPayment)}</div>
          <div className="text-xs text-gray-500 mt-1">סך תשלום</div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        * החישוב הינו אינדיקטיבי בלבד ואינו מהווה ייעוץ פיננסי
      </p>
    </div>
  );
}
