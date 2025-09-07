import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets and tech",
    image: "/modern-electronics.png",
    itemCount: "2,500+ items",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image: "/fashion-clothing-and-accessories.jpg",
    itemCount: "5,000+ items",
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Everything for your home",
    image: "/home-decor-and-garden-items.jpg",
    itemCount: "3,200+ items",
  },
  {
    id: 4,
    name: "Sports",
    description: "Fitness and outdoor gear",
    image: "/sports-equipment-and-fitness-gear.jpg",
    itemCount: "1,800+ items",
  },
]

export function FeaturedCategories() {
  return (
    <section id="categories" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Shop by Category</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${encodeURIComponent(category.name)}`}>
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary font-medium">{category.itemCount}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      Browse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
