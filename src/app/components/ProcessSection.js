"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

// Left panel media, served from /public so it can't fail on a third-party host.
const REEL = "/asset/vid.mp4";
const REEL_POSTER = "/asset/Nike/hero.png";

const STAGES = [
  {
    icon: Search,
    title: "Discover",
    body: "Research, goals and audience. I map the problem properly before touching a single pixel.",
  },
  {
    icon: PenTool,
    title: "Design",
    body: "Wireframes through to a high-fidelity system — the look, the feel and the motion language.",
  },
  {
    icon: Code2,
    title: "Develop",
    body: "Production-grade, animated and accessible code, built as components that scale.",
  },
  {
    icon: Rocket,
    title: "Launch",
    body: "Ship, measure, iterate. Previews, CI/CD and the momentum that keeps compounding.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function ProcessSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505]/70 px-5 py-20 sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ---- Centred intro ---- */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
            The Process
          </p>
          <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
            From idea to launch, in four moves.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            A repeatable path that keeps every project focused, fast and
            genuinely enjoyable to build.
          </p>
        </motion.div>

        {/* ---- Bento: tall media panel beside a 2×2 grid ---- */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)]">
          {/* Media panel. On lg it matches the full height of the grid beside it. */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[340px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[420px]"
          >
            <video
              src={REEL}
              poster={REEL_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Scrim: the copy sits on top of moving footage, so it needs a
                floor of its own to stay legible at every frame. */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85" />

            <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <h3 className="max-w-xs text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  From idea to launch, in four moves.
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
                  A repeatable path that keeps every project focused, fast and
                  genuinely enjoyable to build.
                </p>
              </div>

              <a
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Get started
              </a>
            </div>
          </motion.div>

          {/* Four stages */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STAGES.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{
                  duration: 0.7,
                  delay: 0.06 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 sm:p-7"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-4 w-4 text-white" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
