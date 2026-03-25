import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "0",
    desc: "For creators just getting started",
    features: ["2 social accounts", "7-day analytics", "Basic AI insights", "Community support"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    desc: "For growing creators and small teams",
    features: [
      "10 social accounts",
      "90-day analytics",
      "Advanced AI insights",
      "Smart scheduling",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "79",
    desc: "For agencies and larger teams",
    features: [
      "Unlimited accounts",
      "Unlimited history",
      "Custom AI reports",
      "Team collaboration",
      "Dedicated support",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="pricing" ref={ref} className="py-28 md:py-32 px-6">
      <div
        className={`max-w-[960px] mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-20">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            Pricing
          </p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-foreground tracking-[-0.03em] leading-[1.1]">
            Simple, transparent pricing
          </h2>
          <p className="mt-5 text-[16px] text-muted-foreground leading-[1.6]">
            Start free. Upgrade as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 transition-all duration-500 ease-out hover:-translate-y-0.5 ${
                plan.popular
                  ? "border-primary/30 bg-card shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.12)] scale-[1.02]"
                  : "border-border/50 bg-card/80 backdrop-blur-sm hover:border-border hover:shadow-[0_8px_30px_hsl(var(--primary)/0.06)]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold tracking-wide shadow-sm shadow-primary/20">
                  Most Popular
                </span>
              )}
              <h3 className="text-[16px] font-semibold text-foreground tracking-[-0.01em]">{plan.name}</h3>
              <p className="text-[13px] text-muted-foreground mt-1.5">{plan.desc}</p>
              <div className="mt-7 mb-7">
                <span className="text-[40px] font-extrabold text-foreground tracking-[-0.04em]">${plan.price}</span>
                <span className="text-muted-foreground text-[14px] ml-1">/mo</span>
              </div>
              <ul className="space-y-3.5 mb-9">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-full text-[13px] font-medium h-11 transition-all duration-300 ${
                  plan.popular
                    ? "shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}