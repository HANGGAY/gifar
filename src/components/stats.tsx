"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCms } from "./cms-provider";
function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const, onUpdate: (v) => setDisplay(`${Math.round(v)}`) });
    return () => controls.stop();
  }, [inView, value]);
  return (<span ref={ref}>{prefix}{display}{suffix}</span>);
}
export function Stats() {
  const cmsStats = useCms().stats;
  return (
    <section className="relative py-14 bg-[#f8fafc] dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="enterprise-card enterprise-accent relative overflow-hidden rounded-3xl">
          <div className="enterprise-grid opacity-30" />
          <div className="absolute -top-24 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/[0.06] dark:bg-[#fb4157]/10 blur-[80px]" />
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-600/5 dark:bg-indigo-600/5" />
          <div className="relative grid grid-cols-2 gap-px lg:grid-cols-4">
            {cmsStats.map((stat, i) => (
              <div key={stat.label} className="group relative flex flex-col items-center gap-1 px-6 py-10 text-center">
                {i !== 0 && <span className="absolute left-0 top-8 hidden h-[calc(100%-4rem)] w-px bg-slate-200 dark:bg-white/[0.07] lg:block" />}
                <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-[#ff6c6b] transition-colors"><Counter value={stat.value} suffix={stat.suffix} /></p>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
