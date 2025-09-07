"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { products, filterProducts, type FilterOptions } from "@/lib/products"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    priceRange: [0, 500],
    minRating: 0,
    inStockOnly: false,
    searchQuery: "",
  })

  // Set initial category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }))
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters)
  }, [filters])

  const handleClearFilters = () => {
    setFilters({
      category: "All",
      priceRange: [0, 500],
      minRating: 0,
      inStockOnly: false,
      searchQuery: "",
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground text-lg">Discover our complete collection of premium products</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
          </div>

          {/* Products grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              totalProducts={products.length}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
