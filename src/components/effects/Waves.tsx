"use client";

import { useEffect, useRef } from "react";

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmp?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
}

export default function Waves({
  lineColor = "rgba(0, 212, 255, 0.15)",
  backgroundColor = "transparent",
  waveSpeedX = 0.018,
  waveSpeedY = 0.012,
  waveAmp = 160,
  xGap = 12,
  yGap = 40,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 120,
}: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; wave: { x: number; y: number } }[][]>([]);
  const mouseRef = useRef({ x: 0, y: 0, moveX: 0, moveY: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initPoints();
    };

    const initPoints = () => {
      const w = canvas.width;
      const h = canvas.height;
      const rows = Math.floor(h / yGap) + 2;
      const cols = Math.floor(w / xGap) + 2;
      pointsRef.current = [];

      for (let r = 0; r < rows; r++) {
        const row: { x: number; y: number; wave: { x: number; y: number } }[] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * xGap;
          const y = r * yGap;
          row.push({ x, y, wave: { x: 0, y: 0 } });
        }
        pointsRef.current.push(row);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const dx = mx - mouseRef.current.x;
      const dy = my - mouseRef.current.y;
      mouseRef.current.moveX += dx;
      mouseRef.current.moveY += dy;
      mouseRef.current.moveX = Math.max(-maxCursorMove, Math.min(maxCursorMove, mouseRef.current.moveX));
      mouseRef.current.moveY = Math.max(-maxCursorMove, Math.min(maxCursorMove, mouseRef.current.moveY));
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mousemove", handleMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = performance.now() * 0.001;
      const pts = pointsRef.current;

      // Update waves
      for (let r = 0; r < pts.length; r++) {
        for (let c = 0; c < pts[r].length; c++) {
          const p = pts[r][c];
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = dist < 200 ? (1 - dist / 200) * (1 - dist / 200) * mouseRef.current.moveY * 0.3 : 0;

          p.wave.x += (Math.sin(time * waveSpeedX * 20 + p.x * 0.02 + p.y * 0.01) * waveAmp * 0.3 + force - p.wave.x) * tension;
          p.wave.y += (Math.cos(time * waveSpeedY * 15 + p.y * 0.03 + p.x * 0.01) * waveAmp * 0.2 - p.wave.y) * tension;
        }
      }

      // Friction
      mouseRef.current.moveX *= friction;
      mouseRef.current.moveY *= friction;

      // Draw lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      for (let r = 0; r < pts.length - 1; r++) {
        for (let c = 0; c < pts[r].length - 1; c++) {
          const p = pts[r][c];
          const pRight = pts[r][c + 1];
          const pDown = pts[r + 1][c];

          const x1 = p.x + p.wave.x;
          const y1 = p.y + p.wave.y;
          const x2 = pRight.x + pRight.wave.x;
          const y2 = pRight.y + pRight.wave.y;
          const x3 = pDown.x + pDown.wave.x;
          const y3 = pDown.y + pDown.wave.y;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(x1 + (x2 - x1) * 0.5, y1 + (y2 - y1) * 0.5, x2, y2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(x1 + (x3 - x1) * 0.5, y1 + (y3 - y1) * 0.5, x3, y3);
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmp, xGap, yGap, friction, tension, maxCursorMove]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
}
