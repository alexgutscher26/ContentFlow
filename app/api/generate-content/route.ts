import { NextRequest, NextResponse } from 'next/server';
import { generateLinkedInPosts, ContentGenerationRequest } from '@/lib/openai';

export const dynamic = 'force-dynamic';

/**
 * Handles the POST request for content generation.
 *
 * This function processes the incoming request by extracting the raw body, parsing it into a ContentGenerationRequest object, and validating the required fields: topic, tone, and industry. If validation passes, it generates content using the generateLinkedInPosts function and returns the generated posts. In case of errors, it logs the error and returns a JSON response with an appropriate error message.
 *
 * @param request - The NextRequest object containing the request data.
 * @returns A JSON response indicating success or failure, along with the generated content or error message.
 * @throws Error If there is an issue with content generation or parsing the request body.
 */
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