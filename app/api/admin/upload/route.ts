import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { putBinary } from "@/lib/storage";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "לא צורף קובץ" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "הקובץ גדול מדי (מקסימום 8MB)" }, { status: 413 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "סוג קובץ לא נתמך" }, { status: 415 });
  }

  const ext = extFor(file.type);
  const key = `images/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const buf = await file.arrayBuffer();
  await putBinary(key, buf, file.type);

  return NextResponse.json({ url: `/api/files/${key}`, key });
}

function extFor(mime: string): string {
  return mime === "image/jpeg" ? ".jpg"
    : mime === "image/png" ? ".png"
    : mime === "image/webp" ? ".webp"
    : mime === "image/gif" ? ".gif"
    : mime === "image/svg+xml" ? ".svg"
    : "";
}
