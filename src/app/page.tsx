export const dynamicParams = false;
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { defaultLocale } from "@/i18n/config";

export default async function RootPage() {
  // Let middleware handle locale detection.
  // This is a safety fallback: if somehow middleware didn't redirect,
  // use Accept-Language or default.
  const headersList = await headers();
  const al = headersList.get("accept-language") || "";

  const locales = ["en", "ar", "es", "fr"] as const;
  const prefer = al
    .split(",")
    .map((s) => s.trim().split(";")[0]!.split("-")[0]!.toLowerCase())
    .find((l) => locales.includes(l as any));

  redirect(`/${prefer || defaultLocale}`);
}
