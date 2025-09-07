"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { type AuthState, authService } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      setAuthState({ user, isAuthenticated: true })
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await authService.login(email, password)
      if (user) {
        setAuthState({ user, isAuthenticated: true })
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const user = await authService.signup(email, password, name)
      if (user) {
        setAuthState({ user, isAuthenticated: true })
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    authService.logout()
    setAuthState({ user: null, isAuthenticated: false })
  }

  return <AuthContext.Provider value={{ ...authState, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
