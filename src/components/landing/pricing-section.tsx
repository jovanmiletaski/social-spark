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
    <section id="pricing" ref={ref} className="py-24 px-6">
      <div
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? "border-primary bg-card shadow-xl shadow-primary/10"
                  : "border-border bg-card hover:shadow-primary/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-full ${
                  plan.popular
                    ? "shadow-md shadow-primary/25"
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
