# ShopHub E-commerce

A modern, full-stack e-commerce application built with Next.js 14, featuring JWT authentication, product management, and shopping cart functionality.

## Features

- **Authentication**: JWT-based user registration and login
- **Product Management**: CRUD operations for products with filtering and search
- **Shopping Cart**: Add, update, and remove items from cart
- **Product Filtering**: Filter by category, price range, rating, and stock status
- **Responsive Design**: Modern UI with Tailwind CSS
- **Database**: SQLite database with proper schema
- **API Routes**: RESTful API endpoints for all operations

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite3
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecomm2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_API_URL=
```

4. Initialize the database:
```bash
# Start the development server
npm run dev

# In another terminal, initialize the database
curl -X POST http://localhost:3000/api/init
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/[id]` - Update cart item quantity
- `DELETE /api/cart/[id]` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Categories
- `GET /api/categories` - Get all product categories

## Database Schema

The application uses SQLite with the following tables:

- **users**: User accounts with authentication
- **products**: Product catalog with categories and pricing
- **cart**: Shopping cart items linked to users
- **orders**: Order management (for future use)
- **order_items**: Order line items (for future use)

## Usage

1. **Register/Login**: Create an account or login to access cart functionality
2. **Browse Products**: View products with filtering by category, price, rating
3. **Add to Cart**: Add products to your cart (requires authentication)
4. **Manage Cart**: Update quantities or remove items from cart
5. **Search**: Use the search functionality to find specific products

## Development

### Project Structure
```
ecomm2/
├── app/
│   ├── api/           # API routes
│   ├── cart/          # Cart page
│   ├── products/      # Products page
│   └── ...
├── components/        # React components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and services
└── ...
```

### Key Files
- `lib/database.ts` - Database configuration and initialization
- `lib/auth.ts` - Authentication service
- `lib/products.ts` - Product service
- `lib/cart-service.ts` - Cart service
- `hooks/use-auth.tsx` - Authentication hook
- `hooks/use-cart.tsx` - Cart management hook

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
