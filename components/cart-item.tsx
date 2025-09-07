"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem } from "@/hooks/use-cart"
import { useCart } from "@/hooks/use-cart"

interface CartItemProps {
  item: CartItem
  compact?: boolean
}

export function CartItemComponent({ item, compact = false }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-3 py-3">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{item.name}</p>
          <p className="text-sm text-muted-foreground">${item.price}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 bg-transparent"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 bg-transparent"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-balance">{item.name}</h3>
            <p className="text-lg font-bold text-primary">${item.price}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity - 1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-12 text-center">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
