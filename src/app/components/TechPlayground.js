"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { Linkedin, Instagram, Behance } from "./BrandIcons";

const LINKS = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:abbas@example.com" },
  { icon: Behance, label: "Behance", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: FileText, label: "Resume", href: "#" },
];

export default function TechPlayground() {
  const canvasRef = useRef(null);

  // Lightweight drifting particle field for the closing "lasting impression".
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.min(90, Math.floor(canvas.width / 16));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.5 + 0.1,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6"
    >
      {/* cinematic background video — plays through once and then holds on
          its final frame (no loop). */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        src="/asset/portfolio.mp4"
        autoPlay
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* ambient light */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[140px]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-zinc-400"
        >
          Tech Playground
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Let&apos;s build something unforgettable.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {LINKS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.75} />
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
