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
import AIAssistant from "@/components/AIAssistant";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/WelcomeScreen";

// Lazy load the cursor effect (desktop-only, non-critical)
const GlowCursor = dynamic(() => import("@/components/GlowCursor"), {
  ssr: false,
});

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Check session storage on mount to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
    const visited = sessionStorage.getItem("portfolio-intro-visited");
    if (visited === "true") {
      setShowIntro(false);
    }
  }, []);

  // Lock scroll while intro is playing
  useEffect(() => {
    if (showIntro && isMounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro, isMounted]);

  const handleIntroComplete = () => {
    sessionStorage.setItem("portfolio-intro-visited", "true");
    setShowIntro(false);
  };

  // Pass disabled flag to Lenis scroll so it doesn't run during intro
  useSmoothScroll(showIntro || !isMounted);

  // Avoid flash of content on SSR
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black" />
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <WelcomeScreen onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={showIntro ? { opacity: 0, filter: "blur(25px)", scale: 0.96 } : false}
        animate={!showIntro ? { opacity: 1, filter: "blur(0px)", scale: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full overflow-x-clip relative"
      >
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
      </motion.div>
    </>
  );
}
