"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { useTranslations } from "next-intl";

const blogPosts = [
  { slug: "how-high-pressure-misting-works", title: "How High-Pressure Misting Works: The Science of Evaporative Cooling", excerpt: "Understand the physics behind micron-level droplet atomization and why 2,257 kJ of heat absorption per liter makes misting the most efficient outdoor cooling technology.", category: "technical", date: "2026-05-15", readTime: "8 min", tags: ["technology","cooling science"] },
  { slug: "high-pressure-vs-low-pressure-misting", title: "High-Pressure vs Low-Pressure Misting: A Technical Comparison", excerpt: "Pressure matters. We break down the performance differences between 150-bar industrial systems and consumer-grade low-pressure alternatives — droplet size, evaporation rate, and real-world cooling efficiency.", category: "technical", date: "2026-05-10", readTime: "6 min", tags: ["technology","comparison"] },
  { slug: "outdoor-cooling-for-restaurants-guide", title: "Outdoor Cooling Solutions for Restaurants: A Complete Guide", excerpt: "How leading restaurant chains use high-pressure misting to increase outdoor seating revenue by 30-60%. Real case studies, installation considerations, and ROI analysis.", category: "application", date: "2026-04-28", readTime: "10 min", tags: ["restaurants","hospitality","ROI"] },
  { slug: "factory-floor-cooling-productivity", title: "Factory Floor Cooling: Reducing Heat Stress & Improving Productivity", excerpt: "Heat stress costs factories 20-40% in lost productivity. See how industrial misting systems deliver measurable ROI through worker comfort and equipment protection.", category: "application", date: "2026-04-20", readTime: "7 min", tags: ["industrial","productivity","ROI"] },
  { slug: "how-to-choose-misting-system", title: "How to Choose the Right Outdoor Cooling System", excerpt: "Pressure, coverage area, nozzle count, filtration requirements, control systems — a comprehensive buyer's checklist for evaluating misting system proposals.", category: "buyers-guide", date: "2026-04-12", readTime: "9 min", tags: ["buyers guide","evaluation"] },
  { slug: "misting-system-cost-breakdown", title: "Misting System Cost Breakdown: Pump, Nozzles, Installation & ROI", excerpt: "What should a commercial misting system cost? We break down every component — pump station, nozzles, tubing, installation labor, and ongoing maintenance.", category: "buyers-guide", date: "2026-04-05", readTime: "7 min", tags: ["pricing","ROI","buyers guide"] },
];

const categories = ["all", "technical", "application", "buyers-guide"];

export default function BlogPage() {
  const t = useTranslations();
  return (
    <>
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <BlurText text={t("blog.title")} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("blog.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link href={`/blog/${post.slug}`} className="glass-card-strong rounded-2xl overflow-hidden group block h-full hover:border-spray-500/30 transition-all">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-spray-500/10 text-spray-400 border border-spray-500/20">{post.category}</span>
                      <span className="text-gray-600 text-xs flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-spray-400 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-spray-500/10">
                      <span className="text-gray-600 text-xs">{post.date}</span>
                      <span className="flex items-center gap-1 text-spray-400 text-sm font-medium group-hover:gap-2 transition-all">Read<ArrowRight size={14} weight="bold" /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
