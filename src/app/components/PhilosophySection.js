"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Gauge, Heart } from "lucide-react";

const HEADLINE = ["Design", "catches", "attention.", "Development", "keeps", "it."];

const CARDS = [
  {
    index: "01",
    icon: Sparkles,
    title: "Creativity",
    body: "Ideas with a point of view — bold concepts translated into interfaces people remember.",
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.42)",
  },
  {
    index: "02",
    icon: Gauge,
    title: "Performance",
    body: "Silky 60fps motion, lean bundles, and instant loads. Beauty that never gets in the way.",
    accent: "#3b82f6",
    glow: "rgba(59,130,246,0.45)",
  },
  {
    index: "03",
    icon: Heart,
    title: "User Experience",
    body: "Every tap, scroll, and transition considered — intuitive journeys that feel effortless.",
    accent: "#93c5fd",
    glow: "rgba(147,197,253,0.4)",
  },
];

// A card that actually lives in 3D rather than faking depth with a shadow.
//
// The tilt is written to the inner panel, never to the outer `.ph-card` — GSAP
// owns that element's transform for the scroll choreography, and two writers on
// one transform means whoever runs last each frame wins. Inside the panel every
// layer sits at its own translateZ, so tilting parallaxes the icon against the
// copy the way real stacked planes would.
function Card3D({ index, icon: Icon, title, body, accent, glow }) {
  const innerRef = useRef(null);

  const onMove = (e) => {
    const el = innerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    // The translateZ lifts the card toward the viewer for as long as it is hovered.
    el.style.transform = `rotateY(${px * 13}deg) rotateX(${-py * 13}deg) translateZ(26px)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = innerRef.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <div className="ph-card [transform-style:preserve-3d]">
      <div
        ref={innerRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ "--mx": "50%", "--my": "50%", "--glow": glow, "--accent": accent }}
        className="group relative h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]"
      >
        {/* Decorative wash, clipped to the radius — and deliberately flat, since
            a clipping container collapses 3D. No depth layer may live in here. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--mx) var(--my), var(--glow), transparent 62%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <div
            className="absolute -bottom-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glow }}
          />
        </div>

        {/* Depth stack, furthest back to closest. */}
        <div
          className="relative mb-7 flex items-start justify-between"
          style={{ transform: "translateZ(45px)" }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06]"
            style={{
              boxShadow: `0 0 34px ${glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
            }}
          >
            <Icon className="h-6 w-6" style={{ color: accent }} strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/25">
            {index}
          </span>
        </div>

        <h3
          className="relative text-2xl font-semibold text-white"
          style={{ transform: "translateZ(32px)" }}
        >
          {title}
        </h3>

        <p
          className="relative mt-3 text-sm leading-relaxed text-zinc-400"
          style={{ transform: "translateZ(18px)" }}
        >
          {body}
        </p>

        {/* Accent rule that draws itself in on hover. */}
        <div
          className="relative mt-7 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
      </div>
    </div>
  );
}

export default function PhilosophySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // matchMedia keeps every animation opt-in: under reduced motion nothing
      // registers at all, so the markup renders in its resting (fully visible)
      // state rather than being stranded at a `from` value.
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ph-word", {
          yPercent: 120,
          opacity: 0,
          rotateX: -80,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".ph-headline", start: "top 82%" },
        });

        // The deal: cards start lying deep in the scene, tipped away from the
        // camera, then rise and square up as you scroll. Scrubbed, so you drive
        // the choreography instead of watching it fire once and finish.
        gsap.from(".ph-card", {
          z: -750,
          y: 130,
          rotateX: 52,
          opacity: 0,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ph-cards",
            start: "top 90%",
            end: "top 42%",
            scrub: 1,
          },
        });

        // Slow camera pan across the whole section. The deck keeps turning
        // under the scroll, which is what sells the row as one real 3D plane.
        gsap.fromTo(
          ".ph-deck",
          { rotateX: 9 },
          {
            rotateX: -7,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505]/70 px-6 py-28"
    >
      {/* soft ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Perspective floor: a flat grid laid back in Z and faded toward the
          horizon. Cheap, but it gives the cards a room to stand in. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48vh] [perspective:600px]">
        <div
          className="absolute inset-0 origin-bottom [transform:rotateX(74deg)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(125,180,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(125,180,255,0.10) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 72%)",
            maskImage: "linear-gradient(to top, #000 0%, transparent 72%)",
          }}
        />
      </div>

      <p className="relative mb-6 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
        My Philosophy
      </p>

      <h2 className="ph-headline relative mx-auto max-w-5xl text-center text-4xl font-semibold leading-[1.05] tracking-tight text-white [perspective:800px] sm:text-6xl md:text-7xl">
        {HEADLINE.map((w, i) => (
          <span key={i} className="mx-[0.15em] inline-block overflow-hidden align-bottom">
            <span className="ph-word inline-block">{w}</span>
          </span>
        ))}
      </h2>

      {/* The stage supplies the single shared camera; the deck is the plane the
          cards are pinned to, so deck and cards can rotate independently. */}
      <div className="ph-cards relative mt-20 w-full max-w-6xl [perspective:1400px] [perspective-origin:50%_40%]">
        <div className="ph-deck grid grid-cols-1 gap-6 [transform-style:preserve-3d] md:grid-cols-3">
          {CARDS.map((card) => (
            <Card3D key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
