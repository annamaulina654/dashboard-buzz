"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Campaign, KOL } from "@/types/dashboard"

interface AddCampaignFormProps {
  onAdd: (campaign: Omit<Campaign, "id">) => void
  kols: KOL[]
}

const FormRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
}

export function AddCampaignForm({ onAdd, kols }: AddCampaignFormProps) {
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

    await new Promise((resolve) => setTimeout(resolve, 500))

    onAdd(formData)

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
        <Label htmlFor="campaignName" className="dark:text-gray-300 mb-2">Campaign Name</Label>
        <Input id="campaignName" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>

      <div>
        <Label htmlFor="description" className="dark:text-gray-300 mb-2">Description</Label>
        <Textarea id="description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} rows={3} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>

      <FormRow>
        <div>
          <Label htmlFor="budget" className="dark:text-gray-300 mb-2">Budget ($)</Label>
          <Input id="budget" type="number" value={formData.budget} onChange={(e) => setFormData((prev) => ({ ...prev, budget: Number(e.target.value) }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <Label htmlFor="expectedReach" className="dark:text-gray-300 mb-2">Expected Reach</Label>
          <Input id="expectedReach" type="number" value={formData.expectedReach} onChange={(e) => setFormData((prev) => ({ ...prev, expectedReach: Number(e.target.value) }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </FormRow>

      <FormRow>
        <div>
          <Label htmlFor="startDate" className="dark:text-gray-300 mb-2">Start Date</Label>
          <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <Label htmlFor="endDate" className="dark:text-gray-300 mb-2">End Date</Label>
          <Input id="endDate" type="date" value={formData.endDate} onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </FormRow>

      <div>
        <Label htmlFor="status" className="dark:text-gray-300 mb-2">Status</Label>
        <Select value={formData.status} onValueChange={(value: Campaign["status"]) => setFormData((prev) => ({ ...prev, status: value }))}>
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
