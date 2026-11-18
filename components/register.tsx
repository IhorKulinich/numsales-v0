"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/contexts/user-context"

interface RegisterProps {
  onRegistrationSuccess?: () => void
  onSwitchToLogin?: () => void
  isEmbedded?: boolean
}

export default function Register({ isEmbedded = false, onRegistrationSuccess, onSwitchToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    hearAbout: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { setUser } = useUser()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required"
    if (!formData.lastName.trim()) return "Last name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.password) return "Password is required"
    if (!formData.confirmPassword) return "Please confirm your password"
    if (!formData.hearAbout) return "Please select how you heard about us"
    if (formData.password !== formData.confirmPassword) return "Passwords do not match"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address"

    return ""
  }

  const handleRegister = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      console.log("Sending registration data:", {
        firstname: formData.firstName.trim(),
        secondname: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        heard: formData.hearAbout,
      })

      const res = await fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstName.trim(),
          secondname: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          heard: formData.hearAbout,
        }),
      })

      console.log("Response status:", res.status)

      if (!res.ok) {
        const errorData = await res.json()
        console.error("API Error:", errorData)
        setError(errorData.message || "Registration failed. Please try again.")
        return
      }

      const result = await res.json()
      console.log("Registration result:", result)

      if (!result.success) {
        setError(result.message || "Registration failed. Please try again.")
        return
      }

      // Success: Save user data globally
      setUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        version: "",
      })

      // Success: Call the callback for redirect
      if (onRegistrationSuccess) {
        onRegistrationSuccess()
      }

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        hearAbout: "",
      })
    } catch (error) {
      console.error("Registration error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const content = (
    <>
      <CardHeader className="text-center">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Image src="/logotel.png" alt="Numculator Logo" width={48} height={48} unoptimized />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">Create Account</CardTitle>
        <CardDescription className="text-gray-600">Start your journey with Numculator</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="mt-1"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="mt-1"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="mt-1"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="hearAbout">How did you hear about us? *</Label>
          <Select
            onValueChange={(value) => handleInputChange("hearAbout", value)}
            disabled={isLoading}
            value={formData.hearAbout}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="search">Search Engine</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
              <SelectItem value="referral">Friend/Colleague Referral</SelectItem>
              <SelectItem value="numerology-community">Numerology Community</SelectItem>
              <SelectItem value="advertisement">Advertisement</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          onClick={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          {onSwitchToLogin ? (
            <Button
              variant="link"
              className="p-0 h-auto text-indigo-600 hover:text-indigo-700 font-medium"
              onClick={onSwitchToLogin}
              disabled={isLoading}
            >
              Sign in
            </Button>
          ) : (
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign in
            </Link>
          )}
        </div>

        <div className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-indigo-600 hover:text-indigo-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">
            Privacy Policy
          </Link>
        </div>
      </CardContent>
    </>
  )

  if (isEmbedded) {
    return content
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border-0">{content}</Card>
    </div>
  )
}
