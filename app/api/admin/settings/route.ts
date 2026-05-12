import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { putJson } from "@/lib/storage";
import { getSettings, type Settings } from "@/lib/data";

async function guard() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const denied = await guard(); if (denied) return denied;
  return NextResponse.json(await getSettings());
}

export async function PUT(req: NextRequest) {
  const denied = await guard(); if (denied) return denied;
  const body = (await req.json().catch(() => null)) as Partial<Settings> | null;
  if (!body) return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  const current = await getSettings();
  const next = { ...current, ...body };
  await putJson("data/settings.json", next);
  return NextResponse.json(next);
}
