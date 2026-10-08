export const AUTH_COOKIE = "cms_session";
const SECRET_STR = process.env.CMS_SECRET || "dev-secret-change-me-please-set-env";

function b64urlToBytes(s: string) {
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
async function hmac(data: string, key: string) {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, enc.encode(data));
  const b = new Uint8Array(sig);
  let s = "";
  for (const x of b) s += String.fromCharCode(x);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function verifyTokenEdge(token: string): Promise<{ user: string; exp: number } | null> {
  try {
    const [h, b, s] = token.split(".");
    if (!h || !b || !s) return null;
    const expect = await hmac(`${h}.${b}`, SECRET_STR);
    if (s !== expect) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(b))) as { user: string; exp: number };
    if (Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
