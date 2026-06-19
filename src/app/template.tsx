"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full min-h-screen relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Route Loading Shutter Overlay */}
      <motion.div
        key={pathname + "-shutter"}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-[#030308] z-[999] origin-top pointer-events-none"
        style={{
          borderBottom: "1px solid rgba(34, 211, 238, 0.2)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
        }}
      />
    </AnimatePresence>
  );
}
