import { readData } from "@/lib/data";

export const SESSION_KEY = "admin_session";

function getAdminPassword(): string {
  try {
    const config = readData<{ password: string }>("admin");
    return config.password;
  } catch {
    return process.env.ADMIN_PASSWORD || "admin123";
  }
}

export function getPasswordFromStore(): string {
  return getAdminPassword();
}

export function checkAuth(request: Request): boolean {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes(`${SESSION_KEY}=authenticated`);
}
