import { Search, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
  userName?: string
}

export function DashboardHeader({ className, userName = "Mostafizur" }: HeaderProps) {
  return (
    <header className={cn("flex items-center justify-between px-6 py-4 border-b border-border bg-card", className)}>
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground">
          Welcome Back, <span className="text-primary">{userName}</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 w-64 bg-muted/50 border-border"
          />
        </div>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" />
          <AvatarFallback className="bg-primary/10 text-primary">{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
