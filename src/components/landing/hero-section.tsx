import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-primary/[0.06] blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-[-100px] w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none animate-float" />

      <div className="max-w-[720px] mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm text-[11px] font-medium text-muted-foreground mb-8 animate-fade-in shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Now with AI-powered insights
        </div>

        {/* Headline */}
        <h1 className="text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-extrabold tracking-[-0.035em] text-foreground leading-[1.05] animate-fade-in">
          All Your Social Media.
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
            One Powerful Dashboard.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-[17px] md:text-[19px] text-muted-foreground max-w-[540px] mx-auto leading-[1.6] animate-fade-in-delay-1 font-normal">
          Track performance across every platform, get AI-driven recommendations,
          and grow your audience — all from a single, beautiful interface.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
          <Button size="lg" className="rounded-full px-8 text-[15px] font-medium h-[52px] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="rounded-full px-8 text-[15px] font-medium h-[52px] group border-border/60 hover:border-border hover:bg-card transition-all duration-300">
              <Play className="w-4 h-4 mr-1.5 group-hover:text-primary transition-colors duration-200" />
              View Demo
            </Button>
          </Link>
        </div>

        {/* Trust */}
        <p className="mt-8 text-[12px] text-muted-foreground/70 animate-fade-in-delay-3 tracking-wide">
          No credit card required · Free forever plan · Setup in 2 minutes
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="max-w-[1000px] mx-auto mt-20 relative animate-fade-in-delay-3">
        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.1),0_0_0_1px_hsl(var(--border)/0.5)] overflow-hidden p-1.5">
          <div className="rounded-[14px] bg-muted/40 aspect-[16/9] flex items-center justify-center relative overflow-hidden">
            {/* Mock dashboard grid */}
            <div className="w-full h-full p-4 md:p-6 grid grid-cols-4 grid-rows-3 gap-3">
              <div className="col-span-1 row-span-3 rounded-xl bg-card/90 border border-border/50 hidden md:block shadow-sm" />
              <div className="col-span-4 md:col-span-3 rounded-xl bg-card/90 border border-border/50 shadow-sm" />
              <div className="col-span-2 md:col-span-1 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 shadow-sm" />
              <div className="col-span-2 md:col-span-1 rounded-xl bg-card/90 border border-border/50 shadow-sm" />
              <div className="hidden md:block col-span-1 rounded-xl bg-card/90 border border-border/50 shadow-sm" />
              <div className="col-span-4 md:col-span-2 rounded-xl bg-card/90 border border-border/50 shadow-sm" />
              <div className="hidden md:block col-span-1 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 shadow-sm" />
            </div>
            {/* Shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
          </div>
        </div>
        {/* Glow beneath */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-primary/8 blur-[80px] rounded-full" />
      </div>
    </section>
  );
}