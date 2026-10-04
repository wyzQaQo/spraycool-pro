"use client";

import { motion } from "motion/react";
import {
  Storefront,
  Factory,
  Buildings,
  SoccerBall,
  ShoppingCart,
  Warehouse,
} from "@phosphor-icons/react";
import BlurText from "@/components/effects/BlurText";
import BounceCards from "@/components/effects/BounceCards";
import Particles from "@/components/effects/Particles";

const solutions = [
  {
    title: "Resorts & Hotels",
    description:
      "Transform poolside areas, outdoor restaurants, and guest walkways into cool, comfortable environments. Enhance guest experience and extend outdoor seating seasons.",
    icon: <Buildings size={28} weight="duotone" />,
  },
  {
    title: "Industrial Facilities",
    description:
      "Cool factory floors, warehouses, and production lines. Reduce heat stress on workers and equipment. Suppress airborne dust for cleaner operations.",
    icon: <Factory size={28} weight="duotone" />,
  },
  {
    title: "Sports Venues",
    description:
      "Keep athletes and spectators cool during outdoor events. Our systems cover stadium seating, training grounds, and outdoor courts with precision cooling.",
    icon: <SoccerBall size={28} weight="duotone" />,
  },
  {
    title: "Commercial Outdoor",
    description:
      "Restaurant patios, shopping promenades, and outdoor event spaces. Create comfortable microclimates that keep customers coming back, even in peak summer.",
    icon: <Storefront size={28} weight="duotone" />,
  },
  {
    title: "Agricultural & Greenhouse",
    description:
      "Regulate temperature and humidity for optimal growing conditions. Our fine mist systems prevent heat stress on crops without over-wetting foliage.",
    icon: <Warehouse size={28} weight="duotone" />,
  },
  {
    title: "Municipal & Public Spaces",
    description:
      "Cool public plazas, bus stops, and outdoor waiting areas. Combine cooling with mosquito control for public health in tropical and subtropical regions.",
    icon: <ShoppingCart size={28} weight="duotone" />,
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-deep-950" />
      <Particles
        particleColor="rgba(0, 212, 255,"
        particleCount={60}
        speed={0.4}
        maxSize={3}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-950/50 to-deep-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="Engineered for Every Environment"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
            duration={0.6}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
          >
            From luxury resorts to heavy industry, our modular systems scale to
            any outdoor space with precision climate control.
          </motion.p>
        </div>

        <BounceCards
          cards={solutions}
          containerWidth={320}
          containerHeight={280}
          enableHover={true}
        />
      </div>
    </section>
  );
}
