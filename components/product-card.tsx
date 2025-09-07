"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden h-full flex flex-col bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-primary/50 transform hover:-translate-y-2">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
          {discountPercentage > 0 && <Badge className="bg-red-600 text-white hover:bg-red-700">-{discountPercentage}%</Badge>}
        </div>

        {/* Wishlist Button */}
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black hover:text-black">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col bg-gradient-to-b from-gray-800/80 to-gray-900/80">
        <div className="flex-1 space-y-2">
          <h3 className="font-bold text-lg text-balance leading-tight line-clamp-2 text-white group-hover:text-primary transition-colors duration-300">{product.name}</h3>

          <p className="text-sm text-gray-300 line-clamp-2">{product.description}</p>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-400">({product.reviews})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <Button className="w-full mt-4 bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-black/25 border border-gray-600" onClick={handleAddToCart} disabled={!product.inStock}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  )
}
