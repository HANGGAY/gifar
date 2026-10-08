"use client";
import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";
type ButtonProps = {
  variant?: "primary" | "glass" | "ghost" | "outline" | "rainbow";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">,"onDrag"|"onDragStart"|"onDragEnd"|"onAnimationStart"|"onAnimationComplete">;
const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold tracking-tight transition-shadow duration-300 outline-none select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:focus-visible:ring-white/40 cursor-pointer";
const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-6 text-sm", lg: "h-13 px-8 text-base" };
const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "text-white shadow-[0_12px_32px_-10px_rgba(79,70,229,0.4)] bg-[linear-gradient(135deg,#6366f1_0%,#4f46e5_100%)] hover:shadow-[0_18px_44px_-10px_rgba(79,70,229,0.55)] dark:bg-[linear-gradient(135deg,#ff6c6b_0%,#fb4157_100%)] dark:shadow-[0_12px_32px_-10px_rgba(251,65,87,0.55)]",
  glass: "enterprise-card text-slate-800 dark:text-white hover:border-slate-300 dark:hover:border-white/25",
  ghost: "text-slate-600 bg-transparent hover:bg-slate-900/[0.05] hover:text-slate-900 dark:text-white/80 dark:hover:bg-white/[0.06] dark:hover:text-white",
  outline: "text-slate-700 border border-slate-300 bg-transparent hover:border-slate-400 hover:bg-slate-50 dark:text-white dark:border-white/15 dark:hover:border-white/40 dark:hover:bg-white/[0.04]",
  rainbow: "text-white group",
};
export function Button({ variant = "primary", size = "md", children, className, ...props }: ButtonProps) {
  if (variant === "rainbow") {
    return (
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className={cn(base, variants.rainbow, sizes[size], className)} {...props}>
        <span className="absolute inset-[-2px] rounded-[14px] bg-[conic-gradient(from_0deg,#6366f1,#06b6d4,#4f46e5,#6366f1)] dark:bg-[conic-gradient(from_0deg,#d033ff,#50e3c2,#ffe259,#fb4157,#d033ff)] animate-rainbow-spin opacity-80 saturate-150" />
        <span className="absolute inset-[1.5px] rounded-[12px] bg-indigo-600 transition-colors duration-300 group-hover:bg-indigo-500 dark:bg-[#0b0d13] dark:group-hover:bg-[#14161f]" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </motion.button>
  );
}
