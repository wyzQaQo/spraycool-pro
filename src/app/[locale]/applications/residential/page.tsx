import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/sections/FAQSection";
import { residentialFAQs } from "@/lib/seo-faqs";
import {
  House, ArrowRight, Thermometer, CheckCircle, Sun, TreePalm,
} from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Residential Outdoor Cooling Systems | Backyard & Patio Misting | 100Cooling",
    description: "Patio misting systems and backyard cooling solutions. Install high-pressure outdoor misting on pergolas, pool decks, and fences. 8-15°C cooling, zero wet surfaces, smart app control.",
    alternates: {
      canonical: `/${locale}/applications/residential`,
      languages: {
        en: "/en/applications/residential",
        ar: "/ar/applications/residential",
        es: "/es/applications/residential",
        fr: "/fr/applications/residential",
      },
    },
  };
}

const subApplications = [
  {
    title: "Backyard Misting Systems",
    description: "Turn your backyard into a cool retreat for family gatherings, BBQs, and poolside relaxation. Our discreet stainless steel tubing runs along fences, pergolas, or hidden in landscaping.",
    benefits: ["Invisible installation options", "Cool zones up to 200m²", "Mosquito control add-on available"],
  },
  {
    title: "Patio Cooling Systems",
    description: "Enjoy your patio even on the hottest days. High-pressure misting creates a comfortable microclimate over dining and seating areas without any moisture on furniture.",
    benefits: ["Zero wet surfaces", "Works in open and covered patios", "Smart scheduling via app"],
  },
  {
    title: "Garden Cooling Solutions",
    description: "Create a refreshing garden experience. Our systems can be integrated with existing irrigation and landscape lighting for a unified outdoor living solution.",
    benefits: ["Subtle misting along pathways", "Plant-safe water quality", "Custom zone control"],
  },
];

export default async function ResidentialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/applications" className="hover:text-spray-400 transition-colors">Applications</Link>
            <ArrowRight size={14} />
            <span className="text-gray-400">Residential</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-spray-500/20 bg-spray-500/5 text-spray-400 text-xs font-medium tracking-wider mb-6">
                <House size={14} weight="fill" />
                RESIDENTIAL
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
                Your Backyard, <span className="text-gradient-spray">Cooler</span> Than Ever
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Transform your outdoor living spaces into comfortable retreats. From backyard BBQs to poolside lounging, enjoy the outdoors even in peak summer heat.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors"
              >
                Get a Free Quote
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "8-15°C", label: "Cooler" },
                { value: "0%", label: "Wetness" },
                { value: "5yr", label: "Warranty" },
                { value: "24/7", label: "Support" },
              ].map((s) => (
                <div key={s.label} className="glass-card-strong rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-spray-400 mb-1">{s.value}</div>
                  <div className="text-gray-400 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-8">
              Residential Solutions
            </h2>
            <div className="space-y-6">
              {subApplications.map((app, i) => (
                <div key={app.title} className="glass-card rounded-2xl p-6 md:p-8 border-spray-500/10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-spray-500/10 border border-spray-500/20 flex items-center justify-center text-spray-400 text-lg font-bold shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{app.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4 pl-14">{app.description}</p>
                  <div className="pl-14 flex flex-wrap gap-3">
                    {app.benefits.map((b) => (
                      <span key={b} className="inline-flex items-center gap-1.5 text-sm text-spray-400">
                        <CheckCircle size={14} weight="fill" />{b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card rounded-2xl p-6 text-center">
              <Sun size={32} className="text-spray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Heat Relief</h3>
              <p className="text-gray-400 text-sm">Enjoy your outdoor spaces even when temperatures exceed 35°C.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <TreePalm size={32} className="text-spray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Discreet Design</h3>
              <p className="text-gray-400 text-sm">Stainless steel lines blend into fences, pergolas, and landscaping.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Thermometer size={32} className="text-spray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Smart Control</h3>
              <p className="text-gray-400 text-sm">App-based scheduling and weather-responsive automation.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection title="Residential Misting System FAQs" faqs={residentialFAQs} accentColor="spray" />

          {/* CTA */}
          <div className="text-center glass-card-strong rounded-2xl p-10 border-spray-500/20">
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">
              Ready to Cool Your Outdoor Space?
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Request a Free Quote
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
