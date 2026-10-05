export const dynamicParams = false;
import { getIndustryBySlug, getIndustries } from "@/lib/data";
import IndustryDetailClient from "./IndustryDetailClient";

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const industry = await getIndustryBySlug(locale, slug);
  if (!industry) return null;
  const allIndustries = await getIndustries(locale);
  return <IndustryDetailClient industry={industry} allIndustries={allIndustries} />;
}
