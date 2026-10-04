import type { Product } from "./products";
import type { Industry } from "./industries";

export async function getProducts(locale: string): Promise<Product[]> {
  switch (locale) {
    case "ar": return (await import("./products-ar")).products;
    case "es": return (await import("./products-es")).products;
    case "fr": return (await import("./products-fr")).products;
    default: return (await import("./products")).products;
  }
}

export async function getProductBySlug(locale: string, slug: string): Promise<Product | undefined> {
  const all = await getProducts(locale);
  return all.find((p) => p.slug === slug);
}

export async function getProductsByCategory(locale: string, category: Product["category"] | "all"): Promise<Product[]> {
  const all = await getProducts(locale);
  if (category === "all") return all;
  return all.filter((p) => p.category === category);
}

export async function getCategories(locale: string): Promise<readonly { key: string; label: string }[]> {
  switch (locale) {
    case "ar": return (await import("./products-ar")).categories;
    case "es": return (await import("./products-es")).categories;
    case "fr": return (await import("./products-fr")).categories;
    default: return (await import("./products")).categories;
  }
}

export async function getIndustries(locale: string): Promise<Industry[]> {
  switch (locale) {
    case "ar": return (await import("./industries-ar")).industries;
    case "es": return (await import("./industries-es")).industries;
    case "fr": return (await import("./industries-fr")).industries;
    default: return (await import("./industries")).industries;
  }
}

export async function getIndustryBySlug(locale: string, slug: string): Promise<Industry | undefined> {
  const all = await getIndustries(locale);
  return all.find((i) => i.slug === slug);
}

export async function getBlogArticles(locale: string): Promise<any> {
  switch (locale) {
    case "ar": return (await import("./blog-ar")).articles;
    case "es": return (await import("./blog-es")).articles;
    case "fr": return (await import("./blog-fr")).articles;
    default: return (await import("./blog-en")).articles;
  }
}
