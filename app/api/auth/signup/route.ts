import { NextRequest, NextResponse } from 'next/server';
import { createUser, createOrganization } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName || !body.company) {
      return NextResponse.json(
        { error: 'Missing required fields: email, firstName, lastName, and company are required' },
        { status: 400 }
      );
    }

    console.log('🔐 Creating new user account:', {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      company: body.company,
      hasDatabase: !!process.env.DATABASE_URL
    });

    // Create organization first
    const organization = await createOrganization({
      name: body.company,
      slug: body.company.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    });

    console.log('🏢 Organization created:', organization.id);

    // Create user
    const user = await createUser({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      organizationId: organization.id,
      industry: body.industry,
      jobTitle: body.jobTitle,
      bio: body.bio
    });

    console.log('✅ User created successfully:', user.id);

    return NextResponse.json({
      success: true,
      data: {
        user,
        organization
      }
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to create account',
        success: false 
      },
      { status: 500 }
    );
  }
}