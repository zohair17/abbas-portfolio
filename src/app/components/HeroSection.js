"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Line one is solid: a cold white-to-ice ramp clipped to the glyphs, lit from
// above. No metal, no texture — the letterforms carry the weight and the aurora
// behind them supplies all the colour.
const fillText = {
  color: "transparent",
  backgroundImage:
    "linear-gradient(180deg, #ffffff 0%, #f4f9ff 38%, #cfe1ff 72%, #8fbaff 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  filter:
    "drop-shadow(0 0 70px rgba(56,140,255,0.4)) drop-shadow(0 20px 50px rgba(3,8,24,0.65))",
};

// Line two is hollow — stroke only, transparent counters, so the aurora reads
// straight through the letters and plays against the solid line above. The
// stroke is sized in em so it stays proportional as the display type scales
// from phone to desktop.
const outlineText = {
  color: "transparent",
  WebkitTextStroke: "0.016em rgba(255,255,255,0.8)",
  filter: "drop-shadow(0 0 55px rgba(56,140,255,0.3))",
};

// Corner labels, mono + wide tracking, exactly the reference's four anchors.
const metaClass =
  "font-mono text-[10px] uppercase leading-relaxed tracking-[0.34em] text-white/35 sm:text-[11px]";

const NAV = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function HeroSection() {
  const stageRef = useRef(null);

  // Page scroll progress → the thin rail on the right edge.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Featherweight cursor parallax: the headline leans a few pixels against the
  // pointer. Written straight to style — no state, so no re-render per move.
  const handleMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX / width - 0.5) * 2;
    const y = (e.clientY / height - 0.5) * 2;
    el.style.transform = `translate3d(${x * -10}px, ${y * -7}px, 0)`;
  };

  const handleLeave = () => {
    const el = stageRef.current;
    if (el) el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex h-[100svh] min-h-[600px] w-full flex-col justify-between overflow-hidden bg-[#04050b]/70 px-6 py-6 sm:px-10 sm:py-8"
    >
      {/* Hairline along the very top edge. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Scroll rail on the right edge. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleY: progress }}
        className="pointer-events-none fixed right-0 top-0 z-40 h-full w-[2px] origin-top bg-gradient-to-b from-sky-300 via-blue-500 to-blue-700"
      />

      {/* ---------- Top meta row ---------- */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 grid grid-cols-2 items-start gap-4 md:grid-cols-3"
      >
        <div className={metaClass}>
          <p className="text-white/55">AR · 26</p>
          <p className="mt-1.5">©2026 — Portfolio</p>
        </div>

        <p className={`${metaClass} hidden text-center md:block`}>
          Senior Software Engineer
        </p>

        <div className={`${metaClass} text-right`}>
          <p className="flex justify-end gap-3 text-white/55">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="transition-colors hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </p>
          <p className="mt-1.5">React · Next.js · SPFx</p>
        </div>
      </motion.header>

      {/* ---------- Name ---------- */}
      <div
        ref={stageRef}
        className="relative z-10 flex flex-1 items-center justify-center transition-transform duration-500 ease-out will-change-transform"
      >
        {/* The two lines converge on load — ABBAS in from the left, RAZA from
            the right. Only x and opacity animate: both spans already carry a
            drop-shadow in their style, and animating `filter` here would
            overwrite it mid-flight. */}
        <h1 className="select-none text-center font-display uppercase leading-[0.86]">
          <motion.span
            initial={{ opacity: 0, x: "-22%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[clamp(4rem,18vw,15.5rem)] tracking-[0.005em]"
            style={fillText}
          >
            Abbas
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: "22%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[clamp(4rem,18vw,15.5rem)] tracking-[0.055em]"
            style={outlineText}
          >
            Raza
          </motion.span>
        </h1>
      </div>

      {/* ---------- Bottom meta row ---------- */}
      <motion.footer
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex items-end justify-between gap-4"
      >
        <div className={metaClass}>
          <p>4+ Years — Healthtech &amp; Enterprise</p>
          <p className="mt-1.5">Karachi — Pakistan</p>
        </div>

        <a
          href="#contact"
          className={`${metaClass} text-right transition-colors hover:text-white/70`}
        >
          Available for freelance
        </a>
      </motion.footer>
    </section>
  );
}
