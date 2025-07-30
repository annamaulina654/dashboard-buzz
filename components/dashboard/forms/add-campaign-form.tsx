"use client";

import type React from "react";
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
import type { Campaign, KOL } from "@/types/dashboard";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AddCampaignFormProps {
  onAdd: (campaign: Omit<Campaign, "id" | "created_at">) => void;
  kols: KOL[];
  onSuccess?: () => void;
  initialData?: Campaign | null;
}

const FormRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  );
};

export function AddCampaignForm({
  onAdd,
  kols,
  onSuccess,
  initialData,
}: AddCampaignFormProps) {
  const [formData, setFormData] = useState(() => {
    const defaultState = {
      name: "",
      description: "",
      budget: 0,
      startDate: "",
      endDate: "",
      status: "draft" as Campaign["status"],
      kols: [] as number[],
      expectedReach: 0,
      actualReach: 0,
      roi: 0,
    };

    if (initialData) {
      return {
        name: initialData.name,
        description: initialData.description,
        budget: initialData.budget,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        status: initialData.status,
        kols: initialData.kols,
        expectedReach: initialData.expectedReach,
        actualReach: initialData.actualReach || 0,
        roi: initialData.roi || 0,
      };
    }
    return defaultState;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onAdd(formData);
    setIsSubmitting(false);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="campaignName" className="dark:text-gray-300 mb-2">
          Campaign Name
        </Label>
        <Input
          id="campaignName"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <Label htmlFor="description" className="dark:text-gray-300 mb-2">
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={3}
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <FormRow>
        <div>
          <Label htmlFor="budget" className="dark:text-gray-300 mb-2">
            Budget ($)
          </Label>
          <Input
            id="budget"
            type="number"
            value={formData.budget}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                budget: Number(e.target.value),
              }))
            }
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="expectedReach" className="dark:text-gray-300 mb-2">
            Expected Reach
          </Label>
          <Input
            id="expectedReach"
            type="number"
            value={formData.expectedReach}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                expectedReach: Number(e.target.value),
              }))
            }
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </FormRow>

      <FormRow>
        <div>
          <Label htmlFor="startDate" className="dark:text-gray-300 mb-2">
            Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, startDate: e.target.value }))
            }
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="endDate" className="dark:text-gray-300 mb-2">
            End Date
          </Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, endDate: e.target.value }))
            }
            required
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </FormRow>

      <div>
        <Label htmlFor="status" className="dark:text-gray-300 mb-2">
          Status
        </Label>
        <Select
          value={formData.status}
          onValueChange={(value: Campaign["status"]) =>
            setFormData((prev) => ({ ...prev, status: value }))
          }
        >
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

      <div>
        <Label className="dark:text-gray-300 mb-2">Assign KOLs</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <span className="truncate">
                {formData.kols.length > 0
                  ? `${formData.kols.length} KOL(s) selected`
                  : "Select KOLs..."}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search KOLs..." />
              <CommandList>
                <CommandEmpty>No KOL found.</CommandEmpty>
                <CommandGroup>
                  {kols.map((kol) => (
                    <CommandItem
                      key={kol.id}
                      value={kol.name}
                      onSelect={() => {
                        const selected = formData.kols.includes(kol.id);
                        setFormData((prev) => ({
                          ...prev,
                          kols: selected
                            ? prev.kols.filter((id) => id !== kol.id)
                            : [...prev.kols, kol.id],
                        }));
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          formData.kols.includes(kol.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {kol.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="pt-2 flex flex-wrap gap-1">
          {kols
            .filter((kol) => formData.kols.includes(kol.id))
            .map((kol) => (
              <Badge
                key={kol.id}
                variant="secondary"
                className="dark:bg-gray-600 dark:text-gray-200"
              >
                {kol.name}
              </Badge>
            ))}
        </div>
      </div>
      {initialData && (
        <>
          <hr className="dark:border-gray-600" />
          <h4 className="font-medium dark:text-gray-200">Performance Data</h4>
          <FormRow>
            <div>
              <Label htmlFor="actualReach" className="dark:text-gray-300 mb-2">
                Actual Reach
              </Label>
              <Input
                id="actualReach"
                type="number"
                value={formData.actualReach || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    actualReach: Number(e.target.value),
                  }))
                }
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="roi" className="dark:text-gray-300 mb-2">
                ROI (x)
              </Label>
              <Input
                id="roi"
                type="number"
                step="0.1"
                value={formData.roi || 0}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    roi: Number(e.target.value),
                  }))
                }
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </FormRow>
        </>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        disabled={isSubmitting}
      >
        {initialData
          ? isSubmitting
            ? "Updating Campaign..."
            : "Update Campaign"
          : isSubmitting
          ? "Creating Campaign..."
          : "Create Campaign"}
      </Button>
    </form>
  );
}
