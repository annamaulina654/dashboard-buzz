/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ROICalculatorProps {
  roiCalculation: {
    budget: number;
    reach: number;
    conversionRate: number;
    result: number;
  };
  setRoiCalculation: (calculation: any) => void;
  calculateROI: () => void;
}

export function ROICalculator({
  roiCalculation,
  setRoiCalculation,
  calculateROI,
}: ROICalculatorProps) {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white text-lg md:text-xl">
          ROI Calculator
        </CardTitle>
        <CardDescription className="dark:text-gray-400 text-sm md:text-base">
          Calculate potential returns on your marketing investments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="budget"
              className="dark:text-gray-300 text-sm md:text-base"
            >
              Campaign Budget ($)
            </Label>
            <Input
              id="budget"
              type="number"
              placeholder="10000"
              value={roiCalculation.budget || ""}
              onChange={(e) =>
                setRoiCalculation((prev: any) => ({
                  ...prev,
                  budget: Number(e.target.value),
                }))
              }
              className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <Label
              htmlFor="reach"
              className="dark:text-gray-300 text-sm md:text-base"
            >
              Expected Reach
            </Label>
            <Input
              id="reach"
              type="number"
              placeholder="100000"
              value={roiCalculation.reach || ""}
              onChange={(e) =>
                setRoiCalculation((prev: any) => ({
                  ...prev,
                  reach: Number(e.target.value),
                }))
              }
              className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <Label
              htmlFor="conversion"
              className="dark:text-gray-300 text-sm md:text-base"
            >
              Conversion Rate (%)
            </Label>
            <Input
              id="conversion"
              type="number"
              step="0.1"
              placeholder="2.5"
              value={roiCalculation.conversionRate || ""}
              onChange={(e) =>
                setRoiCalculation((prev: any) => ({
                  ...prev,
                  conversionRate: Number(e.target.value),
                }))
              }
              className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <Button
            onClick={calculateROI}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            Calculate ROI
          </Button>
          {roiCalculation.result !== 0 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                Projected Results:
              </h4>
              <div className="space-y-1 text-xs md:text-sm dark:text-gray-300">
                <p>
                  Expected Conversions:{" "}
                  {Math.round(
                    (roiCalculation.reach * roiCalculation.conversionRate) / 100
                  )}
                </p>
                <p>
                  Projected Revenue: $
                  {Math.round(
                    (roiCalculation.reach *
                      roiCalculation.conversionRate *
                      50) /
                      100
                  ).toLocaleString()}
                </p>
                <p
                  className={`font-semibold ${
                    roiCalculation.result > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  ROI: {roiCalculation.result.toFixed(1)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
