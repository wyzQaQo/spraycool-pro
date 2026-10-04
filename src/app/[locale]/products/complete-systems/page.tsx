import CategoryPage from "@/components/sections/CategoryPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Complete Misting Systems for Outdoor Cooling | Turn-Key Solutions | 100Cooling",
    description: "Factory-direct complete misting systems for outdoor cooling and mosquito control. Includes high-pressure pump, ceramic nozzles, stainless steel tubing, and IoT controller. 200+ nozzles, up to 15°C cooling.",
    alternates: {
      canonical: `/${locale}/products/complete-systems`,
      languages: {
        en: "/en/products/complete-systems",
        ar: "/ar/products/complete-systems",
        es: "/es/products/complete-systems",
        fr: "/fr/products/complete-systems",
      },
    },
  };
}

export default function Page() { return <CategoryPage title="Complete Misting Systems" subtitle="Turn-key outdoor cooling and mosquito control solutions for commercial and industrial applications." category="misting-system" />; }
