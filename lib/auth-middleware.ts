import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from './models/User';
import connectDB from './database';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

export async function authenticateToken(req: NextRequest): Promise<{ user?: AuthenticatedUser; error?: string }> {
  try {
    await connectDB();
    
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return { error: 'Access token required' };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return { error: 'Invalid token' };
    }

    return { 
      user: { 
        id: user._id.toString(), 
        email: user.email, 
        role: user.role 
      } 
    };
  } catch (error) {
    return { error: 'Invalid or expired token' };
  }
}

export function requireAdmin(user?: AuthenticatedUser): boolean {
  return user?.role === 'admin';
}

export function withAuth(handler: (request: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const authResult = await authenticateToken(request);
    
    if (!authResult.user || authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    return handler(request, authResult.user);
  };
}
