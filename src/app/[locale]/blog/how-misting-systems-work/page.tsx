export const dynamicParams = false;
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Drop, ArrowRight, CheckCircle, Gear, Gauge, Pipe,
} from "@phosphor-icons/react/dist/ssr";
import FAQSection from "@/components/sections/FAQSection";
import { generalMistingFAQs } from "@/lib/seo-faqs";
import { FAQSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "How High-Pressure Misting Systems Work: Complete Guide | 100Cooling",
    description:
      "Understand how high-pressure misting systems work. 150-bar pump pressure, 5-15 micron droplets, flash evaporation, and 2,257 kJ heat absorption per liter. Complete technical guide.",
    alternates: {
      canonical: `/${locale}/blog/how-misting-systems-work`,
      languages: {
        en: "/en/blog/how-misting-systems-work",
        ar: "/ar/blog/how-misting-systems-work",
        es: "/es/blog/how-misting-systems-work",
        fr: "/fr/blog/how-misting-systems-work",
      },
    },
  };
}

const steps = [
  {
    icon: Pipe,
    title: "1. Multi-Stage Water Filtration",
    description:
      "Raw water passes through a 5-stage filtration system (50 → 20 → 5 → 1 → 0.5 micron). This removes minerals, sediment, and chlorine that could clog precision ceramic nozzles. RO and UV options available for sensitive applications.",
  },
  {
    icon: Gear,
    title: "2. High-Pressure Pump (150 Bar / 2,175 PSI)",
    description:
      "A 5.5 kW VFD-controlled pump pressurizes water to 150 bar. The VFD motor adjusts speed based on active nozzle count, maintaining constant pressure across 50-200+ nozzles while minimizing energy consumption.",
  },
  {
    icon: Drop,
    title: "3. Ceramic Nozzle Atomization at 0.15mm",
    description:
      "Water enters each 0.15mm ceramic orifice at 150 bar pressure. The ceramic nozzle (Grade YTZP zirconia) produces exceptionally uniform droplets. Each nozzle flows 0.04-0.12 L/min depending on system pressure.",
  },
  {
    icon: Gauge,
    title: "4. Flash Evaporation (5-15 Micron Droplets)",
    description:
      "Droplets of 5-15 microns evaporate in 0.3-0.8 seconds in air above 26°C. The phase change from liquid to vapor absorbs 2,257 kJ of latent heat per liter — this is the cooling effect. No surface wetting occurs with correctly sized droplets.",
  },
  {
    icon: CheckCircle,
    title: "5. Smart IoT Control & Zone Management",
    description:
      "The IoT hub controls pump speed, zone valves, and dosing pumps. Temperature and humidity sensors trigger automatic operation. Mobile app provides remote monitoring, scheduling, and energy usage tracking across up to 16 independent zones.",
  },
];

const comparisons = [
  { factor: "Operating Pressure", low: "30-60 PSI", mid: "100-250 PSI", high: "1000-1500 PSI (100Cooling)" },
  { factor: "Droplet Size", low: "50-200 microns", mid: "20-50 microns", high: "5-15 microns (Flash evaporate)" },
  { factor: "Surface Wetting", low: "Heavy — puddles form", mid: "Moderate — furniture damp", high: "Zero — completely dry" },
  { factor: "Cooling Effect", low: "1-3°C", mid: "3-8°C", high: "8-15°C (industrial-grade)" },
  { factor: "Water Consumption", low: "High — 30-50 L/min", mid: "Medium — 15-30 L/min", high: "Low — 8-25 L/min" },
  { factor: "Nozzle Clogging", low: "Frequent", mid: "Occasional", high: "Rare (ceramic + 5-stage filter)" },
];

