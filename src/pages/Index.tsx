import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Features from "@/components/Features";
import Marketplace from "@/components/Marketplace";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import DevelopmentNotice from "@/components/DevelopmentNotice";

const Index = () => {
  return (
    <main className="overflow-x-hidden w-full">
      <DevelopmentNotice />
      <Header />
      <Hero />
      <SectionDivider responsive={true} delay={800} />
      <Destinations />
      <SectionDivider responsive={true} delay={600} />
      <Marketplace />
      <SectionDivider responsive={true} delay={800} />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
