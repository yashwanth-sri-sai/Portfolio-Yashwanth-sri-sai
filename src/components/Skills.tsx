"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BorderGlow from "./BorderGlow";
import { 
  FiCpu, 
  FiLayers, 
  FiActivity, 
  FiCode, 
  FiTrendingUp, 
  FiCompass, 
  FiLock,
  FiArrowRight,
  FiTerminal
} from "react-icons/fi";
import { projects } from "@/data/projects";

// Type definitions
interface SkillNode {
  name: string;
  category: string;
  level: number;
  x: number; // Base position coordinate factor (-1 to 1)
  y: number; // Base position coordinate factor (-1 to 1)
  projects: string[]; // Linked project IDs
  details: string; // Brief futuristic explanation
}

interface CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface ConnectionParticle {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

// Category configs
const CATEGORIES = [
  "AI / ML",
  "Frontend",
  "Backend",
  "Databases",
  "Tools & Ecosystem",
  "Cybersecurity & Net"
];

const CATEGORY_STYLES: Record<string, {
  color: string;
  glow: string;
  gradient: string;
  badge: string;
  icon: any;
}> = {
  "AI / ML": {
    color: "#60a5fa", // Cyan/Blue
    glow: "rgba(96, 165, 250, 0.5)",
    gradient: "from-blue-500 to-cyan-500",
    badge: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    icon: FiCpu
  },
  "Frontend": {
    color: "#c084fc", // Purple/Pink
    glow: "rgba(192, 132, 252, 0.5)",
    gradient: "from-purple-500 to-pink-500",
    badge: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    icon: FiCode
  },
  "Backend": {
    color: "#f59e0b", // Orange/Yellow
    glow: "rgba(245, 158, 11, 0.5)",
    gradient: "from-orange-500 to-amber-500",
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    icon: FiTerminal
  },
  "Databases": {
    color: "#818cf8", // Blue/Indigo
    glow: "rgba(129, 140, 248, 0.5)",
    gradient: "from-indigo-500 to-blue-500",
    badge: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    icon: FiLayers
  },
  "Tools & Ecosystem": {
    color: "#34d399", // Green/Emerald
    glow: "rgba(52, 211, 153, 0.5)",
    gradient: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    icon: FiCompass
  },
  "Cybersecurity & Net": {
    color: "#f87171", // Red/Rose
    glow: "rgba(248, 113, 113, 0.5)",
    gradient: "from-red-500 to-rose-500",
    badge: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    icon: FiLock
  }
};

const SKILL_NODES: SkillNode[] = [
  // 1. AI / ML
  { name: "LangChain", category: "AI / ML", level: 90, x: -0.6, y: -0.5, projects: ["agentic-ai", "pdf-chatbot"], details: "Workflow orchestrator for LLMs, memory management, and agentic tool routing." },
  { name: "Gemini AI", category: "AI / ML", level: 88, x: -0.8, y: -0.2, projects: ["agentic-ai"], details: "Google's multimodal large language model for generation, reasoning, and function calling." },
  { name: "Scikit-learn", category: "AI / ML", level: 85, x: -0.5, y: -0.15, projects: ["phishing-detection"], details: "Machine learning suite used for classification models, dataset splits, and performance metrics." },
  { name: "XGBoost", category: "AI / ML", level: 84, x: -0.7, y: -0.45, projects: ["phishing-detection"], details: "Gradient boosted decision trees optimized for speed, scalability, and classification accuracy." },
  { name: "Random Forest", category: "AI / ML", level: 85, x: -0.35, y: -0.3, projects: ["phishing-detection"], details: "Ensemble learning classifier constructing decision trees for domain threat scores." },
  { name: "Computer Vision", category: "AI / ML", level: 80, x: -0.45, y: -0.55, projects: [], details: "Real-time visual processing pipelines using OpenCV and gesture classification." },

  // 2. Frontend
  { name: "React", category: "Frontend", level: 90, x: 0.6, y: -0.5, projects: ["task-management-system"], details: "Modern UI library leveraging dynamic component state management." },
  { name: "HTML", category: "Frontend", level: 95, x: 0.8, y: -0.35, projects: [], details: "Semantic markup structures aligned with high SEO standards." },
  { name: "CSS", category: "Frontend", level: 90, x: 0.45, y: -0.25, projects: [], details: "Responsive design styling sheets supporting advanced keyframe animations." },
  { name: "JavaScript", category: "Frontend", level: 90, x: 0.35, y: -0.5, projects: [], details: "Asynchronous client-side programming supporting interactive components." },

  // 3. Backend
  { name: "FastAPI", category: "Backend", level: 92, x: 0.2, y: 0.45, projects: ["agentic-ai"], details: "Modern, high-performance web framework for building APIs with Python." },
  { name: "Flask", category: "Backend", level: 88, x: 0.4, y: 0.55, projects: ["phishing-detection"], details: "Micro-framework optimized for deploying lightweight machine learning models." },
  { name: "Django", category: "Backend", level: 82, x: 0.3, y: 0.25, projects: [], details: "High-level Python web framework encouraging rapid, clean, and secure design." },
  { name: "REST APIs", category: "Backend", level: 92, x: 0.1, y: 0.55, projects: ["agentic-ai", "phishing-detection"], details: "Secure JSON-based communication endpoints and backend integrations." },

  // 4. Databases
  { name: "FAISS", category: "Databases", level: 90, x: -0.2, y: 0.45, projects: ["agentic-ai", "pdf-chatbot"], details: "Meta's vector similarity library for fast dense embedding searches." },
  { name: "SQL", category: "Databases", level: 88, x: -0.4, y: 0.55, projects: [], details: "Relational query language managing database schema creation and complex queries." },
  { name: "MySQL", category: "Databases", level: 85, x: -0.3, y: 0.25, projects: [], details: "Open-source relational database management system utilizing SQL indexing." },
  { name: "PostgreSQL", category: "Databases", level: 85, x: -0.1, y: 0.35, projects: ["task-management-system"], details: "Advanced open-source relational database supporting heavy concurrent transactions." },
  { name: "SQLite", category: "Databases", level: 88, x: -0.25, y: 0.15, projects: [], details: "Self-contained SQL database engine ideal for localized configuration data." },

  // 5. Tools & Ecosystem
  { name: "Python", category: "Tools & Ecosystem", level: 95, x: 0.7, y: 0.35, projects: ["phishing-detection", "agentic-ai", "pdf-chatbot", "ai-resume-analyzer"], details: "Primary programming language for AI scripting, ML classifiers, and backends." },
  { name: "Java", category: "Tools & Ecosystem", level: 85, x: 0.8, y: 0.5, projects: [], details: "Object-oriented language used for systems programming and data structures." },
  { name: "C++", category: "Tools & Ecosystem", level: 88, x: 0.6, y: 0.25, projects: [], details: "High-performance language utilized to study memory allocation and algorithms." },
  { name: "C", category: "Tools & Ecosystem", level: 85, x: 0.5, y: 0.45, projects: [], details: "Procedural language forming the foundational core of systems computing." },
  { name: "Shell", category: "Tools & Ecosystem", level: 80, x: 0.9, y: 0.25, projects: [], details: "Bash/Unix scripts automating routine tasks and environment configuration." },
  { name: "Git", category: "Tools & Ecosystem", level: 90, x: 0.65, y: 0.1, projects: [], details: "Distributed version control system managing code commits and repository branches." },
  { name: "GitHub", category: "Tools & Ecosystem", level: 90, x: 0.75, y: 0.2, projects: [], details: "Cloud platform hosting source control repositories and CI actions." },
  { name: "VS Code", category: "Tools & Ecosystem", level: 92, x: 0.55, y: 0.35, projects: [], details: "Primary IDE optimized for Python debugging and web integrations." },

  // 6. Cybersecurity / Systems
  { name: "Cyber Security", category: "Cybersecurity & Net", level: 88, x: -0.7, y: 0.35, projects: [], details: "Design of secure architectures, vulnerability auditing, and policy checks." },
  { name: "URL Feature Extraction", category: "Cybersecurity & Net", level: 90, x: -0.8, y: 0.5, projects: ["phishing-detection"], details: "Analyzing address patterns, subdirectory metrics, and host strings." },
  { name: "Domain Feature Extraction", category: "Cybersecurity & Net", level: 88, x: -0.6, y: 0.55, projects: ["phishing-detection"], details: "Interrogating registrar timestamps, WHOIS databases, and DNS records." },
  { name: "AWS", category: "Cybersecurity & Net", level: 85, x: -0.5, y: 0.45, projects: [], details: "Deploying secure, isolated virtual machines and database endpoints." },
  { name: "Jenkins (CI/CD)", category: "Cybersecurity & Net", level: 82, x: -0.9, y: 0.35, projects: [], details: "Automating builds, testing pipelines, and model deployment triggers." }
];

// Telemetry graph waveform component
function TelemetryOscilloscope({ color, category }: { color: string; category: string }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animId: number;
    const tick = () => {
      setTime(prev => prev + 0.12);
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animId);
  }, []);

  const points = [];
  for (let i = 0; i <= 100; i += 1.5) {
    const x = i;
    let y = 30;

    // Generate different telemetry wave patterns depending on active category
    if (category === "AI / ML") {
      // Chaotic complex multi-sine wave (representing neural activity)
      y += Math.sin(i * 0.28 + time * 1.8) * 8 * Math.cos(i * 0.08) + 
           Math.sin(time * 3.2 + i * 0.45) * 3.5 + 
           Math.cos(i * 0.05 + time) * 2;
    } else if (category === "Frontend") {
      // Very smooth, fluid harmonic sine wave (representing UI fluidity)
      y += Math.sin(i * 0.12 + time * 1.4) * 14 * Math.sin(i * 0.02 + time * 0.1);
    } else if (category === "Backend") {
      // Sawtooth/Triangle pulses (representing database transactions and packet requests)
      const period = 12;
      const t = (i - time * 15) % period;
      const progress = t < 0 ? t + period : t;
      y += (progress / period - 0.5) * 22;
    } else if (category === "Databases") {
      // Square step waves with slight noise harmonics (representing binary database reads)
      const block = Math.sin(i * 0.16 + time * 1.2);
      y += (block > 0.05 ? 11 : block < -0.05 ? -11 : 0) + Math.sin(time * 6 + i) * 1.5;
    } else if (category === "Tools & Ecosystem") {
      // High-frequency compound wave (representing build toolchains/pipelines)
      y += Math.sin(i * 0.24 + time * 1.5) * 8 + Math.cos(i * 0.06 - time * 0.8) * 5;
    } else if (category === "Cybersecurity & Net") {
      // Noise-dense, highly compressed FM waves (representing encrypted hash telemetry)
      y += Math.sin(i * 0.75 + time * 3.5) * 5 * Math.sin(i * 0.35 - time * 1.2) * 5 + 
           (Math.sin(i * 1.8 + time * 5) * 2.5);
    } else {
      // Default Waveform
      y += Math.sin(i * 0.18 + time) * 12 * Math.cos(i * 0.06) + Math.sin(time * 2.5 + i * 0.4) * 3;
    }

    // Keep clamped inside drawing bounds
    y = Math.max(4, Math.min(56, y));
    points.push(`${x},${y}`);
  }
  const pathD = `M ${points.join(" L ")}`;

  return (
    <div className="w-full bg-black/40 rounded-xl p-4 border border-white/5 relative overflow-hidden h-24 flex flex-col justify-between">
      <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest relative z-10">
        <span>Signal Frequency ({category})</span>
        <span className="text-emerald-500 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          Stream Active
        </span>
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 60" preserveAspectRatio="none">
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
        <path d={pathD} fill="none" stroke={color} strokeWidth="4" opacity="0.1" />
        <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 4" strokeWidth="0.5" />
      </svg>
      <div className="flex justify-between items-end text-[8px] font-mono text-zinc-500 uppercase tracking-widest relative z-10">
        <span>V_OSC: {(Math.sin(time) * 4 + (category === "AI / ML" ? 24 : category === "Frontend" ? 12 : 16)).toFixed(2)} MHz</span>
        <span>Telemetry Synchronized</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [highlightCategory, setHighlightCategory] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  // Mutable references to bridge variables inside the high-performance Canvas loop
  const selectedNodeRef = useRef<SkillNode | null>(null);
  const hoveredNodeRef = useRef<SkillNode | null>(null);
  const highlightCategoryRef = useRef<string | null>(null);

  // Mutable array of node positions allowing physics manipulations and user drag mutations
  const nodesRef = useRef<Array<SkillNode & {
    baseX: number;
    baseY: number;
    cx: number;
    cy: number;
    floatX: number;
    floatY: number;
  }>>(
    SKILL_NODES.map(node => ({
      ...node,
      baseX: node.x,
      baseY: node.y,
      cx: 0,
      cy: 0,
      floatX: 0,
      floatY: 0
    }))
  );

  const draggedNodeRef = useRef<number | null>(null);

  // Initialize selected node as python by default on mount
  useEffect(() => {
    setSelectedNode(SKILL_NODES[0]);
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Sync states to refs so they are readable inside the requestAnimationFrame loop without reinstantiating the loop
  useEffect(() => { selectedNodeRef.current = selectedNode; }, [selectedNode]);
  useEffect(() => { hoveredNodeRef.current = hoveredNode; }, [hoveredNode]);
  useEffect(() => { highlightCategoryRef.current = highlightCategory; }, [highlightCategory]);

  // Is mobile viewport?
  const isMobile = windowWidth < 1024;

  // Interactive constellation map canvas loop (Desktop Only)
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Track coordinates in canvas space
    let mouse = { x: 0, y: 0, relativeX: 0, relativeY: 0, isDown: false };
    let time = 0;

    // Particle storage lists
    let canvasParticles: CanvasParticle[] = [];
    let connectionParticles: ConnectionParticle[] = [];

    const updateDimensions = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 550;
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      // Convert to -1 to 1 coordinate system
      mouse.relativeX = (mouse.x - width / 2) / (width / 2 * 0.85);
      mouse.relativeY = (mouse.y - height / 2) / (height / 2 * 0.85);

      // Handle node movement when dragging is active
      if (mouse.isDown && draggedNodeRef.current !== null) {
        const node = nodesRef.current[draggedNodeRef.current];
        const newBaseX = (mouse.x - width / 2) / (width / 2 * 0.8);
        const newBaseY = (mouse.y - height / 2) / (height / 2 * 0.8);
        
        // Clamp to stay inside canvas bounds
        node.baseX = Math.max(-1.1, Math.min(1.1, newBaseX));
        node.baseY = Math.max(-1.1, Math.min(1.1, newBaseY));
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouse.isDown = true;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Find closest node to selection pointer (22px selection radius threshold)
      let minDistance = 22;
      let clickedIdx: number | null = null;

      nodesRef.current.forEach((node, idx) => {
        const dist = Math.hypot(clickX - node.cx, clickY - node.cy);
        if (dist < minDistance) {
          minDistance = dist;
          clickedIdx = idx;
        }
      });

      if (clickedIdx !== null) {
        draggedNodeRef.current = clickedIdx;
        setSelectedNode(nodesRef.current[clickedIdx]);
      }
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
      draggedNodeRef.current = null;
    };

    const handleMouseLeave = () => {
      mouse.relativeX = 999;
      mouse.relativeY = 999;
      mouse.isDown = false;
      draggedNodeRef.current = null;
      setHoveredNode(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const run = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Draw background cyber grid coordinates
      ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 0.5;
      const step = 45;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw target HUD crosshair circle in center
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.38, 0, Math.PI * 2);
      ctx.stroke();

      // Project absolute positions and animate continuous floating offset
      nodesRef.current.forEach((node, index) => {
        let cx = width / 2 + node.baseX * (width / 2 * 0.8);
        let cy = height / 2 + node.baseY * (height / 2 * 0.8);

        if (draggedNodeRef.current === index) {
          node.floatX = 0;
          node.floatY = 0;
          // Set absolute coordinate to match mouse exactly when dragging
          cx = mouse.x;
          cy = mouse.y;
        } else {
          // Slow organic continuous drift
          node.floatX = Math.sin(time + index) * 10;
          node.floatY = Math.cos(time + index * 1.4) * 10;
          cx += node.floatX;
          cy += node.floatY;

          // Mouse magnetic pull proximity mechanics (skip when active dragging)
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            const pull = (110 - dist) * 0.15;
            cx += (dx / dist) * pull;
            cy += (dy / dist) * pull;
          }
        }

        node.cx = cx;
        node.cy = cy;
      });

      // Track closest node to mouse for hovers (skip while dragging)
      let minDistance = 18; 
      let closestNode: SkillNode | null = null;
      if (draggedNodeRef.current === null) {
        nodesRef.current.forEach((node) => {
          const dist = Math.hypot(mouse.x - node.cx, mouse.y - node.cy);
          if (dist < minDistance) {
            minDistance = dist;
            closestNode = node;
          }
        });
        setHoveredNode(closestNode);
      }

      // Draw Connection Lines between nodes of same category
      nodesRef.current.forEach((node1, idx1) => {
        nodesRef.current.forEach((node2, idx2) => {
          if (idx2 <= idx1) return;
          if (node1.category !== node2.category) return;

          const activeCat = highlightCategoryRef.current;
          const hovNode = hoveredNodeRef.current;
          const selNode = selectedNodeRef.current;

          const isHighlightedCategory = activeCat === node1.category || 
            (hovNode && hovNode.category === node1.category) ||
            (selNode && selNode.category === node1.category);

          const styles = CATEGORY_STYLES[node1.category];
          ctx.beginPath();
          ctx.moveTo(node1.cx, node1.cy);
          ctx.lineTo(node2.cx, node2.cy);

          if (isHighlightedCategory) {
            ctx.strokeStyle = styles.color;
            ctx.globalAlpha = 0.28;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Animated light pulse traversing the line
            ctx.save();
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = styles.color;
            const pulseProgress = (time * 0.8 + idx1 + idx2) % 1;
            const px = node1.cx + (node2.cx - node1.cx) * pulseProgress;
            const py = node1.cy + (node2.cy - node1.cy) * pulseProgress;
            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Randomly spawn traverse particles along active paths
            if (Math.random() < 0.005) {
              connectionParticles.push({
                x1: node1.cx,
                y1: node1.cy,
                x2: node2.cx,
                y2: node2.cy,
                progress: 0,
                speed: 0.008 + Math.random() * 0.012,
                color: styles.color,
                size: 1 + Math.random() * 1.5
              });
            }
          } else {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Update and Draw connection spark particles traversing lines
      connectionParticles.forEach((p) => {
        p.progress += p.speed;
        const px = p.x1 + (p.x2 - p.x1) * p.progress;
        const py = p.y1 + (p.y2 - p.y1) * p.progress;
        
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      connectionParticles = connectionParticles.filter(p => p.progress < 1);

      // Spawn ambient particles around hovered & selected nodes
      const activeSel = selectedNodeRef.current;
      const activeHov = hoveredNodeRef.current;

      if (activeSel) {
        const selObj = nodesRef.current.find(n => n.name === activeSel.name);
        if (selObj && Math.random() < 0.2) {
          const styles = CATEGORY_STYLES[selObj.category];
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.15 + Math.random() * 0.45;
          canvasParticles.push({
            x: selObj.cx,
            y: selObj.cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 50 + Math.random() * 40,
            color: styles.color,
            size: 0.8 + Math.random() * 1.2
          });
        }
      }
      if (activeHov) {
        const hovObj = nodesRef.current.find(n => n.name === activeHov.name);
        if (hovObj && Math.random() < 0.3) {
          const styles = CATEGORY_STYLES[hovObj.category];
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.3 + Math.random() * 0.75;
          canvasParticles.push({
            x: hovObj.cx,
            y: hovObj.cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 40 + Math.random() * 30,
            color: styles.color,
            size: 1.0 + Math.random() * 1.5
          });
        }
      }

      // Draw and update ambient particles
      canvasParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;
        const alpha = 1 - p.life / p.maxLife;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      canvasParticles = canvasParticles.filter(p => p.life < p.maxLife);

      // Draw Nodes
      nodesRef.current.forEach((node) => {
        const isHovered = activeHov?.name === node.name;
        const isSelected = activeSel?.name === node.name;
        const isCatActive = highlightCategoryRef.current === node.category || 
          (activeHov && activeHov.category === node.category) ||
          (activeSel && activeSel.category === node.category);

        const styles = CATEGORY_STYLES[node.category];

        // Draw radial glowing shadow
        if (isHovered || isSelected) {
          const grad = ctx.createRadialGradient(node.cx, node.cy, 1, node.cx, node.cy, 24);
          grad.addColorStop(0, styles.color);
          grad.addColorStop(0.3, styles.color);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.save();
          ctx.globalAlpha = isHovered ? 0.35 : 0.22;
          ctx.beginPath();
          ctx.arc(node.cx, node.cy, 24, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Base node circle
        ctx.beginPath();
        ctx.arc(node.cx, node.cy, isHovered ? 7.5 : 5, 0, Math.PI * 2);
        ctx.fillStyle = isHovered || isSelected ? "#ffffff" : styles.color;
        ctx.globalAlpha = isCatActive || isHovered || isSelected ? 1 : 0.45;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw outer ring for selected node
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.cx, node.cy, 11, 0, Math.PI * 2);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw label text
        ctx.font = isSelected ? "bold 10px JetBrains Mono" : "10px Inter";
        ctx.fillStyle = isHovered || isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.4)";
        ctx.globalAlpha = isCatActive || isHovered || isSelected ? 1 : 0.3;
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.cx, node.cy - 12);
        ctx.globalAlpha = 1;
      });

      // Draw Cursor Reticle HUD overlay (when inside Canvas bounds)
      if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 6]);
        
        // Horizontal scan line
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();
        
        // Vertical scan line
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // Hover target ring
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
        ctx.stroke();
        
        // HUD targeting brackets around pointer
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        // Top-left bracket
        ctx.beginPath(); 
        ctx.moveTo(mouse.x - 20, mouse.y - 5); 
        ctx.lineTo(mouse.x - 20, mouse.y - 20); 
        ctx.lineTo(mouse.x - 5, mouse.y - 20); 
        ctx.stroke();
        // Bottom-right bracket
        ctx.beginPath(); 
        ctx.moveTo(mouse.x + 20, mouse.y + 5); 
        ctx.lineTo(mouse.x + 20, mouse.y + 20); 
        ctx.lineTo(mouse.x + 5, mouse.y + 20); 
        ctx.stroke();
        
        // Dynamic coordinate readout next to cursor
        ctx.font = "8px JetBrains Mono";
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.textAlign = "left";
        ctx.fillText(`SYS_X: ${mouse.relativeX.toFixed(3)}`, mouse.x + 28, mouse.y - 6);
        ctx.fillText(`SYS_Y: ${mouse.relativeY.toFixed(3)}`, mouse.x + 28, mouse.y + 6);
      }

      // Draw Sci-Fi corner frames
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      const pad = 15;
      const cornerLen = 12;

      // Top-left
      ctx.beginPath(); ctx.moveTo(pad, pad + cornerLen); ctx.lineTo(pad, pad); ctx.lineTo(pad + cornerLen, pad); ctx.stroke();
      // Top-right
      ctx.beginPath(); ctx.moveTo(width - pad, pad + cornerLen); ctx.lineTo(width - pad, pad); ctx.lineTo(width - pad - cornerLen, pad); ctx.stroke();
      // Bottom-left
      ctx.beginPath(); ctx.moveTo(pad, height - pad - cornerLen); ctx.lineTo(pad, height - pad); ctx.lineTo(pad + cornerLen, height - pad); ctx.stroke();
      // Bottom-right
      ctx.beginPath(); ctx.moveTo(width - pad, height - pad - cornerLen); ctx.lineTo(width - pad, height - pad); ctx.lineTo(width - pad - cornerLen, height - pad); ctx.stroke();
      
      // Decorative HUD indicators in corners
      ctx.font = "7px JetBrains Mono";
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.textAlign = "left";
      ctx.fillText("GRID_MUTATION: ENABLED", pad + 16, pad + 10);
      ctx.textAlign = "right";
      ctx.fillText("FPS: 60_SECURE", width - pad - 16, pad + 10);
      ctx.textAlign = "left";
      ctx.fillText("VECTOR_FIELD: COORDS_ACTIVE", pad + 16, height - pad - 6);
      ctx.textAlign = "right";
      ctx.fillText("NEURAL_TEMPS: 28C", width - pad - 16, height - pad - 6);

      animId = requestAnimationFrame(run);
    };

    run();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  // Selected skill node linked projects objects
  const activeProjects = selectedNode
    ? projects.filter(p => selectedNode.projects.includes(p.id))
    : [];

  const activeCategoryStyle = selectedNode ? CATEGORY_STYLES[selectedNode.category] : CATEGORY_STYLES["AI / ML"];
  const ActiveIconComponent = activeCategoryStyle.icon;

  return (
    <section id="skills" className="section-padding relative overflow-hidden min-h-screen bg-[#010103]">
      
      {/* ─── Glow Ambient Blobs ─── */}
      <div className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />

      {/* Cyber Grid Background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ─── SECTION 1: CINEMATIC HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          {/* Futuristic Telemetry Title Banner */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500/30" />
            <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">SYS_INDEX: ENG_DEPT</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500/30" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-5 tracking-widest uppercase"
          >
            <FiCpu className="animate-spin-slow" />
            Technical Arsenal
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight"
          >
            Core Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Ecosystem
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base leading-[1.8] font-sans"
          >
            Building intelligent systems with modern technologies, scalable architectures, and immersive user experiences.
          </motion.p>
        </div>

        {/* ─── Category Selection Filters ─── */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat, i) => {
            const styles = CATEGORY_STYLES[cat];
            const Icon = styles.icon;
            const isActive = highlightCategory === cat || (selectedNode && selectedNode.category === cat);
            return (
              <button
                key={i}
                onMouseEnter={() => !isMobile && setHighlightCategory(cat)}
                onMouseLeave={() => !isMobile && setHighlightCategory(null)}
                onClick={() => {
                  setHighlightCategory(cat);
                  // Auto-select first node of this category
                  const firstNode = SKILL_NODES.find(n => n.category === cat);
                  if (firstNode) setSelectedNode(firstNode);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? `bg-zinc-950 border-white/20 text-white shadow-lg` 
                    : "bg-zinc-900/30 border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                }`}
              >
                <Icon style={{ color: isActive ? styles.color : "inherit" }} />
                {cat}
              </button>
            );
          })}
        </div>

        {/* ─── SECTION 2: INTERACTIVE VISUALIZATION HUB ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-24">
          
          {/* Left Column: Interactive Constellation Map */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl glass-card border border-white/10 bg-zinc-950/20 relative min-h-[480px] lg:min-h-[550px] overflow-hidden p-6">
            
            {/* Visual Header overlay inside canvas */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1 text-left font-mono pointer-events-none select-none">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                CONSTELLATION: CORE_SYS_v2.8
              </span>
              <span className="text-[9px] text-zinc-600">DRAG & DRAG NODES TO CUSTOM MAP CONFIGS</span>
            </div>

            {/* Desktop Canvas visualization */}
            {!isMobile ? (
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing" />
            ) : (
              // Mobile touch grid list representation
              <div className="grid grid-cols-2 gap-3 mt-12 z-20 overflow-y-auto max-h-[460px] pr-1">
                {SKILL_NODES.map((node, i) => {
                  const styles = CATEGORY_STYLES[node.category];
                  const isSelected = selectedNode?.name === node.name;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedNode(node)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between h-24 ${
                        isSelected 
                          ? "bg-zinc-950 border-white/20 shadow-lg text-white" 
                          : "bg-zinc-900/40 border-white/5 text-zinc-400"
                      }`}
                    >
                      <span className="text-[8px] font-mono uppercase tracking-widest" style={{ color: styles.color }}>
                        {node.category}
                      </span>
                      <h4 className="text-sm font-bold truncate mt-1">{node.name}</h4>
                      <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 mt-2">
                        <span>Depth</span>
                        <span className="font-bold text-white">{node.level}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tooltip detail overlay inside canvas (desktop) */}
            {!isMobile && hoveredNode && (
              <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] text-zinc-500 p-2.5 rounded bg-black/60 border border-white/5 pointer-events-none uppercase tracking-widest flex flex-col gap-0.5 text-left">
                <span>SKILL NODE: {hoveredNode.name}</span>
                <span>CATEGORY: {hoveredNode.category}</span>
                <span>DEPTH: {hoveredNode.level}%</span>
              </div>
            )}
          </div>

          {/* Right Column: Cyber Telemetry HUD Inspector */}
          <div className="lg:col-span-5 flex min-w-0">
            <BorderGlow 
              className="w-full relative p-8" 
              innerClassName="flex flex-col justify-between text-left w-full" 
              borderRadius={24} backgroundColor="#09090b">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.01] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              {selectedNode ? (
                <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                  {/* Category & Badge Header */}
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-mono uppercase tracking-widest ${activeCategoryStyle.badge}`}>
                        <ActiveIconComponent />
                        <span>{selectedNode.category}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                        NODE telemetry
                      </span>
                    </div>

                    {/* Skill Info */}
                    <div className="space-y-2 mb-6">
                      <h3 className="text-3xl font-extrabold text-white tracking-tight uppercase">
                        {selectedNode.name}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-sans min-h-[60px]">
                        {selectedNode.details}
                      </p>
                    </div>

                    {/* SECTION 3: SKILL DEPTH RADIAL HUD */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-4 border-y border-white/5 mb-6">
                      <div className="sm:col-span-4 flex justify-center">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <defs>
                              <linearGradient id="selectedSkillGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={activeCategoryStyle.color} />
                                <stop offset="100%" stopColor="#ffffff" />
                              </linearGradient>
                            </defs>
                            {/* Base Track */}
                            <circle cx="50" cy="50" r="38" stroke="rgba(255,255,255,0.02)" strokeWidth="4" fill="none" />
                            {/* Animated Level Arc */}
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              stroke="url(#selectedSkillGlow)"
                              strokeWidth="5"
                              fill="none"
                              strokeDasharray={2 * Math.PI * 38}
                              strokeDashoffset={2 * Math.PI * 38 * (1 - selectedNode.level / 100)}
                              strokeLinecap="round"
                              className="transition-all duration-1000 ease-out"
                            />
                            {/* Inner dashboard lines */}
                            <circle cx="50" cy="50" r="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />
                            {/* Rotating HUD outer ticks */}
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="44" 
                              stroke={activeCategoryStyle.color} 
                              strokeWidth="0.75" 
                              strokeDasharray="4 8" 
                              fill="none" 
                              opacity="0.25"
                              style={{ transformOrigin: "center", animation: "spin 15s linear infinite" }}
                            />
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="46" 
                              stroke="rgba(255,255,255,0.08)" 
                              strokeWidth="0.5" 
                              strokeDasharray="1 4" 
                              fill="none"
                              style={{ transformOrigin: "center", animation: "spin-reverse 20s linear infinite" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                            <span className="text-lg font-extrabold text-white leading-none">{selectedNode.level}%</span>
                            <span className="text-[7px] text-zinc-500 uppercase tracking-widest mt-1">CAPACITY</span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-8 space-y-3">
                        <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase tracking-wider">
                          <FiActivity className="text-blue-400" />
                          <span>Network Diagnostics</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-2 rounded bg-white/5 border border-white/5 text-left">
                            <span className="text-[8px] font-mono text-zinc-500 block mb-0.5 uppercase">STABILITY</span>
                            <span className="text-xs font-bold text-emerald-400 font-mono">99.98%</span>
                          </div>
                          <div className="p-2 rounded bg-white/5 border border-white/5 text-left">
                            <span className="text-[8px] font-mono text-zinc-500 block mb-0.5 uppercase">RETENTION</span>
                            <span className="text-xs font-bold text-white font-mono">CORE_VAL</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: TELEMETRY REACTIVE OSCILLOSCOPE WAVE */}
                    <div className="mb-6">
                      <TelemetryOscilloscope color={activeCategoryStyle.color} category={selectedNode.category} />
                    </div>
                  </div>

                  {/* SECTION 5: LINKED PROJECTS CONNECTIONS */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-3.5">
                      CONNECTED PROJECTS SHOWCASE ({activeProjects.length})
                    </span>
                    {activeProjects.length > 0 ? (
                      <div className="space-y-2">
                        {activeProjects.map((proj, i) => (
                          <Link
                            key={i}
                            href={`/projects/${proj.id}`}
                            className="group/link flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                          >
                            <div className="text-left">
                              <span className="text-[9px] font-mono text-blue-400 block mb-0.5 uppercase">{proj.category}</span>
                              <h4 className="text-xs font-bold text-white group-hover/link:text-blue-300 transition-colors">{proj.title}</h4>
                            </div>
                            <span className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 group-hover/link:bg-blue-600 group-hover/link:text-white transition-colors">
                              <FiArrowRight className="text-xs" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl border border-dashed border-white/10 text-center font-mono text-[9px] text-zinc-500">
                        NO PROJECTS CURRENTLY ASSIGNED // CONCEPTUAL DEPLOYMENT
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center text-center font-mono py-12">
                  <FiCpu className="text-3xl text-zinc-700 animate-bounce mb-3" />
                  <span className="text-xs text-zinc-500">NEURAL CORE INACTIVE</span>
                  <span className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">Select a skill node to inspect metrics</span>
                </div>
              )}
            </BorderGlow>
          </div>
        </div>

        {/* ─── SECTION 6: CURRENTLY EXPLORING / ROADMAP ─── */}
        <div className="mt-20">
          <div className="text-left mb-10 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-2">
              03 // FUTURE EXPLORATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Currently Learning & Exploring
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {[
              { title: "LLM Applications", status: "Active Ingestion", progress: "88%", desc: "Building local RAG endpoints and LLM analytical routers.", color: "from-blue-500 to-indigo-500" },
              { title: "AI Agents", status: "Agentic Loop", progress: "80%", desc: "Orchestrating CrewAI and LangGraph multi-agent loop pipelines.", color: "from-cyan-500 to-blue-500" },
              { title: "RAG Systems", status: "Optimizing Vector", progress: "92%", desc: "Fine-tuning chunking parameters and semantic metadata indexing.", color: "from-indigo-500 to-purple-500" },
              { title: "React Physics Animations", status: "UI Crafting", progress: "75%", desc: "Crafting fluid custom web interaction states.", color: "from-purple-500 to-pink-500" },
              { title: "Scalable AI Systems", status: "Database Pools", progress: "70%", desc: "Routing parallel analytics through cached DB endpoints.", color: "from-pink-500 to-red-500" }
            ].map((explore, idx) => {
              const totalBlocks = 10;
              const percentNum = parseInt(explore.progress);
              const activeBlocks = Math.round((percentNum / 100) * totalBlocks);

              return (
                <div
                  key={idx}
                  className="px-8 py-6 rounded-2xl glass-card border border-white/5 hover:border-blue-500/10 bg-zinc-950/20 transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between h-[175px] group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.01] rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wide truncate max-w-[70%]">
                        {explore.status}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-white bg-white/5 border border-white/5 px-2 py-0.5 rounded shrink-0">
                        {explore.progress}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-100 mb-1.5 truncate">{explore.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">{explore.desc}</p>
                  </div>
                  
                  {/* Segmented hardware indicator block replaces traditional progress bar */}
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: totalBlocks }).map((_, bIdx) => {
                      const isLit = bIdx < activeBlocks;
                      return (
                        <div 
                          key={bIdx}
                          className={`h-2 flex-1 rounded-sm border transition-all duration-500 ${
                            isLit 
                              ? `bg-gradient-to-r ${explore.color} border-white/10 shadow-[0_0_8px_rgba(96,165,250,0.35)]` 
                              : "bg-zinc-950 border-white/5"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
