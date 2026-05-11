import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brand from "@/components/Brand";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import CtaBanner from "@/components/CtaBanner";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyContact from "@/components/StickyContact";
import SocialSidebar from "@/components/SocialSidebar";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Brand />
        <Services />
        <Portfolio />
        <CtaBanner />
        <Process />
        <Contact />
      </main>
      <Footer />
      <StickyContact />
      <SocialSidebar />
    </>
  );
}
