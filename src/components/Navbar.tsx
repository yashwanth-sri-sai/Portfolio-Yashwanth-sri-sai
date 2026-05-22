"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "timeline", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "blog", label: "Insights" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        id="main-navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500"
        style={{
          background: isScrolled
            ? "rgba(6, 6, 14, 0.8)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255, 255, 255, 0.05)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("hero")}
            suppressHydrationWarning
            className="cursor-pointer bg-transparent border-none flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Using a relative wrapper for the logo. If logo.png doesn't exist, it falls back to text alt */}
            <div className="relative h-10 flex items-center">
              <img 
                src="/logo.png" 
                alt="Yashwanth Sri Sai" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // Fallback if logo.png is missing
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback');
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div id="logo-fallback" style={{ display: 'none' }} className="text-xl font-bold">
                <span className="gradient-text">YSS</span>
                <span className="text-[var(--color-text-muted)]">.</span>
              </div>
            </div>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                suppressHydrationWarning
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer bg-transparent border-none rounded-lg"
                style={{
                  color:
                    activeSection === link.id
                      ? "#e2e8f0"
                      : "var(--color-text-muted)",
                }}
              >
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.2)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            suppressHydrationWarning
            className="md:hidden p-2 rounded-lg cursor-pointer bg-transparent"
            style={{
              color: "var(--color-text-primary)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 px-6 md:hidden"
            style={{
              background: "rgba(6, 6, 14, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  suppressHydrationWarning
                  className="text-left px-4 py-3 text-lg font-medium rounded-lg cursor-pointer bg-transparent transition-colors"
                  style={{
                    color:
                      activeSection === link.id
                        ? "#e2e8f0"
                        : "var(--color-text-muted)",
                    border: "none",
                    background:
                      activeSection === link.id
                        ? "rgba(139, 92, 246, 0.1)"
                        : "transparent",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
