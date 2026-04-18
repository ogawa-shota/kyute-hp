import { AccessStrip } from "@/components/AccessStrip";
import { ConsultSection } from "@/components/ConsultSection";
import { ExamInfoStrip } from "@/components/ExamInfoStrip";
import { FaqSection } from "@/components/FaqSection";
import { HeroSchool } from "@/components/HeroSchool";
import { HighlightCards } from "@/components/HighlightCards";
import { MentorSection } from "@/components/MentorSection";
import { PricingSection } from "@/components/PricingSection";
import { RepresentativeSection } from "@/components/RepresentativeSection";
import { ResultsSection } from "@/components/ResultsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { TestimonialGrid } from "@/components/TestimonialGrid";
import { TopBar } from "@/components/TopBar";
import { WhySection } from "@/components/WhySection";
import { WorrySection } from "@/components/WorrySection";

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <HeroSchool />
        <WorrySection />
        <HighlightCards />
        <ResultsSection />
        <TestimonialGrid />
        <WhySection />
        <MentorSection />
        <AccessStrip />
        <RepresentativeSection />
        <PricingSection />
        <ExamInfoStrip />
        <ConsultSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
