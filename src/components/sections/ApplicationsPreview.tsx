"use client";

import { motion } from "motion/react";
import {
  Buildings,
  House,
  Barn,
  Factory,
  Trophy,
  ArrowRight,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import BlurText from "@/components/effects/BlurText";

const applicationCategories = [
  {
    title: "Commercial & Hospitality",
    description: "Hotels, resorts, restaurants, beach clubs, and theme parks.",
    icon: <Buildings size={28} weight="duotone" />,
    href: "/applications/commercial-hospitality",
    items: ["Hotel Cooling", "Resort Cooling", "Restaurant Patio", "Beach Club", "Theme Park"],
    color: "spray",
  },
  {
    title: "Residential",
    description: "Backyards, patios, gardens, and outdoor living spaces.",
    icon: <House size={28} weight="duotone" />,
    href: "/applications/residential",
    items: ["Backyard Misting", "Patio Cooling", "Garden Cooling"],
    color: "teal",
  },
  {
    title: "Agriculture",
    description: "Greenhouses, livestock cooling, and poultry farms.",
    icon: <Barn size={28} weight="duotone" />,
    href: "/applications/agriculture",
    items: ["Greenhouse Misting", "Livestock Cooling", "Poultry Farm Cooling"],
    color: "emerald",
  },
  {
    title: "Industrial",
    description: "Dust suppression, construction sites, and warehouse cooling.",
    icon: <Factory size={28} weight="duotone" />,
    href: "/applications/industrial",
    items: ["Dust Suppression", "Construction Site", "Warehouse Cooling"],
    color: "amber",
  },
  {
    title: "Events & Sports",
    description: "Stadiums, outdoor events, and golf courses.",
    icon: <Trophy size={28} weight="duotone" />,
    href: "/applications/events-sports",
    items: ["Stadium Cooling", "Outdoor Events", "Golf Course Cooling"],
    color: "violet",
  },
];

export default function ApplicationsPreview() {
  return (
    <section id="applications" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-deep-950" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="Applications"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
            duration={0.6}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
          >
            From luxury resorts to industrial facilities — engineered for every outdoor environment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {applicationCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={cat.href}
                className="group block glass-card-strong rounded-2xl p-6 md:p-7 h-full border-spray-500/10 hover:border-spray-500/30 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${cat.color}-500/10 border border-${cat.color}-500/20 flex items-center justify-center text-${cat.color}-400`}>
                    {cat.icon}
                  </div>
                  <ArrowRight
                    size={20}
                    weight="bold"
                    className="text-gray-600 group-hover:text-spray-400 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-spray-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-full bg-spray-500/5 border border-spray-500/10 text-gray-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
