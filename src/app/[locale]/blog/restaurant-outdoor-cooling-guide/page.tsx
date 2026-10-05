export const dynamicParams = false;
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Storefront,
  ArrowRight,
  CheckCircle,
  CurrencyDollar,
  ChartLineUp,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import FAQSection from "@/components/sections/FAQSection";
import { restaurantPatioFAQs } from "@/lib/seo-faqs";
import { FAQSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Restaurant Outdoor Cooling Guide | Increase Patio Revenue 30-60% | 100Cooling",
    description:
      "Complete guide to restaurant patio cooling. High-pressure misting systems increase outdoor seating revenue by 30-60%. Cooling solutions for restaurants, bars, and outdoor dining areas.",
    alternates: {
      canonical: `/${locale}/blog/restaurant-outdoor-cooling-guide`,
      languages: {
        en: "/en/blog/restaurant-outdoor-cooling-guide",
        ar: "/ar/blog/restaurant-outdoor-cooling-guide",
        es: "/es/blog/restaurant-outdoor-cooling-guide",
        fr: "/fr/blog/restaurant-outdoor-cooling-guide",
      },
    },
  };
}

const revenueStats = [
  { value: "30-60%", label: "Revenue Increase" },
  { value: "2-4 hrs", label: "Extended Hours" },
  { value: "90%", label: "Less Energy vs AC" },
  { value: "6-12 mo", label: "ROI Payback" },
];

const caseStudies = [
  {
    name: "Seaside Grill — Miami, FL",
    challenge: "Outdoor dining dropped 80% during June-September. Customer complaints about heat.",
    solution: "32-nozzle high-pressure system along patio perimeter and 2 misting fans.",
    result: "Outdoor seating revenue fully recovered by week 3. 40% increase vs. previous year.",
  },
  {
    name: "Cactus Bistro — Phoenix, AZ",
    challenge: "110°F summer temperatures. Patio completely unused May-October.",
    solution: "48-nozzle system with smart scheduling (auto-on at 85°F).",
    result: "Patio now operates 6 months/year. $180,000 additional annual revenue.",
  },
  {
    name: "Harbor Rooftop Bar — Dubai, UAE",
    challenge: "Middle East summer (45°C+). Rooftop bar unusable 5 months/year.",
    solution: "64-nozzle system with corrosion-resistant 316L components.",
    result: "Extended season by 3.5 months. 200+ additional covers per weekend.",
  },
];

