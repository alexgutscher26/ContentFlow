import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost, BlogGenerationRequest } from '@/lib/openai';

export const dynamic = 'force-dynamic';

/**
 * Handles the POST request to generate a blog post.
 *
 * This function retrieves the request body, validates the required fields, and generates blog content using the OpenAI API via OpenRouter. If any required fields are missing, it returns a 400 error response. In case of an error during the blog generation process, it logs the error and returns a 500 error response with an appropriate message.
 *
 * @param request - The NextRequest object containing the request data.
 * @returns A JSON response indicating success or failure, along with the generated blog post data if successful.
 * @throws Error If an error occurs during the blog generation process.
 */
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