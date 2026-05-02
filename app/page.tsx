import { AboutSection } from "@/components/AboutSection";
import { CompanySection } from "@/components/CompanySection";
import { ContactSection } from "@/components/ContactSection";
import { HeroCompany } from "@/components/HeroCompany";
import { MissionSection } from "@/components/MissionSection";
import { NewsSection } from "@/components/NewsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <HeroCompany />
        <MissionSection />
        <ServicesSection />
        <AboutSection />
        <NewsSection />
        <CompanySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
