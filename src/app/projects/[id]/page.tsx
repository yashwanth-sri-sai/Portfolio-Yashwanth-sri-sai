import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiTag, FiCheckCircle } from "react-icons/fi";
import { projects } from "@/data/projects";
import GlowCursor from "@/components/GlowCursor";
import Navbar from "@/components/Navbar";

export default function ProjectCaseStudy({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[#f5f5f7] selection:bg-blue-500/30">
      <GlowCursor />
      
      {/* Mini-Navbar just for back navigation and consistency */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-white/5 transition-all duration-300 py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
          <Link href="/#projects" className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium">
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-20 blur-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)]/50 via-[var(--color-bg-primary)]/90 to-[var(--color-bg-primary)]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            {project.category}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            {project.shortDescription}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-white font-medium">
                <FiGithub size={20} /> View Source Code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <FiExternalLink size={20} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Left: Narrative Content */}
        <div className="flex-1 space-y-16">
          {/* Main Thumbnail */}
          <div className="rounded-3xl overflow-hidden glass-card border border-white/10 aspect-video relative shadow-2xl">
            <Image 
              src={project.image}
              alt={`${project.title} Preview`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-8 h-px bg-blue-500"></span>
              The Problem
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <span className="w-8 h-px bg-purple-500"></span>
              Solution & Architecture
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              {project.solutionArchitecture}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Key Challenges</h3>
              <ul className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-3 text-white/70">
                    <span className="text-red-400 mt-1">▹</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Key Learnings</h3>
              <ul className="space-y-4">
                {project.learnings.map((learning, i) => (
                  <li key={i} className="flex gap-3 text-white/70">
                    <FiCheckCircle className="text-emerald-400 mt-1 flex-shrink-0" />
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-white/10 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-2xl font-bold mb-4 text-white">Outcome & Impact</h2>
            <p className="text-lg text-white/80 leading-relaxed relative z-10">
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Right: Sticky Metadata Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            {/* Project Details Card */}
            <div className="p-6 rounded-3xl glass-card border border-white/10">
              <h3 className="text-lg font-bold mb-6 text-white">Project Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <FiCalendar className="text-white/40" />
                  <span>Year: {project.date}</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <FiTag className="text-white/40" />
                  <span>Category: {project.category}</span>
                </div>
              </div>

              <hr className="my-6 border-white/10" />

              <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-white/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Card */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="p-6 rounded-3xl glass-card border border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-lg font-bold mb-6 text-white relative z-10">Key Metrics</h3>
                
                <div className="space-y-6 relative z-10">
                  {project.metrics.map((metric, i) => (
                    <div key={i}>
                      <p className="text-sm text-white/60 mb-1">{metric.label}</p>
                      <p className="text-3xl font-bold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

      </section>
    </main>
  );
}
