"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "./ui/cn";
import { Reveal } from "./ui/reveal";

const faqs = [
  {
    question: "Berapa lama proses desain yang dibutuhkan?",
    answer:
      "Tergantung pada kompleksitas proyek, biasanya proses desain UI/UX memakan waktu 2-6 minggu. Untuk proyek yang lebih besar, estimasi waktu akan disesuaikan setelah tahap discovery.",
  },
  {
    question: "Apakah saya bisa minta revisi?",
    answer:
      "Tentu! Setiap paket desain sudah termasuk revisi. Jumlah revisi tergantung pada paket yang dipilih, mulai dari 2-5 kali revisi dengan iterasi berbasis feedback yang terstruktur.",
  },
  {
    question: "Bagaimana saya bisa memesan jasa desain?",
    answer:
      "Anda bisa menghubungi saya melalui form kontak di halaman ini, email, atau media sosial. Saya akan merespon dalam 24 jam untuk diskusi awal.",
  },
  {
    question: "Apa saja yang saya dapatkan dari hasil desain?",
    answer:
      "Anda akan mendapatkan file desain dalam format Figma, prototipe interaktif, design system, dan dokumentasi lengkap yang siap diimplementasikan oleh tim engineering.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="mb-14 text-center">
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#fde65c]">
            FAQ
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Questions, answered
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 0.06}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen
                      ? "border-[#fb4157]/30 bg-[#fb4157]/[0.05]"
                      : "border-white/[0.07] bg-surface hover:border-white/[0.15]"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold text-white">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                        isOpen
                          ? "border-[#fb4157]/50 bg-[#fb4157]/15 text-[#ff6c6b]"
                          : "border-white/[0.1] text-white/60"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}