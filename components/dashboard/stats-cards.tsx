import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, DollarSign, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalKOLs: number
    activeCampaigns: number
    totalROI: number
    avgEngagement: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total KOLs",
      value: stats.totalKOLs,
      change: "+12% from last month",
      icon: Users,
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns,
      change: "+3 new this week",
      icon: Target,
    },
    {
      title: "Total ROI",
      value: `$${stats.totalROI.toFixed(0)}K`,
      change: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Avg Engagement",
      value: `${stats.avgEngagement.toFixed(1)}%`,
      change: "+0.3% from last month",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium dark:text-gray-200">{card.title}</CardTitle>
            <card.icon className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold dark:text-white">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
