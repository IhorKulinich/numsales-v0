"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Register from "@/components/register"
import { useUser } from "@/contexts/user-context"

export default function RegisterPage() {
  const { isAuthenticated, isLoading } = useUser()
  const router = useRouter()

  // Only redirect if already authenticated and not loading
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/cabinet/plans")
    }
  }, [isAuthenticated, isLoading, router])

  const handleRegistrationSuccess = () => {
    // This will be called after successful registration
    router.push("/cabinet/plans")
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If already authenticated, show loading while redirecting
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to your cabinet...</p>
        </div>
      </div>
    )
  }

  return <Register onRegistrationSuccess={handleRegistrationSuccess} />
}
