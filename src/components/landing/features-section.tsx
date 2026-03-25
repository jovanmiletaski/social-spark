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
    <section id="features" ref={ref} className="py-24 px-6">
      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Everything you need to grow
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Powerful tools designed for creators, marketers, and teams who want to
            understand and improve their social presence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
