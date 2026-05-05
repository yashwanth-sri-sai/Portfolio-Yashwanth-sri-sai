"use client";

import { motion } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin } from "react-icons/fi";

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.12,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

export default function Hero() {
  const nameWords = ["Yashwanth", "Sri", "Sai"];

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div
          className="ambient-orb w-[600px] h-[600px] -top-40 -left-40 animate-float"
          style={{ background: "rgba(59, 130, 246, 0.08)" }}
        />
        <div
          className="ambient-orb w-[500px] h-[500px] -bottom-20 -right-20 animate-float"
          style={{
            background: "rgba(96, 165, 250, 0.06)",
            animationDelay: "3s",
          }}
        />
        <div
          className="ambient-orb w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"
          style={{ background: "rgba(29, 78, 216, 0.08)" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-[pulse-glow_2s_ease-in-out_infinite]" />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {nameWords.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight inline-block text-white"
                style={{ lineHeight: 1.1, letterSpacing: "-0.04em" }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <span className="text-white font-semibold">AI/LLM Engineer</span>
          <span className="mx-3 opacity-30">|</span>
          <span className="text-white font-semibold">Backend Developer</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12"
          style={{ color: "var(--color-text-muted)" }}
        >
          Building intelligent systems with{" "}
          <span className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
            LLMs, RAG, and scalable APIs
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            id="hero-cta-projects"
            onClick={scrollToProjects}
            className="glow-button text-base"
          >
            View Projects
          </button>
          <a
            href="https://drive.google.com/file/d/1kD4G2gdYF3-s4c0rWu4rE_yMViLGRxo-/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-resume"
            className="px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:translate-y-[-2px]"
            style={{
              color: "var(--color-text-primary)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.03)",
            }}
          >
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            {
              icon: <FiGithub size={20} />,
              href: "https://github.com/yashwanth-sri-sai",
              label: "GitHub",
            },
            {
              icon: <FiLinkedin size={20} />,
              href: "https://www.linkedin.com/in/yashwanth-srisai-7a1078252/",
              label: "LinkedIn",
            },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl transition-colors duration-300"
              style={{
                color: "var(--color-text-muted)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.02)",
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToProjects}
        >
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "var(--color-text-muted)" }}
          >
            Scroll
          </span>
          <FiArrowDown size={16} style={{ color: "var(--color-text-muted)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
