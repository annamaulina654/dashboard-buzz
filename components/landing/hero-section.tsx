import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto text-center">
        <Badge className="mb-4 md:mb-6 bg-pink-100 text-pink-700 hover:bg-pink-200 text-xs md:text-sm">
          🚀 Nano & Micro Influencer Platform
        </Badge>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Streamline Your KOL
          <br />
          Management Process
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
          Empower your brand with our comprehensive KOL management platform.
          Filter influencers effectively, calculate ROI projections, and
          automate timeline reminders - all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          <Link href="/register">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-base md:text-lg px-6 md:px-8 py-3"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 border-pink-200 hover:bg-pink-50 bg-transparent"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
