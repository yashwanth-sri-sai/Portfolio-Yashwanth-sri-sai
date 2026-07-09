"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCpu, 
  FiLayers, 
  FiCode, 
  FiTerminal, 
  FiLock, 
  FiDatabase, 
  FiSearch, 
  FiFilter, 
  FiExternalLink, 
  FiAward, 
  FiBookOpen, 
  FiX,
  FiArrowUpRight,
  FiActivity
} from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import BorderGlow from "./BorderGlow";

interface GraphNode {
  id: string;
  name: string;
  domain: "AI Engineering" | "Backend Engineering" | "Frontend Engineering" | "Cloud & DevOps" | "Databases" | "Security";
  level: "Proficient" | "Advanced" | "Intermediate";
  description: string;
  x: number; // Pre-calculated coordinate mapping for beautiful clusters
  y: number;
  projects: { name: string; id: string }[];
  certs: { name: string; linkId: string }[];
  articles: { name: string; slug: string }[];
  related: string[];
}

const DOMAIN_COLORS = {
  "AI Engineering": "#60a5fa",
  "Backend Engineering": "#c084fc",
  "Frontend Engineering": "#38bdf8",
  "Cloud & DevOps": "#fbbf24",
  "Databases": "#06b6d4",
  "Security": "#f87171"
};

const DOMAIN_ICONS = {
  "AI Engineering": FiCpu,
  "Backend Engineering": FiLayers,
  "Frontend Engineering": FiCode,
  "Cloud & DevOps": FiTerminal,
  "Databases": FiDatabase,
  "Security": FiLock
};

