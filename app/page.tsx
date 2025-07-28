import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, MessageSquare, BarChart3, Shield, Zap, ArrowRight, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DB</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Buzz
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-pink-600 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-pink-600 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-pink-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth buttons - responsive */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" className="text-pink-600 hover:text-pink-700">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
            Empower your brand with our comprehensive KOL management platform. Filter influencers effectively, calculate
            ROI projections, and automate timeline reminders - all in one place.
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

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Powerful Features for Modern Marketing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your KOL campaigns efficiently and maximize your ROI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-pink-100 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-pink-900">Effective KOL Filtering</CardTitle>
                <CardDescription>
                  Advanced filtering system to find the perfect influencers for your campaigns based on audience,
                  engagement, and authenticity.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-900">ROI Projection Calculator</CardTitle>
                <CardDescription>
                  Calculate potential returns on your marketing investments with our intelligent projection algorithms.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-pink-100 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-pink-900">Automated Chatbot</CardTitle>
                <CardDescription>
                  Send automated timeline reminders and project updates to KOLs, reducing manual work and human error.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-900">CRM Integration</CardTitle>
                <CardDescription>
                  Comprehensive CRM features to manage relationships, track communications, and monitor campaign
                  progress.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-pink-100 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-pink-900">Follower Verification</CardTitle>
                <CardDescription>
                  Verify authentic followers and detect fake engagement to ensure your campaigns reach real audiences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-900">Real-time Analytics</CardTitle>
                <CardDescription>
                  Monitor campaign performance in real-time with detailed analytics and actionable insights.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 md:mb-6 bg-pink-100 text-pink-700">About Dashboard Buzz</Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                Empowering Brands Through Nano & Micro Influencer Marketing
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                Dashboard Buzz is a cutting-edge platform that facilitates brand promotion through strategic nano and
                micro influencer marketing. We empower content creators by providing them with the tools and
                opportunities to monetize their influence effectively.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm md:text-base text-gray-700">Founded in 2019, Pre-Seed Stage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm md:text-base text-gray-700">Focus on Nano & Micro Influencers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm md:text-base text-gray-700">Comprehensive Campaign Management</span>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Why Choose Dashboard Buzz?</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-center space-x-3">
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm md:text-base">Minimize human error in campaign management</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm md:text-base">More organized and efficient workflows</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm md:text-base">Data-driven decision making</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm md:text-base">Automated processes for better results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Transform Your KOL Management?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of brands already using Dashboard Buzz to streamline their influencer marketing campaigns.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8 py-3"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DB</span>
                </div>
                <span className="text-xl font-bold">Dashboard Buzz</span>
              </div>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                Empowering brands through strategic nano and micro influencer marketing.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm md:text-base">
                <p>Founder: Dayang Melati</p>
                <p>Email: dayang.dashboard@gmail.com</p>
                <p>Website: https://dashboardbuzz.id</p>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Company Info</h3>
              <div className="space-y-2 text-gray-400 text-sm md:text-base">
                <p>Stage: Pre-Seed</p>
                <p>Founded: 2019</p>
                <p>Industry: Advertising & Marketing</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 Dashboard Buzz. All rights reserved. Built for IDCamp 2024 Challenge.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