export default async function RestaurantCoolingGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Restaurant Outdoor Cooling Guide",
            description:
              "How restaurants use high-pressure misting to increase outdoor seating revenue by 30-60%.",
            author: { "@type": "Organization", name: "100Cooling" },
            publisher: { "@type": "Organization", name: "100Cooling" },
            datePublished: "2026-01-10",
            dateModified: "2026-06-07",
          }),
        }}
      />
      <FAQSchema questions={restaurantPatioFAQs} />
      <Navbar />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/blog" className="hover:text-spray-400 transition-colors">
              Blog
            </Link>
            <ArrowRight size={14} />
            <Link href="/applications" className="hover:text-spray-400 transition-colors">
              Applications
            </Link>
            <ArrowRight size={14} />
            <span className="text-gray-400">Restaurant Cooling</span>
          </div>

          {/* Hero */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-spray-500/20 bg-spray-500/5 text-spray-400 text-xs font-medium tracking-wider mb-6">
            <Storefront size={14} weight="fill" />
            RESTAURANT & BAR COOLING
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Restaurant Outdoor Cooling: The{" "}
            <span className="text-gradient-spray">Complete Revenue Guide</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-3xl">
            When temperatures exceed 32°C, patio occupancy drops by 60%. Every
            unseated table is lost revenue. High-pressure misting systems are the
            proven solution — increasing outdoor seating revenue by 30-60% while
            extending usable hours by 2-4 hours daily.
          </p>

          {/* Revenue Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {revenueStats.map((s) => (
              <div key={s.label} className="glass-card-strong rounded-2xl p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-spray-400 mb-1">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          {/* The Problem Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-6">
              The $50,000 Problem: What Heat Does to Your Patio Revenue
            </h2>
            <div className="glass-card rounded-2xl p-6 md:p-8 border-spray-500/10 mb-6">
              <p className="text-gray-400 leading-relaxed mb-4">
                Outdoor dining is the highest-margin seating area for most restaurants.
                No additional rent, no interior buildout costs — just pure revenue from
                existing space. But when temperatures climb above 32°C (90°F), guest
                tolerance collapses.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                <strong className="text-white">The data is stark:</strong> for every
                1°C above 30°C, outdoor dining reservations drop by 8-12%. By
                38°C, patio seating is effectively 0% occupied. A 100-seat restaurant
                with 40 patio seats loses $800-$1,500 per day in summer.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Fans help — but only by creating air movement, not cooling. A fan blowing
                35°C air just moves hot air around. The only solution that actively
                reduces ambient temperature is evaporative misting.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Outdoor seating drops 60% at 32°C+",
                "Average loss: $800-$1,500/day per restaurant",
                "Fans just move hot air — no cooling effect",
                "Guests leave within 20 minutes if too hot",
                "Negative reviews spike during heat waves",
                "Competitors with cooling capture your market",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-red-400 mt-1 shrink-0">×</span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* How Misting Solves It */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-6">
              How High-Pressure Misting Solves the Revenue Problem
            </h2>
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-spray-500/20 mb-6">
              <p className="text-gray-400 leading-relaxed mb-4">
                High-pressure misting (150 bar / 2,175 PSI) forces water through
                0.15mm ceramic nozzles, creating 5-15 micron droplets. These
                micro-droplets flash-evaporate in mid-air, absorbing 2,257 kJ of
                heat per liter of water. The result: an instant 8-15°C temperature
                reduction — without wetting any surface.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                <strong className="text-white">Why "no wetting" matters for restaurants:</strong>{" "}
                Competing low-pressure systems (30-100 PSI) produce 50-200 micron
                droplets that fall onto tables, menus, food, and guests. Professional
                high-pressure systems produce droplets so small they evaporate completely
                before reaching any surface. Guests feel only cool, dry air.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Smart controllers automate operation — the system turns on automatically
                when outdoor temperature exceeds your preset threshold (typically 28-30°C).
                Zone control allows different areas to operate independently based on
                real-time conditions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "8-15°C instant temperature reduction",
                "Zero wet surfaces — food and menus stay dry",
                "40-60% increase in outdoor seating revenue",
                "Extended operating hours by 2-4 hours daily",
                "Automated weather-based scheduling",
                "90% less energy cost than equivalent AC",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-spray-400">
                  <CheckCircle size={16} weight="fill" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* System Options */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-8">
              Restaurant Misting System Options
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Misting Line Systems (Most Popular)",
                  description:
                    "Stainless steel tubing runs along patio edges, pergola beams, umbrella poles, or building facades. Nozzles are spaced every 0.6-1.2m to create an even curtain of cooling mist.",
                  bestFor: "Permanent patio installations, pergolas, building-mounted",
                  investment: "$15,000 - $25,000",
                },
                {
                  title: "Misting Fan Systems",
                  description:
                    "Combines high-pressure misting nozzles with directional fans. The fan distributes cooled air over a larger area. Ideal for open-air sections without overhead structure.",
                  bestFor: "Open patios without overhead cover, large spanning areas",
                  investment: "$8,000 - $18,000",
                },
                {
                  title: "Portable Misting Towers",
                  description:
                    "Freestanding towers with built-in pump, nozzles, and fan. No installation required — just plug into water and power. Perfect for seasonal use or rented event spaces.",
                  bestFor: "Seasonal patios, temporary outdoor setups, events",
                  investment: "$5,000 - $12,000",
                },
              ].map((opt, i) => (
                <div key={opt.title} className="glass-card rounded-2xl p-6 md:p-8 border-spray-500/10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-spray-500/10 border border-spray-500/20 flex items-center justify-center text-spray-400 text-lg font-bold shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{opt.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4 pl-14">{opt.description}</p>
                  <div className="pl-14 grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="text-gray-500">
                      <span className="text-gray-400">Best for: </span>
                      {opt.bestFor}
                    </div>
                    <div className="text-gray-500">
                      <span className="text-gray-400">Investment: </span>
                      <span className="text-spray-400 font-semibold">{opt.investment}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ROI Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-6">
              ROI Analysis: When Does Your System Pay for Itself?
            </h2>
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-spray-500/20">
              <p className="text-gray-400 leading-relaxed mb-4">
                <strong className="text-white">Typical Scenario:</strong> 100-seat restaurant,
                40 patio seats. Average check $45, patio dinner turnover 1.5x/night,
                7 days/week operation in summer.
              </p>
              <div className="bg-deep-900 rounded-xl p-5 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Additional daily covers (40 seats × 60% increase)</div>
                    <div className="text-white font-semibold text-lg">24 covers/night</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Additional daily revenue (24 × $45 avg check)</div>
                    <div className="text-spray-400 font-semibold text-lg">$1,080/night</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Monthly summer revenue (June-Sept)</div>
                    <div className="text-white font-semibold text-lg">$129,600</div>
                  </div>
                  <div>
                    <div className="text-gray-500">System cost (mid-size restaurant)</div>
                    <div className="text-red-400 font-semibold text-lg">$22,000</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                <strong className="text-spray-400">Payback period: 20-45 days of summer operation.</strong>{" "}
                After the first season, the system generates pure profit. Most restaurants
                recover their full investment within 1-2 summer seasons.
              </p>
            </div>
          </section>

          {/* Case Studies */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-8">
              Real Restaurant Installations: Before & After
            </h2>
            <div className="space-y-6">
              {caseStudies.map((cs) => (
                <div key={cs.name} className="glass-card rounded-2xl p-6 md:p-8 border-spray-500/10">
                  <h3 className="text-xl font-bold text-white mb-4">{cs.name}</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Challenge</div>
                      <div className="text-gray-400">{cs.challenge}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Solution</div>
                      <div className="text-gray-400">{cs.solution}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Result</div>
                      <div className="text-spray-400 font-semibold">{cs.result}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <FAQSection title="Restaurant Patio Cooling FAQ" faqs={restaurantPatioFAQs} accentColor="spray" />

          {/* CTA */}
          <div className="text-center glass-card-strong rounded-2xl p-10 md:p-12 border-spray-500/20 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              Ready to Reclaim Your Patio Revenue?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our engineering team will assess your patio layout, calculate coverage
              requirements, and design a custom misting system. Backed by 9+ years of
              experience and 3,200+ successful installations worldwide.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors"
            >
              Request a Free Venue Assessment
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
