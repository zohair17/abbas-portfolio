"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Aurora Commerce",
    desc: "Headless storefront with buttery product transitions and instant checkout.",
    stack: ["Next.js", "Stripe", "Tailwind"],
    screen: "linear-gradient(135deg,#4f46e5,#db2777)",
  },
  {
    title: "Nebula Analytics",
    desc: "Real-time data visualisation with 3D charts and live streams.",
    stack: ["React", "Three.js", "D3"],
    screen: "linear-gradient(135deg,#0ea5e9,#10b981)",
  },
  {
    title: "Studio Motion",
    desc: "Cinematic site built around scroll-driven motion and polish.",
    stack: ["Next.js", "Framer Motion", "GLSL"],
    screen: "linear-gradient(135deg,#f59e0b,#f43f5e)",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full bg-[#050505] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Selected Work
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl mb-12">
          Projects
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <motion.a
              key={p.title}
              href="#"
              whileHover={{ y: -8, scale: 1.02 }}
              className="group block overflow-hidden rounded-2xl border border-white/6 bg-gradient-to-br from-white/5 to-white/2 p-6 transition-all"
            >
              <div
                className="h-40 w-full rounded-md bg-cover bg-center shadow-lg"
                style={{ backgroundImage: p.screen }}
              />

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="text-xs text-zinc-300/90 rounded-full border border-white/8 px-2 py-1">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 flex items-center">
                  <ExternalLink className="h-5 w-5 text-zinc-300" strokeWidth={1.75} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
