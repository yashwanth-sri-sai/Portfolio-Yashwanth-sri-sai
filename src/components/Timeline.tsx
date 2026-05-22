"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  FiCpu, 
  FiTerminal, 
  FiLayers, 
  FiShield, 
  FiGlobe, 
  FiAward, 
  FiChevronRight, 
  FiGitCommit,
  FiZap,
  FiArrowUpRight,
  FiTrendingUp,
  FiFileText,
  FiEye
} from "react-icons/fi";

// Data types
interface Milestone {
  year: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  tech: string[];
  projects: {
    name: string;
    pathway: string[];
    accent: string;
  }[];
  metrics: { label: string; value: string }[];
  color: string;
  icon: any;
}

const MILESTONES: Milestone[] = [
  {
    year: "2022",
    phase: "PHASE 01: FOUNDATIONAL ASCENT",
    title: "Academics & Core Programming",
    subtitle: "CS foundations, programming patterns, and cybersecurity",
    description: "Initiated B.Tech in CSE (Cyber Security) at IIIT Kottayam. Developed strong computational basics in computer science, mastering programming logic and structural problem solving.",
    points: [
      "Began CSE B.Tech studies at Indian Institute of Information Technology Kottayam",
      "Learned fundamental system concepts and structural programming in C++ and Java",
      "Studied object-oriented programming patterns and standard algorithms"
    ],
    tech: ["C++", "Java", "OOP", "Data Structures", "Linux"],
    projects: [
      { name: "IIIT Kottayam Academics", pathway: ["CS Foundations", "OOP Patterns"], accent: "#3b82f6" }
    ],
    metrics: [
      { label: "Course Started", value: "Nov 2022" },
      { label: "Langs Learned", value: "2+" },
      { label: "Core GPA Sandbox", value: "Excellent" }
    ],
    color: "#3b82f6", // Electric Blue
    icon: FiTerminal
  },
  {
    year: "2023",
    phase: "PHASE 02: NLP & AI PARSING ENTRY",
    title: "AI Resume Analyzer",
    subtitle: "ATS parsing, semantic keyword matching, and LLM diagnostics",
    description: "Expanded technical scope to natural language processing. Built a production-grade AI application to evaluate resumes against target job descriptions, calculate match percentages, and provide detailed constructive feedback.",
    points: [
      "Engineered multi-format document parser extracting structured text from PDFs, DOCX, and TXT files",
      "Utilized LLMs for semantic matching and keyword gap analysis against target job descriptions",
      "Built a reactive, user-friendly Streamlit web interface with clear match percentages and feedback dashboards"
    ],
    tech: ["Python", "Streamlit", "LLMs", "ATS Parsing", "Pandas"],
    projects: [
      { name: "AI Resume Analyzer", pathway: ["Streamlit UI", "Python LLM parser"], accent: "#22c55e" }
    ],
    metrics: [
      { label: "ATS Precision", value: "98%" },
      { label: "Response Time", value: "<1.2s" },
      { label: "File Formats", value: "4" }
    ],
    color: "#22c55e", // Emerald Green
    icon: FiFileText
  },
  {
    year: "2024",
    phase: "PHASE 03: CREATIVE LEADERSHIP",
    title: "Sports Design & Media Leadership",
    subtitle: "Brand identity design, campaign coordination, and creative direction",
    description: "Appointed as Sports Design and Social Media Lead at IIIT Kottayam. Coordinated digital brand identity, designed media schedules, and managed collaborative visual teams for college events.",
    points: [
      "Led digital branding, social media layout, and graphic assets for IIIT Kottayam sports events",
      "Coordinated multi-channel visual campaigns, maintaining consistent brand guidelines",
      "Developed strong ownership mindset, running operations under high-pressure event schedules"
    ],
    tech: ["Graphic Layouts", "Brand Strategy", "Media Pipelines", "Team Collaboration", "Digital Asset Design"],
    projects: [
      { name: "Sports Media Campaign", pathway: ["Layout Design", "Brand Guidelines"], accent: "#eab308" }
    ],
    metrics: [
      { label: "Design Campaigns", value: "10+" },
      { label: "Lead Duration", value: "1 Year" },
      { label: "Creative Reach", value: "High Impact" }
    ],
    color: "#eab308", // Amber Gold
    icon: FiAward
  },
  {
    year: "2025",
    phase: "PHASE 04: AI & ML SECURITY FRONTIERS",
    title: "Web Security & Agentic Solutions",
    subtitle: "Phishing ML shield, LangChain workflows, and FAISS RAG chatbot architectures",
    description: "Developed a machine learning system to detect phishing websites with URL/domain feature extraction. Engineered agentic document assistants using LangChain, Gemini LLM, and FAISS vector databases.",
    points: [
      "Engineered Phishing Website Detection System using Random Forest and XGBoost classifiers",
      "Developed FastAPI/Flask endpoints for real-time model inference and predictions",
      "Built RAG systems using LangChain and FAISS vector stores for custom document retrieval"
    ],
    tech: ["Python", "FastAPI", "LangChain", "Gemini AI", "FAISS", "Scikit-learn", "XGBoost", "Random Forest", "Flask"],
    projects: [
      { name: "Phishing ML Shield", pathway: ["URL Feature Extraction", "XGBoost Classification"], accent: "#a855f7" },
      { name: "Agentic AI Chatbot", pathway: ["LangChain Routers", "FAISS Semantic Search"], accent: "#f43f5e" }
    ],
    metrics: [
      { label: "RAG Retrieve Speed", value: "<80ms" },
      { label: "Classifier Acc", value: "98%+" },
      { label: "Active Pipelines", value: "3+" }
    ],
    color: "#a855f7", // Deep Purple
    icon: FiCpu
  },
  {
    year: "2026",
    phase: "PHASE 05: CINEMATIC FULLSTACK",
    title: "Autonomous Pipelines & High-End UX",
    subtitle: "GPU-driven Canvas physics, multi-agent frameworks, and vector scaling",
    description: "Currently scaling agentic applications with self-correcting routing, custom WebGL/Canvas timelines, and ultra-high-fidelity interactive user experiences.",
    points: [
      "Building responsive GPU-accelerated canvas components and physics grids",
      "Designing high-concurrency vector index queries across production targets",
      "Refining state management and animation architectures for fluid interfaces"
    ],
    tech: ["Next.js", "React 19", "HTML5 Canvas", "VectorDBs", "TypeScript"],
    projects: [
      { name: "Immersive Timeline Engine", pathway: ["Canvas 2D", "Parallax Scroll"], accent: "#06b6d4" }
    ],
    metrics: [
      { label: "Average Performance", value: "60 FPS" },
      { label: "Vector Search Recall", value: "98.2%" },
      { label: "Active Project Repos", value: "8" }
    ],
    color: "#06b6d4", // Electric Cyan
    icon: FiLayers
  }
];

