import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Sparkles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const retentionData = [
  { label: "All users", weeks: [100, 3.3, 1.7, 1.2, 1.0, 0.6], showPercentage: true },
  { label: "20/08 - 24/09", weeks: [95, 85, 75, 60, 45, 30], showPercentage: false },
  { label: "20/08 - 24/09", weeks: [90, 80, 65, 50, 35, 20], showPercentage: false },
  { label: "20/08 - 24/09", weeks: [85, 70, 55, 40, 25, 15], showPercentage: false },
  { label: "20/08 - 24/09", weeks: [80, 60, 45, 30, 20, 10], showPercentage: false },
]

const weekLabels = ["W0", "W1", "W2", "W3", "W4", "W5"]

interface UserRetentionCardProps { onAnalyze?: () => void }

export function UserRetentionCard({ onAnalyze }: UserRetentionCardProps) {
  const getOpacity = (value: number) => {
    if (value >= 80) return 1
    if (value >= 60) return 0.8
    if (value >= 40) return 0.6
    if (value >= 20) return 0.4
    return 0.2
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">User retention</CardTitle>
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
        {/* Week Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          <div className="text-[10px] text-muted-foreground" />
          {weekLabels.map((week) => (
            <div key={week} className="text-center text-[10px] font-medium text-muted-foreground">{week}</div>
          ))}
        </div>
        {/* Retention Rows */}
        <div className="space-y-1">
          {retentionData.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              <div className="text-[10px] text-muted-foreground flex items-center truncate pr-1">{row.label}</div>
              {row.weeks.map((value, colIndex) => (
                <div
                  key={colIndex}
                  className={cn(
                    "h-8 rounded flex items-center justify-center text-[10px] font-medium",
                    "text-primary-foreground"
                  )}
                  style={{ backgroundColor: `hsla(270, 60%, 55%, ${getOpacity(value)})` }}
                >
                  {row.showPercentage ? `${value}%` : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
