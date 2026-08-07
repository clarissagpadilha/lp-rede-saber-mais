import { Footer, Header } from "@/components/layout";
import { StickyCta, UtmCapture, WhatsAppButton } from "@/components/marketing";
import { JsonLd } from "@/components/seo";
import {
  BenefitsSection,
  CeoStorySection,
  ComplementarySection,
  ConceptSection,
  CredibilityBar,
  CtaFinalSection,
  EcosystemSection,
  ExperienceSection,
  FamilySection,
  FaqSection,
  HeroSection,
  ImplementationSection,
  LeadFormSection,
  PersonalizationSection,
  ProblemSection,
  SegmentsSection,
  SponsorsSection,
} from "@/components/sections";
import { getHomeJsonLd } from "@/lib/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <Header variant="hero" />
      <div className="relative -mt-[var(--header-height)] isolate overflow-x-clip bg-[#f7fafc]">
        <HeroSection />
      </div>
      <main
        id="conteudo-principal"
        className="pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0"
      >
        <CredibilityBar />
        <ProblemSection />
        <ConceptSection />
        <EcosystemSection />
        <FamilySection />
        <BenefitsSection />
        <SegmentsSection />
        <ImplementationSection />
        <ComplementarySection />
        <PersonalizationSection />
        <ExperienceSection />
        <SponsorsSection />
        <FaqSection />
        <CeoStorySection />
        <CtaFinalSection />
        <LeadFormSection />
      </main>
      <Footer />
      <UtmCapture />
      <StickyCta />
      <WhatsAppButton />
    </>
  );
}
