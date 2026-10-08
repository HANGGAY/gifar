"use client";
import { useCms } from "./cms-provider";
import { Marquee } from "./ui/marquee";
import { Reveal } from "./ui/reveal";
type Client = { name: string; logo?: string; isSimple?: boolean };
function ClientBadge({ c }: { c: Client }) {
  return (
    <div className="flex items-center gap-3 px-8">
      {c.logo ? (
        <span className={c.isSimple ? "flex h-6 w-6 shrink-0 items-center justify-center" : "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white p-1 border border-slate-200 dark:border-transparent dark:bg-white"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.logo} alt={c.name} className="h-full w-full object-contain" loading="lazy" onError={(e) => { const img = e.currentTarget; img.style.display = "none"; const fb = img.nextElementSibling as HTMLElement | null; if (fb) fb.style.display = "flex"; }} />
          <span style={{ display: "none" }} className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-[10px] font-bold text-white">{c.name.charAt(0)}</span>
        </span>
      ) : (
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 dark:bg-white/10 text-[10px] font-bold text-white">{c.name.charAt(0)}</span>
      )}
      <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/80 transition-colors">{c.name}</span>
    </div>
  );
}
export function Clients() {
  const cms = useCms().clients;
  const items = cms.items;
  const rowOne = items.slice(0, 6);
  const rowTwo = [...items.slice(6), ...items.slice(0, 4)];
  const logoItems = (list: Client[]) => list.map((c) => <ClientBadge key={c.name} c={c} />);
  return (
    <section className="relative py-16 bg-white dark:bg-transparent border-y border-slate-200 dark:border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-muted">{cms.eyebrow}</p>
          <p className="mt-2 text-xs text-slate-400 dark:text-white/30">{cms.note}</p>
        </Reveal>
        <div className="space-y-4">
          <Marquee items={logoItems(rowOne)} duration="32s" />
          <Marquee items={logoItems(rowTwo)} duration="38s" reverse />
        </div>
      </div>
    </section>
  );
}
