"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FolderCheck, Wand2, Smile, GraduationCap } from "lucide-react";

const STATS = [
  { icon: FolderCheck, value: 48, suffix: "+", label: "Projects Delivered", glow: "rgba(56,189,248,0.4)" },
  { icon: Wand2, value: 320, suffix: "+", label: "Animations Built", glow: "rgba(56,140,255,0.4)" },
  { icon: Smile, value: 99, suffix: "%", label: "Client Satisfaction", glow: "rgba(56,189,248,0.4)" },
  { icon: GraduationCap, value: 5, suffix: "+", label: "Years of Learning", glow: "rgba(59,130,246,0.4)" },
];

export default function NumbersSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".num-value").forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.firstChild.textContent = Math.round(obj.v).toString();
          },
        });
      });

      gsap.from(".num-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".num-grid", start: "top 88%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-y border-white/5 bg-[#080808] px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="num-grid grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, suffix, label, glow }) => (
            <div
              key={label}
              className="num-card rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm"
            >
              <div
                className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                style={{ boxShadow: `0 0 28px ${glow}` }}
              >
                <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <p
                className="num-value text-4xl font-bold tracking-tight text-white sm:text-5xl"
                data-value={value}
              >
                <span>0</span>
                {suffix}
              </p>
              <p className="mt-2 text-sm text-zinc-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
