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
    <section id="product" ref={ref} className="py-28 md:py-32 px-6 bg-muted/20">
      <div
        className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            Product
          </p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-[-0.03em] leading-[1.1]">
            See it in action
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-1.5 mb-12 p-1.5 bg-muted/60 rounded-full w-fit mx-auto border border-border/30">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                active === t.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Preview card */}
        <div className="rounded-2xl border border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.08)]">
          <div className="p-8 md:p-12">
            <h3 className="text-[20px] font-semibold text-foreground mb-2 tracking-[-0.02em]">
              {currentTab.content.title}
            </h3>
            <p className="text-[15px] text-muted-foreground mb-10 max-w-lg leading-[1.6]">
              {currentTab.content.desc}
            </p>
            {/* Mock UI */}
            <div className="rounded-xl bg-muted/30 border border-border/40 aspect-[16/8] grid grid-cols-3 gap-3 p-5">
              <div className="rounded-xl bg-gradient-to-b from-primary/12 to-primary/[0.03] border border-primary/10 shadow-sm" />
              <div className="rounded-xl bg-card/90 border border-border/40 shadow-sm" />
              <div className="rounded-xl bg-card/90 border border-border/40 shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}