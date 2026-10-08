"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Plus, Eye, Save, LogOut, Sun, Moon, ImageIcon, X } from "lucide-react";
import type { CmsData } from "@/lib/cms-types";
import { useTheme } from "@/components/theme-provider";

type Tab = "hero" | "competencies" | "experience" | "clients" | "stats" | "portfolio" | "process" | "skills" | "testimonials" | "faq" | "contact" | "footer" | "json";

const tabs: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "competencies", label: "Core" },
  { id: "experience", label: "Experience" },
  { id: "clients", label: "Clients" },
  { id: "stats", label: "Stats" },
  { id: "portfolio", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "skills", label: "Skills" },
  { id: "testimonials", label: "Testimoni" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
  { id: "json", label: "JSON" },
];

const inputCls = "w-full rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#05060a]/60 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none focus:border-indigo-400 dark:focus:border-[#fb4157]/60 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-[#fb4157]/20 transition-colors";
const areaCls = inputCls + " min-h-[88px] resize-y";
const cardCls = "rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-4";
const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted";
const btnAddCls = "inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/15 px-3 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/25 transition-colors";
const btnDelCls = "inline-flex items-center gap-1 rounded-lg border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls}>{label} {hint && <span className="normal-case tracking-normal font-normal text-slate-400 dark:text-white/40">— {hint}</span>}</span>
      {children}
    </label>
  );
}

function ImageField({ value, onChange, folder, hint }: { value: string; onChange: (v: string) => void; folder: string; hint?: string }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const upload = async (f: File) => {
    setErr(null); setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", f);
      fd.set("folder", folder);
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Upload gagal");
      onChange(j.url);
    } catch (e) { setErr(e instanceof Error ? e.message : "Gagal upload"); }
    finally { setUploading(false); }
  };
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input className={inputCls + " flex-1"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={hint || "/logos/nama.png atau https://..."} />
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-700 dark:text-white hover:bg-white dark:hover:bg-white/[0.10] transition-colors">
          <input type="file" accept="image/*,.svg" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.currentTarget.value = ""; }} />
          {uploading ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" /> : <Upload className="h-3.5 w-3.5" />}
          {uploading ? "Upload..." : "Upload"}
        </label>
      </div>
      {err && <p className="text-xs text-red-500">{err}</p>}
      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] p-2">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 dark:border-white/10 bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="preview" className="h-full w-full object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
          </div>
          <span className="flex-1 truncate text-xs text-slate-600 dark:text-white/60">{value}</span>
          <button onClick={() => onChange("")} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-red-500 dark:hover:bg-white/10"><X className="h-4 w-4" /></button>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] px-3 py-2.5 text-xs text-slate-400 dark:text-white/30"><ImageIcon className="h-4 w-4" /> Belum ada gambar — upload atau isi URL</div>
      )}
    </div>
  );
}

