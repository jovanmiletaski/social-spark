import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Sparkles, TrendingDown, TrendingUp, Lightbulb } from "lucide-react";

const insights = [
  {
    icon: TrendingDown,
    color: "text-destructive",
    bg: "bg-destructive/10",
    text: "Your Instagram engagement dropped 12% this week.",
  },
  {
    icon: Lightbulb,
    color: "text-primary",
    bg: "bg-primary/10",
    text: "Post Reels between 6-8 PM for 2.3x more reach.",
  },
  {
    icon: TrendingUp,
    color: "text-success",
    bg: "bg-success/10",
    text: "LinkedIn posts with carousels get 45% more saves.",
  },
];

export function AIHighlightSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 px-6">
      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
              Your AI
              <br />
              Growth Assistant
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              Social Spark analyzes your content performance and delivers
              personalized recommendations so you always know what to post, when
              to post, and how to improve.
            </p>
          </div>

          {/* Mock insights */}
          <div className="space-y-4">
            {insights.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
