import CategoryPage from "@/components/sections/CategoryPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Misting Nozzles, Fittings & Accessories | 0.15mm Ceramic Nozzles | 100Cooling",
    description: "Precision 0.15mm ceramic anti-clog misting nozzles, stainless steel tubing, quick-connect fittings, and replacement parts. 5-15 micron droplets for flash evaporation. Compatible with all 100Cooling systems.",
    alternates: {
      canonical: `/${locale}/products/nozzles-accessories`,
      languages: {
        en: "/en/products/nozzles-accessories",
        ar: "/ar/products/nozzles-accessories",
        es: "/es/products/nozzles-accessories",
        fr: "/fr/products/nozzles-accessories",
      },
    },
  };
}

export default function Page() { return <CategoryPage title="Misting Nozzles & Accessories" subtitle="Precision ceramic nozzles, stainless steel fittings, and high-pressure tubing. Every component engineered for reliability." category="accessories" />; }
