import CategoryPage from "@/components/sections/CategoryPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: "Automated Mosquito Misting Systems | Outdoor Pest Control | 100Cooling",
    description: "Programmable mosquito misting systems with botanical repellent injection. 6-meter protective barriers, EPA-registered formulas, dawn/dusk scheduling. Covers up to 10,000 m².",
    alternates: {
      canonical: `/${locale}/products/mosquito-systems`,
      languages: {
        en: "/en/products/mosquito-systems",
        ar: "/ar/products/mosquito-systems",
        es: "/es/products/mosquito-systems",
        fr: "/fr/products/mosquito-systems",
      },
    },
  };
}

export default function Page() { return <CategoryPage title="Mosquito Repellent Systems" subtitle="Automated botanical repellent injection. 6-meter protective barriers. Programmable scheduling with zero daily maintenance." category="accessories" />; }
