"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Quotes } from "@phosphor-icons/react";
import BlurText from "@/components/effects/BlurText";

const caseStudies = [
  {
    title: "Luxury Resort Cooling Network",
    location: "Phuket, Thailand",
    area: "8,500 m\u00B2",
    result: "12\u00B0C temperature reduction across 6 outdoor zones",
    quote:
      "100Cooling transformed our beachfront restaurant from an unbearable heat trap into our most-booked dinner venue. Guest satisfaction scores increased 40% in Q1.",
    author: "S.K. Tanapong",
    role: "Facilities Director, Amari Resorts",
  },
  {
    title: "Factory Floor Heat Management",
    location: "Shenzhen, China",
    area: "15,000 m\u00B2",
    result: "Average floor temperature dropped from 38\u00B0C to 26\u00B0C",
    quote:
      "Worker productivity increased 22% after installation. The system paid for itself in 8 months through reduced downtime and improved output quality.",
    author: "L. Zhang Wei",
    role: "Plant Manager, TechTronics Manufacturing",
  },
  {
    title: "Sports Complex Mosquito Shield",
    location: "Kuala Lumpur, Malaysia",
    area: "12,000 m\u00B2",
    result: "99.7% mosquito reduction, zero dengue cases reported",
    quote:
      "We had to cancel evening events constantly due to mosquito complaints. After 100Cooling, our evening bookings tripled. The dual cooling + repellent function is unmatched.",
    author: "R. Abdullah",
    role: "Operations Manager, KL Sports Hub",
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} id="cases" className="relative py-32 md:py-40">
      <div className="absolute inset-0 bg-deep-950" />

      {/* Subtle gradient lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <BlurText
            text="Proven Results in the Field"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
            duration={0.6}
          />
        </div>

        <div className="relative">
          {/* Sticky label */}
          <div className="hidden lg:block sticky top-32 float-left w-1/3 pr-16">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                className="mb-32 last:mb-0"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [i / caseStudies.length, (i + 0.5) / caseStudies.length],
                    [0.3, 1]
                  ),
                }}
              >
                <p className="text-spray-400 text-sm font-mono tracking-widest mb-3">
                  CASE STUDY 0{i + 1}
                </p>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {cs.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {cs.location} &middot; {cs.area}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Scrollable cards */}
          <div className="lg:w-2/3 lg:ml-auto space-y-32">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                {/* Mobile title (hidden on desktop) */}
                <div className="lg:hidden mb-6">
                  <p className="text-spray-400 text-sm font-mono tracking-widest mb-2">
                    CASE STUDY 0{i + 1}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {cs.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {cs.location} &middot; {cs.area}
                  </p>
                </div>

                <div className="glass-card-strong rounded-2xl p-8 md:p-10">
                  <Quotes
                    size={40}
                    weight="fill"
                    className="text-spray-500/30 mb-4"
                  />
                  <blockquote className="text-gray-300 text-lg leading-relaxed mb-6">
                    {cs.quote}
                  </blockquote>
                  <div className="flex items-center gap-4 pt-4 border-t border-spray-500/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-spray-500/30 to-spray-600/30 flex items-center justify-center text-white font-bold text-sm">
                      {cs.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {cs.author}
                      </p>
                      <p className="text-gray-500 text-xs">{cs.role}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-spray-400" />
                  <span className="text-spray-400 text-sm font-medium">
                    {cs.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
