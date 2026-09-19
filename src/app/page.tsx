"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Clients } from "@/components/clients";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Skills } from "@/components/skills";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink text-white">
      <div className="bg-noise">
        <Navbar />
        <Hero />
        <Clients />
        <Stats />
        <Services />
        <Portfolio />
        <Process />
        <Skills />
        <Testimonials />
        <Contact />
        <Faq />
        <Footer />
      </div>
    </main>
  );
}