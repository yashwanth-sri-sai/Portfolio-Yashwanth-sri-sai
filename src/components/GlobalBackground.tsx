"use client";

import DotGrid from "./DotGrid";

export default function GlobalBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -10, backgroundColor: "#0A0A0F" }}>
      <DotGrid
        dotSize={3}
        gap={20}
        baseColor="#2A2A3A"
        activeColor="#A855F7"
        proximity={150}
        shockRadius={250}
        shockStrength={10}
      />
    </div>
  );
}
