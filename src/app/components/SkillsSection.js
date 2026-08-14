"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiNextdotjs,
  SiReact,
  SiGreensock,
  SiThreedotjs,
  SiFramer,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const SKILLS = [
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", glow: "rgba(255,255,255,0.35)" },
  { name: "React", icon: SiReact, color: "#61DAFB", glow: "rgba(56,189,248,0.4)" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02", glow: "rgba(56,189,248,0.4)" },
  { name: "Three.js", icon: SiThreedotjs, color: "#ffffff", glow: "rgba(148,163,184,0.4)" },
  { name: "Framer Motion", icon: SiFramer, color: "#E64FFF", glow: "rgba(56,189,248,0.4)" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", glow: "rgba(45,212,191,0.4)" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", glow: "rgba(59,130,246,0.45)" },
];

// Seven cards spread over a full turn puts 51° between neighbours, and at that
// angle the flanking cards are foreshortened so hard that only the centre one
// reads. Running the list twice halves the step to ~26°, which keeps three
// cards near face-on and several more receding behind them. The duplicate pass
// is invisible: a card and its copy sit 180° apart, so they are never both on
// the near side of the cylinder at the same time.
const REPEAT = 2;
const SLOTS = SKILLS.length * REPEAT;
const STEP = 360 / SLOTS;

const CARD_H = 180;
const SLAB = 22; // card thickness, in px of Z depth
const GAP = 16; // px of breathing room between neighbours on the cylinder
const IDLE_DPS = 12; // idle spin, degrees per second
const PERSPECTIVE = 1600;

// The radius follows from how much arc each card needs, rather than being a
// fraction of the container — that is what keeps the spacing constant instead
// of ballooning on a wide screen.
const radiusFor = (cardW) => ((cardW + GAP) * SLOTS) / (2 * Math.PI);

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);

  const [cardW, setCardW] = useState(240);

  // Reduced motion gets a plain grid instead of a static ring — a frozen
  // cylinder would leave the back half of the toolkit permanently invisible.
  const [flat, setFlat] = useState(false);

  // Places the ring at `angle`, then shades each card by where it sits on the
  // cylinder: `facing` fades it out as it turns away, `--shade` swings the
  // specular highlight from one edge to the other so the card catches light
  // like a solid object rather than a flat sticker.
  const applyAngle = useCallback((angle) => {
    const ring = ringRef.current;
    if (ring) ring.style.transform = `rotateY(${angle}deg)`;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const world = ((i * STEP + angle) * Math.PI) / 180;
      el.style.opacity = gsap.utils.clamp(0, 1, (Math.cos(world) - 0.05) / 0.7);
      // Opacity is clamped to 0–1 by CSS, so the two highlight layers can key
      // off the raw signed value and each simply switches itself off.
      el.style.setProperty("--shade", Math.sin(world).toFixed(3));
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setFlat(reduced.matches);
    sync();
    reduced.addEventListener("change", sync);
    return () => reduced.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (flat) return;

    // Cards grow with the stage so the arc spans the full width instead of
    // huddling in the middle of a wide screen.
    const measure = () => {
      const w = stageRef.current?.offsetWidth ?? 1200;
      setCardW(Math.round(gsap.utils.clamp(158, 280, w * 0.19)));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [flat]);

  useEffect(() => {
    if (flat) return;

    gsap.registerPlugin(ScrollTrigger);

    // Two independent contributions to one angle: a constant idle drift so the
    // carousel is always sliding, plus a scrubbed offset so scrolling pushes it
    // along (and pulls it back when you scroll up).
    let idle = 0;
    let fromScroll = 0;
    let visible = true;

    const tick = () => {
      if (!visible) return;
      idle += (gsap.ticker.deltaRatio(60) * IDLE_DPS) / 60;
      applyAngle(idle + fromScroll);
    };

    const ctx = gsap.context(() => {
      // A proxy object drives the scroll offset: the ring's transform is a bare
      // rotateY string we write ourselves, because GSAP's own transform order
      // resolves to `translateZ() rotateY()` — which spins each card in place
      // instead of carrying it around the cylinder.
      const spin = { angle: 0 };

      gsap.to(spin, {
        angle: 360,
        ease: "none",
        onUpdate: () => {
          fromScroll = spin.angle;
          applyAngle(idle + fromScroll);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
          // No point spinning a carousel nobody is looking at.
          onToggle: (self) => {
            visible = self.isActive;
          },
        },
      });

      gsap.from(".tk-stage", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tk-stage", start: "top 88%" },
      });
    }, sectionRef);

    applyAngle(0);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, [flat, cardW, applyAngle]);

  const radius = radiusFor(cardW);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#070707]/70 px-6 py-28"
    >
      <div className="pointer-events-none absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Toolkit
        </p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          The tech I build with.
        </h2>
      </div>

      {flat ? (
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </div>
      ) : (
        // Full-bleed on purpose: the arc is wider than the text column, and
        // letting it run to the edges is what fills the dead space either side.
        <div
          ref={stageRef}
          className="tk-stage relative mt-20 w-full [perspective-origin:50%_50%]"
          style={{
            // The nearest card is magnified by the perspective divide, so the
            // stage has to be sized against its *projected* height — using the
            // raw CARD_H is what was clipping the front card's bottom edge.
            height: Math.round((CARD_H * PERSPECTIVE) / (PERSPECTIVE - radius)) + 90,
            perspective: `${PERSPECTIVE}px`,
            // Cards fade out before the edge rather than being cut off by it.
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 13%, #000 87%, transparent 100%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <div ref={ringRef} className="absolute inset-0 [transform-style:preserve-3d]">
            {Array.from({ length: SLOTS }, (_, i) => {
              const skill = SKILLS[i % SKILLS.length];
              return (
                <div
                  key={`${skill.name}-${i}`}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                  style={{
                    width: cardW,
                    height: CARD_H,
                    // Offset with margins, never transforms — the transform
                    // slot belongs to the cylinder maths alone.
                    marginLeft: -cardW / 2,
                    marginTop: -CARD_H / 2,
                    transform: `rotateY(${i * STEP}deg) translateZ(${radius}px)`,
                  }}
                >
                  {/* Back slab. Sits behind the face in Z and slightly inset, so
                      the card has a visible body and edge instead of being a
                      single plane. It lives out here because the face itself
                      uses backdrop-blur, and a filtered element always
                      flattens its own 3D children. */}
                  <div
                    className="absolute inset-x-2 inset-y-2 rounded-2xl border border-white/[0.06] bg-[#080b12]"
                    style={{ transform: `translateZ(-${SLAB}px)` }}
                  />
                  <SkillCard {...skill} lit />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function SkillCard({ name, icon: Icon, color, glow, lit = false }) {
  return (
    <div
      className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-white/25"
      style={{ boxShadow: "0 18px 50px -22px rgba(0,0,0,0.9)" }}
    >
      {lit && (
        <>
          {/* Paired rim lights. `--shade` is signed, and CSS clamps opacity to
              0–1, so whichever side is turned away simply falls to zero. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: "calc(var(--shade, 0) * 0.75)",
              background:
                "linear-gradient(90deg, rgba(190,225,255,0.22), transparent 55%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: "calc(var(--shade, 0) * -0.75)",
              background:
                "linear-gradient(270deg, rgba(190,225,255,0.22), transparent 55%)",
            }}
          />
        </>
      )}

      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110"
        style={{ boxShadow: `0 0 24px ${glow}` }}
      >
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
      <p className="relative text-xl font-semibold tracking-tight text-white">{name}</p>
    </div>
  );
}
