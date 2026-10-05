export const dynamicParams = false;
"use client";
import { motion } from "motion/react";
import { Certificate, CheckCircle } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { useTranslations } from "next-intl";

const certs = [
  { name: "ISO 9001:2015", body: "SGS", desc: "Quality management systems — design, manufacturing, and service of high-pressure misting equipment." },
  { name: "CE Marking", body: "T\u00DCV Rheinland", desc: "European conformity for machinery directive, low voltage directive, and EMC directive." },
  { name: "RoHS Compliant", body: "SGS", desc: "Restriction of hazardous substances — all electronic components certified lead-free and environmentally safe." },
  { name: "UL Listed", body: "UL Solutions", desc: "Safety certification for electrical pump motors and control panels sold in North American markets." },
  { name: "IP65 Rated", body: "T\u00DCV S\u00DCD", desc: "Ingress protection verified — dust-tight and protected against water jets from any direction." },
  { name: "FDA Food-Grade", body: "Intertek", desc: "Materials in contact with mist water certified safe for food service environments." },
  { name: "ISO 14001", body: "SGS", desc: "Environmental management system — commitment to sustainable manufacturing practices." },
  { name: "OHSAS 18001", body: "BSI", desc: "Occupational health and safety management — safe working environment for all employees." },
];

export default function CertificatesPage() {
  const t = useTranslations();
  return (
    <>
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <BlurText text={t("certificates.title")} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("certificates.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card-strong rounded-2xl p-6 text-center group hover:border-spray-500/30 transition-all">
                <Certificate size={36} weight="duotone" className="text-spray-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-1">{c.name}</h3>
                <p className="text-spray-400 text-xs font-mono tracking-wider mb-3">Issued by {c.body}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-1 text-teal-400 text-xs">
                  <CheckCircle size={14} weight="fill" /> {t("certificates.valid")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
