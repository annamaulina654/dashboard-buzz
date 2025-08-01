/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ROICalculator } from "../widgets/roi-calculator";
import { PerformanceMetrics } from "../widgets/performance-metrics";
import { CampaignComparison } from "../widgets/campaign-comparison";
import type { Campaign } from "@/types/dashboard";

interface AnalyticsTabProps {
  roiCalculation: {
    budget: number;
    reach: number;
    conversionRate: number;
    result: number;
  };
  setRoiCalculation: (calculation: any) => void;
  calculateROI: () => void;
  optimisticCampaigns: Campaign[];
  isLoading: boolean;
}

export function AnalyticsTab({
  roiCalculation,
  setRoiCalculation,
  calculateROI,
  optimisticCampaigns,
  isLoading,
}: AnalyticsTabProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <ROICalculator
          roiCalculation={roiCalculation}
          setRoiCalculation={setRoiCalculation}
          calculateROI={calculateROI}
        />
        <PerformanceMetrics
          campaigns={optimisticCampaigns}
          isLoading={isLoading}
        />
      </div>

      <CampaignComparison
        campaigns={optimisticCampaigns}
        isLoading={isLoading}
      />
    </div>
  );
}
