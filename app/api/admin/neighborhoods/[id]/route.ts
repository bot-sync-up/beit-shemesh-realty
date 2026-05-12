import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getJson, putJson } from "@/lib/storage";
import { getNeighborhoods, type Neighborhood } from "@/lib/data";
import { normalizeN } from "../route";

async function guard() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return null;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard(); if (denied) return denied;
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const body = (await req.json().catch(() => null)) as Partial<Neighborhood> | null;
  if (!body) return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  const existing = (await getJson<Neighborhood[]>("data/neighborhoods.json")) ?? (await getNeighborhoods());
  const idx = existing.findIndex((n) => n.id === id);
  if (idx === -1) return NextResponse.json({ error: "לא נמצא" }, { status: 404 });
  const updated = normalizeN({ ...existing[idx], ...body, id });
  const next = [...existing]; next[idx] = updated;
  await putJson("data/neighborhoods.json", next);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard(); if (denied) return denied;
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const existing = (await getJson<Neighborhood[]>("data/neighborhoods.json")) ?? (await getNeighborhoods());
  await putJson("data/neighborhoods.json", existing.filter((n) => n.id !== id));
  return NextResponse.json({ ok: true });
}
