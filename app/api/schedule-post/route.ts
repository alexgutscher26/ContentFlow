import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.content || !body.scheduledFor || !body.userId || !body.organizationId) {
      return NextResponse.json(
        { error: 'Missing required fields: content, scheduledFor, userId, and organizationId are required' },
        { status: 400 }
      );
    }

    console.log('📅 Scheduling post to database:', {
      userId: body.userId,
      organizationId: body.organizationId,
      scheduledFor: body.scheduledFor,
      contentLength: body.content.length,
      hasDatabase: !!process.env.DATABASE_URL
    });

    // Save scheduled post to database
    const post = await createPost({
      userId: body.userId,
      organizationId: body.organizationId,
      content: body.content,
      tone: body.tone || 'professional',
      industry: body.industry || 'Technology',
      status: 'scheduled',
      scheduledFor: new Date(body.scheduledFor),
      aiGenerated: body.aiGenerated || false
    });

    console.log('✅ Post scheduled successfully:', post.id);

    return NextResponse.json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('❌ Schedule post error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to schedule post',
        success: false 
      },
      { status: 500 }
    );
  }
}