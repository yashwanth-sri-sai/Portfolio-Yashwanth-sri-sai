import React from "react";
import { 
  FiCpu, 
  FiTerminal, 
  FiLayers, 
  FiAward 
} from "react-icons/fi";

// Data types
export interface Milestone {
  year: string;
  title: string;
  description: string;
  skills: string[];
  achievement: string;
  color: string;
  icon: React.ElementType;
}

export const MILESTONES: Milestone[] = [
  {
    year: "2022",
    title: "Computer Science Student",
    description: "Mastered fundamental computer science core subjects, coding principles, object-oriented paradigms, and basic data structures.",
    skills: ["C++ / Java", "OOP Patterns", "Data Structures"],
    achievement: "Established strong computational basics in systems and logical problem-solving at IIIT Kottayam.",
    color: "#3b82f6", // Electric Blue
    icon: FiTerminal
  },
  {
    year: "2023 - 2024",
    title: "Software Developer",
    description: "Engineered responsive web-based applications, text parser pipelines, and managed creative college media campaigns.",
    skills: ["Python", "Streamlit Parsing", "Brand Strategy"],
    achievement: "Developed a functional AI Resume Analyzer and led digital sports campaigns as Social Media Lead.",
    color: "#eab308", // Amber Gold
    icon: FiAward
  },
  {
    year: "2025",
    title: "AI Engineer",
    description: "Architected machine learning security classification models and retrieval-augmented generation document systems.",
    skills: ["LangChain & RAG", "XGBoost Classifier", "FAISS VectorDB"],
    achievement: "Built a machine learning Phishing Domain Classifier (98% accuracy) and responsive agentic document systems.",
    color: "#a855f7", // Deep Purple
    icon: FiCpu
  },
  {
    year: "2026",
    title: "Production System Builder",
    description: "Building production-grade full-stack architectures, high-performance GPU Canvas visuals, and optimized database endpoints.",
    skills: ["Next.js & React 19", "FastAPI Service", "VectorDB & Scaling"],
    achievement: "Engineering immersive high-fidelity portfolio components and highly-concurrent backend ecosystems.",
    color: "#06b6d4", // Electric Cyan
    icon: FiLayers
  }
];

// Tech Evolution paths
export const TECH_EVOLUTION = [
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
export const FUTURE_VISION = [
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
