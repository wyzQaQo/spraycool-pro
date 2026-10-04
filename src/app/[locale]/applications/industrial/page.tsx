import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/sections/FAQSection";
import { industrialFAQs } from "@/lib/seo-faqs";
import {
  Factory, ArrowRight, CheckCircle, HardHat, CloudFog, Warehouse,
  Cpu, ShieldCheck, Drop, Gauge, DeviceMobile, Timer, SlidersHorizontal, WifiHigh,
  Fan, Wrench, Thermometer, Mountains,
} from "@phosphor-icons/react/dist/ssr";
import FadeContent from "@/components/effects/FadeContent";
import Magnet from "@/components/effects/Magnet";
import SpotlightCard from "@/components/effects/SpotlightCard";
import CountUp from "@/components/effects/CountUp";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Industrial Dust Suppression & Cooling Systems | Fog Pile Pole Misting | 100Cooling",
    description: "High-pressure rotating fog pile dust suppression systems for construction, mining, and industrial facilities. 360° rotating nozzles, 3-10m pole heights, APP/PLC control. Real projects in Henan, Xi'an, Chengdu. 90% dust reduction.",
    alternates: {
      canonical: `/${locale}/applications/industrial`,
      languages: {
        en: "/en/applications/industrial",
        ar: "/ar/applications/industrial",
        es: "/es/applications/industrial",
        fr: "/fr/applications/industrial",
      },
    },
  };
}

const stats = [
  { value: "90%", label: "Dust Reduction", sub: "Verified on site" },
  { value: "3-10m", label: "Pole Height", sub: "Fully customizable" },
  { value: "360°", label: "Rotation", sub: "Stepper motor driven" },
  { value: "OSHA", label: "Compliant", sub: "Meets safety standards" },
];

const coreAdvantages = [
  { icon: ShieldCheck, title: "IP65 Dust & Waterproof", desc: "All-weather industrial protection for harsh environments" },
  { icon: Cpu, title: "Pure Copper Motor", desc: "National standard copper wire, efficient and stable operation" },
  { icon: WifiHigh, title: "Multi-Mode Control", desc: "Manual, wireless remote, mobile APP, and PLC touchscreen" },
  { icon: Timer, title: "Smart Scheduling", desc: "Freely set spray time, angle, and speed parameters" },
  { icon: Gauge, title: "Variable Frequency", desc: "Precise pressure regulation with anti-overload protection" },
  { icon: Drop, title: "Auto Water Management", desc: "Auto-refill, auto shut-off, and water filtration built-in" },
  { icon: Fan, title: "360° Rotating Nozzle", desc: "Stepper motor precision with 0-360° self-adjustable range" },
  { icon: Wrench, title: "Stainless Steel Tank", desc: "Thickened SS tank with high-pressure pump in one unit" },
];

const controlModes = [
  { label: "Manual Control", desc: "Direct on-site operation" },
  { label: "Wireless Remote", desc: "Remote control within range" },
  { label: "Mobile APP", desc: "Smartphone remote control anywhere" },
  { label: "PLC Touchscreen", desc: "Intelligent automation system" },
];

const projects = [
  { location: "Henan Province", type: "Municipal Road Dust Control", image: "/images/industrial/desc-12.jpg" },
  { location: "Xi'an Weiyang District", type: "Urban Construction Dust Suppression", image: "/images/industrial/desc-12.jpg" },
  { location: "Guang'an City", type: "City-wide Misting Network", image: "/images/industrial/desc-12.jpg" },
  { location: "Xingtai, Hebei", type: "Municipal Road Project", image: "/images/industrial/desc-11.jpg" },
  { location: "Chengdu", type: "Old City Reconstruction", image: "/images/industrial/desc-11.jpg" },
  { location: "Mining / Coal Yard", type: "Heavy Dust Suppression", image: "/images/industrial/desc-10.jpg" },
];

const configurations = [
  { label: "1 Host → 1 Pole", desc: "Entry-level setup for small areas" },
  { label: "1 Host → 2 Poles", desc: "Mid-scale coverage solution" },
  { label: "1 Host → 3 Poles", desc: "Large area dust suppression" },
  { label: "1 Host → 4 Poles", desc: "Maximum coverage network" },
];

