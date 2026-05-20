export interface ProjectMetric {
  label: string;
  value: string;
}

export type ProjectCategory = "All" | "AI/ML" | "Web Development" | "Data Analytics";

export interface Project {
  id: string; // Changed to string for easier routing
  title: string;
  shortDescription: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  image: string;
  category: ProjectCategory;
  featured: boolean;
  date: string;
  metrics: ProjectMetric[];
  
  // Case Study specific fields
  problemStatement: string;
  solutionArchitecture: string;
  challenges: string[];
  learnings: string[];
  outcome: string;
}

export const projects: Project[] = [
  {
    id: "agentic-ai-assistant",
    title: "Agentic AI Chat Assistant",
    shortDescription: "Multi-agent RAG system built with CrewAI for orchestrating specialized agents to answer complex queries.",
    description: "A comprehensive multi-agent retrieval-augmented generation (RAG) system with autonomous task delegation and reasoning agents. Built with CrewAI to orchestrate specialized agents that collaborate to answer complex queries intelligently.",
    tech: ["LangChain", "FAISS", "CrewAI", "Python", "RAG"],
    github: "https://github.com/yourusername/agentic-ai-assistant",
    demo: null,
    image: "/projects/ai-agent-v2.png",
    category: "AI/ML",
    featured: true,
    date: "2024",
    metrics: [
      { label: "Query Accuracy", value: "92%" },
      { label: "Processing Speed", value: "2.5x" },
    ],
    problemStatement: "Traditional singular LLMs struggle with multi-step reasoning and domain-specific knowledge retrieval, leading to hallucinations or incomplete answers on complex user queries.",
    solutionArchitecture: "Implemented a multi-agent architecture using CrewAI where a 'Researcher Agent' queries a FAISS vector database (populated via LangChain), and a 'Writer Agent' synthesizes the final response. The system autonomously breaks down complex user prompts into discrete sub-tasks.",
    challenges: [
      "Managing agent state and preventing infinite conversation loops between autonomous agents.",
      "Optimizing the chunking strategy for the FAISS vector database to ensure high-relevance retrieval without exceeding token limits."
    ],
    learnings: [
      "Gained deep understanding of multi-agent orchestration frameworks like CrewAI.",
      "Learned to implement advanced RAG techniques including query routing and hybrid search."
    ],
    outcome: "Successfully deployed a backend service capable of answering multi-part analytical questions 2.5x faster than sequential single-prompt methods, achieving 92% factual accuracy on benchmark tests."
  },
  {
    id: "multi-pdf-chatbot",
    title: "Multi-PDF Chatbot",
    shortDescription: "Intelligent RAG pipeline enabling semantic search and conversational QA across multiple PDF documents.",
    description: "An intelligent RAG pipeline enabling semantic search across multiple PDF documents simultaneously. Leverages GPT/Gemini embeddings with vector store retrieval for context-aware, accurate answers from large document collections.",
    tech: ["RAG", "GPT", "Gemini", "Embeddings", "Streamlit"],
    github: "https://github.com/yashwanth-sri-sai/Generative-AI-Multi-PDF-Chatbot.git",
    demo: "https://multi-pdf-chatbot.streamlit.app",
    image: "/projects/pdf-chatbot-v2.png",
    category: "AI/ML",
    featured: true,
    date: "2023",
    metrics: [
      { label: "Vector Retrieval", value: "<100ms" },
      { label: "Docs Processed", value: "500+" },
    ],
    problemStatement: "Professionals often spend hours manually searching for specific information across dozens of dense PDF reports and manuals. Standard keyword search is insufficient for conceptual queries.",
    solutionArchitecture: "Built a Streamlit frontend where users upload PDFs. The backend uses PyPDF2 to extract text, splits it using RecursiveCharacterTextSplitter, and embeds it via Google Gemini/OpenAI embeddings into a FAISS index. Conversational memory is maintained using LangChain's memory modules.",
    challenges: [
      "Handling large PDF files (50MB+) without causing memory overflow or hitting API rate limits during the embedding phase.",
      "Maintaining conversational context across follow-up questions referencing different uploaded documents."
    ],
    learnings: [
      "Mastered document loading, text splitting, and vector embedding pipelines.",
      "Gained experience building interactive AI interfaces using Streamlit."
    ],
    outcome: "Created a highly responsive web app capable of retrieving relevant context in under 100ms from a corpus of over 500 documents, significantly reducing manual research time."
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    shortDescription: "Production-grade ATS evaluation tool that compares resumes against job descriptions and provides LLM-driven feedback.",
    description: "A production-grade, multi-page AI application that evaluates resumes against job descriptions. Features Applicant Tracking System (ATS) scoring, skill gap analysis, and LLM-driven constructive feedback within a custom UI.",
    tech: ["Streamlit", "Python", "LLMs", "ATS Parsing", "Pandas"],
    github: "https://github.com/yashwanth-sri-sai/AI-Resume-analyser.git",
    demo: null,
    image: "/projects/resume-analyzer-v2.png",
    category: "Data Analytics",
    featured: false,
    date: "2023",
    metrics: [
      { label: "ATS Precision", value: "98%" },
      { label: "File Formats", value: "4" },
    ],
    problemStatement: "Job seekers lack transparency into how Applicant Tracking Systems (ATS) score their resumes, leading to high rejection rates despite possessing the necessary skills.",
    solutionArchitecture: "Developed a comprehensive parsing engine capable of extracting text from PDF, DOCX, and TXT files. Utilized LLMs to perform semantic matching between the extracted resume text and a user-provided job description, calculating a match percentage and identifying missing keywords.",
    challenges: [
      "Accurately extracting structured data (skills, experience) from highly varied and unstructured resume formats.",
      "Prompt engineering the LLM to provide consistent, objective percentage scores rather than subjective text."
    ],
    learnings: [
      "Improved skills in NLP preprocessing and regular expressions for text extraction.",
      "Learned to design effective few-shot prompts for consistent LLM output formatting."
    ],
    outcome: "Built a tool that achieves 98% precision in keyword matching compared to standard ATS software, helping dozens of peers optimize their resumes for targeted job applications."
  },
  {
    id: "task-management-system",
    title: "Task Management System",
    shortDescription: "Robust full-stack task management application with secure authentication and efficient state management.",
    description: "A robust and scalable full-stack task management application. Features secure user authentication, intuitive project tracking, and efficient state management for seamless productivity in team environments.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    github: "https://github.com/yashwanth-sri-sai/task-manager.git",
    demo: null,
    image: "/projects/task-manager-v2.png",
    category: "Web Development",
    featured: false,
    date: "2024",
    metrics: [
      { label: "API Latency", value: "<50ms" },
      { label: "System Uptime", value: "99.9%" },
    ],
    problemStatement: "Existing task managers are either too simple (lacking team features) or too complex (steep learning curve). There was a need for a performant, mid-tier solution with real-time updates.",
    solutionArchitecture: "Built on Next.js 14 App Router with Server Actions for optimized data fetching. Uses Prisma ORM to interact with a PostgreSQL database. Implemented secure JWT-based authentication and a responsive UI using Tailwind CSS and Framer Motion.",
    challenges: [
      "Implementing optimistic UI updates to ensure a snappy user experience while waiting for server mutations to complete.",
      "Designing a scalable relational database schema for users, teams, projects, and nested tasks."
    ],
    learnings: [
      "Mastered Next.js Server Components and Server Actions for efficient full-stack data flow.",
      "Gained deep experience with TypeScript typing for complex relational data."
    ],
    outcome: "Delivered a highly performant web application with API response times under 50ms and a Lighthouse performance score of 98, providing a seamless user experience."
  }
];
