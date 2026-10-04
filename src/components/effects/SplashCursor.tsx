"use client";

import { useEffect, useRef } from "react";

interface SplashCursorProps {
  color?: string;
  particleCount?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

export default function SplashCursor({
  color = "rgba(0, 212, 255,",
  particleCount = 30,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animFrameRef = useRef<number>(0);

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

    const createParticle = (x: number, y: number, vx: number, vy: number): Particle => ({
      x,
      y,
      vx: vx + (Math.random() - 0.5) * 2,
      vy: vy + (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: 40 + Math.random() * 40,
      size: 1.5 + Math.random() * 3,
      opacity: 0.6 + Math.random() * 0.4,
    });

    const handleMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2) {
        const burstCount = Math.min(Math.floor(speed * 0.8), particleCount);
        for (let i = 0; i < burstCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const force = 1 + Math.random() * speed * 0.3;
          particlesRef.current.push(
            createParticle(
              mouseRef.current.x,
              mouseRef.current.y,
              Math.cos(angle) * force,
              Math.sin(angle) * force
            )
          );
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trailing glow at cursor
      const trailAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = `${color} ${trailAlpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = `${color} ${trailAlpha * 0.4})`;
      ctx.fill();

      // Update & render particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        if (p.life >= p.maxLife) return false;

        const progress = p.life / p.maxLife;
        p.x += p.vx * (1 - progress);
        p.y += p.vy * (1 - progress);
        p.vy += 0.05; // slight gravity

        const alpha = p.opacity * (1 - progress) * (1 - progress);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `${color} ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${color} ${alpha * 0.2})`;
        ctx.fill();

        return true;
      });

      // Limit max particles
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-150);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [color, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
