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
    if (!product.inStock) return

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
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
          {discountPercentage > 0 && <Badge variant="secondary">-{discountPercentage}%</Badge>}
        </div>

        {/* Wishlist button */}
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-background/80 hover:bg-background">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-balance leading-tight line-clamp-2">{product.name}</h3>

          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <Button className="w-full mt-4" onClick={handleAddToCart} disabled={!product.inStock}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  )
}
