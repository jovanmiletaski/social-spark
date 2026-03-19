import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, TrendingUp, Monitor, Smartphone, Sparkles } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const chartData = [
  { name: "Jan", value: 200 }, { name: "Feb", value: 350 }, { name: "Mar", value: 280 },
  { name: "Apr", value: 420 }, { name: "May", value: 380 }, { name: "Jun", value: 350 }, { name: "Jul", value: 280 },
]

const countryData = [
  { country: "United states", flag: "🇺🇸", mobile: 245, desktop: 120 },
  { country: "Germany", flag: "🇩🇪", mobile: 460, desktop: 243 },
  { country: "Australia", flag: "🇦🇺", mobile: 201, desktop: 98 },
]

interface TotalVisitorsCardProps { onAnalyze?: () => void }

export function TotalVisitorsCard({ onAnalyze }: TotalVisitorsCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Total Visitor</CardTitle>
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
        <div className="mb-4">
          <p className="text-3xl font-bold text-foreground">12,436</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <TrendingUp className="h-3 w-3 text-success" />
            Total Visitor increase <span className="text-success font-medium">16%</span> then last post
          </div>
        </div>
        <div className="h-32 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(260,10%,45%)' }} />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(270,60%,55%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <Smartphone className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">500 People</p>
              <p className="text-[10px] text-muted-foreground">70% mobile view</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <Monitor className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">300 People</p>
              <p className="text-[10px] text-muted-foreground">30% Desktop view</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {countryData.map((item) => (
            <div key={item.country} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>{item.flag}</span>
                <span className="text-foreground">{item.country}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1"><Smartphone className="h-3 w-3" /> {item.mobile}</span>
                <span className="flex items-center gap-1"><Monitor className="h-3 w-3" /> {item.desktop}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
