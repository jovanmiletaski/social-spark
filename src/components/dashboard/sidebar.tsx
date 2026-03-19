import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Sparkles,
  CalendarClock,
  BarChart3,
  User,
  FileText,
  Users,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#", active: true },
  { icon: Sparkles, label: "AI Automation", href: "#" },
  { icon: CalendarClock, label: "Post Scheduler", href: "#" },
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: User, label: "Account", href: "#" },
  { icon: FileText, label: "Report", href: "#" },
  { icon: Users, label: "Team Collaboration", href: "#" },
]

const performanceItems = [
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help Center", href: "#" },
]

interface SidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-col",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">AI-automate</span>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" />
              <AvatarFallback className="bg-primary/10 text-primary">MR</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Mostafizur</p>
              <p className="text-xs text-muted-foreground truncate">mostafizur.rose@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Main Menu</p>
            <div className="space-y-1">
              {mainMenuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Performance</p>
            <div className="space-y-1">
              {performanceItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Upgrade CTA */}
          <div className="mx-1 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">Upgrade Your Plan</p>
            <p className="text-xs text-muted-foreground mb-3">Enjoy more advance feature by upgrading to an enterprise plan!</p>
            <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Upgrade plan
            </Button>
          </div>
        </nav>
      </aside>
    </>
  )
}
