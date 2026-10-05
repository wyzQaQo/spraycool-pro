export const dynamicParams = false;
"use client";
import { motion } from "motion/react";
import { ShieldCheck, ClipboardText, Microscope, Package, Truck } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { useTranslations } from "next-intl";

const steps = [
  { icon: ClipboardText, title: "Incoming Material Inspection", desc: "Every batch of stainless steel, ceramic components, and electronic parts undergoes spectrometry analysis, dimensional verification, and material certification checks before entering production." },
  { icon: Microscope, title: "In-Process QC", desc: "Six checkpoints across the production line. CNC tolerances verified to \u00B10.02mm. Weld integrity tested via dye penetrant inspection. Electrical assemblies undergo functional testing at each stage." },
  { icon: ShieldCheck, title: "Pressure & Performance Testing", desc: "100% of pump units tested at 150% rated pressure (225 bar). Every nozzle individually flow-tested. Complete systems run 24-hour continuous operation test with data logging." },
  { icon: Package, title: "Final QC Audit", desc: "Independent QA team performs full functional verification, cosmetic inspection, packaging integrity check, and documentation review before release." },
  { icon: Truck, title: "Pre-Shipment Inspection", desc: "Random sampling per AQL 2.5 standard. Export packaging verified for ISTA 3A compliance. All certifications and test reports included with shipment." },
];

export default function QualityPage() {
  const t = useTranslations();
  const stepTitles = [t("quality.step1"), t("quality.step2"), t("quality.step3"), t("quality.step4"), t("quality.step5")];
  return (
    <>
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <BlurText text={t("quality.title")} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("quality.subtitle")}</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card-strong rounded-2xl p-6 md:p-8 flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center shrink-0">
                  <s.icon size={26} weight="duotone" className="text-spray-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-spray-400 text-xs font-mono tracking-wider">{t("quality.stepPrefix")} 0{i + 1}</span>
                    <h3 className="text-xl font-bold text-white">{stepTitles[i]}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 glass-card-strong rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">{t("quality.warrantyTitle")}</h2>
            <p className="text-gray-400">{t("quality.warrantyDesc")}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
