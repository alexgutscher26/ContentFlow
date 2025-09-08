import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Missing required fields: email and password are required' },
        { status: 400 }
      );
    }

    console.log('🔐 Login attempt for:', body.email);

    // Get user from database
    const user = await getUserByEmail(body.email);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // In production, verify password hash here
    // For now, we'll simulate successful authentication

    console.log('✅ Login successful for user:', user.id);

    return NextResponse.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Login failed',
        success: false 
      },
      { status: 500 }
    );
  }
}