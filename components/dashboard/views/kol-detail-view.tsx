"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import type { KOL, ChatbotMessage } from "@/types/dashboard"

interface KOLDetailViewProps {
  kol: KOL | null
  onSendMessage: (kolId: number, message: string, type: ChatbotMessage["type"]) => Promise<void>
}

export function KOLDetailView({ kol, onSendMessage }: KOLDetailViewProps) {
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
    <div className="space-y-6 p-1 sm:p-0">
      <DialogHeader>
        <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={kol.avatar || "/placeholder.svg"} />
            <AvatarFallback className="dark:bg-gray-600 dark:text-white">
              {kol.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg sm:text-xl font-bold dark:text-white">{kol.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{kol.username}</p>
          </div>
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 dark:text-white">Contact Information</h3>
            <div className="space-y-2 text-sm break-words">
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
            <Badge variant={kol.verified ? "default" : "secondary"}>
              {kol.verified ? "Verified" : "Not Verified"}
            </Badge>
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
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex flex-col sm:flex-row gap-3">
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
            <Button
              onClick={handleSendMessage}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              disabled={isSending}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