function MultiImageField({ value, onChange, folder }: { value: string[]; onChange: (v: string[]) => void; folder: string }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const upload = async (files: FileList | File[]) => {
    setErr(null); setUploading(true);
    try {
      const arr = Array.from(files);
      for (const f of arr) {
        const fd = new FormData();
        fd.set("file", f);
        fd.set("folder", folder);
        const r = await fetch("/api/upload", { method: "POST", body: fd });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Upload gagal");
        onChange([...value, j.url]);
      }
    } catch (e) { setErr(e instanceof Error ? e.message : "Gagal upload"); }
    finally { setUploading(false); }
  };
  return (
    <div className="space-y-2">
      {!!value.length && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {value.map((src, i) => (
            <div key={src + i} className="relative group overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`img ${i+1}`} className="h-28 w-full rounded-lg object-cover" onError={(e) => (e.currentTarget.style.opacity = "0.3")} />
              <span className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">#{i+1}</span>
              <div className="absolute inset-0 flex items-end justify-between gap-1 bg-gradient-to-t from-black/40 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <button disabled={i===0} onClick={() => { const v=[...value]; const t=v[i-1]; v[i-1]=v[i]; v[i]=t; onChange(v); }} className="rounded-md bg-white px-1.5 py-1 text-[10px] font-bold disabled:opacity-40">↑</button>
                  <button disabled={i===value.length-1} onClick={() => { const v=[...value]; const t=v[i+1]; v[i+1]=v[i]; v[i]=t; onChange(v); }} className="rounded-md bg-white px-1.5 py-1 text-[10px] font-bold disabled:opacity-40">↓</button>
                </div>
                <button onClick={() => onChange(value.filter((_, k) => k !== i))} className="rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white">Hapus</button>
              </div>
              <p className="truncate px-1 pt-1 text-[10px] text-slate-500 dark:text-white/40">{src}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input className={inputCls + " flex-1"} value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Tempel URL gambar lalu Tambah" />
        <button onClick={() => { if (urlInput.trim()) { onChange([...value, urlInput.trim()]); setUrlInput(""); } }} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.06] px-3 py-2 text-xs font-semibold">Tambah URL</button>
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.06] px-3 py-2 text-xs font-semibold hover:bg-white dark:hover:bg-white/[0.10]">
          <input type="file" accept="image/*" multiple hidden onChange={(e) => { if (e.target.files?.length) upload(e.target.files); e.currentTarget.value=""; }} />
          {uploading ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" /> : <Upload className="h-3.5 w-3.5" />}
          {uploading ? "Upload..." : "Upload"}
        </label>
      </div>
      {err && <p className="text-xs text-red-500">{err}</p>}
      {!value.length && <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] px-3 py-2.5 text-xs text-slate-400 dark:text-white/30"><ImageIcon className="h-4 w-4" /> Belum ada gambar — bisa lebih dari satu</div>}
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [data, setData] = useState<CmsData | null>(null);
  const [tab, setTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    fetch("/api/cms", { cache: "no-store" }).then((r) => r.json()).then((j: CmsData) => { setData(j); setJsonText(JSON.stringify(j, null, 2)); });
  }, []);

  const save = async (next?: CmsData) => {
    const payload = next ?? (tab === "json" ? (JSON.parse(jsonText) as CmsData) : data);
    if (!payload) return;
    setSaving(true); setMsg(null);
    try {
      const r = await fetch("/api/cms", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(await r.text());
      setMsg("Tersimpan — refresh halaman utama untuk lihat perubahan.");
      setData(payload); setJsonText(JSON.stringify(payload, null, 2));
    } catch (e) { setMsg(e instanceof Error ? e.message : "Gagal simpan"); }
    finally { setSaving(false); }
  };

  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/admin/login"); };
  if (!data) return <div className="min-h-screen bg-[#f8fafc] dark:bg-ink p-8 text-slate-500 dark:text-muted">Memuat CMS...</div>;

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-ink text-slate-900 dark:text-white">
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-[#0b0d13]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div><h1 className="text-sm font-bold tracking-tight">CMS Panel — Gifar</h1><p className="text-xs text-slate-500 dark:text-muted">Tambah / edit / upload gambar — klik Simpan</p></div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.06] text-slate-600 dark:text-white">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] px-3 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-white/[0.08]"><Eye className="h-3.5 w-3.5" /> Lihat Site</Link>
            <button onClick={() => save()} disabled={saving} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 dark:bg-[#fb4157] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50 hover:bg-indigo-700 dark:hover:bg-[#ff4d62] transition-colors"><Save className="h-3.5 w-3.5" />{saving ? "Menyimpan..." : "Simpan"}</button>
            <button onClick={logout} className="rounded-xl border border-slate-200 dark:border-white/[0.1] px-3 py-2 text-xs font-medium text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-white"><LogOut className="h-3.5 w-3.5 sm:hidden" /><span className="hidden sm:inline">Logout</span></button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${tab === t.id ? "border-indigo-600 dark:border-[#fb4157] bg-indigo-600 dark:bg-[#fb4157] text-white shadow-sm" : "border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.06]"}`}>{t.label}</button>
          ))}
        </div>
        {msg && <div className="mb-4 rounded-xl border border-amber-200 dark:border-[#fde65c]/20 bg-amber-50 dark:bg-[#fde65c]/10 px-4 py-3 text-sm text-amber-800 dark:text-white">{msg}</div>}

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-surface p-5 sm:p-8 shadow-sm dark:shadow-none enterprise-accent">
          <div className="enterprise-grid opacity-20 dark:opacity-10" />
          <div className="relative">

          {tab === "hero" && (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Greeting" hint="baris atas, mis. Hi, I'm"><input className={inputCls} value={(data.hero as unknown as { greeting?: string }).greeting ?? "Hi, I'm"} onChange={(e) => setData({ ...data, hero: { ...data.hero, greeting: e.target.value } as unknown as typeof data.hero })} /></Field>
                <Field label="Name" hint="baris bawah besar"><input className={inputCls} value={data.hero.name} onChange={(e) => setData({ ...data, hero: { ...data.hero, name: e.target.value } })} /></Field>
                <Field label="Role"><input className={inputCls} value={data.hero.role} onChange={(e) => setData({ ...data, hero: { ...data.hero, role: e.target.value } })} /></Field>
                <Field label="Badge"><input className={inputCls} value={data.hero.badge} onChange={(e) => setData({ ...data, hero: { ...data.hero, badge: e.target.value } })} /></Field>
                <Field label="Location"><input className={inputCls} value={data.hero.location} onChange={(e) => setData({ ...data, hero: { ...data.hero, location: e.target.value } })} /></Field>
                <Field label="Photo badge"><input className={inputCls} value={data.hero.photoBadge} onChange={(e) => setData({ ...data, hero: { ...data.hero, photoBadge: e.target.value } })} /></Field>
                <Field label="LinkedIn" hint="URL — tampil sebagai logo LinkedIn di hero"><input className={inputCls} value={(data.hero as unknown as { linkedin?: string }).linkedin ?? ""} onChange={(e) => setData({ ...data, hero: { ...data.hero, linkedin: e.target.value } as unknown as typeof data.hero })} placeholder="https://www.linkedin.com/in/gifarauliarahman/" /></Field>
                <Field label="Brands" hint="pisah koma — tidak tampil di hero (pakai LinkedIn)"><input className={inputCls} value={data.hero.brands.join(", ")} onChange={(e) => setData({ ...data, hero: { ...data.hero, brands: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } })} /></Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Shipped label"><input className={inputCls} value={data.hero.shippedLabel} onChange={(e) => setData({ ...data, hero: { ...data.hero, shippedLabel: e.target.value } })} /></Field>
                <Field label="Shipped value"><input className={inputCls} value={data.hero.shippedValue} onChange={(e) => setData({ ...data, hero: { ...data.hero, shippedValue: e.target.value } })} /></Field>
              </div>
              <Field label="About"><textarea className={areaCls} value={data.hero.about} onChange={(e) => setData({ ...data, hero: { ...data.hero, about: e.target.value } })} /></Field>
              <Field label="Foto Hero" hint="upload atau URL"><ImageField value={data.hero.photo} onChange={(v) => setData({ ...data, hero: { ...data.hero, photo: v } })} folder="hero" hint="/gifarfoto.png" /></Field>
            </div>
          )}

          {tab === "competencies" && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Eyebrow"><input className={inputCls} value={data.competencies.eyebrow} onChange={(e) => setData({ ...data, competencies: { ...data.competencies, eyebrow: e.target.value } })} /></Field>
                <Field label="Title A"><input className={inputCls} value={data.competencies.titleA} onChange={(e) => setData({ ...data, competencies: { ...data.competencies, titleA: e.target.value } })} /></Field>
                <Field label="Accent"><input className={inputCls} value={data.competencies.titleAccent} onChange={(e) => setData({ ...data, competencies: { ...data.competencies, titleAccent: e.target.value } })} /></Field>
              </div>
              <Field label="Desc"><textarea className={areaCls} value={data.competencies.desc} onChange={(e) => setData({ ...data, competencies: { ...data.competencies, desc: e.target.value } })} /></Field>
              <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Items ({data.competencies.items.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, competencies: { ...data.competencies, items: [...data.competencies.items, { title: "Judul baru", desc: "Deskripsi...", icon: "" }] } })}><Plus className="h-3.5 w-3.5" /> Tambah Core</button></div>
              {data.competencies.items.map((it, i) => (
                <div key={i} className={cardCls}>
                  <div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold text-indigo-600 dark:text-[#ff6c6b]">#{i + 1}</span><button className={btnDelCls} onClick={() => setData({ ...data, competencies: { ...data.competencies, items: data.competencies.items.filter((_, j) => j !== i) } })}><Trash2 className="h-3 w-3" /> Hapus</button></div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Title"><input className={inputCls} value={it.title} onChange={(e) => { const v = [...data.competencies.items]; v[i] = { ...v[i], title: e.target.value }; setData({ ...data, competencies: { ...data.competencies, items: v } }); }} /></Field>
                    <Field label="Desc"><input className={inputCls} value={it.desc} onChange={(e) => { const v = [...data.competencies.items]; v[i] = { ...v[i], desc: e.target.value }; setData({ ...data, competencies: { ...data.competencies, items: v } }); }} /></Field>
                    <div className="md:col-span-2"><Field label="Icon" hint="gambar kecil, kosong pakai icon default"><ImageField value={it.icon ?? ""} onChange={(v) => { const vv = [...data.competencies.items]; vv[i] = { ...vv[i], icon: v || undefined }; setData({ ...data, competencies: { ...data.competencies, items: vv } }); }} folder="icons" hint="/icons/icon.png" /></Field></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "experience" && (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Eyebrow"><input className={inputCls} value={data.experience.eyebrow} onChange={(e) => setData({ ...data, experience: { ...data.experience, eyebrow: e.target.value } })} /></Field>
                <Field label="Title A"><input className={inputCls} value={data.experience.titleA} onChange={(e) => setData({ ...data, experience: { ...data.experience, titleA: e.target.value } })} /></Field>
                <Field label="Accent"><input className={inputCls} value={data.experience.titleAccent} onChange={(e) => setData({ ...data, experience: { ...data.experience, titleAccent: e.target.value } })} /></Field>
              </div>
              <Field label="Note"><input className={inputCls} value={data.experience.note} onChange={(e) => setData({ ...data, experience: { ...data.experience, note: e.target.value } })} /></Field>
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Jobs ({data.experience.jobs.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, experience: { ...data.experience, jobs: [...data.experience.jobs, { role: "Role baru", company: "PT Contoh", location: "Jakarta", period: "2024 — Present", logo: "", summary: "Ringkasan...", bullets: ["Poin 1"], tags: ["NPD"], highlight: [], clientsLine: "" }] } })}><Plus className="h-3.5 w-3.5" /> Tambah Job</button></div>
              {data.experience.jobs.map((j, i) => (
                <div key={i} className={cardCls + " space-y-3"}>
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3"><span className="text-sm font-bold">{j.company || `Job #${i+1}`}</span><button className={btnDelCls} onClick={() => setData({ ...data, experience: { ...data.experience, jobs: data.experience.jobs.filter((_, k) => k !== i) } })}><Trash2 className="h-3 w-3" /> Hapus</button></div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Role"><input className={inputCls} value={j.role} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], role: e.target.value }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field>
                    <Field label="Company"><input className={inputCls} value={j.company} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], company: e.target.value }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field>
                    <Field label="Location"><input className={inputCls} value={j.location} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], location: e.target.value }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field>
                    <Field label="Period"><input className={inputCls} value={j.period} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], period: e.target.value }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field>
                    <div className="md:col-span-2"><Field label="Logo perusahaan"><ImageField value={j.logo} onChange={(v) => { const vv = [...data.experience.jobs]; vv[i] = { ...vv[i], logo: v }; setData({ ...data, experience: { ...data.experience, jobs: vv } }); }} folder="logos" hint="/logos/pt-contoh.png" /></Field></div>
                    <Field label="Tags" hint="pisah koma"><input className={inputCls} value={j.tags.join(", ")} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field>
                    <Field label="Clients line" hint="opsional"><input className={inputCls} value={j.clientsLine ?? ""} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], clientsLine: e.target.value || undefined }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field>
                    <div className="md:col-span-2"><Field label="Summary"><textarea className={areaCls} value={j.summary} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], summary: e.target.value }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field></div>
                    <div className="md:col-span-2"><Field label="Bullets" hint="satu per baris"><textarea className={areaCls} value={j.bullets.join("\n")} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], bullets: e.target.value.split("\n").filter(Boolean) }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field></div>
                    <div className="md:col-span-2"><Field label="Highlight" hint="satu per baris, kosong = sembunyikan"><textarea className={areaCls} value={(j.highlight ?? []).join("\n")} onChange={(e) => { const v = [...data.experience.jobs]; v[i] = { ...v[i], highlight: e.target.value.split("\n").filter(Boolean) }; setData({ ...data, experience: { ...data.experience, jobs: v } }); }} /></Field></div>
                    <div className="md:col-span-2"><Field label="Gambar Experience" hint="bisa lebih dari satu — upload multi / tambah URL"><MultiImageField value={(j as unknown as { images?: string[] }).images ?? []} onChange={(v) => { const vv = [...data.experience.jobs] as unknown as Array<Record<string, unknown>>; vv[i] = { ...vv[i], images: v.length ? v : undefined }; setData({ ...data, experience: { ...data.experience, jobs: vv as unknown as typeof data.experience.jobs } }); }} folder="experience" /></Field></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "clients" && (
            <div className="space-y-4">
              <Field label="Eyebrow"><input className={inputCls} value={data.clients.eyebrow} onChange={(e) => setData({ ...data, clients: { ...data.clients, eyebrow: e.target.value } })} /></Field>
              <Field label="Note"><input className={inputCls} value={data.clients.note} onChange={(e) => setData({ ...data, clients: { ...data.clients, note: e.target.value } })} /></Field>
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Clients ({data.clients.items.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, clients: { ...data.clients, items: [...data.clients.items, { name: "Client Baru" }] } })}><Plus className="h-3.5 w-3.5" /> Tambah Client</button></div>
              {data.clients.items.map((c, i) => (
                <div key={i} className={cardCls}>
                  <div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">{c.name || `Client #${i+1}`}</span><button className={btnDelCls} onClick={() => setData({ ...data, clients: { ...data.clients, items: data.clients.items.filter((_, k) => k !== i) } })}><Trash2 className="h-3 w-3" /> Hapus</button></div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Nama"><input className={inputCls} value={c.name} onChange={(e) => { const v = [...data.clients.items]; v[i] = { ...v[i], name: e.target.value }; setData({ ...data, clients: { ...data.clients, items: v } }); }} /></Field>
                    <label className="flex items-end gap-2 pb-1 text-xs text-slate-600 dark:text-muted"><input type="checkbox" checked={!!c.isSimple} onChange={(e) => { const v = [...data.clients.items]; v[i] = { ...v[i], isSimple: e.target.checked || undefined }; setData({ ...data, clients: { ...data.clients, items: v } }); }} /> isSimple (CDN simpleicons)</label>
                    <div className="md:col-span-2"><Field label="Logo"><ImageField value={c.logo ?? ""} onChange={(v) => { const vv = [...data.clients.items]; vv[i] = { ...vv[i], logo: v || undefined }; setData({ ...data, clients: { ...data.clients, items: vv } }); }} folder="logos" hint="https://cdn.simpleicons.org/toyota/ffffff atau upload" /></Field></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "stats" && (
            <div className="space-y-3">
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Stats ({data.stats.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, stats: [...data.stats, { label: "Label baru", value: 0, suffix: "+" }] })}><Plus className="h-3.5 w-3.5" /> Tambah Stat</button></div>
              {data.stats.map((s, i) => (
                <div key={i} className={cardCls + " grid gap-3 md:grid-cols-3 relative"}>
                  <Field label="Label"><input className={inputCls} value={s.label} onChange={(e) => { const v = [...data.stats]; v[i] = { ...v[i], label: e.target.value }; setData({ ...data, stats: v }); }} /></Field>
                  <Field label="Value"><input type="number" className={inputCls} value={s.value} onChange={(e) => { const v = [...data.stats]; v[i] = { ...v[i], value: Number(e.target.value) }; setData({ ...data, stats: v }); }} /></Field>
                  <Field label="Suffix"><input className={inputCls} value={s.suffix} onChange={(e) => { const v = [...data.stats]; v[i] = { ...v[i], suffix: e.target.value }; setData({ ...data, stats: v }); }} /></Field>
                  <button className="absolute right-2 top-2 rounded-lg p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10" onClick={() => setData({ ...data, stats: data.stats.filter((_, k) => k !== i) })}><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}

          {tab === "portfolio" && (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Eyebrow"><input className={inputCls} value={data.portfolio.eyebrow} onChange={(e) => setData({ ...data, portfolio: { ...data.portfolio, eyebrow: e.target.value } })} /></Field>
                <Field label="Title A"><input className={inputCls} value={data.portfolio.titleA} onChange={(e) => setData({ ...data, portfolio: { ...data.portfolio, titleA: e.target.value } })} /></Field>
                <Field label="Accent"><input className={inputCls} value={data.portfolio.titleAccent} onChange={(e) => setData({ ...data, portfolio: { ...data.portfolio, titleAccent: e.target.value } })} /></Field>
              </div>
              <Field label="Filters" hint="pisah koma"><input className={inputCls} value={data.portfolio.filters.join(", ")} onChange={(e) => setData({ ...data, portfolio: { ...data.portfolio, filters: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } })} /></Field>
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Projects ({data.portfolio.projects.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, portfolio: { ...data.portfolio, projects: [...data.portfolio.projects, { title: "Project Baru", category: data.portfolio.filters[1] || "Automotive", year: String(new Date().getFullYear()), description: "Deskripsi singkat", color: "#1a2634", initial: "N", href: "#work" }] } })}><Plus className="h-3.5 w-3.5" /> Tambah Project</button></div>
              {data.portfolio.projects.map((p, i) => (
                <div key={i} className={cardCls + " space-y-3"}>
                  <div className="flex items-center justify-between"><span className="text-sm font-bold">{p.title || `Project #${i+1}`}</span><button className={btnDelCls} onClick={() => setData({ ...data, portfolio: { ...data.portfolio, projects: data.portfolio.projects.filter((_, k) => k !== i) } })}><Trash2 className="h-3 w-3" /> Hapus</button></div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Title"><input className={inputCls} value={p.title} onChange={(e) => { const v = [...data.portfolio.projects]; v[i] = { ...v[i], title: e.target.value }; setData({ ...data, portfolio: { ...data.portfolio, projects: v } }); }} /></Field>
                    <Field label="Category"><input list="cat-list" className={inputCls} value={p.category} onChange={(e) => { const v = [...data.portfolio.projects]; v[i] = { ...v[i], category: e.target.value }; setData({ ...data, portfolio: { ...data.portfolio, projects: v } }); }} /></Field>
                    <Field label="Year"><input className={inputCls} value={p.year} onChange={(e) => { const v = [...data.portfolio.projects]; v[i] = { ...v[i], year: e.target.value }; setData({ ...data, portfolio: { ...data.portfolio, projects: v } }); }} /></Field>
                    <Field label="Href"><input className={inputCls} value={p.href} onChange={(e) => { const v = [...data.portfolio.projects]; v[i] = { ...v[i], href: e.target.value }; setData({ ...data, portfolio: { ...data.portfolio, projects: v } }); }} /></Field>
                    <Field label="Color"><div className="flex gap-2"><input type="color" value={p.color} onChange={(e) => { const v = [...data.portfolio.projects]; v[i] = { ...v[i], color: e.target.value }; setData({ ...data, portfolio: { ...data.portfolio, projects: v } }); }} className="h-10 w-10 rounded-lg border border-slate-200 dark:border-white/10 p-1 bg-white dark:bg-transparent" /><input className={inputCls + " flex-1"} value={p.color} onChange={(e) => { const v = [...data.portfolio.projects]; v[i] = { ...v[i], color: e.target.value }; setData({ ...data, portfolio: { ...data.portfolio, projects: v } }); }} /></div></Field>
                    <Field label="Initial" hint="1 huruf fallback"><input className={inputCls} maxLength={2} value={p.initial} onChange={(e) => { const v = [...data.portfolio.projects]; v[i] = { ...v[i], initial: e.target.value.toUpperCase() }; setData({ ...data, portfolio: { ...data.portfolio, projects: v } }); }} /></Field>
                    <div className="md:col-span-2"><Field label="Description"><input className={inputCls} value={p.description} onChange={(e) => { const v = [...data.portfolio.projects]; v[i] = { ...v[i], description: e.target.value }; setData({ ...data, portfolio: { ...data.portfolio, projects: v } }); }} /></Field></div>
                    <div className="md:col-span-2"><Field label="Gambar Project" hint="upload untuk thumbnail"><ImageField value={p.image ?? ""} onChange={(v) => { const vv = [...data.portfolio.projects]; vv[i] = { ...vv[i], image: v || undefined }; setData({ ...data, portfolio: { ...data.portfolio, projects: vv } }); }} folder="portfolio" /></Field></div>
                  </div>
                </div>
              ))}
              <datalist id="cat-list">{data.portfolio.filters.map((f) => (<option key={f} value={f} />))}</datalist>
            </div>
          )}

          {tab === "process" && (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Eyebrow"><input className={inputCls} value={data.process.eyebrow} onChange={(e) => setData({ ...data, process: { ...data.process, eyebrow: e.target.value } })} /></Field>
                <Field label="Title"><input className={inputCls} value={data.process.title} onChange={(e) => setData({ ...data, process: { ...data.process, title: e.target.value } })} /></Field>
              </div>
              <Field label="Desc"><textarea className={areaCls} value={data.process.desc} onChange={(e) => setData({ ...data, process: { ...data.process, desc: e.target.value } })} /></Field>
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Steps ({data.process.steps.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, process: { ...data.process, steps: [...data.process.steps, { title: "Step baru", items: ["Poin 1"] }] } })}><Plus className="h-3.5 w-3.5" /> Tambah Step</button></div>
              {data.process.steps.map((s, i) => (
                <div key={i} className={cardCls}>
                  <div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold">Step {i + 1}</span><button className={btnDelCls} onClick={() => setData({ ...data, process: { ...data.process, steps: data.process.steps.filter((_, k) => k !== i) } })}><Trash2 className="h-3 w-3" /> Hapus</button></div>
                  <Field label="Title"><input className={inputCls} value={s.title} onChange={(e) => { const v = [...data.process.steps]; v[i] = { ...v[i], title: e.target.value }; setData({ ...data, process: { ...data.process, steps: v } }); }} /></Field>
                  <div className="mt-3"><Field label="Items" hint="satu per baris"><textarea className={areaCls} value={s.items.join("\n")} onChange={(e) => { const v = [...data.process.steps]; v[i] = { ...v[i], items: e.target.value.split("\n").filter(Boolean) }; setData({ ...data, process: { ...data.process, steps: v } }); }} /></Field></div>
                </div>
              ))}
            </div>
          )}

          {tab === "skills" && (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Eyebrow"><input className={inputCls} value={data.skills.eyebrow} onChange={(e) => setData({ ...data, skills: { ...data.skills, eyebrow: e.target.value } })} /></Field>
                <Field label="Years"><input className={inputCls} value={data.skills.years} onChange={(e) => setData({ ...data, skills: { ...data.skills, years: e.target.value } })} /></Field>
                <Field label="Title A"><input className={inputCls} value={data.skills.titleA} onChange={(e) => setData({ ...data, skills: { ...data.skills, titleA: e.target.value } })} /></Field>
                <Field label="Accent"><input className={inputCls} value={data.skills.titleAccent} onChange={(e) => setData({ ...data, skills: { ...data.skills, titleAccent: e.target.value } })} /></Field>
              </div>
              <Field label="Desc"><input className={inputCls} value={data.skills.desc} onChange={(e) => setData({ ...data, skills: { ...data.skills, desc: e.target.value } })} /></Field>
              <Field label="YearsDesc"><textarea className={areaCls} value={data.skills.yearsDesc} onChange={(e) => setData({ ...data, skills: { ...data.skills, yearsDesc: e.target.value } })} /></Field>
              <Field label="Checklist" hint="satu per baris"><textarea className={areaCls} value={data.skills.checklist.join("\n")} onChange={(e) => setData({ ...data, skills: { ...data.skills, checklist: e.target.value.split("\n").filter(Boolean) } })} /></Field>
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Tools ({data.skills.tools.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, skills: { ...data.skills, tools: [...data.skills.tools, { name: "Tool baru", level: 80 }] } })}><Plus className="h-3.5 w-3.5" /> Tambah Tool</button></div>
              {data.skills.tools.map((t, i) => (
                <div key={i} className={cardCls + " grid gap-3 md:grid-cols-[1fr_auto] items-end"}>
                  <Field label="Name"><input className={inputCls} value={t.name} onChange={(e) => { const v = [...data.skills.tools]; v[i] = { ...v[i], name: e.target.value }; setData({ ...data, skills: { ...data.skills, tools: v } }); }} /></Field>
                  <div className="flex gap-2 items-end">
                    <Field label="Level"><div className="flex items-center gap-2"><input type="range" min={0} max={100} value={t.level} onChange={(e) => { const v = [...data.skills.tools]; v[i] = { ...v[i], level: Number(e.target.value) }; setData({ ...data, skills: { ...data.skills, tools: v } }); }} className="w-28 accent-indigo-600 dark:accent-[#fb4157]" /><input type="number" className={inputCls + " w-20"} value={t.level} min={0} max={100} onChange={(e) => { const v = [...data.skills.tools]; v[i] = { ...v[i], level: Math.min(100, Math.max(0, Number(e.target.value))) }; setData({ ...data, skills: { ...data.skills, tools: v } }); }} /></div></Field>
                    <button className={btnDelCls + " mb-1"} onClick={() => setData({ ...data, skills: { ...data.skills, tools: data.skills.tools.filter((_, k) => k !== i) } })}><Trash2 className="h-3 w-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "testimonials" && (
            <div className="space-y-3">
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Testimoni ({data.testimonials.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, testimonials: [...data.testimonials, { name: "Nama baru", role: "Jabatan — Perusahaan", text: "Tulis testimoni...", avatarColor: "#6366f1" }] })}><Plus className="h-3.5 w-3.5" /> Tambah Testimoni</button></div>
              {data.testimonials.map((t, i) => (
                <div key={i} className={cardCls + " space-y-3"}>
                  <div className="flex items-center justify-between"><span className="text-sm font-semibold">{t.name || `Testimoni #${i+1}`}</span><button className={btnDelCls} onClick={() => setData({ ...data, testimonials: data.testimonials.filter((_, k) => k !== i) })}><Trash2 className="h-3 w-3" /> Hapus</button></div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Field label="Nama"><input className={inputCls} value={t.name} onChange={(e) => { const v = [...data.testimonials]; v[i] = { ...v[i], name: e.target.value }; setData({ ...data, testimonials: v }); }} /></Field>
                    <Field label="Role"><input className={inputCls} value={t.role} onChange={(e) => { const v = [...data.testimonials]; v[i] = { ...v[i], role: e.target.value }; setData({ ...data, testimonials: v }); }} /></Field>
                    <Field label="Warna avatar"><div className="flex gap-2"><input type="color" value={t.avatarColor} onChange={(e) => { const v = [...data.testimonials]; v[i] = { ...v[i], avatarColor: e.target.value }; setData({ ...data, testimonials: v }); }} className="h-10 w-10 rounded-lg border border-slate-200 dark:border-white/10 p-1 bg-white dark:bg-transparent" /><input className={inputCls + " flex-1"} value={t.avatarColor} onChange={(e) => { const v = [...data.testimonials]; v[i] = { ...v[i], avatarColor: e.target.value }; setData({ ...data, testimonials: v }); }} /></div></Field>
                    <Field label="Foto avatar" hint="opsional, upload"><ImageField value={(t as unknown as { avatarImage?: string }).avatarImage ?? ""} onChange={(v) => { const vv = [...data.testimonials] as unknown as Array<Record<string, unknown>>; vv[i] = { ...vv[i], avatarImage: v || undefined }; setData({ ...data, testimonials: vv as unknown as CmsData["testimonials"] }); }} folder="testimonials" /></Field>
                  </div>
                  <Field label="Text"><textarea className={areaCls} value={t.text} onChange={(e) => { const v = [...data.testimonials]; v[i] = { ...v[i], text: e.target.value }; setData({ ...data, testimonials: v }); }} /></Field>
                </div>
              ))}
            </div>
          )}

          {tab === "faq" && (
            <div className="space-y-3">
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">FAQ ({data.faq.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, faq: [...data.faq, { question: "Pertanyaan baru?", answer: "Jawaban..." }] })}><Plus className="h-3.5 w-3.5" /> Tambah FAQ</button></div>
              {data.faq.map((f, i) => (
                <div key={i} className={cardCls}>
                  <div className="mb-3 flex justify-end"><button className={btnDelCls} onClick={() => setData({ ...data, faq: data.faq.filter((_, k) => k !== i) })}><Trash2 className="h-3 w-3" /> Hapus</button></div>
                  <Field label="Question"><input className={inputCls} value={f.question} onChange={(e) => { const v = [...data.faq]; v[i] = { ...v[i], question: e.target.value }; setData({ ...data, faq: v }); }} /></Field>
                  <div className="mt-3"><Field label="Answer"><textarea className={areaCls} value={f.answer} onChange={(e) => { const v = [...data.faq]; v[i] = { ...v[i], answer: e.target.value }; setData({ ...data, faq: v }); }} /></Field></div>
                </div>
              ))}
            </div>
          )}

          {tab === "contact" && (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow"><input className={inputCls} value={data.contact.eyebrow} onChange={(e) => setData({ ...data, contact: { ...data.contact, eyebrow: e.target.value } })} /></Field>
              <Field label="Email"><input className={inputCls} value={data.contact.email} onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} /></Field>
              <Field label="Phone"><input className={inputCls} value={data.contact.phone} onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })} /></Field>
              <Field label="Location"><input className={inputCls} value={data.contact.location} onChange={(e) => setData({ ...data, contact: { ...data.contact, location: e.target.value } })} /></Field>
              <Field label="Title A"><input className={inputCls} value={data.contact.titleA} onChange={(e) => setData({ ...data, contact: { ...data.contact, titleA: e.target.value } })} /></Field>
              <Field label="Accent"><input className={inputCls} value={data.contact.titleAccent} onChange={(e) => setData({ ...data, contact: { ...data.contact, titleAccent: e.target.value } })} /></Field>
              <div className="md:col-span-2"><Field label="Desc"><textarea className={areaCls} value={data.contact.desc} onChange={(e) => setData({ ...data, contact: { ...data.contact, desc: e.target.value } })} /></Field></div>
              <div className="md:col-span-2"><Field label="Categories" hint="satu per baris"><textarea className={areaCls} value={data.contact.categories.join("\n")} onChange={(e) => setData({ ...data, contact: { ...data.contact, categories: e.target.value.split("\n").filter(Boolean) } })} /></Field></div>
            </div>
          )}

          {tab === "footer" && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name"><input className={inputCls} value={data.footer.name} onChange={(e) => setData({ ...data, footer: { ...data.footer, name: e.target.value } })} /></Field>
                <Field label="Email"><input className={inputCls} value={data.footer.email} onChange={(e) => setData({ ...data, footer: { ...data.footer, email: e.target.value } })} /></Field>
              </div>
              <Field label="Desc"><textarea className={areaCls} value={data.footer.desc} onChange={(e) => setData({ ...data, footer: { ...data.footer, desc: e.target.value } })} /></Field>
              <Field label="Copyright"><input className={inputCls} value={data.footer.copyright} onChange={(e) => setData({ ...data, footer: { ...data.footer, copyright: e.target.value } })} /></Field>
              <div className="flex justify-between"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Columns ({data.footer.columns.length})</p><button className={btnAddCls} onClick={() => setData({ ...data, footer: { ...data.footer, columns: [...data.footer.columns, { title: "Kolom baru", links: ["Link 1"] }] } })}><Plus className="h-3.5 w-3.5" /> Tambah Kolom</button></div>
              {data.footer.columns.map((col, i) => (
                <div key={i} className={cardCls}>
                  <div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">{col.title}</span><button className={btnDelCls} onClick={() => setData({ ...data, footer: { ...data.footer, columns: data.footer.columns.filter((_, k) => k !== i) } })}><Trash2 className="h-3 w-3" /> Hapus</button></div>
                  <Field label="Judul kolom"><input className={inputCls} value={col.title} onChange={(e) => { const v = [...data.footer.columns]; v[i] = { ...v[i], title: e.target.value }; setData({ ...data, footer: { ...data.footer, columns: v } }); }} /></Field>
                  <div className="mt-3"><Field label="Links" hint="satu per baris"><textarea className={areaCls} value={col.links.join("\n")} onChange={(e) => { const v = [...data.footer.columns]; v[i] = { ...v[i], links: e.target.value.split("\n").filter(Boolean) }; setData({ ...data, footer: { ...data.footer, columns: v } }); }} /></Field></div>
                </div>
              ))}
            </div>
          )}

          {tab === "json" && (
            <div>
              <p className="mb-3 text-xs text-slate-500 dark:text-muted">Edit raw JSON — Simpan akan validasi dulu.</p>
              <textarea className={areaCls + " min-h-[520px] font-mono text-xs"} value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
            </div>
          )}
          </div>
        </div>
      </div>
    </main>
  );
}
