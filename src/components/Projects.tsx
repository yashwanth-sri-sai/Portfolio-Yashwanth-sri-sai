"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  FiAlertTriangle,
  FiDatabase,
  FiServer,
  FiChevronDown,
  FiChevronRight
} from "react-icons/fi";
import { projects } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import BorderGlow from "./BorderGlow";

// Architecture Explorer structures
interface ArchNode {
  id: string;
  name: string;
  purpose: string;
  responsibilities: string;
  tech: string;
  decisions: string;
  challenges: string;
  performance: string;
}

interface DBTable {
  name: string;
  description: string;
  fields: string[];
  vector?: boolean;
}

interface DeploymentNode {
  name: string;
  role: string;
  tech: string;
}

interface ProjectArch {
  nodes: ArchNode[];
  apiFlow: string[];
  database: DBTable[];
  deployment: DeploymentNode[];
}

const PROJECT_ARCHITECTURES: Record<string, ProjectArch> = {
  noteai: {
    nodes: [
      {
        id: "client",
        name: "Frontend Client",
        purpose: "Render workspace, record audio memos, parse Markdown text.",
        responsibilities: "Manage state, handle audio recording media streams, render real-time preview canvases.",
        tech: "Next.js 16, React 19, Tailwind CSS",
        decisions: "Used Server Components for static indexing and client actions for fast client-side interaction.",
        challenges: "Syncing concurrent user notes updates with database logs.",
        performance: "Implemented optimistic UI updates to ensure latency-free document manipulation."
      },
      {
        id: "api",
        name: "FastAPI Gateway",
        purpose: "Route requests, validate JSON payloads, parse data schemas.",
        responsibilities: "Validate schema validation models, direct queries, manage CORS configurations.",
        tech: "FastAPI, Python 3.12, Pydantic",
        decisions: "Selected FastAPI for its async execution speed and built-in type validation.",
        challenges: "Rate-limiting requests during burst transcription demands.",
        performance: "Configured async routing scopes to maximize server thread utilization."
      },
      {
        id: "auth",
        name: "Authentication Validator",
        purpose: "Secure API endpoints from unauthorized actions.",
        responsibilities: "Verify JWT browser tokens, extract user metadata, validate session state.",
        tech: "PyJWT, HttpOnly Cookies",
        decisions: "Stored session tokens in HttpOnly cookies to prevent cross-site scripting (XSS) extraction.",
        challenges: "Managing token expirations seamlessly across active client tabs.",
        performance: "Cached session tokens validations in local memory to reduce DB database lookups."
      },
      {
        id: "db",
        name: "PostgreSQL Database",
        purpose: "Store structural user notes, transcripts, folders, and tags.",
        responsibilities: "Maintain transactional integrity, execute CRUD actions, index notes tags.",
        tech: "PostgreSQL, SQLAlchemy",
        decisions: "Utilized PostgreSQL for relational storage stability and transactional support.",
        challenges: "Tuning complex JOIN queries for folder directory structures.",
        performance: "Added database indexes on user_id and note_id columns for rapid fetches."
      },
      {
        id: "vector",
        name: "FAISS Vector Store",
        purpose: "Run context-aware semantic searches across unstructured note logs.",
        responsibilities: "Store text chunks embeddings, execute cosine similarity lookups.",
        tech: "FAISS, SentenceTransformers",
        decisions: "Chose FAISS for lightweight local index queries without external cloud routing latency.",
        challenges: "Updating vector clusters instantly upon note revisions.",
        performance: "Chunked notes recursively with 200 token overlap to preserve contextual continuity."
      },
      {
        id: "llm",
        name: "Gemini AI Pipeline",
        purpose: "Transcribe audio memos, summarize transcripts, answer document QA.",
        responsibilities: "Parse context prompts, translate voice files, generate entity metadata.",
        tech: "Gemini 1.5 Flash, LangChain",
        decisions: "Selected Gemini 1.5 Flash for high context windows and cost-effective prompt tokens.",
        challenges: "Tuning system instructions to prevent formatting variations in summaries.",
        performance: "Structured response payloads as JSON schemas utilizing few-shot prompt examples."
      }
    ],
    apiFlow: ["Next.js Client", "FastAPI Router", "Auth check", "PostgreSQL (Lookup)", "Gemini AI (Summary)", "FAISS Vector Store", "Client Response"],
    database: [
      {
        name: "users",
        description: "Credentials registry and profile metadata.",
        fields: ["id (UUID, PK)", "email (VARCHAR, UNIQUE)", "password_hash (VARCHAR)", "created_at (TIMESTAMP)"]
      },
      {
        name: "notes",
        description: "Raw notes content and folder bindings.",
        fields: ["id (UUID, PK)", "user_id (UUID, FK)", "folder_id (UUID, FK)", "title (VARCHAR)", "content (TEXT)", "raw_transcript (TEXT)"]
      },
      {
        name: "note_embeddings",
        description: "Vector database for context search lookups.",
        fields: ["id (UUID, PK)", "note_id (UUID, FK)", "embedding_vector (vector(768))", "chunk_text (TEXT)"],
        vector: true
      }
    ],
    deployment: [
      { name: "Vercel Edge", role: "Hosts Next.js Client and delivers global edge caching.", tech: "Next.js Vercel CI" },
      { name: "Render API Container", role: "Hosts async FastAPI backend inside custom Docker images.", tech: "Docker, Render Web Service" },
      { name: "Supabase DB cluster", role: "Transactional PostgreSQL cloud hosting.", tech: "PostgreSQL Cloud" },
      { name: "Gemini AI Serverless", role: "Generative summarization and entity extraction queries.", tech: "Google Generative AI REST" }
    ]
  },
  "agentic-ai": {
    nodes: [
      {
        id: "client",
        name: "Streamlit UI",
        purpose: "Renders chat logs and input prompt terminal.",
        responsibilities: "Handle state history, parse user prompt strings, render assistant responses.",
        tech: "Streamlit, Python",
        decisions: "Used Streamlit for rapid, robust UI prototyping during ML/AI integrations.",
        challenges: "Avoiding full-page reloading states upon user queries.",
        performance: "Utilized Streamlit sessions to preserve chat lists local state."
      },
      {
        id: "router",
        name: "LangChain Router",
        purpose: "Classify incoming prompts and direct them to specialized tool chains.",
        responsibilities: "Manage agent router chains, evaluate intent score matrices, call API tools.",
        tech: "LangChain, LangGraph",
        decisions: "Used LangChain Router to construct conditional logical boundaries on prompt flows.",
        challenges: "Preventing circular routing loops in compound questions.",
        performance: "Set maximum fallback routing steps limit to prevent token infinity loops."
      },
      {
        id: "rag",
        name: "RAG Engine",
        purpose: "Query database context using FAISS similarity indexing.",
        responsibilities: "Embed query text, run index similarity lookups, fetch contextual chunks.",
        tech: "FAISS, Google Embeddings",
        decisions: "Selected FAISS for high retrieval speeds and offline execution stability.",
        challenges: "Merging metadata matches from separate document files.",
        performance: "Set similarity search threshold to 0.72 to filter out weak contexts."
      },
      {
        id: "api",
        name: "FastAPI Backend",
        purpose: "Execute autonomous script tasks and system queries.",
        responsibilities: "Process server task queues, fetch databases info, output execution status.",
        tech: "FastAPI, Python",
        decisions: "Used FastAPI to serve backend automation tasks asynchronously.",
        challenges: "Syncing task logs with active Streamlit client threads.",
        performance: "Implemented async endpoint worker pools to avoid blocking API threads."
      }
    ],
    apiFlow: ["User prompt", "LangChain Router", "FAISS Vector Match", "FastAPI Service", "Gemini LLM Synthesis", "Streamlit Client Response"],
    database: [
      {
        name: "knowledge_base",
        description: "Indexed manuals and guidelines.",
        fields: ["id (INT, PK)", "file_name (VARCHAR)", "content_chunk (TEXT)", "vector_embedding (vector(768))"],
        vector: true
      },
      {
        name: "chat_logs",
        description: "Historical conversation tracking.",
        fields: ["session_id (UUID)", "message_history (JSONB)", "created_at (TIMESTAMP)"]
      }
    ],
    deployment: [
      { name: "Streamlit Cloud", role: "Hosts the client chatbot chat console.", tech: "Streamlit Platform" },
      { name: "Render Web Service", role: "Executes backend FastAPI operations.", tech: "Render Docker hosting" },
      { name: "FAISS Local Index", role: "Local file index storage.", tech: "FAISS Binary store" },
      { name: "Gemini APIs", role: "Synthesizes responses from matched RAG contexts.", tech: "Google AI REST" }
    ]
  }
};

