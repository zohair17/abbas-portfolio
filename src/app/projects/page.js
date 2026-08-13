"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Play, X } from "lucide-react";
import { PROJECTS, heroSrc, videoSrc } from "../data/projects";

const WORDS = ["Web Developer", "Next.js", "React.js", "Flutter", "TypeScript", "GSAP"];

export default function AllProjectsPage() {
  return (
    <main className="relative z-10 min-h-screen w-full">
      <CurvedHero />
      <LedShowcase />
    </main>
  );
}

/* ------------------------------------------------------------------ hero -- */

// The strip is a flat marquee, not a carousel: one track holding the project
// list twice, translated by exactly half its width on a linear loop. Because
// the second copy is identical, the wrap point can't be seen, and there is no
// index/state to keep in sync — the animation is pure CSS.
const STRIP = [...PROJECTS, ...PROJECTS];

function CurvedHero() {
  const [word, setWord] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/12 blur-[150px]" />

      <div className="fixed left-5 top-5 z-50 sm:left-8 sm:top-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* ---- Sliding strip with the headline sitting over it ---- */}
      <div className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <div className="pmarquee flex w-max gap-6 will-change-transform">
            {STRIP.map((p, i) => (
              <div
                key={`${p.slug}-${i}`}
                className="h-[clamp(180px,26vh,250px)] w-[clamp(280px,32vw,430px)] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroSrc(p)}
                  alt={p.title}
                  className="h-full w-full object-cover object-top opacity-65"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Headline layer. It sits above the strip and is dimmed behind by a
            soft scrim so the type stays readable over any screenshot. */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#04050b] via-[#04050b]/45 to-[#04050b]" />

          <p className="relative font-mono text-[11px] uppercase tracking-[0.42em] text-white/45">
            Selected Work
          </p>

          <div className="relative mt-3 h-[clamp(2.8rem,8vw,6.5rem)] overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[word]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="block whitespace-nowrap font-display text-[clamp(2.4rem,7.5vw,6rem)] uppercase leading-[1.05] tracking-tight text-white"
              >
                {WORDS[word]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative mt-3 flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40 sm:text-[11px]">
            <span>Frontend &amp; Mobile</span>
            <span className="h-px w-10 bg-white/25" />
            <span>{PROJECTS.length} Projects</span>
          </div>
        </div>
      </div>

      {/* ---- Scroll cue ---- */}
      <div className="relative mt-16 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          Explore
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40"
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- showcase -- */

function LedShowcase() {
  const [open, setOpen] = useState(null);
  // Below md the LED wall becomes a phone: a 16:9 panel at that width would
  // leave the cards unreadably small, and a handset is the honest frame for
  // how these sites are actually browsed.
  const [phone, setPhone] = useState(false);
  const videoRef = useRef(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    const v = videoRef.current;
    if (v && open) v.play().catch(() => {});
  }, [open]);

  const cards = PROJECTS.map((p) => (
    <button
      key={p.slug}
      type="button"
      onClick={() => setOpen(p)}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-left transition-colors hover:border-sky-400/50 ${
        phone ? "h-32 w-full" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroSrc(p)}
        alt={p.title}
        className="h-full w-full object-cover object-top opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
        <p className="text-sm font-semibold text-white">{p.title}</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
          {p.kind}
        </p>
      </div>
      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
        <Play className="h-3 w-3 text-white" />
      </span>
    </button>
  ));

  const player = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 z-10 overflow-hidden rounded-[inherit] bg-black"
        >
          <video
            ref={videoRef}
            src={videoSrc(open)}
            poster={heroSrc(open)}
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400/80">
              {open.kind}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              {open.title}
            </h3>
            <p className="mt-1 hidden max-w-xl text-sm text-zinc-400 sm:block">
              {open.desc}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close project"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-white hover:text-black sm:right-4 sm:top-4"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="relative w-full px-4 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto mb-6 max-w-[1600px] sm:mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-white/35">
          The Wall
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-5xl">
          Pick a project.
        </h2>
      </div>

      {phone ? (
        /* ---- Handset frame ---- */
        <div className="mx-auto w-full max-w-[340px]">
          <div className="relative aspect-[9/18] w-full rounded-[38px] border-[6px] border-[#15171d] bg-[#05070d] p-3 shadow-[0_40px_90px_-40px_rgba(56,140,255,0.6)]">
            <span className="absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/20" />
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(56,140,255,0.14),transparent_70%)]" />
            <div className="relative h-full w-full overflow-y-auto rounded-[28px] pt-5">
              <div className="flex flex-col gap-3 pb-3">{cards}</div>
            </div>
            {player}
          </div>
        </div>
      ) : (
        /* ---- LED wall ---- */
        <div className="relative mx-auto aspect-[16/9] w-full max-w-[1600px] overflow-hidden rounded-[28px] border border-white/12 bg-[#05070d] p-4 shadow-[0_60px_140px_-60px_rgba(56,140,255,0.5)] lg:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,140,255,0.14),transparent_70%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_120px_rgba(0,0,0,0.75)]" />

          <div className="relative h-full w-full overflow-y-auto">
            <div className="grid h-full grid-cols-3 gap-3 lg:grid-cols-5 lg:gap-4">
              {cards}
            </div>
          </div>
          {player}
        </div>
      )}
    </section>
  );
}
