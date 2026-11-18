"use client"

import { useState } from "react"
import ProtectedRoute from "@/components/protected-route"
import CabinetHeader from "@/components/cabinet-header"
import UserDataCard from "@/components/user-data-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/user-context"

export default function UserDataPage() {
  const { user } = useUser()
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
    if (success) setSuccess("")
  }

  const validatePasswordForm = () => {
    if (!passwordData.currentPassword.trim()) return "Current password is required"
    if (!passwordData.newPassword.trim()) return "New password is required"
    if (!passwordData.confirmPassword.trim()) return "Please confirm your new password"
    if (passwordData.newPassword !== passwordData.confirmPassword) return "New passwords do not match"
    if (passwordData.newPassword.length < 6) return "New password must be at least 6 characters long"
    if (passwordData.currentPassword === passwordData.newPassword)
      return "New password must be different from current password"
    return ""
  }

  const handlePasswordSubmit = async () => {
    const validationError = validatePasswordForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Simulate API call for password change
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, you would call your password change API here
      console.log("Password change request:", {
        email: user?.email,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      setSuccess("Password changed successfully!")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err) {
      console.error("Password change error:", err)
      setError("Failed to change password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading user data...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <CabinetHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">User Data</h1>
            <p className="text-xl text-gray-600">Manage your account information and security settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column: User Data */}
            <div>
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <UserDataCard
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  version={user.version}
                  isEmbedded
                />
              </Card>
            </div>

            {/* Right Column: Change Password Form */}
            <div>
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                      {success}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="currentPassword" className="text-gray-700">
                      Current Password *
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                      className="mt-1"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <Label htmlFor="newPassword" className="text-gray-700">
                      New Password *
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                      className="mt-1"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm New Password *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                      className="mt-1"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={handlePasswordSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Changing Password..." : "Change Password"}
                  </Button>

                  <div className="text-xs text-gray-500 text-center">
                    Make sure to use a strong password that you haven't used elsewhere.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
