"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { productService, filterProducts, type FilterOptions, type Product } from "@/lib/products"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    priceRange: [0, 500],
    minRating: 0,
    inStockOnly: false,
    searchQuery: "",
    sortBy: "name-asc",
  })


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await productService.getProducts({
          category: filters.category !== "All" ? filters.category : "",
          priceRange: filters.priceRange,
          minRating: filters.minRating,
          inStockOnly: filters.inStockOnly,
          searchQuery: filters.searchQuery,
          sortBy: filters.sortBy,
          page: 1,
          limit: 50
        })
        setProducts(response.products || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters])


  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }))
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {

    return products
  }, [products])

  const handleClearFilters = () => {
    setFilters({
      category: "All",
      priceRange: [0, 500],
      minRating: 0,
      inStockOnly: false,
      searchQuery: "",
      sortBy: "name-asc",
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">All Products</h1>
          <p className="text-gray-300 text-lg">Discover our complete collection of premium products</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={handleClearFilters}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
          </div>

          {}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg text-white">Loading products...</div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-red-500">{error}</div>
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                totalProducts={products?.length || 0}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
