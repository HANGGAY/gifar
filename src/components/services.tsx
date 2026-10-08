"use client";
import { ArrowUpRight, Boxes, ClipboardCheck, Handshake, Layers, PencilRuler, Search, Users } from "lucide-react";
import { useCms } from "./cms-provider";
import { SpotlightCard } from "./ui/spotlight-card";
import { Reveal } from "./ui/reveal";
const icons = [Boxes, Layers, ClipboardCheck, Search, PencilRuler, Users, Handshake];
export function Services() {
  const cms = useCms().competencies;
  return (
    <section id="services" className="relative py-24 bg-white dark:bg-transparent">
      <div className="enterprise-grid opacity-20 dark:opacity-10" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-600/5 dark:bg-blue-600/5 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="enterprise-card inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-[#ff6c6b]">{cms.eyebrow}</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{cms.titleA} <span className="gradient-text">{cms.titleAccent}</span></h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-muted">{cms.desc}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cms.items.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={c.title + i} delay={i * 0.06} className="h-full">
                <SpotlightCard className="card-hover group h-full" spotlightColor="rgba(99,102,241,0.08)">
                  <div className="flex h-full flex-col p-6">
                    <div className="mb-5 flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-white/[0.08] dark:bg-white/[0.04] group-hover:border-indigo-300 dark:group-hover:border-[#fb4157]/40 transition-colors">
                        {c.icon ? <img src={c.icon} alt="" className="h-6 w-6 object-contain" /> : <Icon className="h-5 w-5 text-indigo-600 dark:text-[#ff6c6b]" />}
                      </span>
                      <span className="text-xs font-semibold text-slate-300 dark:text-white/20">0{i + 1}</span>
                    </div>
                    <h3 className="mb-2 text-[15px] font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">{c.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-muted">{c.desc}</p>
                    <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-indigo-600 dark:text-[#ff6c6b] opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all">Learn more <ArrowUpRight className="h-4 w-4" /></div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
