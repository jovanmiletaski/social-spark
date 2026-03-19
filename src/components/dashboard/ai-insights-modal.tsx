import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sparkles, Lightbulb, TrendingUp, Target, Clock } from "lucide-react"

interface AIInsightsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
}

const placeholderInsights = [
  { icon: TrendingUp, title: "Growth Opportunity", description: "AI-generated growth insights will appear here based on your data patterns." },
  { icon: Target, title: "Audience Targeting", description: "AI will analyze your audience demographics and suggest optimal targeting strategies." },
  { icon: Clock, title: "Best Posting Times", description: "AI will recommend the best times to post based on your engagement history." },
  { icon: Lightbulb, title: "Content Suggestions", description: "AI will provide content ideas based on trending topics in your niche." },
]

export function AIInsightsModal({ open, onOpenChange, title = "Analytics" }: AIInsightsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            AI Insights - {title}
          </DialogTitle>
          <DialogDescription>
            Get AI-powered insights and recommendations for your social media performance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">AI Analysis Coming Soon</p>
                <p className="text-xs text-muted-foreground">Our AI engine is being trained on social media patterns.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview of upcoming features:</p>
            {placeholderInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <insight.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{insight.title}</p>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
