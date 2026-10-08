'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  ClipboardCheck,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { useRef } from 'react';
import { Button } from './ui/button';
import { useCms } from './cms-provider';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const floatingCards = [
  {
    icon: Boxes,
    title: 'NPD & Packaging',
    sub: 'Concept → Mass Production',
    className: 'left-0 bottom-40 lg:-left-6',
    delay: 1.1,
  },
  {
    icon: Wrench,
    title: 'CAD 2D/3D',
    sub: 'SolidWorks • ZW3D • AutoCAD',
    className: 'right-0 bottom-28 lg:-right-6',
    delay: 1.25,
  },
  {
    icon: ClipboardCheck,
    title: 'APQP • PPAP • FMEA',
    sub: 'Process validation',
    className: 'bottom-36 left-0 lg:-left-10',
    delay: 1.4,
  },
];

export function Hero() {
  const cms = useCms().hero;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useTransform(mx, [-0.5, 0.5], [-14, 14]);
  const parallaxY = useTransform(my, [-0.5, 0.5], [-10, 10]);
  const photoTilt = useMotionTemplate`perspective(1200px) rotateY(${parallaxX}deg) rotateX(${parallaxY}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden pt-32 pb-20 lg:pt-36 bg-[#f8fafc] dark:bg-ink"
    >
      <div className="enterprise-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div className="absolute -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/[0.07] blur-[140px] dark:bg-[#fb4157]/[0.14]" />
      <div className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-blue-600/[0.06] blur-[120px] dark:bg-[#ff6c6b]/[0.1]" />
      <div className="absolute top-1/3 -right-40 h-[460px] w-[460px] rounded-full bg-cyan-500/[0.05] blur-[130px] dark:bg-[#fde65c]/[0.06]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-600/5 dark:bg-blue-600/5" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-slate-900/5 dark:bg-slate-900/5" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-slate-700 dark:text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {cms.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-bold leading-[1.04] tracking-tight text-slate-900 dark:text-white"
          >
            <span className="block text-[clamp(1.15rem,2.8vw,1.7rem)] font-semibold tracking-normal text-slate-500 dark:text-white/70">
              {cms.greeting ?? "Hi, I'm"}
            </span>
            <span className="gradient-text block text-[clamp(2.4rem,6vw,4.2rem)]">
              {cms.name}
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-3 flex items-center gap-3">
            <span className="h-px w-10 bg-[linear-gradient(90deg,transparent,#fb4157,#ff6c6b,#fde65c)]" />
            <p className="text-[clamp(1rem,2.2vw,1.25rem)] font-semibold tracking-tight text-slate-800 dark:text-white/90">
              {cms.role}
            </p>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-slate-600 dark:text-muted"
          >
            {cms.about}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button
              variant="rainbow"
              size="lg"
              onClick={() =>
                document
                  .getElementById('experience')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              View My Work
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => {
                const el = document.getElementById('contacts');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Download CV
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#4f46e5', '#6366f1', '#06b6d4', '#8b5cf6'].map((c, i) => (
                  <span
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-white dark:border-[#05060a]"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-muted">
                {cms.shippedLabel}
                <br />
                <span className="font-semibold text-slate-900 dark:text-white">
                  {cms.shippedValue}
                </span>
              </span>
            </div>
            <div className="hidden h-8 w-px bg-slate-200 dark:bg-white/10 sm:block" />
            <a
              href={
                (cms as { linkedin?: string }).linkedin ??
                'https://www.linkedin.com/in/gifarauliarahman/'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-500 hover:text-[#0A66C2] dark:text-white/60 dark:hover:text-white transition-colors"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0A66C2] text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.97 0-1.75-.79-1.75-1.764s.78-1.764 1.75-1.764 1.75.79 1.75 1.764-.78 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.562 2.84-1.562 3.04 0 3.595 2 3.595 4.594v6.468z" />
                </svg>
              </span>
              linkedin.com/in/gifarauliarahman
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: photoY }}
          className="relative mx-auto w-full max-w-[380px] lg:max-w-[420px]"
        >
          <div className="absolute inset-8 rounded-[48px] bg-indigo-600/10 blur-[60px] dark:bg-[#fb4157]/20" />

          <motion.div style={{ transform: photoTilt }} className="relative">
            <div className="animate-float-slow">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-transparent dark:shadow-none enterprise-accent">
                  <div className="enterprise-grid opacity-40" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cms.photo}
                    alt={`${cms.name} portrait`}
                    className="aspect-[410/609] w-full object-cover"
                    width={410}
                    height={609}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgba(255,255,255,0.55)_0%,transparent_100%)] dark:bg-[linear-gradient(to_top,rgba(5,6,10,0.40)_0%,transparent_100%)]" />
                  <div className="absolute bottom-5 left-4 right-4">
                    <div className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/55 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="h-4 w-4 text-indigo-600 dark:text-[#fde65c]" />
                        <div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">
                            {cms.photoBadge}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-muted">
                            {cms.location}
                          </p>
                        </div>
                      </div>
                      <ArrowDown className="h-4 w-4 rotate-[-90deg] text-slate-400 dark:text-white/70" />
                    </div>
                  </div>
                </div>

                <div className="animate-spin-slow absolute -left-10 bottom-6 hidden h-28 w-28 sm:block">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                      />
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      className="fill-white dark:fill-[#0b0d13]"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      className="stroke-slate-200 dark:stroke-white/10"
                      strokeWidth="1"
                    />
                    <text className="fill-slate-500 dark:fill-white/90 text-[8.5px] tracking-[0.22em]">
                      <textPath href="#circlePath">
                        PRODUCT DEVELOPMENT • PACKAGING • NPD •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {floatingCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: card.delay, ease: 'easeOut' }}
              className={`absolute z-20 ${card.className}`}
            >
              <div className="animate-float flex items-center gap-3 rounded-2xl border border-white/50 bg-white/65 px-4 py-3 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6366f1,#4f46e5)] dark:bg-[linear-gradient(135deg,#ff6c6b,#fb4157)] text-white">
                  <card.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {card.title}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-muted">
                    {card.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400 dark:text-muted">
            Scroll
          </span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-slate-300 dark:border-white/20 p-1">
            <span className="animate-scroll-dot h-1.5 w-1 rounded-full bg-slate-500 dark:bg-white/80" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
