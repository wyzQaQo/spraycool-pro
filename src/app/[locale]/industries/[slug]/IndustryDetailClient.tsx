"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { FAQSchema } from "@/lib/schema";
import { useTranslations } from "next-intl";
import type { Industry } from "@/lib/industries";

const faqItems = [
  { question: "How much can 100Cooling cool my outdoor venue?", answer: "Our 150-bar high-pressure systems achieve 5-8 degrees C actual temperature reduction and 8-15 degrees C perceived cooling. Performance varies by humidity — best results in dry to moderately humid climates (RH below 70%)." },
  { question: "Is the system suitable for coastal/saltwater environments?", answer: "Yes. All 100Cooling components use 316L stainless steel and marine-grade materials resistant to salt spray corrosion. Our systems are installed at beachfront resorts across Southeast Asia and the Middle East." },
  { question: "How long does installation take?", answer: "Typical installation takes 2-4 weeks for a commercial venue depending on size. We provide engineer-supervised installation with certified local partners in 25+ countries. Temporary cooling can be deployed within 48 hours." },
];

export default function IndustryDetailClient({
  industry,
  allIndustries,
}: {
  industry: Industry;
  allIndustries: Industry[];
}) {
  const t = useTranslations();
  const related = allIndustries.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <FAQSchema questions={faqItems} />

      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/industries" className="inline-flex items-center gap-2 text-gray-500 hover:text-spray-400 text-sm mb-6">
            <ArrowLeft size={16} />{t("industries.title")}
          </Link>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-white mb-4">
            {industry.name}
          </motion.h1>
          <p className="text-spray-400 text-lg mb-8">{industry.hero}</p>

          <div className="space-y-10">
            <div className="glass-card-strong rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-3">The Challenge</h2>
              <p className="text-gray-400 leading-relaxed">{industry.challenge}</p>
            </div>

            <div className="glass-card-strong rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-spray-400 mb-3">The 100Cooling Solution</h2>
              <p className="text-gray-400 leading-relaxed">{industry.solution}</p>
            </div>

            <div className="glass-card-strong rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Applications</h2>
              <ul className="space-y-2">
                {industry.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-spray-400 shrink-0 mt-2" />{app}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 text-center">
              <p className="text-gray-400 italic text-lg mb-4">"{industry.caseStudy}"</p>
              <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-all">
                {t("nav.requestQuote")} <ArrowRight size={16} weight="bold" />
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-spray-500/10">
              <h2 className="text-xl font-bold text-white mb-6">{t("industries.relatedIndustries")}</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((ri) => (
                  <Link key={ri.slug} href={`/industries/${ri.slug}`} className="glass-card rounded-xl p-4 group hover:border-spray-500/30 transition-all">
                    <h3 className="text-white text-sm font-semibold mb-1 group-hover:text-spray-400 transition-colors">{ri.name}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2">{ri.hero}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
