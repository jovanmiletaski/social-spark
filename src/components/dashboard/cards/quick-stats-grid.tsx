import { Card, CardContent } from "@/components/ui/card"
import { Smile, CalendarDays, Users, UserPlus } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

const sparklineData1 = [{ value: 30 }, { value: 45 }, { value: 35 }, { value: 50 }, { value: 40 }, { value: 55 }, { value: 45 }]
const sparklineData2 = [{ value: 20 }, { value: 35 }, { value: 25 }, { value: 40 }, { value: 30 }, { value: 45 }, { value: 35 }]
const sparklineData3 = [{ value: 40 }, { value: 35 }, { value: 45 }, { value: 30 }, { value: 50 }, { value: 40 }, { value: 55 }]
const sparklineData4 = [{ value: 25 }, { value: 40 }, { value: 30 }, { value: 45 }, { value: 35 }, { value: 50 }, { value: 45 }]

const stats = [
  { icon: Smile, label: "Engagement Rate", value: "6.8%", sparkline: sparklineData1, color: "#8b5cf6" },
  { icon: CalendarDays, label: "Post Scheduled", value: "12", sparkline: sparklineData2, color: "#ec4899" },
  { icon: Users, label: "Total Reach", value: "45.2K", sparkline: sparklineData3, color: "#8b5cf6" },
  { icon: UserPlus, label: "Net Followers", value: "+1,230", sparkline: sparklineData4, color: "#6366f1" },
]

export function QuickStatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <div className="w-20 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stat.sparkline}>
                    <defs>
                      <linearGradient id={`gradient-${stat.label}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={stat.color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={stat.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke={stat.color} fill={`url(#gradient-${stat.label})`} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
