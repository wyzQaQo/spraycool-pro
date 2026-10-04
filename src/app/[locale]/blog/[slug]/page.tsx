import { getBlogArticles } from "@/lib/data";
import BlogDetailClient from "./BlogDetailClient";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const articles = await getBlogArticles(locale);
  const post = articles[slug];
  if (!post) return null;

  return <BlogDetailClient slug={slug} articles={articles} />;
}
