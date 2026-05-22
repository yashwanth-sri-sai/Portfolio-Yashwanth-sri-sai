"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BlogPost, BlogSection } from "@/data/blogs";
import { FiArrowLeft, FiArrowRight, FiClock, FiCalendar, FiShare2, FiCheck } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArticleContent({ blog }: { blog: BlogPost }) {
  const [isCopied, setIsCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const articleRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, 50]);

  // Extract headings for TOC
  const headings = blog.content
    .filter(section => section.type === "heading" && section.level === 2)
    .map(section => section.content || "");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll('h2[id]'));
      
      let currentActive = "";
      headingElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        // If heading is near the top of the screen (with some margin)
        if (rect.top <= 150) {
          currentActive = element.id;
        }
      });
      
      if (currentActive) {
        setActiveHeading(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const renderSection = (section: BlogSection, index: number) => {
    switch (section.type) {
      case "paragraph":
        return (
          <p key={index} className="text-zinc-300 text-lg leading-relaxed mb-6 font-light">
            {section.content}
          </p>
        );
      
      case "heading":
        const id = section.content?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `heading-${index}`;
        if (section.level === 2) {
          return (
            <h2 key={index} id={id} className="text-3xl font-bold text-white mt-16 mb-6 scroll-mt-24 group flex items-center">
              {section.content}
              <a href={`#${id}`} className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500 text-xl">#</a>
            </h2>
          );
        }
        return (
          <h3 key={index} id={id} className="text-2xl font-semibold text-white mt-12 mb-4 scroll-mt-24">
            {section.content}
          </h3>
        );

      case "code":
        return (
          <div key={index} className="mb-8 mt-4 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{section.language}</span>
            </div>
            <pre className="p-6 pt-16 bg-[#0c0c0e] overflow-x-auto">
              <code className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre" style={{ tabSize: 2 }}>
                {section.content}
              </code>
            </pre>
          </div>
        );

      case "callout":
        const styles = {
          info: "bg-blue-900/20 border-blue-500/30 text-blue-100",
          warning: "bg-yellow-900/20 border-yellow-500/30 text-yellow-100",
          tip: "bg-green-900/20 border-green-500/30 text-green-100",
          highlight: "bg-purple-900/20 border-purple-500/30 text-purple-100"
        };
        const icons = {
          info: "ℹ️",
          warning: "⚠️",
          tip: "💡",
          highlight: "✨"
        };
        const variant = section.variant || "info";
        
        return (
          <div key={index} className={`my-8 p-6 rounded-xl border ${styles[variant]} flex gap-4`}>
            <div className="text-2xl flex-shrink-0">{icons[variant]}</div>
            <div className="text-lg leading-relaxed">{section.content}</div>
          </div>
        );

      case "list":
        return (
          <ul key={index} className="list-none space-y-4 mb-8 my-4">
            {section.items?.map((item, i) => (
              <li key={i} className="flex gap-4 text-zinc-300 text-lg leading-relaxed font-light">
                <span className="text-cyan-500 mt-1.5 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />
      
      <Navbar />
      
      <main className="min-h-screen pb-24 relative overflow-hidden bg-[#06060e]">
        {/* Cinematic Hero */}
        <section className="relative pt-40 pb-20 px-6 sm:px-8 lg:px-12 flex items-center justify-center min-h-[60vh] overflow-hidden">
          {/* Hero Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br ${blog.gradient} rounded-full blur-[150px] opacity-20`} />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06060e] to-transparent z-10" />
          </div>

          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }}
            className="max-w-4xl mx-auto relative z-20 text-center flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white transition-all text-sm font-medium backdrop-blur-md"
              >
                <FiArrowLeft className="w-4 h-4" /> Back to Journal
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center gap-4 mb-6 flex-wrap"
            >
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-zinc-800/80 text-white rounded-md border border-zinc-700">
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                <FiClock className="w-4 h-4" /> {blog.readingTime} min read
              </span>
              <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                <FiCalendar className="w-4 h-4" /> 
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
              {blog.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl font-light leading-relaxed"
            >
              {blog.subtitle}
            </motion.p>
          </motion.div>
        </section>

        {/* Content Layout */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            
            {/* Main Content */}
            <article ref={articleRef} className="w-full lg:w-2/3 xl:w-3/4 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-img:rounded-xl"
              >
                {blog.content.map((section, index) => renderSection(section, index))}
              </motion.div>

              {/* Tags & Share */}
              <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm font-medium"
                >
                  {isCopied ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiShare2 className="w-4 h-4" />}
                  {isCopied ? "Link Copied!" : "Share Article"}
                </button>
              </div>
            </article>

            {/* Sidebar (TOC) */}
            <aside className="w-full lg:w-1/3 xl:w-1/4 hidden lg:block">
              <div className="sticky top-32">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-6">
                  Table of Contents
                </h4>
                <nav className="flex flex-col gap-3">
                  {headings.map((heading, idx) => {
                    const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    const isActive = activeHeading === id;
                    return (
                      <button
                        key={idx}
                        onClick={() => scrollToHeading(id)}
                        className={`text-left text-sm transition-all duration-300 border-l-2 pl-4 py-1 ${
                          isActive 
                            ? "border-cyan-500 text-cyan-400 font-medium" 
                            : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                        }`}
                      >
                        {heading}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">
                    About the Author
                  </h4>
                  <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                    Yashwanth Sri Sai is an AI & Full-Stack Engineer specializing in LLMs, scalable architectures, and immersive web experiences.
                  </p>
                  <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1.5 group">
                    View Portfolio <FiArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
