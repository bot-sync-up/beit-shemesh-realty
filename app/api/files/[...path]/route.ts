import { NextRequest, NextResponse } from "next/server";
import { getBinary } from "@/lib/storage";

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const key = path.join("/");
  const file = await getBinary(key);
  if (!file) return NextResponse.json({ error: "not found" }, { status: 404 });

  const ext = key.split(".").pop()?.toLowerCase() ?? "";
  const contentType = MIME_BY_EXT[ext] || file.contentType || "application/octet-stream";

  return new NextResponse(file.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
