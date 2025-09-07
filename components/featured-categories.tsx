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
    <section
      id="categories"
      className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,204,0,0.05),transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,204,0,0.03),transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-balance text-white">Shop by Category</h2>
          <p className="text-xl lg:text-2xl text-gray-300 text-pretty max-w-3xl mx-auto leading-relaxed">
            Explore our wide range of categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${encodeURIComponent(category.name)}`}>
              <Card className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden h-full bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-primary/50 transform hover:-translate-y-3">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {category.name}
                  </div>
                </div>

                <CardContent className="p-6 bg-gradient-to-b from-gray-800/80 to-gray-900/80 space-y-4">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{category.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                    <span className="text-sm text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
                      {category.itemCount}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary group-hover:text-black font-bold transition-all duration-300 transform group-hover:scale-105 text-white hover:text-black"
                    >
                      Browse →
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
