"use client";

import { motion } from "motion/react";
import { Factory, Users, Certificate, Globe, Gear, Warehouse } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { useTranslations } from "next-intl";

export default function FactoryPage() {
  const t = useTranslations();
  return (
    <>
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <BlurText text={t("factory.title")} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("factory.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[{ icon: Warehouse, label: t("factory.floorArea"), value: "8,000 m\u00B2" },{ icon: Users, label: t("factory.workforce"), value: "120+ Engineers & Technicians" },{ icon: Gear, label: t("factory.productionLines"), value: "6 lines, 24/7 operation" }].map((s,i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1 }} className="glass-card-strong rounded-2xl p-8 text-center">
                <s.icon size={32} weight="duotone" className="text-spray-400 mx-auto mb-4" />
                <span className="text-3xl font-bold text-white block mb-1">{s.value}</span>
                <span className="text-gray-500 text-sm">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">{t("factory.capabilities")}</h2>
              <div className="space-y-3">{["CNC precision machining center (5-axis)","Stainless steel welding & fabrication (TIG/MIG)","Ceramic component sintering & laser drilling","Automated assembly lines with QC checkpoints","Hydraulic pressure testing lab (0-200 bar)","Environmental simulation chamber (-20\u00B0C to 65\u00B0C)","PCB assembly for IoT controllers","Powder coating and surface finishing"].map((c,i)=>(<motion.div key={i} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 rounded-full bg-spray-400 shrink-0" />{c}</motion.div>))}</div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">{t("factory.qualityControl")}</h2>
              <div className="space-y-3">{["100% pressure testing on every pump unit","Individual nozzle flow rate verification","24-hour continuous run-in test for all systems","Material composition spectrometry analysis","Salt spray corrosion testing (ASTM B117)","IP65 ingress protection verification","Electrical safety testing (IEC 60335)","Final QC audit before packaging & shipping"].map((q,i)=>(<motion.div key={i} initial={{opacity:0,x:10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />{q}</motion.div>))}</div>
            </div>
          </div>

          <div className="mt-16 glass-card-strong rounded-2xl p-8 text-center">
            <Certificate size={40} weight="duotone" className="text-spray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">{t("factory.tourAvailable")}</h2>
            <p className="text-gray-400 mb-6">{t("factory.tourDesc")}</p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-all">{t("factory.scheduleVisit")}</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
