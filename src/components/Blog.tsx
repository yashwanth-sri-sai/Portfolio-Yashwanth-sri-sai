"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { blogs, ALL_CATEGORIES, BlogCategory } from "@/data/blogs";
import { FiArrowRight, FiClock, FiCalendar } from "react-icons/fi";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <section id="blog" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-cyan-400 text-sm font-medium mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Engineering Insights
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Technical <span className="gradient-text">Explorations</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Deep dives into AI systems, immersive interfaces, scalable architecture, and modern web technologies.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
              activeCategory === "All"
                ? "text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                : "text-zinc-400 hover:text-white bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {activeCategory === "All" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-90"
                style={{ borderRadius: 9999 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <span className="relative z-10">All Areas</span>
          </button>
          
          {ALL_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                activeCategory === category
                  ? "text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  : "text-zinc-400 hover:text-white bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-90"
                  style={{ borderRadius: 9999 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.slice(0, 3).map((blog, i) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="group h-full">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="h-full flex flex-col bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 transition-all duration-500 hover:border-cyan-500/30 hover:bg-zinc-800/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-zinc-800/80 text-cyan-400 rounded-md border border-zinc-700/50">
                      {blog.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                      <FiClock className="w-3.5 h-3.5" />
                      {blog.readingTime} min read
                    </span>
                  </div>

                  <div className="mb-6 flex-grow">
                    <div className="text-4xl mb-4 bg-zinc-800/50 w-16 h-16 flex items-center justify-center rounded-xl border border-zinc-700/30 shadow-inner">
                      {blog.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-zinc-500">
                      <FiCalendar className="w-3.5 h-3.5" />
                      {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      Read Article
                      <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border border-zinc-700 text-white font-medium hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-300 group"
          >
            Explore All Insights
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1.5 group-hover:text-cyan-400 transition-all" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
