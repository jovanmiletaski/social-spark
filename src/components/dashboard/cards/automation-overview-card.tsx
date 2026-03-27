import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Sparkles } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartData = [
  { name: "Sun", twitter: 150, instagram: 120, youtube: 80, facebook: 100, linkedin: 50 },
  { name: "Mon", twitter: 200, instagram: 180, youtube: 120, facebook: 150, linkedin: 80 },
  { name: "Tue", twitter: 180, instagram: 160, youtube: 100, facebook: 130, linkedin: 70 },
  { name: "Wed", twitter: 220, instagram: 200, youtube: 140, facebook: 170, linkedin: 90 },
  { name: "Thu", twitter: 250, instagram: 230, youtube: 160, facebook: 190, linkedin: 100 },
  { name: "Fri", twitter: 350, instagram: 320, youtube: 200, facebook: 250, linkedin: 120 },
  { name: "Sat", twitter: 300, instagram: 280, youtube: 180, facebook: 220, linkedin: 110 },
]

const platformColors: Record<string, string> = {
  twitter: "#1d9bf0", instagram: "#e1306c", youtube: "#ff0000", facebook: "#1877f2", linkedin: "#0a66c2",
}

interface AutomationOverviewCardProps { onAnalyze?: () => void }

export function AutomationOverviewCard({ onAnalyze }: AutomationOverviewCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Automation Overview</CardTitle>
        <div className="flex items-center gap-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="h-8 w-[90px] text-xs shrink-0"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.entries(platformColors).map(([platform, color]) => (
            <div key={platform} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground capitalize">{platform}</span>
            </div>
          ))}
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={2} barSize={8}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(260,10%,45%)' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(260,10%,45%)' }} />
              <Tooltip />
              {Object.entries(platformColors).map(([key, color]) => (
                <Bar key={key} dataKey={key} fill={color} radius={[3, 3, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
