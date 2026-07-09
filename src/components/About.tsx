"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const highlights = [
  "Python",
  "FastAPI",
  "LangChain",
  "Gemini AI",
  "FAISS",
  "REST APIs",
  "AWS",
  "Jenkins (CI/CD)",
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Accent */}
      <div
        className="ambient-orb w-[500px] h-[500px] -top-40 right-0"
        style={{ background: "rgba(6, 182, 212, 0.05)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              title="About Me"
              subtitle="Solid engineering foundations, scalable backends, and AI deployment"
              align="left"
            />
            <p
              className="text-base md:text-[1.05rem] leading-[1.8] text-zinc-400 mb-6 mt-6"
            >
              I&apos;m a{" "}
              <span className="font-medium text-zinc-200">
                Computer Science Undergraduate
              </span>{" "}
              specializing in Cyber Security, with strong foundations in Data Structures, Algorithms, and backend development. I am passionate about building secure, scalable systems and solving complex computational problems.
            </p>
            <p
              className="text-base md:text-[1.05rem] leading-[1.8] text-zinc-400 mb-6"
            >
              From designing{" "}
              <span className="font-medium text-zinc-200" style={{ color: "var(--color-accent-indigo)" }}>
                machine learning security solutions
              </span>{" "}
              to deploying{" "}
              <span className="font-medium text-zinc-200" style={{ color: "var(--color-accent-cyan)" }}>
                agentic AI workflows
              </span>{" "}
              using Gemini and LangChain — I bring an engineering-first mindset and solid analytical skills to every project.
            </p>
            <p
              className="text-base md:text-[1.05rem] leading-[1.8] text-zinc-400"
            >
              Seeking a full-time Software Engineer role to leverage my backend, database optimization, and AI deployment expertise to deliver production-grade software solutions.
            </p>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Decorative Orb */}
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.05), transparent 70%)",
                }}
              />
              <div
                className="absolute inset-4 rounded-full animate-float"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.1), transparent 70%)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span role="img" aria-label="brain" className="text-7xl">🧠</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {highlights.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="tech-tag text-sm px-4 py-2"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
