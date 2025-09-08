import { NextRequest, NextResponse } from 'next/server';
import { generateLinkedInPosts, ContentGenerationRequest } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body: ContentGenerationRequest = JSON.parse(rawBody);
    
    // Validate required fields
    if (!body.topic || !body.tone || !body.industry) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, tone, and industry are required' },
        { status: 400 }
      );
    }

    // Generate content using OpenAI via OpenRouter
    const posts = await generateLinkedInPosts(body);

    return NextResponse.json({
      success: true,
      data: posts
    });

  } catch (error) {
    console.error('Content generation error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate content',
        success: false 
      },
      { status: 500 }
    );
  }
}