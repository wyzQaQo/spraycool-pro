import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, defaultLocale, localeDirections, type Locale } from "@/i18n/config";
import { OrganizationSchema } from "@/lib/schema";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import "./globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = hasLocale(locales, locale) ? locale : defaultLocale;

  const titles: Record<string, string> = {
    en: "Outdoor Cooling, Misting & Dust Control Solutions | 100Cooling",
    ar: "حلول التبريد الخارجي والرذاذ ومكافحة الغبار | 100Cooling",
    es: "Soluciones de Enfriamiento, Nebulización y Control de Polvo | 100Cooling",
    fr: "Solutions de Refroidissement, Brumisation et Contrôle des Poussières | 100Cooling",
  };

  const descriptions: Record<string, string> = {
    en: "High-pressure outdoor cooling and automated mosquito control systems for resorts, hotels, restaurants, and commercial venues. 8-15°C cooling without wetting surfaces.",
    ar: "أنظمة تبريد خارجي عالي الضغط ومكافحة آلية للبعوض للمنتجعات والفنادق والمطاعم والمرافق التجارية.",
    es: "Sistemas de refrigeración exterior de alta presión y control automático de mosquitos para resorts, hoteles, restaurantes y espacios comerciales.",
    fr: "Systèmes de refroidissement extérieur haute pression et contrôle automatique des moustiques pour resorts, hôtels, restaurants et espaces commerciaux.",
  };

  return {
    title: titles[validLocale] || titles.en,
    description: descriptions[validLocale] || descriptions.en,
    alternates: {
      canonical: "/",
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l === defaultLocale ? "" : l}`])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();

  const messages = (await import(`../../../messages/${locale}/common.json`)).default;
  const dir = localeDirections[locale as Locale];

  return (
    <html lang={locale} dir={dir} className="h-full antialiased">
      <head>
        <OrganizationSchema />
      </head>
      <body className="min-h-full bg-deep-950 text-gray-200 overflow-x-hidden">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="relative w-full max-w-full overflow-x-hidden">
            {children}
          </main>
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
