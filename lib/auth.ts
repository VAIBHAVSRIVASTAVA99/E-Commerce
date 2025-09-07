export interface User {
  id: string
  email: string
  name: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock user storage (in a real app, this would be a database)
const users: (User & { password: string })[] = []

export const authService = {
  async login(email: string, password: string): Promise<User | null> {
    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))
      return userWithoutPassword
    }
    return null
  },

  async signup(email: string, password: string, name: string): Promise<User | null> {
    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
    }

    users.push(newUser)
    const { password: _, ...userWithoutPassword } = newUser
    localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))
    return userWithoutPassword
  },

  logout(): void {
    localStorage.removeItem("auth_user")
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem("auth_user")
    return stored ? JSON.parse(stored) : null
  },
}
