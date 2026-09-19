"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1] as const,
      onUpdate: (v) => setDisplay(`${Math.round(v)}`),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 6, suffix: "+", label: "Years of Experience" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 60, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "+", label: "Design Awards" },
];

export function Stats() {
  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass relative overflow-hidden rounded-3xl">
          <div className="absolute -top-24 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-[#fb4157]/10 blur-[80px]" />
          <div className="relative grid grid-cols-2 gap-px lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center gap-1 px-6 py-10 text-center"
              >
                {i !== 0 && (
                  <span className="absolute left-0 top-8 hidden h-[calc(100%-4rem)] w-px bg-white/[0.07] lg:block" />
                )}
                <p className="text-4xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#ff6c6b]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}