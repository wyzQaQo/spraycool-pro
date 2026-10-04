"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Package } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { products } from "@/lib/products";

interface CategoryPageProps {
  title: string;
  subtitle: string;
  category: string;
}

export default function CategoryPage({ title, subtitle, category }: CategoryPageProps) {
  const filtered = products.filter(p => p.category === category);
  return (
    <>
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <BlurText text={title} className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? filtered.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link href={`/products/${p.slug}`} className="glass-card-strong rounded-2xl overflow-hidden group block h-full hover:border-spray-500/30 transition-all">
                  <div className="h-48 bg-deep-900 flex items-center justify-center overflow-hidden">
                    {p.mainImage ? <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <Package size={48} weight="duotone" className="text-spray-500/20" />}
                  </div>
                  <div className="p-6">
                    <p className="text-spray-400 text-xs font-mono tracking-wider mb-2">{p.slug.toUpperCase().replace(/-/g, " ")}</p>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-spray-400 transition-colors line-clamp-2">{p.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{p.tagline}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-spray-500/10">
                      <span className="text-white font-semibold text-sm">{p.priceRange}</span>
                      <span className="flex items-center gap-1 text-spray-400 text-sm font-medium group-hover:gap-2 transition-all">Details<ArrowRight size={14} weight="bold" /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )) : <p className="text-gray-500 col-span-full text-center py-12">No products in this category yet.</p>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
