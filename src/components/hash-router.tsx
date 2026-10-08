"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function HashRouter() {
  const router = useRouter();
  useEffect(() => {
    const handle = () => {
      const h = window.location.hash.replace(/^#/, "");
      if (h === "/login" || h === "login") router.push("/admin/login");
      else if (h === "/admin" || h === "admin") router.push("/admin");
    };
    handle();
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, [router]);
  return null;
}
