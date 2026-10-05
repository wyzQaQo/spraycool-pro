export const dynamicParams = false;
import CategoryPage from "@/components/sections/CategoryPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "High-Pressure Misting Pump Stations | 150 Bar Industrial Pumps | 100Cooling",
    description: "Industrial-grade 150-bar high-pressure misting pumps with VFD motor control, 316L stainless steel, IP65 enclosure. 8-25 L/min flow, up to 200 nozzles. The heart of every 100Cooling system.",
    alternates: {
      canonical: `/${locale}/products/pump-stations`,
      languages: {
        en: "/en/products/pump-stations",
        ar: "/ar/products/pump-stations",
        es: "/es/products/pump-stations",
        fr: "/fr/products/pump-stations",
      },
    },
  };
}

export default function Page() { return <CategoryPage title="High-Pressure Pump Stations" subtitle="Industrial-grade 150-bar pump units with VFD motor control. The heart of every 100Cooling system." category="pump-station" />; }
