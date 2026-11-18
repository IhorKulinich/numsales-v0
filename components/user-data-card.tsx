"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserDataCardProps {
  firstName: string
  lastName: string
  email: string
  version?: string // Optional: Represents the user's current tariff/plan
  onChooseTariff?: () => void // Optional callback for "Choose Tariff" button
  onGoToApp?: () => void // Optional callback for "Go to App" button
  isEmbedded?: boolean // New prop to control wrapping
}

export default function UserDataCard({
  firstName,
  lastName,
  email,
  version,
  onChooseTariff,
  onGoToApp,
  isEmbedded = false, // Default to false (renders its own card)
}: UserDataCardProps) {
  const content = (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">User Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* First Name */}
        <div>
          <Label className="text-gray-700">First Name</Label>
          <div className="mt-1 p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800">{firstName}</div>
        </div>

        {/* Last Name */}
        <div>
          <Label className="text-gray-700">Last Name</Label>
          <div className="mt-1 p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800">{lastName}</div>
        </div>

        {/* Email */}
        <div>
          <Label className="text-gray-700">Email</Label>
          <div className="mt-1 p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800">{email}</div>
        </div>

        {/* Version (Tariff) */}
        <div>
          <Label className="text-gray-700">Version</Label>
          <div className="mt-1 p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800">
            {version || "N/A"} {/* Display "N/A" if version is empty */}
          </div>
        </div>

        {/* Optional Buttons */}
        <div className="space-y-4 mt-6">
          {onChooseTariff && (
            <Button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={onChooseTariff}
            >
              Choose Tariff
            </Button>
          )}

          {version &&
            onGoToApp && ( // Only show "Go to App" if version is not empty
              <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white" onClick={onGoToApp}>
                Go to App
              </Button>
            )}
        </div>
      </CardContent>
    </>
  )

  if (isEmbedded) {
    return content
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border-0 p-6">{content}</Card>
    </div>
  )
}
