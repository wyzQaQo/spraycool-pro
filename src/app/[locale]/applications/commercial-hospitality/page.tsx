export const dynamicParams = false;
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Buildings, ArrowRight, Thermometer, CheckCircle, Clock, Users,
} from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Commercial & Hospitality Cooling Systems | Hotels, Resorts & Restaurants | 100Cooling",
    description: "High-pressure outdoor cooling systems for hotels, resorts, restaurants, beach clubs, and theme parks. Keep guests comfortable and extend outdoor seasons. 8-15°C cooling without wetting surfaces.",
    alternates: {
      canonical: `/${locale}/applications/commercial-hospitality`,
      languages: {
        en: "/en/applications/commercial-hospitality",
        ar: "/ar/applications/commercial-hospitality",
        es: "/es/applications/commercial-hospitality",
        fr: "/fr/applications/commercial-hospitality",
      },
    },
  };
}

const subApplications = [
  {
    title: "Hotel Cooling Systems",
    description: "Transform poolside areas, terraces, and outdoor lobbies into comfortable guest spaces. High-pressure misting delivers 8-15°C cooling without wetting furniture or guests.",
    benefits: ["Extended poolside hours", "Higher guest satisfaction scores", "Increased F&B revenue from outdoor seating"],
  },
  {
    title: "Resort Cooling Systems",
    description: "Create microclimates across sprawling resort properties. From beachfront cabanas to garden walkways, maintain consistent comfort for guests.",
    benefits: ["Year-round outdoor operation", "Reduced HVAC load on indoor spaces", "Premium guest experience differentiation"],
  },
  {
    title: "Restaurant Patio Cooling",
    description: "Don't let high temperatures drive customers away. Our invisible cooling system keeps patio diners comfortable without any moisture on tables or food.",
    benefits: ["30-60% increase in outdoor seating revenue", "Zero wet surfaces", "Works in open-air and semi-enclosed patios"],
  },
  {
    title: "Beach Club Cooling",
    description: "Coastal environments combine intense sun with high humidity. Our systems are engineered for saline air and sand exposure while delivering consistent cooling.",
    benefits: ["Corrosion-resistant stainless steel components", "Salt-air compatible filtration", "All-day guest comfort"],
  },
  {
    title: "Theme Park Cooling",
    description: "Keep visitors cool in queue lines, outdoor theaters, and dining areas. Reduce heat-related complaints and extend peak-season operating hours.",
    benefits: ["Queue line cooling reduces perceived wait times", "Theater and show venue comfort", "Reduced heat stress on staff"],
  },
];

const stats = [
  { value: "8-15°C", label: "Temperature Reduction" },
  { value: "5-15μm", label: "Droplet Size" },
  { value: "0%", label: "Surface Wetting" },
  { value: "24/7", label: "Continuous Operation" },
];

export default async function CommercialHospitalityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/applications" className="hover:text-spray-400 transition-colors">Applications</Link>
            <ArrowRight size={14} />
            <span className="text-gray-400">Commercial & Hospitality</span>
          </div>

          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-spray-500/20 bg-spray-500/5 text-spray-400 text-xs font-medium tracking-wider mb-6">
                <Buildings size={14} weight="fill" />
                COMMERCIAL & HOSPITALITY
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
                Keep Guests <span className="text-gradient-spray">Comfortable</span> Even in Extreme Heat
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                High-pressure outdoor cooling systems engineered for hotels, resorts, restaurants, and entertainment venues. Transform outdoor spaces into year-round revenue generators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors"
                >
                  Request a Quote
                  <ArrowRight size={18} weight="bold" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-spray-500/30 text-spray-400 font-medium hover:bg-spray-500/10 transition-colors"
                >
                  View Products
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card-strong rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-spray-400 mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Message */}
          <div className="glass-card-strong rounded-2xl p-8 md:p-10 mb-16 border-spray-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center shrink-0">
                <Thermometer size={24} className="text-spray-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Don't Let High Temperatures Drive Customers Away
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  When outdoor temperatures exceed 32°C, restaurant patio occupancy drops by 60%. Hotel poolside F&B revenue plummets. Resort guests retreat indoors. Our high-pressure misting systems create an invisible cooling curtain that reduces perceived temperatures by 8-15°C — without wetting surfaces, furniture, or guests.
                </p>
              </div>
            </div>
          </div>

          {/* Sub-Applications */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-8">
              Solutions by Venue Type
            </h2>
            <div className="space-y-6">
              {subApplications.map((app, i) => (
                <div
                  key={app.title}
                  className="glass-card rounded-2xl p-6 md:p-8 border-spray-500/10 hover:border-spray-500/25 transition-all duration-500"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-spray-500/10 border border-spray-500/20 flex items-center justify-center text-spray-400 text-lg font-bold shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{app.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-4 pl-14">
                    {app.description}
                  </p>
                  <div className="pl-14 flex flex-wrap gap-3">
                    {app.benefits.map((benefit) => (
                      <span key={benefit} className="inline-flex items-center gap-1.5 text-sm text-spray-400">
                        <CheckCircle size={14} weight="fill" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why 100Cooling */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card rounded-2xl p-6 text-center">
              <Clock size={32} className="text-spray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Rapid Deployment</h3>
              <p className="text-gray-400 text-sm">Most commercial installations completed in 2-5 days with minimal disruption to operations.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Users size={32} className="text-spray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Invisible Comfort</h3>
              <p className="text-gray-400 text-sm">5-15 micron droplets flash-evaporate before touching any surface. Guests feel only cool, dry air.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <CheckCircle size={32} className="text-spray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Smart Control</h3>
              <p className="text-gray-400 text-sm">IoT-enabled scheduling, zone control, and weather-responsive automation via mobile app.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center glass-card-strong rounded-2xl p-10 md:p-12 border-spray-500/20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              Ready to Transform Your Outdoor Spaces?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our engineering team will assess your venue and design a custom cooling system tailored to your climate, layout, and budget.
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
