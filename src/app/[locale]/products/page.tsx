export const dynamicParams = false;
import { getProducts, getCategories } from "@/lib/data";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await getProducts(locale);
  const categories = await getCategories(locale);

  return <ProductsClient products={products} categories={categories} />;
}
