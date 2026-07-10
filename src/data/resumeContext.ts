export interface ResumeProfile {
  name: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  objective: string;
  education: {
    institution: string;
    degree: string;
    duration: string;
    location: string;
  };
  skills: {
    programming: string[];
    aiAndLLMs: string[];
    vectorDatabases: string[];
    frameworks: string[];
    cloudAndDevOps: string[];
    cybersecurity: string[];
    tools: string[];
  };
  experience: {
    company: string;
    role: string;
    duration: string;
    type: string;
    points: string[];
  }[];
  projects: {
    id: string;
    name: string;
    technologies: string[];
    duration: string;
    role: string;
    overview: string;
    points: string[];
    sectionId: string;
  }[];
  certifications: string[];
  extracurriculars: {
    role: string;
    organization: string;
    duration: string;
    points: string[];
  }[];
}

export const RESUME_DATA: ResumeProfile = {
  name: "K. Yashwanth Sri Sai",
  location: "Hyderabad, Telangana, India",
  email: "k.yashwanthsrisai09@gmail.com",
  phone: "+91 9703545822",
  github: "https://github.com/Yashwanth-sri-sai",
  linkedin: "https://www.linkedin.com/in/yashwanth-sri-sai-9988a8258/", // Custom link based on common profiles or default format
  objective: "Computer Science undergraduate with strong foundations in Data Structures, Algorithms, and backend development. Seeking a full-time Software Engineer role to build scalable systems and solve complex problems.",
  education: {
    institution: "Indian Institute of Information Technology Kottayam",
    degree: "B.Tech in Computer Science Engineering (Cyber Security)",
    duration: "Nov. 2022 – Present",
    location: "Kottayam, Kerala"
  },
  skills: {
    programming: ["Python", "Java", "C++", "C", "SQL", "Shell"],
    aiAndLLMs: ["LangChain", "Gemini AI", "FAISS", "Scikit-learn", "XGBoost", "Random Forest", "Machine Learning", "Computer Vision", "CNN", "LSTM"],
    vectorDatabases: ["FAISS"],
    frameworks: ["FastAPI", "Flask", "Django", "React", "Streamlit"],
    cloudAndDevOps: ["AWS", "Jenkins (CI/CD)", "Git", "GitHub"],
    cybersecurity: ["Cyber Security", "URL Feature Extraction", "Domain Feature Extraction"],
    tools: ["VS Code"]
  },
  experience: [],
  projects: [
    {
      id: "phishing-detection",
      name: "Phishing Website Detection System",
      technologies: ["Python", "Scikit-learn", "Flask", "Pandas", "XGBoost", "Random Forest"],
      duration: "2025",
      role: "ML Developer",
      overview: "A machine learning-based system to detect phishing websites using URL and domain feature extraction techniques.",
      points: [
        "Developed a machine learning-based system to detect phishing websites using URL and domain feature extraction techniques.",
        "Trained classification models including Random Forest and XGBoost to improve phishing detection accuracy.",
        "Built a Flask-based interface for real-time phishing URL prediction and backend integration."
      ],
      sectionId: "projects"
    },
    {
      id: "agentic-ai",
      name: "Agentic AI Chatbot for Educational Institution",
      technologies: ["Python", "FastAPI", "LangChain", "Gemini AI", "FAISS"],
      duration: "2025",
      role: "Lead Developer",
      overview: "An AI-powered chatbot using LangChain and Gemini LLM to answer institution-related queries through agentic conversational workflows.",
      points: [
        "Developed an AI-powered chatbot using LangChain and Gemini LLM to answer institution-related queries through agent-based conversational workflows.",
        "Implemented RAG using FAISS vector store for semantic document retrieval from custom institutional data.",
        "Built tool-based automation and enabled structured data collection and storage through FastAPI backend services."
      ],
      sectionId: "projects"
    },
    {
      id: "pdf-chatbot",
      name: "Generative AI Multi-PDF Chatbot",
      technologies: ["Python", "LangChain", "FAISS", "Streamlit"],
      duration: "2025",
      role: "Developer",
      overview: "Designed backend pipelines handling 1000+ document queries with optimized vector search and CRUD-like workflows.",
      points: [
        "Designed backend pipelines handling 1000+ document queries with optimized vector search.",
        "Implemented CRUD-like workflows for document handling and query responses.",
        "Exposed backend functionality through API-based interfaces, focusing on clean code, modular design, and backend scalability."
      ],
      sectionId: "projects"
    },
    {
      id: "ai-resume-analyzer",
      name: "AI Resume Analyzer",
      technologies: ["Streamlit", "Python", "LLMs", "ATS Parsing", "Pandas"],
      duration: "2023",
      role: "Developer",
      overview: "A production-grade, multi-page AI application that evaluates resumes against job descriptions.",
      points: [
        "Developed a comprehensive parsing engine capable of extracting text from PDF, DOCX, and TXT files.",
        "Utilized LLMs to perform semantic matching, match percentage calculation, and keyword gap analysis.",
        "Built a custom Streamlit-based UI for interactive ATS scoring and constructive feedback."
      ],
      sectionId: "projects"
    },
    {
      id: "task-management-system",
      name: "Task Management System",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      duration: "2024",
      role: "Full-Stack Developer",
      overview: "A robust and scalable full-stack task management application with secure authentication.",
      points: [
        "Built on Next.js App Router with Server Actions for optimized data fetching.",
        "Implemented Prisma ORM to interact with PostgreSQL databases and JWT-based authentication.",
        "Designed responsive user interfaces using Tailwind CSS and Framer Motion for interactive team workflows."
      ],
      sectionId: "projects"
    },
    {
      id: "modern-hr-admin-dashboard",
      name: "Enterprise HR & Admin Dashboard",
      technologies: ["Angular", "Node.js", "Express", "Angular Material", "SCSS"],
      duration: "2026",
      role: "Lead Developer",
      overview: "A comprehensive internal operations, compliance records, and employee management system with Angular frontend and Node.js REST API backend.",
      points: [
        "Monorepo structure separating frontend client from decoupled Node.js and Express REST API service environments.",
        "Secured session storage using HttpOnly cookies with JWT validation, CORS rules, and API rate-limiting.",
        "Leveraged Angular Standalone components with reactive state variables via Angular Signals for instant DOM refreshes."
      ],
      sectionId: "projects"
    },
    {
      id: "bitcoin-sentiment-performance",
      name: "Bitcoin Sentiment Analysis",
      technologies: ["Python", "Jupyter", "Pandas", "Scipy", "Matplotlib"],
      duration: "2026",
      role: "Data Analyst",
      overview: "Investigates the statistical correlation between cryptocurrency market sentiment regimes (Fear & Greed Index) and overall trader profitability.",
      points: [
        "Processed and analyzed over 211,000 historical trade execution records, merging datasets using Pandas vectorized operations.",
        "Applied statistical testing (ANOVA, T-tests) using SciPy modules to mathematically validate variance in performance metrics.",
        "Determined that the Extreme Greed market regime corresponds with peak win rates and highest profit outcomes."
      ],
      sectionId: "projects"
    },
    {
      id: "rest-api-backend",
      name: "FastAPI GitHub Repo Tracker",
      technologies: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic"],
      duration: "2026",
      role: "Backend Developer",
      overview: "An async-first REST API service that integrates with the GitHub REST API to fetch and cache repository metadata locally.",
      points: [
        "Designed a clean layered architecture separating API layers, service layers, client layers, and data access layers.",
        "Configured SQLAlchemy Async session management with database connection pools to execute non-blocking queries.",
        "Built resilient client connectors handling rate-limiting retries, redirects, and network timeouts using httpx asynchronous modules."
      ],
      sectionId: "projects"
    },
    {
      id: "salesforge",
      name: "SalesForge Intelligence",
      technologies: ["MySQL", "Tableau", "Python", "Pandas", "SQL"],
      duration: "2026",
      role: "BI Analyst",
      overview: "An end-to-end sales intelligence platform transforming raw transactional OLTP records into actionable business dashboards.",
      points: [
        "Designed a clean analytical Star Schema database consisting of central Fact tables and separate Dimension tables.",
        "Wrote advanced SQL window queries and analytics to extract critical KPIs including YoY margins, growth rates, and market share.",
        "Integrated Tableau dashboard visualizations to display revenue and profit metrics for business decision-makers."
      ],
      sectionId: "projects"
    }
  ],
  certifications: [
    "Data Analytics Job Simulation – Deloitte",
    "Cybersecurity Analyst Job Simulation – Tata",
    "Data Visualisation: Empowering Business with Effective Insights – Tata",
    "Business Analytics – Microsoft",
    "Customer Experience (CX) for Business Success – HP Life",
    "Google Analytics – Google Skillshop"
  ],
  extracurriculars: [
    {
      role: "Sports Design and Social Media Lead",
      organization: "IIIT Kottayam",
      duration: "Sep 2024 – Sep 2025",
      points: [
        "Comfortable working in rotational shifts and high-pressure production environments.",
        "Quick learner with strong ownership mindset for live systems and uptime."
      ]
    }
  ]
};

