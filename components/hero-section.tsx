import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-black via-gray-900 to-black py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,0,0.1),transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,204,0,0.05),transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 w-fit border border-primary/20">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary drop-shadow-sm" />
                  ))}
                </div>
                <span className="text-sm text-gray-300 font-medium">Trusted by 10,000+ customers</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight">
                <span className="text-white">Discover Amazing Products at </span>
                <span className="text-primary drop-shadow-lg">ShopHub</span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 text-pretty max-w-2xl leading-relaxed">
                Your premium destination for quality products, exceptional service, and unbeatable prices. Shop with
                confidence and enjoy fast, secure delivery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="text-lg px-10 py-4 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25 text-black font-bold"
                >
                  Shop Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-4 bg-transparent border-2 border-primary/50 hover:border-primary hover:bg-primary/10 text-white hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-700/50">
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  50K+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Products</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Support</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  Free
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Shipping</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-right">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-gray-800 to-primary/10 p-8 backdrop-blur-sm border border-primary/20 shadow-2xl">
              <img
                src="/modern-e-commerce-hero-image-with-shopping-bags-an.jpg"
                alt="Shopping experience"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="absolute -top-6 -right-6 bg-white text-black px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-bounce border-2 border-white/20">
              New Arrivals
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse border-2 border-white/20">
              Free Delivery
            </div>

            <div className="absolute top-1/4 -left-4 w-8 h-8 bg-primary/30 rounded-full blur-sm animate-ping"></div>
            <div className="absolute bottom-1/4 -right-4 w-6 h-6 bg-primary/40 rounded-full blur-sm animate-ping delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
