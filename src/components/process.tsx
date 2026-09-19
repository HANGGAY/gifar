"use client";

import { Reveal } from "./ui/reveal";

const steps = [
  {
    title: "Discovery",
    items: ["Requirement Understand", "Market Space", "User Research", "Competitive Analysis"],
  },
  {
    title: "Define",
    items: ["User Persona", "Empathy Map", "Pain Point", "User Flow"],
  },
  {
    title: "Design",
    items: ["User Flow", "Sketsa", "Design Guide", "Wireframe"],
  },
  {
    title: "Prototype",
    items: ["Hi-Fi Prototype", "Design System", "Handoff"],
  },
  {
    title: "Test",
    items: ["Usability Testing", "Iterate", "Ship"],
  },
];

export function Process() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-16 text-center">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#fde65c]">
            Process
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A battle-tested design workflow
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            A structured, transparent process that de-risks design and keeps
            you in the loop at every stage.
          </p>
        </Reveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-[#fb4157]/40 via-white/[0.1] to-[#fde65c]/40 lg:block" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="h-full">
                <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#fb4157]/40 hover:bg-surface-2">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#fb4157]/30 bg-[#fb4157]/10 text-sm font-bold text-[#ff6c6b] transition-all duration-300 group-hover:bg-[#fb4157] group-hover:text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13px] text-muted"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#fb4157]/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}