"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail, FiArrowRight, FiDownload } from "react-icons/fi";
import { FaReact, FaPython, FaDatabase, FaRobot, FaBrain } from "react-icons/fa";
import { SiTensorflow, SiNextdotjs } from "react-icons/si";

/* ─── Types ─── */
type Particle = { x: number; y: number; size: number; speed: number; opacity: number; dx: number; dy: number };

/* ─── Animation Variants ─── */
const fadeUp = (delay = 0, duration = 0.7) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
  },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

const illustrationVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─── Social Links ─── */
const socialLinks = [
  { icon: <FiGithub size={17} />, href: "https://github.com/yashwanth-sri-sai", label: "GitHub" },
  { icon: <FiLinkedin size={17} />, href: "https://www.linkedin.com/in/yashwanth-srisai-7a1078252/", label: "LinkedIn" },
  { icon: <FiMail size={17} />, href: "mailto:yashwanthsrisai@gmail.com", label: "Email" },
];

/* ─── Floating Tech Icons ─── */
const techIcons = [
  { icon: <FaReact size={22} />, color: "#61DAFB", label: "React", pos: "top-[24%] left-[24%]", delay: 0 },
  { icon: <FaPython size={22} />, color: "#FFD43B", label: "Python", pos: "top-[24%] left-[76%]", delay: 1.2 },
  { icon: <SiTensorflow size={22} />, color: "#FF6F00", label: "TensorFlow", pos: "top-[76%] left-[24%]", delay: 0.6 },
  { icon: <FaDatabase size={22} />, color: "#60a5fa", label: "Database", pos: "top-[76%] left-[76%]", delay: 1.8 },
  { icon: <FaBrain size={22} />, color: "#a78bfa", label: "AI/ML", pos: "top-[48%] left-[18%]", delay: 0.9 },
  { icon: <SiNextdotjs size={22} />, color: "#e2e8f0", label: "Next.js", pos: "top-[48%] left-[82%]", delay: 1.5 },
];

/* ─── Roles for typewriter ─── */
const ROLES = ["AI/ML Enthusiast", "Software Developer", "Data Analyst"];

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.4,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4 + 0.08,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
        ctx.fill();
      });

      // Draw faint connecting lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.04 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ─── Role Typewriter ─── */
function RoleTypewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => setIsPaused(false), 1400);
      return () => clearTimeout(t);
    }
    const target = ROLES[roleIdx];
    const speed = isDeleting ? 38 : 62;

    const t = setTimeout(() => {
      if (!isDeleting && displayed === target) {
        setIsPaused(true);
        setIsDeleting(true);
      } else if (isDeleting && displayed === "") {
        setIsDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      } else {
        setDisplayed((prev) =>
          isDeleting ? prev.slice(0, -1) : target.slice(0, prev.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIdx, isPaused]);

  return (
    <span className="hero-typewriter-text">
      {displayed}
      <span className="hero-cursor" aria-hidden="true" />
    </span>
  );
}

/* ─── Main Hero Component ─── */
export default function Hero() {
  const nameWords = ["Yashwanth", "Sri", "Sai"];
  const [imgSrc, setImgSrc] = useState("/profile.png");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ─── Background Layers ─── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Particle canvas */}
        <ParticleCanvas />

        {/* Mesh gradient orbs */}
        <div
          className="ambient-orb w-[800px] h-[800px] -top-80 -left-60"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)" }}
        />
        <div
          className="ambient-orb w-[600px] h-[600px] bottom-[-15%] right-[-8%]"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
        <div
          className="ambient-orb w-[450px] h-[450px] top-[35%] right-[25%] animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)" }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.5,
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to top, var(--color-bg-primary), transparent)" }}
        />
        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-28 sm:py-32 lg:py-0 min-h-screen flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-8 xl:gap-16">

          {/* ─── LEFT: Text Content ─── */}
          <motion.div
            className="flex-1 lg:flex-[1.25] text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div variants={fadeUp(0.1)} className="mb-7">
              <span className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Open to Internships &amp; Full-Time Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <div className="mb-4">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[3rem] xl:text-[3.8rem] 2xl:text-[4.5rem] font-extrabold tracking-tight"
                style={{ lineHeight: 1.06, letterSpacing: "-0.035em" }}
              >
                {nameWords.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={wordVariants}
                    className={`inline-block mr-[0.22em] ${i === 0 ? "hero-name-gradient" : "text-white/95"}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Typewriter Roles */}
            <motion.div variants={fadeUp(0.6)} className="mb-6 h-9 sm:h-10">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold hero-role-row">
                <RoleTypewriter />
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp(0.75)} className="mb-6">
              <div className="hero-divider mx-auto lg:mx-0" />
            </motion.div>

            {/* Professional Summary */}
            <motion.p
              variants={fadeUp(0.85)}
              className="text-sm sm:text-base leading-[1.85] mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Engineering student passionate about building{" "}
              <span className="hero-highlight">AI-powered applications</span>,{" "}
              <span className="hero-highlight">scalable web solutions</span>, and{" "}
              <span className="hero-highlight">data-driven systems</span>{" "}
              using modern technologies. Currently seeking opportunities to create real-world impact.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={fadeUp(0.95)}
              className="flex items-center justify-center lg:justify-start gap-5 sm:gap-8 mb-9"
            >
              {[
                { value: "10+", label: "Projects" },
                { value: "3+", label: "Domains" },
                { value: "2025", label: "Grad Year" },
              ].map((s) => (
                <div key={s.label} className="hero-stat-item text-center">
                  <span className="hero-stat-value">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
              <div className="hero-stat-divider hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                  Available for Hire
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp(1.05)}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-9"
            >
              <button
                id="hero-cta-projects"
                onClick={() => scrollToSection("projects")}
                suppressHydrationWarning
                className="hero-btn-primary group w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <FiArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>

              <a
                href="https://drive.google.com/file/d/1kD4G2gdYF3-s4c0rWu4rE_yMViLGRxo-/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-resume"
                className="hero-btn-secondary w-full sm:w-auto"
              >
                <FiDownload size={15} className="mr-2 flex-shrink-0" />
                Download Resume
              </a>

              <button
                id="hero-cta-contact"
                onClick={() => scrollToSection("contact")}
                suppressHydrationWarning
                className="hero-btn-outline w-full sm:w-auto"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp(1.15)}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.label !== "Email" ? "_blank" : undefined}
                  rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  className="hero-social-link"
                >
                  {s.icon}
                </motion.a>
              ))}
              <span className="hero-social-divider" />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
                Let&apos;s connect
              </span>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Profile Visual ─── */}
          <motion.div
            className="flex-1 flex items-center justify-center lg:justify-end w-full max-w-[440px] lg:max-w-[500px] mx-auto lg:mx-0"
            variants={illustrationVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full aspect-square flex items-center justify-center">

              {/* Outer rotating ring */}
              <div className="hero-orbit-ring absolute w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]" />

              {/* Inner glow */}
              <div
                className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full animate-pulse-glow"
                style={{
                  background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Profile Image Card */}
              <motion.div
                className="hero-profile-card relative z-10 w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <div className="relative w-full h-full p-4">
                  <Image
                    src={imgSrc}
                    alt="Yashwanth Sri Sai — AI/ML Engineer"
                    fill
                    priority
                    sizes="(max-width: 640px) 240px, 280px"
                    className={imgSrc === "/profile.png" ? "object-cover rounded-2xl" : "object-contain"}
                    onError={() => setImgSrc("/hero-icon.png")}
                  />
                </div>
                {/* Card shimmer border */}
                <div className="hero-profile-card-border" />
              </motion.div>

              {/* Floating Tech Icons */}
              {techIcons.map((t, i) => (
                <div
                  key={t.label}
                  className={`absolute z-20 ${t.pos} -translate-x-1/2 -translate-y-1/2`}
                >
                  <motion.div
                    className="tech-icon-float"
                    animate={{ y: [i % 2 === 0 ? -10 : 10, i % 2 === 0 ? 10 : -10, i % 2 === 0 ? -10 : 10] }}
                    transition={{ duration: 4.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: t.delay }}
                  >
                    <div className="p-2.5 rounded-xl glass-card" style={{ color: t.color }}>
                      {t.icon}
                      <span className="sr-only">{t.label}</span>
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Floating Info Cards */}
              <div className="absolute top-[34%] left-[82%] -translate-x-1/2 -translate-y-1/2 z-30 hidden sm:block">
                <motion.div
                  className="hero-info-card flex items-center gap-3 p-3 pr-4"
                  animate={{ y: [-6, 6, -6], x: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 flex-shrink-0">
                    ⚡
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white/90 leading-tight">Full Stack</p>
                    <p className="text-[10px] text-white/50 leading-tight">Development</p>
                  </div>
                </motion.div>
              </div>

              <div className="absolute top-[34%] left-[18%] -translate-x-1/2 -translate-y-1/2 z-30 hidden sm:block">
                <motion.div
                  className="hero-info-card flex items-center gap-3 p-3 pr-4"
                  animate={{ y: [6, -6, 6], x: [2, -2, 2] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    🤖
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white/90 leading-tight">AI/ML</p>
                    <p className="text-[10px] text-white/50 leading-tight">Engineering</p>
                  </div>
                </motion.div>
              </div>

              <div className="absolute top-[12%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 hidden sm:block">
                <motion.div
                  className="hero-info-card flex items-center gap-3 p-3 pr-4"
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 flex-shrink-0">
                    📊
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white/90 leading-tight">Data</p>
                    <p className="text-[10px] text-white/50 leading-tight">Analytics</p>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => scrollToSection("about")}
        >
          <span
            className="text-[10px] font-medium tracking-[0.25em] uppercase group-hover:text-blue-400 transition-colors duration-300"
            style={{ color: "var(--color-text-muted)" }}
          >
            Scroll
          </span>
          <div className="hero-scroll-indicator">
            <motion.div
              className="hero-scroll-dot"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
