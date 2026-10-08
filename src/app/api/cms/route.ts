import { NextRequest, NextResponse } from "next/server";
import { getCms, saveCms } from "@/lib/cms";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getCms();
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  await saveCms(body as never);
  return NextResponse.json({ ok: true });
}
