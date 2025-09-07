"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const featuredProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 324,
    image: "/premium-wireless-bluetooth-headphones.jpg",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 156,
    image: "/modern-smart-fitness-watch.jpg",
    badge: "New",
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 89,
    image: "/premium-coffee-maker-machine.jpg",
    badge: "Sale",
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 203,
    image: "/ergonomic-office-chair-modern.jpg",
    badge: "Popular",
  },
]

export function FeaturedProducts() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
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

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Featured Products</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our handpicked selection of premium products at unbeatable prices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3" variant={product.badge === "Sale" ? "destructive" : "default"}>
                  {product.badge}
                </Badge>
              </div>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-balance leading-tight">{product.name}</h3>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                </div>

                <Button className="w-full" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
