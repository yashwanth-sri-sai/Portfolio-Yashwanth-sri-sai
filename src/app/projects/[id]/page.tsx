"use client";

import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  FiArrowLeft, 
  FiGithub, 
  FiExternalLink, 
  FiCalendar, 
  FiTag, 
  FiCheckCircle, 
  FiLayers, 
  FiCpu, 
  FiCode, 
  FiTrendingUp, 
  FiBookOpen, 
  FiActivity,
  FiSend,
  FiFileText,
  FiSearch,
  FiUser
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

// Dynamic workflows representing each project's architecture steps
const ARCHITECTURES: Record<string, { title: string; desc: string }[]> = {
  "agentic-ai-assistant": [
    { title: "User Query", desc: "User inputs complex multi-step analytical prompt." },
    { title: "Query Router", desc: "LangChain processes prompt intent and routes search path." },
    { title: "Researcher Agent", desc: "Queries FAISS vector database for domain-specific contexts." },
    { title: "Context Retrieval", desc: "Extracts text chunks and ranks by cosine similarity." },
    { title: "Writer Agent", desc: "Synthesizes extracted data into a unified readable answer." },
    { title: "Final Response", desc: "Pushes validated outputs to client console interface." }
  ],
  "multi-pdf-chatbot": [
    { title: "Upload PDFs", desc: "User uploads document bundle to the Streamlit UI." },
    { title: "Document Parser", desc: "PyPDF2 extracts raw characters from uploaded records." },
    { title: "Chunking Engine", desc: "Splits strings into 1000-character recursive nodes." },
    { title: "Embedding API", desc: "Generates semantic vectors using Google Gemini models." },
    { title: "Vector Store", desc: "Index files are stored locally in FAISS database caches." },
    { title: "Conversational QA", desc: "Retrieval chain processes responses with chat memory." }
  ],
  "ai-resume-analyzer": [
    { title: "Upload Profile", desc: "Extracts PDF, DOCX, or TXT file bytes into strings." },
    { title: "NLP Preprocessor", desc: "Tokenizes strings, filters stop words, and indexes terms." },
    { title: "ATS Evaluation", desc: "Scans resume structure against industry benchmarks." },
    { title: "Keyword Matching", desc: "Checks frequency correlation of job description nouns." },
    { title: "LLM Evaluator", desc: "Fires structured JSON prompt to formulate feedback blocks." },
    { title: "Score Breakdown", desc: "Renders skill gaps and recommendations in dashboard." }
  ],
  "task-management-system": [
    { title: "Client UI Action", desc: "React action fires database state manipulation query." },
    { title: "Authentication Shield", desc: "JWT cookies validate scopes and active user session." },
    { title: "Server Handler", desc: "Next.js routing server processes data parameters." },
    { title: "Prisma ORM Mapping", desc: "Constructs SQL transaction schema commands." },
    { title: "PostgreSQL Execute", desc: "Performs query mutations on hosted SQL database." },
    { title: "Optimistic Render", desc: "Instant UI update with rollback safeguard on fail." }
  ]
};

// Heuristically mapped solutions to complete the engineering narrative
const CHALLENGE_SOLUTIONS: Record<string, { challenge: string; solution: string }[]> = {
  "agentic-ai-assistant": [
    {
      challenge: "Managing agent state and preventing infinite conversation loops between autonomous agents.",
      solution: "Implemented strict maximum iteration caps (max_iter) and configured custom termination indicators (stop words) within the CrewAI router."
    },
    {
      challenge: "Optimizing the chunking strategy for the FAISS vector database to ensure high-relevance retrieval without exceeding token limits.",
      solution: "Developed an overlap-based Recursive Character splitter combined with a custom metadata filter to rank retrieved content by recency and cosine similarity."
    }
  ],
  "multi-pdf-chatbot": [
    {
      challenge: "Handling large PDF files (50MB+) without causing memory overflow or hitting API rate limits during the embedding phase.",
      solution: "Created a batched ingestion pipeline with exponential backoff retries and chunked vector uploads, respecting LLM API rate limits."
    },
    {
      challenge: "Maintaining conversational context across follow-up questions referencing different uploaded documents.",
      solution: "Integrated a ConversationBufferWindowMemory module from LangChain that passes a sliding window of historical context directly to the retrieval LLM."
    }
  ],
  "ai-resume-analyzer": [
    {
      challenge: "Accurately extracting structured data (skills, experience) from highly varied and unstructured resume formats.",
      solution: "Designed a multi-stage parser combining Regex heuristic classifiers with small fine-tuned BERT models for named entity recognition (NER)."
    },
    {
      challenge: "Prompt engineering the LLM to provide consistent, objective percentage scores rather than subjective text.",
      solution: "Implemented structured JSON output schemas using Pydantic parsers and few-shot formatting examples to constrain model scoring logic."
    }
  ],
  "task-management-system": [
    {
      challenge: "Implementing optimistic UI updates to ensure a snappy user experience while waiting for server mutations to complete.",
      solution: "Leveraged React's useOptimistic hook coupled with local state caches to render task movements instantly, rolling back only on server failure."
    },
    {
      challenge: "Designing a scalable relational database schema for users, teams, projects, and nested tasks.",
      solution: "Engineered a normalized database schema in PostgreSQL with composite indexing and explicit cascading deletes handled via Prisma schema rules."
    }
  ]
};

