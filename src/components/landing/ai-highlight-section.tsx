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
    <section ref={ref} className="py-28 md:py-32 px-6">
      <div
        className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.08] text-primary text-[11px] font-semibold uppercase tracking-[0.1em] mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered
            </div>
            <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-[-0.03em] leading-[1.1]">
              Your AI
              <br />
              Growth Assistant
            </h2>
            <p className="mt-5 text-[16px] text-muted-foreground leading-[1.7] max-w-[420px]">
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
                className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 hover:border-border hover:shadow-[0_8px_30px_hsl(var(--primary)/0.06)] hover:-translate-y-0.5 transition-all duration-500 ease-out"
              >
                <div
                  className={`w-10 h-10 rounded-[12px] ${item.bg} flex items-center justify-center shrink-0`}
                >
                  <item.icon className={`w-[18px] h-[18px] ${item.color}`} />
                </div>
                <p className="text-[14px] text-foreground/90 leading-[1.6] pt-1.5">
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