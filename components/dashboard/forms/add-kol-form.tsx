"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { KOL } from "@/types/dashboard"

interface AddKOLFormProps {
  onAdd: (kol: Omit<KOL, "id">) => void
}

const FormRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
}

export function AddKOLForm({ onAdd }: AddKOLFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    followers: "",
    followersCount: 0,
    engagement: "",
    engagementRate: 0,
    category: "",
    verified: false,
    email: "",
    phone: "",
    rate: 0,
    location: "",
    bio: "",
    platforms: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    onAdd({
      ...formData,
      avatar: "/placeholder.svg?height=40&width=40",
    })

    setFormData({
      name: "",
      username: "",
      followers: "",
      followersCount: 0,
      engagement: "",
      engagementRate: 0,
      category: "",
      verified: false,
      email: "",
      phone: "",
      rate: 0,
      location: "",
      bio: "",
      platforms: [],
    })

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormRow>
        <div>
          <Label htmlFor="name" className="dark:text-gray-300 mb-2">Full Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <Label htmlFor="username" className="dark:text-gray-300 mb-2">Username</Label>
          <Input id="username" value={formData.username} onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))} placeholder="@username" required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </FormRow>

      <FormRow>
        <div>
          <Label htmlFor="followers" className="dark:text-gray-300 mb-2">Followers (Display)</Label>
          <Input id="followers" value={formData.followers} onChange={(e) => setFormData((prev) => ({ ...prev, followers: e.target.value }))} placeholder="125K" required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <Label htmlFor="followersCount" className="dark:text-gray-300 mb-2">Followers (Count)</Label>
          <Input id="followersCount" type="number" value={formData.followersCount} onChange={(e) => setFormData((prev) => ({ ...prev, followersCount: Number(e.target.value) }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </FormRow>

      <FormRow>
        <div>
          <Label htmlFor="engagement" className="dark:text-gray-300 mb-2">Engagement (Display)</Label>
          <Input id="engagement" value={formData.engagement} onChange={(e) => setFormData((prev) => ({ ...prev, engagement: e.target.value }))} placeholder="4.2%" required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <Label htmlFor="engagementRate" className="dark:text-gray-300 mb-2">Engagement Rate</Label>
          <Input id="engagementRate" type="number" step="0.1" value={formData.engagementRate} onChange={(e) => setFormData((prev) => ({ ...prev, engagementRate: Number(e.target.value) }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </FormRow>

      <FormRow>
        <div>
          <Label htmlFor="category" className="dark:text-gray-300 mb-2">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="food">Food</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rate" className="dark:text-gray-300 mb-2">Rate ($)</Label>
          <Input id="rate" type="number" value={formData.rate} onChange={(e) => setFormData((prev) => ({ ...prev, rate: Number(e.target.value) }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </FormRow>
      
      <FormRow>
        <div>
          <Label htmlFor="email" className="dark:text-gray-300 mb-2">Email</Label>
          <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <Label htmlFor="phone" className="dark:text-gray-300 mb-2">Phone</Label>
          <Input id="phone" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
      </FormRow>

      <div>
        <Label htmlFor="location" className="dark:text-gray-300 mb-2">Location</Label>
        <Input id="location" value={formData.location} onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>

      <div>
        <Label htmlFor="bio" className="dark:text-gray-300 mb-2">Bio</Label>
        <Textarea id="bio" value={formData.bio} onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))} rows={3} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding KOL..." : "Add KOL"}
      </Button>
    </form>
  )
}
