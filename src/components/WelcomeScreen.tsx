"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { FiTerminal, FiArrowRight } from "react-icons/fi";

interface WelcomeScreenProps {
  onComplete: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // States
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [typedLines, setTypedLines] = useState<string[]>(["", "", "", ""]);
  const [activeLine, setActiveLine] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Spring animations for magnetic Explore button
  const magneticX = useSpring(0, { stiffness: 120, damping: 15 });
  const magneticY = useSpring(0, { stiffness: 120, damping: 15 });

  // Spring animation for parallax container
  const parallaxX = useSpring(0, { stiffness: 80, damping: 25 });
  const parallaxY = useSpring(0, { stiffness: 80, damping: 25 });

  const terminalLines = [
    "> Initializing Engineering Environment...",
    "> Loading Intelligent Systems...",
    "> Building Interactive Experience...",
    "> Neural Ecosystem Active."
  ];

  // Typing simulator effect
  useEffect(() => {
    if (activeLine >= terminalLines.length) {
      const timer = setTimeout(() => {
        setIsTypingDone(true);
        // Automatically enter the site after a brief pause
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 400);
      return () => clearTimeout(timer);
    }

    const fullText = terminalLines[activeLine];
    let charIndex = 0;

    const interval = setInterval(() => {
      setTypedLines((prev) => {
        const copy = [...prev];
        copy[activeLine] = fullText.slice(0, charIndex + 1);
        return copy;
      });
      charIndex++;

      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveLine((prev) => prev + 1);
        }, 200); // Wait 200ms before starting next line
      }
    }, 20); // typing speed (ms per character)

    return () => clearInterval(interval);
  }, [activeLine]);

  // Track Mouse movement for particles, glow, and parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });

      // Parallax effect: Shift wrapper in opposite direction slightly
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const moveX = (clientX - width / 2) / (width / 2) * -12; // Max 12px shift
        const moveY = (clientY - height / 2) / (height / 2) * -12;
        parallaxX.set(moveX);
        parallaxY.set(moveY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parallaxX, parallaxY]);

  // Canvas particle logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 85;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseAlpha: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.baseAlpha = Math.random() * 0.3 + 0.1;
        this.alpha = this.baseAlpha;
        // Accent colors: Cyan, indigo, deep purple
        const colors = ["rgba(147, 197, 253, ", "rgba(99, 102, 241, ", "rgba(167, 139, 250, "];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mx: number, my: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        // Mouse attraction
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 1500;
          this.x += dx * force;
          this.y += dy * force;
          this.alpha = Math.min(0.7, this.baseAlpha + (150 - dist) / 300);
        } else {
          this.alpha = this.baseAlpha;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ")";
        ctx.shadowBlur = this.radius * 2;
        ctx.shadowColor = "rgba(99, 102, 241, 0.5)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    init();
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle futuristic cyber grid overlay in canvas
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw interactive mouse cursor spotlight glow in canvas
      if (!isMobile) {
        const grad = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, 250
        );
        grad.addColorStop(0, "rgba(59, 130, 246, 0.05)");
        grad.addColorStop(0.5, "rgba(99, 102, 241, 0.01)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and Draw Particles
      particles.forEach((p) => {
        p.update(mousePos.x, mousePos.y);
        p.draw();
      });

      // Draw interactive connections (neural net links)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (100 - dist) / 100 * 0.12;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  // Magnetic Button Math Handler
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullX = (e.clientX - centerX) * 0.35; // 35% magnetic force
    const pullY = (e.clientY - centerY) * 0.35;

    magneticX.set(pullX);
    magneticY.set(pullY);
  };

  const handleButtonMouseLeave = () => {
    magneticX.set(0);
    magneticY.set(0);
    setIsHovered(false);
  };

  // Button Ripple Click Handler
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Proceed to portfolio after ripple animation completes
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(15px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      {/* 1. Canvas Interactive Particles Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Ambient Moving Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[25%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-blue-500/10 blur-[100px] animate-[pulse_6s_infinite]" />
        <div className="absolute bottom-[20%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-purple-500/8 blur-[120px] animate-[pulse_8s_infinite_1.5s]" />
      </div>

      {/* Cyber Subtle Hologram Grid & Scanline */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
          backgroundSize: "100% 4px, 6px 100%"
        }}
      />

      {/* Skip Button - Top Right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <button
          onClick={onComplete}
          className="px-4 py-2 text-xs md:text-sm font-mono tracking-widest text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 bg-zinc-950/40 hover:bg-zinc-900/60 rounded-lg backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 cursor-pointer active:scale-95 group"
        >
          SKIP INTRO
          <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* 2. Parallax Main Content Container */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-6 text-center"
      >
        {/* HELLO, I'M Text Reveal */}
        <motion.span
          className="text-xs md:text-sm font-mono tracking-[0.35em] text-blue-400 font-semibold mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          HELLO, I'M
        </motion.span>

        {/* Name Title Reveal */}
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 text-white relative leading-tight"
          initial={{ opacity: 0, y: 25, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
            YASHWANTH SRI SAI
          </span>
        </motion.h1>

        {/* Roles/Taglines Stagger Reveal */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-sm md:text-lg text-zinc-400 font-medium mb-6 max-w-xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
        >
          <span className="text-zinc-200 hover:text-blue-400 transition-colors duration-300">AI/ML Enthusiast</span>
          <span className="text-zinc-600 font-bold">•</span>
          <span className="text-zinc-200 hover:text-indigo-400 transition-colors duration-300">Software Developer</span>
          <span className="text-zinc-600 font-bold">•</span>
          <span className="text-zinc-200 hover:text-sky-400 transition-colors duration-300">Data Analytics</span>
        </motion.div>

        {/* 3. Sci-Fi Typing Terminal initialization Effect */}
        <motion.div
          className="w-full max-w-md mb-10 overflow-hidden text-left"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
        >
          <div className="border border-white/5 bg-zinc-950/60 backdrop-blur-xl rounded-xl p-4 font-mono text-[10px] md:text-xs text-zinc-400 shadow-2xl relative">
            {/* Top Bar Decoration */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <FiTerminal className="text-zinc-500 text-sm" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">System Initialization</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 animate-pulse" />
              </div>
            </div>

            {/* Terminal Lines Code */}
            <div className="space-y-1.5 min-h-[82px] flex flex-col justify-start">
              {typedLines.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx === activeLine && activeLine < terminalLines.length
                      ? "text-blue-400"
                      : idx === terminalLines.length - 1
                      ? "text-emerald-400 font-bold"
                      : "text-zinc-400"
                  } flex items-center gap-1`}
                >
                  <span>{line}</span>
                  {idx === activeLine && activeLine < terminalLines.length && (
                    <span className="w-1.5 h-3.5 bg-blue-400 animate-ping inline-block" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Optional Loading Bar */}
            <motion.div 
              className="mt-8 w-full h-1 bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="h-full bg-cyan-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
