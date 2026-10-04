"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Drop, LinkedinLogo, Envelope, Phone, MapPin } from "@phosphor-icons/react";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const footerLinks = {
    [t("footer.products")]: [
      { label: "Complete Systems", href: "/products/complete-systems" as const },
      { label: "Pump Stations", href: "/products/pump-stations" as const },
      { label: "Nozzles & Accessories", href: "/products/nozzles-accessories" as const },
      { label: "Control Systems", href: "/products/control-systems" as const },
      { label: "Mosquito Systems", href: "/products/mosquito-systems" as const },
    ],
    "Applications": [
      { label: "Commercial & Hospitality", href: "/applications/commercial-hospitality" as const },
      { label: "Residential", href: "/applications/residential" as const },
      { label: "Agriculture", href: "/applications/agriculture" as const },
      { label: "Industrial", href: "/applications/industrial" as const },
      { label: "Events & Sports", href: "/applications/events-sports" as const },
    ],
    [t("footer.company")]: [
      { label: "About Us", href: "/about" as const },
      { label: "Our Factory", href: "/factory" as const },
      { label: "Quality Control", href: "/quality" as const },
      { label: "Certifications", href: "/certificates" as const },
      { label: "Blog", href: "/blog" as const },
    ],
    [t("footer.support")]: [
      { label: "Contact Us", href: "/contact" as const },
      { label: "FAQ", href: "/faq" as const },
      { label: "Resource Center", href: "/resources" as const },
      { label: "Privacy Policy", href: "/privacy-policy" as const },
      { label: "Terms of Service", href: "/terms-of-service" as const },
    ],
  };

  return (
    <footer className="relative border-t border-spray-500/10 bg-deep-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand + Contact Info */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-spray-500 to-spray-600 flex items-center justify-center">
                <Drop size={20} weight="fill" className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                100<span className="text-spray-400">Cooling</span>
              </span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              {t("site.tagline")}
            </p>

            {/* Contact Details */}
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-spray-400 mt-0.5 shrink-0" weight="fill" />
                <span className="text-gray-500 text-xs leading-relaxed">
                  Yangguo Trade LLC<br />
                  30 N Gould St Ste N<br />
                  Sheridan, WY 82801, USA
                </span>
              </div>
              <a href="tel:+8617843803954" className="flex items-center gap-2.5 group">
                <Phone size={15} className="text-spray-400 shrink-0" weight="fill" />
                <span className="text-gray-500 text-xs group-hover:text-spray-400 transition-colors">
                  +86 178 4380 3954
                </span>
              </a>
              <a href="mailto:info@100cooling.com" className="flex items-center gap-2.5 group">
                <Envelope size={15} className="text-spray-400 shrink-0" weight="fill" />
                <span className="text-gray-500 text-xs group-hover:text-spray-400 transition-colors">
                  info@100cooling.com
                </span>
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/100cooling"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-spray-500/10 border border-spray-500/20 flex items-center justify-center text-gray-400 hover:text-spray-400 hover:border-spray-500/40 transition-all"
              >
                <LinkedinLogo size={16} weight="fill" />
              </a>
              <a
                href="mailto:info@100cooling.com"
                className="w-8 h-8 rounded-lg bg-spray-500/10 border border-spray-500/20 flex items-center justify-center text-gray-400 hover:text-spray-400 hover:border-spray-500/40 transition-all"
              >
                <Envelope size={16} weight="fill" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-500 text-sm hover:text-spray-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-spray-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {year} Yangguo Trade LLC — 100Cooling.com. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-gray-600 text-xs hover:text-spray-400 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms-of-service" className="text-gray-600 text-xs hover:text-spray-400 transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
