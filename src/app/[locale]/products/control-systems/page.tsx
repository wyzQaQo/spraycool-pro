import CategoryPage from "@/components/sections/CategoryPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Smart Misting Controllers & IoT Automation | 100Cooling",
    description: "IoT-enabled misting controllers with cloud monitoring, weather-based scheduling, zone control, and mobile app management. Automate your outdoor cooling system for maximum efficiency.",
    alternates: {
      canonical: `/${locale}/products/control-systems`,
      languages: {
        en: "/en/products/control-systems",
        ar: "/ar/products/control-systems",
        es: "/es/products/control-systems",
        fr: "/fr/products/control-systems",
      },
    },
  };
}

export default function Page() { return <CategoryPage title="Smart Control Systems" subtitle="IoT-enabled controllers with cloud monitoring, weather-based scheduling, and AI-powered energy optimization." category="control" />; }
