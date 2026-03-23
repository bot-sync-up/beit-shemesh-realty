import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import { checkAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readData("settings"));
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  writeData("settings", body);
  return NextResponse.json({ ok: true });
}
