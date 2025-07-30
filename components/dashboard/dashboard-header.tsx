"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DB</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            <span className="hidden sm:inline">Dashboard Buzz</span>
            <span className="sm:hidden">Dashboard</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="dark:text-gray-300 p-2"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="dark:text-white">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="dark:text-gray-400">
                  This action will log you out of your current session. You will
                  need to sign in again to access your dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}
