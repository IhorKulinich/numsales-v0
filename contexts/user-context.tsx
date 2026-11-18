"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  firstName: string
  lastName: string
  email: string
  version: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("numculator_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user data:", error)
        localStorage.removeItem("numculator_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Save user data to localStorage whenever user changes
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        localStorage.setItem("numculator_user", JSON.stringify(user))
      } else {
        localStorage.removeItem("numculator_user")
      }
    }
  }, [user, isLoading])

  const logout = () => {
    setUser(null)
    localStorage.removeItem("numculator_user")
    // Redirect to main page
    window.location.href = "/"
  }

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
