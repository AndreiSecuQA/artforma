"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

function LanguageSwitcher({ dark }: { dark?: boolean }) {
  const t = useTranslations("lang");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const currentLocale = routing.locales.find((l) => pathname.startsWith(`/${l}`)) ?? "ro";

  const switchTo = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  const borderCol = dark ? "rgba(255,255,255,0.2)" : "var(--charcoal-200)";
  const textCol = dark ? "rgba(200,200,184,0.9)" : "var(--charcoal-700)";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-200 cursor-pointer"
        style={{ borderColor: borderCol, color: textCol }}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <Globe size={12} />
        {t(currentLocale as "ro" | "ru" | "en")}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 rounded-xl border overflow-hidden shadow-xl z-50"
            style={{ backgroundColor: "var(--charcoal-900)", borderColor: "rgba(255,255,255,0.1)", minWidth: 80 }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {routing.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchTo(locale)}
                className="w-full px-4 py-2.5 text-xs font-semibold text-left transition-colors duration-150 cursor-pointer"
                style={{
                  color: locale === currentLocale ? "var(--cream-100)" : "rgba(200,200,184,0.7)",
                  backgroundColor: locale === currentLocale ? "rgba(255,255,255,0.07)" : "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = locale === currentLocale ? "rgba(255,255,255,0.07)" : "transparent")}
              >
                {t(locale as "ro" | "ru" | "en")}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: t("services"), href: "#servicii" },
    { label: t("portfolio"), href: "#portofoliu" },
    { label: t("process"), href: "#proces" },
    { label: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(13,13,11,0.96)" : "rgba(13,13,11,0.75)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" aria-label="ArtForma acasă" className="flex flex-col leading-none">
            <span
              className="font-bold tracking-[0.14em] uppercase"
              style={{ fontSize: "1.35rem", color: "var(--cream-100)", fontFamily: "var(--font-playfair), serif" }}
            >
              ArtForma
            </span>
            <span
              className="text-[9px] font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--wood-400)" }}
            >
              Mobilă la Comandă
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navigare principală">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
                style={{ color: "rgba(200,200,184,0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream-100)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,200,184,0.75)")}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher dark />
            <a
              href="tel:+37379100380"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(200,200,184,0.75)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream-100)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,200,184,0.75)")}
            >
              <Phone size={13} />
              {t("phone")}
            </a>
            <button
              onClick={() => handleNav("#contact")}
              className="px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: "var(--wood-600)", color: "var(--cream-100)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--wood-400)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--wood-600)")}
            >
              {t("cta")}
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--cream-100)" }}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Închide meniu" : "Deschide meniu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ backgroundColor: "var(--charcoal-950)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="h-16" />
            <div className="flex flex-col px-6 pt-8 pb-10 gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-2xl font-medium py-4 border-b cursor-pointer"
                  style={{
                    color: "var(--cream-100)",
                    borderColor: "rgba(255,255,255,0.07)",
                    fontFamily: "var(--font-playfair), serif",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-6">
                <LanguageSwitcher dark />
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="tel:+37379100380"
                  className="flex items-center gap-2 text-base font-medium"
                  style={{ color: "rgba(200,200,184,0.8)" }}
                >
                  <Phone size={16} /> {t("phone")}
                </a>
                <button
                  onClick={() => handleNav("#contact")}
                  className="w-full py-3.5 text-base font-semibold rounded-full mt-2 cursor-pointer"
                  style={{ backgroundColor: "var(--wood-600)", color: "var(--cream-100)" }}
                >
                  {t("cta")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
