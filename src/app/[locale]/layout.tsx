import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
import "../globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-playfair" });

const SITE_URL = "https://artforma.md";

const metaByLocale: Record<string, { title: string; description: string; keywords: string }> = {
  ro: {
    title: "ArtForma — Mobilă la Comandă în Chișinău | Bucătării, Dulapuri, Dormitoare",
    description: "Producător de mobilă la comandă din Chișinău, Moldova. Bucătării, dulapuri, dormitoare și living-uri personalizate. Design 3D gratuit. ☎ +373 79-100-380",
    keywords: "mobila la comanda Chisinau, bucatarii la comanda, dulapuri la comanda, dormitoare la comanda, mobila personalizata Moldova, producator mobila Chisinau, ArtForma, mobila premium Moldova",
  },
  ru: {
    title: "ArtForma — Мебель на заказ в Кишинёве | Кухни, Шкафы, Спальни",
    description: "Производитель мебели на заказ из Кишинёва, Молдова. Кухни, шкафы, спальни и гостиные на заказ. Бесплатный 3D-дизайн. ☎ +373 79-100-380",
    keywords: "мебель на заказ Кишинев, кухни на заказ Молдова, шкафы на заказ, спальни на заказ, мебель под заказ Кишинев, ArtForma мебель",
  },
  en: {
    title: "ArtForma — Custom Furniture in Chișinău, Moldova | Kitchens, Wardrobes",
    description: "Custom furniture manufacturer in Chișinău, Moldova. Kitchens, wardrobes, bedrooms & living rooms made to order. Free 3D design. ☎ +373 79-100-380",
    keywords: "custom furniture Chisinau, made to order furniture Moldova, kitchen manufacturer Chisinau, ArtForma furniture Moldova, bespoke furniture",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = metaByLocale[locale] ?? metaByLocale.ro;
  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ro": `${SITE_URL}/ro`,
        "ru": `${SITE_URL}/ru`,
        "en": `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/ro`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonicalUrl,
      siteName: "ArtForma",
      locale: locale === "ru" ? "ru_MD" : locale === "en" ? "en_US" : "ro_MD",
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ArtForma — Mobilă la Comandă" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
    verification: { google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_ID" },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${SITE_URL}/#organization`,
  name: "ArtForma",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/og-image.jpg`,
  description: "Producător de mobilă la comandă din Chișinău, Moldova. Bucătării, dulapuri, dormitoare și living-uri personalizate.",
  telephone: "+37379100380",
  email: "artforma.md@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Str. Mitropolit Dosoftei 115 A",
    addressLocality: "Chișinău",
    addressCountry: "MD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.0359625,
    longitude: 28.8189488,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
  ],
  sameAs: [
    "https://www.instagram.com/artforma.md/",
    "https://www.facebook.com/artforma.md/",
    "https://www.tiktok.com/@artforma.md",
    "https://www.google.com/maps/place/ArtForma/@47.0359625,28.8189488,16z",
  ],
  priceRange: "$$",
  currenciesAccepted: "MDL",
  paymentAccepted: "Cash, Bank Transfer",
  areaServed: { "@type": "City", name: "Chișinău" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobilă la Comandă",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bucătării la Comandă" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dulapuri & Dressing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dormitoare Complete" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Living & Sufragerie" } },
    ],
  },
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        {/* Google Ads conversion label placeholder — replace with real tag */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"></script> */}
      </head>
      <body className="min-h-dvh flex flex-col" style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
