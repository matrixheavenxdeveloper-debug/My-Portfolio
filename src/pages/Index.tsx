import { Suspense, lazy, type ReactNode } from "react";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";

const TrustSection = lazy(() => import("@/components/sections/TrustSection"));
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection"));
const ProcessSection = lazy(() => import("@/components/sections/ProcessSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));
const Footer = lazy(() => import("@/components/sections/Footer"));
const FloatingButtons = lazy(() => import("@/components/sections/FloatingButtons"));
const UrgencyPopup = lazy(() => import("@/components/sections/UrgencyPopup"));
const PremiumAnimations = lazy(() => import("@/components/sections/PremiumAnimations"));

const SectionFallback = ({ className = "py-20" }: { className?: string }) => (
  <div className={className} aria-hidden="true" />
);

const DeferredSection = ({ children }: { children: ReactNode }) => (
  <div className="deferred-section">{children}</div>
);

const Index = () => {
  return (
    <>
      <Suspense fallback={null}>
        <PremiumAnimations />
      </Suspense>
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <DeferredSection>
          <Suspense fallback={<SectionFallback className="py-16" />}>
            <TrustSection />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback className="py-24" />}>
            <AboutSection />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback className="py-24" />}>
            <ServicesSection />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback className="py-24" />}>
            <ProcessSection />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback className="py-24" />}>
            <TestimonialsSection />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={<SectionFallback className="py-24" />}>
            <ContactSection />
          </Suspense>
        </DeferredSection>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <FloatingButtons />
        <UrgencyPopup />
      </Suspense>
    </>
  );
};

export default Index;
