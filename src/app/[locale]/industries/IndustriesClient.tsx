"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { useTranslations } from "next-intl";
import type { Industry } from "@/lib/industries";

const iconMap: Record<string, any> = {};

export default function IndustriesClient({ industries }: { industries: Industry[] }) {
  const t = useTranslations();

  return (
    <>
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <BlurText text={t("industries.title")} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("industries.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass-card-strong rounded-2xl p-6 group hover:border-spray-500/30 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{ind.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{ind.challenge.slice(0, 120)}...</p>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="inline-flex items-center gap-1 text-spray-400 text-sm font-medium group-hover:gap-2 transition-all"
                >
                  {t("industries.viewSolutions")} <ArrowRight size={14} weight="bold" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
