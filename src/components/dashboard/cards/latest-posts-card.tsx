import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Share2, MessageCircle, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const posts = [
  {
    id: 1, title: "5 Proven Strategies to Scale Your Small Business in 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
    platform: "facebook", platformColor: "bg-blue-600",
    timestamp: "8:42 am", shares: "2.7k", comments: "112", views: "9.8k",
  },
  {
    id: 2, title: "Behind the Scenes: A Day in the Life of Our Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    platform: "instagram", platformColor: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
    timestamp: "6:50 am", shares: "16.8k", comments: "578", views: "32.5k",
  },
  {
    id: 3, title: "Our Top 3 Lessons Learned in Our First Year of Business",
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=100&h=100&fit=crop",
    platform: "linkedin", platformColor: "bg-blue-700",
    timestamp: "1 day ago", shares: "645.5k", comments: "9.4k", views: "1m",
  },
  {
    id: 4, title: "Meet the Team: The People Behind Your Favorite Products",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
    platform: "twitter", platformColor: "bg-foreground",
    timestamp: "2 days ago", shares: "234", comments: "89", views: "12.3k",
  },
]

const platformIcons: Record<string, string> = {
  facebook: "f", instagram: "in", linkedin: "in", twitter: "X",
}

export function LatestPostsCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Latest Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <img src={post.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                <span className={`w-4 h-4 rounded text-[8px] ${post.platformColor} text-white flex items-center justify-center font-bold`}>
                  {platformIcons[post.platform]}
                </span>
                <span>{post.timestamp}</span>
                <span className="flex items-center gap-0.5"><Share2 className="h-2.5 w-2.5" /> {post.shares}</span>
                <span className="flex items-center gap-0.5"><MessageCircle className="h-2.5 w-2.5" /> {post.comments}</span>
                <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {post.views}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"><MoreVertical className="h-3.5 w-3.5" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                <DropdownMenuItem>Edit Post</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
