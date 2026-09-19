"use client";

import {
  Layers,
  Palette,
  Box,
  PanelsTopLeft,
  ArrowUpRight,
} from "lucide-react";
import { SpotlightCard } from "./ui/spotlight-card";
import { Reveal } from "./ui/reveal";

const services = [
  {
    icon: PanelsTopLeft,
    title: "UI/UX Design",
    description:
      "End-to-end product design from research to hi-fi prototypes — interfaces that are intuitive, accessible, and conversion-focused.",
    span: "lg:col-span-2",
    tall: true,
    tags: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
  },
  {
    icon: Palette,
    title: "Branding & Graphic",
    description:
      "Cohesive visual identities, art direction, and marketing assets that make brands unmistakable.",
    span: "",
  },
  {
    icon: Box,
    title: "3D Design & Rendering",
    description:
      "Product visualization and architectural renders with cinematic lighting and realistic materials.",
    span: "",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description:
      "Scalable component libraries and documentation that keep engineering and design in lockstep.",
    span: "lg:col-span-2",
    tags: ["Tokens", "Components", "Docs", "Governance"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6c6b]">
            Services
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to design & build products that{" "}
            <span className="gradient-text">convert</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Full-stack design capabilities under one roof — from strategic
            discovery to pixel-perfect handoff and beyond.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.08}
              className={service.span}
            >
              <SpotlightCard
                className="card-hover group h-full"
                spotlightColor="rgba(251,65,87,0.14)"
              >
                <div className="flex h-full flex-col p-7">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-[#ff6c6b] transition-colors duration-300 group-hover:border-[#fb4157]/40 group-hover:bg-[#fb4157]/10">
                      <service.icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold text-white/20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  {service.tags && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto flex items-center gap-1 pt-6 text-sm font-semibold text-[#ff6c6b] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}