"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSend, 
  FiX, 
  FiNavigation, 
  FiTerminal, 
  FiLayers, 
  FiExternalLink,
  FiChevronRight,
  FiCpu,
  FiCheckCircle,
  FiUser,
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

// Suggestion Chips
const SUGGESTIONS = [
  { label: "🚀 Agentic AI Project", query: "Tell me about the Agentic AI Chat Assistant" },
  { label: "🛡️ Phishing ML Shield", query: "Tell me about the Phishing Website Detection System" },
  { label: "📊 Skills Breakdown", query: "What are your core technical skills?" },
  { label: "✉️ Contact Info", query: "How can I contact Yashwanth?" }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Greetings. I am **Lost KD**, Yashwanth's AI guide. Ask me about his projects, professional experience, or technical skills, and I can navigate the page for you. How can I help you today?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("System Ready");
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Handle smooth scroll to section
  const handleScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Add a brief glow highlight to the section
      targetElement.style.transition = "box-shadow 0.5s ease-in-out";
      targetElement.style.boxShadow = "0 0 50px rgba(96, 165, 250, 0.25)";
      
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      
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
    
    // 1. Quota / API Errors / Not behaving like chatbot / Same answer
    if (q.includes("quota") || q.includes("api") || q.includes("key") || q.includes("offline") || q.includes("error") || q.includes("same answer") || q.includes("behaving") || q.includes("openai") || q.includes("gemini") || q.includes("working")) {
      return {
        content: "⚠️ **Offline Mode Active**: I am running in local pre-programmed mode because the cloud AI API key is offline or has exceeded its usage quota (HTTP 429).\n\nTo restore full AI conversational capability, you can create a free **GEMINI_API_KEY** on Google AI Studio and place it in the `.env.local` file, then restart the dev server! In the meantime, I can answer questions about Yashwanth's projects, experience, skills, or scroll you to any section of the page."
      };
    }

    // 2. Greetings
    if (q === "hi" || q === "hello" || q === "hey" || q === "greetings" || q.startsWith("hello ") || q.startsWith("hi ")) {
      return {
        content: "Greetings! I am **Lost KD**, Yashwanth's AI guide. I'm currently running in **Local Offline Mode** (API quota exceeded). I can still navigate the page and tell you about his work. Try asking about **'projects'**, **'resume analyzer'**, **'task manager'**, **'sports lead'**, or **'skills'**!"
      };
    }

    // 3. Conversational / Help / Commands
    if (q.includes("help") || q.includes("who are you") || q.includes("what can you do") || q.includes("commands") || q === "what") {
      return {
        content: "I am **Lost KD**, K. Yashwanth Sri Sai's AI Assistant. Currently in **Offline Mode** (quota exceeded).\n\nHere are commands I recognize:\n- **Projects**: 'agentic ai', 'pdf chatbot', 'phishing detection', 'resume analyzer', 'task manager'\n- **Leadership**: 'sports', 'design', 'social media'\n- **Skills / Certificates**: 'skills', 'certifications', 'deloitte', 'tata'\n- **Milestones**: 'growth milestones', '2022', '2024', '2025', '2026'\n- **Navigation**: 'scroll to contact', 'scroll to projects', etc."
      };
    }

    // 4. Growth Milestones / Year-specific queries
    if (q.includes("milestone") || q.includes("growth") || q.includes("2022") || q.includes("2023") || q.includes("2024") || q.includes("2025") || q.includes("2026")) {
      let yearText = "starting from **2022** when he began his engineering degree.";
      if (q.includes("2022")) yearText = "specifically highlighting **2022** when he started his engineering journey.";
      if (q.includes("2024")) yearText = "specifically highlighting **2024** (his Sports Design & Media Leadership).";
      if (q.includes("2025")) yearText = "specifically highlighting **2025** (the Phishing Website Detection System and AI agent architectures).";
      if (q.includes("2026")) yearText = "specifically highlighting **2026** (graduation and futuristic engineering solutions).";
      
      return {
        content: `Yashwanth's **Growth Milestones** trace his engineering and development timeline ${yearText} I can scroll you to the **Growth Milestones / Timeline** section to view it interactively!`,
        sectionId: "timeline"
      };
    }

    // 5. Agentic AI Project
    if (q.includes("agentic") || q.includes("crew") || q.includes("decision") || q.includes("reasoning")) {
      return {
        content: "Yashwanth developed a state-of-the-art **Agentic AI Chat Assistant** utilizing **Python**, **LangChain**, **FAISS**, and **CrewAI** for autonomous task delegation and reasoning. I can scroll you to the **Projects** section to view this project in detail.",
        projectId: "agentic-ai",
        sectionId: "projects"
      };
    }
    
    // 6. PDF Chatbot
    if (q.includes("pdf") || q.includes("chatbot") || q.includes("rag") || q.includes("generative")) {
      return {
        content: "He built a **Generative AI Multi-PDF Chatbot** that serves as a scalable RAG pipeline, allowing users to query multiple complex PDFs concurrently. It employs **FAISS** vector search and integrates **Gemini/GPT** APIs. I can scroll you to the **Projects** section to explore it.",
        projectId: "pdf-chatbot",
        sectionId: "projects"
      };
    }
    
    // 8. Sports Design Leadership
    if (q.includes("sports") || q.includes("design") || q.includes("lead") || q.includes("media") || q.includes("branding")) {
      return {
        content: "Yashwanth served as the Sports Design and Social Media Lead at IIIT Kottayam (Sep 2024 - Sep 2025). He led digital branding, social media layouts, and graphic assets for sports events, coordinating media schedules and managing collaborative visual teams. I can scroll you to the **Timeline** section.",
        sectionId: "timeline"
      };
    }

    // 8b. Phishing Detection Project
    if (q.includes("phishing") || q.includes("domain") || q.includes("url") || q.includes("xgboost") || q.includes("random forest")) {
      return {
        content: "Yashwanth engineered a Phishing Website Detection System utilizing Python, Scikit-learn, Flask, Pandas, XGBoost, and Random Forest classification models to identify malicious URLs and domains. I can scroll you to the **Projects** section to show you details.",
        projectId: "phishing-detection",
        sectionId: "projects"
      };
    }

    // 8c. AI Resume Analyzer Project
    if (q.includes("resume") || q.includes("analyzer") || q.includes("ats") || q.includes("parsing") || q.includes("streamlit")) {
      return {
        content: "Yashwanth created an **AI Resume Analyzer**, a production-grade ATS evaluation tool that extracts data from PDF/DOCX/TXT files, utilizes LLMs to calculate match percentages against job descriptions, and identifies keyword gaps with Streamlit. I can scroll you to the **Projects** section to view details.",
        projectId: "ai-resume-analyzer",
        sectionId: "projects"
      };
    }

    // 8d. Task Management System Project
    if (q.includes("task") || q.includes("manager") || q.includes("prisma") || q.includes("postgresql") || q.includes("next.js") || q.includes("typescript")) {
      return {
        content: "Yashwanth built a full-stack **Task Management System** using Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL. It features secure JWT authentication, optimistic UI updates, and collaborative workspaces. I can scroll you to the **Projects** section to explore it.",
        projectId: "task-management-system",
        sectionId: "projects"
      };
    }
    
    // 9. Skills
    if (q.includes("skill") || q.includes("tech") || q.includes("framework") || q.includes("programming") || q.includes("languages") || q.includes("databases") || q.includes("devops")) {
      return {
        content: "Yashwanth is highly skilled in **Python**, **LangChain**, **CrewAI**, **FAISS**, **Scikit-learn**, **XGBoost**, **FastAPI**, **React**, and **SQL/NoSQL**. I can scroll you to the interactive **Skills** breakdown section on the page.",
        sectionId: "skills"
      };
    }
    
    // 10. Education
    if (q.includes("education") || q.includes("iiit") || q.includes("kottayam") || q.includes("college") || q.includes("btech") || q.includes("study") || q.includes("degree")) {
      return {
        content: "Yashwanth is pursuing a B.Tech in **Computer Science Engineering (Cyber Security)** at the **Indian Institute of Information Technology Kottayam** (2022 - Present), combining deep computer science fundamentals with advanced threat modeling and security principles.",
        sectionId: "about"
      };
    }
    
    // 11. Contact
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire") || q.includes("linkedin") || q.includes("github")) {
      return {
        content: "You can reach Yashwanth at **k.yashwanthsrisai09@gmail.com** or call **+91 9703545822**. You can also explore his profiles on GitHub and LinkedIn. Let me scroll you to the **Contact** form at the bottom of the page.",
        sectionId: "contact"
      };
    }
    
    // 12. Certifications
    if (q.includes("certif") || q.includes("deloitte") || q.includes("tata") || q.includes("license")) {
      return {
        content: "Yashwanth holds certifications in **Data Analytics** (Deloitte), **Cybersecurity Analyst** (Tata), **Data Visualisation** (Tata), **Business Analytics** (Microsoft), and **Google Analytics**. I can scroll you to the **Certifications** section.",
        sectionId: "certifications"
      };
    }
    
    // 13. About / General
    if (q.includes("about") || q.includes("who is") || q.includes("yashwanth") || q.includes("profile")) {
      return {
        content: "Yashwanth Sri Sai is an **AI/LLM Engineer** with strong foundations in Python, RAG systems, NLP, and backend engineering. He has developed several multi-agent systems and worked in web experience architecture.",
        sectionId: "about"
      };
    }
    
    // Default fallback error message (extremely descriptive instead of generic intro)
    return {
      content: "I am running in **Local Heuristics Mode** (API quota exceeded). I didn't quite match your phrase, but you can explore my pre-programmed knowledge about Yashwanth.\n\nTry asking me about:\n- Yashwanth's **'Agentic AI'**, **'PDF Chatbot'**, **'Phishing ML Shield'**, **'Resume Analyzer'**, or **'Task Manager'** projects\n- His **'Sports Leadership'** role\n- His **'skills'** or **'growth milestones'**\n- Or type **'help'** for a full list of offline commands!"
    };
  };

  // Extract navigation signals from text responses
  const parseNavigation = (text: string): string | undefined => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("projects section") || lowerText.includes("projects view") || lowerText.includes("#projects")) return "projects";
    if (lowerText.includes("timeline section") || lowerText.includes("timeline view") || lowerText.includes("#timeline")) return "timeline";
    if (lowerText.includes("experience section") || lowerText.includes("work experience") || lowerText.includes("#experience")) return "experience";
    if (lowerText.includes("skills section") || lowerText.includes("skills breakdown") || lowerText.includes("#skills")) return "skills";
    if (lowerText.includes("contact section") || lowerText.includes("contact form") || lowerText.includes("#contact")) return "contact";
    if (lowerText.includes("certifications section") || lowerText.includes("#certifications")) return "certifications";
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
        setStatusMessage(finalStatus || (isLocalMode ? "Local Core Node Active" : "Neural Link Active"));
      }
    }, 45); // Speed multiplier per word
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = { id: userMsgId, role: "user", content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setStatusMessage("Processing Query...");

    // Create placeholder for assistant response
    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantPlaceholder: Message = { 
      id: assistantMsgId, 
      role: "assistant", 
      content: "", 
      isStreaming: true 
    };
    
    setMessages(prev => [...prev, assistantPlaceholder]);

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
        // API key not configured, run local matching
        setIsLocalMode(true);
        let finalStatus = "Offline (Local Core)";
        let errorType = "API_OFFLINE";
        const reason = data.reason || "";
        if (reason.toLowerCase().includes("quota")) {
          errorType = "QUOTA_EXCEEDED";
          finalStatus = "Offline (Quota Exceeded)";
        } else if (reason.toLowerCase().includes("key") || reason.toLowerCase().includes("unauthorized") || reason.toLowerCase().includes("401")) {
          errorType = "KEY_INVALID";
          finalStatus = "Offline (Key Invalid)";
        }
        setApiError(errorType);
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
        setStatusMessage("Neural Link Active");
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

        typeMessage(reply, assistantMsgId, { projectId, sectionId }, "Neural Link Active");
      } else {
        throw new Error("Malformed response");
      }
    } catch (err) {
      console.warn("Re-routing to offline local nodes:", err);
      setIsLoading(false);
      setIsLocalMode(true);
      setApiError("CONNECTION_ERROR");
      const finalStatus = "Offline (Connection Error)";
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
    // Basic bold parsing: **text**
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
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
  };

  // Mini project card inside chat
  const renderInlineProjectCard = (projectId: string) => {
    let project = RESUME_DATA.projects.find(p => p.id === projectId);
    
    if (!project) return null;

    return (
      <div className="mt-3 p-4 rounded-xl bg-black/40 border border-blue-500/20 backdrop-blur-md">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold flex items-center gap-1">
            <FiLayers /> {project.role}
          </span>
          <span className="text-[10px] text-white/50">{project.duration}</span>
        </div>
        <h4 className="text-sm font-bold text-white mb-1">{project.name}</h4>
        <p className="text-xs text-white/70 mb-3 leading-relaxed">
          {project.overview}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 4).map(tech => (
            <span key={tech} className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/10">
              {tech}
            </span>
          ))}
        </div>
        <button
          onClick={() => handleScrollToSection(project.sectionId || "projects")}
          className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-1 transition-all"
        >
          <FiNavigation className="text-[10px]" /> View on Page
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Floating AI Orb Trigger */}
      <div className="fixed bottom-6 right-6 z-[999] flex items-center justify-center">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(99,102,241,0.4)] focus:outline-none"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(99, 102, 241, 0.8), rgba(59, 130, 246, 0.9))",
          }}
          whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(99,102,241,0.6)" }}
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
          <div className="absolute inset-[-4px] rounded-full border border-indigo-500/30 animate-spin-reverse opacity-60" style={{ borderStyle: "dashed" }} />
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
                className="flex flex-col items-center"
              >
                <img src="/lost-kd.jpg" alt="Lost KD" className="w-8 h-8 rounded-full border border-indigo-500/30 object-cover shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                <span className="text-[8px] text-indigo-200 uppercase font-black tracking-wider mt-0.5">LOST KD</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Futuristic Dashboard Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[92vw] sm:w-[400px] h-[550px] z-[998] flex flex-col rounded-3xl overflow-hidden glass-card shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10"
            style={{
              background: "linear-gradient(160deg, rgba(8, 8, 14, 0.92) 0%, rgba(13, 13, 25, 0.96) 100%)",
            }}
          >
            {/* Header section with ambient glow background */}
            <div className="relative px-5 py-4 border-b border-white/5 flex items-center justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[inset_0_0_10px_rgba(99,102,241,0.2)] overflow-hidden">
                  <img src="/lost-kd.jpg" alt="Lost KD" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-widest text-white flex items-center gap-1.5 uppercase">
                    LOST KD <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-normal tracking-normal lowercase">v1.2</span>
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${apiError ? "bg-red-400" : isLocalMode ? "bg-amber-400" : "bg-emerald-400"}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${apiError ? "bg-red-500" : isLocalMode ? "bg-amber-500" : "bg-emerald-500"}`}></span>
                    </span>
                    <span className="text-[10px] text-white/50 tracking-wide font-mono uppercase">{statusMessage}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <FiX className="text-base" />
              </button>
            </div>

            {/* Diagnostic Banner if API fails */}
            {apiError && (
              <div className="mx-5 mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-200/90 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(239,68,68,0.15)]">
                <div className="flex items-center gap-1.5 font-bold text-red-400">
                  <FiAlertTriangle className="shrink-0 text-sm" />
                  <span>API OFFLINE: {apiError === "QUOTA_EXCEEDED" ? "QUOTA EXCEEDED" : apiError === "KEY_INVALID" ? "KEY INVALID" : "CONNECTION ERROR"}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-red-200/70">
                  {apiError === "QUOTA_EXCEEDED" ? (
                    <>
                      Your OpenAI API key has exceeded its quota (out of credits). Set a free <strong className="text-white">GEMINI_API_KEY</strong> from Google AI Studio in your `.env.local` to enable full chatbot capabilities!
                    </>
                  ) : apiError === "KEY_INVALID" ? (
                    <>
                      The configured OpenAI API key is invalid. Please double-check <strong className="text-white">.env.local</strong> or provide a free Gemini API key to restore chat.
                    </>
                  ) : (
                    <>
                      Failed to connect to the cloud AI network. Falling back to the local pre-programmed guide.
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Conversation message feed */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
              style={{ scrollbarWidth: "thin" }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex gap-2.5 max-w-[85%] items-start">
                    {m.role === "assistant" && (
                      <div className="w-6 h-6 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <FiCpu className="text-indigo-400 text-xs" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          m.role === "user"
                            ? "bg-indigo-600/90 text-white rounded-tr-none shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
                            : "bg-white/5 text-white/90 border border-white/5 rounded-tl-none"
                        }`}
                      >
                        {formatMessageText(m.content)}
                      </div>

                      {/* Display navigation copilot trigger button inside helper responses */}
                      {m.role === "assistant" && m.sectionId && !m.projectId && (
                        <button
                          onClick={() => handleScrollToSection(m.sectionId!)}
                          className="self-start mt-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-300 text-[11px] font-medium flex items-center gap-1 transition-all"
                        >
                          <FiNavigation className="text-[9px]" /> Navigate to {m.sectionId.toUpperCase()}
                        </button>
                      )}

                      {/* Render custom detailed project/internship card inside helper responses */}
                      {m.role === "assistant" && m.projectId && (
                        renderInlineProjectCard(m.projectId)
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2.5 max-w-[85%] items-start">
                    <div className="w-6 h-6 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCpu className="text-indigo-400 text-xs animate-spin-reverse" />
                    </div>
                    <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-5 py-2 overflow-x-auto flex gap-2 border-t border-white/5 bg-black/10 shrink-0 select-none no-scrollbar">
              {SUGGESTIONS.map((s, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(s.query)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white/80 hover:text-white text-xs whitespace-nowrap cursor-pointer transition-all shrink-0"
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
                placeholder="Ask Lost KD about projects, skills, history..."
                className="flex-1 bg-white/5 border border-white/10 hover:border-white/15 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none font-sans placeholder-white/35 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50 transition-all"
                disabled={isLoading || !inputValue.trim()}
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
