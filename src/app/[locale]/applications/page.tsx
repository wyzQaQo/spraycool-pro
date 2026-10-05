import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Buildings, House, Barn, Factory, Trophy, ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: "Outdoor Cooling Applications | Commercial, Residential, Agriculture & Industrial | 100Cooling",
    description: "Explore outdoor cooling and misting applications for hotels, resorts, restaurants, agriculture, industrial facilities, and sports venues. Find your solution.",
    alternates: {
      canonical: `/${locale}/applications`,
      languages: {
        en: "/en/applications",
        ar: "/ar/applications",
        es: "/es/applications",
        fr: "/fr/applications",
      },
    },
  };
}

const categories = [
  {
    title: "Commercial & Hospitality",
    description: "Keep guests comfortable at hotels, resorts, restaurants, beach clubs, and theme parks. Extend outdoor seating seasons and boost revenue.",
    icon: Buildings,
    href: "/applications/commercial-hospitality",
    items: ["Hotel Cooling Systems", "Resort Cooling Systems", "Restaurant Patio Cooling", "Beach Club Cooling", "Theme Park Cooling"],
  },
  {
    title: "Residential",
    description: "Transform your backyard, patio, or garden into a cool oasis. Enjoy outdoor living even in the hottest summer months.",
    icon: House,
    href: "/applications/residential",
    items: ["Backyard Misting Systems", "Patio Cooling Systems", "Garden Cooling Solutions"],
  },
  {
    title: "Agriculture",
    description: "Protect livestock from heat stress, maintain optimal greenhouse humidity, and improve crop yields with precision misting.",
    icon: Barn,
    href: "/applications/agriculture",
    items: ["Greenhouse Misting", "Livestock Cooling", "Poultry Farm Cooling"],
  },
  {
    title: "Industrial",
    description: "Suppress airborne dust at construction sites and mines. Cool warehouses and factory floors for safer, more productive operations.",
    icon: Factory,
    href: "/applications/industrial",
    items: ["Dust Suppression Systems", "Construction Site Dust Control", "Warehouse Cooling"],
  },
  {
    title: "Events & Sports",
    description: "Cool stadiums, outdoor event spaces, and golf courses. Keep athletes and spectators comfortable in extreme heat.",
    icon: Trophy,
    href: "/applications/events-sports",
    items: ["Stadium Cooling", "Outdoor Event Cooling", "Golf Course Cooling"],
  },
];

export default async function ApplicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
              Outdoor Cooling <span className="text-gradient-spray">Applications</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every outdoor environment has unique cooling challenges. Explore how 100Cooling systems are engineered for your specific application.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group glass-card-strong rounded-2xl p-8 border-spray-500/10 hover:border-spray-500/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center text-spray-400">
                      <Icon size={28} weight="duotone" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white group-hover:text-spray-300 transition-colors mb-2">
                        {cat.title}
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={24}
                      weight="bold"
                      className="text-gray-600 group-hover:text-spray-400 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pl-[72px]">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1.5 rounded-full bg-spray-500/5 border border-spray-500/10 text-gray-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">Not sure which application fits your needs?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors"
            >
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
