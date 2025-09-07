import { Product } from './products';

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    price: 99.99,
    originalPrice: 149.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 324,
    image: "/premium-wireless-bluetooth-headphones.jpg",
    inStock: true,
    tags: ["wireless", "bluetooth", "noise-cancelling"],
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    rating: 4.6,
    reviews: 156,
    image: "/modern-smart-fitness-watch.jpg",
    inStock: true,
    tags: ["fitness", "smartwatch", "gps"],
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    description: "Professional-grade coffee maker with programmable settings",
    price: 79.99,
    originalPrice: 99.99,
    category: "Home & Garden",
    rating: 4.9,
    reviews: 89,
    image: "/premium-coffee-maker-machine.jpg",
    inStock: true,
    tags: ["coffee", "kitchen", "programmable"],
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support and adjustable height",
    price: 299.99,
    originalPrice: 399.99,
    category: "Home & Garden",
    rating: 4.7,
    reviews: 203,
    image: "/ergonomic-office-chair-modern.jpg",
    inStock: true,
    tags: ["office", "ergonomic", "adjustable"],
  },
  {
    id: "5",
    name: "Running Shoes",
    description: "Lightweight running shoes with advanced cushioning technology",
    price: 129.99,
    originalPrice: 159.99,
    category: "Sports",
    rating: 4.5,
    reviews: 412,
    image: "/placeholder.svg?height=300&width=300&text=Running+Shoes",
    inStock: true,
    tags: ["running", "shoes", "lightweight"],
  },
  {
    id: "6",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with active noise cancellation",
    price: 149.99,
    originalPrice: 199.99,
    category: "Electronics",
    rating: 4.4,
    reviews: 267,
    image: "/placeholder.svg?height=300&width=300&text=Wireless+Earbuds",
    inStock: true,
    tags: ["wireless", "earbuds", "noise-cancellation"],
  },
  {
    id: "7",
    name: "Yoga Mat",
    description: "Non-slip yoga mat with extra cushioning for comfort",
    price: 39.99,
    originalPrice: 59.99,
    category: "Sports",
    rating: 4.6,
    reviews: 178,
    image: "/placeholder.svg?height=300&width=300&text=Yoga+Mat",
    inStock: true,
    tags: ["yoga", "fitness", "non-slip"],
  },
  {
    id: "8",
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound quality",
    price: 89.99,
    originalPrice: 119.99,
    category: "Electronics",
    rating: 4.3,
    reviews: 145,
    image: "/placeholder.svg?height=300&width=300&text=Smart+Speaker",
    inStock: false,
    tags: ["smart-home", "voice-control", "speaker"],
  },
  {
    id: "9",
    name: "Designer Handbag",
    description: "Elegant leather handbag with multiple compartments",
    price: 189.99,
    originalPrice: 249.99,
    category: "Fashion",
    rating: 4.7,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300&text=Designer+Handbag",
    inStock: true,
    tags: ["handbag", "leather", "designer"],
  },
  {
    id: "10",
    name: "Gaming Keyboard",
    description: "Mechanical gaming keyboard with RGB backlighting",
    price: 119.99,
    originalPrice: 149.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300&text=Gaming+Keyboard",
    inStock: true,
    tags: ["gaming", "mechanical", "rgb"],
  },
  {
    id: "11",
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt in various colors",
    price: 24.99,
    originalPrice: 34.99,
    category: "Fashion",
    rating: 4.2,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300&text=Casual+T-Shirt",
    inStock: true,
    tags: ["t-shirt", "cotton", "casual"],
  },
  {
    id: "12",
    name: "Plant Pot Set",
    description: "Set of 3 ceramic plant pots with drainage holes",
    price: 49.99,
    originalPrice: 69.99,
    category: "Home & Garden",
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=300&text=Plant+Pot+Set",
    inStock: true,
    tags: ["plants", "ceramic", "garden"],
  }
];


export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All') return mockProducts;
  return mockProducts.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.rating >= 4.7).slice(0, 8);
};

export const getProductsOnSale = (): Product[] => {
  return mockProducts.filter(product => product.originalPrice && product.originalPrice > product.price);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getCategories = (): string[] => {
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));
  return ['All', ...categories.sort()];
};

export default mockProducts;
