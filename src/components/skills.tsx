"use client";
import { motion } from "framer-motion";
import { useCms } from "./cms-provider";
import { Reveal } from "./ui/reveal";
import { Marquee } from "./ui/marquee";
type SkillBarProps = { name: string; level: number };
function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800 dark:text-white/85">{name}</span>
        <span className="text-sm font-semibold text-indigo-600 dark:text-[#ff6c6b]">{level}%</span>
      </div>
      <div className="skill-bar"><motion.div className="skill-bar-fill" initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} /></div>
    </div>
  );
}
export function Skills() {
  const cms = useCms().skills;
  const tools = cms.tools;
  const checklist = cms.checklist;
  const marqueeItems = tools.map((t) => (
    <div key={t.name} className="enterprise-card flex items-center gap-3 rounded-2xl px-6 py-4 hover:border-indigo-300 dark:hover:border-[#fb4157]/40 transition-colors">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#6366f1,#4f46e5)] dark:bg-[linear-gradient(135deg,#ff6c6b,#fb4157)] text-xs font-bold text-white">{t.name.charAt(0)}</span>
      <span className="whitespace-nowrap text-sm font-semibold text-slate-800 dark:text-white/85">{t.name}</span>
      <span className="text-xs font-medium text-slate-500 dark:text-muted">{t.level}%</span>
    </div>
  ));
  return (
    <section id="skills" className="relative py-24 bg-white dark:bg-transparent overflow-hidden">
      <div className="enterprise-grid opacity-20 dark:opacity-10" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-600/5 dark:bg-blue-600/5 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="enterprise-card inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-[#ff6c6b]">{cms.eyebrow}</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{cms.titleA} <span className="gradient-text">{cms.titleAccent}</span></h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-muted">{cms.desc}</p>
        </Reveal>
        <div className="mb-16"><Marquee items={marqueeItems} duration="45s" /></div>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl enterprise-card enterprise-accent p-8">
              <div className="enterprise-grid opacity-30" />
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-600/5 dark:bg-[#fb4157]/10 blur-[70px]" />
              <div className="relative mb-8">
                <p className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">{cms.years.split("+")[0]}<span className="gradient-text">+</span></p>
                <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-slate-600 dark:text-muted">{cms.yearsDesc}</p>
              </div>
              <div className="relative space-y-3">
                {checklist.map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 dark:bg-[#fb4157]/15 text-[11px] text-indigo-600 dark:text-[#ff6c6b]"><svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none"><path d="M2.5 6.5L5 9l4.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    <span className="text-sm text-slate-700 dark:text-white/80">{String(label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="space-y-6">
            {tools.slice(0, 6).map((tool, i) => (
              <Reveal key={tool.name} delay={i * 0.06}><SkillBar name={tool.name} level={tool.level} /></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
