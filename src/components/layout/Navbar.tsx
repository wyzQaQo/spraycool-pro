"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { List, X, Drop, Globe, CaretDown } from "@phosphor-icons/react";
import { locales, localeNames, type Locale } from "@/i18n/config";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applicationsDropdown: DropdownItem[] = [
    { label: t("navDropdown.applications.commercial"), href: "/applications/commercial-hospitality", description: "Hotels, Resorts, Restaurants, Beach Clubs" },
    { label: t("navDropdown.applications.residential"), href: "/applications/residential", description: "Backyards, Patios, Gardens" },
    { label: t("navDropdown.applications.agriculture"), href: "/applications/agriculture", description: "Greenhouses, Livestock, Poultry" },
    { label: t("navDropdown.applications.industrial"), href: "/applications/industrial", description: "Dust Suppression, Warehouses, Construction" },
    { label: t("navDropdown.applications.events"), href: "/applications/events-sports", description: "Stadiums, Outdoor Events, Golf Courses" },
  ];

  const problemsDropdown: DropdownItem[] = [
    { label: t("navDropdown.problems.heat"), href: "/problems/high-outdoor-temperature", description: "Hotels, Restaurants, Patios" },
    { label: t("navDropdown.problems.mosquito"), href: "/problems/mosquito-problems", description: "Resorts, Villas, Outdoor Venues" },
    { label: t("navDropdown.problems.dust"), href: "/problems/dust-control", description: "Construction Sites, Mines, Ports" },
    { label: t("navDropdown.problems.livestock"), href: "/problems/livestock-heat-stress", description: "Dairy Farms, Poultry Operations" },
    { label: t("navDropdown.problems.greenhouse"), href: "/problems/greenhouse-humidity", description: "Greenhouse Growing Operations" },
  ];

  const productsDropdown: DropdownItem[] = [
    { label: t("navDropdown.products.complete"), href: "/products/complete-systems", description: "All-in-one cooling & mosquito systems" },
    { label: t("navDropdown.products.pumps"), href: "/products/pump-stations", description: "High-pressure pump stations" },
    { label: t("navDropdown.products.nozzles"), href: "/products/nozzles-accessories", description: "Ceramic nozzles & fittings" },
    { label: t("navDropdown.products.controls"), href: "/products/control-systems", description: "IoT control hubs" },
    { label: t("navDropdown.products.mosquito"), href: "/products/mosquito-systems", description: "Automated mosquito control" },
    { label: t("navDropdown.products.water"), href: "/products/water-treatment", description: "Filtration & water treatment" },
  ];

  const navItems: NavItem[] = [
    { label: t("nav.applications"), dropdown: applicationsDropdown },
    { label: t("nav.problems"), dropdown: problemsDropdown },
    { label: t("nav.products"), dropdown: productsDropdown },
    { label: t("nav.about"), href: "/about" },
  ];

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-deep-950/80 backdrop-blur-xl border-b border-spray-500/10 shadow-lg shadow-spray-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-spray-500 to-spray-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-spray-500/30 transition-shadow duration-300">
              <Drop size={20} weight="fill" className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              100<span className="text-spray-400">Cooling</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm text-gray-400 hover:text-spray-400 transition-colors duration-200 tracking-wide rounded-lg hover:bg-spray-500/5"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors duration-200 tracking-wide rounded-lg ${
                      activeDropdown === item.label
                        ? "text-spray-400 bg-spray-500/5"
                        : "text-gray-400 hover:text-spray-400 hover:bg-spray-500/5"
                    }`}
                  >
                    {item.label}
                    <CaretDown
                      size={12}
                      weight="bold"
                      className={`transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 bg-deep-900 border border-spray-500/20 rounded-xl py-2 min-w-[280px] shadow-2xl shadow-black/50"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 hover:bg-spray-500/5 transition-colors group"
                        >
                          <div className="text-sm text-gray-300 group-hover:text-spray-400 transition-colors font-medium">
                            {sub.label}
                          </div>
                          {sub.description && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {sub.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Language Switcher */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-spray-400 transition-colors py-1 px-2 rounded-lg hover:bg-spray-500/5"
              >
                <Globe size={16} />
                <span className="uppercase">{locale}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full right-0 mt-2 bg-deep-900 border border-spray-500/20 rounded-xl p-1.5 min-w-[140px] shadow-xl"
                  >
                    {locales.map((l) => (
                      <Link
                        key={l}
                        href={pathname}
                        locale={l}
                        onClick={() => setLangOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          l === locale
                            ? "bg-spray-500/10 text-spray-400"
                            : "text-gray-400 hover:text-spray-400 hover:bg-spray-500/5"
                        }`}
                      >
                        {localeNames[l]}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className="ml-3 px-5 py-2 rounded-full bg-spray-500/10 border border-spray-500/30 text-spray-400 text-sm font-medium hover:bg-spray-500/20 hover:border-spray-500/50 transition-all duration-300"
            >
              {t("nav.requestQuote")}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gray-300 hover:text-spray-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-30 lg:hidden bg-deep-950/95 backdrop-blur-xl border-b border-spray-500/10 max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {/* Applications */}
              <MobileDropdown
                title={t("nav.applications")}
                items={applicationsDropdown}
                onNavigate={() => setMobileOpen(false)}
              />
              {/* Problems */}
              <MobileDropdown
                title={t("nav.problems")}
                items={problemsDropdown}
                onNavigate={() => setMobileOpen(false)}
              />
              {/* Products */}
              <MobileDropdown
                title={t("nav.products")}
                items={productsDropdown}
                onNavigate={() => setMobileOpen(false)}
              />

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="text-gray-300 hover:text-spray-400 transition-colors py-3 text-lg block border-b border-spray-500/10"
              >
                {t("nav.about")}
              </Link>

              {/* Mobile language switcher */}
              <div className="flex gap-2 pt-3">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={pathname}
                    locale={l}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      l === locale
                        ? "bg-spray-500/10 text-spray-400 border border-spray-500/20"
                        : "text-gray-500 hover:text-spray-400"
                    }`}
                  >
                    {localeNames[l]}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 rounded-full bg-spray-500 text-black font-semibold text-center hover:bg-spray-400 transition-colors"
              >
                {t("nav.requestQuote")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileDropdown({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: DropdownItem[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-spray-500/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-gray-300 hover:text-spray-400 transition-colors py-3 text-lg"
      >
        {title}
        <CaretDown
          size={16}
          weight="bold"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-3 space-y-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="block py-2 text-sm text-gray-400 hover:text-spray-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
