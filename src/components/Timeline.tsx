"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MILESTONES, TECH_EVOLUTION, FUTURE_VISION } from "@/data/timelineData";
import { FiGitCommit, FiArrowUpRight, FiEye, FiZap } from "react-icons/fi";
import BorderGlow from "./BorderGlow";

export default function Timeline() {
  const [activeStation, setActiveStation] = useState(0);
  const [hoveredStation, setHoveredStation] = useState<number | null>(null);
  const [activePathNode, setActivePathNode] = useState<{ pathIdx: number; nodeIdx: number } | null>(null);

  const activeMilestone = MILESTONES[activeStation];

  // Calculate the active line progress based on the selected station
  const progressPercentage = (activeStation / (MILESTONES.length - 1)) * 100;

  return (
    <section id="timeline" className="relative w-full bg-[#030308] text-white py-32 overflow-hidden">
      {/* Background Cinematic Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-900/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-24">
        
        {/* ========================================================================= */}
        {/* 1. METRO STATION JOURNEY EXPERIENCE                                       */}
        {/* ========================================================================= */}
        <div>
          <div className="mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Evolution</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-[1.8] font-normal">
              A visual timeline showing my technical growth and progression from foundational computer science studies toward advanced production-grade AI systems.
            </p>
          </div>

          <div className="relative w-full flex flex-col md:flex-row md:items-center justify-between mb-12">
            
            {/* DESKTOP METRO LINE (Background + Active) */}
            <div className="hidden md:block absolute top-6 left-8 right-8 h-1.5 bg-zinc-800 rounded-full" />
            <motion.div 
              className="hidden md:block absolute top-6 left-8 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `calc(${progressPercentage}% - 2rem)` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* MOBILE METRO LINE (Background + Active) */}
            <div className="md:hidden absolute left-[31px] top-6 bottom-6 w-1 bg-zinc-800 rounded-full" />
            <motion.div 
              className="md:hidden absolute left-[31px] top-6 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              initial={{ height: 0 }}
              animate={{ height: `calc(${progressPercentage}%)` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* STATIONS */}
            <div className="flex flex-col md:flex-row w-full justify-between gap-12 md:gap-4 relative z-10">
              {MILESTONES.map((milestone, idx) => {
                const isActive = activeStation === idx;
                const isHovered = hoveredStation === idx;
                const isPassed = activeStation >= idx;
                const Icon = milestone.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStation(idx)}
                    onMouseEnter={() => setHoveredStation(idx)}
                    onMouseLeave={() => setHoveredStation(null)}
                    className="group flex md:flex-col items-center gap-6 md:gap-4 relative text-left md:text-center w-full md:w-auto focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:outline-none focus:outline-none rounded-2xl p-1"
                  >
                    {/* Station Node */}
                    <motion.div
                      animate={{
                        scale: isActive || isHovered ? 1.2 : 1,
                        backgroundColor: isActive ? milestone.color : (isPassed ? "#fff" : "#18181b"),
                        borderColor: isActive || isHovered ? milestone.color : (isPassed ? "#fff" : "#3f3f46")
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-full border-[3px] flex items-center justify-center relative z-10 transition-colors shadow-lg"
                      style={{
                        boxShadow: isActive || isHovered ? `0 0 20px ${milestone.color}80` : "none"
                      }}
                    >
                      <Icon 
                        className="text-xl md:text-lg transition-colors" 
                        style={{ color: isActive ? "#fff" : (isPassed ? "#000" : "#a1a1aa") }} 
                      />
                      
                      {/* Neural Pulse on Hover */}
                      {isHovered && !isActive && (
                        <span 
                          className="absolute inset-0 rounded-full animate-ping opacity-40" 
                          style={{ backgroundColor: milestone.color }} 
                        />
                      )}
                    </motion.div>

                    {/* Station Labels */}
                    <div className="flex flex-col md:items-center">
                      <span 
                        className="text-lg md:text-sm font-bold transition-colors"
                        style={{ color: isActive || isHovered ? "#fff" : (isPassed ? "#e4e4e7" : "#a1a1aa") }}
                      >
                        {milestone.year}
                      </span>
                      <span 
                        className="text-sm md:text-xs font-medium transition-colors hidden sm:block md:mt-1 max-w-[120px]"
                        style={{ color: isActive ? milestone.color : "#71717a" }}
                      >
                        {milestone.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STATION DETAIL PANEL (GLASS) */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStation}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full relative"
              >
                <BorderGlow 
                  className="relative p-6 md:p-10"
                  innerClassName="flex flex-col md:flex-row gap-10 w-full"
                  borderRadius={24} backgroundColor="#09090b"
                >
                  {/* Subtle Background Glow based on station color */}
                  <div 
                    className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: activeMilestone.color }}
                  />

                  {/* Left Column: Context */}
                  <div className="flex-1 space-y-6 relative z-10 text-left">
                    <div>
                      <span 
                        className="text-xs font-mono font-bold tracking-wider uppercase mb-2 block"
                        style={{ color: activeMilestone.color }}
                      >
                        Journey Stage {(activeStation + 1).toString().padStart(2, "0")}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-1.5">
                        {activeMilestone.title}
                      </h3>
                      <p className="text-zinc-500 font-mono text-xs tracking-wider font-bold">
                        Period: {activeMilestone.year}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-zinc-400 leading-[1.8]">
                      {activeMilestone.description}
                    </p>
                  </div>

                  {/* Right Column: Skills & Achievement */}
                  <div className="flex-1 space-y-8 relative z-10 text-left">
                    <div>
                      <h4 className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Key Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeMilestone.skills.map(s => (
                          <span 
                            key={s} 
                            className="text-xs px-3 py-1.5 rounded-md font-semibold border"
                            style={{
                              background: `${activeMilestone.color}10`,
                              borderColor: `${activeMilestone.color}25`,
                              color: "#e4e4e7"
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Milestone Achievement</h4>
                      <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 shadow-inner">
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: activeMilestone.color }} />
                        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pl-3 font-medium">
                          {activeMilestone.achievement}
                        </p>
                      </div>
                    </div>
                  </div>

                </BorderGlow>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TECH EVOLUTION SYSTEM                                                  */}
        {/* ========================================================================= */}
        <div className="mt-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-white">Skill Growth Evolution</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {TECH_EVOLUTION.map((path, pathIdx) => (
              <BorderGlow 
                key={path.category}
                className="relative p-8"
                innerClassName="w-full flex flex-col"
                borderRadius={24} backgroundColor="#09090b"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 blur-[50px] pointer-events-none" />

                <span className={`text-xs font-mono font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${path.color} block mb-8 px-1 -mx-1 w-fit`}>
                  {path.category}
                </span>

                <div className="relative space-y-8">
                  {/* Vertical connecting line vector */}
                  <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-zinc-800">
                    <motion.div 
                      className={`w-full h-1/2 bg-gradient-to-b ${path.color}`}
                      animate={{ y: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {path.nodes.map((node, nodeIdx) => {
                    const isHovered = activePathNode?.pathIdx === pathIdx && activePathNode?.nodeIdx === nodeIdx;

                    return (
                      <div 
                        key={node.title}
                        className="relative flex items-start gap-6"
                        onMouseEnter={() => setActivePathNode({ pathIdx, nodeIdx })}
                        onMouseLeave={() => setActivePathNode(null)}
                      >
                        <div className="relative z-10 shrink-0 mt-1.5">
                          <motion.div 
                            animate={{ 
                              scale: isHovered ? 1.3 : 1,
                              backgroundColor: isHovered ? "#fff" : "rgba(39, 39, 42, 1)" 
                            }}
                            className="w-4 h-4 rounded-full border-2 border-zinc-700 flex items-center justify-center cursor-pointer transition-colors"
                          >
                            {isHovered && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                          </motion.div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-base font-bold text-zinc-100">{node.title}</span>
                            <span className="text-xs font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 font-bold shrink-0">{node.year}</span>
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed max-w-lg font-medium">{node.desc}</p>

                          <AnimatePresence>
                            {isHovered && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 overflow-hidden"
                              >
                                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-300 mb-2 font-bold tracking-wider uppercase">
                                  <span>Proficiency Index</span>
                                  <span>{node.level}%</span>
                                </div>
                                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${node.level}%` }}
                                    className={`h-full bg-gradient-to-r ${path.color}`}
                                    transition={{ duration: 0.6 }}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </BorderGlow>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center text-center">
            <span className="text-xs text-zinc-500 flex items-center gap-2 font-semibold">
              <FiZap className="text-yellow-500" /> Hover nodes to view skill details
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FUTURE VISION                                                          */}
        {/* ========================================================================= */}
        <div className="mt-12 pb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-[1px] w-6 bg-cyan-500/40" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-bold">FUTURE VISION</span>
              <span className="h-[1px] w-6 bg-cyan-500/40" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Current Focus & Horizons</h2>
            <p className="text-zinc-400 text-sm mt-3 font-semibold">Next-generation concepts, architectures, and paradigms currently in build orbit</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {FUTURE_VISION.map((vision) => (
              <motion.div
                key={vision.title}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative min-w-0"
              >
                <BorderGlow
                  className="relative p-8"
                  innerClassName="flex flex-col justify-between w-full"
                  borderRadius={22} backgroundColor="#09090b"
                  style={{ borderColor: vision.borderColor }}
                >
                <div 
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] pointer-events-none opacity-20"
                  style={{ backgroundColor: vision.accentColor }}
                />

                <div>
                  <span 
                    className="text-xs font-mono px-3 py-1 rounded-full border uppercase tracking-widest font-black block w-fit mb-5"
                    style={{
                      color: vision.accentColor,
                      borderColor: vision.borderColor,
                      background: "rgba(0,0,0,0.4)"
                    }}
                  >
                    {vision.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight leading-tight">{vision.title}</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">{vision.desc}</p>
                </div>

                <div className="mt-8 flex justify-end items-center">
                  <FiEye size={16} className="text-zinc-500" />
                </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
