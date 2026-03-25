import { LandingNav } from "@/components/landing/landing-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { SocialProofSection } from "@/components/landing/social-proof-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ProductPreviewSection } from "@/components/landing/product-preview-section";
import { AIHighlightSection } from "@/components/landing/ai-highlight-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <ProductPreviewSection />
      <AIHighlightSection />
      <MetricsSection />
      <PricingSection />
      <FinalCTASection />
      <LandingFooter />
    </div>
  );
}
