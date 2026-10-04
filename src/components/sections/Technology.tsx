"use client";

import { motion } from "motion/react";
import { Gauge, Thermometer, Shield, Tote } from "@phosphor-icons/react";
import CountUp from "@/components/effects/CountUp";
import BlurText from "@/components/effects/BlurText";
import Waves from "@/components/effects/Waves";

const stats = [
  { value: 15, suffix: "\u00B0C", label: "Temperature Reduction", icon: Thermometer },
  { value: 150, suffix: " bar", label: "Pump Pressure Rating", icon: Gauge },
  { value: 99.9, suffix: "%", label: "Mosquito Elimination", icon: Shield },
  { value: 10000, suffix: " m\u00B2", label: "Max Coverage Area", icon: Tote },
];

export default function Technology() {
  return (
    <section id="technology" className="relative py-32 md:py-40 overflow-hidden">
      {/* Waves background */}
      <div className="absolute inset-0">
        <Waves
          lineColor="rgba(0, 212, 255, 0.1)"
          waveSpeedX={0.02}
          waveSpeedY={0.015}
          waveAmp={120}
          xGap={14}
          yGap={50}
          friction={0.93}
          tension={0.004}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-deep-950 via-deep-950/60 to-deep-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="Engineering That Redefines Outdoor Comfort"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
            duration={0.6}
          />
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Our proprietary high-pressure atomization technology delivers
            microscopic water droplets that flash-evaporate, absorbing heat and
            creating a cooling envelope.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8 text-center group hover:border-spray-500/30 transition-all duration-500"
            >
              <stat.icon
                size={28}
                weight="duotone"
                className="text-spray-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <CountUp
                to={stat.value}
                suffix={stat.suffix}
                className="block text-3xl md:text-4xl font-bold text-white tracking-tight mb-2"
                duration={2.5}
              />
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Tech details */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-strong rounded-2xl p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              High-Pressure Atomization
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Water is pressurized to 70-150 bar and forced through precision
              nozzles with 0.1-0.3mm orifices. The resulting 5-15 micron
              droplets create a fine mist that evaporates instantly, absorbing
              up to 2,257 kJ of heat per liter of water.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Stainless Steel 316L", "Ceramic Nozzles", "IP65 Rated", "Smart IoT Control"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-spray-500/10 border border-spray-500/20 text-spray-400 text-xs font-medium"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-strong rounded-2xl p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Dual-Action Mosquito Defense
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our integrated system combines physical barrier misting with
              optional botanical or synthetic repellent injection. The fine
              mist creates a protective perimeter that mosquitoes cannot
              penetrate, with coverage reaching heights up to 6 meters for
              complete aerial protection.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Botanical Formula", "Synthetic Option", "6m Height Coverage", "Timer Controlled"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
