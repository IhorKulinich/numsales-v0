"use client"

import { useState } from "react"
import { Play, Check, Star, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image" // Import Image component
import AllPlans from "@/components/all-plans" // Import the new AllPlans component

export default function NumerologyLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const features = [
    {
      icon: "🎯",
      title: "Calculation Accuracy",
      description: "Our algorithms account for dozens of nuances for the most precise results",
    },
    {
      icon: "⚡",
      title: "Interface Usability",
      description: "Interactive tables and graphs that respond to your actions, simplifying analysis",
    },
    {
      icon: "⏱️",
      title: "Time Saving",
      description: "All calculations completed in split seconds, without manual work",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Enter Data",
      description: "Input name, birth date, phone number or car details",
      image: "/images/enter-data.png", // Swapped image
      alt: "Person interacting with data on a laptop", // Swapped alt text
      width: 200, // Consistent size
      height: 150, // Consistent size
    },
    {
      number: "02",
      title: "Get Calculations",
      description: "Instantly receive tables, graphs and detailed analysis",
      image: "/images/get-calculations.png", // Swapped image
      alt: "Person receiving calculations on a screen", // Swapped alt text
      width: 200, // Consistent size
      height: 150, // Consistent size
    },
    {
      number: "03",
      title: "Download Report",
      description: "Export data to PDF or PNG format for clients",
      image: "/images/download-report.png", // Placeholder for PDF download
      alt: "Person signing a document, representing report download",
      width: 200, // Consistent size
      height: 150, // Consistent size
    },
  ]

  const targetAudience = [
    {
      icon: "🔮",
      title: "Numerologists",
      description: "Automate routine calculations and focus on consultations",
    },
    {
      icon: "⭐",
      title: "Astrologers",
      description: "Integrate numerology calculations into your astrological work",
    },
    {
      icon: "🎓",
      title: "Numerology Schools",
      description: "Use the service to teach students practical numerology",
    },
  ]

  const pricingTiers = [
    {
      name: "Light",
      price: "$19",
      period: "/lifetime access",
      description: "Perfect for getting started",
      features: [
        "4 calculation tables",
        "3 interactive graphs + combined view",
        "Basic numerological analysis",
        "Current year highlighting",
        "Hover effects and highlighting",
      ],
      cta: "Choose",
      popular: false,
    },
    {
      name: "Standard",
      price: "$39",
      period: "/lifetime access",
      description: "Most popular for professionals",
      features: [
        "Everything in Light",
        "Value interpretations for tables",
        "Graph interpretations",
        "Saved input data",
        "Smart interpretation display",
        "Data management tools",
      ],
      cta: "Choose",
      popular: true,
    },
    {
      name: "Pro",
      price: "$79",
      period: "/lifetime access",
      description: "Complete professional solution",
      features: [
        "Everything in Standard",
        "Custom interpretation editing",
        "Document generation & download",
        "PNG/PDF export for tables & graphs",
        "Predictive date selection",
        "Priority support",
      ],
      cta: "Choose",
      popular: false,
    },
  ]

  const reviews = [
    {
      name: "Sarah Chen",
      role: "Professional Numerologist",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "This service has transformed my practice. What used to take hours now takes minutes, and my clients love the professional reports.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Astrology & Numerology Teacher",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "I use this with all my students. The interactive features help them understand numerology concepts much faster.",
    },
    {
      name: "Elena Volkov",
      role: "Spiritual Consultant",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "The customizable interpretations are perfect for my practice. I can adapt everything to match my consultation style.",
    },
  ]

  const faqs = [
    {
      question: "How do I start using the service?",
      answer:
        "Simply sign up for a free trial, and you'll have immediate access to all Light tier features. No credit card required for the trial period.",
    },
    {
      question: "Is there a free version?",
      answer:
        "We offer a 14-day free trial that includes full access to the Light tier features. After the trial, you can choose the plan that best fits your needs.",
    },
    {
      question: "How do I change interpretations?",
      answer:
        "In the Pro tier, you can edit any interpretation by clicking the edit button next to it. Your custom interpretations are automatically saved and will appear in future calculations.",
    },
    {
      question: "Can I download calculations in PDF?",
      answer:
        "Yes! Standard and Pro tiers include PDF export functionality. You can download individual tables, graphs, or complete consultation reports.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team through the chat widget, email us directly, or use the contact form. Pro users receive priority support with faster response times.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-100">
                <Image src="/logotel.png" alt="Numculator Logo" width={32} height={32} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Numculator
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#video" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Video Review
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Pricing
              </a>
              <a href="#better" className="text-gray-700 hover:text-indigo-600 transition-colors">
                We Better
              </a>
              <a href="#usage" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Usage
              </a>
              <a href="#partnership" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Partnership
              </a>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[120px] bg-transparent border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="uk">Ukrainian</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Login
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <a href="#video" className="text-lg font-medium">
                    Video Review
                  </a>
                  <a href="#pricing" className="text-lg font-medium">
                    Pricing
                  </a>
                  <a href="#better" className="text-lg font-medium">
                    We Better
                  </a>
                  <a href="#usage" className="text-lg font-medium">
                    Usage
                  </a>
                  <a href="#partnership" className="text-lg font-medium">
                    Partnership
                  </a>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="uk">Ukrainian</SelectItem>
                      <SelectItem value="ru">Russian</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">Login</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="video" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent leading-tight">
              Automate Numerology Calculations in Seconds
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Fast, accurate and convenient - a service for professional numerologists
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 text-left">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-gray-700">Automatic calculation of key numbers</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Interactive graphs and forecasts</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-gray-700">Saving and downloading reports</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Full customization for your needs</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12"></div>

            {/* Video/Demo Placeholder */}
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg opacity-90">Interactive Service Demo</p>
                  <p className="text-sm opacity-70">See how numerologists save hours of work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="features" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Why Choose Our Service?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for professional numerologists who demand accuracy, speed, and flexibility
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">How Does It Work?</h2>
            <p className="text-xl text-gray-600">Three simple steps to professional numerology analysis</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8 flex justify-center">
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.alt}
                    width={step.width}
                    height={step.height}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Who Is Our Service Suitable For?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudience.map((audience, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{audience.icon}</div>
                  <CardTitle className="text-lg text-gray-800">{audience.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{audience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <AllPlans pricingTiers={pricingTiers} showLightPlan={true} />

      {/* Comparison with Alternatives */}
      <section id="better" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              How Are We Better Than Other Services?
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-indigo-600">Our Service</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Deep calculations with dozens of nuances</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Interactive tables and dynamic graphs</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Customizable interpretations</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Professional document generation</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Built for professional numerologists</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-600">Alternatives</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Basic calculations only</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Static reports without interactivity</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Fixed interpretations</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Manual Excel work required</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-5 h-5 text-red-500 mr-3" />
                    <span>Not designed for professionals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="usage" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              How Does the Service Help in Your Work?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the key opportunities our service creates for different types of numerology professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Experienced Numerologist Case */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-600">Experienced Numerologist</CardTitle>
                <CardDescription className="text-gray-600">Consultation Preparation Acceleration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Transform consultation preparation from hours to minutes. Focus on client interaction and
                  interpretation rather than manual calculations.
                </p>
                <Accordion type="single" collapsible>
                  <AccordionItem value="numerologist-details" className="border-0">
                    <AccordionTrigger className="text-indigo-600 hover:no-underline text-sm font-medium">
                      Read More
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-sm pt-2">
                      <div className="space-y-3">
                        <p>• Generate comprehensive client reports in under 15 minutes instead of 2-3 hours</p>
                        <p>• Access all calculation tables and interactive graphs in one place</p>
                        <p>• Save client data for future sessions and quick reference</p>
                        <p>• Export professional PDF reports to share with clients</p>
                        <p>• Customize interpretations to match your consultation style</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Astrologer Case */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-600">Professional Astrologer</CardTitle>
                <CardDescription className="text-gray-600">Integrated Practice Enhancement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Seamlessly integrate numerology into astrological readings. Provide clients with comprehensive
                  spiritual guidance combining both practices.
                </p>
                <Accordion type="single" collapsible>
                  <AccordionItem value="astrologer-details" className="border-0">
                    <AccordionTrigger className="text-indigo-600 hover:no-underline text-sm font-medium">
                      Read More
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-sm pt-2">
                      <div className="space-y-3">
                        <p>• Complement natal chart readings with numerological insights</p>
                        <p>• Cross-reference astrological transits with numerological cycles</p>
                        <p>• Offer more comprehensive consultation packages</p>
                        <p>• Use predictive date selection alongside astrological timing</p>
                        <p>• Create unified reports combining both disciplines</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* School Case */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-600">Numerology School</CardTitle>
                <CardDescription className="text-gray-600">Enhanced Teaching Tool</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Accelerate student learning with interactive demonstrations. Show real-time calculations and pattern
                  recognition to improve comprehension.
                </p>
                <Accordion type="single" collapsible>
                  <AccordionItem value="school-details" className="border-0">
                    <AccordionTrigger className="text-indigo-600 hover:no-underline text-sm font-medium">
                      Read More
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-sm pt-2">
                      <div className="space-y-3">
                        <p>• Demonstrate calculations instantly during lectures</p>
                        <p>• Use interactive graphs to show life pattern changes</p>
                        <p>• Let students practice with real data without manual work</p>
                        <p>• Create standardized teaching materials and examples</p>
                        <p>• Provide students with professional-grade tools for practice</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">What Do Users Say About Us?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Answers to Popular Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white/80 backdrop-blur-sm rounded-lg px-6 border-0 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Get News and Updates</h2>
            <p className="text-xl text-gray-600 mb-8">
              Stay up to date with new features and promotions. Get useful materials on numerology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Subscribe
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-4">We don't spam. You can unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Affiliate Program */}
      <section id="partnership" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Become Our Partner</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recommend our service and earn generous bonuses for each new client you bring
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {/* Column 1: Partnership Benefits (25%) */}
            <div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">💰</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Earn Up to 20-25% Commission</h3>
                    <p className="text-gray-600">Get bonuses for each new client you refer</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Easy to Share</h3>
                    <p className="text-gray-600">Simple referral links and marketing materials</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Real-time Tracking</h3>
                    <p className="text-gray-600">Monitor your referrals and earnings dashboard</p>
                  </div>
                </div>
              </div>
              {/* Removed "Let's Start" button */}
            </div>

            {/* Column 2: Step 1: Register (25%) */}
            <div className="text-center flex flex-col items-center">
              <div className="relative mb-4 w-full">
                {" "}
                {/* Added w-full here to ensure container expands */}
                <Image
                  src="/images/register.png"
                  alt="Online Registration"
                  className="rounded-lg shadow-md w-full h-auto" // Updated classes
                />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">Register</h4>
              <p className="text-gray-600 text-sm">Sign up for our affiliate program</p>
            </div>

            {/* Column 3: Step 2: Share (25%) */}
            <div className="text-center flex flex-col items-center">
              <div className="relative mb-4 w-full">
                {" "}
                {/* Added w-full here to ensure container expands */}
                <Image
                  src="/images/share.png"
                  alt="Share with your network"
                  className="rounded-lg shadow-md w-full h-auto" // Updated classes
                />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">Share</h4>
              <p className="text-gray-600 text-sm">Recommend to your network</p>
            </div>

            {/* Column 4: Step 3: Earn (25%) */}
            <div className="text-center flex flex-col items-center">
              <div className="relative mb-4 w-full">
                {" "}
                {/* Added w-full here to ensure container expands */}
                <Image
                  src="/images/earn.png"
                  alt="Earn commissions"
                  className="rounded-lg shadow-md w-full h-auto" // Updated classes
                />
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">Earn</h4>
              <p className="text-gray-600 text-sm">Get paid for every conversion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-4">Contacts</h3>
              <div className="space-y-2 text-gray-300">
                <p>support@numculator.com.ua</p>
                <p>telegram: +1 (234) 567-890</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-300">
                <Link href="#video">Video Review</Link>
                <Link href="#pricing">Pricing</Link>
                <Link href="#better">We Better</Link>
                <Link href="#usage">Usage</Link>
                <Link href="#partnership">Partnership</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
