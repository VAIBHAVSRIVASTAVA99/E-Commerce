"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export function CartSummary() {
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const { total, items, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08 // 8% tax
  const finalTotal = total + shipping + tax - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(total * 0.1)
      toast({
        title: "Promo code applied!",
        description: "You saved 10% on your order.",
      })
    } else if (promoCode.toLowerCase() === "freeship") {
      setDiscount(shipping)
      toast({
        title: "Free shipping applied!",
        description: "Shipping cost has been removed.",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to checkout.",
        variant: "destructive",
      })
      return
    }

    // Simulate checkout process
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })
    clearCart()
  }

  if (items.length === 0) {
    return null
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo Code */}
        <div className="space-y-2">
          <Label htmlFor="promo">Promo Code</Label>
          <div className="flex space-x-2">
            <Input
              id="promo"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="outline" onClick={handleApplyPromo}>
              Apply
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Try "SAVE10" for 10% off or "FREESHIP" for free shipping</p>
        </div>

        <Separator />

        {/* Order Details */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({items.length} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-primary">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button className="w-full" size="lg" onClick={handleCheckout}>
          {isAuthenticated ? "Proceed to Checkout" : "Sign In to Checkout"}
        </Button>

        {/* Security Info */}
        <div className="text-xs text-muted-foreground text-center">
          <p>🔒 Secure checkout with SSL encryption</p>
          <p>Free returns within 30 days</p>
        </div>
      </CardContent>
    </Card>
  )
}
