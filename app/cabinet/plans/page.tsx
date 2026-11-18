"use client"

import ProtectedRoute from "@/components/protected-route"
import CabinetHeader from "@/components/cabinet-header"
import AllPlans from "@/components/all-plans"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useUser } from "@/contexts/user-context"

const allPricingTiers = [
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
      "4 calculation tables",
      "3 interactive graphs + combined view",
      "Basic numerological analysis",
      "Current year highlighting",
      "Hover effects and highlighting",
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
      "4 calculation tables",
      "3 interactive graphs + combined view",
      "Basic numerological analysis",
      "Current year highlighting",
      "Hover effects and highlighting",
      "Value interpretations for tables",
      "Graph interpretations",
      "Saved input data",
      "Smart interpretation display",
      "Data management tools",
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

export default function PlansPage() {
  const { user } = useUser()
  const userVersion = user?.version || ""

  // Get current plan features
  const getCurrentPlanFeatures = () => {
    const plan = allPricingTiers.find((tier) => tier.name === userVersion)
    return plan?.features || []
  }

  // Get upgrade pricing tiers based on current version
  const getUpgradeTiers = () => {
    switch (userVersion) {
      case "Light":
        return [
          {
            ...allPricingTiers[1], // Standard
            price: "$20",
            cta: "Upgrade",
          },
          {
            ...allPricingTiers[2], // Pro
            price: "$60",
            cta: "Upgrade",
          },
        ]
      case "Standard":
        return [
          {
            ...allPricingTiers[2], // Pro
            price: "$40",
            cta: "Upgrade",
          },
        ]
      default:
        return allPricingTiers.map((tier) => ({
          ...tier,
          cta: "Choose",
        }))
    }
  }

  const currentPlanFeatures = getCurrentPlanFeatures()
  const upgradeTiers = getUpgradeTiers()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <CabinetHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Your current plan and possible upgrades</h1>
            <p className="text-xl text-gray-600">Manage your subscription, posibilities and upgrade your plan</p>
          </div>

          {/* No tariff plan yet */}
          {!userVersion && (
            <>
              <Card className="w-full bg-white/80 backdrop-blur-sm shadow-lg mb-8">
                <CardContent className="text-center py-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">No tariff plan yet</h2>
                  <p className="text-gray-600">Choose a plan below to get started with Numculator</p>
                </CardContent>
              </Card>
              <AllPlans pricingTiers={upgradeTiers} showLightPlan={true} showHeader={false} />
            </>
          )}

          {/* Light plan user */}
          {userVersion === "Light" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Current plan features - 1/3 width */}
              <div className="lg:col-span-1">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg h-fit">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Your Current Plan: Light</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentPlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Upgrade options - 2/3 width */}
              <div className="lg:col-span-2">
                <AllPlans pricingTiers={upgradeTiers} showLightPlan={false} showHeader={false} />
              </div>
            </div>
          )}

          {/* Standard plan user */}
          {userVersion === "Standard" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Current plan features - 1/2 width */}
              <div>
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg h-fit">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Your Current Plan: Standard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentPlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Upgrade options - 1/2 width */}
              <div>
                <AllPlans pricingTiers={upgradeTiers} showLightPlan={false} showHeader={false} />
              </div>
            </div>
          )}

          {/* Pro plan user */}
          {userVersion === "Pro" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Latest plan message - 1/2 width */}
              <div>
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg h-fit">
                  <CardContent className="text-center py-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">You have the latest plan</h2>
                    <p className="text-gray-600">You're enjoying all the premium features of Numculator Pro</p>
                  </CardContent>
                </Card>
              </div>

              {/* Current plan features - 1/2 width */}
              <div>
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg h-fit">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Your Pro Plan Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {currentPlanFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}
