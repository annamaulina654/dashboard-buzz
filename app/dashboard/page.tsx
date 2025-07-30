"use client";

import { useState, useEffect, useOptimistic } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";
import type { KOL, Campaign, ChatbotMessage } from "@/types/dashboard";
import { initializeData } from "@/lib/dashboard-data";
import { useDashboardLogic } from "@/hooks/use-dashboard-logic";
import { supabaseClient } from "@/lib/supabase-client";

export interface Template {
  id: number;
  created_at: string;
  name: string;
  content: string;
  type: "reminder" | "follow-up" | "brief";
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [kols, setKols] = useState<KOL[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [chatbotMessages, setChatbotMessages] = useState<ChatbotMessage[]>([]);
  const [selectedKOL, setSelectedKOL] = useState<KOL | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [roiCalculation, setRoiCalculation] = useState({
    budget: 0,
    reach: 0,
    conversionRate: 0,
    result: 0,
  });
  const [templates, setTemplates] = useState<Template[]>([]);

  const [optimisticCampaigns, addOptimisticCampaign] = useOptimistic(
    campaigns,
    (state, newCampaign: Campaign) => [...state, newCampaign]
  );

  const {
    filteredKOLs,
    dashboardStats,
    calculateROI,
    addKOL,
    deleteKOL,
    updateKOL,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    sendChatbotMessage,
    addTemplate,
    updateTemplate,
    deleteTemplate,
  } = useDashboardLogic({
    currentKOLs: kols,
    optimisticCampaigns,
    chatbotMessages,
    searchQuery,
    categoryFilter,
    roiCalculation,
    setRoiCalculation,
    addOptimisticCampaign,
    setKols,
    setCampaigns,
    setChatbotMessages,
    setTemplates,
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { initialKOLs, initialCampaigns, initialMessages } =
          await initializeData();
        setKols(initialKOLs);
        setCampaigns(initialCampaigns);
        setChatbotMessages(initialMessages);
        const { data: templateData } = await supabaseClient
          .from("message_templates")
          .select("*");
        if (templateData) setTemplates(templateData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="p-6">
        <StatsCards stats={dashboardStats} isLoading={isLoading} />

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
          updateKOL={updateKOL}
          deleteKOL={deleteKOL}
          addCampaign={addCampaign}
          updateCampaign={updateCampaign}
          deleteCampaign={deleteCampaign}
          sendChatbotMessage={sendChatbotMessage}
          optimisticKOLs={kols}
          templates={templates}
          addTemplate={addTemplate}
          updateTemplate={updateTemplate}
          deleteTemplate={deleteTemplate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
