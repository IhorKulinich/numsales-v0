import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/contexts/user-context"

// Use the variable-font files (1 request each, always present in Next.js)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Numculator - Professional Numerology Calculator",
  description:
    "Automate numerology calculations in seconds. Fast, accurate and convenient service for professional numerologists.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
