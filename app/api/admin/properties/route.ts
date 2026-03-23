import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import { checkAuth } from "@/lib/auth";

type Property = {
  id: number;
  title: string;
  type: string;
  price: string;
  rooms: number;
  area: number;
  neighborhood: string;
  description: string;
  image: string;
  active: boolean;
};

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readData<Property[]>("properties"));
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = readData<Property[]>("properties");
  const body = await req.json();
  const newItem: Property = { ...body, id: Date.now(), active: true };
  writeData("properties", [...items, newItem]);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const items = readData<Property[]>("properties");
  const updated = items.map((p) => (p.id === body.id ? { ...p, ...body } : p));
  writeData("properties", updated);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const items = readData<Property[]>("properties");
  writeData("properties", items.filter((p) => p.id !== id));
  return NextResponse.json({ ok: true });
}
