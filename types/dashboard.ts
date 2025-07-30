export interface KOL {
  id: number;
  name: string;
  username: string;
  followers: string;
  followersCount: number;
  engagement: string;
  engagementRate: number;
  category: string;
  verified: boolean;
  avatar: string;
  email: string;
  phone: string;
  rate: number;
  location: string;
  bio: string;
  platforms: string[];
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "draft" | "paused";
  kols: number[];
  expectedReach: number;
  actualReach?: number;
  conversions?: number;
  roi?: number;
}

export interface ChatbotMessage {
  id: number;
  kolId: number;
  message: string;
  type: "reminder" | "follow-up" | "brief";
  scheduledDate: string;
  sent: boolean;
  response?: string;
}

export interface Template {
  id: number;
  created_at: string;
  name: string;
  content: string;
  type: "reminder" | "follow-up" | "brief";
}
