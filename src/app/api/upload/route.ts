import { NextRequest, NextResponse } from "next/server";
import { verifyToken, AUTH_COOKIE } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["image/png","image/jpeg","image/jpg","image/webp","image/svg+xml","image/gif"]);
const MAX = 5 * 1024 * 1024;

function safeName(n: string) {
  return n.replace(/[^a-zA-Z0-9.\-_]/g, "_").replace(/__+/g, "_");
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const fd = await req.formData().catch(()=>null);
  if (!fd) return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  const file = fd.get("file") as File | null;
  const folderRaw = (fd.get("folder") as string) || "uploads";
  const folder = folderRaw.replace(/[^a-z0-9\-_]/gi, "") || "uploads";
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "File >5MB" }, { status: 400 });
  if (file.type && !ALLOWED.has(file.type) && !file.type.startsWith("image/")) return NextResponse.json({ error: "Hanya gambar" }, { status: 400 });
  const ext = path.extname(file.name) || (file.type === "image/svg+xml" ? ".svg" : ".png");
  const base = safeName(path.basename(file.name, ext)).slice(0, 40) || "image";
  const name = `${Date.now()}-${base}${ext}`;
  const dir = path.join(process.cwd(), "public", folder);
  await fs.mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, name), buf);
  const url = `/${folder}/${name}`;
  return NextResponse.json({ ok: true, url });
}
