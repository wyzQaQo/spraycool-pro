import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Cow, ArrowRight, CheckCircle, Barn } from "@phosphor-icons/react/dist/ssr";
import FAQSection from "@/components/sections/FAQSection";
import { agricultureFAQs } from "@/lib/seo-faqs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Livestock Heat Stress Cooling Systems | Dairy & Poultry Farms | 100Cooling",
    description: "Protect dairy cows and poultry from heat stress with precision cooling systems. Reduce mortality, increase milk production, and improve feed conversion ratios.",
    alternates: {
      canonical: `/${locale}/problems/livestock-heat-stress`,
      languages: {
        en: "/en/problems/livestock-heat-stress",
        ar: "/ar/problems/livestock-heat-stress",
        es: "/es/problems/livestock-heat-stress",
        fr: "/fr/problems/livestock-heat-stress",
      },
    },
  };
}

export default async function LivestockPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span className="text-gray-400">Livestock Heat Stress</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-medium tracking-wider mb-6">
            <Cow size={14} weight="fill" />
            PROBLEM: LIVESTOCK HEAT STRESS
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Heat Stress <span className="text-gradient-spray">Costs You Money</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            When temperatures exceed 25°C, dairy cows begin experiencing heat stress. Milk production drops by up to 20%, conception rates plummet, and mortality rates rise. For poultry, heat stress is the leading cause of summer mortality in commercial operations.
          </p>

          <div className="glass-card rounded-2xl p-6 md:p-8 border-rose-500/10 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
            <ul className="space-y-3">
              {[
                "Milk production drops 10-20% during heat waves",
                "Reduced conception rates and fertility issues",
                "Increased mortality, especially in poultry",
                "Poor feed conversion and weight gain",
                "Veterinary costs and animal welfare concerns",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-400">
                  <span className="text-rose-400 mt-1 shrink-0">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-spray-500/20 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">The 100Cooling Solution</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our high-pressure cooling systems create a fine mist that evaporates in the air above livestock, absorbing heat and reducing barn temperatures by up to 10°C. The droplets are small enough to cool the air without wetting animals or bedding — maintaining hygiene while maximizing comfort.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Up to 10°C barn temperature reduction",
                "No wetting of animals or bedding",
                "Improved milk production",
                "Lower mortality rates",
                "Better feed conversion",
                "Automated temperature-triggered operation",
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
            <Link href="/applications/agriculture" className="glass-card rounded-2xl p-5 text-center hover:border-spray-500/30 transition-colors">
              <Barn size={28} className="text-spray-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold text-sm">Dairy Farms</h3>
            </Link>
            <Link href="/applications/agriculture" className="glass-card rounded-2xl p-5 text-center hover:border-spray-500/30 transition-colors">
              <Barn size={28} className="text-spray-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold text-sm">Poultry Operations</h3>
            </Link>
          </div>

          {/* FAQ */}
          <FAQSection title="Livestock Cooling FAQ" faqs={agricultureFAQs} accentColor="rose" />

          <div className="text-center glass-card-strong rounded-2xl p-10 border-spray-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">Protect Your Livestock from Heat</h2>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Request Farm Cooling Quote
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
