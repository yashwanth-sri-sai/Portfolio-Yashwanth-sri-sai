"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open-scale");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open-scale");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("menu-open-scale");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        // @ts-expect-error: lenis global type is incomplete
        window.lenis.scrollTo(element, { offset: 0 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        body { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease; }
        body.menu-open-scale main { transform: scale(0.95); filter: blur(10px); pointer-events: none; }
      `}} />

      {/* TOP NAVIGATION BAR */}
      <motion.nav
        id="main-navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled || isOpen ? 'glass-primary border-t-0 border-x-0' : 'bg-transparent border-b border-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          
          <button
            onClick={() => {
              setIsOpen(false);
              scrollToSection("hero");
            }}
            aria-label="Scroll to Home"
            data-cursor="magnetic"
            className="group relative z-[110] flex items-center focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:outline-none focus:outline-none rounded transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Yash.OS Logo"
              width={140}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </button>

          {/* Desktop Inline Navigation */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {["about", "projects", "skills", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm font-mono tracking-widest uppercase transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:outline-none focus:outline-none rounded px-2 py-1 ${
                  activeSection === id 
                    ? "text-cyan-400" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center p-2 text-zinc-400 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:outline-none focus:outline-none rounded z-[110] relative"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {["about", "projects", "skills", "contact"].map((id, index) => (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  key={id}
                  onClick={() => {
                    setIsOpen(false);
                    // Slight delay to allow closing animation before scroll starts
                    setTimeout(() => {
                      scrollToSection(id);
                    }, 300);
                  }}
                  className={`text-2xl font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeSection === id
                      ? "text-cyan-400 font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {id}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
