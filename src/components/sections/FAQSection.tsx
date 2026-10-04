"use client";

import { FAQSchema } from "@/lib/schema";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({
  title,
  faqs,
  accentColor = "spray",
}: {
  title?: string;
  faqs: FAQItem[];
  accentColor?: "spray" | "emerald" | "amber" | "violet" | "rose" | "orange";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const colorMap: Record<string, { border: string; icon: string; bg: string }> = {
    spray: { border: "border-spray-500/20", icon: "text-spray-400", bg: "bg-spray-500/5" },
    emerald: { border: "border-emerald-500/20", icon: "text-emerald-400", bg: "bg-emerald-500/5" },
    amber: { border: "border-amber-500/20", icon: "text-amber-400", bg: "bg-amber-500/5" },
    violet: { border: "border-violet-500/20", icon: "text-violet-400", bg: "bg-violet-500/5" },
    rose: { border: "border-rose-500/20", icon: "text-rose-400", bg: "bg-rose-500/5" },
    orange: { border: "border-orange-500/20", icon: "text-orange-400", bg: "bg-orange-500/5" },
  };

  const colors = colorMap[accentColor] || colorMap.spray;

  return (
    <section className="mb-16">
      <FAQSchema questions={faqs} />
      <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-8">
        {title || "Frequently Asked Questions"}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`glass-card rounded-xl border ${colors.border} overflow-hidden transition-colors ${
              openIndex === i ? "border-opacity-40" : ""
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
            >
              <h3 className="text-white font-semibold pr-4">{faq.question}</h3>
              <CaretDown
                size={20}
                weight="bold"
                className={`shrink-0 transition-transform duration-300 ${colors.icon} ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5">
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
