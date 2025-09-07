"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CartItemComponent } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export default function CartPage() {
  const { items, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Shopping Cart</h1>
          <p className="text-gray-300 text-lg">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.length} item${items.length !== 1 ? "s" : ""} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-semibold mb-4 text-white">Your cart is empty</h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <div className="space-y-4">
              <Link href="/products">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border border-gray-600">Browse Products</Button>
              </Link>
              <div className="text-sm text-gray-300">
                <p>Popular categories:</p>
                <div className="flex justify-center space-x-4 mt-2">
                  <Link href="/products" className="hover:text-primary">
                    Electronics
                  </Link>
                  <Link href="/products" className="hover:text-primary">
                    Fashion
                  </Link>
                  <Link href="/products" className="hover:text-primary">
                    Home & Garden
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          <div className="grid lg:grid-cols-3 gap-8">
            {}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Items in your cart</h2>
                {items.length > 0 && (
                  <Button variant="ghost" onClick={clearCart} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>

              {}
              <div className="pt-6 border-t border-gray-700">
                <Link href="/products">
                  <Button variant="outline" className="bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border border-gray-600">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
