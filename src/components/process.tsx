"use client";
import { useCms } from "./cms-provider";
import { Reveal } from "./ui/reveal";
export function Process() {
  const cms = useCms().process;
  const steps = cms.steps;
  return (
    <section className="relative py-24 bg-[#f8fafc] dark:bg-transparent">
      <div className="enterprise-grid opacity-20 dark:opacity-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <Reveal className="mb-16 text-center">
          <span className="enterprise-card inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-[#fde65c]">{cms.eyebrow}</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{cms.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 dark:text-muted">{cms.desc}</p>
        </Reveal>
        <div className="relative">
          <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-indigo-400/40 via-slate-300/60 to-cyan-400/40 dark:from-[#fb4157]/40 dark:via-white/[0.1] dark:to-[#fde65c]/40 lg:block" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="h-full">
                <div className="group relative h-full rounded-2xl enterprise-card enterprise-accent p-6 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.12)] dark:hover:border-[#fb4157]/40 transition-all">
                  <div className="enterprise-grid opacity-20" />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-sm font-bold text-indigo-600 dark:border-[#fb4157]/30 dark:bg-[#fb4157]/10 dark:text-[#ff6c6b] group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-[#fb4157] dark:group-hover:text-white transition-colors">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{step.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13px] text-slate-600 dark:text-muted"><span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-indigo-400 dark:bg-[#fb4157]/60" />{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
