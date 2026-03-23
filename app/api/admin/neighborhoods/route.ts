import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import { checkAuth } from "@/lib/auth";

type Neighborhood = {
  id: number;
  name: string;
  slug: string;
  character: string;
  description: string;
  avgPriceSale: string;
  avgPriceRent: string;
  highlights: string[];
  active: boolean;
};

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(readData("neighborhoods"));
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const items = readData<Neighborhood[]>("neighborhoods");
  const newItem: Neighborhood = {
    ...body,
    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    slug: body.name
      .replace(/[׳']/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\u0590-\u05FF-]/g, "")
      + "-" + Date.now(),
    active: true,
  };
  writeData("neighborhoods", [...items, newItem]);
  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const items = readData<Neighborhood[]>("neighborhoods");
  const updated = items.map((i) => (i.id === body.id ? { ...i, ...body } : i));
  writeData("neighborhoods", updated);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const items = readData<Neighborhood[]>("neighborhoods");
  writeData("neighborhoods", items.filter((i) => i.id !== id));
  return NextResponse.json({ ok: true });
}
