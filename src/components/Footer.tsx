"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiLock, FiCpu, FiTerminal, FiRadio } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [latency, setLatency] = useState(32);
  const [currentTime, setCurrentTime] = useState("");
  const [systemUptime, setSystemUptime] = useState(0);

  // Simulated latency fluctuations to make HUD feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(22 + Math.random() * 15));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Live HUD clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const pad = (num: number) => String(num).padStart(2, "0");
      setCurrentTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // System uptime counter
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setSystemUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <footer className="relative bg-black py-16 overflow-hidden z-20 border-t border-zinc-900/60 font-mono">
      {/* ─── Grid Overlay Backdrop ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:40px] pointer-events-none opacity-40" />

      {/* Futuristic Corner Tech Bracket Accents */}
      <div className="absolute top-0 left-6 w-12 h-[1px] bg-cyan-500/40" />
      <div className="absolute top-0 left-6 w-[1px] h-3 bg-cyan-500/40" />
      <div className="absolute top-0 right-6 w-12 h-[1px] bg-purple-500/40" />
      <div className="absolute top-0 right-6 w-[1px] h-3 bg-purple-500/40" />

      {/* Horizontal Ambient Glow bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent blur-[2px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col gap-10">
        
        {/* ─── HUD TELEMETRY GRID ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
          {/* Status */}
          <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-zinc-900/50 bg-black/20">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">SYSTEM STATUS</span>
            </div>
            <span className="text-sm font-bold text-zinc-300">CORE: ONLINE</span>
          </div>

          {/* Latency */}
          <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-zinc-900/50 bg-black/20">
            <div className="flex items-center gap-2">
              <FiRadio className="text-cyan-400 animate-pulse" size={12} />
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">LATENCY TIMER</span>
            </div>
            <span className="text-sm font-bold text-zinc-300">{latency} ms // ACTIVE</span>
          </div>

          {/* Terminal Encryption */}
          <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-zinc-900/50 bg-black/20">
            <div className="flex items-center gap-2">
              <FiLock className="text-purple-400" size={12} />
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">ENCRYPTION PROTOCOL</span>
            </div>
            <span className="text-sm font-bold text-zinc-300">AES-256 SSL SECURE</span>
          </div>

          {/* HUD Local Time */}
          <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-zinc-900/50 bg-black/20">
            <div className="flex items-center gap-2">
              <FiTerminal className="text-zinc-500" size={12} />
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">SYS CLOCK // UP</span>
            </div>
            <span className="text-sm font-bold text-zinc-300 tracking-widest">
              {currentTime || "00:00:00"} <span className="text-[10px] text-zinc-600">[{formatUptime(systemUptime)}]</span>
            </span>
          </div>
        </div>

        {/* ─── MIDDLE BRANDING & SOCIAL LINCS ─── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-zinc-900/80 pb-10">
          
          {/* Logo Name & Designation */}
          <div className="flex flex-col gap-2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 justify-center lg:justify-start"
            >
              <FiCpu className="text-cyan-500 animate-spin-slow" size={18} />
              <span className="text-lg font-black text-zinc-100 uppercase tracking-widest">
                K. YASHWANTH SRI SAI
              </span>
            </motion.div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold leading-relaxed">
              INTELLIGENT SYSTEMS ENGINEER // FULL-STACK SDE TERMINUS
            </p>
          </div>

          {/* HUD Tech Readout Center */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-zinc-600 font-mono tracking-widest">
            <span>[ SYSTEM OVERLAYS: OK ]</span>
            <span>•</span>
            <span>[ CONSOLE SHELL: SECURE ]</span>
            <span>•</span>
            <span>[ RENDER ENGINE: 60FPS ]</span>
          </div>

          {/* Social Icons enclosed in Cyber-brackets */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            {[
              {
                icon: <FiGithub size={16} />,
                href: "https://github.com/yashwanth-sri-sai",
                label: "GIT",
                ariaLabel: "GitHub",
                color: "#f8fafc",
                borderColor: "rgba(255, 255, 255, 0.08)",
                glowColor: "rgba(255, 255, 255, 0.15)"
              },
              {
                icon: <FiLinkedin size={16} />,
                href: "https://www.linkedin.com/in/yashwanth-srisai-7a1078252/",
                label: "LKD",
                ariaLabel: "LinkedIn",
                color: "#3b82f6",
                borderColor: "rgba(59, 130, 246, 0.15)",
                glowColor: "rgba(59, 130, 246, 0.3)"
              },
              {
                icon: <FiMail size={16} />,
                href: "mailto:k.yashwanthsrisai09@gmail.com",
                label: "MAL",
                ariaLabel: "Email",
                color: "#a855f7",
                borderColor: "rgba(168, 85, 247, 0.15)",
                glowColor: "rgba(168, 85, 247, 0.3)"
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "MAL" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                whileHover={{ scale: 1.05, borderColor: social.color }}
                className="relative flex items-center gap-2 py-2 px-3 rounded bg-zinc-950 border transition-all duration-300 cursor-pointer text-xs font-mono font-bold"
                style={{
                  color: "var(--color-text-muted)",
                  borderColor: social.borderColor,
                }}
              >
                <span style={{ color: social.color }}>{social.icon}</span>
                <span className="text-[10px] text-zinc-400 tracking-wider group-hover:text-white">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

        </div>

        {/* ─── BOTTOM ROW: COPYRIGHT & CREDITS ─── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-zinc-500 font-mono tracking-wider">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-center md:text-left"
          >
            <span>© {currentYear} {"//"} PORTAL RECORD ID: YSS-{currentYear} {"//"} ALL RIGHTS RESERVED</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-1.5"
          >
            <span>PORTAL RECONSTRUCTED WITH</span>
            <FiHeart size={10} className="text-red-500 animate-pulse" />
            <span>USING NEXT.JS 16 & FRAMER MOTION</span>
          </motion.div>

        </div>

      </div>
    </footer>
  );
}
