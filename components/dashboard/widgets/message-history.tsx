"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ChatbotMessage, KOL } from "@/types/dashboard"

interface MessageHistoryProps {
  messages: ChatbotMessage[]
  kols: KOL[]
}

export function MessageHistory({ messages, kols }: MessageHistoryProps) {
  const getKolName = (kolId: number) => {
    const kol = kols.find((k) => k.id === kolId)
    return kol ? kol.name : "Unknown KOL"
  }

  const getKolAvatar = (kolId: number) => {
    const kol = kols.find((k) => k.id === kolId)
    return kol ? kol.avatar : "/placeholder.svg"
  }

  const getKolFallback = (kolId: number) => {
    const kol = kols.find((k) => k.id === kolId)
    return kol
      ? kol.name
          .split(" ")
          .map((n) => n[0])
          .join("")
      : "UK"
  }

  const getMessageTypeColor = (type: ChatbotMessage["type"]) => {
    switch (type) {
      case "reminder":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "follow-up":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "brief":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white text-lg md:text-xl">Message History</CardTitle>
        <CardDescription className="dark:text-gray-400 text-sm md:text-base">
          View all sent and received chatbot messages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
          {messages.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">No messages sent yet.</p>
          )}
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3 p-3 border rounded-lg dark:border-gray-700">
              <Avatar className="h-8 w-8">
                <AvatarImage src={getKolAvatar(message.kolId) || "/placeholder.svg"} />
                <AvatarFallback className="dark:bg-gray-600 dark:text-white text-xs">
                  {getKolFallback(message.kolId)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-x-4 gap-y-1 mb-1">
                  <h4 className="font-medium dark:text-white text-sm">{getKolName(message.kolId)}</h4>
                  <Badge className={getMessageTypeColor(message.type)}>{message.type}</Badge>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{message.message}</p>
                {message.response && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">Response:</span> {message.response}
                  </div>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Sent on: {new Date(message.scheduledDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
