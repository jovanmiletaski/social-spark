import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function CreatePostAIButton() {
  return (
    <Button
      className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl h-12 gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      variant="outline"
    >
      <Sparkles className="h-5 w-5" />
      <span className="font-medium">Create Post by AI</span>
    </Button>
  )
}
