import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const metrics = [
  { value: "+45%", label: "Average engagement increase" },
  { value: "3×", label: "Faster audience growth" },
  { value: "10+", label: "Hours saved per week" },
  { value: "5", label: "Platforms in one view" },
];

export function MetricsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-28 md:py-32 px-6 bg-muted/20">
      <div
        className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-20">
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-[-0.03em] leading-[1.1]">
            Real results, real growth
          </h2>
          <p className="mt-5 text-[16px] text-muted-foreground leading-[1.6]">
            Creators and teams using Social Spark see measurable improvements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <div key={i} className="text-center group">
              <p className="text-[48px] md:text-[56px] font-extrabold tracking-[-0.04em] bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent leading-none">
                {m.value}
              </p>
              <p className="mt-3 text-[13px] text-muted-foreground font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}