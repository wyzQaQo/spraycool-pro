import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/sections/FAQSection";
import { sportsEventsFAQs } from "@/lib/seo-faqs";
import {
  Trophy, ArrowRight, CheckCircle, SoccerBall, Users, TreePalm,
} from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Stadium & Sports Venue Cooling Systems | Outdoor Event Cooling | 100Cooling",
    description: "Stadium cooling, golf course misting, and outdoor event cooling systems. Portable misting towers for fast setup. Reduce heat-related incidents and improve spectator comfort by 8-15°C.",
    alternates: {
      canonical: `/${locale}/applications/events-sports`,
      languages: {
        en: "/en/applications/events-sports",
        ar: "/ar/applications/events-sports",
        es: "/es/applications/events-sports",
        fr: "/fr/applications/events-sports",
      },
    },
  };
}

const subApplications = [
  {
    title: "Stadium Cooling",
    description: "Cool spectator seating areas, athlete benches, and VIP sections during outdoor sporting events. Our systems can be temporarily installed for single events or permanently integrated into stadium infrastructure.",
    benefits: ["Temporary or permanent installation", "Covers large seating areas", "Reduces heat-related medical incidents"],
  },
  {
    title: "Outdoor Event Cooling",
    description: "From music festivals to corporate events, keep attendees comfortable in outdoor venues. Portable misting towers and fixed line systems provide flexible cooling for any event layout.",
    benefits: ["Portable tower systems", "Rapid setup and takedown", "Improved attendee satisfaction"],
  },
  {
    title: "Golf Course Cooling",
    description: "Cool driving ranges, outdoor seating at clubhouses, and tournament spectator areas. Extend comfortable playing hours and improve the golfer experience during hot summer months.",
    benefits: ["Driving range comfort", "Clubhouse patio cooling", "Tournament spectator areas"],
  },
];

export default async function EventsSportsPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <span className="text-gray-400">Events & Sports</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-medium tracking-wider mb-6">
                <Trophy size={14} weight="fill" />
                EVENTS & SPORTS
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
                Keep Athletes & <span className="text-gradient-spray">Spectators</span> Cool
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                High-pressure outdoor cooling for stadiums, sports venues, golf courses, and outdoor events. Portable and permanent solutions for any scale.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
                Request Event Cooling Quote
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "8-15°C", label: "Cooler" },
                { value: "Portable", label: "Options" },
                { value: "10k+", label: "m² Coverage" },
                { value: "Fast", label: "Setup" },
              ].map((s) => (
                <div key={s.label} className="glass-card-strong rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-violet-400 mb-1">{s.value}</div>
                  <div className="text-gray-400 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-8">
              Sports & Event Solutions
            </h2>
            <div className="space-y-6">
              {subApplications.map((app, i) => (
                <div key={app.title} className="glass-card rounded-2xl p-6 md:p-8 border-violet-500/10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-lg font-bold shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{app.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4 pl-14">{app.description}</p>
                  <div className="pl-14 flex flex-wrap gap-3">
                    {app.benefits.map((b) => (
                      <span key={b} className="inline-flex items-center gap-1.5 text-sm text-violet-400">
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
              <SoccerBall size={32} className="text-violet-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Athlete Performance</h3>
              <p className="text-gray-400 text-sm">Maintain optimal body temperature for peak athletic performance.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Users size={32} className="text-violet-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Fan Experience</h3>
              <p className="text-gray-400 text-sm">Keep spectators comfortable and extend their time at venues.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <TreePalm size={32} className="text-violet-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Flexible Setup</h3>
              <p className="text-gray-400 text-sm">Portable towers and permanent installations for any event type.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection title="Sports & Events Misting System FAQs" faqs={sportsEventsFAQs} accentColor="violet" />

          {/* CTA */}
          <div className="text-center glass-card-strong rounded-2xl p-10 border-spray-500/20">
            <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">
              Planning an Outdoor Event or Venue Upgrade?
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Request Event Cooling Quote
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
