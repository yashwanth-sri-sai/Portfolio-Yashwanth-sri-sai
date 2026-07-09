"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCpu, FiLayers, FiCode, FiTerminal, FiLock } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import BorderGlow from "./BorderGlow";

interface SkillItem {
  name: string;
  importance: "primary" | "secondary" | "familiar";
  useCase: string;
}

interface SkillCategory {
  title: string;
  tagline: string;
  color: string;
  icon: React.ElementType;
  items: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI Engineering",
    tagline: "Core Focus & Intelligent Systems",
    color: "#60a5fa",
    icon: FiCpu,
    items: [
      { name: "Generative AI", importance: "primary", useCase: "Prompt engineering, LLM integration, and agentic workflows." },
      { name: "RAG Systems", importance: "primary", useCase: "Retrieval-Augmented Generation using semantic overlapping chunking." },
      { name: "AI Agents", importance: "primary", useCase: "Autonomous workflows with LangChain router systems." },
      { name: "LangChain", importance: "secondary", useCase: "Prompt chaining and agentic tool routing." },
      { name: "Vector Databases", importance: "secondary", useCase: "Indexing and similarity search using FAISS database." },
      { name: "Large Language Models", importance: "secondary", useCase: "Model inference utilizing Gemini and GPT APIs." },
      { name: "Embeddings", importance: "familiar", useCase: "Generating text vectors for semantic context match." }
    ]
  },
  {
    title: "Backend Engineering",
    tagline: "Scalable APIs & Decoupled Architecture",
    color: "#c084fc",
    icon: FiLayers,
    items: [
      { name: "Python", importance: "primary", useCase: "Primary language for data science, model training, and microservices." },
      { name: "FastAPI", importance: "primary", useCase: "High-performance, asynchronous REST APIs with auto-documentation." },
      { name: "REST APIs", importance: "primary", useCase: "Layered, async-first endpoints with robust transaction schemas." },
      { name: "Databases", importance: "secondary", useCase: "Designing star schemas, transactional PostgreSQL, and MySQL databases." },
      { name: "Node.js", importance: "secondary", useCase: "Backend scripting and Express service pipelines." },
      { name: "System Design", importance: "secondary", useCase: "Decoupled layered backend design with transaction safety." },
      { name: "Authentication", importance: "familiar", useCase: "JWT security, HttpOnly credentials, and rate limits." }
    ]
  },
  {
    title: "Frontend Engineering",
    tagline: "Immersive UX & Server Actions",
    color: "#38bdf8",
    icon: FiCode,
    items: [
      { name: "Next.js", importance: "primary", useCase: "Modern App Router frameworks with Server Actions optimization." },
      { name: "React", importance: "primary", useCase: "Interactive UI elements with state management and custom hooks." },
      { name: "TypeScript", importance: "primary", useCase: "Strongly typed application code ensuring runtime stability." },
      { name: "UI Engineering", importance: "secondary", useCase: "High-fidelity micro-interactions and fluid motion designs." },
      { name: "Tailwind CSS", importance: "secondary", useCase: "Highly responsive grid layouts and utility styling." },
      { name: "JavaScript", importance: "familiar", useCase: "Core ES6 scripting and asynchronous DOM events." }
    ]
  },
  {
    title: "Cloud & DevOps",
    tagline: "Infrastructure, Containers & Pipelines",
    color: "#fbbf24",
    icon: FiTerminal,
    items: [
      { name: "CI/CD", importance: "primary", useCase: "Automated builds and tests using Jenkins, Docker, and GitHub Actions." },
      { name: "Deployment", importance: "primary", useCase: "Serving serverless Next.js on Vercel and hosting APIs on cloud endpoints." },
      { name: "AWS", importance: "secondary", useCase: "Cloud virtual machines, computing, and object storage." },
      { name: "Docker", importance: "secondary", useCase: "Containerizing services for consistent developer environments." },
      { name: "Kubernetes", importance: "familiar", useCase: "Familiarity with container orchestration concepts." }
    ]
  },
  {
    title: "Security",
    tagline: "Secure Pipelines & Threat Mitigation",
    color: "#34d399",
    icon: FiLock,
    items: [
      { name: "Cybersecurity", importance: "primary", useCase: "B.Tech specialization path focusing on system defenses." },
      { name: "Secure Development", importance: "primary", useCase: "Mitigating injection threats, CORS validation, and rate-limiting." },
      { name: "AI Security", importance: "secondary", useCase: "Evaluating LLM inputs, preventing prompts leakage, and model protection." },
      { name: "Model Protection", importance: "secondary", useCase: "Defending machine learning classifiers from adversarial attacks." }
    ]
  }
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-black py-24">
      {/* Glow Ambient Blobs */}
      <div className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-900/[0.04] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-purple-900/[0.04] blur-[130px] pointer-events-none" />

      {/* Cyber Grid Background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Cinematic Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-5 tracking-widest uppercase"
          >
            <FiCpu className="animate-spin-slow" />
            Skills Dashboard
          </motion.div>
          
          <SectionHeading
            title="Technical Expertise"
            subtitle="A visual map of my architectural capabilities and engineering core stack."
            align="center"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <BorderGlow
                  className="p-6 h-full flex flex-col justify-between shadow-lg"
                  borderRadius={20}
                  backgroundColor="#09090c"
                  colors={[category.color, `${category.color}25`, "#ffffff05"]}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3.5 pb-4 border-b border-white/5 text-left">
                      <div 
                        className="p-2.5 rounded-xl border flex items-center justify-center shrink-0"
                        style={{
                          background: `${category.color}10`,
                          borderColor: `${category.color}25`,
                          color: category.color
                        }}
                      >
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white leading-tight">{category.title}</h4>
                        <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">{category.tagline}</span>
                      </div>
                    </div>

                    {/* Skill Groups */}
                    <div className="space-y-5">
                      {/* Primary Skills */}
                      <div className="space-y-2 text-left">
                        <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase font-bold">Core Expertise</span>
                        <div className="space-y-1.5">
                          {category.items.filter(i => i.importance === "primary").map(item => (
                            <div 
                              key={item.name}
                              onMouseEnter={() => setHoveredSkill(item)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className="group flex flex-col p-2 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all cursor-help text-left"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{item.name}</span>
                                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-cyan-500/10 text-cyan-400 bg-cyan-500/5 select-none">Core</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Secondary Skills */}
                      <div className="space-y-2 text-left">
                        <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase font-bold">Secondary Stack</span>
                        <div className="flex flex-wrap gap-2">
                          {category.items.filter(i => i.importance === "secondary").map(item => (
                            <span
                              key={item.name}
                              onMouseEnter={() => setHoveredSkill(item)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className="text-xs px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.005] hover:border-white/10 hover:bg-white/[0.02] text-zinc-300 transition-all cursor-help select-none"
                            >
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Familiar Tools */}
                      <div className="space-y-2 text-left">
                        <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase font-bold">Familiar Tools</span>
                        <div className="flex flex-wrap gap-1.5">
                          {category.items.filter(i => i.importance === "familiar").map(item => (
                            <span
                              key={item.name}
                              onMouseEnter={() => setHoveredSkill(item)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className="text-[10px] px-2 py-1 rounded border border-white/5 text-zinc-500 hover:text-zinc-400 transition-all cursor-help select-none"
                            >
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Inspector Footer */}
                  <div className="mt-6 pt-3.5 border-t border-white/5 min-h-[44px] flex items-center text-left">
                    <AnimatePresence mode="wait">
                      {hoveredSkill && category.items.some(i => i.name === hoveredSkill.name) ? (
                        <motion.p
                          key={hoveredSkill.name}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-[10px] sm:text-xs text-cyan-400 font-mono leading-relaxed"
                        >
                          {hoveredSkill.useCase}
                        </motion.p>
                      ) : (
                        <p className="text-[9px] sm:text-[10px] text-zinc-600 leading-relaxed font-mono select-none">
                          Hover over any technology node to inspect application telemetry.
                        </p>
                      )}
                    </AnimatePresence>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
