"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash } from "lucide-react"

export function MessageTemplates() {
  const templates = [
    {
      id: 1,
      name: "Campaign Brief Reminder",
      content:
        "Hi [KOL Name], just a friendly reminder about the campaign brief for [Campaign Name]. Please review it by [Date].",
    },
    {
      id: 2,
      name: "Content Submission Follow-up",
      content:
        "Hello [KOL Name], following up on your content submission for [Campaign Name]. Please upload it to the portal by [Date].",
    },
    {
      id: 3,
      name: "Performance Check-in",
      content: "Hi [KOL Name], checking in on the performance of [Campaign Name]. Let us know if you need any support.",
    },
  ]

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="dark:text-white text-lg md:text-xl">Message Templates</CardTitle>
            <CardDescription className="dark:text-gray-400 text-sm md:text-base">
              Pre-defined messages for quick communication.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 bg-transparent w-full sm:w-auto flex-shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="p-4 border rounded-lg dark:border-gray-700">
              <h4 className="font-semibold dark:text-white mb-2 text-sm md:text-base">{template.name}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm line-clamp-2">{template.content}</p>
              <div className="flex justify-end space-x-2 mt-3">
                <Button variant="ghost" size="sm" className="dark:text-gray-400">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="dark:text-gray-400">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
