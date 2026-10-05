import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/sections/FAQSection";
import { agricultureFAQs } from "@/lib/seo-faqs";
import {
  Barn, ArrowRight, CheckCircle, Plant, Drop, Cow,
} from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Agricultural Misting Systems | Greenhouse & Livestock Cooling | 100Cooling",
    description: "Agricultural misting systems for greenhouse cooling, livestock heat stress relief, and poultry farm ventilation. Reduce barn temperatures 10°C, improve milk yield 20%, lower poultry mortality.",
    alternates: {
      canonical: `/${locale}/applications/agriculture`,
      languages: {
        en: "/en/applications/agriculture",
        ar: "/ar/applications/agriculture",
        es: "/es/applications/agriculture",
        fr: "/fr/applications/agriculture",
      },
    },
  };
}

const subApplications = [
  {
    title: "Greenhouse Misting",
    description: "Maintain optimal temperature and humidity levels for crop growth. Our fine mist systems prevent heat stress on plants without over-wetting foliage, reducing disease risk while maximizing yields.",
    benefits: ["Precise humidity control", "Temperature reduction up to 10°C", "Reduced water usage vs. traditional irrigation"],
  },
  {
    title: "Livestock Cooling",
    description: "Heat stress reduces milk production by up to 20% and increases mortality rates. Our high-pressure cooling systems create comfortable microclimates in dairy barns and feedlots, maintaining animal welfare and productivity.",
    benefits: ["Improved milk production", "Reduced heat-related mortality", "Better feed conversion ratios"],
  },
  {
    title: "Poultry Farm Cooling",
    description: "Poultry are especially susceptible to heat stress. Our systems maintain optimal barn temperatures during hot weather, reducing mortality and improving egg production and meat quality.",
    benefits: ["Lower mortality rates in heat waves", "Improved egg production consistency", "Better weight gain in broilers"],
  },
];

export default async function AgriculturePage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span className="text-gray-400">Agriculture</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium tracking-wider mb-6">
                <Barn size={14} weight="fill" />
                AGRICULTURE
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
                Protect <span className="text-gradient-spray">Livestock</span> & Improve Yields
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Precision misting systems for greenhouses, dairy farms, and poultry operations. Maintain optimal conditions to protect animals and maximize crop productivity.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
                Request a Farm Assessment
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "20%", label: "More Milk" },
                { value: "10°C", label: "Temp Drop" },
                { value: "40%", label: "Less Water" },
                { value: "24/7", label: "Operation" },
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
              Agricultural Solutions
            </h2>
            <div className="space-y-6">
              {subApplications.map((app, i) => (
                <div key={app.title} className="glass-card rounded-2xl p-6 md:p-8 border-spray-500/10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg font-bold shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{app.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4 pl-14">{app.description}</p>
                  <div className="pl-14 flex flex-wrap gap-3">
                    {app.benefits.map((b) => (
                      <span key={b} className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
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
              <Cow size={32} className="text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Animal Welfare</h3>
              <p className="text-gray-400 text-sm">Reduce heat stress and improve comfort for healthier, more productive livestock.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Plant size={32} className="text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Crop Optimization</h3>
              <p className="text-gray-400 text-sm">Maintain ideal greenhouse conditions for faster growth and higher yields.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Drop size={32} className="text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Water Efficient</h3>
              <p className="text-gray-400 text-sm">Fine mist droplets maximize cooling while using significantly less water.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection title="Agricultural Misting System FAQs" faqs={agricultureFAQs} accentColor="emerald" />

          {/* CTA */}
          <div className="text-center glass-card-strong rounded-2xl p-10 border-spray-500/20">
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">
              Optimize Your Farm or Greenhouse
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Request a Farm Assessment
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
