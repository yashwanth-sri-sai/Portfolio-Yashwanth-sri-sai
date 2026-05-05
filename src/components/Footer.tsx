"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6">
      {/* Top Border Gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-lg font-bold gradient-text">
              Yashwanth Sri Sai
            </span>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {[
              {
                icon: <FiGithub size={18} />,
                href: "https://github.com/yashwanth-sri-sai",
                label: "GitHub",
              },
              {
                icon: <FiLinkedin size={18} />,
                href: "https://www.linkedin.com/in/yashwanth-srisai-7a1078252/",
                label: "LinkedIn",
              },
              {
                icon: <FiMail size={18} />,
                href: "mailto:k.yashwanthsrisai09@gmail.com",
                label: "Email",
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ y: -3 }}
                className="p-2 rounded-lg transition-colors duration-300"
                style={{
                  color: "var(--color-text-muted)",
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm flex items-center gap-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            © {currentYear} — Built with{" "}
            <FiHeart size={14} className="text-red-400 mx-0.5" /> using Next.js
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
