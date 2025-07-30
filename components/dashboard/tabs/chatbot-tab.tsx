"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SendMessageWidget } from "../widgets/send-message-widget";
import { MessageTemplates } from "../widgets/message-templates";
import { MessageHistory } from "../widgets/message-history";
import { AddTemplateForm } from "../forms/add-template-form";
import type { KOL, ChatbotMessage, Template } from "@/types/dashboard";
import { MessageTemplatesSkeleton } from "../widgets/message-templates-skeleton";
import { MessageHistorySkeleton } from "../widgets/message-history-skeleton";

interface ChatbotTabProps {
  optimisticKOLs: KOL[];
  chatbotMessages: ChatbotMessage[];
  sendChatbotMessage: (
    kolId: number,
    message: string,
    type: ChatbotMessage["type"]
  ) => Promise<void>;
  templates: Template[];
  addTemplate: (data: Omit<Template, "id" | "created_at">) => void;
  updateTemplate: (
    id: number,
    data: Partial<Omit<Template, "id" | "created_at">>
  ) => void;
  deleteTemplate: (id: number) => void;
  isLoading: boolean;
}

export function ChatbotTab({
  optimisticKOLs,
  chatbotMessages,
  sendChatbotMessage,
  templates,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  isLoading,
}: ChatbotTabProps) {
  const [baseMessage, setBaseMessage] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<ChatbotMessage["type"]>("reminder");
  const [selectedKOL, setSelectedKOL] = useState<number | null>(null);
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<Template | null>(null);

  const handleTemplateSelect = (
    templateContent: string,
    templateType: ChatbotMessage["type"]
  ) => {
    setBaseMessage(templateContent);
    setMessage(templateContent);
    setMessageType(templateType);
  };

  useEffect(() => {
    if (selectedKOL && baseMessage.includes("[KOL Name]")) {
      const kol = optimisticKOLs.find((k) => k.id === selectedKOL);
      if (kol) {
        const newMessage = baseMessage.replace(/\[KOL Name\]/g, kol.name);
        setMessage(newMessage);
      }
    } else {
      setMessage(baseMessage);
    }
  }, [selectedKOL, baseMessage, optimisticKOLs]);

  const handleSendSuccess = () => {
    setBaseMessage("");
    setMessage("");
    setSelectedKOL(null);
    setMessageType("reminder");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <SendMessageWidget
          kols={optimisticKOLs}
          onSend={sendChatbotMessage}
          onSendSuccess={handleSendSuccess}
          message={message}
          messageType={messageType}
          onMessageChange={setMessage}
          onTypeChange={setMessageType}
          selectedKOL={selectedKOL}
          onKOLChange={setSelectedKOL}
        />
        {isLoading ? (
          <MessageTemplatesSkeleton />
        ) : (
          <MessageTemplates
            templates={templates}
            onTemplateSelect={handleTemplateSelect}
            onAdd={() => setIsAddTemplateOpen(true)}
            onEdit={(template) => {
              setTemplateToEdit(template);
              setIsEditTemplateOpen(true);
            }}
            onDelete={deleteTemplate}
          />
        )}
      </div>

      {isLoading ? (
        <MessageHistorySkeleton />
      ) : (
        <MessageHistory messages={chatbotMessages} kols={optimisticKOLs} />
      )}
      <Dialog open={isAddTemplateOpen} onOpenChange={setIsAddTemplateOpen}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">
              Create New Template
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Add a new reusable message template.
            </DialogDescription>
          </DialogHeader>
          <AddTemplateForm
            onSave={addTemplate}
            onSuccess={() => setIsAddTemplateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditTemplateOpen} onOpenChange={setIsEditTemplateOpen}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Edit Template</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Update the details for this template.
            </DialogDescription>
          </DialogHeader>
          <AddTemplateForm
            initialData={templateToEdit}
            onSave={(updatedData) => {
              if (templateToEdit) {
                updateTemplate(templateToEdit.id, updatedData);
              }
            }}
            onSuccess={() => setIsEditTemplateOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
