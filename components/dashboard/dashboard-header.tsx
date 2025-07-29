"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, LogOut } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DB</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            <span className="hidden sm:inline">Dashboard Buzz</span>
            <span className="sm:hidden">Dashboard</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" size="sm" className="dark:text-gray-300 p-2">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="dark:text-gray-300 p-2">
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = "/")}
            className="dark:text-gray-300 p-2"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
