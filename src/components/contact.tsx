"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Reveal } from "./ui/reveal";

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacts" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(135deg,#0b0d13_0%,#1a0d12_55%,#24100f_100%)] p-8 sm:p-14">
            {/* Decorations */}
            <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_70%_30%,black,transparent)]" />
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#fb4157]/25 blur-[100px]" />
            <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#fde65c]/10 blur-[110px]" />
            <div className="absolute right-8 top-8 hidden h-24 w-24 items-center justify-center rounded-2xl border border-white/10 lg:flex">
              <span className="animate-spin-slow text-center">
                <svg viewBox="0 0 100 100" className="h-20 w-20">
                  <defs>
                    <path
                      id="contactCircle"
                      d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text className="fill-white/60 text-[8px] tracking-[0.22em]">
                    <textPath href="#contactCircle">
                      LET&apos;S TALK • LET&apos;S TALK •
                    </textPath>
                  </text>
                </svg>
              </span>
            </div>

            <div className="relative grid gap-12 lg:grid-cols-2">
              {/* Left copy */}
              <div>
                <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6c6b]">
                  Contact
                </span>
                <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                  Have a project in mind? Let&apos;s{" "}
                  <span className="gradient-text">build it together</span>
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                  Tell me about your goals and timeline — I&apos;ll get back to
                  you within 24 hours with a plan and honest feedback.
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "gifaraulia@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+62 812 3456 7890" },
                    { icon: MapPin, label: "Based in", value: "Jakarta, Indonesia" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#ff6c6b]">
                        <row.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                          {row.label}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {row.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right form */}
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-xl sm:p-8"
              >
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                      Your email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/[0.1] bg-[#05060a]/60 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#fb4157]/60 focus:ring-2 focus:ring-[#fb4157]/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                      Category
                    </label>
                    <select className="w-full appearance-none rounded-xl border border-white/[0.1] bg-[#05060a]/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#fb4157]/60 focus:ring-2 focus:ring-[#fb4157]/20">
                      <option>UI/UX Design</option>
                      <option>Branding & Graphic</option>
                      <option>3D Design</option>
                      <option>Design Systems</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full resize-none rounded-xl border border-white/[0.1] bg-[#05060a]/60 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#fb4157]/60 focus:ring-2 focus:ring-[#fb4157]/20"
                    />
                  </div>
                  <Button variant="rainbow" size="lg" className="w-full">
                    {sent ? "Message sent!" : "Send Message"}
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}