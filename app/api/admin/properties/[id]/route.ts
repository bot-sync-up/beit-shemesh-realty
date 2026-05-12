import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getJson, putJson } from "@/lib/storage";
import { getAllProperties, type Property } from "@/lib/data";
import { normalize } from "../route";

async function guard() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return null;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard(); if (denied) return denied;
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const body = (await req.json().catch(() => null)) as Partial<Property> | null;
  if (!body) return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });

  const existing = (await getJson<Property[]>("data/properties.json")) ?? (await getAllProperties());
  const idx = existing.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "נכס לא נמצא" }, { status: 404 });

  const updated = normalize({ ...existing[idx], ...body, id });
  const next = [...existing];
  next[idx] = updated;
  await putJson("data/properties.json", next);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard(); if (denied) return denied;
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const existing = (await getJson<Property[]>("data/properties.json")) ?? (await getAllProperties());
  await putJson("data/properties.json", existing.filter((p) => p.id !== id));
  return NextResponse.json({ ok: true });
}
