"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import type { KOL, ChatbotMessage } from "@/types/dashboard";

interface SendMessageWidgetProps {
  kols: KOL[];
  onSend: (
    kolId: number,
    message: string,
    type: ChatbotMessage["type"]
  ) => Promise<void>;
  onSendSuccess: () => void;
  message: string;
  messageType: ChatbotMessage["type"];
  onMessageChange: (value: string) => void;
  onTypeChange: (value: ChatbotMessage["type"]) => void;
  selectedKOL: number | null;
  onKOLChange: (value: number | null) => void;
}

export function SendMessageWidget({
  kols,
  onSend,
  onSendSuccess,
  message,
  messageType,
  onMessageChange,
  onTypeChange,
  selectedKOL,
  onKOLChange,
}: SendMessageWidgetProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (selectedKOL && message.trim()) {
      setIsSending(true);
      await onSend(selectedKOL, message, messageType);

      onSendSuccess();

      setIsSending(false);
    }
  };

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white text-lg md:text-xl">
          Send New Message
        </CardTitle>
        <CardDescription className="dark:text-gray-400 text-sm md:text-base">
          Directly communicate with your KOLs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="dark:text-gray-300 mb-2">Select KOL</Label>
            <Select
              value={selectedKOL?.toString() || ""}
              onValueChange={(value) => onKOLChange(Number(value))}
            >
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
            <Label className="dark:text-gray-300 mb-2">Message Type</Label>
            <Select value={messageType} onValueChange={onTypeChange}>
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
        </div>

        <div>
          <Label className="dark:text-gray-300 mb-2">Message</Label>
          <Textarea
            placeholder="Type your message or select a template..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            rows={4}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <Button
          onClick={handleSend}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          disabled={isSending || !selectedKOL}
        >
          <Send className="h-4 w-4 mr-2" />
          {isSending ? "Sending..." : "Send Message"}
        </Button>
      </CardContent>
    </Card>
  );
}
