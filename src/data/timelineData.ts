import React from "react";
import { 
  FiCpu, 
  FiTerminal, 
  FiLayers, 
  FiAward, 
  FiFileText
} from "react-icons/fi";

// Data types
export interface Milestone {
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
  icon: React.ElementType;
}

export const MILESTONES: Milestone[] = [
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

