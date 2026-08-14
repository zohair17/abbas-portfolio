"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

// Site-wide blue aurora.
//
// One fixed, pointer-events-none layer painted BEHIND every page. The sections
// above it are translucent, so the aurora reads through them as a real
// background rather than a wash laid over the content.
//
// Two kinds of motion, deliberately kept on separate elements: the wrappers
// carry the scroll parallax (framer sets an inline transform) while the inner
// shapes carry the ambient drift (a CSS keyframe on transform). A CSS
// animation beats an inline style in the cascade, so if both lived on one
// element the parallax would simply be ignored.
export default function AuroraBackground() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Lenis already smooths the wheel; this spring just lets the light lag a
  // beat behind the page so it floats rather than sticks.
  const smooth = useSpring(scrollY, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.5,
  });

  const yRibbon = useTransform(smooth, (v) => v * -0.2);
  const yCore = useTransform(smooth, (v) => v * 0.13);
  const yTop = useTransform(smooth, (v) => v * -0.09);
  const yFloor = useTransform(smooth, (v) => v * 0.22);

  // Full strength across the hero, then eases back just enough that content
  // stays readable — it never drops out, so the aurora carries every page.
  const fade = useTransform(scrollY, [0, 1100], [1, 0.78]);

  const par = (value) => (reduce ? 0 : value);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: fade }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* The main diagonal ribbon: deep royal blue rising into bright azure. */}
      <motion.div
        style={{ y: par(yRibbon) }}
        className="absolute -left-[30%] top-[12%] h-[64vh] w-[170%]"
      >
        <div
          className="aurora-float-a h-full w-full"
          style={{
            background:
              "linear-gradient(96deg, rgba(29,78,216,0) 0%, rgba(29,78,216,0.5) 16%, rgba(37,99,235,0.62) 38%, rgba(56,140,255,0.58) 58%, rgba(56,189,248,0.4) 78%, rgba(125,211,252,0.12) 92%, transparent 100%)",
            filter: "blur(90px)",
          }}
        />
      </motion.div>

      {/* Bright core — the heart the headline sits inside. */}
      <motion.div
        style={{ y: par(yCore) }}
        className="absolute inset-0 m-auto h-[72vh] w-[70vw]"
      >
        <div
          className="aurora-float-b h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(37,99,235,0.55), rgba(30,64,175,0.24) 55%, transparent 78%)",
            filter: "blur(110px)",
          }}
        />
      </motion.div>

      {/* Cyan-blue pool bleeding off the top-right edge. */}
      <motion.div
        style={{ y: par(yTop) }}
        className="absolute -right-[8%] -top-[14%] h-[60vh] w-[52vw]"
      >
        <div
          className="aurora-float-c h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,170,255,0.46), rgba(56,189,248,0.18) 58%, transparent 80%)",
            filter: "blur(115px)",
          }}
        />
      </motion.div>

      {/* Deep blue pool anchoring the bottom-left. */}
      <motion.div
        style={{ y: par(yFloor) }}
        className="absolute -bottom-[20%] -left-[12%] h-[62vh] w-[58vw]"
      >
        <div
          className="aurora-float-b h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(29,78,216,0.52), rgba(30,58,138,0.2) 55%, transparent 80%)",
            filter: "blur(120px)",
          }}
        />
      </motion.div>

      {/* Cooler lift on the bottom-right so the sweep reads as one band. */}
      <motion.div
        style={{ y: par(yTop) }}
        className="absolute -bottom-[24%] right-[2%] h-[50vh] w-[46vw]"
      >
        <div
          className="aurora-float-c h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(14,165,233,0.32), transparent 76%)",
            filter: "blur(120px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
