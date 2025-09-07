import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Product from '@/lib/models/Product';


export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const existingProducts = await Product.countDocuments();
    
    if (existingProducts > 0) {
      return NextResponse.json({
        message: 'Database already initialized with products',
        productCount: existingProducts,
      });
    }

    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling headphones with 30-hour battery life',
        price: 99.99,
        category: 'Electronics',
        rating: 4.8,
        reviews: 324,
        image: '/premium-wireless-bluetooth-headphones.jpg',
        stock: 50,
        featured: true,
        tags: ['wireless', 'bluetooth', 'noise-cancelling'],
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitor and GPS',
        price: 199.99,
        stock: 30,
        featured: false,
        category: 'Electronics',
        rating: 4.6,
        reviews: 156,
        image: '/modern-smart-fitness-watch.jpg',
        tags: ['fitness', 'smartwatch', 'gps'],
      },
      {
        name: 'Premium Coffee Maker',
        description: 'Professional-grade coffee maker with programmable settings',
        price: 79.99,
        stock: 25,
        featured: true,
        category: 'Home & Garden',
        rating: 4.9,
        reviews: 89,
        image: '/premium-coffee-maker-machine.jpg',
        tags: ['coffee', 'kitchen', 'programmable'],
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Comfortable office chair with lumbar support and adjustable height',
        price: 299.99,
        category: 'Home & Garden',
        rating: 4.7,
        reviews: 203,
        image: '/ergonomic-office-chair-modern.jpg',
        stock: 15,
        featured: false,
        tags: ['office', 'ergonomic', 'chair'],
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with advanced cushioning technology',
        price: 129.99,
        category: 'Sports',
        rating: 4.5,
        reviews: 412,
        image: '/placeholder.svg?height=300&width=300&text=Running+Shoes',
        stock: 40,
        featured: true,
        tags: ['running', 'shoes', 'lightweight'],
      },
      {
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with active noise cancellation',
        price: 149.99,
        category: 'Electronics',
        rating: 4.4,
        reviews: 267,
        image: '/placeholder.svg?height=300&width=300&text=Wireless+Earbuds',
        stock: 35,
        featured: false,
        tags: ['wireless', 'earbuds', 'noise-cancellation'],
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with extra cushioning for comfort',
        price: 39.99,
        category: 'Sports',
        rating: 4.6,
        reviews: 178,
        image: '/placeholder.svg?height=300&width=300&text=Yoga+Mat',
        stock: 60,
        featured: false,
        tags: ['yoga', 'fitness', 'non-slip'],
      },
      {
        name: 'Smart Home Speaker',
        description: 'Voice-controlled smart speaker with premium sound quality',
        price: 89.99,
        category: 'Electronics',
        rating: 4.3,
        reviews: 145,
        image: '/placeholder.svg?height=300&width=300&text=Smart+Speaker',
        stock: 0,
        featured: false,
        tags: ['smart-home', 'voice-control', 'speaker'],
      },
      {
        name: 'Designer Handbag',
        description: 'Elegant leather handbag with multiple compartments',
        price: 189.99,
        stock: 30,
        featured: false,
        category: 'Fashion',
        rating: 4.7,
        reviews: 92,
        image: '/placeholder.svg?height=300&width=300&text=Designer+Handbag',
        tags: ['handbag', 'leather', 'designer'],
      },
      {
        name: 'Gaming Keyboard',
        description: 'Mechanical gaming keyboard with RGB backlighting',
        price: 119.99,
        category: 'Electronics',
        rating: 4.8,
        reviews: 234,
        image: '/placeholder.svg?height=300&width=300&text=Gaming+Keyboard',
        stock: 20,
        featured: true,
        tags: ['gaming', 'mechanical', 'rgb'],
      },
      {
        name: 'Casual T-Shirt',
        description: 'Comfortable cotton t-shirt in various colors',
        price: 24.99,
        category: 'Fashion',
        rating: 4.2,
        reviews: 156,
        image: '/placeholder.svg?height=300&width=300&text=Casual+T-Shirt',
        stock: 100,
        featured: false,
        tags: ['t-shirt', 'cotton', 'casual'],
      },
      {
        name: 'Plant Pot Set',
        description: 'Set of 3 ceramic plant pots with drainage holes',
        price: 49.99,
        category: 'Home & Garden',
        rating: 4.5,
        reviews: 78,
        image: '/placeholder.svg?height=300&width=300&text=Plant+Pot+Set',
        stock: 45,
        featured: false,
        tags: ['plants', 'ceramic', 'garden'],
      }
    ];

    await Product.insertMany(products);

    return NextResponse.json({
      message: 'Database initialized and seeded successfully',
      productCount: products.length,
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}
