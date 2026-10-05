import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Thermometer, ArrowRight, CheckCircle, Buildings, House, Storefront } from "@phosphor-icons/react/dist/ssr";
import FAQSection from "@/components/sections/FAQSection";
import { generalMistingFAQs } from "@/lib/seo-faqs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "How to Cool Outdoor Spaces in Extreme Heat | Hotel & Restaurant Cooling | 100Cooling",
    description: "High outdoor temperatures killing your revenue? Learn how high-pressure misting systems reduce temperatures by 8-15°C without wetting surfaces. Solutions for hotels, restaurants, and residential patios.",
    alternates: {
      canonical: `/${locale}/problems/high-outdoor-temperature`,
      languages: {
        en: "/en/problems/high-outdoor-temperature",
        ar: "/ar/problems/high-outdoor-temperature",
        es: "/es/problems/high-outdoor-temperature",
        fr: "/fr/problems/high-outdoor-temperature",
      },
    },
  };
}

export default async function HighTempPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span className="text-gray-400">High Outdoor Temperature</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-medium tracking-wider mb-6">
            <Thermometer size={14} weight="fill" />
            PROBLEM: HIGH OUTDOOR TEMPERATURE
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Don&apos;t Let High Temperatures <span className="text-gradient-spray">Drive Customers Away</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            When outdoor temperatures exceed 32°C, restaurant patio occupancy drops by 60%. Hotel poolside F&B revenue plummets. Resort guests retreat indoors. It&apos;s not just uncomfortable — it&apos;s a direct hit to your bottom line.
          </p>

          {/* The Problem */}
          <div className="glass-card rounded-2xl p-6 md:p-8 border-red-500/10 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
            <ul className="space-y-3">
              {[
                "Open-air spaces constantly pull in hot air — traditional AC is useless outdoors",
                "Fans just blow hot air around, providing zero net cooling effect",
                "Guests leave early, reducing average spend per visit",
                "Seasonal revenue limitations — outdoor spaces unusable for months",
                "Competitors with cooling systems capture market share",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400">
                  <span className="text-red-400 mt-1 shrink-0">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* The Solution */}
          <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-spray-500/20 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The 100Cooling Solution</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our 150-bar high-pressure pump forces water through 0.15mm ceramic nozzles, creating 5-15 micron droplets. These micro-droplets flash-evaporate in mid-air, absorbing 2,257 kJ of heat per liter of water. The result: an instant 8-15°C temperature reduction — without wetting any surface.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "8-15°C instant cooling",
                "Zero wet surfaces or furniture",
                "Invisible to guests — just feels like cool air",
                "90% less energy than equivalent AC",
                "Works in fully open-air environments",
                "Smart scheduling via IoT hub",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-spray-400">
                  <CheckCircle size={16} weight="fill" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <h2 className="text-2xl font-bold text-white mb-6">Where This Solution Works</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <Link href="/applications/commercial-hospitality" className="glass-card rounded-2xl p-5 text-center hover:border-spray-500/30 transition-colors">
              <Buildings size={28} className="text-spray-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold text-sm">Hotels & Resorts</h3>
            </Link>
            <Link href="/applications/commercial-hospitality" className="glass-card rounded-2xl p-5 text-center hover:border-spray-500/30 transition-colors">
              <Storefront size={28} className="text-spray-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold text-sm">Restaurants & Bars</h3>
            </Link>
            <Link href="/applications/residential" className="glass-card rounded-2xl p-5 text-center hover:border-spray-500/30 transition-colors">
              <House size={28} className="text-spray-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold text-sm">Residential Patios</h3>
            </Link>
          </div>

          {/* FAQ */}
          <FAQSection title="Outdoor Cooling FAQ" faqs={generalMistingFAQs} accentColor="spray" />

          {/* CTA */}
          <div className="text-center glass-card-strong rounded-2xl p-10 border-spray-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Cool Your Outdoor Space?
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Request a Free Assessment
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
