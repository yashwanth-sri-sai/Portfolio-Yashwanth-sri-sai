"use client";
import { useEffect, useRef, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import BorderGlow from "./BorderGlow";
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiSend, 
  FiCheck, 
  FiLoader, 
  FiDownload, 
  FiCpu, 
  FiLayers, 
  FiArrowUpRight, 
  FiZap 
} from "react-icons/fi";
import emailjs from "@emailjs/browser";

// EmailJS config
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const isDemoMode = 
  !EMAILJS_SERVICE_ID || 
  !EMAILJS_TEMPLATE_ID || 
  !EMAILJS_PUBLIC_KEY || 
  EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" || 
  EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY";

// Holographic Canvas Orb Backdrop Component
function HolographicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 280;
    const radius = Math.min(width, height) * 0.28;
    const particles: { x: number; y: number; z: number; ox: number; oy: number; oz: number }[] = [];

    // Fibonacci spiral distribution on sphere surface
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - 2 * (i / particleCount));
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particles.push({ x, y, z, ox: x, oy: y, oz: z });
    }

    let angleX = 0.002;
    let angleY = 0.003;
    let targetAngleX = 0.002;
    let targetAngleY = 0.003;
    let pulseProgress = 0;
    let clickRipple = 0;
    const rippleMax = radius * 2.5;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      
      targetAngleY = x * 0.000015;
      targetAngleX = -y * 0.000015;
    };

    const handleClick = () => {
      clickRipple = 1.0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate interpolation
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      pulseProgress += 0.015;
      const pulseScale = 1.0 + Math.sin(pulseProgress) * 0.03;

      if (clickRipple > 0) {
        clickRipple += 0.035;
        if (clickRipple > 2.0) clickRipple = 0;
      }

      // Project points
      const projected = particles.map(p => {
        const x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        const z1 = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);

        const y2 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        const z2 = p.y * Math.sin(angleX) + z1 * Math.cos(angleX);

        let x3 = x1 * pulseScale;
        let y3 = y2 * pulseScale;
        let z3 = z2;

        if (clickRipple > 0) {
          const dist = Math.hypot(x3, y3, z3);
          const rippleRadius = rippleMax * (clickRipple - 1.0);
          const widthOfRipple = 50;
          const force = Math.max(0, 1.0 - Math.abs(dist - rippleRadius) / widthOfRipple);
          if (force > 0) {
            const push = (130 * force) / (clickRipple * 1.3);
            x3 += (x3 / dist) * push;
            y3 += (y3 / dist) * push;
            z3 += (z3 / dist) * push;
          }
        }

        const fov = 400;
        const scale = fov / (fov + z3);
        const screenX = x3 * scale + width / 2;
        const screenY = y3 * scale + height / 2;

        return { x: screenX, y: screenY, z: z3, scale };
      });

      // Draw connection vectors
      ctx.strokeStyle = "rgba(139, 92, 246, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i += 5) {
        const p1 = projected[i];
        for (let j = i + 1; j < i + 3; j++) {
          if (j >= projected.length) break;
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      projected.forEach(p => {
        const depthRatio = (p.z + radius) / (2 * radius); // 0 (front) to 1 (back)
        const alpha = Math.max(0.12, 1.0 - depthRatio) * 0.75;
        const r = Math.round(96 + (1.0 - depthRatio) * 60);
        const g = Math.round(165 + (1.0 - depthRatio) * 80);
        const b = Math.round(250 + (1.0 - depthRatio) * 5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, p.scale * 2.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0" />;
}

// Magnetic Card Wrapper component for social links
function MagneticCard({ 
  children, 
  href, 
  id, 
  color 
}: { 
  children: React.ReactNode; 
  href: string; 
  id: string; 
  color: string 
}) {
  const [displacement, setDisplacement] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = 0.28;
    setDisplacement({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setDisplacement({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="block relative transition-all duration-300 cursor-pointer rounded-2xl group"
      style={{
        transform: `translate3d(${displacement.x}px, ${displacement.y}px, 0)`,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        boxShadow: isHovered ? `0 10px 30px -10px ${color}20` : "none"
      }}
    >
      <BorderGlow
        className="relative overflow-hidden group p-6"
        innerClassName="flex items-center gap-4 w-full"
        borderRadius={16}
        backgroundColor="#09090b"
        style={{
          backdropFilter: "blur(20px)",
          border: isHovered ? `1px solid ${color}50` : "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div 
          className="absolute -inset-1 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${color}, transparent 70%)`
          }}
        />
        {children}
      </BorderGlow>
    </motion.a>
  );
}

// Current building status data
const CURRENTLY_BUILDING = [
  {
    title: "AI Agents",
    tech: "LangChain, Gemini AI",
    desc: "Architecting autonomous routing agents, state machines, and multi-agent workflow systems.",
    icon: FiCpu,
    color: "#3b82f6"
  },
  {
    title: "RAG Systems",
    tech: "FAISS, Vector DBs",
    desc: "Designing contextual chunk overlap queries and semantic vector similarity search pipelines.",
    icon: FiLayers,
    color: "#a855f7"
  },
  {
    title: "Immersive Frontends",
    tech: "Next.js 15, Canvas 2D",
    desc: "Optimizing GPU-accelerated graphics backdrops and particle engines for visual experiences.",
    icon: FiZap,
    color: "#06b6d4"
  }
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: ""
  });

  // Validation checking
  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNameValid = formValues.user_name.trim().length > 1;
  const isMessageValid = formValues.message.trim().length > 5;
  const isSubjectValid = formValues.subject.trim().length > 1;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (isDemoMode) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        formRef.current,
        EMAILJS_PUBLIC_KEY!
      );
      setStatus("sent");
      setFormValues({ user_name: "", user_email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const getValidationIcon = (field: string) => {
    if (field === "name" && formValues.user_name) {
      return isNameValid ? <FiCheck className="text-emerald-400" /> : null;
    }
    if (field === "email" && formValues.user_email) {
      return isEmailValid(formValues.user_email) ? <FiCheck className="text-emerald-400" /> : null;
    }
    if (field === "subject" && formValues.subject) {
      return isSubjectValid ? <FiCheck className="text-emerald-400" /> : null;
    }
    if (field === "message" && formValues.message) {
      return isMessageValid ? <FiCheck className="text-emerald-400" /> : null;
    }
    return null;
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-black py-24 overflow-hidden z-10 flex flex-col justify-center">
      
      {/* ─── Cyber Grid Lines Overlay ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 flex flex-col gap-20">

        {/* ─── SECTION 1: CINEMATIC FINAL HERO ─── */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <span className="h-[1px] w-8 bg-cyan-500/30" />
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">Connect</span>
            <span className="h-[1px] w-8 bg-cyan-500/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,1)]"
          >
            Let&apos;s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Impactful</span> Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
            className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-[1.8]"
          >
            Exploring AI architectures, engineering intelligent automated pipelines, and crafting immersive digital interfaces through continuous experimentation and technical design.
          </motion.p>
        </div>

        {/* ─── SECTION 5: LIVE STATUS / CURRENT FOCUS ─── */}
        <div className="w-full space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between border-b border-zinc-900 pb-3"
          >
            <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">LIVE TELEMETRY // CURRENT FOCUS</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest">ACTIVE PROCESSES</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {CURRENTLY_BUILDING.map((node, idx) => {
              const IconComponent = node.icon;
              return (
                <motion.div
                  key={node.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -4, borderColor: `${node.color}35` }}
                  className="relative group h-full"
                >
                  <BorderGlow
                    className="relative overflow-hidden transition-all duration-300 p-6"
                    innerClassName="flex flex-col justify-between w-full"
                    borderRadius={16} backgroundColor="#09090b"
                    style={{ border: "1px solid #18181b" }}
                  >
                  <div 
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[45px] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                    style={{ backgroundColor: node.color }}
                  />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold uppercase">{node.tech}</span>
                      <IconComponent size={16} style={{ color: node.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">{node.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium">{node.desc}</p>
                  </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── SECTION 2 & 3: FORM AND CONTACT METHODS ─── */}
        <div className="grid lg:grid-cols-5 gap-12 items-start relative min-h-[500px]">
          
          {/* Holographic Canvas Backdrop spinning in the background */}
          <div className="absolute inset-0 lg:left-1/3 w-full lg:w-2/3 h-full pointer-events-none overflow-hidden select-none opacity-50 lg:opacity-75 z-0 flex items-center justify-center">
            <HolographicCanvas />
          </div>

          {/* Left Column: Glassmorphism Contact Form (3/5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 space-y-6 relative z-10"
          >
            <BorderGlow className="relative p-8" innerClassName="w-full" borderRadius={24} backgroundColor="#09090b">
              
              <h3 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <FiMail className="text-cyan-400" /> Dispatch Transmission
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                {isDemoMode && (
                  <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-300 text-xs font-mono leading-relaxed">
                    <span className="font-bold">⚠️ Demo Mode:</span> Email API credentials are not configured in environment variables. Form submission will show a transmission error. Please reach me directly at <a href="mailto:yashwanthsrisai@gmail.com" className="underline text-cyan-400 hover:text-cyan-300">yashwanthsrisai@gmail.com</a>.
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="contact-name"
                      name="user_name"
                      required
                      value={formValues.user_name}
                      onChange={(e) => setFormValues({ ...formValues, user_name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. John Doe"
                      className="w-full py-3 px-4 rounded-[var(--radius-sm)] text-sm outline-none transition-all duration-300 text-white font-medium placeholder:text-zinc-500"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: focusedField === "name" ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.15)",
                        boxShadow: focusedField === "name" ? "0 0 0 3px rgba(6,182,212,0.12)" : "none",
                      }}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {getValidationIcon("name")}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Your Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="contact-email"
                      name="user_email"
                      required
                      value={formValues.user_email}
                      onChange={(e) => setFormValues({ ...formValues, user_email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. john@example.com"
                      className="w-full py-3 px-4 rounded-[var(--radius-sm)] text-sm outline-none transition-all duration-300 text-white font-medium placeholder:text-zinc-500"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: focusedField === "email" ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.15)",
                        boxShadow: focusedField === "email" ? "0 0 0 3px rgba(6,182,212,0.12)" : "none",
                      }}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {getValidationIcon("email")}
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Subject / Project Context
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      required
                      value={formValues.subject}
                      onChange={(e) => setFormValues({ ...formValues, subject: e.target.value })}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. AI internship opportunity"
                      className="w-full py-3 px-4 rounded-[var(--radius-sm)] text-sm outline-none transition-all duration-300 text-white font-medium placeholder:text-zinc-500"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: focusedField === "subject" ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.15)",
                        boxShadow: focusedField === "subject" ? "0 0 0 3px rgba(6,182,212,0.12)" : "none",
                      }}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {getValidationIcon("subject")}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formValues.message}
                      onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project, idea or opportunity..."
                      className="w-full py-3 px-4 rounded-[var(--radius-sm)] text-sm outline-none transition-all duration-300 resize-none text-white font-medium placeholder:text-zinc-500"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: focusedField === "message" ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.15)",
                        boxShadow: focusedField === "message" ? "0 0 0 3px rgba(6,182,212,0.12)" : "none",
                      }}
                    />
                    <div className="absolute right-4 top-4">
                      {getValidationIcon("message")}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 rounded-[var(--radius-sm)] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-500 disabled:opacity-60 relative overflow-hidden"
                  style={{
                    background:
                      status === "sent"
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : status === "error"
                          ? "linear-gradient(135deg, #ef4444, #dc2626)"
                          : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "#fff",
                    border: "none",
                  }}
                  id="contact-submit"
                >
                  <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1),transparent)] -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                  
                  {status === "idle" && (
                    <>
                      <FiSend size={15} />
                      Transmit Message
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <FiLoader size={15} />
                      </motion.span>
                      Transmitting Data...
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <FiCheck size={15} />
                      Transmission Received!
                    </>
                  )}
                  {status === "error" && "Link Error — Retry dispatch"}
                </motion.button>

              </form>
            </BorderGlow>
          </motion.div>

          {/* Right Column: Interactive Connection Cards (2/5 Columns) */}
          <div className="lg:col-span-2 flex flex-col gap-4 relative z-10">
            
            {/* CTA availability callout banner (Section 4) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-5 rounded-2xl border border-zinc-800/40 text-center relative overflow-hidden"
              style={{
                background: "rgba(168, 85, 247, 0.04)",
                border: "1px solid rgba(168, 85, 247, 0.15)",
                backdropFilter: "blur(20px)"
              }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500" />
              <p className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">CONTRACT AVAILABILITY</p>
              <p className="text-sm font-semibold text-zinc-200">
                Open to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">AI/ML engineering & Full-Stack SDE</span> opportunities.
              </p>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <MagneticCard 
                href="mailto:k.yashwanthsrisai09@gmail.com" 
                id="social-link-email" 
                color="#8b5cf6"
              >
                <div className="p-3 rounded-xl border border-purple-500/20 text-purple-400 bg-purple-500/10">
                  <FiMail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">Email Channels</p>
                  <p className="text-sm font-bold text-zinc-100 truncate mt-0.5">k.yashwanthsrisai09@gmail.com</p>
                </div>
                <FiArrowUpRight size={14} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </MagneticCard>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <MagneticCard 
                href="https://www.linkedin.com/in/yashwanth-srisai-7a1078252/" 
                id="social-link-linkedin" 
                color="#06b6d4"
              >
                <div className="p-3 rounded-xl border border-cyan-500/20 text-cyan-400 bg-cyan-500/10">
                  <FiLinkedin size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">LinkedIn Network</p>
                  <p className="text-sm font-bold text-zinc-100 truncate mt-0.5">in/yashwanth-srisai-7a1078252</p>
                </div>
                <FiArrowUpRight size={14} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </MagneticCard>
            </motion.div>

            {/* GitHub Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <MagneticCard 
                href="https://github.com/yashwanth-sri-sai" 
                id="social-link-github" 
                color="#e2e8f0"
              >
                <div className="p-3 rounded-xl border border-zinc-500/20 text-zinc-300 bg-zinc-500/10">
                  <FiGithub size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">GitHub Portals</p>
                  <p className="text-sm font-bold text-zinc-100 truncate mt-0.5">github.com/yashwanth-sri-sai</p>
                </div>
                <FiArrowUpRight size={14} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </MagneticCard>
            </motion.div>

            {/* Resume Download Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <MagneticCard 
                href="https://drive.google.com/file/d/1z9KBC7yT0dVYz2OHQpa44-e9SHqPTC1K/view?usp=sharing" 
                id="social-link-resume" 
                color="#3b82f6"
              >
                <div className="p-3 rounded-xl border border-blue-500/20 text-blue-400 bg-blue-500/10">
                  <FiDownload size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">Curriculum Vitae</p>
                  <p className="text-sm font-bold text-zinc-100 truncate mt-0.5">Download Yashwanth&apos;s Resume</p>
                </div>
                <FiArrowUpRight size={14} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </MagneticCard>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
