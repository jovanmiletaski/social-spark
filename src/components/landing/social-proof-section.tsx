import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const logos = ["Instagram", "YouTube", "X / Twitter", "Facebook", "LinkedIn"];

const testimonials = [
  {
    quote: "Social Spark helped us increase engagement by 45% in just one month.",
    name: "Sarah Chen",
    role: "Head of Marketing, Bloom",
  },
  {
    quote: "The AI recommendations are spot on. It's like having a growth expert on the team.",
    name: "Marcus Reid",
    role: "Creator, 500K+ followers",
  },
  {
    quote: "We cut our reporting time from 3 hours to 5 minutes. Absolutely essential.",
    name: "Priya Desai",
    role: "Social Media Manager, Relay",
  },
];

export function SocialProofSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-20 px-6 border-t border-border/50">
      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Platform logos */}
        <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Track every major platform
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mb-20">
          {logos.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              {name}
            </span>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <p className="text-sm text-foreground leading-relaxed mb-5">
                "{t.quote}"
              </p>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
