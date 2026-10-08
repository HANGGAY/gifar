"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { CmsData } from "@/lib/cms-types";
import fallback from "../../data/cms.json";

const Ctx = createContext<CmsData>(fallback as CmsData);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CmsData>(fallback as CmsData);
  useEffect(() => {
    fetch("/api/cms", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => j && setData(j))
      .catch(() => {});
  }, []);
  return <Ctx.Provider value={data}>{children}</Ctx.Provider>;
}
export function useCms() {
  return useContext(Ctx);
}
