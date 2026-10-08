"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      if (!r.ok) {
        setErr("Username atau password salah");
        return;
      }
      router.push("/admin");
    } catch {
      setErr("Gagal login, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-surface p-8"
      >
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff6c6b,#fb4157)] text-xl font-bold">
            G
          </span>
          <h1 className="mt-4 text-xl font-bold tracking-tight">Admin Login</h1>
          <p className="mt-1 text-xs text-muted">
            Bisa juga via <code className="text-white/60">http://localhost:3001/#/login</code>
          </p>
        </div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Username
        </label>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          autoComplete="username"
          placeholder="admin"
          className="mb-4 w-full rounded-xl border border-white/[0.1] bg-[#05060a]/60 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#fb4157]/60"
        />
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Password
        </label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••"
          className="w-full rounded-xl border border-white/[0.1] bg-[#05060a]/60 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#fb4157]/60"
        />
        {err && <p className="mt-3 text-xs font-medium text-[#ff6c6b]">{err}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-6 w-full px-4 py-3 text-sm disabled:opacity-60"
        >
          {loading ? "Masuk..." : "Masuk ke Panel Admin"}
        </button>
      </form>
    </main>
  );
}
