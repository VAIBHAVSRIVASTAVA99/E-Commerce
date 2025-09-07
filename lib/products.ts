export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  rating: number
  reviews: number
  image: string
  inStock: boolean
  tags: string[]
}

export interface ProductsResponse {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface FilterOptions {
  category: string
  priceRange: [number, number]
  minRating: number
  inStockOnly: boolean
  searchQuery: string
  sortBy: string
  page?: number
  limit?: number
}

import { config } from './config'

const API_BASE_URL = config.API_BASE_URL

export const productService = {
  async getProducts(filters: FilterOptions): Promise<ProductsResponse> {
    try {
      const params = new URLSearchParams()
      
      if (filters.category) params.append('category', filters.category)
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange[0].toString())
        params.append('maxPrice', filters.priceRange[1].toString())
      }
      if (filters.minRating) params.append('minRating', filters.minRating.toString())
      if (filters.inStockOnly) params.append('inStockOnly', 'true')
      if (filters.searchQuery) params.append('search', filters.searchQuery)
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.limit) params.append('limit', filters.limit.toString())

      const response = await fetch(`${API_BASE_URL}/api/products?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async getProduct(id: string): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch product')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      const data = await response.json()
      return data.categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      return ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports'] // fallback
    }
  }
}

export const categories = ["All", "Electronics", "Fashion", "Home & Garden", "Sports"]

export const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "reviews-desc", label: "Most Reviews" },
]


export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  if (!products || !Array.isArray(products)) {
    return [];
  }
  return products.filter((product) => {

    if (filters.category !== "All" && product.category !== filters.category) {
      return false
    }


    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }


    if (product.rating < filters.minRating) {
      return false
    }


    if (filters.inStockOnly && !product.inStock) {
      return false
    }


    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchableText = `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase()
      if (!searchableText.includes(query)) {
        return false
      }
    }

    return true
  })
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  if (!products || !Array.isArray(products)) {
    return [];
  }
  const sorted = [...products]

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price)
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "reviews-desc":
      return sorted.sort((a, b) => b.reviews - a.reviews)
    default:
      return sorted
  }
}