export const generateSystemPrompt = (): string => {
  return `You are "LOST KD", K. Yashwanth Sri Sai's elite, premium AI Engineering Guide running inside the Yash.OS platform. Your purpose is to showcase Yashwanth's qualifications to recruiters, explain his projects with extreme technical precision, and serve as an intelligent, futuristic navigator for his website.

CRITICAL BEHAVIOR:
- Do NOT build a generic chatbot.
- Do NOT answer general knowledge or random questions. Focus strictly on K. Yashwanth Sri Sai's portfolio data.
- If asked unrelated questions, guide the visitor politely back to Yashwanth's skills and projects.

Here is Yashwanth's complete, verified portfolio database:
--------------------------------------------------
OBJECTIVE:
${RESUME_DATA.objective}

EDUCATION:
- ${RESUME_DATA.education.degree} from ${RESUME_DATA.education.institution} (${RESUME_DATA.education.duration}). Location: ${RESUME_DATA.education.location}

TECHNICAL SKILLS:
- Programming: ${RESUME_DATA.skills.programming.join(", ")}
- AI/ML/LLMs: ${RESUME_DATA.skills.aiAndLLMs.join(", ")}
- Vector Databases: ${RESUME_DATA.skills.vectorDatabases.join(", ")}
- Frameworks: ${RESUME_DATA.skills.frameworks.join(", ")}
- Cloud/DevOps: ${RESUME_DATA.skills.cloudAndDevOps.join(", ")}
- Cybersecurity: ${RESUME_DATA.skills.cybersecurity.join(", ")}
- Tools: ${RESUME_DATA.skills.tools.join(", ")}

PROFESSIONAL EXPERIENCE:
${RESUME_DATA.experience.map(exp => `* ${exp.role} at ${exp.company} (${exp.duration}) - ${exp.type}
${exp.points.map(p => `  - ${p}`).join("\n")}`).join("\n\n")}

PROJECTS:
${RESUME_DATA.projects.map(proj => `* ${proj.name} (${proj.duration})
  - Overview: ${proj.overview}
  - Tech Stack: ${proj.technologies.join(", ")}
  - Details:
${proj.points.map(p => `    - ${p}`).join("\n")}`).join("\n\n")}

CERTIFICATIONS:
${RESUME_DATA.certifications.map(c => `- ${c}`).join("\n")}

LEADERSHIP & EXTRACURRICULAR:
${RESUME_DATA.extracurriculars.map(ec => `* ${ec.role} at ${ec.organization} (${ec.duration})
${ec.points.map(p => `  - ${p}`).join("\n")}`).join("\n\n")}

CONTACT INFO:
- Email: ${RESUME_DATA.email}
- Phone: ${RESUME_DATA.phone}
- Github: ${RESUME_DATA.github}
- LinkedIn: ${RESUME_DATA.linkedin}
--------------------------------------------------

INSTRUCTIONS FOR CONVERSATION:
1. Personality & Tone: You are a professional, confident, helpful, highly technical, and calm engineering teammate. Speak with authority and absolute clarity.
2. ChatGPT Avoidance: NEVER use generic AI boilerplate phrases such as "I'm just an AI...", "As a language model...", or "How can I help you today?". Always speak from the perspective of an engineering guide built directly by Yashwanth.
3. Conciseness: Keep responses short and impactful (2-4 sentences max). Avoid fluff. Recruiters value their time.
4. Highlighting Tech: Bold technical terms like **FastAPI**, **LangChain**, **CrewAI**, **FAISS**, **Next.js**, **React**, and **Python**.
5. Interactive System Explorer Integration: 
   - If asked to "Explain NoteAI" or similar: You MUST include the exact phrase "Explain NoteAI" in your response. This signals the interface to open the NoteAI Interactive Architecture Explorer.
6. Interactive Knowledge Graph Integration:
   - If asked "Where have you used FastAPI?" or similar: You MUST include the exact phrase "Where have you used FastAPI" in your response. This signals the interface to highlight the FastAPI node on the Knowledge Graph.
7. Navigation Copilot: If asked to scroll to any section, say "I can scroll you to the **Projects/Skills/Certifications/Contact** section" so the layout scrolls.
8. Recruiter Mode queries:
   - Why should I hire you? Highlight AI systems combined with secure backend architecture and B.Tech CSE (Cyber Security) background.
   - Strongest skills? Highlight AI (LangChain, FAISS) and backend databases (FastAPI, PostgreSQL).
   - Best SDE/Backend project? Highlight the **FastAPI GitHub Repo Tracker**.
   - Best AI project? Highlight **NoteAI**.
9. Resume Mode queries:
   - If asked for "Resume Summary", serve either:
     - "30-second summary": 1-2 sentence core elevator pitch.
     - "1-minute summary": brief background and project listings.
     - "Detailed summary": comprehensive structural details of education, projects, and skills.`;
};
