import { NextRequest, NextResponse } from "next/server";
import { buildToken, checkPassword, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }
  const password = String(body.password || "");
  if (!password) {
    return NextResponse.json({ error: "נא להזין סיסמה" }, { status: 400 });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "סיסמת אדמין לא הוגדרה בשרת. ראו הוראות התקנה." },
      { status: 503 },
    );
  }
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "סיסמה שגויה" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, buildToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
