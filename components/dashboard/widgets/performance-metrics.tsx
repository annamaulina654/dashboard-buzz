"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Campaign } from "@/types/dashboard";

interface PerformanceMetricsProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export function PerformanceMetrics({
  campaigns,
  isLoading,
}: PerformanceMetricsProps) {
  const metrics = useMemo(() => {
    const activeCampaigns = campaigns.filter(
      (c) => c.status === "active" || c.status === "completed"
    );
    if (activeCampaigns.length === 0) {
      return { totalBudget: 0, totalActualReach: 0, averageROI: 0 };
    }

    const totalBudget = activeCampaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalActualReach = activeCampaigns.reduce(
      (sum, c) => sum + (c.actualReach || 0),
      0
    );
    const totalROI = activeCampaigns.reduce((sum, c) => sum + (c.roi || 0), 0);
    const averageROI = totalROI / activeCampaigns.length;

    return { totalBudget, totalActualReach, averageROI };
  }, [campaigns]);

  if (isLoading) {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg space-y-2">
              <Skeleton className="h-4 w-24 mx-auto" />
              <Skeleton className="h-8 w-16 mx-auto" />
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg space-y-2">
              <Skeleton className="h-4 w-28 mx-auto" />
              <Skeleton className="h-8 w-20 mx-auto" />
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg space-y-2">
              <Skeleton className="h-4 w-20 mx-auto" />
              <Skeleton className="h-8 w-12 mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white text-lg md:text-xl">
          Overall Performance
        </CardTitle>
        <CardDescription className="dark:text-gray-400 text-sm md:text-base">
          Aggregate metrics from all active & completed campaigns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Budget Spent
            </p>
            <p className="text-2xl font-bold dark:text-white">
              ${metrics.totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Actual Reach
            </p>
            <p className="text-2xl font-bold dark:text-white">
              {metrics.totalActualReach.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Average ROI
            </p>
            <p className="text-2xl font-bold dark:text-white">
              {metrics.averageROI.toFixed(2)}x
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
