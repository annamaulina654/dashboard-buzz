"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function KOLCardSkeleton() {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border p-4 dark:border-gray-700">
      <div className="flex flex-row items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 text-center">
        <div className="space-y-1">
          <Skeleton className="h-5 w-10 mx-auto" />
          <Skeleton className="h-3 w-14 mx-auto" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-5 w-8 mx-auto" />
          <Skeleton className="h-3 w-20 mx-auto" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-5 w-12 mx-auto" />
          <Skeleton className="h-3 w-8 mx-auto" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4 dark:border-gray-600">
        <Skeleton className="h-6 w-20" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
