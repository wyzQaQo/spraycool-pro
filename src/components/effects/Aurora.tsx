"use client";

import { useEffect, useRef } from "react";

interface AuroraProps {
  colorStops?: string[];
  speed?: number;
  amplitude?: number;
}

export default function Aurora({
  colorStops = ["#00d4ff", "#14b8a6", "#0ea5e9", "#06b6d4"],
  speed = 0.3,
  amplitude = 0.6,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      timeRef.current += 0.005 * speed;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * 2.5;
        const scale = 1 - layer * 0.15;

        const grad = ctx.createLinearGradient(0, 0, w * 0.8, h * scale);
        const colors = colorStops.map((c, i) => {
          const offset = i / (colorStops.length - 1);
          return c;
        });

        colors.forEach((c, i) => {
          grad.addColorStop(i / (colors.length - 1), c);
        });

        ctx.globalAlpha = 0.15 - layer * 0.04;
        ctx.fillStyle = grad;

        ctx.beginPath();
        const yBase = h * (0.1 + layer * 0.25);

        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += Math.max(w / 80, 1)) {
          const nx = x / w;
          const wave1 = Math.sin(nx * 3 + t + layerOffset) * amplitude * 60;
          const wave2 = Math.cos(nx * 5 - t * 1.3 + layerOffset) * amplitude * 30;
          const wave3 = Math.sin(nx * 7 + t * 0.7 + layerOffset) * amplitude * 20;
          const y = yBase + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        // Bright highlight edge
        ctx.globalAlpha = 0.3 - layer * 0.08;
        ctx.strokeStyle = colorStops[0];
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [colorStops, speed, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
