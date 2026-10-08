import { createHmac } from "crypto";

export const AUTH_COOKIE = "cms_session";
const SECRET = process.env.CMS_SECRET || "dev-secret-change-me-please-set-env";
const SESSION_MAX_AGE = 60 * 60 * 12;

function b64url(s: string) {
  return Buffer.from(s).toString("base64url");
}
function b64urlJson(o: unknown) {
  return b64url(JSON.stringify(o));
}

export function signPayload(payload: object) {
  const header = b64urlJson({ alg: "HS256", typ: "JWT" });
  const body = b64urlJson(payload);
  const sig = createHmac("sha256", SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${sig}`;
}

export function verifyToken(token: string): { user: string; exp: number } | null {
  try {
    const [h, b, s] = token.split(".");
    if (!h || !b || !s) return null;
    const expect = createHmac("sha256", SECRET).update(`${h}.${b}`).digest("base64url");
    if (s !== expect) return null;
    const payload = JSON.parse(Buffer.from(b, "base64url").toString()) as { user: string; exp: number };
    if (Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createSession(user: string) {
  return signPayload({ user, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE });
}

export function getCredentials() {
  return {
    user: process.env.ADMIN_USER || "admin",
    pass: process.env.ADMIN_PASS || "admin123",
  };
}

export function verifyCredentials(user: string, pass: string) {
  const c = getCredentials();
  return user === c.user && pass === c.pass;
}

export function sessionCookie(token: string) {
  return {
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
