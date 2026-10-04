"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Funnel, Package, Clock, ShieldCheck } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Product } from "@/lib/products";
import Aurora from "@/components/effects/Aurora";
import { useTranslations } from "next-intl";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="glass-card-strong rounded-2xl overflow-hidden group block h-full hover:border-spray-500/30 transition-all duration-300"
      >
        <div className="relative h-56 bg-deep-900 overflow-hidden">
          {product.mainImage ? (
            <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={48} weight="duotone" className="text-spray-500/30" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-deep-950/80 backdrop-blur-sm border border-spray-500/20 text-spray-400 text-xs font-medium">
              {product.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-spray-400 text-xs font-mono tracking-wider mb-2">{product.slug.toUpperCase().replace(/-/g, " ")}</p>
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-spray-400 transition-colors line-clamp-2">{product.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.tagline}</p>
          <div className="flex items-center justify-between pt-4 border-t border-spray-500/10">
            <span className="text-white font-semibold text-sm">{product.priceRange}</span>
            <div className="flex items-center gap-1 text-spray-400 text-sm font-medium group-hover:gap-2 transition-all">
              Details <ArrowRight size={14} weight="bold" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsClient({
  products,
  categories,
}: {
  products: Product[];
  categories: readonly { key: string; label: string }[];
}) {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <Navbar />
      <section className="relative pt-24 pb-4">
        <div className="absolute inset-0 top-16 bg-deep-950" />
        <div className="absolute inset-0 top-16 bg-mesh" />
        <Aurora colorStops={["#00d4ff", "#14b8a6", "#0ea5e9"]} speed={0.15} amplitude={0.3} />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep-950 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center py-20">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            {t("products.title")}
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{t("products.subtitle")}</p>
        </div>
      </section>

      <section className="relative py-16 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
            <Funnel size={18} weight="fill" className="text-spray-400 shrink-0" />
            {categories.map((cat) => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === cat.key ? "bg-spray-500 text-black" : "border border-spray-500/20 text-gray-400 hover:text-spray-400 hover:border-spray-500/30"}`}>
                {cat.label}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (<ProductCard key={product.slug} product={product} index={i} />))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Package size={48} weight="duotone" className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-24 bg-deep-950 border-t border-spray-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[{ icon: <ShieldCheck size={28} weight="duotone" />, title: "5-Year Warranty", desc: "All pump stations covered by comprehensive 5-year warranty with global service network." },
              { icon: <Clock size={28} weight="duotone" />, title: "Global Delivery", desc: "Shipping to 60+ countries with local installation partners in 25 markets." },
              { icon: <Package size={28} weight="duotone" />, title: "Bulk Pricing", desc: "Volume discounts for projects above $25,000. Dedicated project manager assigned." }].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-spray-500/10 border border-spray-500/20 flex items-center justify-center mx-auto mb-4 text-spray-400">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
