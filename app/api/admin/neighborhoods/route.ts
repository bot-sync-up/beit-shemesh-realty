import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getJson, putJson } from "@/lib/storage";
import { getNeighborhoods, type Neighborhood } from "@/lib/data";

async function guard() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const denied = await guard(); if (denied) return denied;
  return NextResponse.json(await getNeighborhoods());
}

export async function POST(req: NextRequest) {
  const denied = await guard(); if (denied) return denied;
  const body = (await req.json().catch(() => null)) as Partial<Neighborhood> | null;
  if (!body || !body.name) return NextResponse.json({ error: "חסר שם שכונה" }, { status: 400 });
  const existing = (await getJson<Neighborhood[]>("data/neighborhoods.json")) ?? (await getNeighborhoods());
  const id = existing.reduce((m, n) => Math.max(m, n.id), 0) + 1;
  const created = normalizeN({ ...body, id });
  await putJson("data/neighborhoods.json", [...existing, created]);
  return NextResponse.json(created, { status: 201 });
}

export function normalizeN(n: Partial<Neighborhood> & { id: number }): Neighborhood {
  return {
    id: n.id,
    name: String(n.name || "").trim(),
    slug: String(n.slug || slugify(String(n.name || ""))),
    character: String(n.character || ""),
    description: String(n.description || ""),
    avgPriceSale: String(n.avgPriceSale || ""),
    avgPriceRent: String(n.avgPriceRent || ""),
    highlights: Array.isArray(n.highlights) ? n.highlights.map(String) : [],
    imageColor: String(n.imageColor || "#0F6E56"),
  };
}

function slugify(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9֐-׿-]/g, "");
}
