import { NextRequest, NextResponse } from 'next/server';
import { improveContent } from '@/lib/openai';

export const dynamic = 'force-dynamic';

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