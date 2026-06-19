"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function GlowCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [magneticPos, setMagneticPos] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Snappy spring config for the magnetic pull
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    requestAnimationFrame(() => setIsVisible(true));

    const handleMouseMove = (e: MouseEvent) => {
      // Check for magnetic elements
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('[data-cursor="magnetic"]') as HTMLElement | null;

      if (magneticElement) {
        if (!isHovering) setIsHovering(true);
        const rect = magneticElement.getBoundingClientRect();
        
        // Calculate center of the element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Add a slight pull towards the mouse, but mostly stick to the center
        const pullX = (e.clientX - centerX) * 0.1;
        const pullY = (e.clientY - centerY) * 0.1;

        cursorX.set(centerX + pullX - rect.width / 2);
        cursorY.set(centerY + pullY - rect.height / 2);
        setMagneticPos({ x: centerX, y: centerY, width: rect.width, height: rect.height });
      } else {
        if (isHovering) {
          setIsHovering(false);
          setMagneticPos(null);
        }
        // Normal cursor tracking (center the 400x400 glow or a smaller dot)
        cursorX.set(e.clientX - 200);
        cursorY.set(e.clientY - 200);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, isHovering]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Ambient Glow */}
      <motion.div
        id="glow-cursor"
        className="pointer-events-none fixed z-[9998] mix-blend-screen"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          animate={{
            width: isHovering && magneticPos ? magneticPos.width * 1.5 : 400,
            height: isHovering && magneticPos ? magneticPos.height * 1.5 : 400,
            opacity: isHovering ? 0.3 : 0.07,
          }}
          transition={{ duration: 0.3 }}
          className="rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(99, 102, 241, 0.4), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Magnetic Snapping Box */}
      <AnimatePresence>
        {isHovering && magneticPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-none fixed z-[9999] border border-cyan-400/50 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            style={{
              x: smoothX,
              y: smoothY,
              width: magneticPos.width,
              height: magneticPos.height,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
