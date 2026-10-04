"use client";

import { useEffect, useRef } from "react";

interface ParticleData {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticlesProps {
  particleColor?: string;
  particleCount?: number;
  speed?: number;
  maxSize?: number;
  className?: string;
}

export default function Particles({
  particleColor = "rgba(0, 212, 255,",
  particleCount = 80,
  speed = 0.5,
  maxSize = 4,
  className = "",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ParticleData[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 0.5 + Math.random() * maxSize,
          speedX: (Math.random() - 0.5) * speed * 0.5,
          speedY: -(Math.random() * speed * 0.3 + 0.1),
          opacity: 0.1 + Math.random() * 0.3,
          life: Math.random() * 300,
          maxLife: 200 + Math.random() * 300,
        });
      }
    };
    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.life++;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 20;
          p.opacity = 0.1 + Math.random() * 0.3;
          p.speedY = -(Math.random() * speed * 0.3 + 0.1);
        }

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap horizontally
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        const lifeProgress = p.life / p.maxLife;
        const alpha = p.opacity * (1 - lifeProgress) * Math.sin(lifeProgress * Math.PI);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor} ${alpha})`;
        ctx.fill();

        // Soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor} ${alpha * 0.1})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [particleColor, particleCount, speed, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
