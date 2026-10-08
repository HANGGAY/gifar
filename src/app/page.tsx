"use client";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Experience } from "@/components/experience";
import { Clients } from "@/components/clients";
import { Stats } from "@/components/stats";
import { Portfolio } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Skills } from "@/components/skills";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--ink)] text-[var(--white)]">
      <Navbar />
      <Hero />
      <Services />
      <Experience />
      <Clients />
      <Stats />
      <Portfolio />
      <Process />
      <Skills />
      <Testimonials />
      <Contact />
      <Faq />
      <Footer />
    </main>
  );
}
