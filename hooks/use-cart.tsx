"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { cartService, CartItem as ServiceCartItem } from "@/lib/cart-service"
import { useAuth } from "./use-auth"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
  loading: boolean
  error: string | null
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()


  const transformCartItems = (serviceItems: ServiceCartItem[]): CartItem[] => {
    return serviceItems.map(item => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      quantity: item.quantity,
    }))
  }


  const loadCart = async () => {
    if (!isAuthenticated) {

      return
    }

    setLoading(true)
    setError(null)
    try {
      const cartData = await cartService.getCart()
      setItems(transformCartItems(cartData.items))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart')
      console.error('Error loading cart:', err)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    loadCart()
  }, [isAuthenticated])

  const addItem = async (newItem: Omit<CartItem, "quantity">) => {
    console.log('Cart addItem called with:', newItem)
    console.log('Current items before adding:', items)
    console.log('Is authenticated:', isAuthenticated)
    
    setLoading(true)
    setError(null)
    try {

      if (!isAuthenticated) {

        const existingItemIndex = items.findIndex(item => item.id === newItem.id)
        console.log('Existing item index:', existingItemIndex)
        
        if (existingItemIndex > -1) {

          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += 1
          console.log('Updated existing item, new items:', updatedItems)
          setItems(updatedItems)
        } else {

          const newItems = [...items, { ...newItem, quantity: 1 }]
          console.log('Adding new item, new items:', newItems)
          setItems(newItems)
        }
      } else {

        await cartService.addToCart(newItem.id, 1)
        await loadCart() // Refresh cart after adding
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart')
      console.error('Error adding to cart:', err)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      if (!isAuthenticated) {

        setItems(prev => prev.filter(item => item.id !== id))
      } else {

        await cartService.removeFromCart(id)
        await loadCart() 
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item from cart')
      console.error('Error removing from cart:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id)
      return
    }

    setLoading(true)
    setError(null)
    try {
      if (!isAuthenticated) {

        setItems(prev => prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        ))
      } else {

        await cartService.updateCartItem(id, quantity)
        await loadCart() 
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item')
      console.error('Error updating cart item:', err)
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    setLoading(true)
    setError(null)
    try {
      if (!isAuthenticated) {

        setItems([])
      } else {

        await cartService.clearCart()
        setItems([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart')
      console.error('Error clearing cart:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshCart = async () => {
    await loadCart()
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        loading,
        error,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
