"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { ChatbotMessage, Template } from "@/types/dashboard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MessageTemplatesProps {
  templates: Template[];
  onTemplateSelect: (content: string, type: ChatbotMessage["type"]) => void;
  onAdd: () => void;
  onEdit: (template: Template) => void;
  onDelete: (id: number) => void;
}

export function MessageTemplates({
  templates,
  onTemplateSelect,
  onAdd,
  onEdit,
  onDelete,
}: MessageTemplatesProps) {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="dark:text-white text-lg md:text-xl">
              Message Templates
            </CardTitle>
            <CardDescription className="dark:text-gray-400 text-sm md:text-base">
              Pre-defined messages for quick communication.
            </CardDescription>
          </div>
          <Button
            onClick={onAdd}
            variant="outline"
            size="sm"
            className="dark:border-gray-600 dark:text-gray-300 bg-transparent w-full sm:w-auto flex-shrink-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 border rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onTemplateSelect(template.content, template.type)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold dark:text-white mb-2 text-sm md:text-base">
                    {template.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm line-clamp-2">
                    {template.content}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 dark:text-gray-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(template);
                    }}
                  >
                    {" "}
                    <Edit className="h-4 w-4" />{" "}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 dark:text-gray-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="dark:text-white">
                          Are you sure you want to delete this template?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-gray-400">
                          This will permanently delete the template.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(template.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
