"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle, Package, Clock, ShieldCheck, ArrowRight, CaretRight,
} from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Product } from "@/lib/products";
import { FAQSchema } from "@/lib/schema";
import { useTranslations } from "next-intl";

const blogPosts = [
  { slug: "how-high-pressure-misting-works", title: "How High-Pressure Misting Works", category: "technical" },
  { slug: "how-to-choose-misting-system", title: "How to Choose a Misting System", category: "buyers-guide" },
  { slug: "misting-system-cost-breakdown", title: "Misting System Cost Breakdown", category: "buyers-guide" },
  { slug: "outdoor-cooling-for-restaurants-guide", title: "Outdoor Cooling for Restaurants", category: "application" },
  { slug: "factory-floor-cooling-productivity", title: "Factory Cooling & Productivity", category: "application" },
  { slug: "high-pressure-vs-low-pressure-misting", title: "High-Pressure vs Low-Pressure", category: "technical" },
];

export default function ProductDetailClient({ product, allProducts }: { product: Product; allProducts: Product[] }) {
  const t = useTranslations();

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);
  const relatedBlogs = blogPosts.slice(0, 3);

  const faqItems = [
    {
      question: `How does the ${product.name} high-pressure misting system work?`,
      answer: `The ${product.name} uses a 150-bar high-pressure pump to force water through 0.15mm ceramic nozzles, creating 5-15 micron droplets. These micro-droplets flash-evaporate in mid-air, absorbing 2,257 kJ of heat per liter of water. The result is 5-15\u00B0C cooling without wetting any surfaces.`,
    },
    {
      question: "What cooling performance can I expect from this system?",
      answer: "In controlled testing, 100Cooling high-pressure systems achieve 5-8\u00B0C actual temperature reduction and 8-15\u00B0C in perceived cooling. Performance depends on ambient humidity — best results in dry to moderately humid climates (RH below 70%). Each installation includes a site-specific performance estimate from our engineering team.",
    },
    {
      question: "What maintenance is required for the misting system?",
      answer: "Minimal maintenance required: nozzle inspection every 6 months, filter cartridge replacement annually, pump oil change every 2,000 operating hours. The MG-IOT HUB provides proactive remote monitoring and sends automated maintenance alerts. Most installations run 12-18 months between professional service visits.",
    },
    {
      question: "What warranty coverage is included with this system?",
      answer: `The ${product.name} includes a ${product.warranty}. Our comprehensive warranty covers all pump station components, nozzles, and controllers. It includes parts replacement and remote technical support, with on-site service available through our certified partner network in 25+ countries.`,
    },
    {
      question: "How is the system installed and what are the requirements?",
      answer: "Installation is handled by our certified partner network across 25+ countries. The system requires a standard water connection, 220V/380V power supply, and structural mounting points for nozzles. Our 5-stage integrated filtration handles most water sources. Typical installation takes 2-5 days depending on site size. We provide comprehensive installation documentation and remote supervision.",
    },
  ];

  return (
    <>
      <FAQSchema questions={faqItems} />
      <Navbar />

      <section className="relative pt-28 pb-12 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-spray-400 text-sm transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            {t("products.backToProducts")}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card-strong rounded-2xl overflow-hidden aspect-square bg-deep-900"
            >
              {product.mainImage ? (
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={80} weight="duotone" className="text-spray-500/20" />
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-spray-400 text-xs font-mono tracking-wider mb-2 block">
                {product.slug.toUpperCase().replace(/-/g, " ")}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-spray-400 text-lg mb-6">{product.tagline}</p>
              <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-card rounded-xl p-4 text-center">
                  <span className="text-spray-400 text-2xl font-bold block">
                    {product.priceRange.split(" - ")[0]}
                  </span>
                  <span className="text-gray-500 text-xs">{t("products.startingFrom")}</span>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <Clock size={20} weight="fill" className="text-spray-400 mx-auto mb-1" />
                  <span className="text-white text-sm font-medium block">{product.leadTime}</span>
                  <span className="text-gray-500 text-xs">{t("products.leadTime")}</span>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <ShieldCheck size={20} weight="fill" className="text-spray-400 mx-auto mb-1" />
                  <span className="text-white text-sm font-medium block">{product.warranty}</span>
                  <span className="text-gray-500 text-xs">{t("products.warranty")}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/#contact"
                  className="px-8 py-3.5 rounded-xl bg-spray-500 text-black font-semibold text-center hover:bg-spray-400 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Request a Quote
                  <ArrowRight size={18} weight="bold" />
                </a>
                <Link
                  href="/products"
                  className="px-8 py-3.5 rounded-xl border border-spray-500/20 text-spray-400 font-medium text-center hover:bg-spray-500/10 transition-all"
                >
                  {t("products.compareProducts")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-deep-950 border-t border-spray-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">{t("products.keyFeatures")}</h2>
              <div className="space-y-4">
                {product.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={20} weight="fill" className="text-spray-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-8">{t("products.technicalSpecs")}</h2>
              <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={i} className={i < product.specs.length - 1 ? "border-b border-spray-500/5" : ""}>
                        <td className="py-3.5 px-4 text-gray-500 text-sm font-medium w-2/5">{spec.label}</td>
                        <td className="py-3.5 px-4 text-white text-sm">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Related Resources --- */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-deep-950 border-t border-spray-500/5">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-8">{t("products.relatedProducts")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/products/${rp.slug}`}
                  className="glass-card rounded-xl p-5 group hover:border-spray-500/30 transition-all"
                >
                  <p className="text-spray-400 text-xs font-mono tracking-wider mb-1">{rp.slug.toUpperCase().replace(/-/g, " ")}</p>
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-spray-400 transition-colors line-clamp-2">{rp.name}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">{rp.tagline}</p>
                  <span className="text-spray-400 text-xs font-medium flex items-center gap-1">{t("products.viewDetails")} <CaretRight size={12} weight="bold" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- Related Blog Posts for Cross-Linking --- */}
      <section className="py-16 bg-deep-900 border-t border-spray-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-2">{t("products.engineeringResources")}</h2>
          <p className="text-gray-500 text-sm mb-8">Learn more about misting technology, selection criteria, and ROI</p>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedBlogs.map((rb) => (
              <Link
                key={rb.slug}
                href={`/blog/${rb.slug}`}
                className="glass-card rounded-xl p-5 group hover:border-spray-500/30 transition-all"
              >
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-spray-500/10 text-spray-400 border border-spray-500/20 mb-3 inline-block">{rb.category}</span>
                <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-spray-400 transition-colors">{rb.title}</h3>
                <span className="text-spray-400 text-xs font-medium flex items-center gap-1">{t("products.readArticle")} <CaretRight size={12} weight="bold" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-deep-900 border-t border-spray-500/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t("products.customConfig")}</h2>
          <p className="text-gray-400 mb-8">
            {t("products.customConfigDesc")}
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-all duration-300"
          >
            {t("products.getConsultation")}
            <ArrowRight size={18} weight="bold" />
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
