"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  FiGithub, 
  FiExternalLink, 
  FiActivity, 
  FiLayers, 
  FiCode, 
  FiClock, 
  FiTarget, 
  FiArrowRight,
  FiCpu,
  FiAward,
  FiAlertTriangle
} from "react-icons/fi";
import { projects } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import BorderGlow from "./BorderGlow";

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  return (
    <section id="projects" className="section-padding relative overflow-hidden min-h-screen">
      {/* Background Accents */}
      <div
        className="ambient-orb w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2"
        style={{ background: "rgba(139, 92, 246, 0.04)" }}
      />
      <div
        className="ambient-orb w-[800px] h-[800px] bottom-0 right-[-20%] pointer-events-none"
        style={{ background: "rgba(6, 182, 212, 0.03)" }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Engineering Command Center"
          subtitle="Explore system architectures, data models, and deployed AI algorithms."
          align="center"
        />

        {/* ==================================================== */}
        {/* DESKTOP LAYOUT (3 COLUMNS)                           */}
        {/* ==================================================== */}
        <div className="hidden lg:flex flex-row gap-6 h-[720px] mt-8">
          
          {/* LEFT PANEL: Navigator */}
          <div className="w-[300px] flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar pb-4 text-left">
            <div className="mb-1 pl-1">
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase flex items-center gap-2 select-none">
                <FiLayers className="text-cyan-400 animate-pulse" /> Select a project
              </span>
            </div>
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`w-full flex flex-col items-start justify-center text-left px-5 py-4.5 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex-shrink-0 ${
                  activeProjectId === project.id
                    ? "bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                    : "glass-interactive border-white/5"
                }`}
              >
                {/* Active Indicator Line */}
                {activeProjectId === project.id && (
                  <motion.div
                    layoutId="activeProjectIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                  />
                )}
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col gap-1 relative z-10">
                  <span
                    className={`text-[9px] font-mono tracking-widest uppercase ${
                      activeProjectId === project.id ? "text-cyan-400" : "text-white/30"
                    }`}
                  >
                    {project.category}
                  </span>
                  <h3
                    className={`font-bold text-base transition-colors leading-snug ${
                      activeProjectId === project.id ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
 
          {/* CENTER PANEL: Showcase Details */}
          <BorderGlow 
            className="flex-1 shadow-2xl" 
            style={{ perspective: "1200px" }}
            backgroundColor="#09090b"
            borderRadius={24}
            animated={true}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col p-8 justify-between"
              >
                {/* Header Title Block */}
                <div className="flex flex-col items-start text-left mb-5 shrink-0">
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    {activeProject.title}
                  </h2>
                  <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
                    {activeProject.shortDescription}
                  </p>
                </div>

                {/* Preview Image */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-white/5 bg-black/40 mb-6 group shrink-0 select-none">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover object-top opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Structured Engineering Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-mono tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5 uppercase font-bold select-none">
                        <FiAlertTriangle size={12} /> Problem
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                        {activeProject.problemStatement}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono tracking-wider text-purple-400 mb-1.5 flex items-center gap-1.5 uppercase font-bold select-none">
                        <FiCpu size={12} /> Solution
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                        {activeProject.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-mono tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5 uppercase font-bold select-none">
                        <FiTarget size={12} /> Architecture
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                        {activeProject.solutionArchitecture}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono tracking-wider text-pink-400 mb-1.5 flex items-center gap-1.5 uppercase font-bold select-none">
                        <FiAward size={12} /> Impact
                      </h4>
                      <p className="text-sm text-zinc-300 leading-relaxed font-medium font-sans">
                        {activeProject.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Bottom Bar */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-3.5 shrink-0">
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5.5 py-2.5 rounded-full bg-cyan-500 text-black font-extrabold hover:bg-cyan-400 transition-all text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                    >
                      <FiExternalLink size={13} /> Live Demo
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5.5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:border-zinc-700 hover:bg-zinc-800/80 transition-all text-xs font-bold cursor-pointer"
                    >
                      <FiGithub size={13} /> GitHub Code
                    </a>
                  )}
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="group inline-flex items-center gap-1.5 px-5.5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-xs font-bold"
                  >
                    Read Case Study <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </BorderGlow>

          {/* RIGHT PANEL: Specifications Metadata */}
          <div className="w-[320px] flex flex-col gap-4" style={{ perspective: "1000px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col gap-4 h-full"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              >
                {/* Status Card */}
                <BorderGlow className="p-5" borderRadius={16} backgroundColor="#09090b">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3 text-white/50 mb-2 text-xs font-mono tracking-wider text-left">
                    <FiActivity className="text-green-400" /> Status
                  </div>
                  <div className="text-xl font-extrabold text-white flex items-center gap-3 relative z-10 text-left">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    {activeProject.status}
                  </div>
                </BorderGlow>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 text-left">
                  <BorderGlow className="p-4" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono mb-1.5 tracking-wider">
                      <FiLayers /> Category
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {activeProject.category}
                    </div>
                  </BorderGlow>
                  <BorderGlow className="p-4" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono mb-1.5 tracking-wider">
                      <FiClock /> Duration
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {activeProject.duration}
                    </div>
                  </BorderGlow>
                  <BorderGlow className="col-span-2 p-5" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex flex-col gap-1.5 mb-2.5">
                      <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono tracking-wider">
                        <FiTarget /> Complexity
                      </div>
                      <div className="text-base font-bold text-cyan-400">
                        {activeProject.complexity}
                      </div>
                    </div>
                    {/* Visual complexity level nodes */}
                    <div className="flex gap-1">
                      <div className="w-1.5 h-6 rounded-full bg-cyan-500" />
                      <div className={`w-1.5 h-6 rounded-full ${activeProject.complexity === "Moderate" ? "bg-white/10" : "bg-cyan-500"}`} />
                      <div className={`w-1.5 h-6 rounded-full ${activeProject.complexity === "Advanced" || activeProject.complexity === "High" ? "bg-cyan-500/50" : "bg-white/10"}`} />
                    </div>
                  </BorderGlow>
                </div>

                {/* Tech Stack list limited to 6 */}
                <BorderGlow className="p-5 flex-grow flex flex-col text-left" borderRadius={16} backgroundColor="#09090b">
                  <div className="flex items-center gap-3 text-white/50 mb-4 text-xs font-mono tracking-wider">
                    <FiCode className="text-cyan-400" /> Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2 overflow-y-auto custom-scrollbar">
                    {activeProject.tech.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs font-medium text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </BorderGlow>

                {/* Key Metrics */}
                {activeProject.metrics && activeProject.metrics.length > 0 && (
                  <BorderGlow className="p-5 text-left" borderRadius={16} backgroundColor="#09090b" colors={["#06b6d4", "#3b82f6"]}>
                    <div className="flex items-center gap-3 text-cyan-500/70 mb-3.5 text-xs font-mono tracking-widest select-none">
                      Impact Metrics
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {activeProject.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <div className="text-xl font-extrabold text-white mb-0.5">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-white/50 uppercase tracking-widest leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </BorderGlow>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ==================================================== */}
        {/* MOBILE LAYOUT (TABBED EXPLORER)                      */}
        {/* ==================================================== */}
        <div className="flex flex-col lg:hidden gap-6 mt-6">
          <div className="text-center pl-1 md:hidden select-none">
            <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">
              Swipe & select a project to explore
            </span>
          </div>
          
          {/* Tab Selector */}
          <div className="flex overflow-x-auto gap-3 pb-4 snap-x custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`snap-start whitespace-nowrap px-6 py-3.5 rounded-full border transition-all duration-300 font-medium text-sm ${
                  activeProjectId === project.id
                    ? "bg-cyan-950/80 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : "glass-interactive text-white/60 hover:text-white border-white/5"
                }`}
              >
                {project.title.split(" (")[0]}
              </button>
            ))}
          </div>

          <div style={{ perspective: "1200px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col gap-6"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              >
                {/* Mobile Center Panel */}
                <BorderGlow className="p-5 sm:p-6 text-left" borderRadius={24} backgroundColor="#09090b">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {activeProject.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-6 leading-[1.75]">
                    {activeProject.shortDescription}
                  </p>

                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black/50 select-none">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  {/* Mobile Structured Engineering Details */}
                  <div className="space-y-5 text-left mb-6 pt-5 border-t border-white/5">
                    <div>
                      <h4 className="text-[10px] font-mono tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5 uppercase font-bold">
                        <FiAlertTriangle size={12} /> Problem
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                        {activeProject.problemStatement}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono tracking-wider text-purple-400 mb-1 flex items-center gap-1.5 uppercase font-bold">
                        <FiCpu size={12} /> Solution
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                        {activeProject.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5 uppercase font-bold">
                        <FiTarget size={12} /> Architecture
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                        {activeProject.solutionArchitecture}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono tracking-wider text-pink-400 mb-1 flex items-center gap-1.5 uppercase font-bold">
                        <FiAward size={12} /> Impact
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium font-sans">
                        {activeProject.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {activeProject.demo && (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex justify-center items-center gap-2 px-6 py-4.5 rounded-2xl bg-cyan-500 text-black font-extrabold hover:bg-cyan-400 transition-colors shadow-lg cursor-pointer"
                      >
                        <FiExternalLink /> Live Demo
                      </a>
                    )}
                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex justify-center items-center gap-2 px-6 py-4.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-bold hover:bg-zinc-800 transition-all cursor-pointer"
                      >
                        <FiGithub size={18} /> GitHub Code
                      </a>
                    )}
                    <Link
                      href={`/projects/${activeProject.id}`}
                      className="w-full flex justify-center items-center gap-2 px-6 py-4.5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                    >
                      Read Case Study <FiArrowRight />
                    </Link>
                  </div>
                </BorderGlow>

                {/* Mobile Specifications Panel (Intelligence) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <BorderGlow className="col-span-2 p-5 text-left" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-xs font-mono tracking-widest">
                        <FiActivity className="inline mr-2 text-green-400" /> Status
                      </span>
                      <span className="text-white font-bold flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        {activeProject.status}
                      </span>
                    </div>
                  </BorderGlow>

                  {activeProject.metrics.slice(0, 2).map((m) => (
                    <BorderGlow
                      key={m.label}
                      className="p-5 text-center flex flex-col justify-center"
                      borderRadius={16} backgroundColor="#09090b"
                    >
                      <div className="text-2xl font-extrabold text-white mb-1">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-white/50 uppercase tracking-widest">
                        {m.label}
                      </div>
                    </BorderGlow>
                  ))}

                  <BorderGlow className="col-span-2 p-5 mt-2 text-left" borderRadius={16} backgroundColor="#09090b">
                    <div className="text-white/50 text-xs font-mono tracking-wider mb-3">
                      <FiCode className="inline mr-2" /> Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </BorderGlow>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
