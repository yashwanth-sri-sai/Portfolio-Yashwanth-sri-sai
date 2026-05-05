"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlowCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      id="glow-cursor"
      className="pointer-events-none fixed z-[9999]"
      style={{ x, y }}
    >
      <div
        className="w-[400px] h-[400px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(99, 102, 241, 0.4), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}
