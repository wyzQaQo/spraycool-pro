"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  separator?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  threshold?: number;
}

export default function CountUp({
  from = 0,
  to,
  duration = 2,
  separator = ",",
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  threshold = 0.3,
}: CountUpProps) {
  const [current, setCurrent] = useState(from);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started, threshold]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    const fromVal = from;
    const diff = to - fromVal;

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = fromVal + diff * eased;
      setCurrent(val);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [started, from, to, duration]);

  const formatNumber = (num: number): string => {
    const parts = num.toFixed(decimals).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(".");
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(current)}
      {suffix}
    </span>
  );
}
