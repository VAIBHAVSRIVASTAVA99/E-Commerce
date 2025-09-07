"use client"

import type React from "react"
import { useState, useEffect } from "react"
import NoSSR from "@/components/no-ssr"
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
  const [isMobile, setIsMobile] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container">
          <div className="flex items-center justify-between" style={{ height: '4rem' }}>
            <div className="flex items-center">
              <Link href="/" className="navbar-brand">
                ShopHub
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/products" className="nav-link">
                Products
              </Link>
              <a
                href="#categories"
                onClick={(e) => handleSmoothScroll(e, "categories")}
                className="nav-link"
              >
                Categories
              </a>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, "about")}
                className="nav-link"
              >
                About
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="btn btn-ghost btn-icon hidden sm:flex">
                <Search className="h-5 w-5" />
              </button>

              <CartDrawer />

              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <button className="btn btn-ghost btn-icon">
                    <User className="h-5 w-5" />
                  </button>
                  <button className="btn btn-outline hidden sm:flex" onClick={logout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <button className="btn btn-ghost" onClick={() => handleAuthClick("login")}>
                    Login
                  </button>
                  <button className="btn btn-primary" onClick={() => handleAuthClick("signup")}>
                    Sign Up
                  </button>
                </div>
              )}

              <button
                className="btn btn-ghost btn-icon md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t py-4" style={{ borderColor: 'var(--gray-light)' }}>
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="nav-link">
                  Home
                </Link>
                <Link href="/products" className="nav-link">
                  Products
                </Link>
                <Link href="/cart" className="nav-link">
                  Cart
                </Link>
                <a
                  href="#categories"
                  onClick={(e) => handleSmoothScroll(e, "categories")}
                  className="nav-link"
                >
                  Categories
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, "about")}
                  className="nav-link"
                >
                  About
                </a>
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t" style={{ borderColor: 'var(--gray-light)' }}>
                    <button className="btn btn-ghost" onClick={() => handleAuthClick("login")}>
                      Login
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAuthClick("signup")}>
                      Sign Up
                    </button>
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
