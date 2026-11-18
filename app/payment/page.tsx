"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, X, Menu } from "lucide-react"
import Image from "next/image"
import Login from "@/components/login" // Import the refactored Login component
import Register from "@/components/register" // Import the refactored Register component
import UserDataCard from "@/components/user-data-card" // Import the new UserDataCard
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useUser } from "@/contexts/user-context"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isAuthenticated, setUser } = useUser()
  const initialTariff = searchParams.get("tariff") || "Pro"

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showPaymentIframe, setShowPaymentIframe] = useState(false)
  const [selectedTariffName, setSelectedTariffName] = useState(initialTariff)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isRegistrationDone, setIsRegistrationDone] = useState(false) // State to track if registration/login is completed
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", version: "" }) // State to store user data including version
  const [isUpdatingTariff, setIsUpdatingTariff] = useState(false) // State to track tariff update loading

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

  const selectedTariff = pricingTiers.find((tier) => tier.name === selectedTariffName) || pricingTiers[2]

  // Determine the number of completed steps for the progress bar fill
  const completedStepsCount = showPaymentIframe ? 3 : isRegistrationDone ? 2 : 1

  // Determine the currently active step for highlighting and checkmarks
  const activeStep = showPaymentIframe ? 3 : isRegistrationDone ? 3 : 2 // If registration is done, active step is payment. Otherwise, registration.

  const progressSteps = [
    { name: "Select a tariff", step: 1 },
    { name: "Registration", step: 2 },
    { name: "Payment", step: 3 },
  ]

  const handleRegistrationSuccess = (data: { firstName: string; lastName: string; email: string }) => {
    setUserData({ ...data, version: "" }) // Registration users start with empty version
    setIsRegistrationDone(true)
  }

  const handleSignInSuccess = (data: { firstName: string; lastName: string; email: string; version?: string }) => {
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      version: data.version || "",
    }) // Login users get their version from database
    setIsRegistrationDone(true)
  }

  const handleTariffPurchase = async (paymentMethod: string) => {
    const userEmail = isAuthenticated && user ? user.email : userData.email
    const selectedTariff = selectedTariffName

    if (!userEmail || !selectedTariff) {
      console.error("Missing user email or selected tariff")
      return
    }

    setIsUpdatingTariff(true)

    try {
      console.log("Updating tariff:", { email: userEmail, tariff: selectedTariff })

      const res = await fetch("/api/update-tariff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          tariff: selectedTariff,
        }),
      })

      console.log("Update tariff response status:", res.status)

      const result = await res.json()
      console.log("Update tariff result:", result)

      if (!res.ok || !result.success) {
        console.error("Failed to update tariff:", result.message)
        return
      }

      // Success: Update user data
      if (result.user) {
        if (isAuthenticated && user) {
          // Update global user context for authenticated users
          setUser({
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            email: result.user.email,
            version: result.user.version,
          })
        } else {
          // Update local userData for registration flow
          setUserData({
            firstName: result.user.firstName,
            lastName: result.user.lastName,
            email: result.user.email,
            version: result.user.version,
          })
        }
      }

      // Show payment iframe (simulate payment process)
      setShowPaymentIframe(true)
    } catch (error) {
      console.error("Tariff update error:", error)
    } finally {
      setIsUpdatingTariff(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header Menu Line */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src="/logotel.png" alt="Numculator Logo" width={32} height={32} unoptimized />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Numculator
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Main page
              </Link>
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
                  <Link href="/" className="text-lg font-medium">
                    Main page
                  </Link>
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Header */}
      <div className="bg-white/80 backdrop-blur-md py-6 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Finish registration of access to the service
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Only one step left — access is activated immediately after payment.
          </p>
          {/* Dynamic Progress Bar */}
          <div className="flex justify-center items-center space-x-2 md:space-x-4 text-sm md:text-base">
            {progressSteps.map((stepItem, index) => (
              <>
                <div
                  key={stepItem.name}
                  className={`flex items-center space-x-2 transition-colors duration-300 ${
                    stepItem.step === activeStep ? "text-indigo-600 font-bold" : "text-gray-600 opacity-70"
                  }`}
                >
                  {stepItem.step < activeStep && <Check className="w-4 h-4 text-green-500" />}
                  <span>{stepItem.name}</span>
                </div>
                {index < progressSteps.length - 1 && (
                  <span className="text-indigo-400 transition-colors duration-300">→</span>
                )}
              </>
            ))}
          </div>
          <div className="w-full max-w-4xl mx-auto mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out progress-bar-animated"
              style={{ width: `${(completedStepsCount / progressSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Grid */}
      <main className="flex-1 container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Column 1: User Data Card or Registration/Login Form */}
        <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-0 p-6">
          {isAuthenticated && user ? (
            <UserDataCard
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              version={user.version}
              isEmbedded
            />
          ) : isRegistrationDone ? (
            <UserDataCard
              firstName={userData.firstName}
              lastName={userData.lastName}
              email={userData.email}
              version={userData.version}
              isEmbedded
            />
          ) : !showLoginForm ? (
            <Register
              isEmbedded
              onRegistrationSuccess={handleRegistrationSuccess}
              onSwitchToLogin={() => setShowLoginForm(true)}
            />
          ) : (
            <Login
              isEmbedded
              onSignInSuccess={handleSignInSuccess}
              onSwitchToRegister={() => setShowLoginForm(false)}
            />
          )}
        </Card>

        {/* Column 2: Tariff Information and Warnings */}
        <div className="space-y-8">
          <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-0 p-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mt-2">
                <Select value={selectedTariffName} onValueChange={setSelectedTariffName}>
                  <SelectTrigger className="w-full bg-transparent border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                    <SelectValue placeholder="Select another tariff" />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingTiers.map((tier) => (
                      <SelectItem key={tier.name} value={tier.name}>
                        <span className="font-bold">{tier.name}</span> tariff
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold text-gray-800">{selectedTariff.price}</span>
                <span className="text-gray-600">{selectedTariff.period}</span>
              </div>
              <ul className="space-y-2">
                {selectedTariff.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700 text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Warnings */}
          <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-0 p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-800">Important to know before paying:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 text-sm">
              <div className="flex items-start">
                <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-1" />
                <span>
                  This product is a digital product. According to the legislation of Ukraine and the rules of the
                  service, refunds after payment are not possible.
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                <span>You can always increase the tariff, but you cannot decrease it.</span>
              </div>
              <div className="flex items-start">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                <span>The choice of tariff affects the available functions within your personal account.</span>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="agreeTerms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                />
                <Label htmlFor="agreeTerms" className="text-gray-700 text-sm cursor-pointer">
                  I have read the terms and conditions and confirm the purchase of the digital product
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 3: Promo, Payment */}
        <div className="space-y-8">
          {!showPaymentIframe ? (
            <>
              {/* Promo Code */}
              <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-0 p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-800">Have a promo code?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input type="text" placeholder="Enter promo code" className="w-full" />
                </CardContent>
              </Card>

              {/* Select Payment Method */}
              <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-0 p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-800">Select payment method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-6 text-lg"
                    disabled={!agreedToTerms || (!isAuthenticated && !isRegistrationDone) || isUpdatingTariff}
                    onClick={() => handleTariffPurchase("LiqPay")}
                  >
                    {isUpdatingTariff ? "Processing..." : "Pay via LiqPay"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Cards of Ukrainian banks are supported. Cards from other countries may not work.
                  </p>

                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-6 text-lg"
                    disabled={!agreedToTerms || (!isAuthenticated && !isRegistrationDone) || isUpdatingTariff}
                    onClick={() => handleTariffPurchase("PayPal")}
                  >
                    {isUpdatingTariff ? "Processing..." : "Pay via PayPal"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Suitable for all countries. Accepts any cards and PayPal accounts.
                  </p>
                </CardContent>
              </Card>
            </>
          ) : (
            // Payment Iframe Placeholder with redirect
            <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-0 p-6 min-h-[400px] flex items-center justify-center">
              <div className="text-center text-gray-600">
                <p className="text-lg font-semibold mb-4">Payment Gateway Loading...</p>
                <p>A payment iframe (LiqPay or PayPal) would appear here.</p>
                <p className="text-sm mt-2">For demonstration purposes, this is a placeholder.</p>
                <p className="text-sm mt-2 font-medium text-green-600">
                  User tariff updated to: {userData.version || user?.version}
                </p>
                <div className="flex space-x-4 mt-6">
                  <Button onClick={() => setShowPaymentIframe(false)}>Go Back</Button>
                  <Button onClick={() => router.push("/cabinet/plans")} className="bg-green-600 hover:bg-green-700">
                    Complete & Go to Plans
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
