"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import type { KOL, ChatbotMessage } from "@/types/dashboard";
import { AddKOLForm } from "../forms/add-kol-form";
import { KOLDetailView } from "../views/kol-detail-view";
import { KOLCardSkeleton } from "../cards/kol-card-skeleton";

interface KOLManagementTabProps {
  filteredKOLs: KOL[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  selectedKOL: KOL | null;
  setSelectedKOL: (kol: KOL | null) => void;
  addKOL: (kol: Omit<KOL, "id">) => void;
  updateKOL: (id: number, data: Partial<Omit<KOL, "id">>) => Promise<void>;
  deleteKOL: (id: number) => Promise<void>;
  sendChatbotMessage: (
    kolId: number,
    message: string,
    type: ChatbotMessage["type"]
  ) => Promise<void>;
  optimisticKOLs: KOL[];
  isLoading: boolean;
}

export function KOLManagementTab({
  filteredKOLs,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  selectedKOL,
  setSelectedKOL,
  addKOL,
  updateKOL,
  deleteKOL,
  sendChatbotMessage,
  optimisticKOLs,
  isLoading,
}: KOLManagementTabProps) {
  const [isAddKOLDialogOpen, setIsAddKOLDialogOpen] = useState(false);
  const [isEditKOLDialogOpen, setIsEditKOLDialogOpen] = useState(false);
  const [kolToEdit, setKolToEdit] = useState<KOL | null>(null);

  const handleDelete = (id: number) => {
    deleteKOL(id);
  };

  const handleEdit = (kol: KOL) => {
    setKolToEdit(kol);
    setIsEditKOLDialogOpen(true);
  };

  const isTrulyLoading = isLoading || optimisticKOLs.length === 0;

  return (
    <>
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="dark:text-white">KOL Database</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Manage and filter your Key Opinion Leaders
              </CardDescription>
            </div>
            <Dialog
              open={isAddKOLDialogOpen}
              onOpenChange={setIsAddKOLDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full sm:w-auto">
                  <Plus className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Add KOL</span>
                  <span className="sm:hidden">Add New KOL</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">
                    Add New KOL
                  </DialogTitle>
                  <DialogDescription className="dark:text-gray-400">
                    Enter the details of the new Key Opinion Leader
                  </DialogDescription>
                </DialogHeader>
                <AddKOLForm
                  onAdd={addKOL}
                  onSuccess={() => setIsAddKOLDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search KOLs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isTrulyLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <KOLCardSkeleton key={index} />
              ))
            ) : filteredKOLs.length > 0 ? (
              filteredKOLs.map((kol) => (
                <div
                  key={kol.id}
                  className="flex flex-col space-y-4 rounded-lg border p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex flex-row items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={kol.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="dark:bg-gray-600">
                        {kol.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center space-x-2">
                        <h3 className="truncate font-medium dark:text-white">
                          {kol.name}
                        </h3>
                        {kol.verified && (
                          <Badge variant="secondary">Verified</Badge>
                        )}
                      </div>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {kol.username}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div>
                      <p className="font-semibold dark:text-white">
                        {kol.followers}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Followers
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white">
                        {kol.engagement}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Engagement
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white">
                        ${kol.rate}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Rate
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4 dark:border-gray-600">
                    <Badge
                      variant="outline"
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      {kol.category}
                    </Badge>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(kol)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white">
                              Are you sure you want to delete this KOL?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-gray-400">
                              This will permanently delete their data. This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(kol.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedKOL(kol)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
                          <KOLDetailView
                            kol={selectedKOL}
                            onSendMessage={sendChatbotMessage}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
                <p>No KOLs found.</p>
                <p className="text-sm">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Dialog open={isEditKOLDialogOpen} onOpenChange={setIsEditKOLDialogOpen}>
        <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Edit KOL</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Update the details for {kolToEdit?.name}
            </DialogDescription>
          </DialogHeader>
          {kolToEdit && (
            <AddKOLForm
              onAdd={(updatedData) => updateKOL(kolToEdit.id, updatedData)}
              onSuccess={() => setIsEditKOLDialogOpen(false)}
              initialData={kolToEdit}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
