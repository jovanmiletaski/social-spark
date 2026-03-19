import { cn } from "@/lib/utils"
import { Home, BarChart3, Plus, Calendar, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: Home, label: "Dashboard", href: "#", active: true },
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: Plus, label: "Create", href: "#", isCenter: true },
  { icon: Calendar, label: "Calendar", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 p-2",
              item.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.isCenter ? (
              <Button size="icon" className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg -mt-6">
                <Plus className="h-6 w-6" />
              </Button>
            ) : (
              <>
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </a>
        ))}
      </div>
    </nav>
  )
}
