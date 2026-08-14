"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import TiltCard from "./TiltCard";

const TESTIMONIALS = [
  {
    quote:
      "Abbas turned our vision into something that genuinely felt alive. The motion work alone lifted our conversions.",
    name: "Sarah Lin",
    role: "Head of Product, Aurora",
    initials: "SL",
    rating: 5,
    glow: "rgba(56,140,255,0.35)",
  },
  {
    quote:
      "Rare mix of design taste and engineering depth. Everything was fast, polished, and shipped ahead of schedule.",
    name: "Marcus Reed",
    role: "Founder, Nebula",
    initials: "MR",
    rating: 5,
    glow: "rgba(56,189,248,0.35)",
  },
  {
    quote:
      "The site feels like an Apple keynote. Clients keep telling us how premium the experience is.",
    name: "Ava Torres",
    role: "Creative Director, Studio 9",
    initials: "AT",
    rating: 5,
    glow: "rgba(59,130,246,0.35)",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".tst-card", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".tst-grid", start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050505]/70 px-6 py-28"
    >
      <div className="pointer-events-none absolute -top-20 right-1/4 h-[26rem] w-[26rem] rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Kind Words
        </p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Trusted by teams who care about craft.
        </h2>

        <div className="tst-grid mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TiltCard key={t.name} glow={t.glow} max={6} className="tst-card p-8">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-base leading-relaxed text-zinc-200">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/20 to-white/5 text-sm font-semibold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.role}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
