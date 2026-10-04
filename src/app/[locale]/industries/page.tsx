import { getIndustries } from "@/lib/data";
import IndustriesClient from "./IndustriesClient";

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const industries = await getIndustries(locale);
  return <IndustriesClient industries={industries} />;
}
