import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KOLManagementTab } from "./tabs/kol-management-tab"
import { CampaignsTab } from "./tabs/campaigns-tab"
import { AnalyticsTab } from "./tabs/analytics-tab"
import { ChatbotTab } from "./tabs/chatbot-tab"
import type { KOL, Campaign, ChatbotMessage } from "@/types/dashboard"

interface DashboardTabsProps {
  filteredKOLs: KOL[]
  optimisticCampaigns: Campaign[]
  chatbotMessages: ChatbotMessage[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  categoryFilter: string
  setCategoryFilter: (filter: string) => void
  selectedKOL: KOL | null
  setSelectedKOL: (kol: KOL | null) => void
  selectedCampaign: Campaign | null
  setSelectedCampaign: (campaign: Campaign | null) => void
  roiCalculation: {
    budget: number
    reach: number
    conversionRate: number
    result: number
  }
  setRoiCalculation: (calculation: any) => void
  calculateROI: () => void
  addKOL: (kol: Omit<KOL, "id">) => void
  addCampaign: (campaign: Omit<Campaign, "id">) => void
  sendChatbotMessage: (kolId: number, message: string, type: ChatbotMessage["type"]) => Promise<void>
  optimisticKOLs: KOL[]
}

export function DashboardTabs(props: DashboardTabsProps) {
  return (
    <Tabs defaultValue="kols" className="space-y-4 md:space-y-6">
      <TabsList className="flex w-full overflow-x-auto dark:bg-gray-800">
        <TabsTrigger
          value="kols"
          className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 text-xs md:text-sm"
        >
          <span className="hidden sm:inline">KOL Management</span>
          <span className="sm:hidden">KOLs</span>
        </TabsTrigger>
        <TabsTrigger
          value="campaigns"
          className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 text-xs md:text-sm"
        >
          Campaigns
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 text-xs md:text-sm"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          value="chatbot"
          className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 text-xs md:text-sm"
        >
          Chatbot
        </TabsTrigger>
      </TabsList>

      <TabsContent value="kols" className="space-y-6">
        <KOLManagementTab {...props} />
      </TabsContent>

      <TabsContent value="campaigns" className="space-y-6">
        <CampaignsTab {...props} />
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4 md:space-y-6">
        <AnalyticsTab {...props} />
      </TabsContent>

      <TabsContent value="chatbot" className="space-y-4 md:space-y-6">
        <ChatbotTab {...props} />
      </TabsContent>
    </Tabs>
  )
}
