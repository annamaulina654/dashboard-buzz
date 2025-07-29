"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import type { Campaign, KOL } from "@/types/dashboard"

interface CampaignDetailViewProps {
  campaign: Campaign | null
  kols: KOL[]
}

export function CampaignDetailView({ campaign, kols }: CampaignDetailViewProps) {
  if (!campaign) return null

  const campaignKOLs = kols.filter((kol) => campaign.kols.includes(kol.id))

  const getStatusColor = (status: Campaign["status"]) => {
    const statusColors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return statusColors[status] || statusColors.draft
  }

  return (
    <div className="space-y-6 p-1 sm:p-0">
      <DialogHeader>
        <DialogTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="dark:text-white truncate">{campaign.name}</span>
          <Badge className={`${getStatusColor(campaign.status)} flex-shrink-0`}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </DialogTitle>
        <DialogDescription className="dark:text-gray-400">{campaign.description}</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3 dark:text-white">Campaign Details</h3>
          <div className="space-y-2 text-sm">
            <p className="dark:text-gray-300"><strong>Budget:</strong> ${campaign.budget.toLocaleString()}</p>
            <p className="dark:text-gray-300"><strong>Duration:</strong> {campaign.startDate} - {campaign.endDate}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 dark:text-white">Performance Metrics</h3>
          {campaign.status === "active" && campaign.actualReach ? (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-gray-300">Reach Progress</span>
                  <span className="dark:text-gray-300">
                    {Math.round((campaign.actualReach / campaign.expectedReach) * 100)}%
                  </span>
                </div>
                <Progress value={(campaign.actualReach / campaign.expectedReach) * 100} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-gray-300">Budget Utilization</span>
                  <span className="dark:text-gray-300">75%</span>
                </div>
                <Progress value={75} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Metrics will be available once the campaign is active.
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 dark:text-white">Assigned KOLs ({campaignKOLs.length})</h3>
        <div className="space-y-3">
          {campaignKOLs.map((kol) => (
            <div key={kol.id} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={kol.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="dark:bg-gray-600 dark:text-white">
                    {kol.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm dark:text-white">{kol.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{kol.followers} followers</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-medium dark:text-white">${kol.rate}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{kol.engagement} engagement</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
