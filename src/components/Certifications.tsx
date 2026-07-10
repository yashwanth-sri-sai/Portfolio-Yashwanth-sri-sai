"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { certifications, Certification } from "@/data/certifications";
import { FiExternalLink, FiX, FiLock, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import BorderGlow from "./BorderGlow";

type FilterCategory = "All" | "AI" | "Backend" | "Cloud" | "Cybersecurity" | "Data Analytics" | "Professional Development";

const FILTER_CATEGORIES: FilterCategory[] = [
  "All",
  "AI",
  "Backend",
  "Cloud",
  "Cybersecurity",
  "Data Analytics",
  "Professional Development"
];

// Helper to determine featured items (top 6 highest quality certifications)
const FEATURED_IDS = [7, 8, 2, 1, 3, 4];

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
      {/* Background Certificate Template with Next.js Image Optimization */}
      <Image
        src={cert.image}
        alt={`${cert.title} Certificate Background Template`}
        fill
        sizes={isLarge ? "640px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{
          filter: `hue-rotate(${cert.hueRotate}) saturate(1.1) brightness(0.85) contrast(1.15)`,
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
      <div className={`absolute inset-0 flex flex-col justify-between z-10 ${isLarge ? "p-6 sm:p-8" : "p-3.5 sm:p-4"}`}>
        
        {/* Header Metadata */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col text-left">
            <span className={`font-mono tracking-widest text-white/30 ${isLarge ? "text-[7px] sm:text-[9px]" : "text-[6px] sm:text-[7px]"}`}>CREDENTIAL ID</span>
            <span className={`font-mono font-bold text-white/60 tracking-wider ${isLarge ? "text-[8px] sm:text-[10px]" : "text-[7px] sm:text-[8px]"}`}>
              #{cert.id.toString().padStart(4, "0")}
            </span>
          </div>
          <div className="text-right">
            <span className={`font-mono tracking-widest text-white/30 font-bold ${isLarge ? "text-[7px] sm:text-[9px]" : "text-[6px] sm:text-[7px]"}`}>STATUS</span>
            <div className={`font-mono text-cyan-400 font-bold ${isLarge ? "text-[8px] sm:text-[10px]" : "text-[7px] sm:text-[8px]"}`}>VERIFIED</div>
          </div>
        </div>

        {/* Dynamic Title, Issuer & Candidate */}
        <div className="flex flex-col items-center text-center my-auto px-2">
          {!isLarge ? (
            <>
              <h4 className="font-black tracking-tight text-white leading-tight uppercase max-w-[95%] mb-1 text-[9px] sm:text-[11px] line-clamp-2">
                {cert.title}
              </h4>
              <span className="text-[7.5px] font-sans font-bold text-white/80 border-b border-white/10 pb-0.5 px-2">
                K. YASHWANTH SRI SAI
              </span>
              <span className="font-sans font-extrabold uppercase tracking-widest text-[7px] sm:text-[8px] mt-1" style={{ color: cert.color }}>
                {cert.issuer}
              </span>
            </>
          ) : (
            <>
              <span
                className="text-[7px] sm:text-[9px] font-mono tracking-[0.2em] font-extrabold uppercase mb-1 sm:mb-2 text-white/40"
                style={{ textShadow: "0 0 10px rgba(255,255,255,0.05)" }}
              >
                CERTIFICATE OF COMPLETION
              </span>
              <h4
                className="font-black tracking-tight text-white leading-tight uppercase max-w-[90%] mb-1.5 sm:mb-3 text-base sm:text-xl md:text-2xl"
                style={{ textShadow: "0 0 15px rgba(255,255,255,0.15)" }}
              >
                {cert.title}
              </h4>
              <span className="text-[6px] sm:text-[8px] font-mono text-white/30 mb-0.5">AWARDED TO</span>
              <span className="font-sans font-bold text-white tracking-wide border-b border-white/10 pb-0.5 px-4 text-xs sm:text-base">
                K. YASHWANTH SRI SAI
              </span>
              <span className="text-[6px] sm:text-[8px] font-mono text-white/20 mt-2">BY ISSUER</span>
              <span className="font-sans font-extrabold uppercase tracking-widest mt-0.5 text-xs sm:text-sm" style={{ color: cert.color }}>
                {cert.issuer}
              </span>
            </>
          )}
        </div>

        {/* Footer Meta & Signatures */}
        <div className="flex justify-between items-end">
          {/* Cryptographic Verification Entity */}
          <div className="flex flex-col text-left">
            <span className={`font-sans font-bold text-white/40 border-b border-white/10 pb-0.5 select-none leading-none ${isLarge ? "text-[8px] sm:text-[10px]" : "text-[7px] sm:text-[8px]"}`}>
              Authorized Signature
            </span>
            <span className={`font-mono text-white/25 tracking-widest mt-1 ${isLarge ? "text-[5px] sm:text-[7px]" : "text-[4.5px] sm:text-[5.5px]"}`}>ISSUING AUTHORITY</span>
          </div>

          {/* Golden Seal of Authenticity */}
          <div className={`relative flex items-center justify-center bg-yellow-500/10 rounded-full border border-yellow-500/30 shadow-[0_0_12px_rgba(234,179,8,0.1)] select-none ${
            isLarge ? "w-8 h-8 sm:w-11 sm:h-11" : "w-6 h-6 sm:w-8 sm:h-8"
          }`}>
            <div className="w-[85%] h-[85%] rounded-full border border-dashed border-yellow-500/20 flex items-center justify-center">
              <span className={`text-yellow-500 font-bold ${isLarge ? "text-[8px] sm:text-[10px]" : "text-[6px] sm:text-[8px]"}`}>✓</span>
            </div>
            {/* Hologram details */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full animate-pulse-glow" />
          </div>

          {/* Issuance Date */}
          <div className="flex flex-col text-right">
            <span className={`font-mono font-bold text-white/60 leading-none ${isLarge ? "text-[8px] sm:text-[10px]" : "text-[7px] sm:text-[8px]"}`}>
              {cert.year}
            </span>
            <span className={`font-mono text-white/30 tracking-widest mt-1 ${isLarge ? "text-[5px] sm:text-[7px]" : "text-[4.5px] sm:text-[5.5px]"}`}>DATE OF ISSUE</span>
          </div>
        </div>

      </div>
    </div>
  );
});

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [showAll, setShowAll] = useState(false);
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
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  // Route classifications
  const matchesFilter = (cert: Certification, filter: FilterCategory) => {
    if (filter === "All") return true;
    if (filter === "AI") return cert.category === "AI/ML";
    if (filter === "Cybersecurity") return cert.category === "Cybersecurity";
    if (filter === "Data Analytics") return cert.category === "Data Analytics";
    if (filter === "Professional Development") return cert.category === "Business Analytics" || cert.issuer === "HP Life";
    if (filter === "Backend") return cert.skills.includes("Python") || cert.skills.includes("SQL") || cert.skills.includes("API Integration");
    if (filter === "Cloud") return cert.skills.includes("Automation") || cert.skills.includes("API Integration");
    return false;
  };

  // Filtered & Featured selections
  const visibleCertifications = useMemo(() => {
    let result = certifications.filter((cert) => matchesFilter(cert, activeFilter));
    
    if (activeFilter === "All") {
      if (!showAll) {
        // Show only featured sorted by custom featured order
        result = result
          .filter((cert) => FEATURED_IDS.includes(cert.id))
          .sort((a, b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id));
      } else {
        // Show all, but keep featured items at the top in their custom order, and append others at the bottom.
        // This maintains element layout stability during grid expanding transitions.
        result = [...result].sort((a, b) => {
          const aFeatured = FEATURED_IDS.includes(a.id);
          const bFeatured = FEATURED_IDS.includes(b.id);
          
          if (aFeatured && bFeatured) {
            return FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id);
          }
          if (aFeatured) return -1;
          if (bFeatured) return 1;
          return a.id - b.id;
        });
      }
    }
    return result;
  }, [activeFilter, showAll]);

  return (
    <section id="certifications" className="section-padding relative overflow-hidden bg-[#030308] py-24">
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
          subtitle="Cryptographically verified professional credentials validating practical engineering skillsets."
          align="center"
        />

        {/* Filter Chips Panel */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-10 mb-12 relative z-20">
          <div className="flex items-center gap-2 mr-2 text-zinc-500 text-xs font-mono tracking-wider uppercase select-none">
            <FiFilter className="text-cyan-400" /> Filter
          </div>
          {FILTER_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveFilter(category);
                if (category === "All") {
                  setShowAll(false);
                } else {
                  setShowAll(true);
                }
              }}
              className={`px-4 py-2 rounded-full border text-xs font-mono font-medium tracking-wide transition-all duration-300 relative overflow-hidden cursor-pointer ${
                activeFilter === category
                  ? "bg-cyan-950/60 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "glass-interactive text-white/50 hover:text-white border-white/5"
              }`}
            >
              {category === "All" ? "Featured" : category}
            </button>
          ))}
        </div>

        {/* Certificate Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <AnimatePresence>
            {visibleCertifications.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col h-full rounded-2xl border border-white/5 bg-[#0a0a0c]/40 backdrop-blur-xl transition-all duration-500 overflow-hidden hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] hover:-translate-y-1.5 cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                {/* Preview Compartment */}
                <div className="relative aspect-[4/3] w-full overflow-hidden p-3 pb-0 select-none">
                  <div
                    className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 bg-black/60"
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
                    }}
                  >
                    <div className="w-full h-full relative overflow-hidden">
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
                  <div className="space-y-4 text-left">
                    {/* Category & Year */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/40 tracking-wider select-none">
                      <span className="uppercase">{cert.category}</span>
                      <span>CY.{cert.year}</span>
                    </div>

                    {/* Title & Issuer */}
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-semibold text-white/50 mt-1 flex items-center gap-1.5 select-none">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cert.color }} />
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Glass Tech/Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-white/40 transition-colors duration-300 group-hover:text-white/60 group-hover:border-white/10 select-none"
                        >
                          [ {skill} ]
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Trigger button */}
                  <div className="pt-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(cert);
                      }}
                      className="btn-secondary w-full"
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All / Toggle Button (Only visible on All filter category) */}
        {activeFilter === "All" && (
          <div className="mt-12 flex justify-center relative z-20">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary flex items-center gap-2 px-6 py-2.5"
            >
              {showAll ? (
                <>
                  Show Featured <FiChevronUp />
                </>
              ) : (
                <>
                  View All Certificates ({certifications.length}) <FiChevronDown />
                </>
              )}
            </button>
          </div>
        )}
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight">{selectedCert.title}</h3>
                    <p className="text-xs sm:text-sm font-semibold text-white/50 mt-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedCert.color }} />
                      Issued by {selectedCert.issuer} — CY.{selectedCert.year}
                    </p>
                  </div>

                  {selectedCert.verificationLink && (
                    <a
                      href={selectedCert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-shrink-0"
                    >
                      Verify Online <FiExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div className="border-t border-white/5 pt-4 text-left">
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
