"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import BorderGlow from "./BorderGlow";
import { FiCpu, FiLayers, FiLock } from "react-icons/fi";

const specializations = [
  {
    title: "AI Systems",
    icon: FiCpu,
    color: "#60a5fa",
    skills: ["LLMs & Prompts", "RAG Pipelines", "Agentic AI Workflows", "Machine Learning"],
  },
  {
    title: "Backend Engineering",
    icon: FiLayers,
    color: "#c084fc",
    skills: ["FastAPI & Python", "Node.js Services", "Database Optimization", "Cloud Deployment"],
  },
  {
    title: "AI Security",
    icon: FiLock,
    color: "#34d399",
    skills: ["Cybersecurity Principles", "Model Vulnerability Mitigation", "Secure Pipeline Engineering", "Threat Research"],
  },
];

const metrics = [
  { value: "10+", label: "Projects Built", color: "from-blue-400 to-cyan-400" },
  { value: "6+", label: "AI Applications", color: "from-purple-400 to-pink-400" },
  { value: "30+", label: "Technologies", color: "from-emerald-400 to-teal-400" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-black">
      {/* Background Accent */}
      <div
        className="ambient-orb w-[500px] h-[500px] -top-40 right-0"
        style={{ background: "rgba(6, 182, 212, 0.03)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Context & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            <SectionHeading
              title="About Me"
              subtitle="Specializing in secure backend architectures and intelligent systems"
              align="left"
            />

            <p className="text-lg md:text-xl font-medium text-zinc-100 leading-relaxed">
              Computer Science undergraduate specializing in AI engineering and backend systems. I build intelligent applications using LLMs, RAG pipelines, and scalable APIs.
            </p>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold">How I Build</h4>
              <p className="text-base text-zinc-400 leading-[1.8]">
                I focus on clean modular architecture, security first-principles, and performance optimization. By bridging AI capability with production-grade backend design, I build systems that are scalable, secure, and user-focused.
              </p>
            </div>

            {/* Achievement Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-900/60">
              {metrics.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className={`text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Core Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 select-none">
              <div
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.03), transparent 70%)",
                }}
              />
              <div
                className="absolute inset-4 rounded-full animate-float"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.15), rgba(139, 92, 246, 0.05), transparent 70%)",
                  border: "1px solid rgba(255, 255, 255, 0.03)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span role="img" aria-label="brain" className="text-7xl drop-shadow-[0_0_20px_rgba(6,182,212,0.15)]">🧠</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specialization Cards Grid */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8 sm:mb-10">
            <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Specializations</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specializations.map((spec, idx) => {
              const IconComponent = spec.icon;
              return (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                >
                  <BorderGlow
                    className="p-6 h-full flex flex-col justify-between"
                    borderRadius={16}
                    backgroundColor="#07070a"
                    colors={[spec.color, `${spec.color}40`, "#ffffff10"]}
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-5 text-left">
                        <div
                          className="p-2.5 rounded-xl border flex items-center justify-center"
                          style={{
                            background: `${spec.color}10`,
                            borderColor: `${spec.color}25`,
                            color: spec.color,
                          }}
                        >
                          <IconComponent size={20} />
                        </div>
                        <h4 className="text-base font-bold text-white">{spec.title}</h4>
                      </div>
                      
                      <ul className="space-y-2.5 text-left">
                        {spec.skills.map((skill) => (
                          <li key={skill} className="flex items-center gap-2 text-sm text-zinc-400">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: spec.color }}
                            />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}
