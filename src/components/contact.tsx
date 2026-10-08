"use client";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useCms } from "./cms-provider";
import { Button } from "./ui/button";
import { Reveal } from "./ui/reveal";
export function Contact() {
  const cms = useCms().contact;
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); };
  return (
    <section id="contacts" className="relative py-24 bg-white dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] enterprise-card enterprise-accent p-8 sm:p-14 !bg-white dark:!bg-[linear-gradient(135deg,#0b0d13_0%,#1a0d12_55%,#24100f_100%)] border-slate-200 dark:border-white/[0.08]">
            <div className="enterprise-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_70%_30%,black,transparent)]" />
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-600/10 dark:bg-[#fb4157]/25 blur-[100px]" />
            <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 dark:bg-[#fde65c]/10 blur-[110px]" />
            <div className="absolute -right-12 top-16 h-40 w-40 rounded-full bg-blue-600/5 dark:bg-indigo-600/5 pointer-events-none" />
            <div className="absolute right-8 top-8 hidden h-24 w-24 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent lg:flex">
              <span className="animate-spin-slow text-center">
                <svg viewBox="0 0 100 100" className="h-20 w-20">
                  <defs><path id="contactCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
                  <text className="fill-slate-400 dark:fill-white/60 text-[8px] tracking-[0.22em]"><textPath href="#contactCircle">LET&apos;S TALK • LET&apos;S TALK •</textPath></text>
                </svg>
              </span>
            </div>
            <div className="relative grid gap-12 lg:grid-cols-2">
              <div>
                <span className="enterprise-card inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-[#ff6c6b]"> {cms.eyebrow} </span>
                <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">{cms.titleA} <span className="gradient-text">{cms.titleAccent}</span></h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600 dark:text-muted">{cms.desc}</p>
                <div className="mt-10 space-y-4">
                  {[{ icon: Mail, label: "Email", value: cms.email },{ icon: Phone, label: "Phone", value: cms.phone },{ icon: MapPin, label: "Based in", value: cms.location }].map((row) => (
                    <div key={row.label} className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-white/[0.08] dark:bg-white/[0.04] text-indigo-600 dark:text-[#ff6c6b]"><row.icon className="h-4 w-4" /></span>
                      <div><p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-muted">{row.label}</p><p className="text-sm font-semibold text-slate-900 dark:text-white">{row.value}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-white/[0.03] p-7 backdrop-blur-xl sm:p-8">
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Your email</label>
                    <input type="email" required placeholder="you@company.com" className="w-full rounded-xl border border-slate-300 dark:border-white/[0.1] bg-white dark:bg-[#05060a]/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none focus:border-indigo-500 dark:focus:border-[#fb4157]/60 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-[#fb4157]/20 transition-colors" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Category</label>
                    <select className="w-full appearance-none rounded-xl border border-slate-300 dark:border-white/[0.1] bg-white dark:bg-[#05060a]/60 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-[#fb4157]/60 focus:ring-2 focus:ring-indigo-500/20">
                      {cms.categories.map((cat) => (<option key={cat}>{cat}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-muted">Message</label>
                    <textarea rows={4} placeholder="Tell me about your project..." className="w-full resize-none rounded-xl border border-slate-300 dark:border-white/[0.1] bg-white dark:bg-[#05060a]/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none focus:border-indigo-500 dark:focus:border-[#fb4157]/60 focus:ring-2 focus:ring-indigo-500/20 transition-colors" />
                  </div>
                  <Button variant="rainbow" size="lg" className="w-full">{sent ? "Message sent!" : "Send Message"}<ArrowUpRight className="h-4 w-4" /></Button>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
