import { NextRequest, NextResponse } from 'next/server';
import { improveContent } from '@/lib/openai';

export const dynamic = 'force-dynamic';

/**
 * Handles a POST request to improve content based on provided parameters.
 *
 * The function retrieves the raw body from the request, parses it to extract the content and improvements,
 * and checks for their presence. If both fields are provided, it calls the improveContent function to
 * process the content and returns the improved result. In case of errors, it logs the error and returns
 * an appropriate error response.
 *
 * @param request - The NextRequest object containing the request data.
 * @returns A JSON response indicating success or failure, along with the improved content or error message.
 * @throws Error If there is an issue with parsing the request or improving the content.
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const { content, improvements } = JSON.parse(rawBody);
    
    if (!content || !improvements) {
      return NextResponse.json(
        { error: 'Missing required fields: content and improvements are required' },
        { status: 400 }
      );
    }

    const improvedContent = await improveContent(content, improvements);

    return NextResponse.json({
      success: true,
      data: improvedContent
    });

  } catch (error) {
    console.error('Content improvement error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to improve content',
        success: false 
      },
      { status: 500 }
    );
  }
}