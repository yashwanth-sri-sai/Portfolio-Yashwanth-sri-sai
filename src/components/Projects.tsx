"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiActivity, FiLayers, FiCode, FiClock, FiTarget, FiArrowRight } from "react-icons/fi";
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
          subtitle="Explore my system architectures, algorithms, and production deployments."
          align="center"
        />

        {/* ==================================================== */}
        {/* DESKTOP LAYOUT (3 COLUMNS)                           */}
        {/* ==================================================== */}
        <div className="hidden lg:flex flex-row gap-6 h-[700px] mt-8">
          
          {/* LEFT PANEL: Navigator */}
          <div className="w-[300px] flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar pb-4">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`w-full flex flex-col items-center justify-center text-center px-5 py-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex-shrink-0 ${
                  activeProjectId === project.id
                    ? "bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    : "glass-interactive"
                }`}
              >
                {/* Active Indicator Line */}
                {activeProjectId === project.id && (
                  <motion.div
                    layoutId="activeProjectIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                  />
                )}
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col items-center gap-1.5 relative z-10">
                  <span
                    className={`text-[10px] md:text-xs font-mono tracking-widest ${
                      activeProjectId === project.id ? "text-cyan-400" : "text-white/40"
                    }`}
                  >
                    {project.category}
                  </span>
                  <h3
                    className={`font-bold text-lg transition-colors leading-tight ${
                      activeProjectId === project.id ? "text-white" : "text-white/70"
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* CENTER PANEL: Showcase */}
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
                initial={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col p-8"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              >
                {/* Top Bar - Title and Action */}
                <div className="flex flex-col items-center text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    {activeProject.title}
                  </h2>
                  <p className="text-white/60 text-sm max-w-xl leading-[1.75]">
                    {activeProject.shortDescription}
                  </p>
                </div>

                {/* Main Visual Image/Architecture */}
                <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10 bg-black/50 group">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-[#030308]/20 to-transparent pointer-events-none" />

                  {/* Overlay Content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="p-5 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl">
                      <h4 className="text-xs font-mono tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                        <FiTarget /> Solution Architecture
                      </h4>
                      <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                        {activeProject.solutionArchitecture}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Bottom Bar */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-black font-extrabold hover:bg-gray-200 transition-colors shadow-xl"
                  >
                    Read Case Study
                    <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/60 border border-white/10 text-white/90 hover:text-white transition-all text-xs font-bold"
                      >
                        <FiGithub size={14} /> Code
                      </a>
                    )}
                    {activeProject.demo && (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                      >
                        <FiExternalLink size={14} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </BorderGlow>

          {/* RIGHT PANEL: Intelligence */}
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
                  <div className="flex items-center gap-3 text-white/50 mb-2 text-xs font-mono tracking-wider">
                    <FiActivity className="text-green-400" /> Status
                  </div>
                  <div className="text-xl font-extrabold text-white flex items-center gap-3 relative z-10">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    {activeProject.status}
                  </div>
                </BorderGlow>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <BorderGlow className="p-4" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono mb-1.5 tracking-wider">
                      <FiLayers /> Category
                    </div>
                    <div className="text-sm font-bold text-white">
                      {activeProject.category}
                    </div>
                  </BorderGlow>
                  <BorderGlow className="p-4" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono mb-1.5 tracking-wider">
                      <FiClock /> Duration
                    </div>
                    <div className="text-sm font-bold text-white">
                      {activeProject.duration}
                    </div>
                  </BorderGlow>
                  <BorderGlow className="col-span-2 p-5" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono tracking-wider">
                        <FiTarget /> Complexity
                      </div>
                      <div className="text-lg font-bold text-cyan-400">
                        {activeProject.complexity}
                      </div>
                    </div>
                    {/* Visual indicator of complexity */}
                    <div className="flex gap-1">
                      <div className="w-1.5 h-6 rounded-full bg-cyan-500" />
                      <div className={`w-1.5 h-6 rounded-full ${activeProject.complexity === "Moderate" ? "bg-white/10" : "bg-cyan-500"}`} />
                      <div className={`w-1.5 h-6 rounded-full ${activeProject.complexity === "Advanced" || activeProject.complexity === "High" ? "bg-cyan-500/50" : "bg-white/10"}`} />
                    </div>
                  </BorderGlow>
                </div>

                {/* Tech Stack */}
                <BorderGlow className="p-5 flex flex-col" borderRadius={16} backgroundColor="#09090b">
                  <div className="flex items-center gap-3 text-white/50 mb-4 text-xs font-mono tracking-wider">
                    <FiCode className="text-cyan-400" /> Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2 overflow-y-auto custom-scrollbar">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-sm font-medium text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </BorderGlow>

                {/* Key Metrics */}
                {activeProject.metrics && activeProject.metrics.length > 0 && (
                  <BorderGlow className="p-6" borderRadius={16} backgroundColor="#09090b" colors={["#06b6d4", "#3b82f6", "#0ea5e9"]}>
                    <div className="flex items-center gap-3 text-cyan-500/70 mb-4 text-xs font-mono tracking-widest">
                    Impact Metrics
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {activeProject.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <div className="text-2xl font-extrabold text-white mb-1">
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

                {/* System Links */}
                <div className="flex flex-col gap-3 mt-2">
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-black/50 backdrop-blur-md text-white/70 border border-white/10 hover:bg-white/10 hover:text-white transition-all font-bold text-sm"
                    >
                      <FiGithub size={18} /> View Source Code
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ==================================================== */}
        {/* MOBILE LAYOUT (TABBED EXPLORER)                      */}
        {/* ==================================================== */}
        <div className="flex flex-col lg:hidden gap-6 mt-6">
          {/* Tab Selector */}
          <div className="flex overflow-x-auto gap-3 pb-4 snap-x custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`snap-start whitespace-nowrap px-6 py-3.5 rounded-full border transition-all duration-300 font-medium text-sm ${
                  activeProjectId === project.id
                    ? "bg-cyan-950/80 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : "glass-interactive text-white/60 hover:text-white"
                }`}
              >
                {project.title}
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
              <BorderGlow className="p-5 sm:p-6" borderRadius={24} backgroundColor="#09090b">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {activeProject.title}
                </h2>
                <p className="text-white/60 text-sm mb-6 leading-[1.75]">
                  {activeProject.shortDescription}
                </p>

                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black/50">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-2xl bg-white text-black font-extrabold hover:bg-gray-200 transition-colors"
                  >
                    Initialize Deep Dive <FiArrowRight />
                  </Link>
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-bold"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex justify-center items-center gap-2 px-6 py-4 rounded-2xl bg-black/50 backdrop-blur-md text-white/70 border border-white/10 hover:bg-white/10 hover:text-white transition-all font-bold"
                    >
                      <FiGithub size={18} /> Source
                    </a>
                  )}
                </div>
              </BorderGlow>

              {/* Mobile Right Panel (Intelligence) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <BorderGlow className="col-span-2 p-5" borderRadius={16} backgroundColor="#09090b">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs font-mono tracking-widest">
                    <FiActivity className="inline mr-2 text-green-400" />
                    Status
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

                <BorderGlow className="col-span-2 p-5 mt-2" borderRadius={16} backgroundColor="#09090b">
                  <div className="text-white/50 text-xs font-mono tracking-wider mb-3">
                    <FiCode className="inline mr-2" /> Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
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
