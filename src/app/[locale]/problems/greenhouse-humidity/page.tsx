import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plant, ArrowRight, CheckCircle, Barn } from "@phosphor-icons/react/dist/ssr";
import FAQSection from "@/components/sections/FAQSection";
import { agricultureFAQs } from "@/lib/seo-faqs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Greenhouse Humidity Control Systems | Misting for Optimal Growing | 100Cooling",
    description: "Precision greenhouse misting systems for temperature and humidity control. Prevent heat stress, reduce disease, and maximize crop yields with fine-droplet technology.",
    alternates: {
      canonical: `/${locale}/problems/greenhouse-humidity`,
      languages: {
        en: "/en/problems/greenhouse-humidity",
        ar: "/ar/problems/greenhouse-humidity",
        es: "/es/problems/greenhouse-humidity",
        fr: "/fr/problems/greenhouse-humidity",
      },
    },
  };
}

export default async function GreenhousePage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span className="text-gray-400">Greenhouse Humidity Control</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium tracking-wider mb-6">
            <Plant size={14} weight="fill" />
            PROBLEM: GREENHOUSE CONDITIONS
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Optimize Growth with <span className="text-gradient-spray">Precision Humidity</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Greenhouse temperatures can spike 10-15°C above ambient on sunny days. Without proper humidity control, plants experience heat stress, transpiration rates skyrocket, and disease pressure increases. Traditional irrigation can&apos;t cool the air — it just wets the soil.
          </p>

          <div className="glass-card rounded-2xl p-6 md:p-8 border-emerald-500/10 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
            <ul className="space-y-3">
              {[
                "Temperature spikes cause heat stress and reduced yields",
                "Low humidity increases transpiration and water demand",
                "High humidity encourages fungal diseases and mold",
                "Inconsistent conditions stunt growth and reduce quality",
                "Traditional cooling is energy-intensive and imprecise",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400">
                  <span className="text-emerald-400 mt-1 shrink-0">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-spray-500/20 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The 100Cooling Solution</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our high-pressure misting creates billions of 5-15 micron droplets that evaporate instantly, cooling the air while adding precisely controlled humidity. The system can be triggered by temperature and humidity sensors for fully automated climate management.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Precise temperature and humidity control",
                "Up to 10°C greenhouse cooling",
                "Reduces fungal disease pressure",
                "Sensor-triggered automated operation",
                "Uses 40% less water than traditional methods",
                "Compatible with existing greenhouse infrastructure",
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
            {["Vegetable Greenhouses", "Flower Nurseries", "Hydroponic Farms", "Seedling Propagation", "Research Facilities", "Indoor Vertical Farms"].map((item) => (
              <div key={item} className="glass-card rounded-2xl p-4 text-center">
                <h3 className="text-white font-semibold text-sm">{item}</h3>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <FAQSection title="Greenhouse Humidity FAQ" faqs={agricultureFAQs} accentColor="emerald" />

          <div className="text-center glass-card-strong rounded-2xl p-10 border-spray-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Optimize Your Greenhouse Climate</h2>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Request Greenhouse Assessment
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
