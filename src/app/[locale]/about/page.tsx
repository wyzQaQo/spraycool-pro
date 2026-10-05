export const dynamicParams = false;
"use client";

import { motion } from "motion/react";
import {
  Buildings,
  Globe,
  Users,
  Certificate,
  Factory,
  Leaf,
} from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import CountUp from "@/components/effects/CountUp";
import Aurora from "@/components/effects/Aurora";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 top-16 bg-deep-950" />
        <Aurora
          colorStops={["#00d4ff", "#14b8a6", "#0ea5e9"]}
          speed={0.2}
          amplitude={0.35}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep-950 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <BlurText
              text={t("about.title")}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6"
              duration={0.6}
            />
            <p className="text-gray-400 text-lg leading-relaxed">
              {t("about.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 500, suffix: "+", label: "Projects Completed" },
              { value: 60, suffix: "+", label: "Countries Served" },
              { value: 12, suffix: " yrs", label: "Industry Experience" },
              { value: 98, suffix: "%", label: "Client Retention" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-strong rounded-2xl p-8 text-center"
              >
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  className="block text-3xl md:text-4xl font-bold text-white mb-2"
                />
                <span className="text-gray-500 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-deep-950 border-t border-spray-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-spray-400 text-xs font-mono tracking-widest mb-3 block">
                OUR STORY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                From Engineering Workshop to Global Leader
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  100Cooling started in 2012 when our founder, a mechanical
                  engineer specializing in fluid dynamics, noticed that
                  high-end resorts in Southeast Asia were losing millions in
                  outdoor dining revenue due to unbearable heat.
                </p>
                <p>
                  The solution wasn&apos;t bigger fans or louder air
                  conditioners. It was precision. By applying industrial
                  high-pressure pump technology to water atomization, we
                  created a system that could cool any outdoor space by
                  5-15°C without wetting surfaces.
                </p>
                <p>
                  Today, our systems cool factory floors in Shenzhen, resort
                  pools in Phuket, stadium stands in Dubai, and public plazas
                  in Singapore. We&apos;ve expanded into mosquito control and
                  dust suppression, always grounded in the same engineering
                  rigor that started it all.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card-strong rounded-2xl p-8 space-y-6"
            >
              {[
                {
                  icon: <Factory size={24} weight="duotone" />,
                  title: "In-House Manufacturing",
                  desc: "All pump stations, controllers, and critical components are manufactured in our ISO 9001 certified facility in Shenzhen.",
                },
                {
                  icon: <Certificate size={24} weight="duotone" />,
                  title: "Global Certifications",
                  desc: "CE, RoHS, UL, ISO 9001:2015 certified. Products meet or exceed international safety and environmental standards.",
                },
                {
                  icon: <Globe size={24} weight="duotone" />,
                  title: "Installation Partners in 25 Countries",
                  desc: "Trained and certified installation partners ensure your system is deployed correctly, anywhere in the world.",
                },
                {
                  icon: <Leaf size={24} weight="duotone" />,
                  title: "Sustainability Commitment",
                  desc: "Our systems use 90% less energy than equivalent AC cooling. Water consumption is optimized through smart scheduling and weather integration.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center shrink-0 text-spray-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-deep-900 border-t border-spray-500/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Certifications & Compliance
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Every 100Cooling product is tested and certified to meet
            international standards for safety, performance, and environmental
            impact.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "ISO 9001:2015",
              "CE Marking",
              "RoHS Compliant",
              "UL Listed",
              "IP65 Rated",
              "FDA Food-Grade",
            ].map((cert) => (
              <div
                key={cert}
                className="glass-card rounded-2xl px-8 py-5 border-spray-500/10 hover:border-spray-500/30 transition-all duration-300"
              >
                <Certificate
                  size={24}
                  weight="duotone"
                  className="text-spray-400 mx-auto mb-2"
                />
                <span className="text-white text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-deep-950 border-t border-spray-500/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let&apos;s Build Something Cool
          </h2>
          <p className="text-gray-400 mb-8">
            Whether you&apos;re outfitting a single restaurant patio or an
            entire industrial complex, our engineering team is ready to help.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-all duration-300"
          >
            <Buildings size={20} weight="fill" />
            Request a Quote
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
