import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Thermometer, Bug, CloudFog, Cow, Plant, ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Outdoor Cooling Problems We Solve | Heat, Mosquitoes, Dust & More | 100Cooling",
    description: "Most customers search for solutions, not products. See how 100Cooling solves high outdoor temperatures, mosquito problems, dust control, livestock heat stress, and greenhouse humidity issues.",
    alternates: { canonical: `/${locale}/problems` },
  };
}

const problems = [
  {
    title: "High Outdoor Temperature",
    description: "Guests leave. Revenue drops. Outdoor spaces sit empty in peak summer months. Our high-pressure misting reduces perceived temperatures by 8-15°C without wetting surfaces.",
    icon: Thermometer,
    href: "/problems/high-outdoor-temperature",
    solves: ["Hotels", "Restaurants", "Patios", "Resorts"],
    color: "red",
  },
  {
    title: "Mosquito Problems",
    description: "Evening dining ruined. Guest complaints spike. Our automated mosquito control system creates a 6-meter protective barrier using botanical repellent infused into cooling mist.",
    icon: Bug,
    href: "/problems/mosquito-problems",
    solves: ["Resorts", "Villas", "Outdoor Venues", "Restaurants"],
    color: "orange",
  },
  {
    title: "Dust Control",
    description: "Airborne dust threatens worker health and regulatory compliance. Our high-pressure misting binds dust particles at the source, reducing airborne dust by up to 90%.",
    icon: CloudFog,
    href: "/problems/dust-control",
    solves: ["Construction Sites", "Mines", "Ports", "Warehouses"],
    color: "amber",
  },
  {
    title: "Livestock Heat Stress",
    description: "Heat stress reduces milk production by up to 20% and increases mortality. Our cooling systems maintain optimal barn temperatures for healthier, more productive animals.",
    icon: Cow,
    href: "/problems/livestock-heat-stress",
    solves: ["Dairy Farms", "Poultry Operations", "Feedlots"],
    color: "rose",
  },
  {
    title: "Greenhouse Humidity Control",
    description: "Improper humidity stunts growth and encourages mold. Our precision misting maintains ideal greenhouse conditions for maximum crop yields.",
    icon: Plant,
    href: "/problems/greenhouse-humidity",
    solves: ["Greenhouses", "Nurseries", "Indoor Farms"],
    color: "emerald",
  },
];

export default async function ProblemsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
              Problems We <span className="text-gradient-spray">Solve</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Most customers don&apos;t search for products. They search for solutions to their problems. Here&apos;s how 100Cooling solves the toughest outdoor climate challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <Link
                  key={problem.title}
                  href={problem.href}
                  className={`group glass-card rounded-2xl p-8 border-${problem.color}-500/10 hover:border-${problem.color}-500/25 transition-all duration-500`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-${problem.color}-500/10 border border-${problem.color}-500/20 flex items-center justify-center text-${problem.color}-400 shrink-0`}>
                      <Icon size={28} weight="duotone" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white group-hover:text-spray-300 transition-colors mb-2">
                        {problem.title}
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                    <ArrowRight size={24} weight="bold" className="text-gray-600 group-hover:text-spray-400 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                  </div>
                  <div className="flex flex-wrap gap-2 pl-[72px]">
                    {problem.solves.map((s) => (
                      <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-spray-500/5 border border-spray-500/10 text-gray-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">Don&apos;t see your specific problem?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
              Tell Us Your Challenge
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
