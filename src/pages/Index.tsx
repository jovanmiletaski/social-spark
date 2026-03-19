import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { SocialStatsCards } from "@/components/dashboard/cards/social-stats-cards"
import { QuickStatsGrid } from "@/components/dashboard/cards/quick-stats-grid"
import { AutomationOverviewCard } from "@/components/dashboard/cards/automation-overview-card"
import { PostScheduleCard } from "@/components/dashboard/cards/post-schedule-card"
import { AutomationPostsCard } from "@/components/dashboard/cards/automation-posts-card"
import { LatestPostsCard } from "@/components/dashboard/cards/latest-posts-card"
import { TotalVisitorsCard } from "@/components/dashboard/cards/total-visitors-card"
import { VisitByLocationCard } from "@/components/dashboard/cards/visit-by-location-card"
import { AverageConversionCard } from "@/components/dashboard/cards/average-conversion-card"
import { ConversionRateCard } from "@/components/dashboard/cards/conversion-rate-card"
import { UserRetentionCard } from "@/components/dashboard/cards/user-retention-card"
import { CreatePostAIButton } from "@/components/dashboard/create-post-ai-button"
import { AIInsightsModal } from "@/components/dashboard/ai-insights-modal"

export default function Index() {
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [aiModalTitle, setAiModalTitle] = useState("Analytics")

  const handleAnalyze = (title: string) => {
    setAiModalTitle(title)
    setAiModalOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
          <div className="space-y-6 max-w-[1600px] mx-auto">
            {/* Social Platform Stats */}
            <div className="animate-fade-in">
              <SocialStatsCards />
            </div>

            {/* Quick Stats Grid */}
            <div className="animate-fade-in-delay-1">
              <QuickStatsGrid />
            </div>

            {/* Create Post AI Button */}
            <div className="animate-fade-in-delay-1">
              <CreatePostAIButton />
            </div>

            {/* Automation Overview + Post Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-delay-2">
              <div className="lg:col-span-2">
                <AutomationOverviewCard onAnalyze={() => handleAnalyze("Automation Overview")} />
              </div>
              <div>
                <PostScheduleCard />
              </div>
            </div>

            {/* Automation Posts */}
            <div className="animate-fade-in-delay-2">
              <AutomationPostsCard />
            </div>

            {/* Latest Posts + Analytics Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-delay-3">
              <LatestPostsCard />
              <TotalVisitorsCard onAnalyze={() => handleAnalyze("Total Visitors")} />
              <VisitByLocationCard onAnalyze={() => handleAnalyze("Visit by Location")} />
            </div>

            {/* More Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-delay-3">
              <AverageConversionCard onAnalyze={() => handleAnalyze("Average Conversion")} />
              <ConversionRateCard onAnalyze={() => handleAnalyze("Conversion Rate")} />
              <UserRetentionCard onAnalyze={() => handleAnalyze("User Retention")} />
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
      <AIInsightsModal open={aiModalOpen} onOpenChange={setAiModalOpen} title={aiModalTitle} />
    </div>
  )
}