const SKILL_NODES: GraphNode[] = [
  // --- AI ENGINEERING ---
  {
    id: "generative-ai",
    name: "Generative AI",
    domain: "AI Engineering",
    level: "Proficient",
    description: "Developing systems with structured prompt chaining, semantic validation, and adaptive LLM completions.",
    x: 20, y: 25,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "Agentic AI/RAG Assistant", id: "projects" }
    ],
    certs: [
      { name: "Fundamentals of Prompt Engineering with Claude", linkId: "certifications" }
    ],
    articles: [
      { name: "RAG Pipeline Architecture Guidelines", slug: "rag-pipeline-architecture" }
    ],
    related: ["RAG Systems", "AI Agents", "Large Language Models"],
  },
  {
    id: "rag-systems",
    name: "RAG Systems",
    domain: "AI Engineering",
    level: "Proficient",
    description: "Retrieval-Augmented Generation implementing semantic token overlaps, dynamic context routing, and text search integrations.",
    x: 14, y: 35,
    projects: [
      { name: "Agentic AI/RAG Assistant", id: "projects" },
      { name: "Generative AI Multi-PDF Chatbot", id: "projects" }
    ],
    certs: [
      { name: "Automating with AI/ML", linkId: "certifications" }
    ],
    articles: [
      { name: "RAG Pipeline Architecture Guidelines", slug: "rag-pipeline-architecture" }
    ],
    related: ["Generative AI", "Vector Databases", "Embeddings"],
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    domain: "AI Engineering",
    level: "Proficient",
    description: "Autonomous task-routing architectures leveraging intent classification routers and multi-model workspaces.",
    x: 26, y: 35,
    projects: [
      { name: "Agentic AI/RAG Assistant", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Generative AI", "LangChain"],
  },
  {
    id: "langchain",
    name: "LangChain",
    domain: "AI Engineering",
    level: "Advanced",
    description: "Orchestrating agent workflows, memory systems, and secure semantic integrations.",
    x: 28, y: 20,
    projects: [
      { name: "Agentic AI/RAG Assistant", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["AI Agents", "Large Language Models"],
  },
  {
    id: "large-language-models",
    name: "LLMs",
    domain: "AI Engineering",
    level: "Advanced",
    description: "Model integration utilizing Gemini, GPT, and Claude inference contexts with optimized response parsing.",
    x: 20, y: 15,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "AI Resume Analyzer", id: "projects" }
    ],
    certs: [
      { name: "Fundamentals of Prompt Engineering with Claude", linkId: "certifications" }
    ],
    articles: [],
    related: ["Generative AI", "LangChain"],
  },
  {
    id: "embeddings",
    name: "Embeddings",
    domain: "AI Engineering",
    level: "Intermediate",
    description: "Semantic vectors processing to query context matching clusters across dynamic knowledge bases.",
    x: 12, y: 22,
    projects: [
      { name: "Generative AI Multi-PDF Chatbot", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["RAG Systems"],
  },

  // --- DATABASES ---
  {
    id: "vector-databases",
    name: "Vector Databases",
    domain: "Databases",
    level: "Advanced",
    description: "Vector indexing and semantic searches using FAISS indices and vector dimensions mappings.",
    x: 50, y: 25,
    projects: [
      { name: "Agentic AI/RAG Assistant", id: "projects" },
      { name: "Generative AI Multi-PDF Chatbot", id: "projects" }
    ],
    certs: [],
    articles: [
      { name: "RAG Pipeline Architecture Guidelines", slug: "rag-pipeline-architecture" }
    ],
    related: ["RAG Systems", "Databases"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    domain: "Databases",
    level: "Advanced",
    description: "Transactional databases layout, relational query tuning, and index optimizations.",
    x: 58, y: 35,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "Full-Stack Task Manager", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Databases", "FastAPI"],
  },
  {
    id: "databases",
    name: "Databases",
    domain: "Databases",
    level: "Advanced",
    description: "Data modeling, schema normalizations, and transactional consistency models.",
    x: 50, y: 38,
    projects: [
      { name: "Full-Stack Task Manager", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["PostgreSQL", "Vector Databases"],
  },

  // --- BACKEND ENGINEERING ---
  {
    id: "python",
    name: "Python",
    domain: "Backend Engineering",
    level: "Proficient",
    description: "Primary engineering language for backend APIs, data simulators, and ML processing.",
    x: 40, y: 55,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "FastAPI GitHub Repo Tracker", id: "projects" }
    ],
    certs: [
      { name: "Automating with AI/ML", linkId: "certifications" }
    ],
    articles: [],
    related: ["FastAPI", "REST APIs", "Node.js"],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    domain: "Backend Engineering",
    level: "Proficient",
    description: "Asynchronous Python services execution with structured data parsing and auto-telemetry docs.",
    x: 48, y: 56,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "FastAPI GitHub Repo Tracker", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Python", "REST APIs"],
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    domain: "Backend Engineering",
    level: "Proficient",
    description: "Designing structured, rate-limited backend endpoints utilizing clean MVC hierarchies.",
    x: 42, y: 68,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "FastAPI GitHub Repo Tracker", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["FastAPI", "Authentication"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    domain: "Backend Engineering",
    level: "Advanced",
    description: "Backend execution environments for Express microservices and utility script pipelines.",
    x: 36, y: 46,
    projects: [
      { name: "Full-Stack Task Manager", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Python", "JavaScript"],
  },
  {
    id: "system-design",
    name: "System Design",
    domain: "Backend Engineering",
    level: "Advanced",
    description: "Designing modular API patterns, transaction safeguards, and isolated backend services.",
    x: 48, y: 46,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["REST APIs", "Cloud & DevOps"],
  },

  // --- FRONTEND ENGINEERING ---
  {
    id: "nextjs",
    name: "Next.js",
    domain: "Frontend Engineering",
    level: "Proficient",
    description: "Modern App Router setups, Server Component pipelines, and optimized static rendering configurations.",
    x: 76, y: 25,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "Enterprise HR Portal & Dashboard", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["React", "TypeScript"],
  },
  {
    id: "react",
    name: "React",
    domain: "Frontend Engineering",
    level: "Proficient",
    description: "Component modularity, optimized custom hooks, state handlers, and concurrent rendering hooks.",
    x: 85, y: 20,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "Enterprise HR Portal & Dashboard", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Next.js", "UI Engineering"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    domain: "Frontend Engineering",
    level: "Proficient",
    description: "Type structures, generics configuration, and build-time safety guards.",
    x: 82, y: 34,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "Enterprise HR Portal & Dashboard", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Next.js", "JavaScript"],
  },
  {
    id: "ui-engineering",
    name: "UI Engineering",
    domain: "Frontend Engineering",
    level: "Advanced",
    description: "Liquid layouts, responsive animations, and tactile click feedbacks.",
    x: 88, y: 30,
    projects: [
      { name: "SalesForge Intelligence Dashboard", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["React", "Tailwind CSS"],
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    domain: "Frontend Engineering",
    level: "Advanced",
    description: "Utility CSS frameworks execution, clean media query spacing layouts, and unified design themes.",
    x: 84, y: 44,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "Enterprise HR Portal & Dashboard", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["UI Engineering"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    domain: "Frontend Engineering",
    level: "Intermediate",
    description: "ES6 async controls, canvas drawing loops, and document object models routing.",
    x: 74, y: 40,
    projects: [
      { name: "Enterprise HR Portal & Dashboard", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["TypeScript", "Node.js"],
  },

  // --- CLOUD & DEVOPS ---
  {
    id: "cicd",
    name: "CI/CD",
    domain: "Cloud & DevOps",
    level: "Proficient",
    description: "Automated pipelines setups with Docker staging builds and Git checks.",
    x: 70, y: 55,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Deployment", "Docker"],
  },
  {
    id: "deployment",
    name: "Deployment",
    domain: "Cloud & DevOps",
    level: "Proficient",
    description: "Vercel edge triggers, serverless route deployments, and hosting APIs on cloud endpoints.",
    x: 64, y: 62,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "FastAPI GitHub Repo Tracker", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["CI/CD", "AWS"],
  },
  {
    id: "aws",
    name: "AWS",
    domain: "Cloud & DevOps",
    level: "Advanced",
    description: "Cloud compute nodes, S3 buckets asset storage, and serverless hosting functions.",
    x: 62, y: 50,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Deployment", "Docker"],
  },
  {
    id: "docker",
    name: "Docker",
    domain: "Cloud & DevOps",
    level: "Advanced",
    description: "Containerization configurations, Dockerfiles composition, and modular build steps.",
    x: 68, y: 46,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["AWS", "CI/CD"],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    domain: "Cloud & DevOps",
    level: "Intermediate",
    description: "Basic container pods architecture, service clusters networking, and cluster scalability configurations.",
    x: 60, y: 40,
    projects: [],
    certs: [],
    articles: [],
    related: ["Docker"],
  },

  // --- SECURITY ---
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    domain: "Security",
    level: "Proficient",
    description: "Academic focus path specializing in network encryption, system defense boundaries, and secure protocols.",
    x: 22, y: 78,
    projects: [],
    certs: [
      { name: "Cybersecurity Analyst", linkId: "certifications" }
    ],
    articles: [
      { name: "Phishing Website Detection ML System Analysis", slug: "phishing-detection-ml-system" }
    ],
    related: ["Secure Development", "AI Security"],
  },
  {
    id: "secure-development",
    name: "Secure Development",
    domain: "Security",
    level: "Proficient",
    description: "Applying validation loops, guarding input parameters, and utilizing cors validation schemes.",
    x: 32, y: 75,
    projects: [
      { name: "Phishing Website Detection System", id: "projects" }
    ],
    certs: [],
    articles: [
      { name: "Phishing Website Detection ML System Analysis", slug: "phishing-detection-ml-system" }
    ],
    related: ["Cybersecurity", "Authentication"],
  },
  {
    id: "authentication",
    name: "Authentication",
    domain: "Security",
    level: "Proficient",
    description: "HttpOnly cookies setup, JWT tokens validations, and session state safety layers.",
    x: 75, y: 70,
    projects: [
      { name: "AI-Powered Smart Note Taking SaaS", id: "projects" },
      { name: "Full-Stack Task Manager", id: "projects" }
    ],
    certs: [],
    articles: [],
    related: ["Secure Development", "REST APIs"],
  },
  {
    id: "ai-security",
    name: "AI Security",
    domain: "Security",
    level: "Advanced",
    description: "Mitigating model vulnerabilities, evaluating input prompts, and defending datasets integrity.",
    x: 18, y: 68,
    projects: [
      { name: "Phishing Website Detection System", id: "projects" }
    ],
    certs: [],
    articles: [
      { name: "Phishing Website Detection ML System Analysis", slug: "phishing-detection-ml-system" }
    ],
    related: ["Cybersecurity", "Model Protection"],
  },
  {
    id: "model-protection",
    name: "Model Protection",
    domain: "Security",
    level: "Advanced",
    description: "Securing machine learning model endpoints against injection exploits and inference extraction loops.",
    x: 12, y: 72,
    projects: [
      { name: "Phishing Website Detection System", id: "projects" }
    ],
    certs: [],
    articles: [
      { name: "Phishing Website Detection ML System Analysis", slug: "phishing-detection-ml-system" }
    ],
    related: ["AI Security"],
  }
];

export default function Skills() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const handleHighlightSkill = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.skillId) {
        const matched = SKILL_NODES.find(
          (n) => n.id === detail.skillId || n.name.toLowerCase() === detail.skillId.toLowerCase()
        );
        if (matched) {
          setSelectedNode(matched);
          setSelectedDomain("All");
          setSearchQuery("");
          scrollToSection("skills");
        }
      }
    };
    window.addEventListener("highlight-skill-node", handleHighlightSkill);
    return () => window.removeEventListener("highlight-skill-node", handleHighlightSkill);
  }, []);

  // Filter & Search matching logic
  const filteredNodes = useMemo(() => {
    return SKILL_NODES.filter((node) => {
      const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            node.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDomain = selectedDomain === "All" || node.domain === selectedDomain;
      return matchesSearch && matchesDomain;
    });
  }, [searchQuery, selectedDomain]);

  // Compute graph edges dynamically based on related items mapping
  const edges = useMemo(() => {
    const list: { from: GraphNode; to: GraphNode; id: string }[] = [];
    const visited = new Set<string>();

    SKILL_NODES.forEach((node) => {
      node.related.forEach((relName) => {
        const target = SKILL_NODES.find((n) => n.name === relName);
        if (target) {
          const edgeId = [node.id, target.id].sort().join("-");
          if (!visited.has(edgeId)) {
            visited.add(edgeId);
            list.push({ from: node, to: target, id: edgeId });
          }
        }
      });
    });
    return list;
  }, []);

  // Smooth scroll trigger
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        // @ts-expect-error: lenis global type is incomplete
        window.lenis.scrollTo(element, { offset: -50 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Helper check if a node is currently highlighted (either matches filter/search or selected/hovered link)
  const isNodeHighlighted = (node: GraphNode) => {
    // If there is active search or domain filter
    if (searchQuery !== "" || selectedDomain !== "All") {
      return filteredNodes.some((n) => n.id === node.id);
    }
    // If a node is selected or hovered, highlight it and its directly connected nodes
    const active = hoveredNode || selectedNode;
    if (active) {
      return active.id === node.id || active.related.includes(node.name) || node.related.includes(active.name);
    }
    return true; // default state
  };

  const isEdgeHighlighted = (edge: { from: GraphNode; to: GraphNode }) => {
    const active = hoveredNode || selectedNode;
    if (active) {
      return (edge.from.id === active.id || edge.to.id === active.id) &&
             (isNodeHighlighted(edge.from) && isNodeHighlighted(edge.to));
    }
    if (searchQuery !== "" || selectedDomain !== "All") {
      return isNodeHighlighted(edge.from) && isNodeHighlighted(edge.to);
    }
    return true;
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-black py-24" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-900/[0.03] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-purple-900/[0.03] blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-5 tracking-widest uppercase select-none"
          >
            <FiActivity className="animate-pulse" /> Engineering Ecosystem
          </motion.div>
          <SectionHeading
            title="Technical Expertise"
            subtitle="An interactive knowledge graph demonstrating my tech stack and where I have applied them."
            align="center"
          />
        </div>

        {/* --- CONTROLS: SEARCH & FILTERS --- */}
        <div className="space-y-5 max-w-4xl mx-auto mb-12 relative z-20">
          {/* Search Field */}
          <div className="relative max-w-md mx-auto">
            <span className="absolute inset-y-0 left-4 flex items-center text-zinc-500">
              <FiSearch size={16} />
            </span>
            <input
              type="text"
              placeholder="Search engineering capabilities (e.g. FastAPI, RAG, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full border border-white/5 bg-zinc-950/60 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs font-mono transition-all duration-300"
              aria-label="Search skills"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-white"
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Glass Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {["All", "AI Engineering", "Backend Engineering", "Frontend Engineering", "Cloud & DevOps", "Databases", "Security"].map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3.5 py-1.5 rounded-full border text-[10px] font-mono font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedDomain === domain
                    ? "bg-cyan-950/60 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    : "glass-interactive text-white/50 hover:text-white border-white/5"
                }`}
              >
                {domain === "All" ? "All Domains" : domain.replace(" Engineering", "")}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID: GRAPH CANVAS & DETAIL PANEL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch relative min-h-[580px]">
          
          {/* A. KNOWLEDGE GRAPH CONTAINER (Desktop/Tablet) */}
          <div className="lg:col-span-3 rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-md overflow-hidden relative min-h-[480px] lg:min-h-[580px] flex items-center justify-center p-4">
            
            {/* Desktop SVG Link-Node Canvas (hidden on small viewports) */}
            <div className="absolute inset-0 hidden md:block select-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* 1. Draw glowing background lines */}
                {edges.map((edge) => {
                  const highlighted = isEdgeHighlighted(edge);
                  const edgeColor = DOMAIN_COLORS[edge.from.domain];
                  return (
                    <line
                      key={edge.id}
                      x1={`${edge.from.x}%`}
                      y1={`${edge.from.y}%`}
                      x2={`${edge.to.x}%`}
                      y2={`${edge.to.y}%`}
                      stroke={edgeColor}
                      strokeWidth={highlighted ? 1.5 : 0.4}
                      strokeOpacity={highlighted ? 0.35 : 0.05}
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>
            </div>

            {/* 2. Interactive HTML overlay nodes */}
            <div className="absolute inset-0 hidden md:block">
              {SKILL_NODES.map((node) => {
                const highlighted = isNodeHighlighted(node);
                const nodeColor = DOMAIN_COLORS[node.domain];
                const active = selectedNode?.id === node.id || hoveredNode?.id === node.id;
                
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                      position: "absolute",
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: `translate(-50%, -50%) ${active ? "scale(1.08)" : "scale(1)"}`,
                      borderColor: active ? nodeColor : "rgba(255,255,255,0.05)",
                      boxShadow: active ? `0 0 15px ${nodeColor}30` : "none",
                      opacity: highlighted ? 1 : 0.15,
                    }}
                    className={`px-3 py-1.5 rounded-full border text-[10px] sm:text-xs font-mono font-medium tracking-wide bg-zinc-950/90 text-white cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all duration-300`}
                    aria-label={`Inspect ${node.name}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: nodeColor }} />
                      {node.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Stacked Category cards (fallback for small screens) */}
            <div className="w-full md:hidden flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
              {["AI Engineering", "Backend Engineering", "Frontend Engineering", "Cloud & DevOps", "Databases", "Security"].map((domain) => {
                const domainColor = DOMAIN_COLORS[domain as keyof typeof DOMAIN_COLORS];
                const domainIcon = DOMAIN_ICONS[domain as keyof typeof DOMAIN_ICONS];
                const DomainIconComponent = domainIcon;
                const domainNodes = SKILL_NODES.filter((n) => n.domain === domain);
                
                return (
                  <div key={domain} className="p-4 rounded-xl border border-white/5 bg-[#0a0a0c]/60 text-left">
                    <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                      <div className="p-1.5 rounded bg-white/5 text-zinc-300" style={{ color: domainColor }}>
                        <DomainIconComponent size={14} />
                      </div>
                      <h4 className="text-xs font-bold font-mono tracking-wider text-white uppercase">{domain.replace(" Engineering", "")}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {domainNodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className="px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02] text-[10px] font-mono text-zinc-300 active:bg-cyan-500/10 active:border-cyan-500"
                        >
                          {node.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B. GLASS DETAIL PANEL DRAWER (1/4 Columns) */}
          <div className="lg:col-span-1">
            <BorderGlow className="h-full" borderRadius={24} backgroundColor="#09090c" colors={selectedNode ? [DOMAIN_COLORS[selectedNode.domain], "#ffffff05"] : ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.01)"]}>
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 h-full flex flex-col justify-between text-left"
                  >
                    <div className="space-y-6">
                      {/* Drawer Header details */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span 
                            className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border"
                            style={{ 
                              color: DOMAIN_COLORS[selectedNode.domain],
                              borderColor: `${DOMAIN_COLORS[selectedNode.domain]}25`,
                              backgroundColor: `${DOMAIN_COLORS[selectedNode.domain]}05`
                            }}
                          >
                            {selectedNode.domain}
                          </span>
                          <h3 className="text-xl font-black text-white mt-2 leading-tight">{selectedNode.name}</h3>
                          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">Level: {selectedNode.level}</span>
                        </div>
                        <button
                          onClick={() => setSelectedNode(null)}
                          className="p-1 rounded-full border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white cursor-pointer"
                          aria-label="Clear selection"
                        >
                          <FiX size={14} />
                        </button>
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">{selectedNode.description}</p>
                      </div>

                      {/* Related Projects */}
                      {selectedNode.projects.length > 0 && (
                        <div className="border-t border-white/5 pt-4">
                          <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <FiBookOpen size={10} /> Applied Projects
                          </h4>
                          <ul className="space-y-2">
                            {selectedNode.projects.map((proj, idx) => (
                              <li key={idx} className="flex justify-between items-center text-xs font-sans">
                                <span className="text-zinc-300 line-clamp-1">{proj.name}</span>
                                <button
                                  onClick={() => scrollToSection(proj.id)}
                                  className="text-cyan-400 hover:text-cyan-300 font-mono text-[9px] uppercase flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                                >
                                  Go <FiArrowUpRight size={10} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Related Certifications */}
                      {selectedNode.certs.length > 0 && (
                        <div className="border-t border-white/5 pt-4">
                          <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <FiAward size={10} /> Validations
                          </h4>
                          <ul className="space-y-2">
                            {selectedNode.certs.map((cert, idx) => (
                              <li key={idx} className="flex justify-between items-center text-xs font-sans">
                                <span className="text-zinc-300 line-clamp-1">{cert.name}</span>
                                <button
                                  onClick={() => scrollToSection(cert.linkId)}
                                  className="text-cyan-400 hover:text-cyan-300 font-mono text-[9px] uppercase flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                                >
                                  Verify <FiArrowUpRight size={10} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Related Blog Articles */}
                      {selectedNode.articles.length > 0 && (
                        <div className="border-t border-white/5 pt-4">
                          <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <FiExternalLink size={10} /> Case Studies
                          </h4>
                          <ul className="space-y-2">
                            {selectedNode.articles.map((art, idx) => (
                              <li key={idx} className="flex justify-between items-center text-xs font-sans">
                                <span className="text-zinc-300 line-clamp-1">{art.name}</span>
                                <button
                                  onClick={() => scrollToSection("blog")}
                                  className="text-cyan-400 hover:text-cyan-300 font-mono text-[9px] uppercase flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                                >
                                  Read <FiArrowUpRight size={10} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Connected Tech Links */}
                    <div className="border-t border-white/5 pt-4 mt-6">
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Connected Tech</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.related.map((relName) => {
                          const relNode = SKILL_NODES.find((n) => n.name === relName);
                          return (
                            <button
                              key={relName}
                              onClick={() => {
                                if (relNode) setSelectedNode(relNode);
                              }}
                              className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.01] text-white/40 hover:text-white hover:border-white/15 transition-all cursor-pointer"
                            >
                              {relName}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 h-full flex flex-col justify-center items-center text-center text-zinc-500 font-mono text-xs select-none"
                  >
                    <FiCpu size={24} className="text-zinc-700 mb-3 animate-spin-slow" />
                    <p className="max-w-[180px]">Select a skill node on the canvas to inspect telemetry details.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </BorderGlow>
          </div>

        </div>

      </div>
    </section>
  );
}
