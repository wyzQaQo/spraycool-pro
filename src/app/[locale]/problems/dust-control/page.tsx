export const dynamicParams = false;
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CloudFog, ArrowRight, CheckCircle, Factory } from "@phosphor-icons/react/dist/ssr";
import FAQSection from "@/components/sections/FAQSection";
import { industrialFAQs } from "@/lib/seo-faqs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Dust Suppression Systems for Construction & Mining | 100Cooling",
    description: "High-pressure dust suppression misting systems for construction sites, mines, and material handling. Reduce airborne dust by up to 90% and meet OSHA compliance standards.",
    alternates: {
      canonical: `/${locale}/problems/dust-control`,
      languages: {
        en: "/en/problems/dust-control",
        ar: "/ar/problems/dust-control",
        es: "/es/problems/dust-control",
        fr: "/fr/problems/dust-control",
      },
    },
  };
}

export default async function DustControlPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/problems" className="hover:text-spray-400 transition-colors">Problems We Solve</Link>
            <ArrowRight size={14} />
            <span className="text-gray-400">Dust Control</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium tracking-wider mb-6">
            <CloudFog size={14} weight="fill" />
            PROBLEM: AIRBORNE DUST
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Control Dust at the <span className="text-gradient-spray">Source</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Airborne silica and particulate dust pose serious health risks to workers and neighboring communities. Regulatory fines for non-compliance can reach hundreds of thousands of dollars. Traditional water sprays create muddy conditions and waste enormous amounts of water.
          </p>

          <div className="glass-card rounded-2xl p-6 md:p-8 border-amber-500/10 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
            <ul className="space-y-3">
              {[
                "OSHA and EPA regulations strictly limit airborne particulate levels",
                "Traditional water sprays create mud and slip hazards",
                "Worker respiratory illness and long-term health risks",
                "Community complaints and negative publicity",
                "Project delays due to regulatory shutdowns",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400">
                  <span className="text-amber-400 mt-1 shrink-0">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-spray-500/20 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The 100Cooling Solution</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              High-pressure misting creates billions of micro-droplets that collide with airborne dust particles, increasing their weight and causing them to fall out of the air instead of spreading. Our systems use 70-90% less water than traditional dust suppression while achieving significantly better results.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Up to 90% dust reduction",
                "OSHA-compliant air quality",
                "70-90% less water usage",
                "Portable tower systems available",
                "No muddy ground conditions",
                "Works on demolition and excavation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-spray-400">
                  <CheckCircle size={16} weight="fill" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Where This Solution Works</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {["Construction Sites", "Mining Operations", "Material Handling", "Demolition Sites", "Rock Crushing", "Bulk Storage"].map((item) => (
              <div key={item} className="glass-card rounded-2xl p-4 text-center">
                <h3 className="text-white font-semibold text-sm">{item}</h3>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <FAQSection title="Dust Control FAQ" faqs={industrialFAQs} accentColor="amber" />

          <div className="text-center glass-card-strong rounded-2xl p-10 border-spray-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Need Dust Control for Your Site?</h2>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Request Dust Suppression Quote
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
