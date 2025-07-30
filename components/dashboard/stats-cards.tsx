"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, DollarSign, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardsProps {
  stats: {
    totalKOLs: number;
    totalKOLsChange: string;
    activeCampaigns: number;
    activeCampaignsChange: string;
    totalROI: number;
    totalROIChange: string;
    avgEngagement: number;
    avgEngagementChange: string;
  };
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cards = [
    {
      title: "Total KOLs",
      value: stats.totalKOLs,
      change: stats.totalKOLsChange,
      icon: Users,
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns,
      change: stats.activeCampaignsChange,
      icon: Target,
    },
    {
      title: "Total ROI",
      value: `$${stats.totalROI.toFixed(0)}K`,
      change: stats.totalROIChange,
      icon: DollarSign,
    },
    {
      title: "Avg Engagement",
      value: `${stats.avgEngagement.toFixed(1)}%`,
      change: stats.avgEngagementChange,
      icon: TrendingUp,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium dark:text-gray-200">
              {card.title}
            </CardTitle>
            <card.icon className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold dark:text-white">
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground">{card.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
