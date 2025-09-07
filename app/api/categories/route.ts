import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Product from '@/lib/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await Product.distinct('category');
    
    const allCategories = ['All', ...categories.sort()];

    return NextResponse.json(allCategories);
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
