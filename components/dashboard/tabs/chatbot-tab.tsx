"use client"

import { SendMessageWidget } from "../widgets/send-message-widget"
import { MessageTemplates } from "../widgets/message-templates"
import { MessageHistory } from "../widgets/message-history"
import type { KOL, ChatbotMessage } from "@/types/dashboard"

interface ChatbotTabProps {
  optimisticKOLs: KOL[]
  chatbotMessages: ChatbotMessage[]
  sendChatbotMessage: (kolId: number, message: string, type: ChatbotMessage["type"]) => Promise<void>
}

export function ChatbotTab({ optimisticKOLs, chatbotMessages, sendChatbotMessage }: ChatbotTabProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <SendMessageWidget kols={optimisticKOLs} onSend={sendChatbotMessage} />
        <MessageTemplates />
      </div>

      <MessageHistory messages={chatbotMessages} kols={optimisticKOLs} />
    </div>
  )
}
