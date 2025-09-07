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
    <section id="products" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,204,0,0.03),transparent_70%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-balance text-white">Featured Products</h2>
          <p className="text-xl lg:text-2xl text-gray-300 text-pretty max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium products at unbeatable prices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-primary/50 transform hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge
                  className={`absolute top-4 left-4 font-bold text-xs px-3 py-1 shadow-lg ${
                    product.badge === "Best Seller"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      : product.badge === "New"
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                        : product.badge === "Sale"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  }`}
                >
                  {product.badge}
                </Badge>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <CardContent className="p-6 space-y-4 bg-gradient-to-b from-gray-800/80 to-gray-900/80">
                <h3 className="font-bold text-lg text-balance leading-tight text-white group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-gray-700/50 rounded-full px-2 py-1">
                    <Star className="h-4 w-4 fill-primary text-primary drop-shadow-sm" />
                    <span className="text-sm font-bold ml-1 text-white">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                </div>

                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-black/25 border border-gray-600"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-12 py-4 bg-transparent border-2 border-primary/50 hover:border-primary hover:bg-primary/10 text-white hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
