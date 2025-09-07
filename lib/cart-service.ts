import { Product } from './products'
import { authService } from './auth'

export interface CartItem {
  id: string
  quantity: number
  product: Product
}

export interface CartResponse {
  items: CartItem[]
  total: number
  itemCount: number
}

import { config } from './config'

const API_BASE_URL = config.API_BASE_URL

export const cartService = {
  async getCart(): Promise<CartResponse> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching cart:', error)
      throw error
    }
  },

  async addToCart(productId: string, quantity: number = 1): Promise<void> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  },

  async updateCartItem(cartItemId: string, quantity: number): Promise<void> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update cart item')
      }
    } catch (error) {
      console.error('Error updating cart item:', error)
      throw error
    }
  },

  async removeFromCart(cartItemId: string): Promise<void> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to remove from cart')
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      throw error
    }
  },

  async clearCart(): Promise<void> {
    try {
      const token = authService.getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to clear cart')
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  },
}
