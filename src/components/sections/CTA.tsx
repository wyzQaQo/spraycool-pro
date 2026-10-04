"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import Waves from "@/components/effects/Waves";

export default function CTA() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-deep-950" />
      <Waves
        lineColor="rgba(0, 212, 255, 0.08)"
        waveSpeedX={0.015}
        waveSpeedY={0.01}
        waveAmp={100}
        friction={0.94}
        tension={0.003}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-spray-500/3 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4"
          >
            {t("cta.title")}
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {submitted ? (
            <div className="glass-card-strong rounded-2xl p-12 text-center">
              <CheckCircle size={56} weight="fill" className="text-spray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Inquiry Received</h3>
              <p className="text-gray-400">Our engineering team will review your requirements and respond within 48 hours with a tailored proposal.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card-strong rounded-2xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl bg-deep-900 border border-spray-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-spray-500/50 focus:ring-1 focus:ring-spray-500/30 transition-all" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl bg-deep-900 border border-spray-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-spray-500/50 focus:ring-1 focus:ring-spray-500/30 transition-all" placeholder="Your Company Ltd." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl bg-deep-900 border border-spray-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-spray-500/50 focus:ring-1 focus:ring-spray-500/30 transition-all" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl bg-deep-900 border border-spray-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-spray-500/50 focus:ring-1 focus:ring-spray-500/30 transition-all" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-deep-900 border border-spray-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-spray-500/50 focus:ring-1 focus:ring-spray-500/30 transition-all resize-none" placeholder="Tell us about your space, climate, and goals..." />
              </div>
              <button type="submit" className="w-full group px-8 py-4 rounded-xl bg-spray-500 text-black font-semibold text-base hover:bg-spray-400 transition-all duration-300 hover:shadow-lg hover:shadow-spray-500/30 inline-flex items-center justify-center gap-2">
                <PaperPlaneTilt size={20} weight="fill" />
                {t("cta.button")}
                <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
