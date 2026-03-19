import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Sparkles } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const chartData = [
  { name: "Jan 23", value: 580, highlight: false },
  { name: "Jan 24", value: 620, highlight: false },
  { name: "Jan 25", value: 540, highlight: false },
  { name: "Jan 26", value: 680, highlight: false },
  { name: "Jan 27", value: 720, highlight: false },
  { name: "Jan 28", value: 780, highlight: true },
  { name: "Jan 29", value: 650, highlight: false },
  { name: "Jan 30", value: 580, highlight: false },
  { name: "Jan 31", value: 620, highlight: false },
  { name: "Feb 01", value: 560, highlight: false },
  { name: "Feb 02", value: 480, highlight: false },
  { name: "Feb 03", value: 520, highlight: false },
]

interface ConversionRateCardProps { onAnalyze?: () => void }

export function ConversionRateCard({ onAnalyze }: ConversionRateCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Conversion rate</CardTitle>
        <div className="flex items-center gap-2">
          <Select defaultValue="daily">
            <SelectTrigger className="h-8 w-24 text-xs"><SelectValue /></SelectTrigger>
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
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'hsl(260,10%,45%)' }} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={16}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.highlight ? "hsl(270,60%,55%)" : "hsl(270,30%,90%)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
