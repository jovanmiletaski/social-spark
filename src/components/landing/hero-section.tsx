import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-medium text-muted-foreground mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Now with AI-powered insights
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] animate-fade-in">
          All Your Social Media.
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            One Powerful Dashboard.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-1">
          Track performance across every platform, get AI-driven recommendations,
          and grow your audience — all from a single, beautiful interface.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
          <Button size="lg" className="rounded-full px-8 text-base h-12 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-12 group">
              <Play className="w-4 h-4 mr-1 group-hover:text-primary transition-colors" />
              View Demo
            </Button>
          </Link>
        </div>

        {/* Trust */}
        <p className="mt-8 text-xs text-muted-foreground animate-fade-in-delay-3">
          No credit card required · Free forever plan · Setup in 2 minutes
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="max-w-5xl mx-auto mt-16 relative animate-fade-in-delay-3">
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-2xl shadow-primary/5 overflow-hidden p-1">
          <div className="rounded-xl bg-muted/50 aspect-[16/9] flex items-center justify-center relative overflow-hidden">
            {/* Mock dashboard grid */}
            <div className="w-full h-full p-4 md:p-6 grid grid-cols-4 grid-rows-3 gap-3">
              <div className="col-span-1 row-span-3 rounded-lg bg-card/80 border border-border hidden md:block" />
              <div className="col-span-4 md:col-span-3 rounded-lg bg-card/80 border border-border" />
              <div className="col-span-2 md:col-span-1 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20" />
              <div className="col-span-2 md:col-span-1 rounded-lg bg-card/80 border border-border" />
              <div className="hidden md:block col-span-1 rounded-lg bg-card/80 border border-border" />
              <div className="col-span-4 md:col-span-2 rounded-lg bg-card/80 border border-border" />
              <div className="hidden md:block col-span-1 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/10" />
            </div>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
          </div>
        </div>
        {/* Glow beneath */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-primary/10 blur-[60px] rounded-full" />
      </div>
    </section>
  );
}
