"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Campaign } from "@/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CampaignComparisonProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

export function CampaignComparison({
  campaigns,
  isLoading,
}: CampaignComparisonProps) {
  const relevantCampaigns = campaigns.filter(
    (c) => c.status === "active" || c.status === "completed"
  );

  if (isLoading) {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <Skeleton className="h-6 w-56 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-80" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white text-lg md:text-xl">
          Campaign Comparison
        </CardTitle>
        <CardDescription className="dark:text-gray-400 text-sm md:text-base">
          Compare performance across different campaigns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-80">
          {relevantCampaigns.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={relevantCampaigns}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(128, 128, 128, 0.3)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9ca3af" }}
                  fontSize={12}
                />
                <YAxis tick={{ fill: "#9ca3af" }} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                    borderColor: "#4b5563",
                    color: "#ffffff",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
                <Bar
                  dataKey="expectedReach"
                  fill="#8884d8"
                  name="Expected Reach"
                />
                <Bar dataKey="actualReach" fill="#82ca9d" name="Actual Reach" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <p>No active or completed campaigns to compare.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
