"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export default function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(glowY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(glowX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`relative group h-full flex flex-col ${className}`}
      id={`project-card-${project.id}`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${isHovered ? "var(--mouse-x, 50%)" : "50%"} ${isHovered ? "var(--mouse-y, 50%)" : "50%"}, ${project.color}15, transparent 40%)`,
        }}
      />

      {/* Card */}
      <div
        className="relative glass-card p-8 h-full flex flex-col overflow-hidden"
        style={{ borderRadius: "24px" }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          }}
        />

        {/* Icon & Number */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="text-4xl"
            animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {project.icon}
          </motion.div>
          <span
            className="text-sm font-mono font-semibold"
            style={{ color: "var(--color-text-muted)" }}
          >
            0{project.id}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-bold mb-3 tracking-tight transition-colors duration-300"
          style={{
            color: isHovered ? "#fff" : "var(--color-text-primary)",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6 flex-grow"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Metrics Row */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span 
                  className="text-2xl font-bold tracking-tight mb-1"
                  style={{ color: "var(--color-accent-indigo)" }}
                >
                  {metric.value}
                </span>
                <span 
                  className="text-xs uppercase tracking-wider font-semibold"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-auto">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center flex-1 gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              color: "var(--color-text-primary)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <FiGithub size={18} />
            View Code
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center flex-1 gap-2 py-3 rounded-xl text-sm font-semibold text-black transition-all duration-300"
              style={{
                background: "#f5f5f7",
              }}
            >
              <FiExternalLink size={18} />
              Live Demo
            </motion.a>
          )}
        </div>

        {/* Corner glow */}
        <div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${project.color}20, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      </div>
    </motion.div>
  );
}
