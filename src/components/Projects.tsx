"use client";

import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background Accents */}
      <div
        className="ambient-orb w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2"
        style={{ background: "rgba(139, 92, 246, 0.04)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Featured Projects"
          subtitle="Solving real problems with AI, deep learning, and scalable backends"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={i} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
