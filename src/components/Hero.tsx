"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import GradientText from "./GradientText";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import { FaReact, FaPython, FaDatabase, FaBrain } from "react-icons/fa";
import { SiTensorflow, SiNextdotjs } from "react-icons/si";

/* ─── Asymmetrical Tech Nodes ─── */
const floatingNodes = [
  { icon: <FaReact size={32} />, color: "#61DAFB", label: "React", top: "15%", left: "12%", size: "w-16 h-16", delay: 0.2, yRange: ["-15px", "15px"] },
  { icon: <FaPython size={28} />, color: "#FFD43B", label: "Python", top: "22%", right: "10%", size: "w-14 h-14", delay: 0.5, yRange: ["-20px", "20px"] },
  { icon: <SiTensorflow size={40} />, color: "#FF6F00", label: "TensorFlow", top: "70%", left: "8%", size: "w-20 h-20", delay: 0.8, yRange: ["-25px", "25px"] },
  { icon: <FaDatabase size={24} />, color: "#60a5fa", label: "Systems", top: "80%", right: "15%", size: "w-12 h-12", delay: 0.4, yRange: ["-10px", "10px"] },
  { icon: <FaBrain size={36} />, color: "#a78bfa", label: "AI/ML", top: "10%", right: "35%", size: "w-16 h-16", delay: 0.7, yRange: ["-30px", "30px"] },
  { icon: <SiNextdotjs size={28} />, color: "#e2e8f0", label: "Next.js", top: "75%", left: "30%", size: "w-14 h-14", delay: 0.9, yRange: ["-18px", "18px"] },
];

const ROLES = [
  "AI/ML SDE",
  "Backend Systems Developer",
  "RAG Pipeline Specialist",
  "Computer Science Engineer"
];

/* ─── Component ─── */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  /* ─── Role Cycler ─── */
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  /* ─── Mouse Parallax Setup ─── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background layers move subtly
  const backgroundX = useTransform(smoothX, [-0.5, 0.5], ["-3%", "3%"]);
  const backgroundY = useTransform(smoothY, [-0.5, 0.5], ["-3%", "3%"]);
  
  // Foreground nodes move significantly more
  const foregroundX = useTransform(smoothX, [-0.5, 0.5], ["-12%", "12%"]);
  const foregroundY = useTransform(smoothY, [-0.5, 0.5], ["-12%", "12%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        // @ts-expect-error: lenis global type is incomplete
        window.lenis.scrollTo(el, { offset: 0 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030308]">
      
      {/* ======================================================== */}
      {/* LAYER 1: CINEMATIC BACKGROUND ENVIRONMENT                  */}
      {/* ======================================================== */}
      <motion.div 
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Deep Space Gradient Mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#030308] to-black blur-3xl opacity-90" />
        
        {/* Asymmetrical Fog / Glow Effects */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-cyan-600/10 rounded-full blur-[200px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] left-[-20%] w-[1200px] h-[1200px] bg-purple-600/10 rounded-full blur-[200px]"
        />

        {/* Cinematic Grid Lines */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)] opacity-50"
          style={{ transform: "perspective(1000px) rotateX(60deg) translateY(-100px) scale(2.5)" }}
        />

        {/* Full-screen Silhouette Backdrop */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none"
        >
          <img 
            src="/hero-bg.png" 
            alt="Hero Silhouette Backdrop" 
            className="w-full h-full object-cover object-center"
            style={{
              maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
              WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)"
            }}
          />
        </motion.div>
      </motion.div>

      {/* ======================================================== */}
      {/* LAYER 2: FLOATING TECH ECOSYSTEM (ASYMMETRICAL)            */}
      {/* ======================================================== */}
      <motion.div 
        style={{ x: foregroundX, y: foregroundY }}
        className="absolute inset-0 pointer-events-none hidden md:block"
      >
        {floatingNodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: node.delay, type: "spring", stiffness: 50 }}
            className="absolute flex flex-col items-center justify-center group pointer-events-auto"
            style={{ top: node.top, left: node.left, right: node.right }}
          >
            {/* Hover Tooltip */}
            <div className="absolute -top-8 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[10px] font-mono tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
              {node.label}
            </div>

            {/* Icon Node */}
            <motion.div 
              animate={{ y: node.yRange }}
              transition={{ duration: 4 + i, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className={`${node.size} bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors duration-500 cursor-help relative overflow-hidden`}
            >
              {/* Internal Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: node.color }}
              />
              <div style={{ color: node.color }} className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                {node.icon}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* ======================================================== */}
      {/* IDENTITY LAYOUT IN STRICT HIERARCHY: Role -> Name -> Desc -> CTA */}
      {/* ======================================================== */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none">
        
        {/* 1. ROLE (Pre-title + Dynamic Transitions) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-1.5 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-cyan-500/30" />
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase font-bold">
              Specialization
            </span>
            <div className="w-8 h-[1px] bg-cyan-500/30" />
          </div>
          
          <div className="h-8 relative flex items-center justify-center w-full max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-full text-center text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wider text-zinc-400 whitespace-nowrap"
              >
                {ROLES[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 2. NAME (Shrunk by 30% for premium balance) */}
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] mb-4 relative"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-white">
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B497CF"]}
              animationSpeed={10}
              showBorder={false}
              className="w-full text-white"
            >
              YASHWANTH
            </GradientText>
          </span>
          <span className="block pb-2">
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B497CF"]}
              animationSpeed={8}
              showBorder={false}
              className="w-full"
            >
              SRI SAI
            </GradientText>
          </span>
          
          {/* Subtle typography glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 blur-[60px] -z-10 opacity-40 pointer-events-none" />
        </motion.h1>

        {/* 3. DESCRIPTION (Elegant tagline) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mt-2 mb-10 pointer-events-auto"
        >
          Building intelligent, high-performance systems with LLMs, RAG pipelines, and scalable backend APIs.
        </motion.p>

        {/* Recruiter Quick Intel Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 max-w-xl text-xs font-mono text-zinc-500 mb-8 select-none pointer-events-auto"
        >
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> AI Engineer</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Backend Developer</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> LLM Applications</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Production AI Systems</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Open to Internships & Full-Time</span>
        </motion.div>

        {/* 4. CTA (View Projects & Recruiter cluster) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 pointer-events-auto"
        >
          {/* Primary CTA */}
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-10 py-4 glass-primary rounded-full overflow-hidden transition-all duration-500 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10 flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:text-cyan-300 transition-colors">
              View Projects
              <FiArrowRight className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </button>

          {/* Recruiter Quick Links Cluster */}
          <div className="flex items-center gap-6 px-8 py-3 glass-secondary rounded-full text-zinc-400 hover:border-white/10 transition-colors duration-300">
            <a href="https://github.com/yashwanth-sri-sai" target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/yashwanth-srisai-7a1078252/" target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:yashwanthsrisai@gmail.com" className="hover:text-white hover:scale-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded" aria-label="Email">
              <FiMail size={20} />
            </a>
            <div className="w-px h-4 bg-zinc-800 mx-1" />
            <a href="https://drive.google.com/file/d/1z9KBC7yT0dVYz2OHQpa44-e9SHqPTC1K/view?usp=sharing" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-1">
              <FiDownload size={14} /> Resume
            </a>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
