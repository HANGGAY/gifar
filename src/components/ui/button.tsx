"use client";

import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

type ButtonProps = {
  variant?: "primary" | "glass" | "ghost" | "outline" | "rainbow";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
} & Omit<
    ComponentProps<"button">,
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationComplete"
  >;

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold tracking-tight transition-shadow duration-300 outline-none select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer";

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "text-white shadow-[0_12px_32px_-10px_rgba(251,65,87,0.55)] bg-[linear-gradient(135deg,#ff6c6b_0%,#fb4157_100%)] hover:shadow-[0_18px_44px_-10px_rgba(251,65,87,0.7)]",
  glass:
    "text-white glass hover:border-white/25 hover:bg-white/[0.08]",
  ghost:
    "text-white/80 bg-transparent hover:bg-white/[0.06] hover:text-white",
  outline:
    "text-white border border-white/15 bg-transparent hover:border-white/40 hover:bg-white/[0.04]",
  rainbow: "text-white group",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  if (variant === "rainbow") {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(base, variants.rainbow, sizes[size], className)}
        {...props}
      >
        <span className="absolute inset-[-2px] rounded-[14px] bg-[conic-gradient(from_0deg,#d033ff,#50e3c2,#ffe259,#fb4157,#d033ff)] animate-rainbow-spin opacity-80 saturate-150" />
        <span className="absolute inset-[1.5px] rounded-[12px] bg-[#0b0d13] transition-colors duration-300 group-hover:bg-[#14161f]" />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}