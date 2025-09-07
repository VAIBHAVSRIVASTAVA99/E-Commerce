import { NextRequest, NextResponse } from 'next/server';
import { authenticateToken } from '@/lib/auth-middleware';
import { z } from 'zod';
import { userCarts } from '@/lib/cart-storage';

const updateCartSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateToken(request);
    if (!authResult.user || authResult.error) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { quantity } = updateCartSchema.parse(body);
    const cartItemId = params.id;
    const userId = authResult.user.id;

    const cartItems = userCarts.get(userId) || [];
    const itemIndex = cartItems.findIndex(item => item.id === cartItemId);

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    cartItems[itemIndex].quantity = quantity;
    userCarts.set(userId, cartItems);

    return NextResponse.json({
      success: true,
      message: 'Cart item updated successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Update cart item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateToken(request);
    if (!authResult.user || authResult.error) {
      return NextResponse.json(
        { error: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    const cartItemId = params.id;
    const userId = authResult.user.id;

    const cartItems = userCarts.get(userId) || [];
    const filteredItems = cartItems.filter(item => item.id !== cartItemId);
    
    userCarts.set(userId, filteredItems);

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
