"use client";
import { ArrowUpRight } from "lucide-react";
import { useCms } from "./cms-provider";
import { DribbbleIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "./ui/icons";
const socials = [{ icon: GitHubIcon, label: "GitHub" },{ icon: LinkedInIcon, label: "LinkedIn" },{ icon: InstagramIcon, label: "Instagram" },{ icon: DribbbleIcon, label: "Dribbble" }];
export function Footer() {
  const cms = useCms().footer;
  const columns = cms.columns;
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#05060a]">
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-100">
        <div className="enterprise-grid opacity-20 dark:opacity-10" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/5 dark:bg-blue-600/5 blur-2xl" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#4f46e5,transparent)] dark:bg-[linear-gradient(90deg,transparent,#fb4157,transparent)]" />
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6366f1,#4f46e5)] dark:bg-[linear-gradient(135deg,#ff6c6b,#fb4157)] font-bold text-white">{cms.name.charAt(0)}</span>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{cms.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-muted">{cms.desc}</p>
            <a href={`mailto:${cms.email}`} className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-[#ff6c6b]">{cms.email}<ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></a>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a key={social.label} href="#" aria-label={social.label} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/60 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:border-[#fb4157]/50 dark:hover:bg-[#fb4157]/10 dark:hover:text-white transition-all"><social.icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/70">{col.title}</h4>
              <ul className="space-y-3">{col.links.map((link) => (<li key={link}><a href="#" className="footer-link inline-block text-sm text-slate-600 dark:text-muted hover:text-slate-900 dark:hover:text-white">{link}</a></li>))}</ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 dark:border-white/[0.07] pt-7 sm:flex-row">
          <p className="text-xs text-slate-500 dark:text-muted">{cms.copyright}</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-muted dark:hover:text-white transition-colors">Back to top<span className="flex h-6 w-6 items-center justify-center rounded-md border border-slate-300 dark:border-white/10 text-slate-500 dark:text-white/70">↑</span></button>
        </div>
      </div>
    </footer>
  );
}
