"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications, Certification } from "@/data/certifications";
import { FiExternalLink, FiX, FiCalendar, FiAward, FiCheckCircle, FiLock } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

// Custom Dynamic Certificate Renderer that layers high-fidelity metadata on top of the generated digital template.
// This allows 100% vector-sharp texts, customizable color palettes via CSS filters, and responsive scaling.
interface CertificateRendererProps {
  cert: Certification;
  size?: "small" | "large";
}

const CertificateRenderer = React.memo(function CertificateRenderer({
  cert,
  size = "small",
}: CertificateRendererProps) {
  const isLarge = size === "large";

  return (
    <div
      className="relative w-full select-none overflow-hidden bg-black flex items-center justify-center font-sans"
      style={{ aspectRatio: "4/3" }}
    >
      {/* Background Certificate Template with hue adjustment */}
      <img
        src={cert.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700"
        style={{
          filter: `hue-rotate(${cert.hueRotate}) saturate(1.1) brightness(0.8) contrast(1.15)`,
        }}
      />

      {/* Cybernetic overlay gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Tech framing lines */}
      <div className="absolute inset-0 border-[1px] border-white/5 pointer-events-none m-2" />
      <div className="absolute inset-0 border-[1px] border-white/10 pointer-events-none m-4" />

      {/* Futuristic Corner Brackets */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-white/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-white/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-white/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-white/20 pointer-events-none" />

      {/* Watermark security ring */}
      <div className="absolute w-[65%] h-[85%] rounded-full border border-white/5 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[85%] h-[85%] rounded-full border border-dashed border-white/5" />
      </div>

      {/* dynamic certificate text layers */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-10">
        {/* Header Metadata */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col text-left">
            <span className="text-[7px] sm:text-[9px] font-mono tracking-widest text-white/30">CREDENTIAL ID</span>
            <span className="text-[8px] sm:text-[10px] font-mono font-bold text-white/60 tracking-wider">
              #{cert.id.toString().padStart(4, "0")}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[7px] sm:text-[9px] font-mono tracking-widest text-cyan-400 font-bold">SECURE AUTH</span>
            <div className="text-[8px] sm:text-[10px] font-mono text-white/40">{cert.hash.substring(0, 14)}...</div>
          </div>
        </div>

        {/* Dynamic Title, Issuer & Candidate */}
        <div className="flex flex-col items-center text-center my-auto px-4">
          <span
            className="text-[7px] sm:text-[9px] font-mono tracking-[0.2em] font-extrabold uppercase mb-1 sm:mb-2 text-white/40"
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.05)" }}
          >
            CERTIFICATE OF COMPLETION
          </span>
          <h4
            className={`font-black tracking-tight text-white leading-tight uppercase max-w-[90%] mb-1.5 sm:mb-3 ${
              isLarge ? "text-base sm:text-xl md:text-2xl" : "text-xs sm:text-sm md:text-base"
            }`}
            style={{ textShadow: "0 0 15px rgba(255,255,255,0.15)" }}
          >
            {cert.title}
          </h4>
          <span className="text-[6px] sm:text-[8px] font-mono text-white/30 mb-0.5">AWARDED TO</span>
          <span
            className={`font-sans font-bold text-white tracking-wide border-b border-white/10 pb-0.5 px-4 ${
              isLarge ? "text-xs sm:text-base" : "text-[10px] sm:text-xs"
            }`}
          >
            K. YASHWANTH SRI SAI
          </span>
          <span className="text-[6px] sm:text-[8px] font-mono text-white/20 mt-2">BY INDUSTRY ISSUER</span>
          <span
            className={`font-sans font-extrabold uppercase tracking-widest mt-0.5 ${
              isLarge ? "text-xs sm:text-sm" : "text-[8px] sm:text-[10px]"
            }`}
            style={{ color: cert.color }}
          >
            {cert.issuer}
          </span>
        </div>

        {/* Footer Meta & Signatures */}
        <div className="flex justify-between items-end">
          {/* Cryptographic Verification Entity */}
          <div className="flex flex-col text-left">
            <span className="text-[8px] sm:text-[10px] font-mono italic text-white/40 border-b border-white/10 pb-0.5 select-none leading-none">
              Aegis Core
            </span>
            <span className="text-[5px] sm:text-[7px] font-mono text-white/30 tracking-widest mt-1">VERIFICATION SYS</span>
          </div>

          {/* Golden Seal of Authenticity */}
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 bg-yellow-500/10 rounded-full border border-yellow-500/30 shadow-[0_0_12px_rgba(234,179,8,0.1)] select-none">
            <div className="w-[85%] h-[85%] rounded-full border border-dashed border-yellow-500/20 flex items-center justify-center">
              <span className="text-[8px] sm:text-[10px] text-yellow-500 font-bold">✓</span>
            </div>
            {/* Hologram details */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full animate-pulse-glow" />
          </div>

          {/* Issuance Date */}
          <div className="flex flex-col text-right">
            <span className="text-[8px] sm:text-[10px] font-mono font-bold text-white/60 leading-none">
              {cert.year}
            </span>
            <span className="text-[5px] sm:text-[7px] font-mono text-white/30 tracking-widest mt-1">DATE OF ISSUE</span>
          </div>
        </div>
      </div>
    </div>
  );
});

// Container motion variants for stagger-animating child elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Certification card entrance variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // Custom cubic-bezier (easeOutExpo) for high-end cinematic glide
    },
  },
};

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Auto-focus close button for screen reader convenience
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <section id="certifications" className="section-padding relative overflow-hidden bg-transparent">
      {/* Background Subtle Ambient Accents */}
      <div
        className="ambient-orb w-[500px] h-[500px] top-1/4 left-1/4 -translate-x-1/2 pointer-events-none"
        style={{ background: "rgba(139, 92, 246, 0.02)" }}
      />
      <div
        className="ambient-orb w-[700px] h-[700px] bottom-1/4 right-0 pointer-events-none"
        style={{ background: "rgba(6, 182, 212, 0.02)" }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <SectionHeading
          title="Certification Vault"
          subtitle="Cryptographically verified professional credentials and specialized simulations."
          align="center"
        />

        {/* Certificate Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              className="group relative flex flex-col h-full rounded-2xl border border-white/5 bg-[#0a0a0c]/40 backdrop-blur-xl transition-all duration-500 overflow-hidden hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] hover:-translate-y-2"
            >
              {/* Preview Compartment */}
              <div className="relative aspect-[4/3] w-full overflow-hidden p-3 pb-0">
                <div
                  className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 bg-black/60"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                  }}
                >
                  <div className="w-full h-full relative overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    {/* Rendered Certificate Canvas */}
                    <CertificateRenderer cert={cert} size="small" />

                    {/* Gradient Inner Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-40 pointer-events-none" />
                  </div>
                </div>

                {/* Glass Verification Badge */}
                <div className="absolute top-4.5 right-4.5 z-20">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-cyan-500/20 bg-black/75 backdrop-blur-md text-[9px] font-mono font-bold tracking-wider text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                    VERIFIED ✓
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-col flex-grow p-5 justify-between">
                <div className="space-y-4">
                  {/* Category & Year */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/40 tracking-wider">
                    <span className="uppercase">{cert.category}</span>
                    <span>CY.{cert.year}</span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-semibold text-white/50 mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cert.color }} />
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Glass Tech/Skill Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-white/40 transition-colors duration-300 group-hover:text-white/60 group-hover:border-white/10"
                      >
                        [ {skill} ]
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Trigger */}
                <div className="pt-6">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] cursor-pointer"
                  >
                    View Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Vault Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10"
            >
              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-30 p-2 rounded-full border border-white/10 bg-black/50 text-white/70 hover:text-white transition-all hover:bg-white/5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <FiX size={18} />
              </button>

              {/* Certificate Canvas Compartment */}
              <div className="relative border-b border-white/5">
                <CertificateRenderer cert={selectedCert} size="large" />

                {/* Glass Verification badge floating inside modal view */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-md border border-cyan-500/20 bg-black/75 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <FiLock className="animate-pulse" /> VERIFIED CREDENTIAL
                </div>
              </div>

              {/* Meta details footer in the Modal */}
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight">{selectedCert.title}</h3>
                    <p className="text-sm font-semibold text-white/50 mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedCert.color }} />
                      Issued by {selectedCert.issuer} — CY.{selectedCert.year}
                    </p>
                  </div>

                  {selectedCert.verificationLink && (
                    <a
                      href={selectedCert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs tracking-wide hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
                    >
                      Verify Online <FiExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Acquired Skillsets</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono px-3 py-1 rounded border border-white/5 bg-white/[0.02] text-white/60"
                      >
                        [ {skill} ]
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
