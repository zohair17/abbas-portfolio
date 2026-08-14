"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Nike",
    kind: "E-commerce Experience",
    desc: "Product storytelling with scroll-driven motion and a conversion-first checkout flow.",
    stack: ["Next.js", "Framer Motion", "Tailwind"],
    video: "/asset/Nike/video.mp4",
    poster: "/asset/Nike/hero.png",
  },
  {
    title: "Highfy",
    kind: "Brand Storefront",
    desc: "Full retail front-end — catalogue, FAQ and checkout built as one cohesive system.",
    stack: ["React", "Redux Toolkit", "Node.js"],
    video: "/asset/highfy/video.mp4",
    poster: "/asset/highfy/best seller.png",
  },
  {
    title: "Shilajeet",
    kind: "Product Landing",
    desc: "Single-product launch page tuned for load speed and a clean, persuasive narrative.",
    stack: ["Next.js", "GSAP", "Tailwind"],
    video: "/asset/Shilajeet/shilajeet.mp4",
    poster: "/asset/Shilajeet/1.png",
  },
];

const N = PROJECTS.length;

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Which card is parked in the frame *and* has finished travelling. The screen
  // only powers up once a project has landed, so the LCD is dark for the whole
  // slide — which is what makes the arrival read as a device switching on.
  const [settled, setSettled] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const local = p * N;
    const i = Math.min(N - 1, Math.floor(local));
    const within = local - i;
    setSettled(within > 0.12 && within < 0.96 ? i : -1);
  });

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-[#050505]/70">
      {/* Tall scroll track; the frame inside stays put while it is consumed. */}
      <div style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
                  Selected Work
                </p>
                <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Projects
                </h2>
              </div>
              <span className="font-mono text-xs tracking-[0.3em] text-white/30">
                {String(Math.max(0, settled) + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
            </div>

            {/* Cards share one frame; only the active one is on screen. */}
            <div className="relative h-[clamp(380px,52vh,460px)]">
              {PROJECTS.map((p, i) => (
                <ProjectCard
                  key={p.title}
                  project={p}
                  index={i}
                  progress={scrollYProgress}
                  on={settled === i}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
              >
                View more projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, progress, on }) {
  const videoRef = useRef(null);

  // Enters from the right and stays. It never slides back out: the next card
  // simply arrives on top of it (see zIndex), so projects stack rather than
  // shunting the previous one off to the left.
  const x = useTransform(progress, [(index - 0.9) / N, index / N], ["112%", "0%"]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (on) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [on]);

  return (
    <motion.article
      style={{ x, zIndex: index }}
      className="absolute inset-0 grid grid-cols-1 gap-5 overflow-hidden rounded-3xl md:gap-8 border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl md:grid-cols-[1.15fr_1fr] md:p-8"
    >
      {/* ---- The LCD ---- */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-[opacity,filter] duration-500"
          style={{
            opacity: on ? 1 : 0,
            filter: on ? "none" : "brightness(0.2) saturate(0.3)",
          }}
        />

        {/* Dark panel + scanlines: what you see while the screen is off. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#04060a] transition-opacity duration-500"
          style={{ opacity: on ? 0 : 1 }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
          }}
        />
        {/* Power-on flash — a single bright sweep the moment it lights up. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white transition-all duration-500"
          style={{ opacity: on ? 0 : 0.55, transform: `scaleX(${on ? 1 : 0.35})` }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]" />
      </div>

      {/* ---- Details ---- */}
      <div className="flex flex-col justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-sky-400/70">
          {project.kind}
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
          {project.desc}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>

      </div>
    </motion.article>
  );
}
