"use client";

import { useState, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiLoader } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import SectionHeading from "./SectionHeading";

// EmailJS config — replace with your actual IDs
const EMAILJS_SERVICE_ID = "service_dpbc1qv";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const socialLinks = [
  {
    icon: <FiMail size={22} />,
    label: "Email",
    href: "mailto:k.yashwanthsrisai09@gmail.com",
    value: "k.yashwanthsrisai09@gmail.com",
    color: "#8b5cf6",
  },
  {
    icon: <FiGithub size={22} />,
    label: "GitHub",
    href: "https://github.com/yashwanth-sri-sai",
    value: "github.com/yashwanth-sri-sai",
    color: "#e2e8f0",
  },
  {
    icon: <FiLinkedin size={22} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yashwanth-srisai-7a1078252/",
    value: "linkedin.com/in/yashwanth-srisai-7a1078252",
    color: "#06b6d4",
  },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "var(--color-text-primary)",
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        className="ambient-orb w-[600px] h-[600px] -bottom-60 left-1/2 -translate-x-1/2"
        style={{ background: "rgba(99, 102, 241, 0.06)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's build something amazing together."
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-6"
              id="contact-form"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="user_name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--color-accent-indigo)]/30 focus:border-[var(--color-accent-indigo)]/50 placeholder:text-[var(--color-text-muted)]"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="user_email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--color-accent-indigo)]/30 focus:border-[var(--color-accent-indigo)]/50 placeholder:text-[var(--color-text-muted)]"
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none focus:ring-2 focus:ring-[var(--color-accent-indigo)]/30 focus:border-[var(--color-accent-indigo)]/50 placeholder:text-[var(--color-text-muted)]"
                  style={inputStyle}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-60"
                style={{
                  background:
                    status === "sent"
                      ? "linear-gradient(135deg, #22c55e, #16a34a)"
                      : status === "error"
                        ? "linear-gradient(135deg, #ef4444, #dc2626)"
                        : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  border: "none",
                }}
                id="contact-submit"
              >
                {status === "idle" && (
                  <>
                    <FiSend size={16} />
                    Send Message
                  </>
                )}
                {status === "sending" && (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FiLoader size={16} />
                    </motion.span>
                    Sending...
                  </>
                )}
                {status === "sent" && (
                  <>
                    <FiCheck size={16} />
                    Message Sent!
                  </>
                )}
                {status === "error" && "Failed to send — try again"}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="mb-4">
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                Let&apos;s Connect
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                I&apos;m always open to discussing new opportunities, AI projects,
                or just having a chat about technology. Feel free to reach out!
              </p>
            </div>

            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 8 }}
                className="glass-card p-4 flex items-center gap-4 group"
                id={`social-link-${link.label.toLowerCase()}`}
              >
                <div
                  className="p-3 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                  style={{
                    background: `${link.color}10`,
                    color: link.color,
                    border: `1px solid ${link.color}20`,
                  }}
                >
                  {link.icon}
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {link.label}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {link.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Decorative */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-4 p-6 rounded-2xl text-center"
              style={{
                background: "rgba(139, 92, 246, 0.05)",
                border: "1px solid rgba(139, 92, 246, 0.1)",
              }}
            >
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                💡 Currently open to{" "}
                <span className="font-semibold gradient-text">
                  AI/ML, SDE, and Backend roles
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
