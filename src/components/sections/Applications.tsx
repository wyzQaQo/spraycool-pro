"use client";

import { motion } from "motion/react";
import { Image as ImageIcon } from "@phosphor-icons/react";
import BlurText from "@/components/effects/BlurText";

export default function Applications() {
  return (
    <section id="applications" className="relative py-32 md:py-40">
      <div className="absolute inset-0 bg-deep-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="Complete Climate Control Ecosystem"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
            duration={0.6}
          />
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Every component engineered to work in perfect synchronization,
            delivering reliable performance in the harshest conditions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[220px]">
          {/* Main pump - spans 2 cols, 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 glass-card-strong rounded-2xl p-6 md:p-8 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-deep-900 via-deep-900/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <ImageIcon size={120} weight="duotone" className="text-spray-500" />
            </div>
            <div className="relative z-10">
              <span className="text-spray-400 text-xs font-mono tracking-widest mb-2 block">
                CORE SYSTEM
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                High-Pressure Pump Station
              </h3>
              <p className="text-gray-400 text-sm max-w-lg">
                150 bar rated, stainless steel construction with VFD motor
                control. Delivers consistent pressure across up to 200
                nozzle arrays. IP65 weatherproof enclosure.
              </p>
            </div>
          </motion.div>

          {/* Nozzle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card-strong rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-25 transition-opacity duration-500">
              <ImageIcon size={60} weight="duotone" className="text-spray-500" />
            </div>
            <div className="relative z-10">
              <span className="text-spray-400 text-xs font-mono tracking-widest mb-2 block">
                PRECISION
              </span>
              <h3 className="text-xl font-bold text-white mb-1">
                Ceramic Nozzle Arrays
              </h3>
              <p className="text-gray-400 text-xs">
                0.15mm orifice, anti-clog design. 5-year warranty.
              </p>
            </div>
          </motion.div>

          {/* IoT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card-strong rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-25 transition-opacity duration-500">
              <ImageIcon size={60} weight="duotone" className="text-teal-500" />
            </div>
            <div className="relative z-10">
              <span className="text-teal-400 text-xs font-mono tracking-widest mb-2 block">
                SMART
              </span>
              <h3 className="text-xl font-bold text-white mb-1">
                IoT Control Hub
              </h3>
              <p className="text-gray-400 text-xs">
                Remote monitoring, scheduling, and analytics dashboard.
              </p>
            </div>
          </motion.div>

          {/* Filtration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 glass-card-strong rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-25 transition-opacity duration-500">
              <ImageIcon size={80} weight="duotone" className="text-spray-500" />
            </div>
            <div className="relative z-10">
              <span className="text-spray-400 text-xs font-mono tracking-widest mb-2 block">
                PURIFICATION
              </span>
              <h3 className="text-xl font-bold text-white mb-1">
                5-Stage Water Filtration
              </h3>
              <p className="text-gray-400 text-xs">
                Sediment, carbon, reverse osmosis, UV sterilization, and
                micron filtration. Protects nozzles and ensures pure mist.
              </p>
            </div>
          </motion.div>

          {/* Repellent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="md:row-span-2 glass-card-strong rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-deep-900 via-deep-900/60 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-25 transition-opacity duration-500">
              <ImageIcon size={80} weight="duotone" className="text-teal-500" />
            </div>
            <div className="relative z-10">
              <span className="text-teal-400 text-xs font-mono tracking-widest mb-2 block">
                DEFENSE
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Repellent Injection
              </h3>
              <p className="text-gray-400 text-sm">
                Precision dosing pump injects botanical or synthetic repellent
                into the mist line. Programmable schedules with zone control
                for targeted protection.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
