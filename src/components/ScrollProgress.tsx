"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-progress-bar"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
    >
      <div
        className="w-full h-full"
        style={{
          background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
        }}
      />
    </motion.div>
  );
}