// Tech Evolution paths
const TECH_EVOLUTION = [
  {
    category: "AI / ML PATHWAY",
    color: "from-blue-500 via-purple-500 to-cyan-400",
    nodes: [
      { title: "Python Core & NLP", desc: "Core scripting, OOP algorithms, and LLM-powered resume parsing applications.", year: "2022-23", level: 90 },
      { title: "ML Security Shields", desc: "Phishing website detection using URL feature extraction and XGBoost classifiers.", year: "2024-25", level: 88 },
      { title: "Agentic AI Systems", desc: "RAG chatbots with FAISS vector indexing, LangChain routers, and Gemini LLM tool automation.", year: "2025-26", level: 85 }
    ]
  },
  {
    category: "FRONTEND EVOLUTION",
    color: "from-purple-500 via-pink-500 to-emerald-400",
    nodes: [
      { title: "Core Web Development", desc: "Semantic HTML structure, responsive Tailwind layouts, basic React interfaces.", year: "2022-23", level: 95 },
      { title: "Full-Stack Integrations", desc: "Next.js framework setups, FastAPI backend routing, micro-interactions.", year: "2024", level: 90 },
      { title: "Cinematic Rendering", desc: "GPU Canvas visuals, custom particle physics, high-fidelity UX motion.", year: "2025-26", level: 85 }
    ]
  }
];

