import { Sparkles } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Security"],
};

export function LandingFooter() {
  return (
    <footer className="border-t border-border/30 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm shadow-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-[14px] font-semibold text-foreground tracking-[-0.01em]">Social Spark</span>
            </div>
            <p className="text-[12px] text-muted-foreground/70 leading-[1.7] max-w-[200px]">
              AI-powered social media analytics for creators and teams.
            </p>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-[11px] font-semibold text-foreground/80 uppercase tracking-[0.15em] mb-4">
                {section}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[12px] text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground/50">
            © 2026 Social Spark. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["X", "LinkedIn", "Instagram"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[11px] text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
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