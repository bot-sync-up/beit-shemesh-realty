import { getTestimonials } from "@/lib/data";
import TestimonialsManager from "./TestimonialsManager";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const list = await getTestimonials();
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-[#0E1B17] mb-1">המלצות</h1>
      <p className="text-[#5A6B66] mb-6">סך הכל: <span className="font-bold tabular-nums">{list.length}</span></p>
      <TestimonialsManager initial={list} />
    </div>
  );
}
