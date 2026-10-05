export const dynamicParams = false;
import CategoryPage from "@/components/sections/CategoryPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Misting System Water Filtration & Treatment | 5-Stage Filters | 100Cooling",
    description: "Multi-stage water filtration systems for high-pressure misting. 5-stage filtration (50 micron to 0.5 micron), reverse osmosis, UV sterilization. Prevent nozzle clogging and ensure pure mist.",
    alternates: {
      canonical: `/${locale}/products/water-treatment`,
      languages: {
        en: "/en/products/water-treatment",
        ar: "/ar/products/water-treatment",
        es: "/es/products/water-treatment",
        fr: "/fr/products/water-treatment",
      },
    },
  };
}

export default function Page() { return <CategoryPage title="Water Treatment & Filtration" subtitle="Multi-stage filtration systems. Reverse osmosis. UV sterilization. Protect your nozzles and ensure pure, clean mist." category="accessories" />; }
