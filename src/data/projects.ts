export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  icon: string;
  color: string;
  metrics: ProjectMetric[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Agentic AI Chat Assistant",
    description:
      "Multi-agent RAG system with autonomous task delegation and reasoning agents. Built with CrewAI for orchestrating specialized agents that collaborate to answer complex queries with retrieval-augmented generation.",
    tech: ["LangChain", "FAISS", "CrewAI", "Python", "RAG"],
    github: "https://github.com/yourusername/agentic-ai-assistant",
    demo: null,
    icon: "🤖",
    color: "#8b5cf6",
    metrics: [
      { label: "Query Accuracy", value: "92%" },
      { label: "Processing Speed", value: "2.5x" },
    ],
  },
  {
    id: 2,
    title: "Multi-PDF Chatbot",
    description:
      "Intelligent RAG pipeline enabling semantic search across multiple PDF documents. Leverages GPT/Gemini embeddings with vector store retrieval for context-aware, accurate answers from document collections.",
    tech: ["RAG", "GPT", "Gemini", "Embeddings", "Streamlit"],
    github: "https://github.com/yashwanth-sri-sai/Generative-AI-Multi-PDF-Chatbot.git",
    demo: "https://multi-pdf-chatbot.streamlit.app",
    icon: "📄",
    color: "#06b6d4",
    metrics: [
      { label: "Vector Retrieval", value: "<100ms" },
      { label: "Docs Processed", value: "500+" },
    ],
  },
  {
    id: 3,
    title: "AI Resume Analyzer",
    description:
      "A production-grade, multi-page AI application that evaluates resumes against job descriptions. Features ATS scoring, skill gap analysis, and LLM-driven feedback within a custom dark-themed 'Liquid Glass' UI.",
    tech: ["Streamlit", "Python", "LLMs", "ATS Parsing", "Pandas"],
    github: "https://github.com/yashwanth-sri-sai/AI-Resume-analyser.git",
    demo: null,
    icon: "📊",
    color: "#ec4899",
    metrics: [
      { label: "ATS Precision", value: "98%" },
      { label: "File Parsers", value: "4 Formats" },
    ],
  },
  {
    id: 4,
    title: "Task Management System",
    description:
      "A robust and scalable full-stack task management application. Features secure user authentication, intuitive project tracking, and efficient state management for seamless productivity.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    github: "https://github.com/yashwanth-sri-sai/task-manager.git",
    demo: null,
    icon: "📋",
    color: "#f97316",
    metrics: [
      { label: "API Latency", value: "<50ms" },
      { label: "System Uptime", value: "99.9%" },
    ],
  },
];
