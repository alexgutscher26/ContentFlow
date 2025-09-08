import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost, BlogGenerationRequest } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body: BlogGenerationRequest = JSON.parse(rawBody);
    
    // Validate required fields
    if (!body.topic || !body.tone || !body.industry || !body.title) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, tone, industry, and title are required' },
        { status: 400 }
      );
    }

    // Generate blog content using OpenAI via OpenRouter
    const blogPost = await generateBlogPost(body);

    return NextResponse.json({
      success: true,
      data: [blogPost] // Return as array to match existing interface
    });

  } catch (error) {
    console.error('Blog generation error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate blog post',
        success: false 
      },
      { status: 500 }
    );
  }
}