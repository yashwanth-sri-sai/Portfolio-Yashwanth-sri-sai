"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
    >
      <div
        className="ambient-orb w-[400px] h-[400px] top-0 -right-40"
        style={{ background: "rgba(236, 72, 153, 0.04)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          title="Experience"
          subtitle="Where I've made an impact"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.05))",
            }}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row items-start gap-8 mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              id={`experience-${exp.id}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 top-0 z-10">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    background: "rgba(139, 92, 246, 0.3)",
                  }}
                />
              </div>

              {/* Content Card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
                  index % 2 === 0 ? "md:text-right md:pr-0" : "md:text-left md:pl-0"
                }`}
              >
                <div className="glass-card p-6 md:p-8 text-left">
                  {/* Period */}
                  <span
                    className="text-sm font-mono mb-2 block"
                    style={{ color: "var(--color-accent-indigo)" }}
                  >
                    {exp.period}
                  </span>

                  {/* Role & Company */}
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className="text-base font-medium mb-4"
                    style={{ color: "var(--color-accent-purple)" }}
                  >
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "var(--color-accent-cyan)" }}
                        />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[calc(50%-40px)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
