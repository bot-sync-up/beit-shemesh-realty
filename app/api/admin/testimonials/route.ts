import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getJson, putJson } from "@/lib/storage";
import { getTestimonials, type Testimonial } from "@/lib/data";

async function guard() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const denied = await guard(); if (denied) return denied;
  return NextResponse.json(await getTestimonials());
}

export async function POST(req: NextRequest) {
  const denied = await guard(); if (denied) return denied;
  const body = (await req.json().catch(() => null)) as Partial<Testimonial> | null;
  if (!body || !body.name || !body.text) return NextResponse.json({ error: "חסר שם או טקסט" }, { status: 400 });
  const existing = (await getJson<Testimonial[]>("data/testimonials.json")) ?? (await getTestimonials());
  const id = existing.reduce((m, t) => Math.max(m, t.id), 0) + 1;
  const created = normalizeT({ ...body, id });
  await putJson("data/testimonials.json", [...existing, created]);
  return NextResponse.json(created, { status: 201 });
}

export function normalizeT(t: Partial<Testimonial> & { id: number }): Testimonial {
  return {
    id: t.id,
    name: String(t.name || "").trim(),
    role: String(t.role || ""),
    area: String(t.area || ""),
    date: String(t.date || new Date().toISOString().slice(0, 10)),
    rating: Math.max(1, Math.min(5, Number(t.rating) || 5)),
    text: String(t.text || "").trim(),
  };
}
