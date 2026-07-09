"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import TiltCard from "./TiltCard";

const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Redux Toolkit",
  "Framer Motion",
  "SPFx / SharePoint",
  "MongoDB",
  "MySQL",
];

const EXPERIENCE = [
  {
    role: "Senior Software Engineer",
    company: "Al Rafay Consulting, Karachi",
    period: "Present",
    body: "Built a high-impact company portal in React and shipped numerous SharePoint (SPFx) web parts, while mentoring junior developers through complex problems.",
    glow: "rgba(56,189,248,0.35)",
  },
  {
    role: "React Developer — Mid-Level",
    company: "Mentor Health Pvt. Ltd, Karachi",
    period: "1.4 years",
    body: "Delivered user-friendly portals and a secure telemedicine platform praised by doctors, patients and executives for boosting productivity and adoption.",
    glow: "rgba(168,85,247,0.35)",
  },
  {
    role: "React Developer — Junior-Level",
    company: "Mutex Systems Pvt Ltd, Karachi",
    period: "1.5 years",
    body: "Engineered front-end architecture and reusable React components, debugging and optimizing applications for performance and scalability.",
    glow: "rgba(244,114,182,0.35)",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#070707] px-6 py-28"
    >
      {/* ambient lighting echoing the hero's blue → violet palette */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-violet-600/10 blur-[150px]" />

      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* --- Left: intro --- */}
        <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
            About Me
          </p>

          <h2 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
            I turn client ideas into intuitive, high-performance products.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            I&apos;m <span className="text-zinc-200">Abbas Raza</span>, a Senior
            Software Engineer and accomplished React developer specializing in
            personalized portals, dynamic dashboards and engaging websites. I
            translate requirements into visually appealing digital experiences —
            with a keen eye for design and a deep understanding of React&apos;s
            capabilities — that drive user engagement and business success.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
            <MapPin className="h-4 w-4 text-sky-400" strokeWidth={1.5} />
            Based in Karachi, Pakistan
          </div>

          {/* Stack chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-zinc-300 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Education */}
          <TiltCard glow="rgba(56,189,248,0.3)" className="mt-10 p-6" max={5}>
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                style={{ boxShadow: "0 0 24px rgba(56,189,248,0.3)" }}
              >
                <GraduationCap className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Bahria University, Karachi
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Bachelor of Information Technology (BS-IT)
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  2016 — 2020
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* --- Right: experience timeline --- */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
            <Briefcase className="h-4 w-4" strokeWidth={1.5} />
            Experience
          </div>

          <div className="space-y-5">
            {EXPERIENCE.map((job) => (
              <TiltCard key={job.role} glow={job.glow} className="p-6" max={6}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-sky-300/90">
                  {job.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {job.body}
                </p>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
