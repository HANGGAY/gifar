"use client";

import { cn } from "../ui/cn";

type MarqueeProps = {
  items: React.ReactNode[];
  className?: string;
  duration?: string;
  reverse?: boolean;
};

export function Marquee({
  items,
  className,
  duration = "40s",
  reverse = false,
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("marquee-mask overflow-hidden", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      <div
        className="animate-marquee flex w-max gap-4"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}