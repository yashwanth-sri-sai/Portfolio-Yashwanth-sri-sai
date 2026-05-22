"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
  "AI/ML Engineer",
  "Software Developer",
  "Creative Technologist",
  "Interactive Experience Builder"
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
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
      {/* LAYER 3: MASSIVE IDENTITY REVEAL                           */}
      {/* ======================================================== */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none">
        
        {/* Subtle Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-[1px] bg-cyan-500/50" />
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-cyan-400 uppercase font-semibold">
            Digital Engineering Identity
          </span>
          <div className="w-8 h-[1px] bg-cyan-500/50" />
        </motion.div>

        {/* MASSIVE TYPOGRAPHY */}
        <motion.h1 
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-2 relative"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-white">YASHWANTH</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 pb-4">
            SRI SAI
          </span>
          
          {/* Subtle typography glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-[80px] -z-10 opacity-50 pointer-events-none" />
        </motion.h1>

        {/* DYNAMIC ROLE TRANSITIONS */}
        <div className="h-12 sm:h-16 mt-6 mb-12 relative overflow-hidden flex items-center justify-center w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-xl sm:text-3xl md:text-4xl font-light tracking-wide text-zinc-300 whitespace-nowrap"
            >
              {ROLES[roleIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* LAYER 4: PRIMARY CTA & LINKS                             */}
        {/* ======================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 pointer-events-auto"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-10 py-5 bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded-full overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            {/* Magnetic Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            
            {/* Shine sweep */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />

            <span className="relative z-10 flex items-center gap-3 text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-white group-hover:text-cyan-300 transition-colors">
              Explore Universe
              <FiArrowRight className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </button>

          {/* Secondary Actions */}
          <div className="flex items-center gap-8 text-zinc-500">
            <a href="https://github.com/yashwanth-sri-sai" target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all">
              <FiGithub size={22} />
            </a>
            <a href="https://www.linkedin.com/in/yashwanth-srisai-7a1078252/" target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all">
              <FiLinkedin size={22} />
            </a>
            <a href="mailto:yashwanthsrisai@gmail.com" className="hover:text-white hover:scale-110 transition-all">
              <FiMail size={22} />
            </a>
            <div className="w-px h-5 bg-zinc-800 mx-2" />
            <a href="https://drive.google.com/file/d/1z9KBC7yT0dVYz2OHQpa44-e9SHqPTC1K/view?usp=sharing" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest hover:scale-105">
              <FiDownload size={16} /> Resume
            </a>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
