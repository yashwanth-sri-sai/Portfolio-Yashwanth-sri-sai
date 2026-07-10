"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  FiSend, 
  FiX, 
  FiNavigation, 
  FiLayers, 
  FiAlertTriangle
} from "react-icons/fi";
import { RESUME_DATA } from "@/data/resumeContext";

// Interface for Chat Messages
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  projectId?: string;
  sectionId?: string;
  isStreaming?: boolean;
}

// Suggestion Chips aligned with Yash.OS / LOST KD guide
const SUGGESTIONS = [
  { label: "🚀 Best AI Project", query: "Show best AI project" },
  { label: "🏗 Architecture Explorer", query: "Explain NoteAI" },
  { label: "🧠 Knowledge Graph", query: "Where have you used FastAPI?" },
  { label: "⚙ Backend Stack", query: "Backend experience" },
  { label: "📜 Certifications", query: "Show certifications" },
  { label: "📄 Resume Summary", query: "Resume summary" },
  { label: "🎯 Interview Me", query: "Start mock interview" }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStep, setInitStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello, I'm LOST KD.

I'm the AI Engineering Guide inside Yash.OS.

I can help you explore:
• Projects & Live Demos
• Interactive Architecture Explorer
• Engineering Knowledge Graph
• Certifications Vault
• Technical Decisions & Resume
• Backend Engineering & AI Systems
• Mock Interviews

What would you like to build today?`,
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("AI Core Online");
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [interviewStep, setInterviewStep] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isInitializing]);

  // Load configuration check on mount to set correct initial state
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/chat");
        if (res.ok) {
          const data = await res.json();
          if (data.online) {
            setIsLocalMode(false);
            setApiError(null);
            setStatusMessage("AI Core Online");
          } else {
            setIsLocalMode(true);
            setApiError("MISSING_KEYS");
            setStatusMessage("Local Knowledge Mode");
          }
        } else {
          throw new Error("Status check failed");
        }
      } catch (err) {
        console.warn("Could not retrieve AI Assistant online status:", err);
        setIsLocalMode(true);
        setStatusMessage("Local Knowledge Mode");
      }
    };
    checkStatus();
  }, []);

  // Boot startup animation sequence when assistant opens
  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true);
      setInitStep(0);
      const steps = [
        { delay: 100, step: 1 },  // Initializing Yash.OS...
        { delay: 300, step: 2 },  // Loading LOST KD...
        { delay: 500, step: 3 },  // Loading Engineering Knowledge...
        { delay: 700, step: 4 },  // Projects Indexed
        { delay: 850, step: 5 },  // Architecture Explorer Ready
        { delay: 1000, step: 6 }, // AI Core Online
        { delay: 1150, step: 7 }, // Welcome.
        { delay: 1300, step: 8 }  // Complete
      ];
      const timers = steps.map(s => setTimeout(() => {
        setInitStep(s.step);
        if (s.step === 8) {
          setIsInitializing(false);
        }
      }, s.delay));
      return () => timers.forEach(clearTimeout);
    } else {
      setIsInitializing(false);
      setInitStep(0);
    }
  }, [isOpen]);

  // Handle smooth scroll to section
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      if (window.lenis) {
        // @ts-expect-error: lenis global type is incomplete
        window.lenis.scrollTo(targetElement, { offset: -50 });
      } else {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Add a brief glow highlight to the section
      targetElement.style.transition = "box-shadow 0.5s ease-in-out";
      targetElement.style.boxShadow = "0 0 50px rgba(6, 182, 212, 0.25)";
      
      // Close the assistant on mobile to allow viewing
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }

      setTimeout(() => {
        targetElement.style.boxShadow = "";
      }, 2000);
    }
  };

  // Local fallback responder (Zero-Shot Rule Matcher)
  const getLocalResponse = (query: string): { content: string; projectId?: string; sectionId?: string } => {
    const q = query.toLowerCase().trim();
    
    // 1. Diagnostics / Quota fallback
    if (q.includes("quota") || q.includes("api") || q.includes("key") || q.includes("offline") || q.includes("error")) {
      return {
        content: "Operating on **Yash.OS Local Portfolio Knowledge**. Cloud generative services are currently offline or unavailable. I can answer questions using pre-indexed repository mappings or scroll you to any section of the page."
      };
    }

    // 2. Greetings
    if (q === "hi" || q === "hello" || q === "hey" || q === "greetings" || q.startsWith("hello ") || q.startsWith("hi ")) {
      return {
        content: "Hello, I'm **LOST KD**. I'm the AI Engineering Guide inside **Yash.OS**. I can help you explore Yashwanth's systems architecture, stack, experience, and certifications. What would you like to explore?"
      };
    }

    // 3. Conversational / Help / Commands
    if (q.includes("help") || q.includes("who are you") || q.includes("what can you do") || q.includes("commands")) {
      return {
        content: "I am **LOST KD**, Yashwanth's Engineering Guide. I can walk you through:\n- **Overview**: 'projects', 'skills', 'certifications', 'resume summary', 'contact'\n- **Specific Projects**: 'explain noteai', 'agentic ai', 'pdf chatbot', 'phishing detection'\n- **Recruiter**: 'why hire', 'strongest skills', 'best SDE project'\n- **Interaction**: 'start mock interview' to evaluate developer skills!"
      };
    }

    // 4. Best AI Project / AI projects
    if (q.includes("best ai") || (q.includes("ai project") && !q.includes("explain"))) {
      return {
        content: "Yashwanth's best AI project is **NoteAI (AI-Powered Smart Note Taking SaaS)**. It leverages **FastAPI**, **Next.js**, **PostgreSQL**, and **Gemini AI** to transcribe voice notes, summarize meeting logs, and run high-performance similarity search lookups. I will scroll you to the Projects section to check it out.",
        projectId: "noteai",
        sectionId: "projects"
      };
    }

    // 5. Explain NoteAI
    if (q.includes("explain noteai") || q.includes("noteai architecture")) {
      // Dispatches open arch view event
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-project-architecture", { detail: { projectId: "noteai" } }));
      }
      return {
        content: "I've automatically opened the **Interactive Architecture Explorer** for **NoteAI**! \n\nHere is how the NoteAI ecosystem operates:\n1. **Next.js Client** handles voice memo capturing and Markdown editing.\n2. **FastAPI Gateway** validates JSON payloads asynchronously.\n3. **Auth Service** validates session JWT tokens stored in HttpOnly cookies.\n4. **PostgreSQL** handles CRUD operations on user notes.\n5. **FAISS Vector Engine** runs context similarity lookups.\n6. **Gemini AI** transcribes and summarizes raw audio files.",
        projectId: "noteai",
        sectionId: "projects"
      };
    }

    // 6. Where FastAPI used
    if (q.includes("where has he used fastapi") || q.includes("used fastapi") || q.includes("fastapi")) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("highlight-skill-node", { detail: { skillId: "fastapi" } }));
      }
      return {
        content: "I've highlighted **FastAPI** on the **Engineering Knowledge Graph**! \n\nYashwanth applied FastAPI to:\n1. **NoteAI**: Asynchronous REST endpoints for note transcribing and folder operations.\n2. **Agentic AI Chatbot**: Backend APIs handling agent workflows and data collection.\n3. **GitHub Repo Tracker**: Caching metadata to local PostgreSQL connection pools.",
        sectionId: "skills"
      };
    }

    // 7. Backend experience
    if (q.includes("backend") || q.includes("sde")) {
      return {
        content: "Yashwanth has strong backend experience in **Python**, **FastAPI**, **PostgreSQL**, and async APIs. He built the **GitHub Repo Tracker** to cache stats using SQLAlchemy, and FastAPI pipelines for **NoteAI** and **Agentic AI**. I will scroll you to the Skills map.",
        sectionId: "skills"
      };
    }

    // 8. AI Projects list
    if (q.includes("ai projects") || q.includes("machine learning")) {
      return {
        content: "Yashwanth has developed multiple advanced AI/ML systems: **NoteAI** (smart audio notes), **Agentic AI Chatbot** (LangChain router, FAISS), **Generative AI Multi-PDF Chatbot** (RAG, Streamlit), and **Phishing website classifier** (XGBoost). I will scroll you to the Projects list.",
        sectionId: "projects"
      };
    }

    // 9. Recruiter Mode: Why hire
    if (q.includes("why should i hire you") || q.includes("why hire") || q.includes("hire yashwanth")) {
      return {
        content: "You should hire Yashwanth because he bridges the gap between **AI engineering** (RAG pipelines, LangChain router agents) and **robust backend architecture** (async FastAPI services, transactional PostgreSQL, secure HttpOnly cookie auth). He holds B.Tech specialization in Cyber Security, meaning all his apps are built with security first-principles."
      };
    }

    // 10. Recruiter Mode: Strongest skills
    if (q.includes("strongest skills") || q.includes("core skills") || q.includes("expertise")) {
      return {
        content: "His strongest engineering domains are **AI Engineering** (LangChain, FAISS, LLM prompts tuning), **Backend Engineering** (FastAPI, Python, PostgreSQL, System Design), and **Security** (secure API routing, CORS validations, threat mitigation).",
        sectionId: "skills"
      };
    }

    // 11. Resume Mode: Summaries
    if (q.includes("resume summary") || q.includes("summary")) {
      if (q.includes("30") || q.includes("thirty")) {
        return {
          content: "**30-Second Summary**: K. Yashwanth Sri Sai is a Computer Science undergraduate at IIIT Kottayam specializing in AI/LLM systems and Backend engineering. He builds secure RAG pipelines (FAISS, LangChain) and async API services (FastAPI, Python, PostgreSQL)."
        };
      }
      if (q.includes("detailed") || q.includes("long")) {
        return {
          content: "**Detailed Summary**: K. Yashwanth Sri Sai combines advanced AI development (LLMs prompts, vector searches, agentic routers) with secure backend system design. Pursuing B.Tech CSE (Cyber Security) at IIIT Kottayam, his portfolio showcases NoteAI SaaS, LangChain-based institutional agents, and XGBoost URL features classifiers. He specializes in designing low-latency, scalable APIs using FastAPI, PostgreSQL, AWS, and Docker."
        };
      }
      // default 1-minute
      return {
        content: "**1-Minute Summary**: K. Yashwanth Sri Sai is an AI & Backend Engineer pursuing a B.Tech in CSE (Cyber Security) at IIIT Kottayam. He has built NoteAI (a smart note-taking SaaS), Agentic AI chatbots with LangChain, and machine learning phishing URL classifiers. He is proficient in Python, FastAPI, Next.js, and SQL, and is open to Internships and Full-Time roles."
      };
    }

    // 12. Certifications
    if (q.includes("certif") || q.includes("deloitte") || q.includes("tata") || q.includes("credential")) {
      return {
        content: "Yashwanth holds verified credentials including: **Data Analytics** (Deloitte), **Cybersecurity Analyst** (Tata), **Data Visualisation** (Tata), and **Business Analytics** (Microsoft). I will scroll you to the Certification Vault.",
        sectionId: "certifications"
      };
    }

    // 13. Contact
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin")) {
      return {
        content: "You can reach Yashwanth at **k.yashwanthsrisai09@gmail.com** or call **+91 9703545822**. Let me scroll you to the hiring form.",
        sectionId: "contact"
      };
    }

    // Default fallback
    return {
      content: "Operating in **Local Heuristics Mode** (API offline). I didn't quite match your phrase, but you can explore my pre-programmed knowledge base.\n\nTry asking me about:\n- **'Explain NoteAI'** to launch the Architecture Explorer\n- **'Where have you used FastAPI?'** to highlight the Skills Graph\n- **'Why should I hire you?'** or **'Strongest skills'**\n- **'Start mock interview'** to evaluate developer knowledge!"
    };
  };

  // Extract navigation signals from text responses
  const parseNavigation = (text: string): string | undefined => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("projects section") || lowerText.includes("projects view") || lowerText.includes("#projects") || lowerText.includes("projects explorer")) return "projects";
    if (lowerText.includes("timeline section") || lowerText.includes("timeline view") || lowerText.includes("#timeline") || lowerText.includes("journey")) return "timeline";
    if (lowerText.includes("skills section") || lowerText.includes("#skills") || lowerText.includes("knowledge graph")) return "skills";
    if (lowerText.includes("contact section") || lowerText.includes("#contact") || lowerText.includes("hiring form")) return "contact";
    if (lowerText.includes("certifications section") || lowerText.includes("#certifications") || lowerText.includes("certification vault")) return "certifications";
    if (lowerText.includes("about section") || lowerText.includes("#about")) return "about";
    return undefined;
  };

  // Simulate text streaming/typing animation
  const typeMessage = (
    text: string, 
    finalMessageId: string, 
    extraData: { projectId?: string, sectionId?: string },
    finalStatus?: string
  ) => {
    let currentText = "";
    const words = text.split(" ");
    let i = 0;
    
    setStatusMessage("Streaming Node Response...");
    
    const timer = setInterval(() => {
      if (i < words.length) {
        currentText += (i === 0 ? "" : " ") + words[i];
        setMessages(prev => prev.map(m => 
          m.id === finalMessageId 
            ? { ...m, content: currentText, isStreaming: true } 
            : m
        ));
        i++;
      } else {
        clearInterval(timer);
        setMessages(prev => prev.map(m => 
          m.id === finalMessageId 
            ? { ...m, content: text, isStreaming: false, ...extraData } 
            : m
        ));
        
        // Auto scroll to section if matched
        if (extraData.sectionId) {
          handleScrollToSection(extraData.sectionId);
        }

        setStatusMessage(finalStatus || (isLocalMode ? "Local Knowledge Mode" : "AI Core Online"));
      }
    }, 35); // Speed multiplier per word
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = { id: userMsgId, role: "user", content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setStatusMessage("Thinking");

    // Create placeholder for assistant response
    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantPlaceholder: Message = { 
      id: assistantMsgId, 
      role: "assistant", 
      content: "", 
      isStreaming: true 
    };
    setMessages(prev => [...prev, assistantPlaceholder]);

    const q = textToSend.toLowerCase().trim();

    // ─── INTERVIEW MODE ROUTING ───
    if (q.includes("interview") || q.includes("mock") || q.includes("start mock")) {
      setInterviewStep(1);
      setIsLoading(false);
      const startMsg = "Let's begin the mock interview! I will evaluate your knowledge in Python, FastAPI, React, RAG, LLMs, and System Design. \n\n**Question 1**: What is the main benefit of FastAPI's async/await structure compared to standard WSGI frameworks like Flask?";
      typeMessage(startMsg, assistantMsgId, {}, "Mock Interview Active");
      return;
    }

    if (interviewStep > 0) {
      setIsLoading(false);
      let replyText = "";
      let nextStep = interviewStep + 1;
      
      if (interviewStep === 1) {
        replyText = "Good response! FastAPI is built on ASGI (Asynchronous Server Gateway Interface), which natively handles concurrent requests asynchronously using Python's async/await. Flask is classically a WSGI framework which blocks execution threads unless configured with multi-worker threads.\n\n**Question 2**: What is the purpose of 'token overlap' when chunking documents in a Retrieval-Augmented Generation (RAG) pipeline?";
      } else if (interviewStep === 2) {
        replyText = "Spot on! Token overlap preserves semantic context boundaries. Without overlap, a critical sentence split in half across two chunks might lose its context, leading to poor embeddings and similarity search failure.\n\n**Question 3**: How does React's virtual DOM reconciliation optimize render performance?";
      } else if (interviewStep === 3) {
        replyText = "Excellent. React constructs a Virtual DOM tree in memory, diffs it with the previous snapshot, and applies only the minimum necessary changes (patches) to the real browser DOM, saving expensive DOM paint operations.\n\n**Question 4**: In system design, what security measures defend against prompt injection attacks on LLM API endpoints?";
      } else {
        replyText = "Precisely! Validating input schemas, implementing strict system instructions boundaries, utilizing prompt defenses models, and parsing output outputs as structured JSON are key security practices. \n\n**Mock Interview Completed!** You demonstrated strong proficiency in async APIs, semantic chunking strategy, rendering performance, and secure prompt sanitization. You are highly aligned with Yashwanth's engineering standards!";
        nextStep = 0; // reset
      }
      
      setInterviewStep(nextStep);
      typeMessage(replyText, assistantMsgId, {}, nextStep > 0 ? "Mock Interview Active" : (isLocalMode ? "Local Knowledge Mode" : "AI Core Online"));
      return;
    }

    // ─── DYNAMIC NAVIGATION EVENTS TRIGGER ───
    if (q.includes("explain noteai") || q.includes("noteai architecture")) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-project-architecture", { detail: { projectId: "noteai" } }));
      }
    }
    if (q.includes("where has he used fastapi") || q.includes("used fastapi") || q.includes("fastapi")) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("highlight-skill-node", { detail: { skillId: "fastapi" } }));
      }
    }
    if (q.includes("where has he used langchain") || q.includes("used langchain") || q.includes("langchain")) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("highlight-skill-node", { detail: { skillId: "langchain" } }));
      }
    }

    try {
      // Send API request
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      setIsLoading(false);

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();

      if (data.fallback) {
        setIsLocalMode(true);
        const errorType = data.errorType || "SERVER_ERROR";
        setApiError(errorType);

        const finalStatus = "Local Knowledge Mode";
        setStatusMessage(finalStatus);

        const fallbackRes = getLocalResponse(textToSend);
        typeMessage(
          fallbackRes.content, 
          assistantMsgId, 
          { projectId: fallbackRes.projectId, sectionId: fallbackRes.sectionId },
          finalStatus
        );
      } else if (data.response) {
        setIsLocalMode(false);
        setApiError(null);
        setStatusMessage("AI Core Online");
        const reply = data.response;
        const sectionId = parseNavigation(reply);
        
        // Check if reply references a project
        let projectId: string | undefined;
        const lowerReply = reply.toLowerCase();
        if (lowerReply.includes("agentic ai")) projectId = "agentic-ai";
        else if (lowerReply.includes("multi-pdf") || lowerReply.includes("pdf chatbot")) projectId = "pdf-chatbot";
        else if (lowerReply.includes("phishing") || lowerReply.includes("website detection")) projectId = "phishing-detection";
        else if (lowerReply.includes("resume analyzer") || lowerReply.includes("ats")) projectId = "ai-resume-analyzer";
        else if (lowerReply.includes("task management") || lowerReply.includes("task manager") || lowerReply.includes("task-management")) projectId = "task-management-system";
        else if (lowerReply.includes("hr") || lowerReply.includes("dashboard") || lowerReply.includes("admin")) projectId = "modern-hr-admin-dashboard";
        else if (lowerReply.includes("bitcoin") || lowerReply.includes("sentiment")) projectId = "bitcoin-sentiment-performance";
        else if (lowerReply.includes("tracker") || lowerReply.includes("github repo") || lowerReply.includes("rest api")) projectId = "rest-api-backend";
        else if (lowerReply.includes("salesforge") || lowerReply.includes("sales")) projectId = "salesforge";

        typeMessage(reply, assistantMsgId, { projectId, sectionId }, "AI Core Online");
      } else {
        throw new Error("Malformed response");
      }
    } catch (err) {
      console.warn("API Request exception encountered:", err);
      setIsLoading(false);
      setIsLocalMode(true);
      setApiError("NETWORK_ERROR");
      const finalStatus = "Local Knowledge Mode";
      setStatusMessage(finalStatus);
      const fallbackRes = getLocalResponse(textToSend);
      typeMessage(
        fallbackRes.content, 
        assistantMsgId, 
        { projectId: fallbackRes.projectId, sectionId: fallbackRes.sectionId },
        finalStatus
      );
    }
  };

  // Helper function to render text with bold tags and custom styles
  const formatMessageText = (content: string) => {
    // Split by newlines first to render paragraphs correctly
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
      // Basic bold parsing: **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const renderedLine = parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const text = part.slice(2, -2);
          return (
            <strong key={index} className="text-white font-semibold">
              {text}
            </strong>
          );
        }
        return part;
      });

      return (
        <React.Fragment key={lineIdx}>
          {renderedLine}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // Mini project card inside chat
  const renderInlineProjectCard = (projectId: string) => {
    const project = RESUME_DATA.projects.find(p => p.id === projectId);
    
    if (!project) return null;

    return (
      <div className="mt-3 p-4 rounded-xl bg-black/40 border border-cyan-500/20 backdrop-blur-md">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
            <FiLayers /> {project.role}
          </span>
          <span className="text-[10px] text-white/50">{project.duration}</span>
        </div>
        <h4 className="text-sm font-bold text-white mb-1">{project.name}</h4>
        <p className="text-xs text-white/70 mb-3 leading-relaxed text-left">
          {project.overview}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 4).map(tech => (
            <span key={tech} className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/10">
              {tech}
            </span>
          ))}
        </div>
        <button
          onClick={() => handleScrollToSection(project.sectionId || "projects")}
          className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1 transition-all cursor-pointer border-0"
        >
          <FiNavigation className="text-[10px]" /> View on Page
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Floating AI Orb Trigger - Styled as Yash.OS Brand Gateway */}
      <div className="fixed bottom-6 right-6 z-[999] flex items-center justify-center">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Assistant"
          className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(99,102,241,0.4)] focus:outline-none border-0"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(99, 102, 241, 0.85), rgba(6, 182, 212, 0.95))",
          }}
          whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(6,182,212,0.6)" }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* Animated Orbital Ring */}
          <div className="absolute inset-[-4px] rounded-full border border-cyan-500/30 animate-spin-reverse opacity-60" style={{ borderStyle: "dashed" }} />
          <div className="absolute inset-[-8px] rounded-full border border-blue-400/20 animate-spin opacity-40" />

          {/* Glowing Orb Center */}
          <div className="absolute inset-2 rounded-full bg-indigo-400/20 blur-[6px] animate-pulse-glow" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiX className="text-white text-2xl" />
              </motion.div>
            ) : (
              <motion.div
                key="orb"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative shrink-0 mt-1">
                  <Image src="/logo.png" alt="Yash.OS logo" width={48} height={20} className="h-5 w-auto object-contain" />
                  <div className="absolute -bottom-1.5 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#030308] rounded-full"></div>
                </div>
                <span className="text-[8px] text-cyan-200 uppercase font-black tracking-wider mt-1 select-none">LOST KD</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Yash.OS LOST KD Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[400px] h-[550px] z-[998] flex flex-col rounded-3xl overflow-hidden glass-primary"
          >
            {/* Header section with ambient glow background */}
            <div className="relative px-5 py-4 border-b border-white/5 flex flex-col gap-3 overflow-hidden select-none">
              <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
              
              {/* Row 1: Logo and Version */}
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center">
                  <Image src="/logo.png" alt="Yash.OS" width={110} height={30} className="h-6.5 w-auto object-contain" priority />
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 font-mono tracking-wider font-bold">
                  v3.0
                </span>
              </div>

              {/* Row 2: Assistant Details & Status */}
              <div className="flex justify-between items-end relative z-10">
                <div className="text-left">
                  <h3 className="text-sm font-black tracking-widest text-white leading-none">
                    LOST KD
                  </h3>
                  <p className="text-[9px] text-white/50 tracking-wider mt-1 font-mono uppercase">
                    AI Portfolio Engineer
                  </p>
                  <p className="text-[8px] text-zinc-500 mt-0.5 font-mono">
                    Powered by Yash.OS
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                        isInitializing ? "bg-purple-500" :
                        isLoading ? "bg-blue-500 animate-pulse" :
                        isLocalMode ? "bg-amber-500" : "bg-emerald-500"
                      }`}></span>
                    </span>
                    <span className={`text-[9px] font-mono font-bold tracking-wide uppercase ${
                      isInitializing ? "text-purple-400" :
                      isLoading ? "text-blue-400" :
                      isLocalMode ? "text-amber-400" : "text-emerald-400"
                    }`}>
                      {isInitializing ? "Initializing" :
                       isLoading ? "Thinking" :
                       isLocalMode ? "Local Knowledge Mode" : "AI Core Online"}
                    </span>
                  </div>
                  {!isInitializing && (
                    <span className="text-[7.5px] text-zinc-500 font-mono leading-none">
                      {isLocalMode ? "Using pre-indexed dataset" : `Gemini - gemini-2.5-flash`}
                    </span>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
                className="absolute top-4 right-4 z-20 p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer border-0 bg-transparent"
              >
                <FiX className="text-base" />
              </button>
            </div>

            {/* Banner if in Local Mode */}
            {isLocalMode && !isInitializing && (
              <div className="mx-5 mt-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-200/90 flex flex-col gap-1 shadow-[0_4px_12px_rgba(245,158,11,0.05)] text-left animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-amber-400 font-mono text-[10px] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>Running on local portfolio knowledge.</span>
                </div>
                <p className="text-[10px] leading-relaxed text-amber-200/60 font-sans">
                  Cloud AI is currently offline or unavailable. Operating in secure offline mode using pre-indexed knowledge base.
                </p>
              </div>
            )}

            {/* Main view: Boot loader sequence or Chat Messages */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4 flex flex-col"
              style={{ scrollbarWidth: "thin" }}
            >
              {isInitializing ? (
                /* Cinematic console loading sequence */
                <div className="flex-1 flex flex-col justify-center px-2 space-y-2.5 font-mono text-left select-none text-[11px] text-zinc-400/80">
                  <div className="space-y-1 bg-black/40 border border-white/5 p-5 rounded-2xl">
                    {initStep >= 1 && (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                        <span className="text-purple-400">&gt;</span> Initializing Yash.OS...
                      </motion.div>
                    )}
                    {initStep >= 2 && (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                        <span className="text-purple-400">&gt;</span> Loading LOST KD...
                      </motion.div>
                    )}
                    {initStep >= 3 && (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                        <span className="text-purple-400">&gt;</span> Loading Engineering Knowledge...
                      </motion.div>
                    )}
                    {initStep >= 4 && (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">[OK]</span> Projects Indexed
                      </motion.div>
                    )}
                    {initStep >= 5 && (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">[OK]</span> Architecture Explorer Ready
                      </motion.div>
                    )}
                    {initStep >= 6 && (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">[OK]</span> AI Core Online
                      </motion.div>
                    )}
                    {initStep >= 7 && (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-cyan-400 font-bold mt-2">
                        <span>[READY]</span> Welcome.
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                /* Chat Messages Feed */
                <>
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex gap-2.5 max-w-[85%] items-start text-left">
                        {m.role === "assistant" && (
                          <div className="w-7 h-7 rounded bg-black/40 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 p-1">
                            <Image src="/logo.png" alt="Yash.OS avatar" width={20} height={20} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div
                            className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                              m.role === "user"
                                ? "bg-indigo-600/90 text-white rounded-tr-none shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
                                : "bg-white/5 text-white/90 border border-white/5 rounded-tl-none"
                            }`}
                          >
                            {formatMessageText(m.content)}
                          </div>

                          {/* Navigation trigger button inside helper responses */}
                          {m.role === "assistant" && m.sectionId && !m.projectId && (
                            <button
                              onClick={() => handleScrollToSection(m.sectionId!)}
                              aria-label={`Navigate to ${m.sectionId}`}
                              className="self-start mt-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-300 text-[10px] font-medium flex items-center gap-1 transition-all cursor-pointer border-0"
                            >
                              <FiNavigation className="text-[9px]" /> Navigate to {m.sectionId.toUpperCase()}
                            </button>
                          )}

                          {/* Detailed inline project card */}
                          {m.role === "assistant" && m.projectId && (
                            renderInlineProjectCard(m.projectId)
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Thinking Loader State */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2.5 max-w-[85%] items-start">
                        <div className="w-7 h-7 rounded bg-black/40 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 p-1 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.15, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                              duration: 1.2, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                            className="w-full h-full relative"
                          >
                            <Image src="/logo.png" alt="Yash.OS Loading" fill className="object-contain" />
                          </motion.div>
                        </div>
                        <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-1.5 h-8">
                          <span className="text-[10px] font-mono text-cyan-400/80 tracking-wider">thinking</span>
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-5 py-2 overflow-x-auto flex gap-2 border-t border-white/5 bg-black/10 shrink-0 select-none no-scrollbar">
              {SUGGESTIONS.map((s, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(s.query)}
                  aria-label={`Suggestion: ${s.label}`}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white/80 hover:text-white text-xs whitespace-nowrap cursor-pointer transition-all shrink-0 animate-pulse-glow"
                  disabled={isLoading || isInitializing}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* User Chat Input Container */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-4 border-t border-white/5 bg-black/25 flex gap-2 items-center shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={interviewStep > 0 ? "Type your response..." : "Ask LOST KD about projects, architecture, skills, or interview experience..."}
                className="flex-1 bg-white/5 border border-white/10 hover:border-white/15 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-sans placeholder-white/35 transition-all"
                disabled={isLoading || isInitializing}
              />
              <button
                type="submit"
                aria-label="Ask LOST KD"
                className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50 transition-all border-0"
                disabled={isLoading || isInitializing || !inputValue.trim()}
              >
                <FiSend className="text-base" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