// Dynamic technology groupings
const getTechCategories = (tech: string[]) => {
  const categories: Record<string, string[]> = {
    "AI & Processing Core": [],
    "Application Stack & UI": [],
    "Data & Architecture": []
  };

  tech.forEach(t => {
    const l = t.toLowerCase();
    if (["langchain", "faiss", "crewai", "rag", "embeddings", "gemini", "gpt", "nlp", "llms", "ats parsing"].includes(l)) {
      categories["AI & Processing Core"].push(t);
    } else if (["react", "next.js", "streamlit", "tailwind css", "streamlit", "streamlit app"].includes(l)) {
      categories["Application Stack & UI"].push(t);
    } else {
      categories["Data & Architecture"].push(t);
    }
  });

  return Object.entries(categories).filter(([_, items]) => items.length > 0);
};

export default function ProjectCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap parameters according to Next.js 16 specifications
  const resolvedParams = use(params);
  const project = projects.find((p) => p.id === resolvedParams.id);

  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeArchIndex, setActiveArchIndex] = useState(0);

  // States for interactive mockups
  const [mockState, setMockState] = useState<any>({
    activeAgent: "Researcher",
    chatQuery: "",
    chatHistory: [
      { sender: "user", text: "Explain RAG vector databases." },
      { sender: "bot", text: "RAG retrieves information from external documents (like vector representations stored in FAISS) and appends it to your prompt before sending to the LLM.", sources: ["FAQ.pdf - Page 3"] }
    ],
    resumeKeywords: ["FastAPI", "Docker", "PyTorch"],
    parsedResume: null,
  });

  if (!project) {
    notFound();
  }

  // Find Next & Prev projects for footer navigation loop
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Canvas particle background effect for the Hero section
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initialize particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1
      });
    }

    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid line coordinates
      ctx.strokeStyle = "rgba(255, 255, 255, 0.01)";
      ctx.lineWidth = 0.5;
      const step = 50;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`;
        ctx.shadowBlur = p.radius * 2;
        ctx.shadowColor = "rgba(59, 130, 246, 0.3)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(run);
    };

    run();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // UI Interactive Mockup Handler
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockState.chatQuery.trim()) return;

    const query = mockState.chatQuery;
    const history = [...mockState.chatHistory, { sender: "user", text: query }];
    setMockState((prev: any) => ({ ...prev, chatQuery: "", chatHistory: history }));

    setTimeout(() => {
      setMockState((prev: any) => ({
        ...prev,
        chatHistory: [
          ...prev.chatHistory,
          {
            sender: "bot",
            text: `Analyzing context for query "${query}". Vector search extracted semantic correlation nodes.`,
            sources: ["report_2024.pdf - Page 12", "reference_index.txt"]
          }
        ]
      }));
    }, 800);
  };

  const handleResumeDrop = () => {
    setMockState((prev: any) => ({ ...prev, parsedResume: "parsing" }));
    setTimeout(() => {
      setMockState((prev: any) => ({
        ...prev,
        parsedResume: {
          score: 98,
          extractedSkills: ["Python", "FastAPI", "RAG Pipeline", "NLP"],
          improvements: "Include explicit Docker deployment steps inside details."
        }
      }));
    }, 1200);
  };

  return (
    <main className="relative min-h-screen bg-[#020205] text-[#f5f5f7] selection:bg-blue-500/30 overflow-x-hidden font-sans">
      
      {/* ─── Global Glow Coordinates ─── */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[140px] pointer-events-none" />

      {/* ─── Sub-Navbar (Back to Main) ─── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/5 transition-all duration-300 py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
          <Link href="/#projects" className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Back to Showcase
          </Link>
          <div className="text-zinc-500 text-xs font-mono select-none">
            ENGINEERING REPORT // 2026
          </div>
        </div>
      </nav>

      {/* ─── SECTION 1: CINEMATIC PROJECT HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden border-b border-white/5">
        {/* Canvas background overlay */}
        <canvas ref={heroCanvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* Ambient background blur blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Descriptions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
                {project.category}
              </span>
              <span className="text-zinc-500 text-xs font-mono">• {project.date}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                {project.title}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8 max-w-xl font-sans"
            >
              {project.shortDescription}
            </motion.p>

            {/* Quick Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.6 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 text-[10px] font-mono rounded bg-zinc-900/60 border border-white/5 text-zinc-300">
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer active:scale-95"
                >
                  <FiExternalLink /> Live Application
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-white/20 font-semibold text-xs tracking-wider uppercase transition-all duration-300 text-white cursor-pointer active:scale-95"
                >
                  <FiGithub /> Github Source
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column: Visual Mockup Showcase */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-purple-500/5 rounded-[32px] blur-2xl opacity-50" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="w-full aspect-square max-w-[420px] rounded-3xl glass-card border border-white/10 relative overflow-hidden flex flex-col px-8 py-6 shadow-2xl bg-zinc-950/80 backdrop-blur-2xl"
            >
              {/* Mockup Header tab bars */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 px-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  {project.id}.service
                </span>
              </div>

              {/* Mockup Interactive Render Area */}
              <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                {project.id === "agentic-ai-assistant" && (
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-3 font-mono text-[10px] text-zinc-400">
                      <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                        <span className="text-blue-400 flex items-center gap-1.5"><FiCpu /> Active Agent:</span>
                        <span className="text-zinc-200 uppercase font-bold">{mockState.activeAgent}</span>
                      </div>
                      <div className="p-3 bg-zinc-950 rounded border border-white/5 space-y-1.5 max-h-[160px] overflow-y-auto">
                        <div className="text-zinc-600 font-bold">// EXECUTION LOGS:</div>
                        <div>&gt; Initializing CrewAI supervisor node...</div>
                        <div>&gt; Router handshaked with FAISS database.</div>
                        {mockState.activeAgent === "Researcher" ? (
                          <div className="text-blue-400">&gt; Researcher parsing query segments... [Retrieving RAG vectors]</div>
                        ) : (
                          <div className="text-emerald-400">&gt; Writer compiling executive answer utilizing Claude-3.5 model.</div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={() => setMockState((prev: any) => ({ ...prev, activeAgent: "Researcher" }))}
                        className={`flex-1 py-2 rounded text-[10px] font-mono tracking-widest font-bold uppercase transition-all duration-300 ${mockState.activeAgent === "Researcher" ? "bg-blue-600 text-white shadow-lg" : "bg-zinc-900 text-zinc-400 border border-white/5"}`}
                      >
                        Researcher
                      </button>
                      <button
                        onClick={() => setMockState((prev: any) => ({ ...prev, activeAgent: "Writer" }))}
                        className={`flex-1 py-2 rounded text-[10px] font-mono tracking-widest font-bold uppercase transition-all duration-300 ${mockState.activeAgent === "Writer" ? "bg-emerald-600 text-white shadow-lg" : "bg-zinc-900 text-zinc-400 border border-white/5"}`}
                      >
                        Writer Agent
                      </button>
                    </div>
                  </div>
                )}

                {project.id === "multi-pdf-chatbot" && (
                  <div className="flex-1 flex flex-col text-left justify-between h-full">
                    {/* Chat Area */}
                    <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1 flex-1">
                      {mockState.chatHistory.map((chat: any, i: number) => (
                        <div key={i} className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${chat.sender === "user" ? "bg-zinc-900 border-white/5 self-end ml-8" : "bg-blue-950/20 border-blue-500/10 mr-8 text-zinc-300"}`}>
                          <div className="font-bold font-mono text-[9px] text-zinc-500 mb-1">
                            {chat.sender === "user" ? "USER_PROMPT" : "RAG_RESPONSE"}
                          </div>
                          <div>{chat.text}</div>
                          {chat.sources && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {chat.sources.map((s: string, idx: number) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Chat Input */}
                    <form onSubmit={handleChatSubmit} className="flex gap-2 pt-4 border-t border-white/5 mt-3">
                      <input
                        type="text"
                        value={mockState.chatQuery}
                        onChange={(e) => setMockState((prev: any) => ({ ...prev, chatQuery: e.target.value }))}
                        placeholder="Ask RAG chatbot..."
                        className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                      />
                      <button type="submit" className="p-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-xs cursor-pointer transition-colors">
                        <FiSend />
                      </button>
                    </form>
                  </div>
                )}

                {project.id === "ai-resume-analyzer" && (
                  <div className="flex-1 flex flex-col justify-between text-left">
                    {!mockState.parsedResume ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 hover:border-blue-500/40 rounded-2xl transition-colors cursor-pointer text-center" onClick={handleResumeDrop}>
                        <FiFileText className="text-3xl text-zinc-600 mb-2 animate-bounce" />
                        <span className="text-xs text-zinc-400 font-mono">Click to simulate drop of 'Resume.pdf'</span>
                      </div>
                    ) : mockState.parsedResume === "parsing" ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <div className="w-8 h-8 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin mb-3" />
                        <span className="text-xs text-zinc-400 font-mono">ATS Semantic parsing in execution...</span>
                      </div>
                    ) : (
                      <div className="space-y-3 font-mono text-[10px] text-zinc-300">
                        <div className="flex items-center justify-between p-2.5 rounded bg-blue-500/10 border border-blue-500/20">
                          <span>ATS Compatibility Score:</span>
                          <span className="text-emerald-400 font-bold text-sm">{mockState.parsedResume.score}%</span>
                        </div>
                        <div className="space-y-1.5 p-3 bg-zinc-950 border border-white/5 rounded">
                          <div className="text-zinc-500 font-bold text-[9px] uppercase tracking-wider">Identified Skill Alignment:</div>
                          <div className="flex flex-wrap gap-1">
                            {mockState.parsedResume.extractedSkills.map((s: string, idx: number) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-[9px]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-zinc-950 border border-white/5 rounded">
                          <div className="text-zinc-500 font-bold text-[9px] uppercase tracking-wider">Recommendations:</div>
                          <p className="text-[9px] leading-relaxed text-zinc-400">{mockState.parsedResume.improvements}</p>
                        </div>
                        <button onClick={() => setMockState((prev: any) => ({ ...prev, parsedResume: null }))} className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 rounded text-[9px] uppercase tracking-wider transition-colors cursor-pointer">
                          Reset Analysis
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {project.id === "task-management-system" && (
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-3 font-mono text-[10px] text-zinc-300">
                      <div className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5">
                        <span className="text-zinc-500">API Endpoint Latency:</span>
                        <span className="text-emerald-400 font-bold">&lt; 38ms</span>
                      </div>
                      <div className="p-3 bg-zinc-950 border border-white/5 rounded space-y-2">
                        <div className="text-zinc-500 font-bold text-[9px] uppercase">Active Transactions:</div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[9px]">
                            <span>GET /api/tasks</span>
                            <span className="text-emerald-400">200 OK (14ms)</span>
                          </div>
                          <div className="flex justify-between text-[9px]">
                            <span>POST /api/tasks/create</span>
                            <span className="text-emerald-400">201 Created (29ms)</span>
                          </div>
                          <div className="flex justify-between text-[9px]">
                            <span>DELETE /api/teams/remove</span>
                            <span className="text-yellow-500">401 Unauthorized (8ms)</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-950/20 border border-blue-500/10 rounded">
                        <div className="text-blue-400 font-bold text-[9px] uppercase mb-1">Prisma PostgreSQL Sync:</div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-[99.9%]" />
                        </div>
                        <div className="flex justify-between text-[8px] text-zinc-500 mt-1">
                          <span>Pool status: Connected</span>
                          <span>Uptime: 99.9%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 & 3: OVERVIEW & PROBLEM STATEMENT ─── */}
      <section className="py-20 lg:py-32 border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left side: narrative overview */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-3">
                  01 // EXECUTIVE SUMMARY
                </span>
                <h2 className="text-3xl font-extrabold mb-6 tracking-tight">
                  Project Overview
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {/* Problem statement card */}
              <div className="p-8 rounded-3xl glass-card border border-amber-500/20 bg-amber-500/[0.02] relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-3">
                  02 // CHALLENGE HYPOTHESIS
                </span>
                <h3 className="text-xl font-bold mb-4 text-white">
                  The Problem Statement
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed font-sans">
                  {project.problemStatement}
                </p>
              </div>
            </div>

            {/* Right side: quick stats / key dates / metadata card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 p-8 rounded-3xl glass-card border border-white/10 bg-zinc-950/40 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-3 uppercase tracking-wider font-mono">
                    Project Blueprint
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="text-xs font-mono text-zinc-500 block mb-1">LAUNCHED</span>
                      <span className="text-base text-zinc-200 font-semibold">{project.date}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zinc-500 block mb-1">CATEGORY</span>
                      <span className="text-base text-zinc-200 font-semibold">{project.category}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zinc-500 block mb-1">STAGE</span>
                      <span className="text-base text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Production
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zinc-500 block mb-1">CLIENT ACCESS</span>
                      <span className="text-base text-zinc-200 font-semibold">Public</span>
                    </div>
                  </div>
                </div>

                <hr className="my-8 border-white/5" />

                {/* Key Metrics block */}
                <div>
                  <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
                    Key Performance Indicators
                  </h4>
                  <div className="space-y-4">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5">
                        <span className="text-sm text-zinc-400 font-sans">{metric.label}</span>
                        <span className="text-lg font-bold text-white font-mono">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 4: SYSTEM ARCHITECTURE FLOW PIPELINE ─── */}
      <section className="py-20 lg:py-32 border-b border-white/5 relative z-10 bg-zinc-950/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-3">
            03 // PIPELINE INFRASTRUCTURE
          </span>
          <h2 className="text-3xl font-extrabold mb-12 tracking-tight">
            System Architecture & Data Flow
          </h2>

          {/* Interactive node visualization container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left side: Node list */}
            <div className="lg:col-span-5 space-y-3 text-left">
              {(ARCHITECTURES[project.id] || []).map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveArchIndex(idx)}
                  className={`w-full p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer flex gap-4 items-center ${activeArchIndex === idx ? "bg-blue-600/10 border-blue-500/40 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200"}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${activeArchIndex === idx ? "bg-blue-500 text-white" : "bg-zinc-800 text-zinc-500"}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono tracking-wide uppercase">{step.title}</h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Right side: Description box showing data details */}
            <div className="lg:col-span-7 flex">
              <div className="w-full p-8 rounded-2xl glass-card border border-white/10 bg-zinc-950/70 backdrop-blur-xl flex flex-col justify-between text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3 text-zinc-500 font-mono text-xs border-b border-white/5 pb-4">
                    <FiLayers className="text-blue-400" />
                    <span>STEP DATA INSPECTOR: NODE_{activeArchIndex + 1}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                      {(ARCHITECTURES[project.id]?.[activeArchIndex]?.title) || "Loading..."}
                    </h3>
                    <p className="text-lg text-zinc-400 leading-relaxed font-sans">
                      {(ARCHITECTURES[project.id]?.[activeArchIndex]?.desc) || "No detailed specifications."}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-xs font-mono text-zinc-500">
                  <span>SECURITY: AES_256 GCM VALIDATED</span>
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    Active Connection
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: KEY FEATURES CARD SHOWCASE ─── */}
      <section className="py-20 lg:py-32 border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-3">
            04 // PRODUCT CAPABILITIES
          </span>
          <h2 className="text-3xl font-extrabold mb-16 tracking-tight">
            Key System Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Synthesizing features list from metadata */}
            {(project.id === "agentic-ai-assistant" ? [
              { title: "Multi-Agent System", desc: "Coordinates CrewAI research and drafting agents.", icon: FiCpu },
              { title: "FAISS Vector DB", desc: "Maintains indexed contextual storage nodes.", icon: FiLayers },
              { title: "Conversational QA", desc: "Translates complex queries using Claude pipelines.", icon: FiCode },
            ] : project.id === "multi-pdf-chatbot" ? [
              { title: "Batch PDF Ingestion", desc: "Extracts character layers from document buffers.", icon: FiFileText },
              { title: "Recursive Tokenizer", desc: "Generates semantic text overlapping boundaries.", icon: FiLayers },
              { title: "Gemini Embedding", desc: "Resolves vector mapping indexes at scale.", icon: FiCpu },
            ] : project.id === "ai-resume-analyzer" ? [
              { title: "ATS Match scoring", desc: "Calculates keyword presence frequencies.", icon: FiTrendingUp },
              { title: "Skill Gap Engine", desc: "Highlights critical nouns lacking from resume.", icon: FiSearch },
              { title: "LLM Review Draft", desc: "Constructs direct improvements list.", icon: FiFileText },
            ] : [
              { title: "JWT Auth Gate", desc: "Secures route connections using session signatures.", icon: FiUser },
              { title: "Prisma Schema DB", desc: "Handles relational mapping queries.", icon: FiLayers },
              { title: "Optimistic State", desc: "Triggers instant page UI refreshes on action.", icon: FiActivity },
            ]).map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl glass-card border border-white/5 hover:border-blue-500/20 bg-zinc-950/20 text-left hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group shadow-lg"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.02] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/5 transition-all duration-500" />
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: TECH STACK VISUALIZATION ─── */}
      <section className="py-20 lg:py-32 border-b border-white/5 relative z-10 bg-zinc-950/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-3">
            05 // INFRASTRUCTURE MATRIX
          </span>
          <h2 className="text-3xl font-extrabold mb-16 tracking-tight">
            Technology Categorization
          </h2>

          <div className={`grid grid-cols-1 ${
            getTechCategories(project.tech).length === 1 ? "md:grid-cols-1 max-w-md mx-auto" :
            getTechCategories(project.tech).length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" :
            "md:grid-cols-3"
          } gap-8`}>
            {getTechCategories(project.tech).map(([category, items], i) => (
              <div
                key={i}
                className="p-8 rounded-2xl glass-card border border-white/5 bg-zinc-950/40 relative overflow-hidden text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/[0.02] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6 border-b border-white/5 pb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {items.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-2 text-xs font-mono rounded-lg bg-zinc-900 border border-white/10 hover:border-blue-500/30 text-zinc-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: CHALLENGES & SOLUTIONS TIMELINE ─── */}
      <section className="py-20 lg:py-32 border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-3">
            06 // ENGINEERING SOLUTIONS
          </span>
          <h2 className="text-3xl font-extrabold mb-16 tracking-tight">
            Challenges & Solutions
          </h2>

          <div className="max-w-4xl mx-auto space-y-12 text-left relative">
            {/* Visual connecting timeline center line */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-zinc-900 pointer-events-none" />

            {(CHALLENGE_SOLUTIONS[project.id] || []).map((cs, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start">
                
                {/* Timeline node bullet */}
                <div className="absolute left-4 md:left-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-black -translate-x-1/2 z-20 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

                {/* Left Card: Challenge */}
                <div className="w-full md:flex-1 pl-12 md:pl-0 md:pr-12">
                  <div className="px-8 py-6 rounded-2xl glass-card border border-red-500/10 bg-red-500/[0.01] hover:border-red-500/20 transition-all duration-300">
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold block mb-2">
                      CHALLENGE #{idx + 1}
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                      {cs.challenge}
                    </p>
                  </div>
                </div>

                {/* Right Card: Solution */}
                <div className="w-full md:flex-1 pl-12 md:pl-12">
                  <div className="px-8 py-6 rounded-2xl glass-card border border-emerald-500/10 bg-emerald-500/[0.01] hover:border-emerald-500/20 transition-all duration-300">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-2">
                      ENGINEERING SOLUTION
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                      {cs.solution}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: RESULTS & IMPACT ─── */}
      <section className="py-20 lg:py-32 border-b border-white/5 relative z-10 bg-zinc-950/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-3">
            07 // RESULTS & IMPACT
          </span>
          <h2 className="text-3xl font-extrabold mb-16 tracking-tight">
            Outcome & Scalability
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Narrative text block */}
            <div className="p-8 rounded-3xl glass-card border border-white/5 bg-zinc-950/40 text-left flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
                  CASE STUDY CONCLUSION
                </span>
                <p className="text-lg leading-relaxed text-zinc-400 font-sans">
                  {project.outcome}
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 mt-8 flex items-center gap-3">
                <FiCheckCircle className="text-emerald-400 text-lg flex-shrink-0" />
                <span className="text-xs font-mono text-zinc-400">Project certified production-grade under test specs.</span>
              </div>
            </div>

            {/* Performance charts / Metrics summary panel */}
            <div className="p-8 rounded-3xl glass-card border border-blue-500/10 bg-blue-500/[0.01] text-left flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="space-y-6 relative z-10">
                <span className="text-xs font-mono uppercase text-blue-400 tracking-wider">
                  SYSTEM PERFORMANCE KPIs
                </span>
                <div className="space-y-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-400">{metric.label.toUpperCase()}</span>
                        <span className="text-white font-bold">{metric.value}</span>
                      </div>
                      <div className="w-full bg-zinc-900/60 h-2 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                          style={{ width: metric.value.includes("%") ? metric.value : "75%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 mt-8">
                COMPILATION DATA CHECK // COMPLETED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 10: ROADMAP / FUTURE ROAD ─── */}
      <section className="py-20 lg:py-32 border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-3">
            08 // ROADMAP INFRASTRUCTURE
          </span>
          <h2 className="text-3xl font-extrabold mb-16 tracking-tight">
            Future Scale & Optimizations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {(project.id === "agentic-ai-assistant" ? [
              { step: "LLM Mesh Integration", desc: "Integrating open-source models (like Llama-3.1) locally using Ollama/vLLM endpoints for strict parameter confidentiality." },
              { step: "Hybrid Routing", desc: "Adding semantic vector similarity checks before query routing to prevent routing overhead on simple keyword query profiles." }
            ] : project.id === "multi-pdf-chatbot" ? [
              { step: "Dynamic Metadata Filtering", desc: "Allowing users to filter queries on PDF uploads using custom tag attributes like author, publisher date, or document category." },
              { step: "Semantic Caching", desc: "Integrating Redis Semantic Cache clusters to return vector queries under 10ms for highly correlated query sets." }
            ] : project.id === "ai-resume-analyzer" ? [
              { step: "Semantic Keyword Generator", desc: "Using local LLMs to automatically suggest synonyms of missing technical keywords to avoid keyword stuffing." },
              { step: "Recruiter Dashboard", desc: "Expanding the interface into a multi-seat recruiter pipeline interface allowing bulk uploads and automated classification lists." }
            ] : [
              { step: "Real-time WebSockets", desc: "Integrating socket.io connection layers for team task movement updates synchronizing state across multiple users concurrently." },
              { step: "AI Auto-scheduler", desc: "Building a RAG-based automated assistant to delegate tasks based on developer skills and capacity constraints." }
            ]).map((rd, i) => (
              <div
                key={i}
                className="px-8 py-6 rounded-2xl glass-card border border-white/5 hover:border-blue-500/10 bg-zinc-950/20 transition-all duration-300 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.01] rounded-full blur-2xl" />
                <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-2">
                  ROADMAP CARD // PHASE {i + 1}
                </span>
                <h3 className="text-base font-bold text-zinc-100 mb-2">{rd.step}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{rd.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 11: NEXT PROJECT FOOTER NAVIGATION ─── */}
      <section className="py-16 lg:py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Prev Project Card */}
            <Link
              href={`/projects/${prevProject.id}`}
              className="p-8 rounded-3xl border border-white/5 hover:border-blue-500/20 bg-zinc-950/20 hover:bg-zinc-950/50 text-left transition-all duration-500 block relative overflow-hidden group shadow-lg cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.01] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/5 transition-all duration-500" />
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-2">
                PREVIOUS PROJECT
              </span>
              <h3 className="text-xl font-bold text-zinc-300 group-hover:text-white transition-colors">
                {prevProject.title}
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-2 line-clamp-1">
                {prevProject.shortDescription}
              </p>
            </Link>

            {/* Next Project Card */}
            <Link
              href={`/projects/${nextProject.id}`}
              className="p-8 rounded-3xl border border-white/5 hover:border-purple-500/20 bg-zinc-950/20 hover:bg-zinc-950/50 text-right transition-all duration-500 block relative overflow-hidden group shadow-lg cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/[0.01] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 group-hover:bg-purple-500/5 transition-all duration-500" />
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-2">
                NEXT PROJECT
              </span>
              <h3 className="text-xl font-bold text-zinc-300 group-hover:text-white transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-xs text-zinc-500 font-sans mt-2 line-clamp-1">
                {nextProject.shortDescription}
              </p>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
