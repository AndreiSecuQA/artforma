"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/artforma.md/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/artforma.md/",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@artforma.md",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.35a8.16 8.16 0 004.77 1.52V7.42a4.85 4.85 0 01-1-.73z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");

  const navLinks = [
    { label: n("services"), href: "#servicii" },
    { label: n("portfolio"), href: "#portofoliu" },
    { label: n("process"), href: "#proces" },
    { label: n("contact"), href: "#contact" },
  ];

  const contactItems = [
    { icon: Phone, text: "+373 79-100-380", href: "tel:+37379100380" },
    { icon: Mail, text: "artforma.md@gmail.com", href: "mailto:artforma.md@gmail.com" },
    { icon: MapPin, text: "Str. Mitropolit Dosoftei 115 A, Chișinău", href: "https://www.google.com/maps/place/ArtForma/@47.0359625,28.8189488,16z" },
    { icon: Clock, text: "Lun–Vin: 09:00–18:00\nSâm: 09:00–14:00", href: null },
  ];

  return (
    <footer style={{ backgroundColor: "var(--charcoal-950)", color: "var(--charcoal-200)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="text-2xl font-bold" style={{ color: "var(--cream-100)", fontFamily: "var(--font-playfair), serif" }}>
                ArtForma
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase mt-0.5" style={{ color: "var(--wood-400)" }}>
                {t("tagline")}
              </p>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--charcoal-400)" }}>
              {t("about")}
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: "var(--charcoal-800)", color: "var(--charcoal-400)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--charcoal-700)";
                    e.currentTarget.style.color = "var(--cream-100)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--charcoal-800)";
                    e.currentTarget.style.color = "var(--charcoal-400)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-5" style={{ color: "var(--charcoal-400)" }}>
              {t("menu")}
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--charcoal-400)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream-100)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-400)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-5" style={{ color: "var(--charcoal-400)" }}>
              {t("contact_col")}
            </p>
            <ul className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--wood-400)" }} strokeWidth={1.5} />
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm leading-snug transition-colors duration-200"
                      style={{ color: "var(--charcoal-400)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream-100)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--charcoal-400)")}
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm leading-snug whitespace-pre-line" style={{ color: "var(--charcoal-400)" }}>
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "var(--charcoal-800)" }}>
            <p className="text-base font-semibold leading-snug" style={{ color: "var(--cream-100)", fontFamily: "var(--font-playfair), serif" }}>
              {t("cta_heading")}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--charcoal-400)" }}>
              {t("cta_sub")}
            </p>
            <a
              href="#contact"
              className="block text-center py-2.5 text-xs font-semibold rounded-full transition-all duration-200"
              style={{ backgroundColor: "var(--wood-600)", color: "var(--cream-100)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--wood-400)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--wood-600)")}
            >
              {t("cta_button")}
            </a>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--charcoal-800)" }}
        >
          <p className="text-xs" style={{ color: "var(--charcoal-600)" }}>
            © {new Date().getFullYear()} ArtForma.md — {t("rights")}
          </p>
          <p className="text-xs" style={{ color: "var(--charcoal-600)" }}>
            {t("city")}
          </p>
        </div>
      </div>
    </footer>
  );
}
