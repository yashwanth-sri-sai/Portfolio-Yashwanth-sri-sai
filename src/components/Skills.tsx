"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/data/skills";

function SkillBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="text-xs font-mono"
          style={{ color: "var(--color-text-muted)" }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="ambient-orb w-[500px] h-[500px] -bottom-40 -left-40"
        style={{ background: "rgba(99, 102, 241, 0.05)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="Technologies I use to bring ideas to production"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: catIndex * 0.15,
              }}
              className="glass-card p-8"
              id={`skill-category-${category.id}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3
                  className="text-lg font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {category.title}
                </h3>
              </div>

              {/* Skill Bars */}
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={catIndex * 0.15 + skillIndex * 0.1}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
