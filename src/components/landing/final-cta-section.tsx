import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div
        className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
          Start Growing Smarter Today
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
          Join thousands of creators and teams using Social Spark to understand
          their audience and accelerate growth.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="rounded-full px-8 text-base h-12 shadow-lg shadow-primary/25">
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required · Free forever plan
        </p>
      </div>
    </section>
  );
}
