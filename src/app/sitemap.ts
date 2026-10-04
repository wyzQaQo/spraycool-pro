import { products } from "@/lib/products";
import type { MetadataRoute } from "next";

const locales = ["en", "ar", "es", "fr"] as const;

const blogSlugs = [
  "how-high-pressure-misting-works",
  "high-pressure-vs-low-pressure-misting",
  "outdoor-cooling-for-restaurants-guide",
  "factory-floor-cooling-productivity",
  "how-to-choose-misting-system",
  "misting-system-cost-breakdown",
  // New SEO pages
  "how-misting-systems-work",
  "restaurant-outdoor-cooling-guide",
];

const productCategories = [
  "complete-systems",
  "pump-stations",
  "nozzles-accessories",
  "control-systems",
  "mosquito-systems",
  "water-treatment",
];

const staticPaths = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/factory", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/quality", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/certificates", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/resources", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
  // Applications
  { path: "/applications", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/applications/commercial-hospitality", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/applications/residential", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/applications/agriculture", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/applications/industrial", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/applications/events-sports", priority: 0.7, changeFrequency: "monthly" as const },
  // Problems
  { path: "/problems", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/problems/high-outdoor-temperature", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/problems/mosquito-problems", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/problems/dust-control", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/problems/livestock-heat-stress", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/problems/greenhouse-humidity", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mistguard-pro.com";
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages × locales
  for (const locale of locales) {
    for (const page of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // Product detail pages × locales
  for (const locale of locales) {
    for (const p of products) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  // Product category pages × locales
  for (const locale of locales) {
    for (const cat of productCategories) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${cat}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  // Blog pages × locales
  for (const locale of locales) {
    for (const slug of blogSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return entries;
}
