"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projects, ProjectCategory } from "@/data/projects";

const categories: ProjectCategory[] = ["All", "AI/ML", "Web Development", "Data Analytics"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  // Filter projects based on selected category
  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background Accents */}
      <div
        className="ambient-orb w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2"
        style={{ background: "rgba(139, 92, 246, 0.04)" }}
      />
      <div
        className="ambient-orb w-[800px] h-[800px] bottom-0 right-[-20%] pointer-events-none"
        style={{ background: "rgba(59, 130, 246, 0.03)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10 px-6 sm:px-8 lg:px-12">
        <SectionHeading
          title="Featured Projects"
          subtitle="Solving real problems with AI, deep learning, and scalable backends. Explore the case studies to see the architecture and impact."
        />

        {/* ─── Category Filter System ─── */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              suppressHydrationWarning
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>

        {/* ─── Projects Grid ─── */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={project.featured && activeCategory === "All" ? "md:col-span-2" : "col-span-1"}
              >
                <ProjectCard 
                  project={project} 
                  index={i} 
                  featured={project.featured && activeCategory === "All"} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-white/50"
          >
            <p>No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
