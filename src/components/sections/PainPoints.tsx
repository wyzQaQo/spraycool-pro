"use client";

import { motion } from "motion/react";
import {
  Fan,
  Warning,
  Drop,
  Leaf,
  Clock,
  ShieldCheck,
  Sparkle,
  Wind,
} from "@phosphor-icons/react";
import BlurText from "@/components/effects/BlurText";

export default function PainPoints() {
  const painItems = [
    {
      icon: <Fan size={24} weight="duotone" />,
      title: "AC & Fans Are Useless Outdoors",
      desc: "Open-air spaces constantly pull in hot air. Air conditioning dissipates instantly. Fans just blow hot air around — zero net cooling effect in outdoor environments.",
    },
    {
      icon: <Warning size={24} weight="duotone" />,
      title: "Wet Clothes, Wet Tables, Angry Guests",
      desc: "Conventional spray systems produce large droplets that soak clothing, ruin table settings, and create slip hazards. Terrible guest experience, serious liability risk.",
    },
    {
      icon: <Warning size={24} weight="duotone" />,
      title: "Mosquitoes Are Killing Your Revenue",
      desc: "Summer evenings are peak outdoor dining hours — and peak mosquito hours. Traditional control methods have limited range, short duration, and high labor costs.",
    },
  ];

  const solutionItems = [
    {
      icon: <Sparkle size={24} weight="duotone" />,
      title: "Micron-Level Cold Mist — Instant 5-10 degrees C Cooling",
      desc: "Our 150-bar pump shatters water into 5-15 micron droplets. These flash-evaporate in mid-air, absorbing heat before touching any surface. No wet clothes. No wet tables. Just cool, dry comfort.",
    },
    {
      icon: <ShieldCheck size={24} weight="duotone" />,
      title: "Zero Wet Surfaces. Zero Complaints.",
      desc: "Precision ceramic nozzles + 150-bar pressure atomize water to the micron level. Droplets evaporate completely before reaching skin or surfaces. Guests feel only the cooling effect, never moisture.",
    },
    {
      icon: <Leaf size={24} weight="duotone" />,
      title: "Eco-Friendly Mosquito Repellent — Automatic, Timed, High-Altitude Spray",
      desc: "Our system integrates botanical repellent injection through the same misting lines. 6-meter spray height creates an impenetrable mosquito barrier. Fully automated scheduling. Zero daily maintenance.",
    },
  ];

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-950 via-deep-900/80 to-deep-950" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.5) 0%, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Divider glow */}
      <div className="absolute left-1/2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-spray-500/20 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <BlurText
            text="Why Traditional Solutions Fail Outdoors"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4"
            duration={0.5}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            There&apos;s a reason restaurants lose 40% of summer outdoor
            revenue. The physics of open-air cooling demands a fundamentally
            different approach.
          </motion.p>
        </div>

        {/* Two columns: Pain vs Solution */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: Pain Points */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Warning size={20} weight="fill" className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                The Problem
              </h3>
            </motion.div>

            <div className="space-y-6">
              {painItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 border-red-500/10 hover:border-red-500/20 transition-all duration-500 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center shrink-0 text-red-400 group-hover:bg-red-500/15 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pain summary */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 glass-card rounded-2xl p-5 border-red-500/10 bg-red-500/[0.02]"
            >
              <div className="flex items-center gap-3 text-red-400/80 text-sm">
                <Clock size={18} weight="fill" />
                <span>
                  <strong className="text-red-300">Result:</strong> Lost
                  revenue, uncomfortable guests, seasonal business
                  limitations.
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Solution */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center">
                <Drop size={20} weight="fill" className="text-spray-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                The 100Cooling Solution
              </h3>
            </motion.div>

            <div className="space-y-6">
              {solutionItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="glass-card-strong rounded-2xl p-6 border-spray-500/15 hover:border-spray-500/30 transition-all duration-500 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center shrink-0 text-spray-400 group-hover:bg-spray-500/15 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Solution summary */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 glass-card-strong rounded-2xl p-5 border-spray-500/20 bg-spray-500/[0.03]"
            >
              <div className="flex items-center gap-3 text-spray-400 text-sm">
                <Wind size={18} weight="fill" />
                <span>
                  <strong className="text-spray-300">Result:</strong> 30%+
                  revenue increase from outdoor spaces, 99% guest
                  satisfaction, year-round outdoor operation.
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Key science highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 glass-card-strong rounded-2xl p-8 md:p-10 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-spray-500/20 bg-spray-500/5 text-spray-400 text-xs font-mono tracking-wider mb-4">
            THE SCIENCE
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            1 Liter of Water Absorbs{" "}
            <span className="text-gradient-spray">2,257 kJ</span> of Heat
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
            That&apos;s the latent heat of vaporization. When our 150-bar
            pump forces water through 0.15mm ceramic nozzles, it creates 5-15
            micron droplets with enormous surface area. These droplets
            flash-evaporate before touching any surface, instantly absorbing
            ambient heat. The physics is simple — the engineering is not.
            That&apos;s where 100Cooling comes in.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
