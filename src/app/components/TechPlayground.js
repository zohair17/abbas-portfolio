"use client";

import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { Linkedin, Instagram } from "./BrandIcons";

const LINKS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/syed-abbas-raza-shah-zaidi-49516b105" },
  { icon: Mail, label: "Email", href: "mailto:abbas098110@gmail.com" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/abbas_zaidi_10?igsh=MWFycXQwOWM5bnU0NQ%3D%3D" },
  { icon: FileText, label: "Resume", href: "/Abbas%20-%20Senior%20Software%20Engineer.pdf", download: true },
];

export default function TechPlayground() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505]/70 px-6"
    >
      {/* cinematic background video — plays through once and then holds on
          its final frame (no loop). */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        src="/asset/portfolio.mp4"
        autoPlay
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      {/* ambient light */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-zinc-400"
        >
          Tech Playground
        </motion.p>

        {/* Two halves converge from opposite screen edges. Percentages, not
            pixels, so the travel scales with the type at every breakpoint. */}
        <h2 className="w-full text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-8xl md:text-[9rem] lg:text-[11rem]">
          <motion.span
            initial={{ opacity: 0, x: "-100%" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Let&apos;s
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: "100%" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Collaborate!
          </motion.span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {LINKS.map(({ icon: Icon, label, href, download }) => (
            <a
              key={label}
              href={href}
              download={download ? "" : undefined}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.75} />
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
