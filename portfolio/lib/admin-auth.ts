import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Admin access, in two layers:
 *
 * 1. Host lock (proxy.ts): /admin only answers on ADMIN_HOST — a separate
 *    domain such as zenox-admin.vercel.app. On every other host it is a 404,
 *    so the public site gives no sign it exists.
 * 2. Password: ADMIN_PASSWORD, exchanged for a signed, httpOnly session
 *    cookie (HMAC-SHA256 with ADMIN_SECRET) that expires after 7 days.
 */

export const SESSION_COOKIE = "zenox_admin";
export const SESSION_DAYS = 7;

function secret() {
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  return s ? createHash("sha256").update(`zenox-admin:${s}`).digest() : null;
}

const sign = (payload: string, key: Buffer) => createHmac("sha256", key).update(payload).digest("base64url");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(candidate: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  // Hash both sides so the comparison is constant-time regardless of length.
  const a = createHash("sha256").update(candidate).digest("hex");
  const b = createHash("sha256").update(real).digest("hex");
  return safeEqual(a, b);
}

export function createSession(now = Date.now()) {
  const key = secret();
  if (!key) throw new Error("ADMIN_PASSWORD is not set");
  const expires = String(now + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return `${expires}.${sign(expires, key)}`;
}

export function verifySession(token: string | undefined, now = Date.now()) {
  const key = secret();
  if (!key || !token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < now) return false;
  return safeEqual(sig, sign(expires, key));
}

/** Hostnames allowed to serve /admin, from ADMIN_HOST (comma-separated). */
export function adminHosts() {
  return (process.env.ADMIN_HOST ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
}
