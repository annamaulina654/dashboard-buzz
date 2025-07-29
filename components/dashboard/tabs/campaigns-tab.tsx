"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import type { Campaign, KOL } from "@/types/dashboard"
import { AddCampaignForm } from "../forms/add-campaign-form"
import { CampaignDetailView } from "../views/campaign-detail-view"
import { CampaignCard } from "../cards/campaign-card"

interface CampaignsTabProps {
  optimisticCampaigns: Campaign[]
  selectedCampaign: Campaign | null
  setSelectedCampaign: (campaign: Campaign | null) => void
  addCampaign: (campaign: Omit<Campaign, "id">) => void
  optimisticKOLs: KOL[]
}

export function CampaignsTab({
  optimisticCampaigns,
  selectedCampaign,
  setSelectedCampaign,
  addCampaign,
  optimisticKOLs,
}: CampaignsTabProps) {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="dark:text-white">Campaign Management</CardTitle>
            <CardDescription className="dark:text-gray-400">Track and manage your marketing campaigns</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="dark:text-white">Create New Campaign</DialogTitle>
                <DialogDescription className="dark:text-gray-400">Set up a new marketing campaign</DialogDescription>
              </DialogHeader>
              <AddCampaignForm onAdd={addCampaign} kols={optimisticKOLs} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {optimisticCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} onViewDetails={() => setSelectedCampaign(campaign)} />
          ))}
        </div>

        <Dialog open={!!selectedCampaign} onOpenChange={(isOpen) => !isOpen && setSelectedCampaign(null)}>
          <DialogContent className="max-w-3xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <CampaignDetailView campaign={selectedCampaign} kols={optimisticKOLs} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
