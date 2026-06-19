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
  duration: string;
  status: string;
  complexity: string;
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
    id: "phishing-detection",
    title: "Phishing Website Detection System",
    shortDescription: "Machine learning-based security system detecting phishing URLs and domains with XGBoost and Random Forest.",
    description: "Developed a machine learning-based system to detect phishing websites using URL and domain feature extraction techniques. Trained classification models including Random Forest and XGBoost to improve phishing detection accuracy, and built a Flask-based interface for real-time predictions.",
    tech: ["Python", "Scikit-learn", "Flask", "Pandas", "XGBoost", "Random Forest"],
    github: "https://github.com/Yashwanth-sri-sai/Phishing-Website-Detection-using-Machine-Learning",
    demo: null,
    image: "/projects/phishing-detection.png",
    category: "AI/ML",
    featured: true,
    date: "2025",
    duration: "4 Months",
    status: "Completed",
    complexity: "Advanced",
    metrics: [
      { label: "Detection Accuracy", value: "96.5%" },
      { label: "Analysis Latency", value: "<80ms" }
    ],
    problemStatement: "Phishing attacks remain one of the primary vectors for security breaches. Standard signature-based detection methods fail against zero-day phishing URLs that haven't been blacklisted yet.",
    solutionArchitecture: "Developed a feature extraction engine that parses raw URLs to extract lexical, host-based, and content-based features. Fed these features into ensemble models (Random Forest and XGBoost) to classify URLs in real-time, exposed via a lightweight Flask API.",
    challenges: [
      "Extracting features from URLs efficiently without introducing blocking network call overhead (e.g., WHOIS lookups).",
      "Handling class imbalance where benign URLs vastly outnumber phishing samples in real-world traffic."
    ],
    learnings: [
      "Mastered feature engineering techniques for string and lexical domain analysis.",
      "Optimized ensemble model hyperparameters using GridSearch to minimize false positives."
    ],
    outcome: "Achieved a 96.5% classification accuracy on zero-day phishing links with sub-80ms detection latency, providing a robust defensive layer against credential harvesting."
  },
  {
    id: "agentic-ai",
    title: "Agentic AI Chatbot for Educational Institution",
    shortDescription: "AI-powered assistant using LangChain and Gemini LLM for autonomous student and parent query resolution.",
    description: "Developed an AI-powered chatbot using LangChain and Gemini LLM to answer institution-related queries through agent-based conversational workflows. Implemented RAG using FAISS vector store for semantic document retrieval and FastAPI backend services for tool automation.",
    tech: ["Python", "FastAPI", "LangChain", "Gemini AI", "FAISS"],
    github: "https://github.com/Yashwanth-sri-sai/Agentic-AI-Chatbot-for-Educational-Institution.git",
    demo: null,
    image: "/projects/ai-agent-v2.png",
    category: "AI/ML",
    featured: true,
    date: "2025",
    duration: "3 Months",
    status: "In Production",
    complexity: "High",
    metrics: [
      { label: "Query Accuracy", value: "92%" },
      { label: "Factual Precision", value: "95%" }
    ],
    problemStatement: "Traditional university and educational chatbots rely on strict decision trees, failing to resolve compound, unstructured, or open-ended inquiries from prospective students and parents.",
    solutionArchitecture: "Designed a multi-agent framework using LangChain where incoming prompts are routed to specialized query agents. RAG integrates institutional handbooks and guidelines indexed in a FAISS vector store, served over FastAPI endpoints.",
    challenges: [
      "Preventing LLM hallucinations regarding institution policies and fee structures.",
      "Designing structured feedback state machines to collect visitor contact information securely before executing database writes."
    ],
    learnings: [
      "Deepened expertise in LangChain agents, memory managers, and conversational routing design.",
      "Optimized semantic document indexing through custom overlapping chunk strategies."
    ],
    outcome: "Built a fully functional assistant that handles complex school enrollment queries with a 92% accurate resolution rate, reducing administrative ticket load."
  },
  {
    id: "pdf-chatbot",
    title: "Generative AI Multi-PDF Chatbot",
    shortDescription: "High-performance RAG pipeline for querying and searching multiple complex PDF documents concurrently.",
    description: "Designed backend pipelines handling 1000+ document queries with optimized vector search and CRUD-like workflows. Built a scalable RAG pipeline utilizing LangChain, FAISS vector indexing, and a Streamlit UI for seamless context-aware document QA.",
    tech: ["Python", "LangChain", "FAISS", "Streamlit"],
    github: "https://github.com/Yashwanth-sri-sai/Generative-AI-Multi-PDF-Chatbot.git",
    demo: "https://multi-pdf-chatbot.streamlit.app",
    image: "/projects/pdf-chatbot-v2.png",
    category: "AI/ML",
    featured: true,
    date: "2025",
    duration: "2 Months",
    status: "Active",
    complexity: "Advanced",
    metrics: [
      { label: "Search Index Speed", value: "<100ms" },
      { label: "Document Volume", value: "1000+" }
    ],
    problemStatement: "Users waste significant hours searching through dense, hundreds-of-pages-long PDF manuals, policies, and contracts. Single-document QA systems fail when questions require cross-referencing information across multiple separate files.",
    solutionArchitecture: "Constructed a document loading and processing pipeline that handles multiple file uploads, extracts text, splits it using recursive character separators, creates embeddings, and indexes them in FAISS. Deployed the front end on Streamlit.",
    challenges: [
      "Processing and embedding large multi-page PDF documents without hitting API timeout limits or running out of local memory.",
      "Merging vector retrieval scores from disparate document indices to locate the most globally relevant context chunk."
    ],
    learnings: [
      "Gained deep understanding of vector index search algorithms, retrieval metrics, and cosine similarity tuning.",
      "Mastered reactive UI state management inside Streamlit to handle active document sessions."
    ],
    outcome: "Delivered a production-ready application capable of indexing and querying 1000+ document pages with context-aware semantic retrieval under 100ms."
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
    duration: "5 Weeks",
    status: "Completed",
    complexity: "Moderate",
    metrics: [
      { label: "ATS Precision", value: "98%" },
      { label: "File Formats", value: "4" }
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
    duration: "8 Weeks",
    status: "Completed",
    complexity: "High",
    metrics: [
      { label: "API Latency", value: "<50ms" },
      { label: "System Uptime", value: "99.9%" }
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
  },
  {
    id: "modern-hr-admin-dashboard",
    title: "Enterprise HR & Admin Dashboard",
    shortDescription: "A full-stack, enterprise-grade admin portal featuring JWT authentication, real-time metrics, and an aesthetic dark-themed UI.",
    description: "A comprehensive solution designed to handle internal operations, compliance records, and employee management. Engineered to be production-ready with a secure REST API backend and a responsive Angular frontend.",
    tech: ["Angular", "Node.js", "Express", "Angular Material", "SCSS"],
    github: "https://github.com/yashwanth-sri-sai/modern-hr-admin-dashboard",
    demo: "https://modern-hr-admin-dashboard.vercel.app/auth/login",
    image: "/projects/hr-dashboard.png",
    category: "Web Development",
    featured: true,
    date: "2026",
    duration: "2 Months",
    status: "Completed",
    complexity: "Advanced",
    metrics: [
      { label: "Architecture", value: "Micro-env" },
      { label: "Security", value: "JWT Auth" }
    ],
    problemStatement: "Internal operations and employee management systems are often fragmented and lack modern, secure, and performant interfaces.",
    solutionArchitecture: "Clean monorepo structure separating concerns into distinct environments. Best-practice JWT authentication with HttpOnly cookies, CORS protection, and strict rate-limiting. Frontend built with Angular 18+ and Signals for state management.",
    challenges: [
      "Designing a highly scalable micro-environment architecture.",
      "Implementing robust JWT authentication with HttpOnly cookies and rate-limiting."
    ],
    learnings: [
      "Mastered Angular 18+ Standalone Components and Signals.",
      "Gained experience building secure, production-ready Node.js APIs."
    ],
    outcome: "Delivered a comprehensive, secure, and modern enterprise HR portal with a premium user experience."
  },
  {
    id: "bitcoin-sentiment-performance",
    title: "Bitcoin Sentiment Analysis",
    shortDescription: "Investigates the relationship between Bitcoin market sentiment and the performance of cryptocurrency traders.",
    description: "Analyzed historical trade data alongside the Bitcoin Fear & Greed Index to identify actionable patterns and profitable trading behaviors across various market regimes.",
    tech: ["Python", "Jupyter", "Pandas", "Scipy", "Matplotlib"],
    github: "https://github.com/yashwanth-sri-sai/bitcoin-sentiment-performance",
    demo: null,
    image: "/projects/bitcoin-analysis.png",
    category: "Data Analytics",
    featured: true,
    date: "2026",
    duration: "4 Weeks",
    status: "Completed",
    complexity: "Moderate",
    metrics: [
      { label: "Data Records", value: "211k+" },
      { label: "Win Rate", value: "46.4%" }
    ],
    problemStatement: "Traders need empirical evidence to optimize their strategies based on prevailing market sentiment rather than relying on intuition.",
    solutionArchitecture: "Modular software engineering approach with Python scripts for data processing, visualizations, and statistical testing (ANOVA, T-tests) to validate trading performance variations.",
    challenges: [
      "Processing and analyzing over 211,000 trade execution records efficiently.",
      "Applying rigorous statistical testing to validate findings."
    ],
    learnings: [
      "Improved statistical analysis skills using Scipy.",
      "Learned to structure data analysis projects modularly for reproducibility."
    ],
    outcome: "Identified that the Extreme Greed classification provided the most favorable trading environment, yielding the highest average profit per trade and win rate."
  },
  {
    id: "rest-api-backend",
    title: "FastAPI GitHub Repo Tracker",
    shortDescription: "A production-grade, async-first REST API service that integrates with the GitHub REST API to fetch and cache metadata.",
    description: "Service allowing developers to track and monitor statistics for public GitHub repositories. Fetches metadata asynchronously from the GitHub API and stores it locally in PostgreSQL using SQLAlchemy.",
    tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic"],
    github: "https://github.com/yashwanth-sri-sai/REST-API-backend",
    demo: null,
    image: "/projects/fastapi-backend.png",
    category: "Web Development",
    featured: false,
    date: "2026",
    duration: "3 Weeks",
    status: "Completed",
    complexity: "Advanced",
    metrics: [
      { label: "Architecture", value: "Async-First" },
      { label: "Design", value: "Layered" }
    ],
    problemStatement: "Needed a robust way to fetch and cache upstream GitHub repository data while handling rate limiting, redirect handling, timeout boundaries, and network reliability.",
    solutionArchitecture: "Clean, layered architecture (API Layer, Service Layer, Client Layer, Data Access Layer) promoting decoupling. Uses FastAPI for async capabilities, SQLAlchemy Async for non-blocking DB queries, and httpx for async HTTP requests.",
    challenges: [
      "Handling concurrent requests and database-level uniqueness constraints.",
      "Structuring the project with a clean, decoupled layered architecture."
    ],
    learnings: [
      "Mastered async Python programming with FastAPI and SQLAlchemy Async.",
      "Gained experience with robust service-layer transaction management."
    ],
    outcome: "Built a resilient, production-ready backend service capable of reliably tracking GitHub repository statistics."
  },
  {
    id: "salesforge",
    title: "SalesForge Intelligence",
    shortDescription: "An end-to-end sales intelligence platform transforming raw transactional data into actionable business insights.",
    description: "Designed a clean star schema data model from raw OLTP data, running advanced SQL queries for KPI extraction, and building interactive Tableau dashboards for revenue and profit insights.",
    tech: ["MySQL", "Tableau", "Python", "Pandas", "SQL"],
    github: "https://github.com/yashwanth-sri-sai/SalesForge",
    demo: null,
    image: "/projects/salesforge-dashboard.png",
    category: "Data Analytics",
    featured: false,
    date: "2026",
    duration: "6 Weeks",
    status: "Completed",
    complexity: "Moderate",
    metrics: [
      { label: "Data Model", value: "Star Schema" },
      { label: "Analysis", value: "SQL & EDA" }
    ],
    problemStatement: "Modern retail businesses generate enormous volumes of transaction data daily. Without structured analysis, identifying revenue trends and high-value segments is nearly impossible.",
    solutionArchitecture: "Built a Star Schema optimized for analytical queries with a Fact Table (transactions) and Dimension Tables (customers, products, markets, date). Used MySQL for ETL/SQL analysis and Tableau for dashboard visualizations.",
    challenges: [
      "Transforming raw OLTP data into a clean analytical star schema.",
      "Creating interactive and insightful dashboards that answer key business questions."
    ],
    learnings: [
      "Deepened SQL skills for advanced analytical queries and KPI extraction.",
      "Improved data visualization capabilities using Tableau."
    ],
    outcome: "Empowered sales teams to make data-driven decisions regarding revenue trends, customer segments, and market profitability."
  }
];
