import { NextRequest, NextResponse } from 'next/server'

interface AISubtitleRequest {
  trends: string[]
  context?: string
  tone?: 'professional' | 'witty' | 'inspiring' | 'technical' | 'creative'
  style?: 'newspaper' | 'blog' | 'manifesto' | 'tagline'
}

// In production, you'd use actual AI APIs like OpenAI, Anthropic, or Groq
async function generateWithGroqAPI(prompt: string): Promise<string> {
  // Simulated AI response - replace with actual API call
  const aiResponses = [
    "Notes on software, design, and what I'm learning right now.",
    "A personal log of coding experiments and lessons.",
    "Thoughts on modern engineering and the web.", 
    "Documenting the journey through software development.",
    "Just a developer exploring concepts and sharing notes.",
    "Writing down what I learn about technology.",
    "My notebook for engineering practices and current trends.",
    "Reflections on code, architecture, and building things.",
    "Exploring software one project at a time.",
    "Lessons gathered from everyday programming."
  ]
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))
  
  // Simulate occasional API failures
  if (Math.random() < 0.05) { // 5% failure rate
    throw new Error('AI API temporarily unavailable')
  }
  
  return aiResponses[Math.floor(Math.random() * aiResponses.length)]
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  // Placeholder for OpenAI integration
  // In production:
  /*
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a creative copywriter specializing in tech blog taglines and newspaper-style subtitles.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 50,
      temperature: 0.8
    })
  })
  
  const data = await response.json()
  return data.choices[0].message.content.trim()
  */
  
  // Fallback implementation
  return generateWithGroqAPI(prompt)
}

function createAIPrompt(trends: string[], context: string, tone: string, style: string): string {
  const trendList = trends.slice(0, 3).join(', ')
  
  return `Create a ${tone} ${style} subtitle for a personal programming blog called "The Brandon Bell". 

Current trending topics: ${trendList}

Requirements:
- Style: ${style} (like a humble personal notebook or developer journal)
- Tone: ${tone} (humble, curious, thoughtful, personal)
- Length: 4-10 words
- Focus on: learning, documenting experiences, sharing practical observations about engineering
- Avoid clichés completely. Do not use words like "crafting", "excellence", "conquering", "innovation", or "future". Keep it down-to-earth.

Context: This is a rotating subtitle appearing below the site title. It should feel like an ongoing personal log or notepad about tech and software.

Generate only the subtitle text, no quotes or extra formatting.`
}

export async function POST(request: NextRequest) {
  try {
    const body: AISubtitleRequest = await request.json()
    const { 
      trends = [], 
      context = 'tech blog',
      tone = 'professional',
      style = 'newspaper'
    } = body
    
    if (trends.length === 0) {
      return NextResponse.json({
        error: 'No trends provided'
      }, { status: 400 })
    }
    
    const prompt = createAIPrompt(trends, context, tone, style)
    
    let subtitle: string
    
    try {
      // Try primary AI service (Groq is faster and cheaper than OpenAI)
      subtitle = await generateWithGroqAPI(prompt)
    } catch (error) {
      console.warn('Primary AI service failed, trying fallback:', error)
      try {
        subtitle = await generateWithOpenAI(prompt)
      } catch (fallbackError) {
        console.error('All AI services failed:', fallbackError)
        throw new Error('AI services unavailable')
      }
    }
    
    // Clean up the response
    subtitle = subtitle.replace(/["""]/g, '').trim()
    
    // Validate subtitle length and content
    if (subtitle.length < 5 || subtitle.length > 100) {
      throw new Error('Generated subtitle is invalid length')
    }
    
    return NextResponse.json({
      subtitle,
      trends: trends.slice(0, 3),
      metadata: {
        tone,
        style,
        context,
        generatedAt: new Date().toISOString(),
        prompt: prompt.substring(0, 100) + '...' // Truncated for debugging
      }
    })
    
  } catch (error) {
    console.error('Error generating AI subtitle:', error)
    
    // Return a contextual fallback based on trends
    const { trends = [] } = await request.json().catch(() => ({ trends: [] }))
    
    const fallbackSubtitles = [
      `Notes on ${trends[0] || 'modern development'}.`,
      `Learning about ${trends[0] || 'software engineering'}.`,
      `Thoughts on building with ${trends[0] || 'technology'}.`,
      "A notebook for code and current tech.",
      "Documenting ongoing software projects.",
      "A developer's journal and reference."
    ]
    
    const fallback = fallbackSubtitles[Math.floor(Math.random() * fallbackSubtitles.length)]
    
    return NextResponse.json({
      subtitle: fallback,
      fallback: true,
      error: error instanceof Error ? error.message : 'AI generation failed',
      trends: trends.slice(0, 3)
    })
  }
}

// GET endpoint for quick subtitle generation with default parameters
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const trendsParam = searchParams.get('trends')
  const tone = searchParams.get('tone') as AISubtitleRequest['tone'] || 'professional'
  
  let trends: string[] = []
  
  if (trendsParam) {
    trends = trendsParam.split(',').map(t => t.trim())
  } else {
    // Fetch current trends
    try {
      const trendsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/tech-trends`)
      const trendsData = await trendsResponse.json()
      trends = trendsData.trends?.slice(0, 3).map((t: any) => t.topic) || []
    } catch (error) {
      trends = ['React', 'TypeScript', 'Next.js'] // Ultimate fallback
    }
  }
  
  // Forward to POST endpoint
  return POST(new NextRequest(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trends, tone })
  }))
}
