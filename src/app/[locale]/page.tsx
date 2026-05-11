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

export default function Home() {
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
