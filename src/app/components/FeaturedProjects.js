"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, FileText } from "lucide-react";
import { Github } from "./BrandIcons";

const PROJECTS = [
  {
    title: "Aurora Commerce",
    desc: "A headless storefront with buttery product transitions and instant checkout.",
    stack: ["Next.js", "GSAP", "Stripe", "Tailwind"],
    tint: "from-blue-500/30 to-blue-500/20",
    screen: "linear-gradient(135deg,#4f46e5,#db2777)",
  },
  {
    title: "Nebula Analytics",
    desc: "Real-time data visualisation dashboard with 3D charts and live streams.",
    stack: ["React", "Three.js", "WebSocket", "D3"],
    tint: "from-sky-500/30 to-emerald-500/20",
    screen: "linear-gradient(135deg,#0ea5e9,#10b981)",
  },
  {
    title: "Studio Motion",
    desc: "An award-style agency site built around scroll-scrubbed cinematic footage.",
    stack: ["Next.js", "Framer Motion", "Lenis", "GLSL"],
    tint: "from-amber-500/30 to-rose-500/20",
    screen: "linear-gradient(135deg,#f59e0b,#f43f5e)",
  },
];

function Project({ project, index }) {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Parallax + scale on the mockup as the panel scrolls through view.
      gsap.fromTo(
        ".fp-mockup",
        { yPercent: 12, scale: 0.94 },
        {
          yPercent: -12,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.from(".fp-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const flip = index % 2 === 1;

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden py-24"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.tint}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      <div
        className={`relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 ${
          flip ? "lg:[direction:rtl]" : ""
        }`}
      >
        <div className="[direction:ltr]">
          <p className="fp-reveal mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
            {String(index + 1).padStart(2, "0")} — Featured
          </p>
          <h3 className="fp-reveal text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h3>
          <p className="fp-reveal mt-4 max-w-md text-base leading-relaxed text-zinc-300">
            {project.desc}
          </p>
          <div className="fp-reveal mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="fp-reveal mt-8 flex flex-wrap gap-3">
            <a className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} /> Live Website
            </a>
            <a className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
              <FileText className="h-4 w-4" strokeWidth={1.75} /> Case Study
            </a>
            <a className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
              <Github className="h-4 w-4" strokeWidth={1.75} /> GitHub
            </a>
          </div>
        </div>

        {/* Floating laptop mockup */}
        <div className="fp-mockup [direction:ltr]">
          <div className="mx-auto w-full max-w-lg">
            <div className="rounded-t-2xl border border-white/15 bg-zinc-900 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <div className="flex gap-1.5 px-2 py-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div
                className="aspect-video w-full rounded-lg"
                style={{ backgroundImage: project.screen }}
              />
            </div>
            {/* laptop base */}
            <div className="mx-auto h-3 w-[112%] -translate-x-[5%] rounded-b-xl bg-gradient-to-b from-zinc-700 to-zinc-900" />
            <div className="mx-auto h-1 w-[70%] rounded-b-lg bg-zinc-950" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="work" className="w-full bg-[#050505]">
      <div className="mx-auto max-w-6xl px-6 pt-28">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Selected Work
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Featured Projects
        </h2>
      </div>
      {PROJECTS.map((p, i) => (
        <Project key={p.title} project={p} index={i} />
      ))}
    </section>
  );
}
