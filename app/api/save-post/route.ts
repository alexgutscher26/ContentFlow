import { NextRequest, NextResponse } from 'next/server';
import { createPost } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.content || !body.tone || !body.industry || !body.userId || !body.organizationId) {
      return NextResponse.json(
        { error: 'Missing required fields: content, tone, industry, userId, and organizationId are required' },
        { status: 400 }
      );
    }

    console.log('💾 Saving post to database:', {
      userId: body.userId,
      organizationId: body.organizationId,
      contentLength: body.content.length,
      tone: body.tone,
      industry: body.industry,
      hasDatabase: !!process.env.DATABASE_URL
    });

    // Save post to database
    const post = await createPost({
      userId: body.userId,
      organizationId: body.organizationId,
      content: body.content,
      tone: body.tone,
      industry: body.industry,
      status: body.status || 'draft',
      scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : undefined,
      templateId: body.templateId,
      aiGenerated: body.aiGenerated || true
    });

    console.log('✅ Post saved successfully:', post.id);

    return NextResponse.json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('❌ Save post error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to save post',
        success: false 
      },
      { status: 500 }
    );
  }
}