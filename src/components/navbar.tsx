'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from './ui/cn';
import { Button } from './ui/button';

const links = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contacts' },
];

const getHash = (href: string) => href.split('#')[1];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > prev && latest > 320 && !open);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    links.forEach(({ href }) => {
      const el = document.getElementById(getHash(href)!);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5',
            scrolled
              ? 'border border-white/[0.08] bg-[#0b0d13]/80 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.7)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent',
          )}
        >
          {/* Logo */}
          <Link
            href="/#home"
            className="group relative flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="hidden sm:flex sm:flex-col">
              <span className="text-[15px] font-bold leading-tight tracking-tight text-white">
                Gifar Aulia
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                UI/UX Designer
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                  active === link.href
                    ? 'text-white'
                    : 'text-muted hover:text-white',
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/[0.08] ring-1 ring-inset ring-white/[0.06]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.55 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="rainbow" size="sm">
              Hire Me
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="mx-auto mt-2 h-px max-w-6xl origin-left bg-[linear-gradient(90deg,#fb4157,#ff6c6b,#fde65c)]"
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#05060a]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'text-3xl font-semibold tracking-tight transition-colors',
                      active === link.href
                        ? 'gradient-text'
                        : 'text-white hover:text-white/70',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="mt-6"
              >
                <Button
                  variant="rainbow"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  Hire Me
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
