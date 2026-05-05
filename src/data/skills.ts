export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    title: "AI / LLMs",
    icon: "🧠",
    skills: [
      { name: "LangChain", level: 90 },
      { name: "RAG Pipelines", level: 92 },
      { name: "Transformers", level: 85 },
      { name: "FAISS", level: 88 },
      { name: "CrewAI", level: 82 },
      { name: "Prompt Engineering", level: 90 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "⚡",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Node.js", level: 80 },
      { name: "REST APIs", level: 92 },
      { name: "Python", level: 95 },
      { name: "WebSockets", level: 75 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "🗄️",
    skills: [
      { name: "FAISS", level: 88 },
      { name: "Pinecone", level: 82 },
      { name: "PostgreSQL", level: 78 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 72 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud / DevOps",
    icon: "☁️",
    skills: [
      { name: "AWS", level: 80 },
      { name: "Docker", level: 85 },
      { name: "Git", level: 92 },
      { name: "CI/CD", level: 78 },
      { name: "Vercel", level: 85 },
    ],
  },
];
