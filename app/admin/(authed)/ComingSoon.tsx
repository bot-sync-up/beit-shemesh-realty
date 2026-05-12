export default function ComingSoon({ title, note }: { title: string; note?: string }) {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-[#0E1B17] mb-2">{title}</h1>
      <div className="bg-white rounded-2xl border border-[#1D9E75]/12 p-10 text-center">
        <div className="text-5xl mb-3" aria-hidden="true">🛠️</div>
        <p className="text-[#0E1B17] font-bold mb-1">החלק הזה בבנייה</p>
        <p className="text-[#5A6B66] text-sm">
          {note || "נוסיף אותו בעדכון הקרוב. בינתיים — לעריכת תוכן זה צריך לעדכן את הקובץ ב-Git."}
        </p>
      </div>
    </div>
  );
}
