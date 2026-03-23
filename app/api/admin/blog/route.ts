import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import { checkAuth } from "@/lib/auth";

type BlogPost = { id: number; title: string; slug: string; excerpt: string; content: string; category: string; date: string; image: string; active: boolean };

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readData<BlogPost[]>("blog"));
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = readData<BlogPost[]>("blog");
  const body = await req.json();
  const newItem: BlogPost = { ...body, id: Date.now(), date: new Date().toISOString().split("T")[0], active: true };
  writeData("blog", [...items, newItem]);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  writeData("blog", readData<BlogPost[]>("blog").map((b) => (b.id === body.id ? { ...b, ...body } : b)));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  writeData("blog", readData<BlogPost[]>("blog").filter((b) => b.id !== id));
  return NextResponse.json({ ok: true });
}
