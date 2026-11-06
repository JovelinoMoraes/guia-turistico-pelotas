import { cookies } from "next/headers";

export const ADMIN_SESSION_SECONDS = 5 * 60;
const adminSessionCookie = "pelotas_admin_session";

export async function startAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookie, String(Date.now() + ADMIN_SESSION_SECONDS * 1000), {
    httpOnly: true,
    maxAge: ADMIN_SESSION_SECONDS,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
  });
}

export async function hasActiveAdminSession() {
  const value = (await cookies()).get(adminSessionCookie)?.value;
  const expiresAt = Number(value);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function clearAdminSession() {
  (await cookies()).delete(adminSessionCookie);
}
