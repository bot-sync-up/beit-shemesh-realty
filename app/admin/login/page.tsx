import LoginForm from "./LoginForm";

export const metadata = {
  title: "כניסת אדמין",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-gradient-to-br from-[#094534] via-[#0F6E56] to-[#1D9E75] p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-2xl font-extrabold text-[#0E1B17] mb-1 text-center">כניסת אדמין</h1>
        <p className="text-sm text-[#5A6B66] text-center mb-6">הכתובת הנכונה — לוח ניהול</p>
        <LoginForm />
      </div>
    </main>
  );
}
