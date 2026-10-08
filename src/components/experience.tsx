'use client';
import { useState } from 'react';
import {
  Building2,
  Calendar,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useCms } from './cms-provider';
import { Reveal } from './ui/reveal';
function Logo({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 dark:border-white/[0.08] dark:bg-white">
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        className="h-full w-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          const f = (e.target as HTMLImageElement)
            .nextElementSibling as HTMLElement | null;
          if (f) f.style.display = 'flex';
        }}
      />
      <span
        style={{ display: 'none' }}
        className="h-full w-full items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white"
      >
        {' '}
        {name.charAt(0)}{' '}
      </span>
    </div>
  );
}
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt=""
        className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      {images.length > 1 && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-xs text-white">
          {index + 1} / {images.length}
        </span>
      )}
    </div>
  );
}

export function Experience() {
  const cms = useCms().experience;
  const jobs = cms.jobs;
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);
  return (
    <section
      id="experience"
      className="relative py-24 bg-[#f8fafc] dark:bg-transparent"
    >
      <div className="enterprise-grid opacity-25 dark:opacity-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="enterprise-card inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-[#ff6c6b]">
            {cms.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {cms.titleA}{' '}
            <span className="gradient-text">{cms.titleAccent}</span>
          </h2>
        </Reveal>
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <Reveal key={job.company} delay={idx * 0.08}>
              <div className="group relative overflow-hidden rounded-3xl enterprise-card enterprise-accent p-6 sm:p-8 hover:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.12)] transition-all">
                <div className="enterprise-grid opacity-20" />
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-600/[0.05] dark:bg-[#fb4157]/[0.06] blur-[70px]" />
                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
                  <Logo src={job.logo} name={job.company} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                          {job.role}
                        </h3>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-white/70">
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-900 dark:text-white">
                            <Building2 className="h-3.5 w-3.5 text-indigo-600 dark:text-[#ff6c6b]" />{' '}
                            {job.company}
                          </span>
                          <span className="hidden h-1 w-1 rounded-full bg-slate-300 dark:bg-white/20 sm:inline-block" />
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-white/40" />{' '}
                            {job.location}
                          </span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 dark:border-white/[0.08] dark:bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-muted">
                        <Calendar className="h-3.5 w-3.5" /> {job.period}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-muted">
                      {job.summary}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {job.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-white/75"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60 dark:bg-[#fb4157]/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    {job.highlight && (
                      <div className="mt-6 grid gap-2 sm:grid-cols-2">
                        {job.highlight.map((h) => (
                          <div
                            key={h}
                            className="rounded-xl border border-indigo-200 bg-indigo-50 dark:border-[#fb4157]/20 dark:bg-[#fb4157]/[0.06] px-3.5 py-2.5 text-xs font-medium leading-relaxed text-slate-800 dark:text-white"
                          >
                            {h}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-slate-200 bg-slate-50 dark:border-white/[0.07] dark:bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {job.clientsLine &&
                      (() => {
                        const raw = job.clientsLine;
                        const parts = raw.split('·').map((s) => s.trim());
                        const parse = (s: string) => {
                          const i = s.indexOf(':');
                          const list = i >= 0 ? s.slice(i + 1) : s;
                          return list
                            .split(',')
                            .map((x) => x.trim())
                            .filter(Boolean);
                        };
                        const industrial = parse(parts[0] ?? raw);
                        const fnb = parts[1] ? parse(parts[1]) : [];
                        const pill =
                          'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none';
                        return (
                          <div className="mt-5 rounded-2xl border border-indigo-200/60 dark:border-[#fb4157]/20 bg-gradient-to-br from-indigo-50 to-white dark:from-[#fb4157]/[0.08] dark:to-white/[0.03] p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-[#ff6c6b]">
                              Clients & Partners
                            </p>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {industrial.map((c) => (
                                <span
                                  key={c}
                                  className={`${pill} border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/80`}
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                            {!!fnb.length && (
                              <>
                                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-[#fde65c]">
                                  F&B
                                </p>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {fnb.map((c) => (
                                    <span
                                      key={c}
                                      className={`${pill} border-amber-200 bg-amber-50 text-amber-800 dark:border-[#fde65c]/20 dark:bg-[#fde65c]/10 dark:text-[#fde65c]`}
                                    >
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })()}
                    {!!job.images?.length && (
                      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {job.images.map((src, k) => (
                          <button
                            key={src + k}
                            onClick={() =>
                              setLightbox({ images: job.images!, index: k })
                            }
                            className="group/img relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`${job.company} ${k + 1}`}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform group-hover/img:scale-105"
                              onError={(e) => {
                                (
                                  e.currentTarget.closest(
                                    'button',
                                  ) as HTMLElement | null
                                )?.remove();
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
            onPrev={() =>
              setLightbox((s) =>
                s
                  ? {
                      images: s.images,
                      index: (s.index - 1 + s.images.length) % s.images.length,
                    }
                  : s,
              )
            }
            onNext={() =>
              setLightbox((s) =>
                s
                  ? { images: s.images, index: (s.index + 1) % s.images.length }
                  : s,
              )
            }
          />
        )}
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-muted">
          Taruh file logo di{' '}
          {
            jobs
              .map((j) => (
                <code
                  key={j.logo}
                  className="text-slate-600 dark:text-white/60"
                >
                  {j.logo.replace(/^\//, '')}
                </code>
              ))
              .reduce(
                (acc: React.ReactNode[], el, i) =>
                  i === 0 ? [el] : [...acc, ' dan ', el],
                [],
              ) as React.ReactNode[]
          }{' '}
          — otomatis kepakai.
        </p>
      </div>
    </section>
  );
}
