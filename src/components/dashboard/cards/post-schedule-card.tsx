import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const dates = [10, 11, 12, 13, 14, 15, 16]
const selectedDate = 13

const scheduledPosts = [
  { id: 1, time: "09:43", title: "Guess what, everyone?! After months of hard work...", platform: "instagram", color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" },
  { id: 2, time: "09:43", title: "Guess what, everyone?! After months of hard work...", platform: "facebook", color: "bg-blue-600" },
  { id: 3, time: "13:43", title: "Guess what, everyone?! After months of hard work...", platform: "twitter", color: "bg-foreground" },
]

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]

export function PostScheduleCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">Post Schedule List</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">From 12 Feb to 15 May, 2024</p>
          </div>
          <Select defaultValue="weekly">
            <SelectTrigger className="h-8 w-24 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mini Calendar */}
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="h-4 w-4" /></Button>
          <div className="flex-1 grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div key={day} className="text-center">
                <p className="text-[10px] text-muted-foreground mb-1">{day}</p>
                <div className={cn(
                  "w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium",
                  dates[index] === selectedDate ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                )}>
                  {dates[index]}
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4" /></Button>
        </div>

        {/* Timeline */}
        <div className="space-y-0 relative">
          {timeSlots.map((time) => {
            const post = scheduledPosts.find(p => p.time.startsWith(time.split(":")[0]))
            return (
              <div key={time} className="flex items-start gap-3 py-2 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground w-10 pt-1 shrink-0">{time}</span>
                {post ? (
                  <div className="flex-1 flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <div className={cn("w-1.5 h-8 rounded-full shrink-0", post.color)} />
                    <p className="text-xs text-foreground line-clamp-2">{post.title}</p>
                  </div>
                ) : (
                  <div className="flex-1 h-4" />
                )}
              </div>
            )
          })}
        </div>

        <Button variant="outline" size="sm" className="w-full mt-3 text-xs border-dashed border-primary/30 text-primary">
          <Plus className="h-3 w-3 mr-1" /> Add New Schedule
        </Button>
      </CardContent>
    </Card>
  )
}
