import { getSettings } from "@/lib/data";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-[#0E1B17] mb-1">הגדרות כלליות</h1>
      <p className="text-[#5A6B66] mb-6">פרטי קשר, טקסטים שיווקיים, רישיון, רשתות חברתיות.</p>
      <SettingsForm initial={settings} />
    </div>
  );
}
