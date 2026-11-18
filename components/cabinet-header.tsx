"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function CabinetHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const { logout } = useUser()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-100">
              <Image src="/logotel.png" alt="Numculator Logo" width={32} height={32} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Numculator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/cabinet/user-data" className="text-gray-700 hover:text-indigo-600 transition-colors">
              User data
            </Link>
            <Link href="/cabinet/plans" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Plans
            </Link>
            <Link href="/cabinet/saves" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Saves
            </Link>
            <Link href="/cabinet/interpretations" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Interpretations
            </Link>
            <Link href="/cabinet/faq" className="text-gray-700 hover:text-indigo-600 transition-colors">
              FAQ
            </Link>
            <Link href="/cabinet/partnership" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Partnership
            </Link>
            <Link href="/cabinet/docs" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Docs
            </Link>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[120px] bg-transparent border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="uk">Ukrainian</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Go to App
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Logout
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/cabinet/user-data" className="text-lg font-medium">
                  User data
                </Link>
                <Link href="/cabinet/plans" className="text-lg font-medium">
                  Plans
                </Link>
                <Link href="/cabinet/saves" className="text-lg font-medium">
                  Saves
                </Link>
                <Link href="/cabinet/interpretations" className="text-lg font-medium">
                  Interpretations
                </Link>
                <Link href="/cabinet/faq" className="text-lg font-medium">
                  FAQ
                </Link>
                <Link href="/cabinet/partnership" className="text-lg font-medium">
                  Partnership
                </Link>
                <Link href="/cabinet/docs" className="text-lg font-medium">
                  Docs
                </Link>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="uk">Ukrainian</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Go to App
                </Button>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 bg-transparent"
                >
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
