import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateToken } from '@/lib/auth-middleware';
import { userCarts } from '@/lib/cart-storage';

const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

const updateCartSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);
    if (!authResult.user || authResult.error) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = authResult.user.id;
    const cartItems = userCarts.get(userId) || [];
    
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return NextResponse.json({
      items: cartItems,
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);
    if (!authResult.user || authResult.error) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity } = addToCartSchema.parse(body);
    const userId = authResult.user.id;

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    const product = await response.json();

    const cartItems = userCarts.get(userId) || [];
    
    const existingItemIndex = cartItems.findIndex(item => item.product.id === productId);
    
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      const cartItem = {
        id: `cart_${Date.now()}_${productId}`,
        product: {
          id: product.id.toString(),
          name: product.title,
          price: product.price,
          image: product.image
        },
        quantity
      };
      cartItems.push(cartItem);
    }

    userCarts.set(userId, cartItems);

    return NextResponse.json({
      success: true,
      message: 'Item added to cart successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateToken(request);
    if (!authResult.user || authResult.error) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = authResult.user.id;
    
    userCarts.set(userId, []);

    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
