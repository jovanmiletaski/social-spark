import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, TrendingUp, Sparkles } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const chartData = [
  { name: "W1", value: 380 }, { name: "W2", value: 320 }, { name: "W3", value: 280 },
  { name: "W4", value: 420 }, { name: "W5", value: 350 },
]

const genderData = { male: { count: 450, percentage: 80 }, female: { count: 300, percentage: 20 } }

const platformData = [
  { platform: "Facebook", icon: "f", male: 245, female: 123 },
  { platform: "Instagram", icon: "📷", male: 232, female: 101 },
]

interface AverageConversionCardProps { onAnalyze?: () => void }

export function AverageConversionCard({ onAnalyze }: AverageConversionCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Average Conversion</CardTitle>
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
        <div className="mb-3">
          <p className="text-3xl font-bold text-foreground">21,456</p>
          <p className="text-xs text-muted-foreground mt-1">
            Its looking good and <span className="text-success inline-flex items-center gap-0.5"><TrendingUp className="h-3 w-3" /> 16%</span> more then last post
          </p>
        </div>
        <div className="h-32 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(260,10%,45%)' }} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(270,60%,55%)" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold text-foreground">{genderData.male.count} Male</p>
            <p className="text-[10px] text-muted-foreground">{genderData.male.percentage}% of users are male</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold text-foreground">{genderData.female.count} Female</p>
            <p className="text-[10px] text-muted-foreground">{genderData.female.percentage}% of users are female</p>
          </div>
        </div>
        <div className="space-y-2">
          {platformData.map((item) => (
            <div key={item.platform} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {item.icon}
                </div>
                <span className="text-foreground">{item.platform}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> {item.male} Male</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-400" /> {item.female} Female</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
