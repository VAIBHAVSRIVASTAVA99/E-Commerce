import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Cart from '@/lib/models/Cart';
import { authenticateToken } from '@/lib/auth-middleware';


export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const authResult = await authenticateToken(request);
    if (!authResult.user || authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    const cart = await Cart.findOne({ user: authResult.user.id });
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }


    cart.items = [];
    cart.totalAmount = 0;
    
    await cart.save();

    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
