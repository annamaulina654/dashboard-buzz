import { supabaseClient } from "./supabase-client";
import type { KOL, Campaign, ChatbotMessage } from "@/types/dashboard";

export async function initializeData() {
  const { data: initialKOLs, error: kolsError } = await supabaseClient
    .from("kols")
    .select("*")
    .order("id", { ascending: true });

  if (kolsError) {
    console.error("Error fetching KOLs:", kolsError);
    return { initialKOLs: [], initialCampaigns: [], initialMessages: [] };
  }

  const { data: initialCampaigns, error: campaignsError } = await supabaseClient
    .from("campaigns")
    .select("*")
    .order("id", { ascending: true });

  if (campaignsError) {
    console.error("Error fetching campaigns:", campaignsError);
    return { initialKOLs: [], initialCampaigns: [], initialMessages: [] };
  }

  const { data: initialMessages, error: messagesError } = await supabaseClient
    .from("chatbot_messages")
    .select("*")
    .order("id", { ascending: true });

  if (messagesError) {
    console.error("Error fetching messages:", messagesError);
    return { initialKOLs: [], initialCampaigns: [], initialMessages: [] };
  }

  return {
    initialKOLs: initialKOLs as KOL[],
    initialCampaigns: initialCampaigns as Campaign[],
    initialMessages: initialMessages as ChatbotMessage[],
  };
}
