import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { readData, writeData } from "@/lib/data";

type AdminConfig = { password: string };

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "יש למלא את כל השדות" }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: "הסיסמה חייבת להכיל לפחות 6 תווים" }, { status: 400 });
  }

  const config = readData<AdminConfig>("admin");

  if (currentPassword !== config.password) {
    return NextResponse.json({ error: "הסיסמה הנוכחית שגויה" }, { status: 401 });
  }

  writeData("admin", { ...config, password: newPassword });

  return NextResponse.json({ ok: true });
}
