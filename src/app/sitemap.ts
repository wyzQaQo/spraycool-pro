import fs from "node:fs";
import path from "node:path";
import { products } from "@/lib/products";
import { blogPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";

const locales = ["en", "ar", "es", "fr"] as const;
const BASE_URL = "https://100mist.com";

/**
 * URL sources, in priority order:
 *  - dynamic routes: their own data modules (products -> @/lib/products,
 *    blog -> @/lib/blog), identical to what the [slug] routes render.
 *  - extra routes that exist as real on-disk pages (static category pages and
 *    two standalone blog articles): discovered by reading the app directory at
 *    build time, so the sitemap can never advertise a URL that has no route.
 *
 * Deliberately no hand-typed slug lists: those rot silently and turn into the
 * "Not found (404)" entries reported by Search Console.
 */

const APP_LOCALE_DIR = path.join(process.cwd(), "src", "app", "[locale]");

/** Immediate child directories that are real pages (contain page.tsx). */
function childPages(parentDir: string): string[] {
  try {
    return fs
      .readdirSync(parentDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== "[slug]")
      .filter((entry) =>
        fs.existsSync(path.join(parentDir, entry.name, "page.tsx"))
      )
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

const STATIC_PATHS: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/factory", priority: 0.7, changeFrequency: "monthly" },
  { path: "/quality", priority: 0.6, changeFrequency: "monthly" },
  { path: "/certificates", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // 1. Static pages × locales
  for (const locale of locales) {
    for (const page of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // 2. Product detail pages (dynamic [slug] over products data)
  for (const locale of locales) {
    for (const p of products) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  // 3. Product category pages that exist as real routes
  const categoryPages = childPages(path.join(APP_LOCALE_DIR, "products"));
  for (const locale of locales) {
    for (const category of categoryPages) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${category}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  // 4. Blog articles: data-driven posts plus any standalone static articles
  const staticBlogPages = childPages(path.join(APP_LOCALE_DIR, "blog"));
  const blogSlugs = Array.from(
    new Set([...blogPosts.map((post) => post.slug), ...staticBlogPages])
  );

  for (const locale of locales) {
    for (const slug of blogSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return entries;
}
