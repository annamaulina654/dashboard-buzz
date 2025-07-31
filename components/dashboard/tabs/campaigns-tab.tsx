"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import type { Campaign, KOL } from "@/types/dashboard";
import { AddCampaignForm } from "../forms/add-campaign-form";
import { CampaignDetailView } from "../views/campaign-detail-view";
import { CampaignCard } from "../cards/campaign-card";
import { CampaignCardSkeleton } from "../cards/campaign-card-skeleton";

interface CampaignsTabProps {
  optimisticCampaigns: Campaign[];
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;
  addCampaign: (campaign: Omit<Campaign, "id">) => void;
  updateCampaign: (id: number, data: Partial<Omit<Campaign, "id">>) => void;
  deleteCampaign: (id: number) => void;
  optimisticKOLs: KOL[];
  isLoading: boolean;
}

export function CampaignsTab({
  optimisticCampaigns,
  selectedCampaign,
  setSelectedCampaign,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  optimisticKOLs,
  isLoading,
}: CampaignsTabProps) {
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState<Campaign | null>(null);

  const handleEditClick = (campaign: Campaign) => {
    setCampaignToEdit(campaign);
    setIsEditDialogOpen(true);
  };

  const isInitialLoading = isLoading && optimisticCampaigns.length === 0;

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="dark:text-white">
              Campaign Management
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Track and manage your marketing campaigns
            </CardDescription>
          </div>
          <Dialog open={isAddCampaignOpen} onOpenChange={setIsAddCampaignOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="dark:text-white">
                  Create New Campaign
                </DialogTitle>
                <DialogDescription className="dark:text-gray-400">
                  Set up a new marketing campaign
                </DialogDescription>
              </DialogHeader>
              <AddCampaignForm
                onAdd={addCampaign}
                kols={optimisticKOLs}
                onSuccess={() => setIsAddCampaignOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {isInitialLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CampaignCardSkeleton key={index} />
            ))
          ) : optimisticCampaigns.length > 0 ? (
            optimisticCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onViewDetails={() => setSelectedCampaign(campaign)}
                onEdit={() => handleEditClick(campaign)}
                onDelete={() => deleteCampaign(campaign.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
              <p>No campaigns found.</p>
              <p className="text-sm">
                Click &quot;New Campaign&quot; to get started.
              </p>
            </div>
          )}
        </div>

        <Dialog
          open={!!selectedCampaign}
          onOpenChange={(isOpen) => !isOpen && setSelectedCampaign(null)}
        >
          <DialogContent className="max-w-3xl dark:bg-gray-800 dark:border-gray-700">
            <CampaignDetailView
              campaign={selectedCampaign}
              kols={optimisticKOLs}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl dark:bg-gray-800 ...">
            <DialogHeader>
              <DialogTitle>Edit Campaign</DialogTitle>
            </DialogHeader>
            <AddCampaignForm
              kols={optimisticKOLs}
              initialData={campaignToEdit}
              onAdd={(updatedData) => {
                if (campaignToEdit) {
                  updateCampaign(campaignToEdit.id, updatedData);
                }
              }}
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
