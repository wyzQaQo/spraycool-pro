"use client";

import { useRef, useEffect, useState } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  animateBy?: "words" | "letters";
  threshold?: number;
  rootMargin?: string;
}

export default function BlurText({
  text,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 20,
  animateBy = "words",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
}: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);

  const chunks = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <div ref={containerRef} className={className} aria-label={text}>
      {chunks.map((chunk, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            filter: isVisible ? "blur(0px)" : "blur(10px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0px)"
              : `translateY(${yOffset}px)`,
            transition: `filter ${duration}s ease-out ${i * 0.03}s, opacity ${duration}s ease-out ${i * 0.03}s, transform ${duration}s ease-out ${i * 0.03}s`,
          }}
        >
          {chunk}
          {animateBy === "words" && i < chunks.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );
}
