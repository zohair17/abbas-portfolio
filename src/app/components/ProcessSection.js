"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const STAGES = [
  { n: "01", icon: Search, title: "Discover", body: "Research, goals and audience. I map the problem before touching a pixel.", glow: "rgba(56,189,248,0.35)" },
  { n: "02", icon: PenTool, title: "Design", body: "Wireframes to high-fidelity systems — the look, feel and motion language.", glow: "rgba(168,85,247,0.35)" },
  { n: "03", icon: Code2, title: "Develop", body: "Production-grade, animated and accessible code built to scale.", glow: "rgba(132,204,22,0.35)" },
  { n: "04", icon: Rocket, title: "Launch", body: "Ship, measure and iterate. Momentum that keeps compounding.", glow: "rgba(244,114,182,0.35)" },
];

// A single stage card: reacts to the cursor with a 3D tilt + a colour-matched
// spotlight that follows the pointer, and its oversized ghost number drifts on
// scroll (parallax) via the shared `yNum` motion value from the section.
function ProcessCard({ stage, index, yNum }) {
  const { n, icon: Icon, title, body, glow } = stage;
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ "--mx": "50%", "--my": "50%", "--glow": glow }}
        className="group relative min-h-[16rem] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-200 ease-out will-change-transform"
      >
        {/* cursor-following spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(500px circle at var(--mx) var(--my), var(--glow), transparent 55%)",
          }}
        />
        {/* top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* parallax ghost number */}
        <motion.span
          style={{ y: yNum }}
          className="pointer-events-none absolute -right-1 -top-8 select-none text-[8.5rem] font-bold leading-none text-white/[0.045]"
        >
          {n}
        </motion.span>

        <div className="relative z-10">
          <div
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            style={{ boxShadow: `0 0 30px ${glow}` }}
          >
            <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-zinc-500">{n}</span>
            <h3 className="text-3xl font-semibold tracking-tight text-white">
              {title}
            </h3>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
            {body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Ghost numbers drift opposite the scroll direction for a parallax feel.
  const yNum = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050505] px-6 py-28"
    >
      {/* ambient colour shades — sky / violet / lime / pink stage palette */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-sky-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/3 -top-24 h-[30rem] w-[30rem] rounded-full bg-violet-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[34rem] w-[34rem] rounded-full bg-pink-500/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
            The Process
          </p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
            From idea to launch, in four moves.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            A repeatable path that keeps every project focused, fast and
            genuinely enjoyable to build.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {STAGES.map((stage, i) => (
            <ProcessCard key={stage.title} stage={stage} index={i} yNum={yNum} />
          ))}
        </div>
      </div>
    </section>
  );
}