// Future Vision / Focus
const FUTURE_VISION = [
  {
    title: "AI Agents Ecosystems",
    desc: "Architecting self-improving agents that can resolve compound technical tasks autonomously.",
    tag: "Agentic Web",
    color: "rgba(59, 130, 246, 0.15)",
    borderColor: "rgba(59, 130, 246, 0.35)",
    accentColor: "#3b82f6"
  },
  {
    title: "Hybrid RAG Implementations",
    desc: "Designing contextual chunking systems and cross-graph embeddings for lightning-fast reasoning.",
    tag: "Knowledge Graphs",
    color: "rgba(168, 85, 247, 0.15)",
    borderColor: "rgba(168, 85, 247, 0.35)",
    accentColor: "#a855f7"
  },
  {
    title: "High-Performance Graphics",
    desc: "Bridging 3D physics engines with web shaders to create jaw-dropping, emotionally-resonant user experiences.",
    tag: "WebGL & WebGPU",
    color: "rgba(6, 180, 212, 0.15)",
    borderColor: "rgba(6, 180, 212, 0.35)",
    accentColor: "#06b6d4"
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [activePathNode, setActivePathNode] = useState<{ pathIdx: number; nodeIdx: number } | null>(null);
  const [activeSectionKey, setActiveSectionKey] = useState<"intro" | "milestones" | "tech" | "future">("intro");
  const [isMobile, setIsMobile] = useState(false);

  // Screen resize and mobile verification
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll helper to warp directly to a timeline milestone
  const scrollToProgress = (progress: number) => {
    if (!containerRef.current) return;
    const offsetTop = containerRef.current.offsetTop;
    const scrollHeight = containerRef.current.scrollHeight;
    const scrollDistance = scrollHeight - window.innerHeight;
    const targetScrollY = offsetTop + progress * scrollDistance;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });
  };

  // Framer Motion Scroll Progress for Sticky Timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out scroll progression for horizontal translate
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  // Map scroll states to prevent layout and visual text overlaps:
  // 0.00 to 0.12 -> Screen 1: Fullscreen Timeline Intro
  // 0.16 to 0.60 -> Screen 2: Horizontal Milestone cards (zooming tunnel background)
  // 0.64 to 0.80 -> Screen 3: Tech Evolution Systems (SVG graphs)
  // 0.84 to 1.00 -> Screen 4: Future Focus holographic tiles

  const introOpacity = useTransform(scrollYProgress, [0.22, 0.28], [1, 0], { clamp: true });
  const introScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.95], { clamp: true });
  const introY = useTransform(scrollYProgress, [0, 0.28], [0, -40], { clamp: true });

  // Horizontal translate of milestones (responsive translate width mapped to active visible phase)
  const desktopX = useTransform(smoothProgress, [0.30, 0.62], ["0vw", "-260vw"], { clamp: true });
  const mobileX = useTransform(smoothProgress, [0.30, 0.62], ["0vw", "-370vw"], { clamp: true });
  const horizontalX = isMobile ? mobileX : desktopX;

  // We map the milestones fade-in exactly to [0.22, 0.28] and fade-out to [0.62, 0.68] for perfect cross-fades
  const milestonesOpacity = useTransform(scrollYProgress, [0.22, 0.28, 0.62, 0.68], [0, 1, 1, 0], { clamp: true });
  const milestonesY = useTransform(scrollYProgress, [0.22, 0.28, 0.62, 0.68], [40, 0, 0, -40], { clamp: true });

  // Tech evolution section transforms: cross-fade with milestones over [0.62, 0.68], and with future over [0.80, 0.86]
  const techOpacity = useTransform(scrollYProgress, [0.62, 0.68, 0.80, 0.86], [0, 1, 1, 0], { clamp: true });
  const techScale = useTransform(scrollYProgress, [0.62, 0.68, 0.80, 0.86], [0.95, 1, 1, 0.95], { clamp: true });
  const techY = useTransform(scrollYProgress, [0.62, 0.68, 0.80, 0.86], [40, 0, 0, -40], { clamp: true });

  // Scroll-driven sequential animations for Tech Evolution nodes (from 0.69 to 0.80)
  const node0Opacity = useTransform(scrollYProgress, [0.69, 0.72], [0, 1], { clamp: true });
  const node0Y = useTransform(scrollYProgress, [0.69, 0.72], [15, 0], { clamp: true });

  const node1Opacity = useTransform(scrollYProgress, [0.72, 0.75], [0, 1], { clamp: true });
  const node1Y = useTransform(scrollYProgress, [0.72, 0.75], [15, 0], { clamp: true });

  const node2Opacity = useTransform(scrollYProgress, [0.75, 0.78], [0, 1], { clamp: true });
  const node2Y = useTransform(scrollYProgress, [0.75, 0.78], [15, 0], { clamp: true });

  // Future Focus transforms: cross-fade with tech over [0.80, 0.86]
  const futureOpacity = useTransform(scrollYProgress, [0.80, 0.86], [0, 1], { clamp: true });
  const futureScale = useTransform(scrollYProgress, [0.80, 0.86], [0.95, 1], { clamp: true });
  const futureY = useTransform(scrollYProgress, [0.80, 0.86], [40, 0], { clamp: true });

  // Scroll-driven sequential animations for Future Focus cards (from 0.88 to 0.98)
  const futureCard0Opacity = useTransform(scrollYProgress, [0.88, 0.91], [0, 1], { clamp: true });
  const futureCard0Y = useTransform(scrollYProgress, [0.88, 0.91], [25, 0], { clamp: true });

  const futureCard1Opacity = useTransform(scrollYProgress, [0.91, 0.94], [0, 1], { clamp: true });
  const futureCard1Y = useTransform(scrollYProgress, [0.91, 0.94], [25, 0], { clamp: true });

  const futureCard2Opacity = useTransform(scrollYProgress, [0.94, 0.97], [0, 1], { clamp: true });
  const futureCard2Y = useTransform(scrollYProgress, [0.94, 0.97], [25, 0], { clamp: true });

  // Map display values to completely remove sections from the DOM layout once they fade out
  // We use wider ranges to prevent blank screens/gaps during fast scrolling or scroll-to overshoots
  const introDisplay = useTransform(scrollYProgress, (latest) => latest >= 0.30 ? "none" : "flex");
  const milestonesDisplay = useTransform(scrollYProgress, (latest) => (latest >= 0.18 && latest < 0.72) ? "flex" : "none");
  const techDisplay = useTransform(scrollYProgress, (latest) => (latest >= 0.58 && latest < 0.90) ? "flex" : "none");
  const futureDisplay = useTransform(scrollYProgress, (latest) => latest >= 0.76 ? "flex" : "none");

  // Active section tracking based on raw scroll progress
  useEffect(() => {
    const updateSection = (latest: number) => {
      if (latest < 0.25) {
        setActiveSectionKey("intro");
      } else if (latest >= 0.25 && latest < 0.64) {
        setActiveSectionKey("milestones");
      } else if (latest >= 0.64 && latest < 0.83) {
        setActiveSectionKey("tech");
      } else {
        setActiveSectionKey("future");
      }
    };

    updateSection(scrollYProgress.get());

    const timer = setTimeout(() => {
      updateSection(scrollYProgress.get());
    }, 150);

    const unsubscribe = scrollYProgress.on("change", updateSection);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [scrollYProgress]);

  // Active milestone tracking based on smooth scroll progress (perfectly synced with cards animation)
  useEffect(() => {
    const updateMilestone = (latestSmooth: number) => {
      // Milestones horizontal scroll is active between 0.30 and 0.62
      const progressInRange = (latestSmooth - 0.30) / 0.32;
      const index = Math.round(progressInRange * (MILESTONES.length - 1));
      const clampedIndex = Math.max(0, Math.min(index, MILESTONES.length - 1));
      setActiveMilestone(clampedIndex);
    };

    updateMilestone(smoothProgress.get());

    const timer = setTimeout(() => {
      updateMilestone(smoothProgress.get());
    }, 150);

    const unsubscribe = smoothProgress.on("change", updateMilestone);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [smoothProgress]);

  // Canvas Tunnel Loop Effect
  useEffect(() => {
    if (isMobile) return; // Save resources on mobile screens

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class for 3D simulation
    class Particle {
      x: number;
      y: number;
      z: number;
      baseColor: { r: number; g: number; b: number };
      size: number;

      constructor() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2.8 + 0.6; // Slightly larger for better contrast

        // Choose color palette based on year accents
        const roll = Math.random();
        if (roll < 0.35) {
          this.baseColor = { r: 96, g: 165, b: 250 }; // Light blue
        } else if (roll < 0.7) {
          this.baseColor = { r: 192, g: 132, b: 252 }; // Light purple
        } else {
          this.baseColor = { r: 34, g: 211, b: 238 }; // Light cyan
        }
      }

      update(speed: number) {
        this.z -= speed;
        if (this.z <= 0) {
          this.z = 1000;
          this.x = (Math.random() - 0.5) * 2000;
          this.y = (Math.random() - 0.5) * 2000;
        }
      }

      draw(c: CanvasRenderingContext2D, progress: number) {
        const fov = 350;
        const sx = (this.x / this.z) * fov + width / 2;
        const sy = (this.y / this.z) * fov + height / 2;

        if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
          const alpha = Math.min((1000 - this.z) / 400, this.z / 150) * 0.6; // Increased opacity for contrast
          const currentSize = (1 - this.z / 1000) * this.size * 3.5 + 0.6;

          c.beginPath();
          c.arc(sx, sy, currentSize, 0, Math.PI * 2);
          c.fillStyle = `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, ${alpha})`;
          c.shadowBlur = currentSize * 2.5;
          c.shadowColor = `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, ${alpha * 0.9})`;
          c.fill();
          c.shadowBlur = 0; // Reset
        }
      }
    }

    const particles: Particle[] = Array.from({ length: 240 }, () => new Particle());

    // Main animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, width, height);

      const progress = scrollYProgress.get();
      const speed = 2.5 + progress * 26; // Snappy zoom acceleration

      // Draw particle tunnel
      particles.forEach((p) => {
        p.update(speed);
        p.draw(ctx, progress);
      });

      // Draw connection vectors between particles
      ctx.strokeStyle = `rgba(139, 92, 246, ${0.07 + progress * 0.08})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i += 7) {
        const p1 = particles[i];
        const fov = 350;
        const sx1 = (p1.x / p1.z) * fov + width / 2;
        const sy1 = (p1.y / p1.z) * fov + height / 2;

        if (sx1 >= 0 && sx1 < width && sy1 >= 0 && sy1 < height) {
          for (let j = i + 1; j < i + 3; j++) {
            if (j >= particles.length) break;
            const p2 = particles[j];
            const sx2 = (p2.x / p2.z) * fov + width / 2;
            const sy2 = (p2.y / p2.z) * fov + height / 2;

            const dist = Math.hypot(sx1 - sx2, sy1 - sy2);
            if (dist < 110) {
              const alpha = Math.min(p1.z / 450, p2.z / 450, (110 - dist) / 110) * 0.12;
              ctx.beginPath();
              ctx.moveTo(sx1, sy1);
              ctx.lineTo(sx2, sy2);
              ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
              ctx.stroke();
            }
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
  }, [scrollYProgress, isMobile]);

  return (
    <div 
      id="timeline"
      ref={containerRef} 
      className="relative w-full bg-black text-white" 
      style={{ height: "400vh", position: "relative" }} // Extended vertical track to provide smooth, immersive scroll pacing
    >
      {/* ─── WebGL-like Interactive Canvas Backdrop ─── */}
      {!isMobile && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 w-full h-full pointer-events-none z-0" 
        />
      )}

      {/* Cyber Grid Lines overlay */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* ─── STICKY CONTAINER WRAPPER ─── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden z-10">

        {/* ─── SECTION 1: HERO TIMELINE INTRO (scrollYProgress: 0.0 -> 0.15) ─── */}
        <AnimatePresence>
          <motion.div
            style={{ 
              display: introDisplay,
              opacity: introOpacity, 
              scale: introScale, 
              y: introY,
              pointerEvents: activeSectionKey === "intro" ? "auto" : "none" 
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
          >


            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
            >
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Journey</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-zinc-200 text-lg md:text-xl max-w-3xl leading-relaxed mb-12 font-medium"
            >
              Exploring AI development, core software engineering, immersive user interfaces, and scalable production systems through continuous learning and rigorous experimentation.
            </motion.p>

            {/* Futuristic Telemetry HUD Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="grid grid-cols-3 gap-6 md:gap-16 max-w-2xl px-8 py-5 glass-card border border-zinc-700/55 rounded-2xl"
              style={{ background: "rgba(10, 10, 15, 0.85)", backdropFilter: "blur(20px)" }}
            >
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-extrabold text-blue-400 font-mono">2022</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Start Year</span>
              </div>
              <div className="h-10 w-[1px] bg-zinc-800/80 self-center justify-self-center" />
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-extrabold text-cyan-400 font-mono">2026</span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Current Focus</span>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 flex flex-col items-center gap-2 cursor-pointer"
            >
              <span className="text-xs font-mono text-zinc-300 tracking-widest uppercase font-bold">Scroll to warp</span>
              <div className="w-[18px] h-[30px] border border-zinc-500 rounded-full flex justify-center pt-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>


        {/* ─── SECTION 2: STICKY TUNNEL EXPERIENCE (scrollYProgress: 0.15 -> 0.62) ─── */}
        <motion.div
          style={{ 
            display: milestonesDisplay,
            opacity: milestonesOpacity,
            y: milestonesY,
            pointerEvents: "none" 
          }}
          className="absolute inset-0 flex flex-col justify-center select-none"
        >
          {/* Header Dashboard Banner */}
          <div 
            className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-6 flex items-center justify-between z-20"
            style={{ pointerEvents: "auto" }}
          >
            <div>
              <h2 className="text-2xl font-extrabold text-zinc-100">Growth Milestones</h2>
            </div>
            
            {/* Year Toggle Bar */}
            <div className="flex gap-2 bg-zinc-950/80 border border-zinc-800/80 p-1.5 rounded-xl backdrop-blur-md">
              {MILESTONES.map((milestone, idx) => (
                <button
                  key={milestone.year}
                  onClick={() => {
                    const targetProgress = 0.30 + (idx / (MILESTONES.length - 1)) * 0.32;
                    scrollToProgress(targetProgress);
                  }}
                  className={`px-4 py-1.5 text-xs font-mono rounded-lg transition-all duration-300 font-bold ${
                    activeMilestone === idx
                      ? "bg-zinc-800 text-white shadow-lg shadow-black/40 border border-zinc-700/50"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  style={{
                    color: activeMilestone === idx ? milestone.color : ""
                  }}
                >
                  {milestone.year}
                </button>
              ))}
            </div>
          </div>

          {/* Milestone Horizontal Track */}
          <div 
            className="w-full flex items-center relative overflow-visible"
            style={{ pointerEvents: "auto" }}
          >
            <motion.div
              style={{ x: horizontalX }}
              className="flex gap-16 pl-[8vw] pr-[50vw] items-center"
            >
              {MILESTONES.map((milestone, idx) => {
                const MilestoneIcon = milestone.icon;
                const isSelected = activeMilestone === idx;

                return (
                  <motion.div
                    key={milestone.year}
                    animate={{
                      scale: isSelected ? 1 : 0.94,
                      opacity: isSelected ? 1 : 0.3
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-[84vw] md:w-[60vw] shrink-0 relative"
                  >
                    {/* Glowing background halo */}
                    <div 
                      className="absolute -inset-1 rounded-[32px] opacity-20 blur-xl transition-all duration-700" 
                      style={{ 
                        background: `radial-gradient(circle at 50% 50%, ${milestone.color}, transparent 65%)`,
                        opacity: isSelected ? 0.32 : 0.05
                      }} 
                    />

                    {/* Standardized Glass Card (optimized 2-column layout to prevent vertical overflow) */}
                    <div className="glass-card border border-zinc-800/60 p-6 md:p-8 relative overflow-hidden rounded-[26px]"
                         style={{ background: "rgba(10, 10, 15, 0.85)", backdropFilter: "blur(20px)" }}>
                      
                      {/* Telemetry Corner indicators */}
                      <span className="absolute top-4 left-6 text-xs text-zinc-400 uppercase tracking-wider font-semibold">{milestone.phase}</span>

                      {/* Responsive Split Columns Grid */}
                      <div className="grid md:grid-cols-2 gap-8 items-start mt-4">
                        
                        {/* Column 1: Info and description */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span 
                              className="text-5xl font-black font-mono leading-none tracking-tighter"
                              style={{
                                color: "transparent",
                                WebkitTextStroke: `1.5px ${milestone.color}`,
                                filter: isSelected ? `drop-shadow(0 0 10px ${milestone.color}40)` : "none"
                              }}
                            >
                              {milestone.year}
                            </span>
                            
                            <div 
                              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl border"
                              style={{
                                background: `${milestone.color}15`,
                                borderColor: `${milestone.color}35`,
                                color: milestone.color
                              }}
                            >
                              <MilestoneIcon />
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{milestone.title}</h3>
                            <p className="text-sm text-zinc-200 font-mono mt-1 font-semibold">{milestone.subtitle}</p>
                          </div>

                          <p className="text-sm text-zinc-100 leading-relaxed font-medium">{milestone.description}</p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {milestone.tech.map((t) => (
                              <span 
                                key={t} 
                                className="tech-tag text-xs px-2.5 py-1 font-semibold"
                                style={{
                                  background: `${milestone.color}10`,
                                  borderColor: `${milestone.color}25`,
                                  color: milestone.color
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Milestones list, Projects connections, Metrics */}
                        <div className="space-y-4">
                          {/* Points checklist */}
                          <div>
                            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-2">Key Accomplishments</span>
                            <ul className="space-y-1.5">
                              {milestone.points.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2.5 text-sm text-zinc-100 font-medium">
                                  <span className="mt-0.5 shrink-0">
                                    <FiGitCommit size={12} style={{ color: milestone.color }} />
                                  </span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Projects and Metrics Row */}
                          <div className="grid grid-cols-2 gap-4 pt-1">
                            {/* Project linkages */}
                            <div>
                              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-2">Projects</span>
                              <div className="space-y-1.5">
                                {milestone.projects.map((proj, pIdx) => (
                                  <div 
                                    key={pIdx} 
                                    className="px-3 py-1.5 bg-zinc-950/80 rounded-lg border border-zinc-900 flex justify-between items-center"
                                  >
                                    <span className="text-xs font-extrabold text-zinc-100 truncate">{proj.name}</span>
                                    <FiArrowUpRight size={10} className="text-zinc-400 shrink-0 ml-1" />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Metrics */}
                            <div>
                              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block mb-2">Key Metrics</span>
                              <div className="grid grid-cols-2 gap-1.5">
                                {milestone.metrics.slice(0, 2).map((m) => (
                                  <div 
                                    key={m.label} 
                                    className="p-1.5 bg-zinc-900/40 border border-zinc-800/40 rounded-lg text-center"
                                  >
                                    <span className="block text-sm font-bold text-white font-mono">{m.value}</span>
                                    <span className="text-[9px] text-zinc-300 block leading-tight truncate font-semibold uppercase">{m.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>


        </motion.div>


        {/* ─── SECTION 3: TECH EVOLUTION SYSTEM (scrollYProgress: 0.62 -> 0.82) ─── */}
        <motion.div
          style={{ 
            display: techDisplay,
            opacity: techOpacity, 
            scale: techScale,
            y: techY,
            pointerEvents: "none" 
          }}
          className="absolute inset-0 flex flex-col justify-center px-6"
        >
          <div 
            className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center"
            style={{ pointerEvents: "auto" }}
          >
            
            {/* Telemetry Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Skill Growth Evolution</h2>
              </div>
            </div>

            {/* Two Column evolution graphs */}
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {TECH_EVOLUTION.map((path, pathIdx) => (
                <div 
                  key={path.category}
                  className="glass-card border border-zinc-800/60 p-6 rounded-[24px] relative overflow-hidden"
                  style={{ background: "rgba(10, 10, 15, 0.85)", backdropFilter: "blur(20px)" }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 blur-[50px] pointer-events-none" />

                  <span className={`text-xs font-mono font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${path.color} block mb-6`}>
                    {path.category}
                  </span>

                  {/* Flow Map Visualizer */}
                  <div className="relative pl-6 space-y-5">
                    {/* Vertical connecting line vector */}
                    <div className="absolute left-[9px] top-3 bottom-3 w-[2px] bg-zinc-800">
                      <motion.div 
                        className={`w-full h-1/2 bg-gradient-to-b ${path.color}`}
                        animate={{ y: ["0%", "100%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    {path.nodes.map((node, nodeIdx) => {
                      const isHovered = activePathNode?.pathIdx === pathIdx && activePathNode?.nodeIdx === nodeIdx;
                      const nodeOpacity = nodeIdx === 0 ? node0Opacity : nodeIdx === 1 ? node1Opacity : node2Opacity;
                      const nodeY = nodeIdx === 0 ? node0Y : nodeIdx === 1 ? node1Y : node2Y;

                      return (
                        <motion.div 
                          key={node.title}
                          className="relative"
                          style={{ opacity: nodeOpacity, y: nodeY }}
                          onMouseEnter={() => setActivePathNode({ pathIdx, nodeIdx })}
                          onMouseLeave={() => setActivePathNode(null)}
                        >
                          {/* Interactive bullet node */}
                          <div className="absolute -left-[23px] top-1.5 z-10">
                            <motion.div 
                              animate={{ 
                                scale: isHovered ? 1.3 : 1,
                                backgroundColor: isHovered ? "#fff" : "rgba(39, 39, 42, 1)" 
                              }}
                              className="w-4 h-4 rounded-full border-2 border-zinc-700 flex items-center justify-center cursor-pointer"
                            >
                              {isHovered && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                            </motion.div>
                          </div>

                          {/* Node info card container */}
                          <div className="pl-3">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-zinc-100">{node.title}</span>
                              <span className="text-xs font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 font-bold">{node.year}</span>
                            </div>
                            <p className="text-sm text-zinc-100 mt-1 leading-relaxed max-w-lg font-medium">{node.desc}</p>

                            {/* Level telemetry progress bar */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3"
                                >
                                  <div className="flex justify-between items-center text-xs font-mono text-zinc-200 mb-1 font-bold">
                                    <span>PROFICIENCY INDEX</span>
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
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive hint */}
            <div className="mt-6 flex justify-center text-center">
              <span className="text-xs text-zinc-400 flex items-center gap-2 font-semibold">
                <FiZap className="text-yellow-400" /> Hover nodes to view skill details
              </span>
            </div>

          </div>
        </motion.div>


        {/* ─── SECTION 4: FUTURE FOCUS / VISION (scrollYProgress: 0.82 -> 1.00) ─── */}
        <motion.div
          style={{ 
            display: futureDisplay,
            opacity: futureOpacity, 
            scale: futureScale,
            y: futureY,
            pointerEvents: "none" 
          }}
          className="absolute inset-0 flex flex-col justify-center px-6"
        >
          <div 
            className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center"
            style={{ pointerEvents: "auto" }}
          >
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="h-[1px] w-6 bg-cyan-500/40" />
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-bold">FUTURE VISION</span>
                <span className="h-[1px] w-6 bg-cyan-500/40" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Current Focus & Horizons</h2>
              <p className="text-zinc-200 text-sm mt-2 font-semibold">Next-generation concepts, architectures, and paradigms currently in build orbit</p>
            </div>

            {/* holographic Card Grid */}
            <div className="grid md:grid-cols-3 gap-6 relative z-10">
              {FUTURE_VISION.map((vision, idx) => {
                const cardOpacity = idx === 0 ? futureCard0Opacity : idx === 1 ? futureCard1Opacity : futureCard2Opacity;
                const cardY = idx === 0 ? futureCard0Y : idx === 1 ? futureCard1Y : futureCard2Y;
                
                return (
                  <motion.div
                    key={vision.title}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="glass-card p-6 md:p-8 rounded-[22px] relative overflow-hidden flex flex-col justify-between"
                    style={{
                      background: "rgba(10, 10, 15, 0.85)",
                      borderColor: vision.borderColor,
                      backdropFilter: "blur(20px)",
                      opacity: cardOpacity,
                      y: cardY
                    }}
                  >
                    {/* Glowing orbital ring backdrop */}
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
                          background: "rgba(0,0,0,0.6)"
                        }}
                      >
                        {vision.tag}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight leading-tight">{vision.title}</h3>
                      <p className="text-sm text-zinc-100 leading-relaxed font-medium">{vision.desc}</p>
                    </div>

                    {/* View icon */}
                    <div className="mt-6 flex justify-end items-center">
                      <FiEye size={14} className="text-zinc-400" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
