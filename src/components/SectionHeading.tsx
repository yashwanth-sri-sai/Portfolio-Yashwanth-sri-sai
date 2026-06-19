"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default React.memo(function SectionHeading({ 
  title, 
  subtitle, 
  align = "left"
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "text-center" : "text-left"} mb-16`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className={`text-4xl md:text-5xl font-bold gradient-text mb-4 ${isCenter ? "mx-auto text-center" : "text-left"}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            maxWidth: "48rem",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-6 h-[2px] w-24 ${isCenter ? "mx-auto origin-center" : "origin-left"}`}
        style={{
          background: isCenter 
            ? "linear-gradient(90deg, transparent, #8b5cf6, transparent)" 
            : "linear-gradient(90deg, #8b5cf6, transparent)",
        }}
      />
    </div>
  );
});
