"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface BounceCardsProps {
  className?: string;
  cards: {
    title: string;
    description: string;
    icon?: ReactNode;
  }[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  enableHover?: boolean;
}

export default function BounceCards({
  className = "",
  cards,
  containerWidth = 280,
  containerHeight = 320,
  animationDelay = 0.2,
  animationStagger = 0.08,
  enableHover = true,
}: BounceCardsProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(cards.length, 4)} gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${containerWidth}px, 1fr))`,
      }}
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            delay: animationDelay + idx * animationStagger,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          whileHover={
            enableHover
              ? { y: -8, scale: 1.02, transition: { duration: 0.3 } }
              : undefined
          }
          className="glass-card-strong rounded-2xl p-8 flex flex-col items-center text-center gap-4 cursor-default"
          style={{ minHeight: containerHeight }}
        >
          {card.icon && (
            <div className="w-16 h-16 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center text-spray-400">
              {card.icon}
            </div>
          )}
          <h3 className="text-xl font-semibold text-white tracking-tight">
            {card.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
