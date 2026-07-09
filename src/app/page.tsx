"use client";

import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { useState, useEffect } from "react";

// Lazy load the cursor effect (desktop-only, non-critical)
const GlowCursor = dynamic(() => import("@/components/GlowCursor"), {
  ssr: false,
});

// Lazy load the heavy AI assistant chatbot component
const AIAssistant = dynamic(() => import("@/components/AIAssistant"), {
  ssr: false,
});

// Lazy load the WebGL SplashCursor background trail
const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useSmoothScroll(!isMounted);



  return (
    <>
      <div className="portfolio-shell w-full overflow-x-clip relative">
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#A855F7"
        />
        <GlowCursor />
        <ScrollProgress />
        <Navbar />
        <AIAssistant />
        <main className="w-full overflow-x-clip relative">
          <Hero />
          <About />
          <Timeline />
          <Projects />
          <Skills />
          <Certifications />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
