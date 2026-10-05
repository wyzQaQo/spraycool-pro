export const dynamicParams = false;
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Bug, ArrowRight, CheckCircle, Buildings, House } from "@phosphor-icons/react/dist/ssr";
import FAQSection from "@/components/sections/FAQSection";
import { mosquitoFAQs } from "@/lib/seo-faqs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Commercial Mosquito Control Systems for Resorts & Hotels | 100Cooling",
    description: "Automated mosquito misting systems for resorts, hotels, and outdoor venues. Create a 6-meter protective barrier with botanical repellent. Food-safe, EPA-registered formulas.",
    alternates: {
      canonical: `/${locale}/problems/mosquito-problems`,
      languages: {
        en: "/en/problems/mosquito-problems",
        ar: "/ar/problems/mosquito-problems",
        es: "/es/problems/mosquito-problems",
        fr: "/fr/problems/mosquito-problems",
      },
    },
  };
}

export default async function MosquitoPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span className="text-gray-400">Mosquito Problems</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-medium tracking-wider mb-6">
            <Bug size={14} weight="fill" />
            PROBLEM: MOSQUITO INFESTATION
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Mosquitoes Are <span className="text-gradient-spray">Killing Your Revenue</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Summer evenings are peak outdoor dining hours — and peak mosquito hours. A single negative review about mosquitoes can deter hundreds of potential guests. Traditional methods have limited range, short duration, and high labor costs.
          </p>

          <div className="glass-card rounded-2xl p-6 md:p-8 border-orange-500/10 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
            <ul className="space-y-3">
              {[
                "Guests leave early, cutting into evening F&B revenue",
                "Negative reviews specifically mention mosquitoes",
                "Citronella candles and coils have a 2-meter range at best",
                "Manual spraying is labor-intensive and inconsistent",
                "Chemical foggers require evacuation and have safety concerns",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400">
                  <span className="text-orange-400 mt-1 shrink-0">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-spray-500/20 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The 100Cooling Solution</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our peristaltic dosing pump injects measured amounts of botanical or synthetic repellent into the high-pressure misting line. The same 150-bar pressure atomizes the repellent into 5-15 micron droplets, creating a 6-meter high protective barrier around your venue. Schedule cooling by day, mosquito control by evening — one system, dual operation.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "6-meter protective barrier",
                "Fully automated scheduling",
                "EPA-registered botanical formulas",
                "Food-safe when used as directed",
                "Dual-mode: cooling + mosquito control",
                "Up to 10,000 m² coverage per system",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-spray-400">
                  <CheckCircle size={16} weight="fill" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Where This Solution Works</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <Link href="/applications/commercial-hospitality" className="glass-card rounded-2xl p-5 text-center hover:border-spray-500/30 transition-colors">
              <Buildings size={28} className="text-spray-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold text-sm">Resorts & Hotels</h3>
            </Link>
            <Link href="/applications/residential" className="glass-card rounded-2xl p-5 text-center hover:border-spray-500/30 transition-colors">
              <House size={28} className="text-spray-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold text-sm">Residential Villas</h3>
            </Link>
          </div>

          {/* FAQ */}
          <FAQSection title="Mosquito Control FAQ" faqs={mosquitoFAQs} accentColor="orange" />

          <div className="text-center glass-card-strong rounded-2xl p-10 border-spray-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Protect Your Guests from Mosquitoes</h2>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Request Mosquito Control Quote
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
