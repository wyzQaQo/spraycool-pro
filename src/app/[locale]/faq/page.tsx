"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { FAQSchema } from "@/lib/schema";
import { useTranslations, useMessages } from "next-intl";

export default function FAQPage() {
  const t = useTranslations();
  const messages = useMessages() as any;
  const faqs: { q: string; a: string; cat: string }[] = messages.faqData || [];

  const [activeCat, setActiveCat] = useState("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const categories = ["All", ...new Set(faqs.map(f => f.cat))];
  const filtered = activeCat === "All" ? faqs : faqs.filter(f => f.cat === activeCat);

  return (
    <>
      <FAQSchema questions={faqs.map(f => ({ question: f.q, answer: f.a }))} />
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <BlurText text={t("faq.title")} className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCat(cat); setOpenIdx(null); }} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCat === cat ? "bg-spray-500 text-black" : "border border-spray-500/20 text-gray-400 hover:text-spray-400"}`}>{cat === "All" ? t("faq.allCategories") : cat}</button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }} className="glass-card rounded-xl overflow-hidden">
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left gap-4">
                  <span className="text-white font-medium text-sm">{faq.q}</span>
                  <CaretDown size={18} className={`text-gray-500 shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
