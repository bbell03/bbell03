import { NextRequest, NextResponse } from 'next/server'

// Fallback subtitles for when API fails or no internet
const FALLBACK_SUBTITLES = [
  "All the Code That's Fit to Print",
  "Where Innovation Meets Implementation",
  "Crafting Digital Solutions, One Line at a Time",
  "Engineering Tomorrow's Web Today",
  "Code, Create, Conquer",
  "From Concept to Code",
  "Building the Future, Bug by Bug",
  "Where Logic Meets Creativity",
  "Debugging the Digital World",
  "Architecting Digital Dreams"
]

// Cache for storing daily subtitle
let subtitleCache: {
  date: string
  subtitle: string
} | null = null

async function fetchTechTrends(): Promise<string[]> {
  try {
    // Fetch from our enhanced tech trends API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/tech-trends?prompts=true`, {
      cache: 'no-cache'
    })
    
    if (!response.ok) {
      throw new Error(`Tech trends API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.trends && data.trends.length > 0) {
      // Extract top trending topics
      return data.trends.slice(0, 5).map((trend: any) => trend.topic)
    }
    
    throw new Error('No trends returned from API')
    
  } catch (error) {
    console.error('Error fetching tech trends:', error)
    
    // Fallback to static trends
    const fallbackTrends = [
      'AI/ML integration',
      'React Server Components', 
      'Edge computing',
      'WebAssembly adoption',
      'TypeScript dominance',
      'Serverless architecture',
      'JAMstack evolution',
      'Progressive Web Apps',
      'Micro-frontends',
      'GraphQL adoption'
    ]
    
    // Randomly select 3-5 trends
    const shuffled = fallbackTrends.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 3)
  }
}

async function generateSubtitleWithOpenAI(trends: string[]): Promise<string> {
  // This would use OpenAI API in production
  // For now, we'll generate contextual subtitles based on trends
  const templates = [
    `Navigating ${trends[0]} and ${trends[1]} in Modern Development`,
    `Where ${trends[0]} Meets Creative Engineering`,
    `Exploring ${trends[0]}, ${trends[1]}, and Beyond`,
    `Building Tomorrow with ${trends[0]} and ${trends[1]}`,
    `The Art of ${trends[0]} in Digital Craftsmanship`,
    `From ${trends[0]} to Production: A Developer's Journey`,
    `Mastering ${trends[0]} in the Age of ${trends[1]}`,
    `${trends[0]}, ${trends[1]}, and the Future of Code`,
    `Engineering Excellence Through ${trends[0]}`,
    `Where ${trends[0]} Innovation Comes to Life`
  ]
  
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
  return randomTemplate
}

async function generateSubtitleWithAI(trends: string[]): Promise<string> {
  try {
    // Use our dedicated AI subtitle service
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ai-subtitle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trends,
        tone: ['professional', 'witty', 'inspiring', 'creative'][Math.floor(Math.random() * 4)],
        style: 'newspaper',
        context: 'tech blog'
      }),
      cache: 'no-cache'
    })
    
    if (!response.ok) {
      throw new Error(`AI subtitle API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.subtitle) {
      return data.subtitle
    }
    
    throw new Error('No subtitle returned from AI service')
    
  } catch (error) {
    console.error('Error with AI generation:', error)
    return generateSubtitleWithOpenAI(trends)
  }
}

export async function GET(request: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    
    // Check if we have a cached subtitle for today
    if (subtitleCache && subtitleCache.date === today) {
      return NextResponse.json({ 
        subtitle: subtitleCache.subtitle,
        cached: true,
        date: today
      })
    }
    
    // Generate new subtitle for today
    const trends = await fetchTechTrends()
    let subtitle: string
    
    try {
      // Try AI generation first
      subtitle = await generateSubtitleWithAI(trends)
    } catch (error) {
      console.error('AI generation failed, using template:', error)
      subtitle = await generateSubtitleWithOpenAI(trends)
    }
    
    // Cache the result
    subtitleCache = {
      date: today,
      subtitle
    }
    
    return NextResponse.json({ 
      subtitle,
      cached: false,
      date: today,
      trends: trends.slice(0, 3) // Include trends for debugging
    })
    
  } catch (error) {
    console.error('Error generating dynamic subtitle:', error)
    
    // Return fallback subtitle
    const fallback = FALLBACK_SUBTITLES[Math.floor(Math.random() * FALLBACK_SUBTITLES.length)]
    
    return NextResponse.json({ 
      subtitle: fallback,
      cached: false,
      fallback: true,
      error: 'Failed to generate dynamic subtitle'
    })
  }
}

// Optional: Add POST endpoint for manual subtitle refresh
export async function POST(request: NextRequest) {
  try {
    // Clear cache to force regeneration
    subtitleCache = null
    
    // Generate fresh subtitle
    const response = await GET(request)
    const data = await response.json()
    
    return NextResponse.json({
      ...data,
      refreshed: true
    })
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to refresh subtitle' 
    }, { status: 500 })
  }
}
