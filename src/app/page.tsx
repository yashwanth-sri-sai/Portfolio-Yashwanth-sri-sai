"use client";

import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy load the cursor effect (desktop-only, non-critical)
const GlowCursor = dynamic(() => import("@/components/GlowCursor"), {
  ssr: false,
});

export default function Home() {
  useSmoothScroll();

  return (
    <>
      <GlowCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
