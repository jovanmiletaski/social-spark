import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { BarChart3, CalendarClock, Sparkles } from "lucide-react";

const tabs = [
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    content: {
      title: "Real-time performance metrics",
      desc: "Track followers, engagement rate, impressions, and conversions across all platforms with beautiful charts.",
    },
  },
  {
    id: "scheduling",
    label: "Scheduling",
    icon: CalendarClock,
    content: {
      title: "Plan your content calendar",
      desc: "Schedule posts at optimal times with our AI-suggested posting schedule and approval workflow.",
    },
  },
  {
    id: "ai",
    label: "AI Insights",
    icon: Sparkles,
    content: {
      title: "Smart recommendations",
      desc: "Get personalized suggestions to improve content strategy, posting frequency, and audience targeting.",
    },
  },
];

export function ProductPreviewSection() {
  const [active, setActive] = useState("analytics");
  const { ref, isVisible } = useScrollReveal();
  const currentTab = tabs.find((t) => t.id === active)!;

  return (
    <section id="product" ref={ref} className="py-24 px-6 bg-muted/30">
      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            Product
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            See it in action
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === t.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Preview card */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xl shadow-primary/5">
          <div className="p-8 md:p-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {currentTab.content.title}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg">
              {currentTab.content.desc}
            </p>
            {/* Mock UI */}
            <div className="rounded-xl bg-muted/50 border border-border aspect-[16/8] grid grid-cols-3 gap-3 p-4">
              <div className="rounded-lg bg-gradient-to-b from-primary/15 to-primary/5 border border-primary/10" />
              <div className="rounded-lg bg-card border border-border" />
              <div className="rounded-lg bg-card border border-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
