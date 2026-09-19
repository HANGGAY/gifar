"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/reveal";
import { Marquee } from "./ui/marquee";

const tools = [
  { name: "Figma", level: 95 },
  { name: "Adobe Illustrator", level: 90 },
  { name: "SketchUp", level: 85 },
  { name: "Solidworks", level: 80 },
  { name: "Keyshot", level: 85 },
  { name: "Miro", level: 90 },
  { name: "Photoshop", level: 88 },
  { name: "Blender", level: 78 },
];

const marqueeItems = tools.map((t) => (
  <div
    key={t.name}
    className="glass flex items-center gap-3 rounded-2xl px-6 py-4 transition-colors duration-300 hover:border-[#fb4157]/40"
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#ff6c6b,#fb4157)] text-xs font-bold text-white">
      {t.name.charAt(0)}
    </span>
    <span className="whitespace-nowrap text-sm font-semibold text-white/85">
      {t.name}
    </span>
    <span className="text-xs font-medium text-muted">{t.level}%</span>
  </div>
));

type SkillBarProps = {
  name: string;
  level: number;
};

function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-white/85">{name}</span>
        <span className="text-sm font-semibold text-[#ff6c6b]">
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6c6b]">
            Skills
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tools I&apos;ve mastered to ship <span className="gradient-text">great work</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            A refined toolkit spanning design, 3D, and collaboration.
          </p>
        </Reveal>

        {/* Tool marquee */}
        <div className="mb-16">
          <Marquee items={marqueeItems} duration="45s" />
        </div>

        {/* Skill bars + stat panel */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#fb4157]/10 blur-[70px]" />
              <div className="relative mb-8">
                <p className="text-5xl font-bold tracking-tight text-white">
                  6<span className="gradient-text">+</span>
                </p>
                <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-muted">
                  Years of hands-on design experience across startups and
                  enterprise teams.
                </p>
              </div>
              <div className="relative space-y-3">
                {[
                  ["End-to-end product design", true],
                  ["Design systems at scale", true],
                  ["3D visualization", true],
                  ["Client & stakeholder communication", true],
                ].map(([label], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fb4157]/15 text-[11px] text-[#ff6c6b]">
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                        <path d="M2.5 6.5L5 9l4.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/80">{String(label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-6">
            {tools.slice(0, 6).map((tool, i) => (
              <Reveal key={tool.name} delay={i * 0.06}>
                <SkillBar name={tool.name} level={tool.level} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}