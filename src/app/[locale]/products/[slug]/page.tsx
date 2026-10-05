export const dynamicParams = false;
import { getProducts, getProductBySlug } from "@/lib/data";
import type { Product } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  const products = await getProducts("en");
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const allProducts = await getProducts(locale);
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return null;
  return <ProductDetailClient product={product} allProducts={allProducts} />;
}
