"use client"

import type React from "react"
import { useState, useEffect, useOptimistic } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import type { KOL, Campaign, ChatbotMessage } from "@/types/dashboard"
import { initializeData } from "@/lib/dashboard-data"
import { useDashboardLogic } from "@/hooks/use-dashboard-logic"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [kols, setKols] = useState<KOL[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [chatbotMessages, setChatbotMessages] = useState<ChatbotMessage[]>([])
  const [selectedKOL, setSelectedKOL] = useState<KOL | null>(null)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [roiCalculation, setRoiCalculation] = useState({
    budget: 0,
    reach: 0,
    conversionRate: 0,
    result: 0,
  })

  const [optimisticKOLs, addOptimisticKOL] = useOptimistic(kols, (state, newKOL: KOL) => [...state, newKOL])
  const [optimisticCampaigns, addOptimisticCampaign] = useOptimistic(campaigns, (state, newCampaign: Campaign) => [
    ...state,
    newCampaign,
  ])

  const { filteredKOLs, dashboardStats, calculateROI, addKOL, addCampaign, sendChatbotMessage } = useDashboardLogic({
    optimisticKOLs,
    optimisticCampaigns,
    chatbotMessages,
    searchQuery,
    categoryFilter,
    roiCalculation,
    setRoiCalculation,
    addOptimisticKOL,
    addOptimisticCampaign,
    setKols,
    setCampaigns,
    setChatbotMessages,
  })

  useEffect(() => {
    const loadData = async () => {
      const { initialKOLs, initialCampaigns, initialMessages } = await initializeData()
      setKols(initialKOLs)
      setCampaigns(initialCampaigns)
      setChatbotMessages(initialMessages)
    }
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <div className="p-6">
        <StatsCards stats={dashboardStats} />
        <DashboardTabs
          filteredKOLs={filteredKOLs}
          optimisticCampaigns={optimisticCampaigns}
          chatbotMessages={chatbotMessages}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          selectedKOL={selectedKOL}
          setSelectedKOL={setSelectedKOL}
          selectedCampaign={selectedCampaign}
          setSelectedCampaign={setSelectedCampaign}
          roiCalculation={roiCalculation}
          setRoiCalculation={setRoiCalculation}
          calculateROI={calculateROI}
          addKOL={addKOL}
          addCampaign={addCampaign}
          sendChatbotMessage={sendChatbotMessage}
          optimisticKOLs={optimisticKOLs}
        />
      </div>
    </div>
  )
}
