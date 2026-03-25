import { Sparkles } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security"],
};

export function LandingFooter() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">Social Spark</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI-powered social media analytics for creators and teams.
            </p>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-3">
                {section}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Social Spark. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["X", "LinkedIn", "Instagram"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
