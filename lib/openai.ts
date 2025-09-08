import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://contentflow.app',
    'X-Title': 'ContentFlow'
  }
});

export interface ContentGenerationRequest {
  topic: string;
  tone: 'professional' | 'storytelling' | 'casual' | 'thought-leader';
  industry: string;
  additionalContext?: string;
}

export interface BlogGenerationRequest {
  topic: string;
  title: string;
  tone: 'professional' | 'storytelling' | 'casual' | 'thought-leader';
  industry: string;
  targetAudience?: string;
  keyPoints?: string;
}

export async function generateLinkedInPosts(request: ContentGenerationRequest): Promise<string[]> {
  const { topic, tone, industry, additionalContext } = request;

  const toneInstructions = {
    professional: 'Write in a professional, authoritative tone. Use clear, concise language and focus on expertise and credibility.',
    storytelling: 'Use narrative storytelling with personal anecdotes, emotional connections, and a clear beginning, middle, and end.',
    casual: 'Write in a conversational, approachable tone. Use simple language and relate to everyday experiences.',
    'thought-leader': 'Position as an industry expert sharing insights, predictions, and strategic thinking. Use data and forward-looking perspectives.'
  };

  const systemPrompt = `You are an expert LinkedIn content creator specializing in ${industry}. Create engaging, high-quality LinkedIn posts that drive engagement and establish thought leadership.

Guidelines:
- Write posts optimized for LinkedIn's algorithm and audience
- Include relevant hashtags (5-10 maximum)
- Use emojis strategically for visual appeal
- Structure content with clear sections and bullet points when appropriate
- Aim for 1,300-3,000 characters for optimal engagement
- Include a call-to-action that encourages comments and discussion
- Make content valuable, actionable, and shareable
- ${toneInstructions[tone]}

Industry context: ${industry}
Topic focus: ${topic}
${additionalContext ? `Additional context: ${additionalContext}` : ''}

Create 3 different variations of LinkedIn posts about this topic, each with a unique angle and approach.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Generate 3 LinkedIn posts about "${topic}" for the ${industry} industry using a ${tone} tone. Each post should be unique and offer different perspectives or approaches to the topic.`
        }
      ],
      temperature: 0.8,
      max_tokens: 4000
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated from OpenAI');
    }

    // Split the response into individual posts
    // Look for common separators like "Post 1:", "---", or numbered sections
    const posts = content
      .split(/(?:Post \d+:|---|\d+\.|#{2,})/i)
      .filter(post => post.trim().length > 100)
      .map(post => post.trim())
      .slice(0, 3); // Ensure we only return 3 posts

    // If splitting didn't work well, return the full content as a single post and generate 2 more
    if (posts.length < 2) {
      const additionalPosts = await generateAdditionalPosts(request, content);
      return [content.trim(), ...additionalPosts];
    }

    return posts;
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
}

async function generateAdditionalPosts(request: ContentGenerationRequest, existingPost: string): Promise<string[]> {
  const { topic, tone, industry } = request;
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert LinkedIn content creator. Generate 2 additional unique LinkedIn posts about "${topic}" for the ${industry} industry using a ${tone} tone. Make sure each post offers a completely different angle or perspective from this existing post: "${existingPost.substring(0, 500)}..."`
        },
        {
          role: 'user',
          content: `Create 2 more LinkedIn posts about "${topic}" that are completely different from the existing post. Use different angles, examples, and approaches while maintaining the ${tone} tone for the ${industry} industry.`
        }
      ],
      temperature: 0.9,
      max_tokens: 3000
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return [];
    }

    const posts = content
      .split(/(?:Post \d+:|---|\d+\.|#{2,})/i)
      .filter(post => post.trim().length > 100)
      .map(post => post.trim())
      .slice(0, 2);

    return posts.length > 0 ? posts : [content.trim()];
  } catch (error) {
    console.error('Error generating additional posts:', error);
    return [];
  }
}

export async function generateBlogPost(request: BlogGenerationRequest): Promise<string> {
  const { topic, title, tone, industry, targetAudience, keyPoints } = request;

  const toneInstructions = {
    professional: 'Write in a professional, authoritative tone with expertise and credibility. Use industry terminology appropriately and maintain formal structure.',
    storytelling: 'Use narrative storytelling with personal anecdotes, case studies, and emotional connections. Structure with clear story arcs.',
    casual: 'Write in a conversational, approachable tone. Use simple language, relate to everyday experiences, and include personal touches.',
    'thought-leader': 'Position as an industry expert sharing insights, predictions, and strategic thinking. Use data, research, and forward-looking perspectives.'
  };

  const systemPrompt = `You are an expert content writer specializing in ${industry} industry blog content. Create a comprehensive, high-quality blog post that is exactly 3,000 words in length.

CRITICAL REQUIREMENTS:
- The blog post MUST be exactly 3,000 words (±50 words acceptable)
- Use proper markdown formatting with headers (##, ###)
- Include engaging introduction (200-300 words)
- Create 4-6 main sections with detailed content (2,400-2,500 words total)
- Write compelling conclusion with call-to-action (200-300 words)
- Use varied sentence lengths and paragraph structures
- Include relevant examples, statistics, or case studies
- Ensure smooth transitions between sections
- ${toneInstructions[tone]}

STRUCTURE REQUIREMENTS:
1. **Introduction**: Hook the reader, establish credibility, outline what the post covers
2. **Main Body**: 4-6 major sections with subheadings, each 400-500 words
3. **Conclusion**: Summarize key points, provide actionable takeaways, include call-to-action

QUALITY STANDARDS:
- Write for ${targetAudience || 'professionals in ' + industry}
- Include actionable insights and practical advice
- Use bullet points, numbered lists, and subheadings for readability
- Add relevant industry examples and case studies
- Ensure content is valuable, comprehensive, and engaging

Industry: ${industry}
Topic: ${topic}
Title: ${title}
${targetAudience ? `Target Audience: ${targetAudience}` : ''}
${keyPoints ? `Key Points to Cover: ${keyPoints}` : ''}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Write a comprehensive 3,000-word blog post titled "${title}" about ${topic} for the ${industry} industry. Use a ${tone} tone and ensure the content is well-structured, engaging, and provides significant value to readers.`
        }
      ],
      temperature: 0.7,
      max_tokens: 6000
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated from OpenAI');
    }

    return content;
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('Failed to generate blog post. Please try again.');
  }
}

export async function improveContent(content: string, improvements: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert LinkedIn content editor. Improve the given content based on the user\'s feedback while maintaining the original tone and message.'
        },
        {
          role: 'user',
          content: `Please improve this LinkedIn post based on the following feedback: "${improvements}"\n\nOriginal post:\n${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return completion.choices[0]?.message?.content || content;
  } catch (error) {
    console.error('Error improving content:', error);
    throw new Error('Failed to improve content. Please try again.');
  }
}