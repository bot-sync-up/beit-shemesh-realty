import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import { checkAuth } from "@/lib/auth";

type Testimonial = { id: number; name: string; text: string; area: string; rating: number; active: boolean };

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readData<Testimonial[]>("testimonials"));
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = readData<Testimonial[]>("testimonials");
  const body = await req.json();
  const newItem: Testimonial = { ...body, id: Date.now(), active: true };
  writeData("testimonials", [...items, newItem]);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const items = readData<Testimonial[]>("testimonials");
  writeData("testimonials", items.map((t) => (t.id === body.id ? { ...t, ...body } : t)));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  writeData("testimonials", readData<Testimonial[]>("testimonials").filter((t) => t.id !== id));
  return NextResponse.json({ ok: true });
}
