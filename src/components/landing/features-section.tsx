import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  LayoutDashboard,
  Sparkles,
  Globe,
  CalendarClock,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    desc: "See all your platforms — Instagram, YouTube, X, Facebook, LinkedIn — in one clean view.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    desc: "Get actionable recommendations to boost engagement and grow your audience faster.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Tracking",
    desc: "Connect every account and track followers, reach, and engagement across all channels.",
  },
  {
    icon: CalendarClock,
    title: "Smart Scheduling",
    desc: "Plan and schedule posts at the optimal time for maximum reach and engagement.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "Deep-dive into conversion rates, audience demographics, and content performance.",
  },
];

export function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="features" ref={ref} className="py-28 md:py-32 px-6">
      <div
        className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-20">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            Features
          </p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-[-0.03em] leading-[1.1]">
            Everything you need to grow
          </h2>
          <p className="mt-5 text-[16px] text-muted-foreground max-w-[500px] mx-auto leading-[1.6]">
            Powerful tools designed for creators, marketers, and teams who want to
            understand and improve their social presence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-7 hover:border-primary/25 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.06)] hover:-translate-y-0.5 transition-all duration-500 ease-out"
            >
              <div className="w-11 h-11 rounded-[14px] bg-primary/[0.08] flex items-center justify-center mb-5 group-hover:bg-primary/[0.14] group-hover:shadow-sm transition-all duration-500">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-[15px] font-semibold text-foreground mb-2 tracking-[-0.01em]">
                {f.title}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-[1.7]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}