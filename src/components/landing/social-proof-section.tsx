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
    <section ref={ref} className="py-24 md:py-28 px-6 border-t border-border/30">
      <div
        className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Platform logos */}
        <p className="text-center text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-10">
          Track every major platform
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mb-24">
          {logos.map((name) => (
            <span
              key={name}
              className="text-[14px] font-medium text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-7 hover:border-border hover:shadow-[0_8px_30px_hsl(var(--primary)/0.06)] hover:-translate-y-0.5 transition-all duration-500 ease-out"
            >
              <p className="text-[14px] text-foreground/90 leading-[1.7] mb-6 font-normal">
                "{t.quote}"
              </p>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}