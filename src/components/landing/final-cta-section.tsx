import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.04] blur-[120px] rounded-full pointer-events-none" />
      
      <div
        className={`max-w-[600px] mx-auto text-center relative z-10 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-[32px] md:text-[48px] font-bold text-foreground tracking-[-0.03em] leading-[1.1]">
          Start Growing Smarter Today
        </h2>
        <p className="mt-5 text-[17px] text-muted-foreground max-w-[460px] mx-auto leading-[1.6]">
          Join thousands of creators and teams using Social Spark to understand
          their audience and accelerate growth.
        </p>
        <div className="mt-10">
          <Button size="lg" className="rounded-full px-8 text-[15px] font-medium h-[52px] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
        <p className="mt-5 text-[12px] text-muted-foreground/60 tracking-wide">
          No credit card required · Free forever plan
        </p>
      </div>
    </section>
  );
}