// Generic Fallback generator for projects that are not noteai or agentic-ai
const generateFallbackArch = (projectTitle: string): ProjectArch => {
  return {
    nodes: [
      {
        id: "client",
        name: "User Interface Layer",
        purpose: "Render the user interface and capture interactions.",
        responsibilities: "Maintain visual state, capture user inputs, route client actions.",
        tech: "React, Next.js / Streamlit",
        decisions: "Selected responsive UI frameworks to maintain fast rendering.",
        challenges: "Optimizing DOM elements layout shifts during complex rendering.",
        performance: "Utilized state management caching and lazy rendering."
      },
      {
        id: "api",
        name: "Application Controller",
        purpose: "Verify commands, route API endpoints, and orchestrate logic.",
        responsibilities: "Filter payloads, invoke database transactions, validate schemas.",
        tech: "FastAPI / Node.js",
        decisions: "Selected async backend layers to handle multiple requests.",
        challenges: "Managing request timeout durations under heavy database transactions.",
        performance: "Optimized server execution threads pooling."
      },
      {
        id: "db",
        name: "Database Storage",
        purpose: "Persist files, logs, and transaction tables.",
        responsibilities: "Enforce data schema constraints, run queries, maintain indexes.",
        tech: "PostgreSQL / SQLite",
        decisions: "Utilized structured schemas to guarantee data consistency.",
        challenges: "Tuning data schemas to minimize duplicate attributes.",
        performance: "Indexed keys columns to accelerate search latencies."
      }
    ],
    apiFlow: ["Client Input", "API Controller", "Database Query", "Service Processing", "Response Rendered"],
    database: [
      {
        name: "primary_records",
        description: "Application configuration tables.",
        fields: ["id (PK)", "record_name (VARCHAR)", "data_payload (JSON)", "updated_at (TIMESTAMP)"]
      }
    ],
    deployment: [
      { name: "Vercel / Streamlit Hosting", role: "Hosts frontend applications delivery.", tech: "Vercel Edge Platform" },
      { name: "Render Backend Cloud", role: "Executes server services container pipelines.", tech: "Docker, Render Services" },
      { name: "Supabase DB Cloud", role: "Maintains cloud database records persistence.", tech: "PostgreSQL Cloud" }
    ]
  };
};

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);
  const [activeTab, setActiveTab] = useState<"overview" | "architecture">("overview");
  const [activeArchView, setActiveArchView] = useState<"nodes" | "api" | "db" | "deploy">("nodes");
  const [selectedArchNode, setSelectedArchNode] = useState<ArchNode | null>(null);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) || projects[0];
  }, [activeProjectId]);

  const activeArch = useMemo(() => {
    const arch = PROJECT_ARCHITECTURES[activeProject.id] || generateFallbackArch(activeProject.title);
    return arch;
  }, [activeProject]);

  // Listen for AI assistant triggers to open specific project architecture explorer
  useEffect(() => {
    const handleOpenArch = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.projectId) {
        setActiveProjectId(detail.projectId);
        setActiveTab("architecture");
        setActiveArchView("nodes");
        scrollToSection("projects");
      }
    };

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

    window.addEventListener("open-project-architecture", handleOpenArch);
    return () => window.removeEventListener("open-project-architecture", handleOpenArch);
  }, []);

  // Handle setting active project: reset internal view tabs
  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    setActiveTab("overview");
    setActiveArchView("nodes");
    setSelectedArchNode(null);
  };

  const handleSelectArchTab = () => {
    setActiveTab("architecture");
    setSelectedArchNode(activeArch.nodes[0] || null);
  };

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
        <div className="hidden lg:flex flex-row gap-6 h-[760px] mt-8">
          
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
                onClick={() => handleSelectProject(project.id)}
                className={`w-full flex flex-col items-start justify-center text-left px-5 py-4.5 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex-shrink-0 cursor-pointer ${
                  activeProjectId === project.id
                    ? "bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                    : "glass-interactive border-white/5"
                }`}
              >
                {activeProjectId === project.id && (
                  <motion.div
                    layoutId="activeProjectIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col gap-1 relative z-10">
                  <span className={`text-[9px] font-mono tracking-widest uppercase ${activeProjectId === project.id ? "text-cyan-400" : "text-white/30"}`}>
                    {project.category}
                  </span>
                  <h3 className={`font-bold text-base transition-colors leading-snug ${activeProjectId === project.id ? "text-white" : "text-white/70 group-hover:text-white"}`}>
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
                key={activeProject.id + "-" + activeTab}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col p-8 justify-between"
              >
                {/* Header Title Block */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-5 shrink-0 text-left">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                      {activeProject.title}
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                      {activeProject.shortDescription}
                    </p>
                  </div>
                  
                  {/* Dynamic Mode Toggles (Overview vs Architecture) */}
                  <div className="flex rounded-full bg-white/5 border border-white/5 p-1 shrink-0 self-end sm:self-auto select-none">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        activeTab === "overview" ? "bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={handleSelectArchTab}
                      className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        activeTab === "architecture" ? "bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Architecture
                    </button>
                  </div>
                </div>

                {/* ─── TAB CONTENT: OVERVIEW (IMAGE + DETAIL GRID) ─── */}
                {activeTab === "overview" && (
                  <>
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

                    {/* Structured Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5 uppercase font-bold select-none">
                            <FiAlertTriangle size={12} /> Problem
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                            {activeProject.problemStatement}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider text-purple-400 mb-1.5 flex items-center gap-1.5 uppercase font-bold select-none">
                            <FiCpu size={12} /> Solution
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                            {activeProject.description}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5 uppercase font-bold select-none">
                            <FiTarget size={12} /> Solution Architecture
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                            {activeProject.solutionArchitecture}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider text-pink-400 mb-1.5 flex items-center gap-1.5 uppercase font-bold select-none">
                            <FiAward size={12} /> Impact
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium font-sans">
                            {activeProject.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ─── TAB CONTENT: INTERACTIVE ARCHITECTURE EXPLORER ─── */}
                {activeTab === "architecture" && (
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    {/* Architecture Sub-tab Selector */}
                    <div className="flex border-b border-white/5 pb-3 gap-5 shrink-0 select-none">
                      {[
                        { id: "nodes", label: "System Nodes" },
                        { id: "api", label: "Request Path" },
                        { id: "db", label: "Database Model" },
                        { id: "deploy", label: "Infrastructure" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveArchView(item.id as any);
                            if (item.id === "nodes") setSelectedArchNode(activeArch.nodes[0] || null);
                          }}
                          className={`text-xs font-mono pb-1 border-b-2 transition-all cursor-pointer ${
                            activeArchView === item.id 
                              ? "border-cyan-400 text-white font-bold" 
                              : "border-transparent text-zinc-500 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Explorer Views Renderer */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-6 py-4 overflow-hidden items-stretch">
                      
                      {/* Left 3/5: Visual Graph / Representation */}
                      <div className="md:col-span-3 rounded-xl border border-white/5 bg-black/40 overflow-y-auto p-4 flex flex-col justify-center items-center relative custom-scrollbar">
                        
                        {/* 1. System Nodes Diagram view */}
                        {activeArchView === "nodes" && (
                          <div className="flex flex-col gap-3 w-full max-w-[240px]">
                            {activeArch.nodes.map((node, idx) => {
                              const active = selectedArchNode?.id === node.id;
                              return (
                                <div key={node.id} className="flex flex-col items-center w-full">
                                  <button
                                    onClick={() => setSelectedArchNode(node)}
                                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-mono font-medium tracking-wide transition-all cursor-pointer ${
                                      active 
                                        ? "bg-cyan-950/40 border-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.15)] scale-[1.03]" 
                                        : "glass-interactive border-white/5 text-zinc-400 hover:text-white"
                                    }`}
                                  >
                                    {node.name}
                                  </button>
                                  {idx < activeArch.nodes.length - 1 && (
                                    <div className="w-[1.5px] h-3 bg-zinc-800" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* 2. Request Flow (API Flow) Animation view */}
                        {activeArchView === "api" && (
                          <div className="flex flex-col gap-2 w-full max-w-[260px] text-left py-4 relative">
                            {/* Animated request dot along the pathway */}
                            <div className="absolute left-[20px] top-6 bottom-6 w-[1.5px] bg-cyan-500/10 pointer-events-none">
                              <motion.div
                                animate={{ y: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                                className="absolute left-[-3.5px] w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                              />
                            </div>
                            
                            {activeArch.apiFlow.map((stage, idx) => (
                              <div key={idx} className="flex items-center gap-4.5 pl-3">
                                <div className="w-4 h-4 rounded-full border border-cyan-500/30 bg-black flex items-center justify-center text-[8px] font-mono text-cyan-400 font-bold shrink-0 relative z-10">
                                  {idx + 1}
                                </div>
                                <span className="text-[11px] font-mono text-zinc-300 font-medium">{stage}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 3. Database Table Structures view */}
                        {activeArchView === "db" && (
                          <div className="w-full space-y-4 flex flex-col">
                            {activeArch.database.map((table) => (
                              <div key={table.name} className="border border-white/5 rounded-xl bg-zinc-950/40 p-4 text-left">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 select-none">
                                  <h4 className="text-xs font-bold font-mono text-white uppercase flex items-center gap-1.5">
                                    <FiDatabase className="text-cyan-400" /> {table.name}
                                  </h4>
                                  {table.vector && (
                                    <span className="text-[8px] font-mono px-2 py-0.5 rounded border border-green-500/20 bg-green-500/10 text-green-400 font-bold">
                                      VECTOR DB
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-zinc-500 font-sans mb-3.5 leading-relaxed">{table.description}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                                  {table.fields.map((f, fIdx) => (
                                    <span key={fIdx} className="text-[10px] font-mono text-zinc-400 block truncate">
                                      ▪ {f}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 4. Deployment Map view */}
                        {activeArchView === "deploy" && (
                          <div className="w-full space-y-3.5">
                            {activeArch.deployment.map((dep) => (
                              <div key={dep.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-white/5 bg-zinc-950/40 gap-3 text-left">
                                <div>
                                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                    <FiServer className="text-cyan-400 shrink-0" /> {dep.name}
                                  </h4>
                                  <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">{dep.role}</p>
                                </div>
                                <span className="text-[9px] font-mono px-2 py-1 rounded bg-white/5 text-zinc-400 shrink-0 self-start sm:self-center">
                                  {dep.tech}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>

                      {/* Right 2/5: Glass Detail Panel for Selected Node */}
                      <div className="md:col-span-2 rounded-xl border border-white/5 bg-black/20 p-4 text-left overflow-y-auto custom-scrollbar flex flex-col justify-between">
                        {activeArchView === "nodes" && selectedArchNode ? (
                          <div className="space-y-4">
                            <div className="border-b border-white/5 pb-2 select-none">
                              <h3 className="text-sm font-bold text-white">{selectedArchNode.name}</h3>
                              <span className="text-[9px] font-mono text-cyan-400 uppercase mt-0.5 block">{selectedArchNode.tech}</span>
                            </div>
                            <div className="space-y-3 text-xs leading-relaxed">
                              <div>
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5 select-none">Purpose</span>
                                <p className="text-zinc-300 font-sans">{selectedArchNode.purpose}</p>
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5 select-none">Responsibilities</span>
                                <p className="text-zinc-400 font-sans">{selectedArchNode.responsibilities}</p>
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5 select-none">Implementation Decisions</span>
                                <p className="text-zinc-400 font-sans">{selectedArchNode.decisions}</p>
                              </div>
                              {selectedArchNode.challenges && (
                                <div>
                                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5 select-none">Key Challenge</span>
                                  <p className="text-zinc-400 font-sans">{selectedArchNode.challenges}</p>
                                </div>
                              )}
                              {selectedArchNode.performance && (
                                <div>
                                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5 select-none">Performance optimization</span>
                                  <p className="text-zinc-400 font-sans">{selectedArchNode.performance}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col justify-center items-center text-center text-zinc-500 font-mono text-[10px] select-none py-6">
                            <FiCpu size={20} className="text-zinc-700 mb-2.5 animate-spin-slow" />
                            <p className="max-w-[150px]">
                              {activeArchView === "nodes" 
                                ? "Click a system node in the graph to inspect implementation telemetry."
                                : "Explore request routing, database normalization tables, and server topology maps."
                              }
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {/* Actions Bottom Bar */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-3.5 shrink-0">
                  {activeProject.demo && (
                    <a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <FiExternalLink size={13} /> Live Demo
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <FiGithub size={13} /> GitHub Code
                    </a>
                  )}
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="btn-secondary"
                  >
                    Read Case Study <FiArrowRight />
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
                  <div className="flex items-center gap-3 text-white/50 mb-2 text-xs font-mono tracking-wider text-left select-none">
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
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono mb-1.5 tracking-wider select-none">
                      <FiLayers /> Category
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {activeProject.category}
                    </div>
                  </BorderGlow>
                  <BorderGlow className="p-4" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono mb-1.5 tracking-wider select-none">
                      <FiClock /> Duration
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {activeProject.duration}
                    </div>
                  </BorderGlow>
                  <BorderGlow className="col-span-2 p-5" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex flex-col gap-1.5 mb-2.5">
                      <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono tracking-wider select-none">
                        <FiTarget /> Complexity
                      </div>
                      <div className="text-base font-bold text-cyan-400">
                        {activeProject.complexity}
                      </div>
                    </div>
                    {/* Visual complexity level nodes */}
                    <div className="flex gap-1 select-none">
                      <div className="w-1.5 h-6 rounded-full bg-cyan-500" />
                      <div className={`w-1.5 h-6 rounded-full ${activeProject.complexity === "Moderate" ? "bg-white/10" : "bg-cyan-500"}`} />
                      <div className={`w-1.5 h-6 rounded-full ${activeProject.complexity === "Advanced" || activeProject.complexity === "High" ? "bg-cyan-500/50" : "bg-white/10"}`} />
                    </div>
                  </BorderGlow>
                </div>

                {/* Tech Stack list limited to 6 */}
                <BorderGlow className="p-5 flex-grow flex flex-col text-left" borderRadius={16} backgroundColor="#09090b">
                  <div className="flex items-center gap-3 text-white/50 mb-4 text-xs font-mono tracking-wider select-none">
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
          
          {/* Project Tab Selector */}
          <div className="flex overflow-x-auto gap-3 pb-4 snap-x custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleSelectProject(project.id)}
                className={`snap-start whitespace-nowrap px-6 py-3.5 rounded-full border transition-all duration-300 font-medium text-sm cursor-pointer ${
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
                key={activeProject.id + "-" + activeTab}
                initial={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col gap-6"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              >
                {/* Mobile Center Panel */}
                <BorderGlow className="p-5 sm:p-6 text-left" borderRadius={24} backgroundColor="#09090b">
                  <div className="flex justify-between items-center gap-4 mb-4 select-none">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {activeProject.title}
                    </h2>
                    
                    {/* Mobile Overview vs Architecture toggle */}
                    <div className="flex rounded-full bg-white/5 p-0.5 border border-white/5 shrink-0">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono cursor-pointer ${
                          activeTab === "overview" ? "bg-cyan-500 text-black font-bold" : "text-zinc-400"
                        }`}
                      >
                        Info
                      </button>
                      <button
                        onClick={handleSelectArchTab}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono cursor-pointer ${
                          activeTab === "architecture" ? "bg-cyan-500 text-black font-bold" : "text-zinc-400"
                        }`}
                      >
                        Arch
                      </button>
                    </div>
                  </div>

                  {activeTab === "overview" ? (
                    <>
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
                          <h4 className="text-[10px] font-mono tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5 uppercase font-bold select-none">
                            <FiAlertTriangle size={12} /> Problem
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                            {activeProject.problemStatement}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider text-purple-400 mb-1 flex items-center gap-1.5 uppercase font-bold select-none">
                            <FiCpu size={12} /> Solution
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                            {activeProject.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5 uppercase font-bold select-none">
                            <FiTarget size={12} /> Architecture
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                            {activeProject.solutionArchitecture}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider text-pink-400 mb-1 flex items-center gap-1.5 uppercase font-bold select-none">
                            <FiAward size={12} /> Impact
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium font-sans">
                            {activeProject.outcome}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Mobile Interactive step-by-step Architecture Cards */
                    <div className="space-y-5">
                      <div className="flex overflow-x-auto gap-2.5 pb-2.5 snap-x border-b border-white/5 select-none custom-scrollbar">
                        {[
                          { id: "nodes", label: "Nodes" },
                          { id: "api", label: "Flow" },
                          { id: "db", label: "Database" },
                          { id: "deploy", label: "Deploy" }
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => {
                              setActiveArchView(m.id as any);
                              if (m.id === "nodes") setSelectedArchNode(activeArch.nodes[0] || null);
                            }}
                            className={`snap-start whitespace-nowrap px-4 py-1.5 rounded-full border text-[10px] font-mono cursor-pointer ${
                              activeArchView === m.id 
                                ? "bg-cyan-500 text-black font-bold border-cyan-500" 
                                : "glass-interactive border-white/5 text-zinc-400"
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>

                      <div className="py-2">
                        {activeArchView === "nodes" && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 overflow-x-auto pb-2 select-none custom-scrollbar snap-x">
                              {activeArch.nodes.map((node) => (
                                <button
                                  key={node.id}
                                  onClick={() => setSelectedArchNode(node)}
                                  className={`snap-start px-3.5 py-1.5 rounded-xl border text-[10px] font-mono shrink-0 cursor-pointer ${
                                    selectedArchNode?.id === node.id 
                                      ? "bg-cyan-950/40 border-cyan-500 text-white" 
                                      : "glass-interactive border-white/5 text-zinc-500"
                                  }`}
                                >
                                  {node.name}
                                </button>
                              ))}
                            </div>
                            
                            {selectedArchNode && (
                              <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/30 text-left space-y-3">
                                <div>
                                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">{selectedArchNode.tech}</span>
                                  <h4 className="text-sm font-bold text-white">{selectedArchNode.name}</h4>
                                </div>
                                <p className="text-xs text-zinc-400">{selectedArchNode.purpose}</p>
                                <div className="text-[11px] space-y-2 border-t border-white/5 pt-2">
                                  <p className="text-zinc-500"><strong>Specs:</strong> {selectedArchNode.responsibilities}</p>
                                  <p className="text-zinc-500"><strong>Decision:</strong> {selectedArchNode.decisions}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {activeArchView === "api" && (
                          <div className="space-y-3 pl-2 py-2">
                            {activeArch.apiFlow.map((stage, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-left">
                                <span className="w-4 h-4 rounded-full border border-cyan-500/20 bg-black flex items-center justify-center text-[9px] font-mono text-cyan-400 font-bold shrink-0">{idx+1}</span>
                                <span className="text-xs font-mono text-zinc-300">{stage}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeArchView === "db" && (
                          <div className="space-y-3">
                            {activeArch.database.map((table) => (
                              <div key={table.name} className="p-3.5 rounded-xl border border-white/5 bg-zinc-950/30 text-left">
                                <h4 className="text-xs font-bold font-mono text-white mb-1 uppercase flex items-center justify-between">
                                  <span>▪ {table.name}</span>
                                  {table.vector && <span className="text-[8px] border border-green-500/20 bg-green-500/10 text-green-400 px-1.5 rounded">VECTOR</span>}
                                </h4>
                                <p className="text-[10px] text-zinc-500 leading-normal mb-2">{table.description}</p>
                                <div className="flex flex-col gap-1">
                                  {table.fields.slice(0, 3).map((f, idx) => (
                                    <span key={idx} className="text-[9px] font-mono text-zinc-400 truncate">{f}</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeArchView === "deploy" && (
                          <div className="space-y-3">
                            {activeArch.deployment.map((dep) => (
                              <div key={dep.name} className="p-3.5 rounded-xl border border-white/5 bg-zinc-950/30 text-left">
                                <h4 className="text-xs font-bold text-white">{dep.name}</h4>
                                <p className="text-[10px] text-zinc-500 mt-1 leading-normal">{dep.role}</p>
                                <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 mt-2 inline-block">{dep.tech}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions Grid */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                    {activeProject.demo && (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-center cursor-pointer"
                      >
                        <FiExternalLink /> Live Demo
                      </a>
                    )}
                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full text-center cursor-pointer"
                      >
                        <FiGithub size={14} /> GitHub Code
                      </a>
                    )}
                    <Link
                      href={`/projects/${activeProject.id}`}
                      className="btn-secondary w-full text-center"
                    >
                      Read Case Study <FiArrowRight />
                    </Link>
                  </div>
                </BorderGlow>

                {/* Mobile Specifications Panel (Intelligence) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <BorderGlow className="col-span-2 p-5 text-left" borderRadius={16} backgroundColor="#09090b">
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-xs font-mono tracking-widest select-none">
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
                      className="p-5 text-center flex flex-col justify-center animate-pulse"
                      borderRadius={16} backgroundColor="#09090b"
                    >
                      <div className="text-2xl font-extrabold text-white mb-1">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-white/50 uppercase tracking-widest select-none">
                        {m.label}
                      </div>
                    </BorderGlow>
                  ))}

                  <BorderGlow className="col-span-2 p-5 mt-2 text-left" borderRadius={16} backgroundColor="#09090b">
                    <div className="text-white/50 text-xs font-mono tracking-wider mb-3 select-none">
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
