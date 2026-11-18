"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"

interface LoginFormContentProps {
  onSignInSuccess?: () => void
  onSwitchToRegister?: () => void
}

export default function LoginFormContent({ onSignInSuccess, onSwitchToRegister }: LoginFormContentProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setUser } = useUser()

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      console.log("Attempting login for:", email.trim().toLowerCase())

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      })

      console.log("Login response status:", res.status)

      const result = await res.json()
      console.log("Login result:", result)

      if (!res.ok || !result.success) {
        setError(result.message || "Login failed. Please check your credentials.")
        return
      }

      // Success: Save user data globally
      if (result.user) {
        setUser({
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
          version: result.user.version || "",
        })
      }

      // Success: Call the callback for redirect
      if (onSignInSuccess) {
        onSignInSuccess()
      }

      // Reset form
      setEmail("")
      setPassword("")
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
        <Image src="/logotel.png" alt="Numculator Logo" width={48} height={48} unoptimized />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back</h2>
      <p className="text-gray-600 text-center mb-6">Sign in to your Numculator&nbsp;account</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">{error}</div>
      )}

      <div className="space-y-4">
        {/* Email */}
        <div>
          <Label htmlFor="login-email" className="text-gray-700">
            Email
          </Label>
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError("")
            }}
            className="mt-1"
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="login-password" className="text-gray-700">
            Password
          </Label>
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (error) setError("")
            }}
            className="mt-1"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center justify-between text-sm mt-4">
        <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-700">
          Forgot password?
        </Link>
      </div>

      {/* Actions */}
      <Button
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 mt-6"
        onClick={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

      <div className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        {onSwitchToRegister ? (
          <Button
            variant="link"
            className="p-0 h-auto text-indigo-600 hover:text-indigo-700 font-medium"
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            Sign up
          </Button>
        ) : (
          <Link href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign up
          </Link>
        )}
      </div>
    </>
  )
}
