import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-black border-t border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,204,0,0.03),transparent_70%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/">
              <h3 className="text-2xl font-bold text-primary cursor-pointer">ShopHub</h3>
            </Link>
            <p className="text-gray-300 text-pretty leading-relaxed">
              Your trusted e-commerce destination for quality products, exceptional service, and unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary transition-all duration-300 text-gray-400">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary transition-all duration-300 text-gray-400">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 hover:text-primary transition-all duration-300 text-gray-400">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-white">Categories</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/products?category=Electronics" className="hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=Fashion" className="hover:text-primary transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=Home%20%26%20Garden" className="hover:text-primary transition-colors">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/products?category=Sports" className="hover:text-primary transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-white">Stay Updated</h4>
            <p className="text-gray-300 text-sm leading-relaxed">Subscribe to get special offers and updates.</p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary" />
              <Button className="bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border border-gray-600">Subscribe</Button>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-3 hover:text-primary transition-colors duration-300">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@shophub.com</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-primary transition-colors duration-300">
                <Phone className="h-4 w-4 text-primary" />
                <span>1-800-SHOPHUB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 <span className="text-primary font-bold">ShopHub</span>. All rights reserved. Built with <span className="text-red-500">❤️</span> for amazing shopping experiences.</p>
        </div>
      </div>
    </footer>
  )
}
