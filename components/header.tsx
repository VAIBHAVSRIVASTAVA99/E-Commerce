"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Menu, X, Search } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { AuthModal } from "@/components/auth-modal"
import { CartDrawer } from "@/components/cart-drawer"

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer">ShopHub</h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <a
                href="#categories"
                onClick={(e) => handleSmoothScroll(e, "categories")}
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Categories
              </a>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, "about")}
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                About
              </a>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart Drawer */}
              <CartDrawer />

              {/* Auth buttons */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" onClick={logout} className="hidden sm:flex bg-transparent">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Button variant="ghost" onClick={() => handleAuthClick("login")}>
                    Login
                  </Button>
                  <Button onClick={() => handleAuthClick("signup")}>Sign Up</Button>
                </div>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/products" className="text-foreground hover:text-primary transition-colors">
                  Products
                </Link>
                <Link href="/cart" className="text-foreground hover:text-primary transition-colors">
                  Cart
                </Link>
                <a
                  href="#categories"
                  onClick={(e) => handleSmoothScroll(e, "categories")}
                  className="text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Categories
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, "about")}
                  className="text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  About
                </a>
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Button variant="ghost" onClick={() => handleAuthClick("login")}>
                      Login
                    </Button>
                    <Button onClick={() => handleAuthClick("signup")}>Sign Up</Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultMode={authMode} />
    </>
  )
}
