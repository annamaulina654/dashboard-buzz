import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, MessageSquare, BarChart3, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Effective KOL Filtering",
    description:
      "Advanced filtering system to find the perfect influencers for your campaigns based on audience, engagement, and authenticity.",
    color: "pink",
  },
  {
    icon: Target,
    title: "ROI Projection Calculator",
    description:
      "Calculate potential returns on your marketing investments with our intelligent projection algorithms.",
    color: "purple",
  },
  {
    icon: MessageSquare,
    title: "Automated Chatbot",
    description: "Send automated timeline reminders and project updates to KOLs, reducing manual work and human error.",
    color: "pink",
  },
  {
    icon: BarChart3,
    title: "CRM Integration",
    description:
      "Comprehensive CRM features to manage relationships, track communications, and monitor campaign progress.",
    color: "purple",
  },
  {
    icon: Shield,
    title: "Follower Verification",
    description: "Verify authentic followers and detect fake engagement to ensure your campaigns reach real audiences.",
    color: "pink",
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "Monitor campaign performance in real-time with detailed analytics and actionable insights.",
    color: "purple",
  },
]

export function FeaturesSection() {
  const colorClasses = {
    pink: {
      border: "border-pink-100 hover:border-pink-200",
      bg: "bg-pink-100",
      text: "text-pink-600",
      title: "text-pink-900",
    },
    purple: {
      border: "border-purple-100 hover:border-purple-200",
      bg: "bg-purple-100",
      text: "text-purple-600",
      title: "text-purple-900",
    },
  }
  
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Powerful Features for Modern Marketing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your KOL campaigns efficiently and maximize your ROI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses]
            
            return (
              <Card
                key={index}
                className={`${colors.border} transition-colors`}
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <CardTitle className={colors.title}>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
