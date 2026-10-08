import { promises as fs } from "fs";
import path from "path";
import type { CmsData } from "./cms-types";

const CMS_PATH = path.join(process.cwd(), "data", "cms.json");

export async function getCms(): Promise<CmsData> {
  const raw = await fs.readFile(CMS_PATH, "utf-8");
  return JSON.parse(raw) as CmsData;
}

export async function saveCms(data: CmsData): Promise<void> {
  await fs.mkdir(path.dirname(CMS_PATH), { recursive: true });
  await fs.writeFile(CMS_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export async function getCmsWithFallback(): Promise<CmsData> {
  return getCms();
}
