export interface User {
  id: string
  email: string
  name: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

import { config } from './config'

const API_BASE_URL = config.API_BASE_URL

export const authService = {
  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Login failed')
      }

      const data = await response.json()
      

      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("auth_user", JSON.stringify(data.user))
      
      return data.user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  async signup(email: string, password: string, name: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Registration failed')
      }

      const data = await response.json()
      

      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("auth_user", JSON.stringify(data.user))
      
      return data.user
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  },

  logout(): void {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    try {
      const stored = localStorage.getItem("auth_user")
      if (!stored || stored === "undefined" || stored === "null") {
        return null
      }
      return JSON.parse(stored)
    } catch (error) {
      console.error('Error parsing stored user data:', error)
      // Clear invalid data
      localStorage.removeItem("auth_user")
      localStorage.removeItem("auth_token")
      return null
    }
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("auth_token")
  },

  async verifyToken(): Promise<boolean> {
    const token = this.getToken()
    if (!token) return false

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      return response.ok
    } catch {
      return false
    }
  },
}
