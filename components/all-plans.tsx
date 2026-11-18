import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

// Define the type for a single pricing tier
interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  popular: boolean
}

// Define the props for the AllPlans component
interface AllPlansProps {
  pricingTiers: PricingTier[]
  showLightPlan?: boolean
  showHeader?: boolean // New prop to control header visibility
}

export default function AllPlans({ pricingTiers, showLightPlan = true, showHeader = true }: AllPlansProps) {
  // Filter pricing tiers based on showLightPlan prop
  const filteredPricingTiers = showLightPlan ? pricingTiers : pricingTiers.filter((tier) => tier.name !== "Light")

  // Determine grid columns based on number of tiers
  const getGridCols = () => {
    switch (filteredPricingTiers.length) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 md:grid-cols-2"
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
  }

  return (
    <section id="pricing">
      <div className="container mx-auto">
        {showHeader && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Choose the Right Plan</h2>
            <p className="text-xl text-gray-600">Start with our free trial, upgrade as your practice grows</p>
          </div>
        )}

        <div className={`grid ${getGridCols()} gap-8 max-w-6xl mx-auto`}>
          {filteredPricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                tier.popular
                  ? "ring-2 ring-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50"
                  : "bg-white/80 backdrop-blur-sm"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-800">{tier.name}</CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-800">{tier.price}</span>
                  <span className="text-gray-600">{tier.period}</span>
                </div>
                <CardDescription className="text-gray-600">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/payment?tariff=${tier.name}`} className="w-full">
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        : "bg-gray-800 hover:bg-gray-900"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
