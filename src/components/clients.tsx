"use client";

import { Marquee } from "./ui/marquee";
import { Reveal } from "./ui/reveal";

const clients = [
  "Tokopedia",
  "Gojek",
  "Shopee",
  "Grab",
  "Traveloka",
  "TechCorp",
  "Nusantara Labs",
  "Finara",
];

const rowOne = clients.slice(0, 4);
const rowTwo = [...clients.slice(4), ...clients.slice(0, 4)];

const logoItems = (list: string[]) =>
  list.map((name) => (
    <div key={name} className="flex items-center gap-3 px-8">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-white/20 to-white/5">
        <span className="text-[10px] font-bold text-white/80">
          {name.charAt(0)}
        </span>
      </span>
      <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-white/35 transition-colors duration-300 hover:text-white/80">
        {name}
      </span>
    </div>
  ));

export function Clients() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            Trusted by teams at
          </p>
        </Reveal>
        <div className="space-y-4">
          <Marquee items={logoItems(rowOne)} duration="32s" />
          <Marquee items={logoItems(rowTwo)} duration="38s" reverse />
        </div>
      </div>
    </section>
  );
}