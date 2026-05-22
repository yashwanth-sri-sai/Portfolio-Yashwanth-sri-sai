"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative rounded-3xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-white/20 flex flex-col ${
        featured ? "md:flex-row md:col-span-2" : "col-span-1"
      }`}
    >
      {/* ─── Glowing Background Hover Effect ─── */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-0" />

      {/* ─── Project Thumbnail ─── */}
      <div
        className={`relative overflow-hidden z-10 ${
          featured ? "w-full md:w-1/2 h-64 md:h-auto" : "w-full h-56"
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Category Badge overlay on image */}
        <div className="absolute top-6 left-6 z-20">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg">
            {project.category}
          </span>
        </div>
      </div>

      {/* ─── Content Container ─── */}
      <div
        className={`relative z-10 flex flex-col px-8 py-6 sm:p-8 ${
          featured ? "w-full md:w-1/2 justify-center" : "w-full flex-grow"
        }`}
      >
        <div className="flex-grow">
          {/* Title & Date */}
          <div className="flex justify-between items-start mb-3 gap-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-sm font-medium text-white/40 whitespace-nowrap pt-1">
              {project.date}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Key Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex gap-6 mb-8 py-3 border-y border-white/10">
              {project.metrics.map((metric, i) => (
                <div key={i}>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                    {metric.label}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── Action Buttons ─── */}
        <div className="flex flex-wrap items-center gap-4 mt-auto">
          {/* Primary Action: Case Study */}
          <Link
            href={`/projects/${project.id}`}
            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors duration-300 text-sm font-semibold text-white"
          >
            Read Case Study
            <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

          {/* Secondary Actions */}
          <div className="flex gap-3 ml-auto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-colors text-white/70 hover:text-white"
                aria-label="View Source on GitHub"
              >
                <FiGithub size={18} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-colors text-white/70 hover:text-blue-400"
                aria-label="View Live Demo"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
