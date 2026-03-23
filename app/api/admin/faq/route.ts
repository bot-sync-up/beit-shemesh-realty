import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import { checkAuth } from "@/lib/auth";

type FaqItem = { id: number; question: string; answer: string; category: string; order: number; active: boolean };

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readData<FaqItem[]>("faq"));
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = readData<FaqItem[]>("faq");
  const body = await req.json();
  const newItem: FaqItem = { ...body, id: Date.now(), order: items.length + 1, active: true };
  writeData("faq", [...items, newItem]);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  writeData("faq", readData<FaqItem[]>("faq").map((f) => (f.id === body.id ? { ...f, ...body } : f)));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  writeData("faq", readData<FaqItem[]>("faq").filter((f) => f.id !== id));
  return NextResponse.json({ ok: true });
}
