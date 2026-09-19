"use client";

import { ArrowUpRight } from "lucide-react";
import { DribbbleIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "./ui/icons";

const columns = [
  {
    title: "Services",
    links: ["UI/UX Design", "Graphic Design", "3D Design", "Design Systems", "Branding"],
  },
  {
    title: "Company",
    links: ["Portfolio", "Clients", "FAQ", "About"],
  },
  {
    title: "Resources",
    links: ["Design Articles", "Case Studies", "Press & Media", "Privacy Policy"],
  },
];

const socials = [
  { icon: GitHubIcon, label: "GitHub" },
  { icon: LinkedInIcon, label: "LinkedIn" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: DribbbleIcon, label: "Dribbble" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#fb4157,transparent)]" />
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff6c6b,#fb4157)] font-bold text-white">
                G
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Gifar Aulia
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              UI/UX Designer & Design Engineer crafting digital experiences
              that are beautiful, functional, and built to perform.
            </p>
            <a
              href="mailto:gifaraulia@gmail.com"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#ff6c6b]"
            >
              gifaraulia@gmail.com
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60 transition-all duration-300 hover:border-[#fb4157]/50 hover:bg-[#fb4157]/10 hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="footer-link inline-block text-sm text-muted"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="text-xs text-muted">
            © 2026 Gifar Aulia. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 text-white/70">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}