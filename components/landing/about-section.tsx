import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const highlights = [
  "Founded in 2019, Pre-Seed Stage",
  "Focus on Nano & Micro Influencers",
  "Comprehensive Campaign Management",
]

const benefits = [
  "Minimize human error in campaign management",
  "More organized and efficient workflows",
  "Data-driven decision making",
  "Automated processes for better results",
]

export function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Badge className="mb-4 md:mb-6 bg-pink-100 text-pink-700">About Dashboard Buzz</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
              Empowering Brands Through Nano & Micro Influencer Marketing
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
              Dashboard Buzz is a cutting-edge platform that facilitates brand promotion through strategic nano and micro
              influencer marketing. We empower content creators by providing them with the tools and opportunities to
              monetize their influence effectively.
            </p>
            <div className="space-y-3 md:space-y-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 ${index % 2 === 0 ? "bg-pink-500" : "bg-purple-500"} rounded-full flex-shrink-0`}
                  ></div>
                  <span className="text-sm md:text-base text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Why Choose Dashboard Buzz?</h3>
              <ul className="space-y-2 md:space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm md:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
