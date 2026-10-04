import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ar", "es", "fr"] as const;
const defaultLocale = "en";
const cookieName = "NEXT_LOCALE";

/**
 * Map country codes to locales — geo-based detection.
 * Works on Vercel (request.geo.country) and Cloudflare (request.cf.country).
 */
const countryLocaleMap: Record<string, string> = {
  // Arabic
  SA: "ar", AE: "ar", QA: "ar", KW: "ar", OM: "ar", BH: "ar",
  EG: "ar", JO: "ar", LB: "ar", IQ: "ar", YE: "ar", SY: "ar",
  LY: "ar", SD: "ar", TN: "ar", DZ: "ar", MA: "ar",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", GT: "es", CU: "es", DO: "es", HN: "es",
  PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es", BO: "es",
  // French
  FR: "fr", BE: "fr", CH: "fr", LU: "fr", MC: "fr",
  BF: "fr", CI: "fr", SN: "fr", ML: "fr", NE: "fr", CD: "fr", CM: "fr",
  MG: "fr", HT: "fr",
};

function getLocale(request: NextRequest): string {
  // 1. Cookie (persistent user choice — highest priority)
  const cookie = request.cookies.get(cookieName)?.value;
  if (cookie && locales.includes(cookie as any)) return cookie;

  // 2. Geo-location by country (Vercel / Cloudflare)
  const country = (request as any).geo?.country || (request as any).cf?.country;
  if (country && countryLocaleMap[country]) return countryLocaleMap[country];

  // 3. Accept-Language header (browser language)
  const al = request.headers.get("accept-language") || "";
  // "ar-SA,ar;q=0.9,en;q=0.8" → pick first 2-char code that matches our locales
  const langs = al
    .split(",")
    .map((s) => s.trim().split(";")[0]!.split("-")[0]!.toLowerCase())
    .filter((l) => l.length === 2);

  for (const lang of langs) {
    if (locales.includes(lang as any)) return lang;
  }

  // 4. Default fallback
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-page routes
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Already has a locale prefix? → set cookie, pass through
  const pathLocale = pathname.split("/")[1];
  if (locales.includes(pathLocale as any)) {
    const res = NextResponse.next();
    res.cookies.set(cookieName, pathLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
    });
    res.headers.set("X-Locale-Source", "path");
    return res;
  }

  // No locale → detect and redirect
  const locale = getLocale(request);
  const newPath = `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`;
  const newUrl = new URL(newPath, request.url);

  const res = NextResponse.redirect(newUrl);
  res.cookies.set(cookieName, locale, {
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });
  res.headers.set("X-Locale-Source", "detected");

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
