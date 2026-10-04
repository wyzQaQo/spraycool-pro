"use client";

import { motion } from "motion/react";
import { ArrowRight, Play } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import SplashCursor from "@/components/effects/SplashCursor";
import Aurora from "@/components/effects/Aurora";

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-deep-950" />
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <Aurora
        colorStops={["#00d4ff", "#14b8a6", "#0ea5e9", "#06b6d4"]}
        speed={0.25}
        amplitude={0.5}
      />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-spray-500/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-teal-500/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <SplashCursor color="rgba(0, 212, 255," particleCount={35} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-spray-500/20 bg-spray-500/5 text-spray-400 text-xs font-medium tracking-wider"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-spray-400 animate-pulse" />
          {t("site.tagline")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white max-w-4xl"
        >
          {t("hero.line1")}{" "}
          <span className="text-gradient-spray">{t("hero.line2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#contact"
            className="group px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold text-base hover:bg-spray-400 transition-all duration-300 hover:shadow-lg hover:shadow-spray-500/30 inline-flex items-center gap-2"
          >
            {t("hero.cta1")}
            <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#technology"
            className="group px-8 py-3.5 rounded-full border border-spray-500/30 text-spray-400 text-base font-medium hover:bg-spray-500/10 transition-all duration-300 inline-flex items-center gap-2"
          >
            <Play size={18} weight="fill" className="group-hover:scale-110 transition-transform" />
            {t("hero.cta2")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-4 text-gray-500 text-xs tracking-wide"
        >
          <span>ISO 9001:2015 Certified</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>CE &amp; RoHS Compliant</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>5-Year Warranty</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>24/7 Global Support</span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-950 to-transparent pointer-events-none" />
    </section>
  );
}
