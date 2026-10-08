import { NextRequest, NextResponse } from "next/server";
import { createSession, sessionCookie, verifyCredentials } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { user, pass } = await req.json().catch(() => ({}));
  if (!verifyCredentials(String(user ?? ""), String(pass ?? ""))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = createSession(String(user));
  const res = NextResponse.json({ ok: true });
  const c = sessionCookie(token);
  res.cookies.set(c.name, c.value, {
    httpOnly: c.httpOnly,
    secure: c.secure,
    sameSite: c.sameSite,
    path: c.path,
    maxAge: c.maxAge,
  });
  return res;
}
