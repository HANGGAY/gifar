"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useCms } from "./cms-provider";
import { Reveal } from "./ui/reveal";
export function Testimonials() {
  const testimonials = useCms().testimonials;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => { setDirection(1); setIndex((i) => (i + 1) % testimonials.length); }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);
  const go = (dir: number) => { setDirection(dir); setIndex((i) => (i + dir + testimonials.length) % testimonials.length); };
  if (!testimonials.length) return null;
  const active = testimonials[index % testimonials.length] as unknown as { name: string; role: string; text: string; avatarColor: string; avatarImage?: string };
  return (
    <section className="relative py-24 bg-[#f8fafc] dark:bg-transparent overflow-hidden">
      <div className="enterprise-grid opacity-20 dark:opacity-10" />
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-cyan-500/[0.04] dark:bg-[#fde65c]/[0.05] blur-[120px]" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative">
        <Reveal className="mb-14 text-center">
          <span className="enterprise-card inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-[#fde65c]">Testimonials</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">What clients say about <span className="gradient-text">working with me</span></h2>
        </Reveal>
        <Reveal>
          <div className="enterprise-card enterprise-accent relative overflow-hidden rounded-3xl px-6 py-12 sm:px-14">
            <div className="enterprise-grid opacity-25" />
            <Quote className="absolute right-10 top-8 h-16 w-16 text-slate-900/[0.04] dark:text-white/[0.06]" />
            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={index} custom={direction} initial={{ opacity: 0, x: 40 * direction }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 * direction }} transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}>
                  <div className="mb-5 flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />))}</div>
                  <p className="mb-8 text-lg leading-relaxed text-slate-800 dark:text-white/85">&ldquo;{active.text}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    {active.avatarImage ? (
                      <img src={active.avatarImage} alt={active.name} className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-[#05060a] shadow-sm" />
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white dark:border-[#05060a] text-base font-bold text-white shadow-sm" style={{ background: active.avatarColor }}>{active.name.charAt(0)}</span>
                    )}
                    <div><p className="text-sm font-semibold text-slate-900 dark:text-white">{active.name}</p><p className="text-xs text-slate-500 dark:text-muted">{active.role}</p></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }} aria-label={`Go to testimonial ${i + 1}`} className="group py-2">
                    <span className={`block rounded-full transition-all duration-300 ${i === index ? "h-2 w-8 bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-[#fb4157] dark:to-[#ff6c6b]" : "h-2 w-2 bg-slate-300 dark:bg-white/20 group-hover:bg-slate-400"}`} />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-white dark:hover:border-[#fb4157]/50 dark:hover:bg-[#fb4157]/10 transition-colors" aria-label="Previous"><ChevronLeft className="h-4 w-4" /></button>
                <button onClick={() => go(1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-white dark:hover:border-[#fb4157]/50 dark:hover:bg-[#fb4157]/10 transition-colors" aria-label="Next"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
