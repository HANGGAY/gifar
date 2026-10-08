"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useCms } from "./cms-provider";
import { cn } from "./ui/cn";
import { Reveal } from "./ui/reveal";
type Project = { title: string; category: string; year: string; description: string; color: string; initial: string; href: string; image?: string };
export function Portfolio() {
  const cms = useCms().portfolio;
  const projects = cms.projects as Project[];
  const filters = cms.filters;
  const [active, setActive] = useState("All");
  const visible = useMemo(() => (active === "All" ? projects : projects.filter((p) => p.category === active)), [active, projects]);
  return (
    <section id="work" className="relative py-24 bg-white dark:bg-transparent">
      <div className="enterprise-grid opacity-20 dark:opacity-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="enterprise-card inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-[#ff6c6b]">{cms.eyebrow}</span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{cms.titleA} <span className="gradient-text">{cms.titleAccent}</span></h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button key={filter} onClick={() => setActive(filter)} className={cn("relative rounded-lg px-4 py-2 text-sm font-medium transition-colors", active === filter ? "text-white" : "text-slate-500 hover:text-slate-900 dark:text-muted dark:hover:text-white")}>
                {active === filter && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-lg bg-indigo-600 dark:bg-[#fb4157]/90 shadow-[0_8px_24px_-8px_rgba(79,70,229,0.4)] dark:shadow-[0_8px_24px_-8px_rgba(251,65,87,0.6)]" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.a key={project.title} layout href={project.href} initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 10 }} transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }} className="group relative h-[300px] cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-none" style={{ backgroundColor: project.color }}>
                <div className="absolute inset-0">
                  {project.image ? <Image src={project.image} alt={project.title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" /> : <div className="absolute inset-0 flex items-center justify-center"><span className="text-[88px] font-bold tracking-tighter text-white/[0.07] group-hover:scale-125 transition-transform duration-500">{project.initial}</span></div>}
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_70%_20%,rgba(251,65,87,0.28),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="rounded-md bg-white/90 dark:bg-white/10 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-white/80 border border-slate-200 dark:border-transparent">{project.category}</span>
                  <span className="rounded-md bg-white/90 dark:bg-white/10 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-white/60 border border-slate-200 dark:border-transparent">{project.year}</span>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-white/50">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold tracking-tight text-white">{project.title}</h3>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white group-hover:border-indigo-600 group-hover:bg-indigo-600 dark:group-hover:border-[#fb4157] dark:group-hover:bg-[#fb4157] transition-all"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
