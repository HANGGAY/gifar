"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "./ui/cn";
import { Reveal } from "./ui/reveal";

type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  color: string;
  initial: string;
  href: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Redesign BCA Mobile",
    category: "UI/UX",
    year: "2025",
    description: "Mobile banking redesign concept",
    color: "#1a1a2e",
    initial: "B",
    href: "/work/bca-mobile",
    image: "/project/BCA%20UI/Group%20393%201%201-min.png",
  },
  {
    title: "Water Dispa Coffee",
    category: "Branding",
    year: "2025",
    description: "Coffee shop branding & app",
    color: "#2d1b0e",
    initial: "W",
    href: "#work",
  },
  {
    title: "Website Space",
    category: "Web",
    year: "2024",
    description: "Space technology website",
    color: "#0a192f",
    initial: "S",
    href: "#work",
  },
  {
    title: "Modena Illustration",
    category: "Branding",
    year: "2024",
    description: "Kitchen appliance illustration",
    color: "#1b2838",
    initial: "M",
    href: "#work",
  },
  {
    title: "Travel App Concept",
    category: "UI/UX",
    year: "2024",
    description: "Travel booking app redesign",
    color: "#16213e",
    initial: "T",
    href: "#work",
  },
  {
    title: "E-Commerce Dashboard",
    category: "UI/UX",
    year: "2023",
    description: "Admin dashboard for e-commerce",
    color: "#10151f",
    initial: "E",
    href: "#work",
  },
  {
    title: "Furniture 3D Series",
    category: "3D",
    year: "2023",
    description: "Photoreal product rendering",
    color: "#1a2634",
    initial: "F",
    href: "#work",
  },
  {
    title: "Neo Design System",
    category: "Web",
    year: "2025",
    description: "Scalable component library",
    color: "#2a0f1c",
    initial: "N",
    href: "#work",
  },
];

const filters = ["All", "UI/UX", "Branding", "Web", "3D"];

export function Portfolio() {
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active]
  );

  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6c6b]">
              Portfolio
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Selected work that 
              <span className="gradient-text"> delivers</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300",
                  active === filter
                    ? "text-white"
                    : "text-muted hover:text-white"
                )}
              >
                {active === filter && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-lg bg-[#fb4157]/90 shadow-[0_8px_24px_-8px_rgba(251,65,87,0.6)]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.a
                key={project.title}
                layout
                href={project.href}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative h-[300px] cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08]"
                style={{ backgroundColor: project.color }}
              >
                {/* Artwork */}
                <div className="absolute inset-0">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[88px] font-bold tracking-tighter text-white/[0.07] transition-transform duration-500 group-hover:scale-125">
                        {project.initial}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,65,87,0.28),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Top meta */}
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="glass rounded-md px-2.5 py-1 text-[11px] font-semibold text-white/80">
                    {project.category}
                  </span>
                  <span className="glass rounded-md px-2.5 py-1 text-[11px] font-medium text-white/60">
                    {project.year}
                  </span>
                </div>

                {/* Bottom meta */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-[#fb4157] group-hover:bg-[#fb4157] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
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