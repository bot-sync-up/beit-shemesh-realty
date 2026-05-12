import { promises as fs } from "node:fs";
import path from "node:path";

type R2Bucket = {
  get: (key: string) => Promise<{ text: () => Promise<string>; arrayBuffer: () => Promise<ArrayBuffer> } | null>;
  put: (key: string, value: string | ArrayBuffer | ReadableStream, opts?: { httpMetadata?: { contentType?: string } }) => Promise<unknown>;
  delete: (key: string) => Promise<void>;
  list: (opts?: { prefix?: string }) => Promise<{ objects: Array<{ key: string }> }>;
};

async function getBucket(): Promise<R2Bucket | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    const bucket = (ctx?.env as Record<string, unknown> | undefined)?.CONTENT;
    return (bucket as R2Bucket | undefined) ?? null;
  } catch {
    return null;
  }
}

const LOCAL_ROOT = path.join(process.cwd(), ".local-storage");

async function localPath(key: string): Promise<string> {
  const full = path.join(LOCAL_ROOT, key);
  await fs.mkdir(path.dirname(full), { recursive: true });
  return full;
}

export async function getJson<T>(key: string): Promise<T | null> {
  const bucket = await getBucket();
  if (bucket) {
    const obj = await bucket.get(key);
    if (!obj) return null;
    const text = await obj.text();
    return JSON.parse(text) as T;
  }
  try {
    const txt = await fs.readFile(await localPath(key), "utf8");
    return JSON.parse(txt) as T;
  } catch {
    return null;
  }
}

export async function putJson(key: string, value: unknown): Promise<void> {
  const body = JSON.stringify(value, null, 2);
  const bucket = await getBucket();
  if (bucket) {
    await bucket.put(key, body, { httpMetadata: { contentType: "application/json" } });
    return;
  }
  await fs.writeFile(await localPath(key), body, "utf8");
}

export async function putBinary(key: string, body: ArrayBuffer, contentType: string): Promise<void> {
  const bucket = await getBucket();
  if (bucket) {
    await bucket.put(key, body, { httpMetadata: { contentType } });
    return;
  }
  await fs.writeFile(await localPath(key), Buffer.from(body));
}

export async function getBinary(key: string): Promise<{ body: ArrayBuffer; contentType: string } | null> {
  const bucket = await getBucket();
  if (bucket) {
    const obj = await bucket.get(key);
    if (!obj) return null;
    const body = await obj.arrayBuffer();
    return { body, contentType: "application/octet-stream" };
  }
  try {
    const buf = await fs.readFile(await localPath(key));
    return { body: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer, contentType: "application/octet-stream" };
  } catch {
    return null;
  }
}

export async function deleteKey(key: string): Promise<void> {
  const bucket = await getBucket();
  if (bucket) {
    await bucket.delete(key);
    return;
  }
  try {
    await fs.unlink(await localPath(key));
  } catch {
    /* ignore */
  }
}

export async function listKeys(prefix: string): Promise<string[]> {
  const bucket = await getBucket();
  if (bucket) {
    const out = await bucket.list({ prefix });
    return out.objects.map((o) => o.key);
  }
  try {
    const root = path.join(LOCAL_ROOT, prefix);
    const entries = await fs.readdir(root, { withFileTypes: true });
    return entries.filter((e) => e.isFile()).map((e) => `${prefix}${e.name}`);
  } catch {
    return [];
  }
}
