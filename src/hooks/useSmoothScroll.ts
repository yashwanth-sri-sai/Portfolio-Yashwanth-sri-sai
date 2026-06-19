"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll(disabled = false) {
  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    
    // @ts-expect-error - Global lenis reference
    window.lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // @ts-expect-error - Global lenis reference
      window.lenis = undefined;
    };
  }, [disabled]);
}
