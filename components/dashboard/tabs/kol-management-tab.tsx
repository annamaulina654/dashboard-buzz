"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Eye } from "lucide-react"
import type { KOL, ChatbotMessage } from "@/types/dashboard"
import { AddKOLForm } from "../forms/add-kol-form"
import { KOLDetailView } from "../views/kol-detail-view"

interface KOLManagementTabProps {
  filteredKOLs: KOL[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  categoryFilter: string
  setCategoryFilter: (filter: string) => void
  selectedKOL: KOL | null
  setSelectedKOL: (kol: KOL | null) => void
  addKOL: (kol: Omit<KOL, "id">) => void
  sendChatbotMessage: (kolId: number, message: string, type: ChatbotMessage["type"]) => Promise<void>
}

export function KOLManagementTab({
  filteredKOLs,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  selectedKOL,
  setSelectedKOL,
  addKOL,
  sendChatbotMessage,
}: KOLManagementTabProps) {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="dark:text-white">KOL Database</CardTitle>
            <CardDescription className="dark:text-gray-400">Manage and filter your Key Opinion Leaders</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full sm:w-auto">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add KOL</span>
                <span className="sm:hidden">Add New KOL</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
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
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative w-full flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search KOLs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredKOLs.map((kol) => (
            <div
              key={kol.id}
              className="flex flex-col space-y-4 rounded-lg border p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex flex-row items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={kol.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="dark:bg-gray-600">
                    {kol.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <h3 className="truncate font-medium dark:text-white">{kol.name}</h3>
                    {kol.verified && <Badge variant="secondary">Verified</Badge>}
                  </div>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">{kol.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div>
                  <p className="font-semibold dark:text-white">{kol.followers}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="font-semibold dark:text-white">{kol.engagement}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Engagement</p>
                </div>
                <div>
                  <p className="font-semibold dark:text-white">${kol.rate}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rate</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4 dark:border-gray-600">
                <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                  {kol.category}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedKOL(kol)}
                      className="dark:border-gray-600 dark:text-gray-300 hover:dark:bg-gray-700"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
                    <KOLDetailView kol={selectedKOL} onSendMessage={sendChatbotMessage} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
