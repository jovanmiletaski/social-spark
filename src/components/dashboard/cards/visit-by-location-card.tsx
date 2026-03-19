import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, TrendingUp, TrendingDown, Sparkles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const locationData = [
  { country: "United states", flag: "🇺🇸", visitors: 14231, change: 72.08, trending: "up" },
  { country: "Australia", flag: "🇦🇺", visitors: 2458, change: 65.23, trending: "up" },
  { country: "Italy", flag: "🇮🇹", visitors: 1521, change: 91.79, trending: "up" },
  { country: "Ukraine", flag: "🇺🇦", visitors: 1243, change: 56.0, trending: "down" },
  { country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", visitors: 1243, change: 32.12, trending: "down" },
  { country: "Germany", flag: "🇩🇪", visitors: 1087, change: 83.85, trending: "up" },
]

interface VisitByLocationCardProps { onAnalyze?: () => void }

export function VisitByLocationCard({ onAnalyze }: VisitByLocationCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Visit by location</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onAnalyze}><Sparkles className="h-4 w-4 mr-2" />Analyze with AI</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {/* World Map Placeholder */}
        <div className="h-40 mb-4 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 800 400" className="w-full h-full opacity-30">
            <ellipse cx="400" cy="200" rx="350" ry="160" fill="none" stroke="hsl(270,60%,55%)" strokeWidth="1" />
            <circle cx="200" cy="160" r="4" fill="hsl(270,60%,55%)" />
            <circle cx="350" cy="140" r="4" fill="hsl(270,60%,55%)" />
            <circle cx="420" cy="170" r="4" fill="hsl(270,60%,55%)" />
            <circle cx="550" cy="190" r="4" fill="hsl(270,60%,55%)" />
            <circle cx="620" cy="160" r="4" fill="hsl(270,60%,55%)" />
          </svg>
        </div>
        <div className="space-y-2.5">
          {locationData.map((item) => (
            <div key={item.country} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>{item.flag}</span>
                <span className="text-foreground">{item.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground font-medium">{item.visitors.toLocaleString()}</span>
                <span className={`flex items-center gap-0.5 ${item.trending === "up" ? "text-success" : "text-destructive"}`}>
                  {item.trending === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {item.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
