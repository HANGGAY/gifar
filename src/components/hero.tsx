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
  MousePointerClick,
  Sparkles,
  Boxes,
} from 'lucide-react';
import { useRef } from 'react';
import { Button } from './ui/button';
import { FigmaIcon } from './ui/icons';

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
    icon: FigmaIcon,
    title: 'Design Systems',
    sub: 'Figma expert',
    className: 'left-0 top-8 lg:-left-6',
    delay: 1.1,
  },
  {
    icon: MousePointerClick,
    title: 'UI / UX',
    sub: '6+ yrs experience',
    className: 'right-0 top-24 lg:-right-6',
    delay: 1.25,
  },
  {
    icon: Boxes,
    title: '3D & Branding',
    sub: 'Render ready',
    className: 'bottom-24 left-0 lg:-left-10',
    delay: 1.4,
  },
];

export function Hero() {
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
      className="bg-noise relative min-h-screen overflow-hidden pt-32 pb-20 lg:pt-36"
    >
      {/* Background layers */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div className="absolute -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#fb4157]/[0.14] blur-[140px]" />
      <div className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-[#ff6c6b]/[0.1] blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[460px] w-[460px] rounded-full bg-[#fde65c]/[0.06] blur-[130px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* ---------- Left: copy ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[1.04] tracking-tight text-white"
          >
            Hi, I&apos;m <span className="gradient-text">Gifar Aulia</span>
          </motion.h1>

          <motion.div variants={item} className="mt-3 flex items-center gap-3">
            <span className="h-px w-10 bg-[linear-gradient(90deg,transparent,#fb4157)]" />
            <p className="text-[clamp(1.15rem,2.6vw,1.6rem)] font-semibold tracking-tight text-white/90">
              UI/UX Designer & Design Engineer
            </p>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-muted"
          >
            I blend innovative design thinking with deep user insight to craft
            digital experiences that are visually stunning and highly functional
            — turning complex problems into elegant, intuitive solutions for
            enterprise-scale products.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button variant="rainbow" size="lg">
              View My Work
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button variant="glass" size="lg">
              Download CV
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#ff6c6b', '#fde65c', '#50e3c2', '#d033ff'].map((c, i) => (
                  <span
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-[#05060a]"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted">
                Trusted by teams
                <br />
                <span className="font-semibold text-white">120+ projects</span>
              </span>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-4 text-muted">
              {['Tokopedia', 'Gojek', 'Shopee'].map((c) => (
                <span
                  key={c}
                  className="text-sm font-semibold tracking-tight text-white/40 transition-colors hover:text-white/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- Right: photo ---------- */}
        <motion.div
          style={{ y: photoY }}
          className="relative mx-auto w-full max-w-[380px] lg:max-w-[420px]"
        >
          {/* Glow behind photo */}
          <div className="absolute inset-8 rounded-[48px] bg-[#fb4157]/20 blur-[60px]" />

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
                {/* Transparent portrait */}
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/gifarfoto.png"
                    alt="Gifar Aulia portrait"
                    className="aspect-[410/609] w-full object-cover drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                    width={410}
                    height={609}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgba(5,6,10,0.62)_0%,transparent_100%)]" />
                  {/* Micro badge at bottom */}
                  <div className="absolute bottom-5 left-4 right-4">
                      <div className="glass flex items-center justify-between rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="h-4 w-4 text-[#fde65c]" />
                          <div>
                            <p className="text-xs font-semibold text-white">
                              Open to opportunities
                            </p>
                            <p className="text-[10px] text-muted">
                              Jakarta, Indonesia
                            </p>
                          </div>
                        </div>
                        <ArrowDown className="h-4 w-4 rotate-[-90deg] text-white/70" />
                      </div>
                    </div>
                  </div>

                {/* Rotating ring badge */}
                <div className="animate-spin-slow absolute -left-10 bottom-6 hidden h-28 w-28 sm:block">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                      />
                    </defs>
                    <circle cx="50" cy="50" r="48" fill="#0b0d13" />
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                    <text className="fill-white/90 text-[8.5px] tracking-[0.22em]">
                      <textPath href="#circlePath">
                        UI/UX DESIGN • INTERACTIVE • PRODUCT •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating cards */}
          {floatingCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: card.delay, ease: 'easeOut' }}
              className={`absolute z-20 ${card.className}`}
            >
              <div className="glass animate-float flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff6c6b,#fb4157)] text-white">
                  <card.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">
                    {card.title}
                  </p>
                  <p className="text-[10px] text-muted">{card.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <span className="animate-scroll-dot h-1.5 w-1 rounded-full bg-white/80" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
