"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { CartItemComponent } from "./cart-item"
import Link from "next/link"

export function CartDrawer() {
  const { items, total, clearCart } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:text-primary transition-colors">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-black">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-black border-gray-700">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2 text-white">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span>Shopping Cart ({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400" />
                <p className="text-gray-300">Your cart is empty</p>
                <Link href="/products">
                  <Button className="bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border border-gray-600">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-1">
                {items.map((item) => (
                  <CartItemComponent key={item.id} item={item} compact />
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between font-bold text-white">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href="/cart" className="w-full">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border border-gray-600">
                      View Cart
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border border-gray-600">
                    Checkout
                  </Button>
                </div>

                {items.length > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300"
                  >
                    Clear Cart
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
