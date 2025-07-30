"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Campaign } from "@/types/dashboard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CampaignCardProps {
  campaign: Campaign;
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CampaignCard({
  campaign,
  onViewDetails,
  onEdit,
  onDelete,
}: CampaignCardProps) {
  const getStatusColor = (status: Campaign["status"]) => {
    const statusColors = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      completed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      paused:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    };
    return statusColors[status] || statusColors.draft;
  };

  return (
    <div className="flex flex-col justify-between h-full p-6 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
      <div>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
              <h3 className="text-lg font-semibold dark:text-white">
                {campaign.name}
              </h3>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status.charAt(0).toUpperCase() +
                  campaign.status.slice(1)}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
              {campaign.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap text-sm text-gray-500 dark:text-gray-400 gap-x-6 gap-y-1">
              <span>Budget: ${campaign.budget.toLocaleString()}</span>
              <span>
                Duration: {campaign.startDate} - {campaign.endDate}
              </span>
              <span>KOLs: {campaign.kols.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0 flex-shrink-0 w-full md:w-auto">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  <Trash2 className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Delete</span>
                  <span className="md:hidden">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="dark:text-white">
                    Are you sure you want to delete this campaign?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="dark:text-gray-400">
                    This will permanently delete the campaign. This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="dark:border-gray-600 dark:text-gray-300 bg-transparent flex-1"
            >
              <Pencil className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Edit</span>
              <span className="md:hidden">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onViewDetails}
              className="dark:border-gray-600 dark:text-gray-300 bg-transparent flex-1"
            >
              <Eye className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">View Details</span>
              <span className="md:hidden">Details</span>
            </Button>
          </div>
        </div>
      </div>

      {campaign.status === "active" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expected Reach
            </p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {campaign.expectedReach?.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Actual Reach
            </p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
              {campaign.actualReach?.toLocaleString() || "TBD"}
            </p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
            <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              {campaign.roi ? `${campaign.roi}x` : "TBD"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
