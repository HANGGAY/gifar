"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "./cn";
type SpotlightCardProps = { children: ReactNode; className?: string; spotlightColor?: string };
export function SpotlightCard({ children, className, spotlightColor = "rgba(99,102,241,0.08)" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = 280;
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 65%)`;
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl enterprise-card enterprise-accent transition-colors duration-300 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.1)] dark:hover:border-white/[0.16]",
        className
      )}
    >
      <div className="enterprise-grid opacity-30 pointer-events-none" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background }} />
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-600/5 dark:bg-[#fb4157]/[0.06] blur-2xl pointer-events-none" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
