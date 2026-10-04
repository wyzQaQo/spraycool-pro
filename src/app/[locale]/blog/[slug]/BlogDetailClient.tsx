"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, CaretRight } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FAQSchema } from "@/lib/schema";
import { useTranslations } from "next-intl";

const tagPageMap: Record<string, string> = {
  "technology": "/blog?category=technical",
  "cooling science": "/blog?category=technical",
  "comparison": "/blog?category=technical",
  "restaurants": "/industries/restaurants-bars",
  "hospitality": "/industries/restaurants-bars",
  "ROI": "/blog?category=buyers-guide",
  "industrial": "/industries/factories",
  "productivity": "/industries/factories",
  "buyers guide": "/blog?category=buyers-guide",
  "evaluation": "/blog?category=buyers-guide",
  "pricing": "/blog?category=buyers-guide",
};

const bgFaqItems = [
  { question: "How does high-pressure misting cool outdoor spaces?", answer: "Our system pressurizes water to 150 bar and forces it through precision ceramic nozzles, creating 5-15 micron droplets that flash-evaporate in mid-air. This phase change absorbs 2,257 kJ of heat per liter of water, delivering 5-15 degrees C temperature reduction without wetting surfaces." },
  { question: "What industries benefit most from mist cooling systems?", answer: "Resorts and hotels extend outdoor seasons and protect F&B revenue. Restaurants increase outdoor seating capacity by 30-60%. Factories reduce heat stress and improve worker productivity by 20%+. Sports venues prevent heat-related event cancellations. Greenhouses maintain precise humidity for crop quality." },
  { question: "How much does a commercial misting system cost?", answer: "A complete commercial system for 5,000 m^2 ranges from $23,000-46,000 including industrial pump station, 200 ceramic nozzles, stainless steel tubing, IoT controller, and installation. Most clients recover investment in 8-18 months through increased outdoor revenue and reduced energy costs." },
];

export default function BlogDetailClient({
  slug,
  articles,
}: {
  slug: string;
  articles: Record<string, { title: string; excerpt: string; category: string; date: string; readTime: string; tags: string[]; content: string }>;
}) {
  const t = useTranslations();
  const post = articles[slug];
  if (!post) return null;

  const allSlugs = Object.keys(articles);
  const otherPosts = allSlugs.filter(s => s !== slug);
  const relatedByCategory = otherPosts.filter(s => articles[s].category === post.category).slice(0, 2);
  const relatedOther = otherPosts.filter(s => articles[s].category !== post.category).slice(0, 1);
  const relatedPosts = [...relatedByCategory, ...relatedOther].slice(0, 3);

  const renderContent = (content: string) => {
    return content.split('\n').filter(l => l.trim()).map(line => {
      if (line.startsWith('## ')) return `<h2 class="text-white text-xl font-bold mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3 class="text-white text-lg font-semibold mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith('- ')) return `<li class="ml-4 mb-1">${line.slice(2)}</li>`;
      if (line.startsWith('**') && line.includes('**', 2)) {
        const match = line.match(/\*\*(.+?)\*\*/);
        return `<p class="font-semibold text-white mt-6 mb-2">${match ? match[1] : line.slice(2, -2)}</p>`;
      }
      return `<p class="mb-3">${line}</p>`;
    }).join('');
  };

  const getTagHref = (tag: string) => tagPageMap[tag] || "/blog";

  return (
    <>
      <Navbar />
      <FAQSchema questions={bgFaqItems} />
      <article className="pt-28 pb-20 bg-deep-950">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-spray-400 text-sm mb-6"><ArrowLeft size={16} />{t("blog.backToBlog")}</Link>
          <div className="flex items-center gap-3 mb-4">
            <Link href={`/blog?category=${post.category}`} className="px-2.5 py-1 rounded-full text-xs font-medium bg-spray-500/10 text-spray-400 border border-spray-500/20 hover:bg-spray-500/20 transition-all">{post.category}</Link>
            <span className="text-gray-600 text-xs flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
            <span className="text-gray-600 text-xs">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
          <p className="text-gray-400 text-lg mb-8">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map(tag => (
              <Link key={tag} href={getTagHref(tag)} className="px-3 py-1 rounded-full bg-deep-800 text-gray-400 text-xs flex items-center gap-1 hover:bg-spray-500/10 hover:text-spray-400 transition-all">
                <Tag size={10} />{tag}
              </Link>
            ))}
          </div>
          <div className="text-gray-300 leading-relaxed space-y-4 text-sm" dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />

          <div className="mt-16 pt-12 border-t border-spray-500/10">
            <h2 className="text-xl font-bold text-white mb-6">{t("blog.relatedArticles")}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map(rp => (
                <Link key={rp} href={`/blog/${rp}`} className="glass-card rounded-xl p-4 group hover:border-spray-500/30 transition-all">
                  <p className="text-white text-sm font-medium mb-1 group-hover:text-spray-400 transition-colors line-clamp-2">{articles[rp].title}</p>
                  <span className="text-spray-400 text-xs font-medium flex items-center gap-1">{t("blog.readMore")} <CaretRight size={12} weight="bold" /></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-spray-500/10">
            <h2 className="text-xl font-bold text-white mb-4">{t("blog.exploreProducts")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/products" className="glass-card rounded-xl p-4 flex items-center justify-center gap-2 text-spray-400 hover:bg-spray-500/10 transition-all">
                {t("blog.viewAllProducts")} <CaretRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
