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
    <section ref={ref} className="py-24 px-6 bg-muted/30">
      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Real results, real growth
          </h2>
          <p className="mt-4 text-muted-foreground">
            Creators and teams using Social Spark see measurable improvements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
