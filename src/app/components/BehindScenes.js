"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lightbulb,
  PenTool,
  Code2,
  Bug,
  Rocket,
  Gauge,
  Users,
} from "lucide-react";

const STEPS = [
  { icon: Lightbulb, title: "Brainstorming", body: "Whiteboards, references and rough concepts — chasing the strongest idea." },
  { icon: PenTool, title: "Figma Design", body: "Pixel-perfect layouts, design tokens and interactive prototypes." },
  { icon: Code2, title: "Development", body: "Clean, componentised code built in VS Code with motion baked in." },
  { icon: Bug, title: "Testing", body: "Cross-device QA, edge cases and accessibility passes." },
  { icon: Gauge, title: "Optimization", body: "Lighthouse tuning, lazy loading and 60fps polishing." },
  { icon: Rocket, title: "Deployment", body: "Zero-downtime shipping with previews and CI/CD." },
  { icon: Users, title: "Collaboration", body: "Tight feedback loops with clients and teammates throughout." },
];

export default function BehindScenes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Each panel starts turned away from the camera and swings square as it
        // scrolls into view. Odd rows hinge from the opposite side so the column
        // reads as a folding ribbon rather than a stack of identical flips.
        gsap.utils.toArray(".bts-item").forEach((el, i) => {
          gsap.from(el, {
            rotateY: i % 2 ? -42 : 42,
            rotateX: 14,
            z: -320,
            y: 70,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: 1,
            },
          });
        });

        gsap.to(".bts-progress", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".bts-timeline",
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#060606]/70 px-5 py-20 sm:px-6 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Behind the Scenes
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          How the work actually gets made.
        </h2>

        {/* One shared camera for the whole column, so every panel folds into the
            same scene instead of each having its own private perspective. */}
        <div className="bts-timeline relative mt-12 [perspective-origin:50%_45%] [perspective:1200px] sm:mt-16">
          {/* Rail + scrubbed progress fill */}
          <div className="absolute left-[18px] top-0 hidden h-full w-px bg-white/10 sm:block">
            <div className="bts-progress h-full w-full origin-top scale-y-0 bg-gradient-to-b from-sky-400 to-blue-700" />
          </div>

          <div className="flex flex-col gap-5 sm:gap-7">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="bts-item relative [transform-style:preserve-3d] sm:pl-16"
              >
                {/* Node on the rail */}
                <span className="absolute left-[11px] top-8 hidden h-4 w-4 rounded-full border-2 border-[#060606] bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.8)] sm:block" />

                {/* Slab behind the face gives the panel real thickness. */}
                <div
                  className="absolute inset-x-3 inset-y-2 rounded-2xl border border-white/[0.06] bg-[#080b12] sm:left-20"
                  style={{ transform: "translateZ(-20px)" }}
                />

                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-xl sm:p-7 [transform-style:preserve-3d]">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06]"
                      style={{
                        transform: "translateZ(40px)",
                        boxShadow: "0 0 26px rgba(56,140,255,0.35)",
                      }}
                    >
                      <Icon className="h-5 w-5 text-sky-300" strokeWidth={1.5} />
                    </div>
                    <div style={{ transform: "translateZ(24px)" }}>
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-lg font-semibold text-white sm:text-xl">
                          {title}
                        </h3>
                        <span className="font-mono text-[10px] tracking-[0.3em] text-white/25">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
