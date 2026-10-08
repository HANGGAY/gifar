"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCms } from "./cms-provider";
import { cn } from "./ui/cn";
import { Reveal } from "./ui/reveal";
export function Faq() {
  const faqs = useCms().faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 bg-[#f8fafc] dark:bg-transparent">
      <div className="enterprise-grid opacity-20 dark:opacity-10" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 relative">
        <Reveal className="mb-14 text-center">
          <span className="enterprise-card inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-[#fde65c]">FAQ</span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Questions, answered</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 0.06}>
                <div className={cn("overflow-hidden rounded-2xl border enterprise-accent transition-colors", isOpen ? "border-indigo-300 bg-indigo-50/60 dark:border-[#fb4157]/30 dark:bg-[#fb4157]/[0.05]" : "enterprise-card hover:border-slate-300 dark:hover:border-white/[0.15]")}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="relative flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="text-[15px] font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors", isOpen ? "border-indigo-300 bg-indigo-600 text-white dark:border-[#fb4157]/50 dark:bg-[#fb4157]/15 dark:text-[#ff6c6b]" : "border-slate-200 text-slate-500 dark:border-white/[0.1] dark:text-white/60")}><Plus className="h-4 w-4" /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>{isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}><p className="px-6 pb-6 text-sm leading-relaxed text-slate-600 dark:text-muted">{faq.answer}</p></motion.div>)}</AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
