"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

// LED dot-matrix headline. We clip a blue gradient to the text glyphs, then
// punch a repeating dot grid through it with a mask so each letter reads as an
// array of lit dots — the "CREATIVE DIRECTOR" display look from the reference.
// The mask size is in `em` so the dots scale with the (responsive) font size.
const ledStyle = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  color: "transparent",
  backgroundImage:
    "linear-gradient(180deg, #eaf2ff 0%, #9dc3ff 55%, #3b82f6 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitMaskImage: "radial-gradient(circle at center, #000 44%, transparent 48%)",
  maskImage: "radial-gradient(circle at center, #000 44%, transparent 48%)",
  WebkitMaskSize: "0.135em 0.155em",
  maskSize: "0.135em 0.155em",
  filter: "drop-shadow(0 0 22px rgba(59,130,246,0.5))",
};

const nav = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

export default function HeroSection() {
  const spotlightRef = useRef(null);

  // Cursor-tracked purple/pink spotlight. We write the position straight to the
  // element's style on mousemove (no React state → no re-render per frame); the
  // reveal on enter/leave is handled by group-hover opacity below.
  const handleMove = (e) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(217,70,239,0.22), rgba(147,51,234,0.12) 32%, transparent 62%)`;
  };

  return (
    <section
      onMouseMove={handleMove}
      className="group relative h-screen min-h-[640px] w-full overflow-hidden bg-[#05070d]"
    >
      {/* Purple/pink spotlight that follows the cursor, revealed on hover. */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[15] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* --- Ambient blue stage light behind the subject --- */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-[46%] rounded-full bg-[#1f6bff]/40 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-[40%] rounded-full bg-[#38bdf8]/25 blur-[110px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-indigo-700/15 blur-[140px]" />

      {/* Thin orbital arc, offset off the left edge like the reference. */}
      <div className="pointer-events-none absolute left-[-22vh] top-1/2 h-[85vh] w-[85vh] -translate-y-1/2 rounded-full border border-white/[0.06]" />

      {/* --- LED display headline --- */}
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={ledStyle}
        className="absolute left-1/2 top-[9%] z-20 w-full -translate-x-1/2 select-none text-center font-semibold uppercase leading-none tracking-[0.14em]"
      >
        <span className="text-[clamp(2.1rem,8.5vw,7rem)]">Software Engineer</span>
      </motion.h1>

      {/* --- Profile portrait --- */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute inset-x-0 bottom-0 z-10 flex justify-center"
      >
        <div className="relative h-[88vh] max-h-[860px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/asset/profile.png"
            alt="Abbas — Software Engineer"
            className="h-full w-auto object-contain object-bottom"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 62% 70% at 50% 42%, #000 55%, transparent 82%)",
              maskImage:
                "radial-gradient(ellipse 62% 70% at 50% 42%, #000 55%, transparent 82%)",
            }}
          />
          {/* Blue rim-light wash to tie the neutral photo into the stage. */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 55% 60% at 50% 40%, rgba(56,140,255,0.28), transparent 70%)",
            }}
          />
        </div>
      </motion.div>

      {/* Bottom fade so the portrait dissolves into the section floor. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[#05070d] via-[#05070d]/70 to-transparent" />

      {/* --- Left identity block: name, description, CTAs --- */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-1/2 z-20 max-w-2xl -translate-y-1/2 px-8 sm:px-16 lg:px-24"
      >
        <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
          Abbas
        </h2>
        <p className="mt-4 text-xl font-medium tracking-wide text-sky-300/90 sm:text-2xl md:text-3xl">
          Full Stack Developer
        </p>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
          Senior Software Engineer specializing in end-to-end digital
          experiences and high-performance web platforms.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#work"
            className="whitespace-nowrap rounded-full bg-white px-7 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="whitespace-nowrap rounded-full border border-white/25 px-7 py-3 text-center text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/5"
          >
            Let&apos;s Talk
          </a>
        </div>
      </motion.div>

      {/* --- Floating nav pill --- */}
      <motion.nav
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-6 z-30 mx-auto flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 pl-4 backdrop-blur-md sm:bottom-8"
      >
        <span className="mr-2 text-sm font-semibold tracking-[0.2em] text-white">
          AB
        </span>
        {nav.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="rounded-full px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white sm:px-4"
          >
            {n.label}
          </a>
        ))}
        <a
          href="#contact"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200 sm:px-5"
        >
          Contact
        </a>
      </motion.nav>
    </section>
  );
}
