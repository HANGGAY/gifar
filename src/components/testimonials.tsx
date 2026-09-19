"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "./ui/reveal";

const testimonials = [
  {
    name: "Jane Cooper",
    role: "CEO, TechCorp",
    text: "Gifar delivered a design that exceeded our expectations. Communication was seamless and the results spoke for themselves — our activation rate jumped 34% after the redesign.",
    avatarColor: "#fb4157",
  },
  {
    name: "Rizky Pratama",
    role: "Product Lead, FinTech Startup",
    text: "Rare combination of strategic thinking and pixel-level execution. He built a design system that our whole team now ships with daily.",
    avatarColor: "#fde65c",
  },
  {
    name: "Sara Wijaya",
    role: "Founder, Coffee Brand",
    text: "From branding to the app experience, everything was cohesive and on-brand. Clients constantly compliment our new look.",
    avatarColor: "#50e3c2",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <section className="relative py-24">
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#fde65c]/[0.05] blur-[120px]" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal className="mb-14 text-center">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#fde65c]">
            Testimonials
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What clients say about <span className="gradient-text">working with me</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-12 sm:px-14">
            <Quote className="absolute right-10 top-8 h-16 w-16 text-white/[0.06]" />

            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: 40 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 * direction }}
                  transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#fde65c] text-[#fde65c]"
                      />
                    ))}
                  </div>
                  <p className="mb-8 text-lg leading-relaxed text-white/85">
                    &ldquo;{active.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#05060a] text-base font-bold text-white"
                      style={{ background: active.avatarColor }}
                    >
                      {active.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {active.name}
                      </p>
                      <p className="text-xs text-muted">{active.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="group py-2"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        i === index
                          ? "h-2 w-8 bg-gradient-to-r from-[#fb4157] to-[#ff6c6b]"
                          : "h-2 w-2 bg-white/20 group-hover:bg-white/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-white transition-colors hover:border-[#fb4157]/50 hover:bg-[#fb4157]/10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-white transition-colors hover:border-[#fb4157]/50 hover:bg-[#fb4157]/10"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}