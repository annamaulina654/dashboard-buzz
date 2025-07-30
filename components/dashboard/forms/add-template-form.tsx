"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Template } from "@/types/dashboard";

type TemplateFormData = Omit<Template, "id" | "created_at">;

interface AddTemplateFormProps {
  onSave: (data: TemplateFormData) => void;
  onSuccess?: () => void;
  initialData?: Template | null;
}

export function AddTemplateForm({
  onSave,
  onSuccess,
  initialData,
}: AddTemplateFormProps) {
  const [formData, setFormData] = useState<TemplateFormData>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        content: initialData.content,
        type: initialData.type,
      };
    }
    return {
      name: "",
      content: "",
      type: "reminder",
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave(formData);
    setIsSubmitting(false);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="templateName" className="dark:text-gray-300 mb-2">
          Template Name
        </Label>
        <Input
          id="templateName"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="e.g., Content Submission Follow-up"
        />
      </div>

      <div>
        <Label htmlFor="templateType" className="dark:text-gray-300 mb-2">
          Message Type
        </Label>
        <Select
          value={formData.type}
          onValueChange={(value: Template["type"]) =>
            setFormData((prev) => ({ ...prev, type: value }))
          }
        >
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
        <Label htmlFor="templateContent" className="dark:text-gray-300 mb-2">
          Content
        </Label>
        <Textarea
          id="templateContent"
          placeholder="Type your template message here. Use [KOL Name] as a placeholder."
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          rows={5}
          required
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? initialData
            ? "Saving..."
            : "Creating..."
          : initialData
          ? "Save Changes"
          : "Create Template"}
      </Button>
    </form>
  );
}
