"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Campaign } from "@/types/dashboard"

interface CampaignComparisonProps {
  campaigns: Campaign[]
}

export function CampaignComparison({ campaigns }: CampaignComparisonProps) {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white text-lg md:text-xl">Campaign Comparison</CardTitle>
        <CardDescription className="dark:text-gray-400 text-sm md:text-base">
          Compare performance across different campaigns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <p>Campaign comparison data will be displayed here.</p>
        </div>
      </CardContent>
    </Card>
  )
}
