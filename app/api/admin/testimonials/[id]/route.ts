import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getJson, putJson } from "@/lib/storage";
import { getTestimonials, type Testimonial } from "@/lib/data";
import { normalizeT } from "../route";

async function guard() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return null;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard(); if (denied) return denied;
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const body = (await req.json().catch(() => null)) as Partial<Testimonial> | null;
  if (!body) return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  const existing = (await getJson<Testimonial[]>("data/testimonials.json")) ?? (await getTestimonials());
  const idx = existing.findIndex((t) => t.id === id);
  if (idx === -1) return NextResponse.json({ error: "לא נמצא" }, { status: 404 });
  const updated = normalizeT({ ...existing[idx], ...body, id });
  const next = [...existing]; next[idx] = updated;
  await putJson("data/testimonials.json", next);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard(); if (denied) return denied;
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const existing = (await getJson<Testimonial[]>("data/testimonials.json")) ?? (await getTestimonials());
  await putJson("data/testimonials.json", existing.filter((t) => t.id !== id));
  return NextResponse.json({ ok: true });
}
