"use client"

import ProtectedRoute from "@/components/protected-route"
import CabinetHeader from "@/components/cabinet-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, DollarSign, Users, TrendingUp } from "lucide-react"

export default function PartnershipPage() {
  const referralLink = "https://numculator.com/ref/user123"
  const stats = {
    referrals: 12,
    earnings: 245.5,
    conversionRate: 8.5,
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <CabinetHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Partnership Program</h1>
            <p className="text-xl text-gray-600">Earn up to 25% commission by referring new users</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.referrals}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.earnings}</div>
                <p className="text-xs text-muted-foreground">+$45.50 from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Referral Link */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input value={referralLink} readOnly className="flex-1" />
                <Button onClick={() => navigator.clipboard.writeText(referralLink)} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Share this link with potential users. You'll earn 20-25% commission on their purchases.
              </p>
            </CardContent>
          </Card>

          {/* Commission Structure */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Commission Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Light Plan ($19)</span>
                  <span className="text-green-600 font-bold">$3.80 (20%)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Standard Plan ($39)</span>
                  <span className="text-green-600 font-bold">$9.75 (25%)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Pro Plan ($79)</span>
                  <span className="text-green-600 font-bold">$19.75 (25%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