export default async function HowMistingWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How High-Pressure Misting Systems Work",
            description:
              "Technical guide explaining the science of evaporative cooling with high-pressure misting systems.",
            author: { "@type": "Organization", name: "100Cooling" },
            publisher: { "@type": "Organization", name: "100Cooling" },
            datePublished: "2026-01-15",
            dateModified: "2026-06-07",
          }),
        }}
      />
      <FAQSchema questions={generalMistingFAQs} />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/blog" className="hover:text-spray-400 transition-colors">
              Blog
            </Link>
            <ArrowRight size={14} />
            <span className="text-gray-400">Technical Guide</span>
          </div>

          {/* Hero */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-spray-500/20 bg-spray-500/5 text-spray-400 text-xs font-medium tracking-wider mb-6">
              <Drop size={14} weight="fill" />
              TECHNICAL GUIDE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
              How High-Pressure Misting Systems{" "}
              <span className="text-gradient-spray">Actually Work</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-3xl">
              The science is simple but the engineering is precise. By forcing water through
              ceramic nozzles at 150 bar pressure, we create 5-15 micron droplets that
              flash-evaporate in mid-air — absorbing 2,257 kJ of heat per liter and
              dropping ambient temperature by 8-15°C. Here&apos;s the complete
              step-by-step breakdown.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-3">
                <Drop size={20} className="text-spray-400" />
                <div>
                  <div className="text-white font-semibold text-sm">150 Bar Pressure</div>
                  <div className="text-gray-500 text-xs">2,175 PSI pump</div>
                </div>
              </div>
              <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-3">
                <Gauge size={20} className="text-spray-400" />
                <div>
                  <div className="text-white font-semibold text-sm">5-15 Micron</div>
                  <div className="text-gray-500 text-xs">Flash evaporation</div>
                </div>
              </div>
              <div className="glass-card rounded-xl px-5 py-3 flex items-center gap-3">
                <CheckCircle size={20} className="text-spray-400" />
                <div>
                  <div className="text-white font-semibold text-sm">Zero Wetting</div>
                  <div className="text-gray-500 text-xs">Surfaces stay dry</div>
                </div>
              </div>
            </div>
          </div>

          {/* The Science */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              The Science of Evaporative Cooling
            </h2>
            <div className="glass-card-strong rounded-2xl p-8 border-spray-500/20 mb-8">
              <p className="text-gray-400 leading-relaxed mb-4">
                Evaporative cooling works on a fundamental thermodynamic principle: when
                liquid water transitions to water vapor, it absorbs latent heat from the
                surrounding air. Each liter of water蒸发 (evaporates) absorbs{" "}
                <strong className="text-white">2,257 kJ (537 kcal)</strong> of heat energy.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                The cooling efficiency depends entirely on droplet size. Droplets larger
                than 50 microns behave like tiny raindrops — they fall to the ground
                without fully evaporating, creating wet surfaces. Droplets smaller than 5
                microns evaporate before traveling far enough to cool the target area.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The <strong className="text-white">sweet spot is 5-15 microns</strong> —
                small enough to flash-evaporate in 0.3-0.8 seconds, but large
                enough to remain airborne and cool a meaningful volume of air. Achieving
                this consistently requires precise pump pressure (150 bar) and
                high-quality ceramic nozzles.
              </p>
            </div>
          </section>

          {/* Step by Step */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              How a High-Pressure Misting System Works: Step by Step
            </h2>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="glass-card rounded-2xl p-6 md:p-8 border-spray-500/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center text-spray-400 text-lg font-bold shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {step.icon && (
                          <step.icon size={20} className="text-spray-400" />
                        )}
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pressure Comparison */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              High Pressure vs Low Pressure: Why It Matters
            </h2>
            <div className="glass-card-strong rounded-2xl p-8 border-spray-500/20 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-spray-500/20">
                    <th className="text-left text-gray-400 pb-3 pr-4">Factor</th>
                    <th className="text-center text-red-400 pb-3 px-4">Low Pressure (30-60 PSI)</th>
                    <th className="text-center text-amber-400 pb-3 px-4">Mid Pressure (100-250 PSI)</th>
                    <th className="text-center text-spray-400 pb-3 pl-4">High Pressure (1000-1500 PSI)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row) => (
                    <tr key={row.factor} className="border-b border-white/5">
                      <td className="py-3 pr-4 text-gray-300 font-medium">{row.factor}</td>
                      <td className="py-3 px-4 text-gray-400 text-center">{row.low}</td>
                      <td className="py-3 px-4 text-gray-400 text-center">{row.mid}</td>
                      <td className="py-3 pl-4 text-spray-300 text-center font-medium">{row.high}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              100Cooling operates at 150 bar (2,175 PSI) — the proven sweet spot for
              commercial and industrial outdoor cooling applications.
            </p>
          </section>

          {/* Key Components */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Key Components of a Professional Misting System
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "High-Pressure Pump Station",
                  specs: ["150 bar max pressure", "5.5 kW VFD motor", "316L SS pump head", "IP65 weatherproof", "Modbus RTU/TCP"],
                },
                {
                  title: "Ceramic Nozzles (0.15mm orifice)",
                  specs: ["YTZP zirconia ceramic", "Anti-clog design", "5-15 micron droplets", "0.04-0.12 L/min flow", "5,000+ hour lifespan"],
                },
                {
                  title: "316L Stainless Steel Tubing",
                  specs: ["9.52mm OD standard", "UV-resistant outer layer", "Quick-connect fittings", "500m+ per pump", "25-year design life"],
                },
                {
                  title: "5-Stage Filtration System",
                  specs: ["50 → 20 → 5 → 1 → 0.5 μm", "Automatic backwash", "Filter clog alarm", "RO/UV optional", "Protects nozzles"],
                },
                {
                  title: "IoT Control Hub",
                  specs: ["Weather-based scheduling", "Zone control (up to 16)", "Mobile app management", "Temperature/humidity sensors", "4G remote monitoring"],
                },
                {
                  title: "Dosing Pump (Mosquito Control)",
                  specs: ["Peristaltic pump design", "0.5-5 L/day capacity", "Botanical repellent ready", "Programmable scheduling", "EPA-registered formulas"],
                },
              ].map((comp) => (
                <div key={comp.title} className="glass-card rounded-2xl p-6 border-spray-500/10">
                  <h3 className="text-lg font-bold text-white mb-3">{comp.title}</h3>
                  <ul className="space-y-2">
                    {comp.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle size={14} weight="fill" className="text-spray-400 mt-0.5 shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <FAQSection title="Misting System FAQ" faqs={generalMistingFAQs} accentColor="spray" />

          {/* CTA */}
          <div className="text-center glass-card-strong rounded-2xl p-10 md:p-12 border-spray-500/20 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              Ready to Experience Professional Misting?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our engineering team will assess your space and design a custom cooling system
              tailored to your climate, layout, and budget. Backed by 9+ years of
              experience and 3,200+ successful installations worldwide.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors"
            >
              Request a Free Engineering Assessment
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
