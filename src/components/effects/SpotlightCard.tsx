"use client";

import { useRef } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(0, 212, 255, 0.15)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !overlayRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlayRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`;
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"
        style={{
          opacity: 0,
          background: `radial-gradient(circle at 50% 50%, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
