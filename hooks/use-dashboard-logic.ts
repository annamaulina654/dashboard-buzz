/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useEffect, useTransition } from "react";
import type {
  KOL,
  Campaign,
  ChatbotMessage,
  Template,
} from "@/types/dashboard";
import { supabaseClient } from "@/lib/supabase-client";
import { toast } from "sonner";

interface UseDashboardLogicProps {
  optimisticCampaigns: Campaign[];
  chatbotMessages: ChatbotMessage[];
  searchQuery: string;
  categoryFilter: string;
  roiCalculation: {
    budget: number;
    reach: number;
    conversionRate: number;
    result: number;
  };
  setRoiCalculation: (calculation: any) => void;
  addOptimisticCampaign: (campaign: Campaign) => void;
  setKols: (kols: KOL[] | ((prev: KOL[]) => KOL[])) => void;
  setCampaigns: (
    campaigns: Campaign[] | ((prev: Campaign[]) => Campaign[])
  ) => void;
  setChatbotMessages: (
    messages: ChatbotMessage[] | ((prev: ChatbotMessage[]) => ChatbotMessage[])
  ) => void;
  setTemplates: (
    templates: Template[] | ((prev: Template[]) => Template[])
  ) => void;

  currentKOLs: KOL[];
}

export function useDashboardLogic({
  optimisticCampaigns,
  chatbotMessages,
  searchQuery,
  categoryFilter,
  roiCalculation,
  setRoiCalculation,
  addOptimisticCampaign,
  setKols,
  setCampaigns,
  setChatbotMessages,
  setTemplates,
  currentKOLs,
}: UseDashboardLogicProps) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const channel = supabaseClient
      .channel("kols_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "kols" },
        (payload) => {
          console.log("Change received!", payload);
          supabaseClient
            .from("kols")
            .select("*")
            .order("id", { ascending: true })
            .then(({ data, error }) => {
              if (error) {
                console.error("Error re-fetching KOLs:", error);
              } else if (data) {
                setKols(data as KOL[]);
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [setKols]);

  const filteredKOLs = useMemo(() => {
    return currentKOLs.filter((kol) => {
      const matchesSearch =
        kol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kol.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" ||
        kol.category.toLowerCase() === categoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [currentKOLs, searchQuery, categoryFilter]);

  const dashboardStats = useMemo(() => {
    const kolsBulanLalu = 4;
    const kolsSekarang = currentKOLs.length;

    const persentasePerubahanKOL =
      ((kolsSekarang - kolsBulanLalu) / kolsBulanLalu) * 100;

    return {
      totalKOLs: kolsSekarang,
      totalKOLsChange: `${
        persentasePerubahanKOL >= 0 ? "+" : ""
      }${persentasePerubahanKOL.toFixed(0)}% from last month`,
      activeCampaigns: 1,
      activeCampaignsChange: "+1 new this week",
      totalROI: 0,
      totalROIChange: "+0% from last month",
      avgEngagement: 0.1,
      avgEngagementChange: "+0.1% from last month",
    };
  }, [currentKOLs, optimisticCampaigns]);

  const calculateROI = () => {
    const { budget, reach, conversionRate } = roiCalculation;
    if (budget > 0 && reach > 0 && conversionRate > 0) {
      const conversions = (reach * conversionRate) / 100;
      const revenue = conversions * 50;
      const roi = ((revenue - budget) / budget) * 100;
      setRoiCalculation((prev: any) => ({ ...prev, result: roi }));
    }
  };

  const addKOL = async (newKOL: Omit<KOL, "id">) => {
    const { data, error } = await supabaseClient
      .from("kols")
      .insert({
        ...newKOL,
        avatar: newKOL.avatar || "/placeholder.svg?height=40&width=40",
      })
      .select();

    if (error) {
      console.error("Error adding KOL:", error);
      toast.error("Failed to add KOL.", { description: error.message });
    } else if (data && data.length > 0) {
      const addedKOL = data[0] as KOL;
      setKols((prevKols) => [...prevKols, addedKOL]);
      toast.success("KOL successfully added!");
    }
  };

  const deleteKOL = async (kolId: number) => {
    const { error } = await supabaseClient
      .from("kols")
      .delete()
      .eq("id", kolId);

    if (error) {
      console.error("Error deleting KOL:", error);
      toast.error("Failed to delete KOL.", { description: error.message });
    } else {
      setKols((prevKols) => prevKols.filter((kol) => kol.id !== kolId));
      toast.success("KOL successfully deleted.");
    }
  };

  const updateKOL = async (
    kolId: number,
    updatedData: Partial<Omit<KOL, "id">>
  ) => {
    const { data, error } = await supabaseClient
      .from("kols")
      .update(updatedData)
      .eq("id", kolId)
      .select();

    if (error) {
      console.error("Error updating KOL:", error);
      toast.error("Failed to update KOL.", { description: error.message });
    } else if (data) {
      setKols((prevKols) =>
        prevKols.map((kol) => (kol.id === kolId ? { ...kol, ...data[0] } : kol))
      );
      toast.success("KOL successfully updated!");
    }
  };

  const addCampaign = async (newCampaign: Omit<Campaign, "id">) => {
    const optimisticCampaign: Campaign = {
      ...newCampaign,
      id: Date.now(),
      actualReach: 0,
      roi: 0,
      status: newCampaign.status || "draft",
    };

    startTransition(() => {
      addOptimisticCampaign(optimisticCampaign);
    });

    const { data, error } = await supabaseClient
      .from("campaigns")
      .insert(newCampaign)
      .select()
      .single();

    if (error) {
      console.error("Error adding campaign:", error);
      toast.error("Failed to add campaign.", { description: error.message });
    } else if (data) {
      setCampaigns((prevCampaigns) => [...prevCampaigns, data as Campaign]);
      toast.success("Campaign successfully added!");
    }
  };

  const updateCampaign = async (
    campaignId: number,
    updatedData: Partial<Omit<Campaign, "id">>
  ) => {
    const { data, error } = await supabaseClient
      .from("campaigns")
      .update(updatedData)
      .eq("id", campaignId)
      .select()
      .single();

    if (error) {
      console.error("Error updating campaign:", error);
      toast.error("Failed to update campaign.", { description: error.message });
    } else if (data) {
      setCampaigns((prev) =>
        prev.map((campaign) => (campaign.id === campaignId ? data : campaign))
      );
      toast.success("Campaign successfully updated!");
    }
  };

  const deleteCampaign = async (campaignId: number) => {
    const { error } = await supabaseClient
      .from("campaigns")
      .delete()
      .eq("id", campaignId);

    if (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Failed to delete campaign.", { description: error.message });
    } else {
      setCampaigns((prev) =>
        prev.filter((campaign) => campaign.id !== campaignId)
      );
      toast.success("Campaign successfully deleted!");
    }
  };

  const sendChatbotMessage = async (
    kolId: number,
    message: string,
    type: ChatbotMessage["type"]
  ) => {
    const newMessage: Omit<ChatbotMessage, "id"> = {
      kolId,
      message,
      type,
      scheduledDate: new Date().toISOString().split("T")[0],
      sent: true,
    };

    const { data, error } = await supabaseClient
      .from("chatbot_messages")
      .insert(newMessage)
      .select();

    if (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.", { description: error.message });
    } else if (data && data.length > 0) {
      setChatbotMessages((prev) => [...prev, data[0] as ChatbotMessage]);
      toast.success("Message sent successfully!");
    }
  };

  const addTemplate = async (
    newTemplateData: Omit<Template, "id" | "created_at">
  ) => {
    const { data, error } = await supabaseClient
      .from("message_templates")
      .insert(newTemplateData)
      .select()
      .single();
    if (error) {
      console.error("Error adding template:", error);
      toast.error("Failed to add template.", { description: error.message });
    } else if (data) {
      setTemplates((prev) => [...prev, data]);
      toast.success("Template successfully added!");
    }
  };

  const updateTemplate = async (
    templateId: number,
    updatedData: Partial<Omit<Template, "id" | "created_at">>
  ) => {
    const { data, error } = await supabaseClient
      .from("message_templates")
      .update(updatedData)
      .eq("id", templateId)
      .select()
      .single();
    if (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template.", { description: error.message });
    } else if (data) {
      setTemplates((prev) => prev.map((t) => (t.id === templateId ? data : t)));
      toast.success("Template successfully updated!");
    }
  };

  const deleteTemplate = async (templateId: number) => {
    const { error } = await supabaseClient
      .from("message_templates")
      .delete()
      .eq("id", templateId);
    if (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template.", { description: error.message });
    } else {
      setTemplates((prev) => prev.filter((t) => t.id !== templateId));
      toast.success("Template successfully deleted!");
    }
  };

  return {
    filteredKOLs,
    dashboardStats,
    calculateROI,
    addKOL,
    deleteKOL,
    updateKOL,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    sendChatbotMessage,
    addTemplate,
    updateTemplate,
    deleteTemplate,
  };
}
