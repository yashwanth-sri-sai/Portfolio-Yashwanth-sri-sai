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

  // Split title to apply gradient only to the last word for visual hierarchy contrast
  const words = title.split(" ");
  const lastWord = words.pop() || "";
  const baseTitle = words.join(" ");

  return (
    <div className={`${isCenter ? "text-center" : "text-left"} mb-12`}>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 ${isCenter ? "mx-auto text-center" : "text-left"}`}
      >
        {baseTitle && `${baseTitle} `}
        {lastWord && (
          <span className="gradient-text">
            {lastWord}
          </span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "1rem",
            lineHeight: "1.625rem",
            maxWidth: "42rem",
            margin: isCenter ? "0 auto" : "0",
            textAlign: isCenter ? "center" : "left",
          }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className={`mt-4 h-[2px] w-20 ${isCenter ? "mx-auto origin-center" : "origin-left"}`}
        style={{
          background: isCenter 
            ? "linear-gradient(95deg, transparent, #60a5fa, transparent)" 
            : "linear-gradient(95deg, #60a5fa, transparent)",
        }}
      />
    </div>
  );
});
