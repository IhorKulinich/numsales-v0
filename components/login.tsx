"use client"
import { Card } from "@/components/ui/card"
import LoginFormContent from "./login-form-content"

interface LoginProps {
  /**
   * Optional callback fired after a successful “Sign In”.
   * Used by the payment page to mark the login step as complete.
   */
  onSignInSuccess?: () => void
  /**
   * Optional callback fired when a user clicks “Sign up”.
   * Lets the parent switch from login → registration view.
   */
  onSwitchToRegister?: () => void
  /**
   * Optional flag to determine if the login form is embedded.
   */
  isEmbedded?: boolean
}

export default function Login({ isEmbedded = false, onSignInSuccess, onSwitchToRegister }: LoginProps) {
  if (isEmbedded) {
    return <LoginFormContent onSignInSuccess={onSignInSuccess} onSwitchToRegister={onSwitchToRegister} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border-0 p-6">
        <LoginFormContent onSignInSuccess={onSignInSuccess} onSwitchToRegister={onSwitchToRegister} />
      </Card>
    </div>
  )
}
