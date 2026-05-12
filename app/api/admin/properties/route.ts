import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getJson, putJson } from "@/lib/storage";
import { getAllProperties, type Property } from "@/lib/data";

async function guard() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const denied = await guard(); if (denied) return denied;
  const list = await getAllProperties();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const denied = await guard(); if (denied) return denied;
  const body = (await req.json().catch(() => null)) as Partial<Property> | null;
  if (!body || !body.title) {
    return NextResponse.json({ error: "חסר שדה: כותרת" }, { status: 400 });
  }
  const existing = (await getJson<Property[]>("data/properties.json")) ?? (await getAllProperties());
  const id = existing.reduce((m, p) => Math.max(m, p.id), 0) + 1;
  const created: Property = normalize({ ...body, id });
  const next = [...existing, created];
  await putJson("data/properties.json", next);
  return NextResponse.json(created, { status: 201 });
}

export function normalize(p: Partial<Property> & { id: number }): Property {
  return {
    id: p.id,
    title: String(p.title || "").trim(),
    type: (p.type as Property["type"]) || "למכירה",
    category: (p.category as Property["category"]) || "דירה",
    status: (p.status as Property["status"]) || "active",
    price: Number(p.price) || 0,
    priceLabel: String(p.priceLabel || formatPrice(Number(p.price) || 0)),
    rooms: Number(p.rooms) || 0,
    area: Number(p.area) || 0,
    floor: Number(p.floor) || 0,
    totalFloors: Number(p.totalFloors) || 0,
    neighborhood: String(p.neighborhood || ""),
    address: String(p.address || ""),
    lat: Number(p.lat) || 0,
    lng: Number(p.lng) || 0,
    shortDescription: String(p.shortDescription || ""),
    description: String(p.description || ""),
    features: Array.isArray(p.features) ? p.features.map(String) : [],
    images: Array.isArray(p.images) ? p.images.map(String) : [],
    featured: Boolean(p.featured),
  };
}

function formatPrice(n: number): string {
  if (!n) return "צרו קשר למחיר";
  return `${n.toLocaleString("he-IL")} ₪`;
}