export default async function IndustrialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-950 pt-24 pb-20">

        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh" />
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium tracking-wider mb-6">
                  <Factory size={14} weight="fill" />
                  INDUSTRIAL DUST SUPPRESSION
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6 leading-tight">
                  High-Pressure Rotating{" "}
                  <span className="text-gradient-spray">Fog Pile Systems</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                  Industrial-grade dust suppression with 360° rotating nozzles on 3-10m poles.
                  Smart APP/PLC control for construction sites, mining operations, warehouses,
                  and municipal roads. Real projects deployed across China.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Magnet magnetStrength={4}>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
                      Request a Quote
                      <ArrowRight size={18} weight="bold" />
                    </Link>
                  </Magnet>
                  <Magnet magnetStrength={3}>
                    <Link href="#projects" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-spray-500/30 text-spray-400 font-medium hover:bg-spray-500/10 transition-colors">
                      View Real Projects
                    </Link>
                  </Magnet>
                </div>
              </div>
              {/* Right: Hero Videos */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-spray-500/10 shadow-2xl bg-deep-900">
                  <video
                    className="w-full h-auto object-cover"
                    controls
                    preload="metadata"
                    poster="/images/industrial/collage-road.png"
                  >
                    <source src="/videos/industrial/demo-road.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-spray-500/10 shadow-2xl bg-deep-900">
                  <video
                    className="w-full h-auto object-cover"
                    controls
                    preload="metadata"
                    poster="/images/industrial/desc-6.jpg"
                  >
                    <source src="/videos/industrial/demo-nozzle.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {stats.map((s) => (
                <div key={s.label} className="glass-card-strong rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-1">{s.value}</div>
                  <div className="text-white text-sm font-medium">{s.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HERO BANNER ===== */}
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <div className="relative rounded-3xl overflow-hidden border border-spray-500/10 shadow-2xl">
            <Image
              src="/images/industrial/hero-banner.png"
              alt="Industrial high-pressure fog pile dust suppression system with 360 degree rotating nozzle on outdoor road construction site for air quality dust control"
              width={1400}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ===== PRODUCT SYSTEM OVERVIEW ===== */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
          <FadeContent blur className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spray-500/10 text-spray-400 text-xs font-medium mb-4">
              <Wrench size={14} />
              SYSTEM OVERVIEW
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              Intelligent High-Pressure Spray System
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Integrated host unit with fog pile poles. From portable all-in-one systems
              to large-scale multi-pole networks — built for real industrial conditions.
            </p>
          </FadeContent>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Main System Image */}
            <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
              <Image
                src="/images/industrial/desc-1.jpg"
                alt="100Cooling intelligent high voltage spray system with fog pile pole installed on outdoor road for municipal dust suppression construction site air quality control"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-deep-950/90 to-transparent">
                <p className="text-white text-sm font-medium">Outdoor Road Installation — Control Cabinet + Fog Pile Pole</p>
              </div>
            </div>
            {/* Host Unit Images */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
                <Image
                  src="/images/industrial/desc-3.jpg"
                  alt="Portable all-in-one industrial dust suppression host unit with thickened stainless steel water tank IP65 dustproof waterproof and high pressure pump for construction site mining"
                  width={700}
                  height={350}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-deep-950/90 to-transparent">
                  <p className="text-white text-sm font-medium">Portable All-in-One Host — IP65 Rated, SS Tank</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
                <Image
                  src="/images/industrial/desc-8.jpg"
                  alt="100Cooling intelligent high voltage spray system integrated host with fog pile pole smart control cabinet outdoor industrial dust suppression equipment"
                  width={700}
                  height={350}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-deep-950/90 to-transparent">
                  <p className="text-white text-sm font-medium">Integrated Smart Host — APP + PLC Control Ready</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CORE ADVANTAGES ===== */}
        <section className="bg-deep-900/50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <FadeContent blur className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-4">
                <ShieldCheck size={14} />
                15 CORE ADVANTAGES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
                Built Tough for Industrial Environments
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Every component engineered for reliability, from the pure copper motor
                to the 360° stepper-driven rotating nozzle.
              </p>
            </FadeContent>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coreAdvantages.map((adv) => (
                <SpotlightCard key={adv.title} className="glass-card rounded-xl p-5 hover:border-spray-500/30 transition-colors group">
                  <adv.icon size={28} className="text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-white font-semibold text-sm mb-1">{adv.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{adv.desc}</p>
                </SpotlightCard>
              ))}
            </div>

            {/* 15 Advantages Infographic */}
            <div className="mt-10 relative rounded-2xl overflow-hidden border border-spray-500/10">
              <Image
                src="/images/industrial/desc-2.jpg"
                alt="15 core advantages infographic for industrial high pressure misting dust suppression system with IP65 rating copper motor APP PLC control 360 degree rotating nozzle"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* ===== TECHNICAL SPECIFICATIONS ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Pole Heights */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spray-500/10 text-spray-400 text-xs font-medium mb-4">
                <Gauge size={14} />
                CUSTOMIZABLE HEIGHTS
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">
                3-10 Meter Pole Heights
              </h2>
              <p className="text-gray-400 mb-6">
                Standard 6-meter fog pile poles with full customization from 3m to 10m.
                Match pole height to your dust source and coverage area requirements.
              </p>
              <div className="relative rounded-2xl overflow-hidden border border-spray-500/10 mb-6">
                <Image
                  src="/images/industrial/product-height.jpg"
                  alt="100Cooling industrial fog pile pole height customization from 3m 4m 5m 6m to 8m 10m meters for mining construction site dust suppression outdoor cooling"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {["3m", "4m", "5m", "6m (Standard)", "8m", "10m"].map((h) => (
                  <span key={h} className="px-4 py-2 rounded-lg glass-card text-spray-400 text-sm font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Configurations */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-4">
                <SlidersHorizontal size={14} />
                FLEXIBLE CONFIGURATION
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">
                One Host, Multiple Poles
              </h2>
              <p className="text-gray-400 mb-6">
                Scale from a single pole to a network of four poles per host unit.
                Cost-effective coverage for construction sites, mining yards, and municipal roads.
              </p>
              <div className="relative rounded-2xl overflow-hidden border border-spray-500/10 mb-6">
                <Image
                  src="/images/industrial/product-config.jpg"
                  alt="100Cooling one industrial host with multiple high-pole nozzle configurations 1-to-1 1-to-2 1-to-3 1-to-4 for scalable construction site mining dust suppression network"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {configurations.map((c) => (
                  <div key={c.label} className="glass-card rounded-xl p-4">
                    <div className="text-amber-400 font-bold text-sm mb-1">{c.label}</div>
                    <div className="text-gray-500 text-xs">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 360° ROTATING NOZZLE ===== */}
        <section className="bg-deep-900/50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spray-500/10 text-spray-400 text-xs font-medium mb-4">
                  <Fan size={14} />
                  PRECISION ENGINEERING
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
                  360° Rotating Nozzle with Stepper Motor
                </h2>
                <p className="text-gray-400 mb-6">
                  Stepper motor-driven precision with 0-360° self-adjustable range.
                  Dust cover and high-pressure nozzle built from stainless steel for industrial longevity.
                </p>
                <div className="space-y-3">
                  {[
                    "Stepper motor for precision rotation control",
                    "0-360° self-adjustable spray angle",
                    "Stainless steel dust cover & nozzle",
                    "High-pressure spray with fine atomization",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={18} weight="fill" className="text-spray-400 shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
                  <Image
                    src="/images/industrial/desc-6.jpg"
                    alt="360 degree rotating nozzle close-up with stepper motor precision operation dust cover high pressure nozzle stainless steel for industrial fog pile dust suppression system"
                    width={600}
                    height={350}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
                  <Image
                    src="/images/industrial/nozzle-sku.jpg"
                    alt="100Cooling 360 degree rotating nozzle product shot stainless steel version with dust cover high pressure spray for industrial outdoor dust suppression road misting system"
                    width={600}
                    height={350}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTROL SYSTEMS ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spray-500/10 text-spray-400 text-xs font-medium mb-4">
              <DeviceMobile size={14} />
              SMART CONTROL
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              Four Control Modes. Full Automation.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From manual on-site operation to fully automated PLC scheduling —
              control your dust suppression system the way that fits your workflow.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Control Spec Image */}
            <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
              <Image
                src="/images/industrial/desc-9.jpg"
                alt="360 degree rotating nozzle fog pile pole specifications control options manual wireless remote mobile app PLC touch screen for industrial dust suppression system"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Touch Screen */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
                <Image
                  src="/images/industrial/desc-5.jpg"
                  alt="PLC intelligent touch screen control panel with frequency conversion adjustment remote control mobile APP setting automatic work schedule for industrial high pressure misting dust suppression system"
                  width={600}
                  height={350}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {controlModes.map((mode) => (
                  <div key={mode.label} className="glass-card rounded-xl p-4 border-l-2 border-l-spray-500">
                    <div className="text-white font-semibold text-sm mb-1">{mode.label}</div>
                    <div className="text-gray-500 text-xs">{mode.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== PREMIUM COMPONENTS ===== */}
        <section className="bg-deep-900/50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-4">
                <Cpu size={14} />
                PREMIUM COMPONENTS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
                Quality You Can See
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Copper Motor */}
              <div className="glass-card-strong rounded-2xl overflow-hidden border-spray-500/10">
                <div className="relative">
                  <Image
                    src="/images/industrial/desc-4.jpg"
                    alt="All-copper motor powerful engine with bare copper wire silent bearing high temperature power failure protection for industrial dust suppression high pressure pump fog pile system"
                    width={600}
                    height={350}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">All-Copper Motor</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    New national standard copper wire coil ensures efficient, stable, and safe motor operation.
                    Silent bearings and high-temperature power failure protection for 24/7 industrial duty.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Bare Copper Wire", "Silent Bearing", "High-Temp Protection"].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mining Spec */}
              <div className="glass-card-strong rounded-2xl overflow-hidden border-spray-500/10">
                <div className="relative">
                  <Image
                    src="/images/industrial/desc-10.jpg"
                    alt="Industrial fog pile pole specifications standard height 6m customizable 6m 8m 10m in mining coal yard setting for heavy dust suppression air quality control at material handling facility"
                    width={600}
                    height={350}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Mining & Coal Yard Ready</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Standard 6m poles with optional 8m and 10m extensions for large material
                    handling facilities. Built to suppress dust at the source in the harshest conditions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["6m Standard", "8m Option", "10m Option", "Mining Grade"].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-spray-500/10 text-spray-400 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== REAL PROJECTS ===== */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
          <FadeContent blur className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-4">
              <HardHat size={14} />
              REAL PROJECTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              Deployed Across China
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From municipal road dust control in Henan to mining yard suppression —
              our fog pile systems are proven in real-world industrial conditions.
            </p>
          </FadeContent>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <SpotlightCard key={project.location} spotlightColor="rgba(245, 158, 11, 0.1)" className="glass-card rounded-2xl border-spray-500/10 group hover:border-spray-500/30 transition-colors">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={`${project.location} ${project.type}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-950/80 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-1">{project.location}</h3>
                  <p className="text-gray-500 text-sm">{project.type}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Project Photo Gallery */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
              <Image
                src="/images/industrial/desc-12.jpg"
                alt="Real project photos from Henan Province Xi'an Weiyang District Guangan City municipal road dust suppression fog pile system installation outdoor air quality control"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-deep-950/90 to-transparent">
                <p className="text-white text-sm font-medium">Henan, Xi'an, Guang'an Municipal Projects</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-spray-500/10">
              <Image
                src="/images/industrial/desc-11.jpg"
                alt="Customer feedback real-life case 100Cooling Xingtai municipal road project and Chengdu old city reconstruction project high pressure fog pile dust suppression installation"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-deep-950/90 to-transparent">
                <p className="text-white text-sm font-medium">Xingtai & Chengdu Old City Reconstruction</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <FAQSection title="Industrial Dust Suppression FAQs" faqs={industrialFAQs} accentColor="amber" />
        </section>

        {/* ===== CTA ===== */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-spray-900/80 to-deep-900" />
            <div className="absolute inset-0 bg-mesh opacity-50" />
            <div className="relative p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
                Ready to Suppress Dust at Your Facility?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                Get a customized quote for your construction site, mining operation, or warehouse.
                We design systems from single-pole setups to large-scale networks.
              </p>
              <Magnet magnetStrength={4}>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-colors">
                  Request a Quote
                  <ArrowRight size={18} weight="bold" />
                </Link>
              </Magnet>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
