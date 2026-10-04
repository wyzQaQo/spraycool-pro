"use client";

import { motion } from "motion/react";
import {
  Thermometer,
  Bug,
  CloudFog,
  Cow,
  Plant,
  ArrowRight,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import BlurText from "@/components/effects/BlurText";

const problems = [
  {
    title: "High Outdoor Temperature",
    description: "Guests leave. Revenue drops. Outdoor spaces sit empty in peak summer months.",
    icon: <Thermometer size={28} weight="duotone" />,
    href: "/problems/high-outdoor-temperature",
    solutions: ["Hotel Terraces", "Restaurant Patios", "Backyards"],
    color: "red",
  },
  {
    title: "Mosquito Problems",
    description: "Evening dining ruined. Guest complaints spike. Traditional methods are labor-intensive and short-lived.",
    icon: <Bug size={28} weight="duotone" />,
    href: "/problems/mosquito-problems",
    solutions: ["Resorts", "Villas", "Outdoor Venues"],
    color: "orange",
  },
  {
    title: "Dust Control",
    description: "Airborne dust threatens worker health, equipment performance, and regulatory compliance.",
    icon: <CloudFog size={28} weight="duotone" />,
    href: "/problems/dust-control",
    solutions: ["Construction Sites", "Mines", "Ports"],
    color: "amber",
  },
  {
    title: "Livestock Heat Stress",
    description: "Heat stress reduces milk production, egg output, and livestock health. Mortality rates rise.",
    icon: <Cow size={28} weight="duotone" />,
    href: "/problems/livestock-heat-stress",
    solutions: ["Dairy Farms", "Poultry Operations"],
    color: "rose",
  },
  {
    title: "Greenhouse Humidity Control",
    description: "Improper humidity stunts growth, encourages mold, and reduces crop yields.",
    icon: <Plant size={28} weight="duotone" />,
    href: "/problems/greenhouse-humidity",
    solutions: ["Greenhouse Growing"],
    color: "emerald",
  },
];

export default function ProblemsPreview() {
  return (
    <section id="problems" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-950 via-deep-900/60 to-deep-950" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.5) 0%, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="Problems We Solve"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
            duration={0.6}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Most customers don&apos;t search for products. They search for solutions to their problems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={problem.href}
                className="group block glass-card rounded-2xl p-6 md:p-7 h-full border-red-500/10 hover:border-red-500/25 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${problem.color}-500/10 border border-${problem.color}-500/20 flex items-center justify-center text-${problem.color}-400`}>
                    {problem.icon}
                  </div>
                  <ArrowRight
                    size={20}
                    weight="bold"
                    className="text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                  {problem.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {problem.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium text-gray-400">Solves:</span>
                  {problem.solutions.join(" / ")}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
