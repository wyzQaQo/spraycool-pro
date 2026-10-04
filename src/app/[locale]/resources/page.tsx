"use client";
import { motion } from "motion/react";
import { FilePdf, FileText, Cube, BookOpen, DownloadSimple, ArrowRight } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { useTranslations } from "next-intl";

const resources = [
  { title: "MG-PRO 1500 Datasheet", desc: "Complete technical specifications for our flagship pump station.", type: "PDF", icon: FilePdf, size: "2.4 MB", cat: "Product Datasheets" },
  { title: "100Coolingduct Catalog 2026", desc: "Full product line overview with specifications and pricing guidelines.", type: "PDF", icon: BookOpen, size: "8.1 MB", cat: "Product Datasheets" },
  { title: "Installation & Commissioning Guide", desc: "Step-by-step installation manual for certified installers.", type: "PDF", icon: FileText, size: "5.7 MB", cat: "Technical Documentation" },
  { title: "Maintenance & Service Manual", desc: "Scheduled maintenance procedures and troubleshooting guide.", type: "PDF", icon: FileText, size: "3.2 MB", cat: "Technical Documentation" },
  { title: "MG-IOT HUB API Documentation", desc: "REST API reference for IoT controller integration.", type: "PDF", icon: FileText, size: "1.8 MB", cat: "Technical Documentation" },
  { title: "Nozzle Configuration Calculator", desc: "Spreadsheet tool for calculating nozzle count and spacing.", type: "XLSX", icon: FileText, size: "0.5 MB", cat: "Tools & Calculators" },
  { title: "ROI Calculator Template", desc: "Estimate payback period for your misting system investment.", type: "XLSX", icon: FileText, size: "0.3 MB", cat: "Tools & Calculators" },
  { title: "MG-PRO 1500 CAD Model", desc: "3D STEP file for system integration and space planning.", type: "STEP", icon: Cube, size: "12.6 MB", cat: "CAD Files" },
  { title: "Nozzle Assembly CAD", desc: "Detailed 3D model of nozzle and fitting assembly.", type: "STEP", icon: Cube, size: "3.4 MB", cat: "CAD Files" },
  { title: "CE Declaration of Conformity", desc: "Official CE marking documentation for EU compliance.", type: "PDF", icon: FilePdf, size: "1.1 MB", cat: "Certifications" },
  { title: "ISO 9001:2015 Certificate", desc: "Current ISO certification from SGS.", type: "PDF", icon: FilePdf, size: "0.9 MB", cat: "Certifications" },
  { title: "Material Safety Data Sheets", desc: "MSDS for botanical repellent concentrates.", type: "PDF", icon: FilePdf, size: "0.6 MB", cat: "Certifications" },
];

const cats = [...new Set(resources.map(r => r.cat))];

export default function ResourcesPage() {
  const t = useTranslations();
  return (
    <>
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <BlurText text={t("resources.title")} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("resources.subtitle")}</p>
          </div>

          {cats.map((cat, ci) => (
            <div key={cat} className="mb-12">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-spray-400" />{cat}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.filter(r => r.cat === cat).map((r, i) => (
                  <motion.a key={i} href="#" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (ci * 3 + i) * 0.03 }} className="glass-card rounded-xl p-5 group hover:border-spray-500/30 transition-all flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-spray-500/10 flex items-center justify-center shrink-0">
                      <r.icon size={20} weight="duotone" className="text-spray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm mb-1 truncate">{r.title}</h3>
                      <p className="text-gray-500 text-xs mb-2">{r.desc}</p>
                      <div className="flex items-center gap-2 text-gray-600 text-xs">
                        <span className="px-2 py-0.5 rounded bg-deep-800">{r.type}</span>
                        <span>{r.size}</span>
                      </div>
                    </div>
                    <DownloadSimple size={18} className="text-gray-600 group-hover:text-spray-400 transition-colors shrink-0 mt-1" />
                  </motion.a>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-16 glass-card-strong rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">{t("resources.needSpecific")}</h2>
            <p className="text-gray-400 mb-6">{t("resources.needSpecificDesc")}</p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-all">{t("resources.requestCustom")}<ArrowRight size={18} weight="bold" /></a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
