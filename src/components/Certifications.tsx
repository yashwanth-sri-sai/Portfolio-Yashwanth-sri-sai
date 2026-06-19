"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";
import { FiExternalLink } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import BorderGlow from "./BorderGlow";

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <SectionHeading
          title="Certifications"
          subtitle="Professional credentials and continuous learning"
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative h-full"
            >
              <BorderGlow
                className="relative overflow-hidden group px-8 py-6"
                innerClassName="flex flex-col w-full"
                borderRadius={16} backgroundColor="#09090b"
              >
              {/* Decorative gradient blob on hover */}
              <div
                className="absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% -20%, ${cert.color}15, transparent 70%)`,
                }}
              />


              <div className="flex items-start justify-between mb-4 relative z-10 px-1">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{
                    background: `${cert.color}15`,
                    color: cert.color,
                    border: `1px solid ${cert.color}30`,
                  }}
                >
                  {cert.icon}
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-colors duration-300 hover:bg-white/5 cursor-pointer"
                    style={{ color: "var(--color-text-muted)" }}
                    aria-label={`View ${cert.title} certificate`}
                  >
                    <FiExternalLink size={20} className="group-hover:text-white transition-colors" />
                  </a>
                )}
              </div>

              <div className="relative z-10 flex-grow">
                <h3
                  className="text-lg font-bold mb-2 group-hover:text-white transition-colors"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {cert.title}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: cert.color }}
                >
                  {cert.issuer}
                </p>
              </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
