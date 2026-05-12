import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { getJson, putJson } from "@/lib/storage";
import type { Lead } from "@/lib/types";

async function guard() {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return null;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard(); if (denied) return denied;
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { read?: boolean };
  const leads = (await getJson<Lead[]>("data/leads.json")) ?? [];
  const next = leads.map((l) => (l.id === id ? { ...l, read: !!body.read } : l));
  await putJson("data/leads.json", next);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await guard(); if (denied) return denied;
  const { id } = await params;
  const leads = (await getJson<Lead[]>("data/leads.json")) ?? [];
  await putJson("data/leads.json", leads.filter((l) => l.id !== id));
  return NextResponse.json({ ok: true });
}
