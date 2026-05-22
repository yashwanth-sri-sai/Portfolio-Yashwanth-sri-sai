"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { blogs, ALL_CATEGORIES, BlogCategory } from "@/data/blogs";
import { FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");

  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      <main className="min-h-screen pt-32 pb-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors duration-300 font-medium group"
            >
              <FiArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
          </motion.div>

          {/* Header Section */}
          <div className="mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              Technical <span className="gradient-text">Journal</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed"
            >
              A collection of thoughts, architectural deep-dives, and engineering explorations spanning AI, full-stack systems, and cybersecurity.
            </motion.p>
          </div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-16"
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
                  layoutId="activeCategoryBlogPage"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-90"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
                    layoutId="activeCategoryBlogPage"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-90"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </motion.div>

          {/* Articles Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog, i) => (
                <motion.div
                  key={blog.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="h-full"
                >
                  <Link href={`/blog/${blog.slug}`} className="group h-full block">
                    <article className="h-full flex flex-col bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 transition-all duration-500 hover:border-cyan-500/30 hover:bg-zinc-800/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
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
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredBlogs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-zinc-400">There are currently no articles in this category.</p>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
