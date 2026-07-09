"use client";

import { useEffect, useRef } from "react";

// App-wide ambient "blue wave" layer. A single fixed, pointer-events-none
// <canvas> painted with a handful of translucent sine bands. It sits ABOVE the
// (opaque, near-black) sections and blends with `screen`, so it only ADDS blue
// light — it never darkens content or blocks clicks. The bands drift on their
// own for life and parallax-scroll with the page so they "move on scroll".
const WAVES = [
  { amp: 55, len: 0.0080, speed: 0.018, yFactor: 0.62, scrollK: 0.45, color: "rgba(37,99,235,0.30)", phase: 0 },
  { amp: 90, len: 0.0050, speed: -0.013, yFactor: 0.78, scrollK: 0.80, color: "rgba(56,189,248,0.20)", phase: 2.1 },
  { amp: 42, len: 0.0120, speed: 0.024, yFactor: 0.46, scrollK: 0.25, color: "rgba(99,102,241,0.22)", phase: 4.3 },
];

export default function WaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let scrollY = window.scrollY || 0;
    let t = 0;
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Wrap span keeps the bands endlessly looping as the page scrolls.
      const span = h + 400;

      for (const wv of WAVES) {
        // Base line drifts with scroll (parallax) and wraps around.
        let y0 = (h * wv.yFactor + scrollY * wv.scrollK) % span;
        if (y0 < 0) y0 += span;
        y0 -= 200;

        ctx.beginPath();
        ctx.moveTo(0, h + 2);
        for (let x = 0; x <= w; x += 10) {
          const y = y0 + Math.sin(x * wv.len + t * wv.speed + wv.phase) * wv.amp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h + 2);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, y0 - wv.amp, 0, h);
        grad.addColorStop(0, wv.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (!reduce) t += 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-80 mix-blend-screen"
    />
  );
}
