"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"
import { type Product, sortOptions, sortProducts } from "@/lib/products"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[]
  totalProducts: number
  onClearFilters?: () => void
}

export function ProductGrid({ products, totalProducts, onClearFilters }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("name-asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const sortedProducts = sortProducts(products, sortBy)

  return (
    <div className="space-y-6">
      {/* Header with sorting and view options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {products.length} of {totalProducts} products
        </div>

        <div className="flex items-center space-x-4">
          {/* View mode toggle */}
          <div className="flex items-center border rounded-lg p-1">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products grid */}
      {sortedProducts.length > 0 ? (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No products found matching your criteria.</div>
          {onClearFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
