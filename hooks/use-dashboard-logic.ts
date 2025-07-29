"use client"

import { useMemo } from "react"
import type { KOL, Campaign, ChatbotMessage } from "@/types/dashboard"

interface UseDashboardLogicProps {
  optimisticKOLs: KOL[]
  optimisticCampaigns: Campaign[]
  chatbotMessages: ChatbotMessage[]
  searchQuery: string
  categoryFilter: string
  roiCalculation: {
    budget: number
    reach: number
    conversionRate: number
    result: number
  }
  setRoiCalculation: (calculation: any) => void
  addOptimisticKOL: (kol: KOL) => void
  addOptimisticCampaign: (campaign: Campaign) => void
  setKols: (kols: KOL[] | ((prev: KOL[]) => KOL[])) => void
  setCampaigns: (campaigns: Campaign[] | ((prev: Campaign[]) => Campaign[])) => void
  setChatbotMessages: (messages: ChatbotMessage[] | ((prev: ChatbotMessage[]) => ChatbotMessage[])) => void
}

export function useDashboardLogic({
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
}: UseDashboardLogicProps) {
  const filteredKOLs = useMemo(() => {
    return optimisticKOLs.filter((kol) => {
      const matchesSearch =
        kol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kol.username.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || kol.category.toLowerCase() === categoryFilter.toLowerCase()
      return matchesSearch && matchesCategory
    })
  }, [optimisticKOLs, searchQuery, categoryFilter])

  const dashboardStats = useMemo(
    () => ({
      totalKOLs: optimisticKOLs.length,
      activeCampaigns: optimisticCampaigns.filter((c) => c.status === "active").length,
      totalROI: optimisticCampaigns.reduce((sum, c) => sum + (c.roi || 0), 0),
      avgEngagement:
        optimisticKOLs.length > 0
          ? optimisticKOLs.reduce((sum, k) => sum + k.engagementRate, 0) / optimisticKOLs.length
          : 0,
    }),
    [optimisticKOLs, optimisticCampaigns],
  )

  const calculateROI = () => {
    const { budget, reach, conversionRate } = roiCalculation
    if (budget > 0 && reach > 0 && conversionRate > 0) {
      const conversions = (reach * conversionRate) / 100
      const revenue = conversions * 50 
      const roi = ((revenue - budget) / budget) * 100
      setRoiCalculation((prev) => ({ ...prev, result: roi }))
    }
  }

  const addKOL = (newKOL: Omit<KOL, "id">) => {
    const id = Math.max(...optimisticKOLs.map((k) => k.id), 0) + 1
    const kolWithId = { ...newKOL, id }

    addOptimisticKOL(kolWithId)

    setKols((prev) => [...prev, kolWithId])
  }

  const addCampaign = (newCampaign: Omit<Campaign, "id">) => {
    const id = Math.max(...optimisticCampaigns.map((c) => c.id), 0) + 1
    const campaignWithId = { ...newCampaign, id }

    addOptimisticCampaign(campaignWithId)

    setCampaigns((prev) => [...prev, campaignWithId])
  }

  const sendChatbotMessage = async (kolId: number, message: string, type: ChatbotMessage["type"]) => {
    const id = Math.max(...chatbotMessages.map((m) => m.id), 0) + 1
    const newMessage: ChatbotMessage = {
      id,
      kolId,
      message,
      type,
      scheduledDate: new Date().toISOString().split("T")[0],
      sent: true,
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    setChatbotMessages((prev) => [...prev, newMessage])
  }

  return {
    filteredKOLs,
    dashboardStats,
    calculateROI,
    addKOL,
    addCampaign,
    sendChatbotMessage,
  }
}
