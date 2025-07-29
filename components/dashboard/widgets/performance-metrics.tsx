"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PerformanceMetrics() {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white text-lg md:text-xl">Performance Metrics</CardTitle>
        <CardDescription className="dark:text-gray-400 text-sm md:text-base">
          Overview of key performance indicators.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <p>Performance metrics will be displayed here.</p>
        </div>
      </CardContent>
    </Card>
  )
}
