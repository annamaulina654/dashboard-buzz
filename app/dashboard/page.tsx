"use client"

import type React from "react"

import { useState, useEffect, useOptimistic } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Target,
  Search,
  Plus,
  TrendingUp,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Send,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react"

// Types
interface KOL {
  id: number
  name: string
  username: string
  followers: string
  followersCount: number
  engagement: string
  engagementRate: number
  category: string
  verified: boolean
  avatar: string
  email: string
  phone: string
  rate: number
  location: string
  bio: string
  platforms: string[]
}

interface Campaign {
  id: number
  name: string
  description: string
  budget: number
  startDate: string
  endDate: string
  status: "active" | "completed" | "draft" | "paused"
  kols: number[]
  expectedReach: number
  actualReach?: number
  conversions?: number
  roi?: number
}

interface ChatbotMessage {
  id: number
  kolId: number
  message: string
  type: "reminder" | "follow-up" | "brief"
  scheduledDate: string
  sent: boolean
  response?: string
}

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

  // Optimistic updates for better UX
  const [optimisticKOLs, addOptimisticKOL] = useOptimistic(kols, (state, newKOL: KOL) => [...state, newKOL])

  const [optimisticCampaigns, addOptimisticCampaign] = useOptimistic(campaigns, (state, newCampaign: Campaign) => [
    ...state,
    newCampaign,
  ])

  // Initialize data with Next.js 15 patterns
  useEffect(() => {
    const initializeData = async () => {
      // Simulate API call with modern async patterns
      const initialKOLs: KOL[] = [
        {
          id: 1,
          name: "Sarah Johnson",
          username: "@sarahjohnson",
          followers: "125K",
          followersCount: 125000,
          engagement: "4.2%",
          engagementRate: 4.2,
          category: "Lifestyle",
          verified: true,
          avatar: "/placeholder.svg?height=40&width=40",
          email: "sarah@example.com",
          phone: "+1234567890",
          rate: 500,
          location: "Jakarta, Indonesia",
          bio: "Lifestyle influencer passionate about sustainable living and wellness.",
          platforms: ["Instagram", "TikTok", "YouTube"],
        },
        {
          id: 2,
          name: "Mike Chen",
          username: "@mikechen",
          followers: "89K",
          followersCount: 89000,
          engagement: "3.8%",
          engagementRate: 3.8,
          category: "Tech",
          verified: false,
          avatar: "/placeholder.svg?height=40&width=40",
          email: "mike@example.com",
          phone: "+1234567891",
          rate: 350,
          location: "Bandung, Indonesia",
          bio: "Tech reviewer and gadget enthusiast. Always exploring the latest innovations.",
          platforms: ["Instagram", "YouTube", "Twitter"],
        },
        {
          id: 3,
          name: "Emma Wilson",
          username: "@emmawilson",
          followers: "156K",
          followersCount: 156000,
          engagement: "5.1%",
          engagementRate: 5.1,
          category: "Fashion",
          verified: true,
          avatar: "/placeholder.svg?height=40&width=40",
          email: "emma@example.com",
          phone: "+1234567892",
          rate: 750,
          location: "Surabaya, Indonesia",
          bio: "Fashion designer and style consultant. Helping people express themselves through fashion.",
          platforms: ["Instagram", "TikTok", "Pinterest"],
        },
        {
          id: 4,
          name: "David Rodriguez",
          username: "@davidfitness",
          followers: "203K",
          followersCount: 203000,
          engagement: "6.3%",
          engagementRate: 6.3,
          category: "Fitness",
          verified: true,
          avatar: "/placeholder.svg?height=40&width=40",
          email: "david@example.com",
          phone: "+1234567893",
          rate: 600,
          location: "Bali, Indonesia",
          bio: "Certified personal trainer and nutrition coach. Transforming lives through fitness.",
          platforms: ["Instagram", "YouTube", "TikTok"],
        },
        {
          id: 5,
          name: "Lisa Park",
          username: "@lisacooks",
          followers: "78K",
          followersCount: 78000,
          engagement: "4.7%",
          engagementRate: 4.7,
          category: "Food",
          verified: false,
          avatar: "/placeholder.svg?height=40&width=40",
          email: "lisa@example.com",
          phone: "+1234567894",
          rate: 400,
          location: "Yogyakarta, Indonesia",
          bio: "Home chef sharing easy and delicious recipes for busy families.",
          platforms: ["Instagram", "TikTok", "YouTube"],
        },
      ]

      const initialCampaigns: Campaign[] = [
        {
          id: 1,
          name: "Summer Fashion Collection",
          description: "Promote our new summer collection with fashion influencers",
          budget: 15000,
          startDate: "2024-06-01",
          endDate: "2024-07-31",
          status: "active",
          kols: [3],
          expectedReach: 200000,
          actualReach: 180000,
          conversions: 450,
          roi: 2.3,
        },
        {
          id: 2,
          name: "Tech Product Launch",
          description: "Launch campaign for our new smartphone accessories",
          budget: 20000,
          startDate: "2024-07-15",
          endDate: "2024-08-15",
          status: "active",
          kols: [2],
          expectedReach: 150000,
          actualReach: 120000,
          conversions: 320,
          roi: 1.8,
        },
        {
          id: 3,
          name: "Wellness Challenge",
          description: "30-day wellness challenge with lifestyle influencers",
          budget: 12000,
          startDate: "2024-08-01",
          endDate: "2024-08-31",
          status: "draft",
          kols: [1, 4],
          expectedReach: 300000,
        },
      ]

      const initialMessages: ChatbotMessage[] = [
        {
          id: 1,
          kolId: 1,
          message:
            "Hi Sarah! Just a friendly reminder that your content for the Wellness Challenge campaign is due tomorrow. Please let us know if you need any assistance!",
          type: "reminder",
          scheduledDate: "2024-07-28",
          sent: true,
          response: "Thanks for the reminder! I'll have it ready by end of day.",
        },
        {
          id: 2,
          kolId: 2,
          message:
            "Hello Mike! We'd love to get your feedback on the Tech Product Launch campaign performance. Could you share some insights?",
          type: "follow-up",
          scheduledDate: "2024-07-27",
          sent: true,
        },
        {
          id: 3,
          kolId: 3,
          message:
            "Hi Emma! Here's the creative brief for our upcoming Fall Fashion campaign. Please review and let us know your thoughts.",
          type: "brief",
          scheduledDate: "2024-07-29",
          sent: false,
        },
      ]

      // Use modern state updates
      setKols(initialKOLs)
      setCampaigns(initialCampaigns)
      setChatbotMessages(initialMessages)
    }

    initializeData()
  }, [])

  // Filter KOLs with modern filtering patterns
  const filteredKOLs = optimisticKOLs.filter((kol) => {
    const matchesSearch =
      kol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kol.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || kol.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // Modern ROI calculation with better error handling
  const calculateROI = () => {
    const { budget, reach, conversionRate } = roiCalculation
    if (budget > 0 && reach > 0 && conversionRate > 0) {
      const conversions = (reach * conversionRate) / 100
      const revenue = conversions * 50 // Assuming $50 average order value
      const roi = ((revenue - budget) / budget) * 100
      setRoiCalculation((prev) => ({ ...prev, result: roi }))
    }
  }

  // Add new KOL with optimistic updates
  const addKOL = (newKOL: Omit<KOL, "id">) => {
    const id = Math.max(...kols.map((k) => k.id), 0) + 1
    const kolWithId = { ...newKOL, id }

    // Optimistic update
    addOptimisticKOL(kolWithId)

    // Update actual state
    setKols((prev) => [...prev, kolWithId])
  }

  // Add new campaign with optimistic updates
  const addCampaign = (newCampaign: Omit<Campaign, "id">) => {
    const id = Math.max(...campaigns.map((c) => c.id), 0) + 1
    const campaignWithId = { ...newCampaign, id }

    // Optimistic update
    addOptimisticCampaign(campaignWithId)

    // Update actual state
    setCampaigns((prev) => [...prev, campaignWithId])
  }

  // Send chatbot message with modern async patterns
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setChatbotMessages((prev) => [...prev, newMessage])
  }

  // Get campaign status color with modern styling
  const getStatusColor = (status: Campaign["status"]) => {
    const statusColors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return statusColors[status] || statusColors.draft
  }

  // Calculate dashboard stats with modern patterns
  const dashboardStats = {
    totalKOLs: optimisticKOLs.length,
    activeCampaigns: optimisticCampaigns.filter((c) => c.status === "active").length,
    totalROI: optimisticCampaigns.reduce((sum, c) => sum + (c.roi || 0), 0),
    avgEngagement:
      optimisticKOLs.length > 0
        ? optimisticKOLs.reduce((sum, k) => sum + k.engagementRate, 0) / optimisticKOLs.length
        : 0,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Next.js 15 styling */}
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

      <div className="p-6">
        {/* Enhanced Stats Cards with Next.js 15 features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium dark:text-gray-200">Total KOLs</CardTitle>
              <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold dark:text-white">{dashboardStats.totalKOLs}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium dark:text-gray-200">Active Campaigns</CardTitle>
              <Target className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold dark:text-white">{dashboardStats.activeCampaigns}</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium dark:text-gray-200">Total ROI</CardTitle>
              <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold dark:text-white">
                ${dashboardStats.totalROI.toFixed(0)}K
              </div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium dark:text-gray-200">Avg Engagement</CardTitle>
              <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold dark:text-white">
                {dashboardStats.avgEngagement.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">+0.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Next.js 15 Tabs */}
        <Tabs defaultValue="kols" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 dark:bg-gray-800">
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
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="dark:text-white">KOL Database</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Manage and filter your Key Opinion Leaders
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add KOL
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="dark:text-white">Add New KOL</DialogTitle>
                        <DialogDescription className="dark:text-gray-400">
                          Enter the details of the new Key Opinion Leader
                        </DialogDescription>
                      </DialogHeader>
                      <AddKOLForm onAdd={addKOL} />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search KOLs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredKOLs.map((kol) => (
                    <div
                      key={kol.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 space-y-3 md:space-y-0"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10 md:h-12 md:w-12">
                          <AvatarImage src={kol.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="dark:bg-gray-600 dark:text-white text-xs md:text-sm">
                            {kol.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium dark:text-white text-sm md:text-base truncate">{kol.name}</h3>
                            {kol.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{kol.username}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 truncate md:hidden">{kol.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end md:space-x-6">
                        <div className="grid grid-cols-3 md:flex md:items-center md:space-x-6 gap-4 md:gap-0 text-center">
                          <div>
                            <p className="text-xs md:text-sm font-medium dark:text-white">{kol.followers}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-medium dark:text-white">{kol.engagement}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Engagement</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-medium dark:text-white">${kol.rate}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Rate</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 md:space-x-3">
                          <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300 text-xs">
                            {kol.category}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedKOL(kol)}
                                className="dark:border-gray-600 dark:text-gray-300 text-xs md:text-sm"
                              >
                                <Eye className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                                <span className="hidden md:inline">View</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700 mx-4">
                              <KOLDetailView kol={selectedKOL} onSendMessage={sendChatbotMessage} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="dark:text-white">Campaign Management</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Track and manage your marketing campaigns
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Campaign
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="dark:text-white">Create New Campaign</DialogTitle>
                        <DialogDescription className="dark:text-gray-400">
                          Set up a new marketing campaign
                        </DialogDescription>
                      </DialogHeader>
                      <AddCampaignForm onAdd={addCampaign} kols={optimisticKOLs} />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimisticCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="p-6 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold dark:text-white">{campaign.name}</h3>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">{campaign.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                            <span>Budget: ${campaign.budget.toLocaleString()}</span>
                            <span>
                              Duration: {campaign.startDate} - {campaign.endDate}
                            </span>
                            <span>KOLs: {campaign.kols.length}</span>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCampaign(campaign)}
                              className="dark:border-gray-600 dark:text-gray-300"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl dark:bg-gray-800 dark:border-gray-700">
                            <CampaignDetailView campaign={selectedCampaign} kols={optimisticKOLs} />
                          </DialogContent>
                        </Dialog>
                      </div>

                      {campaign.status === "active" && (
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Expected Reach</p>
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                              {campaign.expectedReach?.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Actual Reach</p>
                            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                              {campaign.actualReach?.toLocaleString() || "TBD"}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
                            <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                              {campaign.roi ? `${campaign.roi}x` : "TBD"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white text-lg md:text-xl">ROI Calculator</CardTitle>
                  <CardDescription className="dark:text-gray-400 text-sm md:text-base">
                    Calculate potential returns on your marketing investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="budget" className="dark:text-gray-300 text-sm md:text-base">
                        Campaign Budget ($)
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="10000"
                        value={roiCalculation.budget || ""}
                        onChange={(e) => setRoiCalculation((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reach" className="dark:text-gray-300 text-sm md:text-base">
                        Expected Reach
                      </Label>
                      <Input
                        id="reach"
                        type="number"
                        placeholder="100000"
                        value={roiCalculation.reach || ""}
                        onChange={(e) => setRoiCalculation((prev) => ({ ...prev, reach: Number(e.target.value) }))}
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="conversion" className="dark:text-gray-300 text-sm md:text-base">
                        Conversion Rate (%)
                      </Label>
                      <Input
                        id="conversion"
                        type="number"
                        step="0.1"
                        placeholder="2.5"
                        value={roiCalculation.conversionRate || ""}
                        onChange={(e) =>
                          setRoiCalculation((prev) => ({ ...prev, conversionRate: Number(e.target.value) }))
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
                            {Math.round((roiCalculation.reach * roiCalculation.conversionRate) / 100)}
                          </p>
                          <p>
                            Projected Revenue: $
                            {Math.round(
                              (roiCalculation.reach * roiCalculation.conversionRate * 50) / 100,
                            ).toLocaleString()}
                          </p>
                          <p
                            className={`font-semibold ${roiCalculation.result > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                          >
                            ROI: {roiCalculation.result.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Performance Metrics</CardTitle>
                  <CardDescription className="dark:text-gray-400">Real-time analytics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium dark:text-gray-300">Total Impressions</span>
                        <span className="font-bold text-lg dark:text-white">2.4M</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium dark:text-gray-300">Click-through Rate</span>
                        <span className="font-bold text-lg dark:text-white">3.2%</span>
                      </div>
                      <Progress value={64} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium dark:text-gray-300">Conversion Rate</span>
                        <span className="font-bold text-lg dark:text-white">2.1%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium dark:text-gray-300">Cost per Acquisition</span>
                        <span className="font-bold text-lg dark:text-white">$24.50</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Insights</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Fashion campaigns show 23% higher engagement</li>
                        <li>• Weekend posts perform 15% better</li>
                        <li>• Video content drives 2x more conversions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Campaign Performance Comparison</CardTitle>
                <CardDescription className="dark:text-gray-400">Compare your active campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimisticCampaigns
                    .filter((c) => c.status === "active")
                    .map((campaign) => (
                      <div key={campaign.id} className="p-4 border rounded-lg dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium dark:text-white">{campaign.name}</h4>
                          <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Budget</p>
                            <p className="font-semibold dark:text-white">${campaign.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Reach</p>
                            <p className="font-semibold dark:text-white">
                              {campaign.actualReach?.toLocaleString() || "TBD"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Conversions</p>
                            <p className="font-semibold dark:text-white">{campaign.conversions || "TBD"}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">ROI</p>
                            <p className="font-semibold dark:text-white">{campaign.roi ? `${campaign.roi}x` : "TBD"}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chatbot" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white text-lg md:text-xl">Send Message</CardTitle>
                  <CardDescription className="dark:text-gray-400 text-sm md:text-base">
                    Send automated messages to KOLs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SendMessageForm kols={optimisticKOLs} onSend={sendChatbotMessage} />
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white text-lg md:text-xl">Message Templates</CardTitle>
                  <CardDescription className="dark:text-gray-400 text-sm md:text-base">
                    Quick templates for common messages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg dark:border-gray-700">
                      <h4 className="font-medium text-sm dark:text-white">Deadline Reminder</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        "Hi [Name]! Just a friendly reminder that your content is due [Date]. Let us know if you need
                        help!"
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg dark:border-gray-700">
                      <h4 className="font-medium text-sm dark:text-white">Campaign Brief</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        "Hello [Name]! Here's the creative brief for our upcoming campaign. Please review and share your
                        thoughts."
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg dark:border-gray-700">
                      <h4 className="font-medium text-sm dark:text-white">Follow-up</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        "Hi [Name]! We'd love to get your feedback on the recent campaign performance. Could you share
                        insights?"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Message History</CardTitle>
                <CardDescription className="dark:text-gray-400">Recent chatbot activity and responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatbotMessages.map((message) => {
                    const kol = optimisticKOLs.find((k) => k.id === message.kolId)
                    return (
                      <div key={message.id} className="p-4 border rounded-lg dark:border-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={kol?.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="dark:bg-gray-600 dark:text-white">
                                {kol?.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-sm dark:text-white">{kol?.name}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{message.scheduledDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={message.type === "reminder" ? "default" : "secondary"}>
                              {message.type}
                            </Badge>
                            {message.sent ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{message.message}</p>
                        {message.response && (
                          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              <strong>Response:</strong> {message.response}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Add KOL Form Component with Next.js 15 features
function AddKOLForm({ onAdd }: { onAdd: (kol: Omit<KOL, "id">) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    followers: "",
    followersCount: 0,
    engagement: "",
    engagementRate: 0,
    category: "",
    verified: false,
    email: "",
    phone: "",
    rate: 0,
    location: "",
    bio: "",
    platforms: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onAdd({
      ...formData,
      avatar: "/placeholder.svg?height=40&width=40",
    })

    // Reset form
    setFormData({
      name: "",
      username: "",
      followers: "",
      followersCount: 0,
      engagement: "",
      engagementRate: 0,
      category: "",
      verified: false,
      email: "",
      phone: "",
      rate: 0,
      location: "",
      bio: "",
      platforms: [],
    })

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="dark:text-gray-300">
            Full Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="username" className="dark:text-gray-300">
            Username
          </Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
            placeholder="@username"
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="followers" className="dark:text-gray-300">
            Followers (Display)
          </Label>
          <Input
            id="followers"
            value={formData.followers}
            onChange={(e) => setFormData((prev) => ({ ...prev, followers: e.target.value }))}
            placeholder="125K"
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="followersCount" className="dark:text-gray-300">
            Followers (Count)
          </Label>
          <Input
            id="followersCount"
            type="number"
            value={formData.followersCount}
            onChange={(e) => setFormData((prev) => ({ ...prev, followersCount: Number(e.target.value) }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="engagement" className="dark:text-gray-300">
            Engagement (Display)
          </Label>
          <Input
            id="engagement"
            value={formData.engagement}
            onChange={(e) => setFormData((prev) => ({ ...prev, engagement: e.target.value }))}
            placeholder="4.2%"
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="engagementRate" className="dark:text-gray-300">
            Engagement Rate
          </Label>
          <Input
            id="engagementRate"
            type="number"
            step="0.1"
            value={formData.engagementRate}
            onChange={(e) => setFormData((prev) => ({ ...prev, engagementRate: Number(e.target.value) }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category" className="dark:text-gray-300">
            Category
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="food">Food</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rate" className="dark:text-gray-300">
            Rate ($)
          </Label>
          <Input
            id="rate"
            type="number"
            value={formData.rate}
            onChange={(e) => setFormData((prev) => ({ ...prev, rate: Number(e.target.value) }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="dark:text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="dark:text-gray-300">
            Phone
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location" className="dark:text-gray-300">
          Location
        </Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
          required
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <Label htmlFor="bio" className="dark:text-gray-300">
          Bio
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
          rows={3}
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding KOL..." : "Add KOL"}
      </Button>
    </form>
  )
}

// KOL Detail View Component with Next.js 15 features
function KOLDetailView({
  kol,
  onSendMessage,
}: { kol: KOL | null; onSendMessage: (kolId: number, message: string, type: ChatbotMessage["type"]) => void }) {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<ChatbotMessage["type"]>("reminder")
  const [isSending, setIsSending] = useState(false)

  if (!kol) return null

  const handleSendMessage = async () => {
    if (message.trim()) {
      setIsSending(true)
      await onSendMessage(kol.id, message, messageType)
      setMessage("")
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={kol.avatar || "/placeholder.svg"} />
            <AvatarFallback className="dark:bg-gray-600 dark:text-white">
              {kol.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold dark:text-white">{kol.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{kol.username}</p>
          </div>
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 dark:text-white">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <p className="dark:text-gray-300">
                <strong>Email:</strong> {kol.email}
              </p>
              <p className="dark:text-gray-300">
                <strong>Phone:</strong> {kol.phone}
              </p>
              <p className="dark:text-gray-300">
                <strong>Location:</strong> {kol.location}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 dark:text-white">Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {kol.platforms.map((platform) => (
                <Badge key={platform} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 dark:text-white">Statistics</h3>
            <div className="space-y-2 text-sm">
              <p className="dark:text-gray-300">
                <strong>Followers:</strong> {kol.followers} ({kol.followersCount.toLocaleString()})
              </p>
              <p className="dark:text-gray-300">
                <strong>Engagement:</strong> {kol.engagement}
              </p>
              <p className="dark:text-gray-300">
                <strong>Rate:</strong> ${kol.rate}
              </p>
              <p className="dark:text-gray-300">
                <strong>Category:</strong> {kol.category}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 dark:text-white">Verification</h3>
            <Badge variant={kol.verified ? "default" : "secondary"}>{kol.verified ? "Verified" : "Not Verified"}</Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2 dark:text-white">Bio</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{kol.bio}</p>
      </div>

      <div className="border-t pt-4 dark:border-gray-700">
        <h3 className="font-semibold mb-3 dark:text-white">Send Message</h3>
        <div className="space-y-3">
          <Select value={messageType} onValueChange={(value: ChatbotMessage["type"]) => setMessageType(value)}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="reminder">Reminder</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="brief">Brief</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Button
            onClick={handleSendMessage}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            disabled={isSending}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Add Campaign Form Component with Next.js 15 features
function AddCampaignForm({ onAdd, kols }: { onAdd: (campaign: Omit<Campaign, "id">) => void; kols: KOL[] }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: 0,
    startDate: "",
    endDate: "",
    status: "draft" as Campaign["status"],
    kols: [] as number[],
    expectedReach: 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onAdd(formData)

    // Reset form
    setFormData({
      name: "",
      description: "",
      budget: 0,
      startDate: "",
      endDate: "",
      status: "draft",
      kols: [],
      expectedReach: 0,
    })

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="campaignName" className="dark:text-gray-300">
          Campaign Name
        </Label>
        <Input
          id="campaignName"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <Label htmlFor="description" className="dark:text-gray-300">
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budget" className="dark:text-gray-300">
            Budget ($)
          </Label>
          <Input
            id="budget"
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number(e.target.value) }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="expectedReach" className="dark:text-gray-300">
            Expected Reach
          </Label>
          <Input
            id="expectedReach"
            type="number"
            value={formData.expectedReach}
            onChange={(e) => setFormData((prev) => ({ ...prev, expectedReach: Number(e.target.value) }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate" className="dark:text-gray-300">
            Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="endDate" className="dark:text-gray-300">
            End Date
          </Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status" className="dark:text-gray-300">
          Status
        </Label>
        <Select
          value={formData.status}
          onValueChange={(value: Campaign["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
        >
          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
      </Button>
    </form>
  )
}

// Campaign Detail View Component with Next.js 15 features
function CampaignDetailView({ campaign, kols }: { campaign: Campaign | null; kols: KOL[] }) {
  if (!campaign) return null

  const campaignKOLs = kols.filter((kol) => campaign.kols.includes(kol.id))

  const getStatusColor = (status: Campaign["status"]) => {
    const statusColors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }
    return statusColors[status] || statusColors.draft
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <span className="dark:text-white">{campaign.name}</span>
          <Badge className={getStatusColor(campaign.status)}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </DialogTitle>
        <DialogDescription className="dark:text-gray-400">{campaign.description}</DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3 dark:text-white">Campaign Details</h3>
          <div className="space-y-2 text-sm">
            <p className="dark:text-gray-300">
              <strong>Budget:</strong> ${campaign.budget.toLocaleString()}
            </p>
            <p className="dark:text-gray-300">
              <strong>Duration:</strong> {campaign.startDate} - {campaign.endDate}
            </p>
            <p className="dark:text-gray-300">
              <strong>Expected Reach:</strong> {campaign.expectedReach.toLocaleString()}
            </p>
            {campaign.actualReach && (
              <p className="dark:text-gray-300">
                <strong>Actual Reach:</strong> {campaign.actualReach.toLocaleString()}
              </p>
            )}
            {campaign.conversions && (
              <p className="dark:text-gray-300">
                <strong>Conversions:</strong> {campaign.conversions}
              </p>
            )}
            {campaign.roi && (
              <p className="dark:text-gray-300">
                <strong>ROI:</strong> {campaign.roi}x
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3 dark:text-white">Performance Metrics</h3>
          {campaign.status === "active" && campaign.actualReach ? (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-gray-300">Reach Progress</span>
                  <span className="dark:text-gray-300">
                    {Math.round((campaign.actualReach / campaign.expectedReach) * 100)}%
                  </span>
                </div>
                <Progress value={(campaign.actualReach / campaign.expectedReach) * 100} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="dark:text-gray-300">Budget Utilization</span>
                  <span className="dark:text-gray-300">75%</span>
                </div>
                <Progress value={75} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Metrics will be available once the campaign is active.
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 dark:text-white">Assigned KOLs ({campaignKOLs.length})</h3>
        <div className="space-y-3">
          {campaignKOLs.map((kol) => (
            <div key={kol.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={kol.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="dark:bg-gray-600 dark:text-white">
                    {kol.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm dark:text-white">{kol.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{kol.followers} followers</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium dark:text-white">${kol.rate}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{kol.engagement} engagement</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Send Message Form Component with Next.js 15 features
function SendMessageForm({
  kols,
  onSend,
}: { kols: KOL[]; onSend: (kolId: number, message: string, type: ChatbotMessage["type"]) => void }) {
  const [selectedKOL, setSelectedKOL] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<ChatbotMessage["type"]>("reminder")
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (selectedKOL && message.trim()) {
      setIsSending(true)
      await onSend(selectedKOL, message, messageType)
      setMessage("")
      setSelectedKOL(null)
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="dark:text-gray-300">Select KOL</Label>
        <Select value={selectedKOL?.toString() || ""} onValueChange={(value) => setSelectedKOL(Number(value))}>
          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <SelectValue placeholder="Choose a KOL" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            {kols.map((kol) => (
              <SelectItem key={kol.id} value={kol.id.toString()}>
                {kol.name} ({kol.username})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="dark:text-gray-300">Message Type</Label>
        <Select value={messageType} onValueChange={(value: ChatbotMessage["type"]) => setMessageType(value)}>
          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            <SelectItem value="reminder">Reminder</SelectItem>
            <SelectItem value="follow-up">Follow-up</SelectItem>
            <SelectItem value="brief">Brief</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="dark:text-gray-300">Message</Label>
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <Button
        onClick={handleSend}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        disabled={isSending}
      >
        <Send className="h-4 w-4 mr-2" />
        {isSending ? "Sending..." : "Send Message"}
      </Button>
    </div>
  )
}
