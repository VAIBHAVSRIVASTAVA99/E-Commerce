"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { categories, type FilterOptions } from "@/lib/products"

interface ProductFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onClearFilters: () => void
  isOpen: boolean
  onToggle: () => void
}

export function ProductFilters({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange)

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const handlePriceRangeChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]])
    updateFilter("priceRange", [value[0], value[1]])
  }

  const activeFiltersCount = [
    filters.category !== "All",
    filters.priceRange[0] > 0 || filters.priceRange[1] < 500,
    filters.minRating > 0,
    filters.inStockOnly,
    filters.searchQuery.length > 0,
  ].filter(Boolean).length

  return (
    <div className="space-y-4">
      {}
      <div className="lg:hidden">
        <Button variant="outline" onClick={onToggle} className="w-full justify-between bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border border-gray-600">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
          </div>
        </Button>
      </div>

      {}
      <div className={`space-y-6 ${!isOpen ? "hidden lg:block" : ""}`}>
        {}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Search</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={(e) => updateFilter("searchQuery", e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary"
            />
          </CardContent>
        </Card>

        {}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="px-2">
              <Slider
                value={localPriceRange}
                onValueChange={handlePriceRangeChange}
                max={500}
                min={0}
                step={10}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span>${localPriceRange[0]}</span>
              <span>${localPriceRange[1]}</span>
            </div>
          </CardContent>
        </Card>

        {}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Minimum Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={filters.minRating.toString()}
              onValueChange={(value) => updateFilter("minRating", Number.parseFloat(value))}
            >
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="0" className="text-white hover:bg-gray-700">Any Rating</SelectItem>
                <SelectItem value="3" className="text-white hover:bg-gray-700">3+ Stars</SelectItem>
                <SelectItem value="4" className="text-white hover:bg-gray-700">4+ Stars</SelectItem>
                <SelectItem value="4.5" className="text-white hover:bg-gray-700">4.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => updateFilter("inStockOnly", checked)}
              />
              <Label htmlFor="inStock" className="text-white">In Stock Only</Label>
            </div>
          </CardContent>
        </Card>

        {}
        {activeFiltersCount > 0 && (
          <Button variant="outline" onClick={onClearFilters} className="w-full bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border border-gray-600">
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  )
}
