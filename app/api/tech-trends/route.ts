import { NextRequest, NextResponse } from 'next/server'

interface TechTrend {
  topic: string
  relevance: number
  source: string
  category: 'framework' | 'language' | 'tool' | 'concept' | 'platform'
}

// Simulated trend sources - in production, these would be real APIs
const TREND_SOURCES = {
  hackernews: [
    { topic: 'React Server Components', relevance: 95, category: 'framework' as const },
    { topic: 'Bun runtime', relevance: 88, category: 'tool' as const },
    { topic: 'Rust adoption', relevance: 92, category: 'language' as const },
    { topic: 'WebAssembly integration', relevance: 85, category: 'concept' as const },
    { topic: 'Edge computing', relevance: 90, category: 'platform' as const },
    { topic: 'AI-assisted coding', relevance: 94, category: 'tool' as const },
    { topic: 'TypeScript 5.0', relevance: 87, category: 'language' as const },
    { topic: 'Serverless functions', relevance: 83, category: 'platform' as const },
    { topic: 'GraphQL federation', relevance: 78, category: 'concept' as const },
    { topic: 'Micro-frontends', relevance: 81, category: 'concept' as const }
  ],
  github: [
    { topic: 'Next.js 14', relevance: 96, category: 'framework' as const },
    { topic: 'Tailwind CSS', relevance: 89, category: 'framework' as const },
    { topic: 'Prisma ORM', relevance: 84, category: 'tool' as const },
    { topic: 'Supabase', relevance: 86, category: 'platform' as const },
    { topic: 'tRPC', relevance: 82, category: 'tool' as const },
    { topic: 'Zod validation', relevance: 79, category: 'tool' as const },
    { topic: 'Framer Motion', relevance: 77, category: 'framework' as const },
    { topic: 'Clerk authentication', relevance: 75, category: 'tool' as const }
  ],
  stackoverflow: [
    { topic: 'React hooks patterns', relevance: 91, category: 'concept' as const },
    { topic: 'Node.js performance', relevance: 88, category: 'platform' as const },
    { topic: 'Docker containerization', relevance: 85, category: 'tool' as const },
    { topic: 'MongoDB optimization', relevance: 80, category: 'platform' as const },
    { topic: 'CSS Grid mastery', relevance: 76, category: 'concept' as const },
    { topic: 'Jest testing strategies', relevance: 82, category: 'tool' as const }
  ],
  reddit: [
    { topic: 'Web3 development', relevance: 73, category: 'concept' as const },
    { topic: 'PWA implementation', relevance: 78, category: 'concept' as const },
    { topic: 'DevOps automation', relevance: 86, category: 'tool' as const },
    { topic: 'API design patterns', relevance: 84, category: 'concept' as const },
    { topic: 'Cloud architecture', relevance: 89, category: 'platform' as const }
  ]
}

async function fetchTrendsFromSource(source: keyof typeof TREND_SOURCES): Promise<TechTrend[]> {
  // Simulate API delay and potential failures
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 200))
  
  if (Math.random() < 0.1) { // 10% chance of failure
    throw new Error(`Failed to fetch from ${source}`)
  }
  
  return TREND_SOURCES[source].map(trend => ({
    ...trend,
    source
  }))
}

function aggregateAndRankTrends(allTrends: TechTrend[]): TechTrend[] {
  // Group by topic and calculate weighted relevance
  const trendMap = new Map<string, TechTrend>()
  
  for (const trend of allTrends) {
    const existing = trendMap.get(trend.topic)
    if (existing) {
      // Average the relevance scores if same topic from multiple sources
      existing.relevance = (existing.relevance + trend.relevance) / 2
    } else {
      trendMap.set(trend.topic, { ...trend })
    }
  }
  
  // Sort by relevance and return top trends
  return Array.from(trendMap.values())
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 15)
}

function generateContextualPrompts(trends: TechTrend[]): string[] {
  const topTrends = trends.slice(0, 5)
  const categories = [...new Set(topTrends.map(t => t.category))]
  
  return [
    `The intersection of ${topTrends[0]?.topic} and modern development`,
    `Exploring ${topTrends[1]?.topic} in production environments`,
    `From ${topTrends[2]?.topic} to scalable solutions`,
    `Mastering ${topTrends[0]?.topic} and ${topTrends[1]?.topic}`,
    `The developer's guide to ${topTrends[0]?.topic}`,
    `Engineering excellence through ${categories.join(' and ')}`,
    `Where ${topTrends[0]?.topic} meets practical implementation`,
    `Building tomorrow with ${topTrends[1]?.topic} and ${topTrends[2]?.topic}`,
    `The art of ${topTrends[0]?.topic} in digital craftsmanship`,
    `Navigating ${topTrends[0]?.topic} in the age of ${topTrends[1]?.topic}`
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includePrompts = searchParams.get('prompts') === 'true'
    const sourceFilter = searchParams.get('source') as keyof typeof TREND_SOURCES | null
    
    let allTrends: TechTrend[] = []
    const errors: string[] = []
    
    const sourcesToFetch = sourceFilter ? [sourceFilter] : Object.keys(TREND_SOURCES) as (keyof typeof TREND_SOURCES)[]
    
    // Fetch from multiple sources in parallel
    const fetchPromises = sourcesToFetch.map(async (source) => {
      try {
        return await fetchTrendsFromSource(source)
      } catch (error) {
        errors.push(`${source}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        return []
      }
    })
    
    const results = await Promise.all(fetchPromises)
    allTrends = results.flat()
    
    if (allTrends.length === 0) {
      throw new Error('No trends could be fetched from any source')
    }
    
    const rankedTrends = aggregateAndRankTrends(allTrends)
    
    const response: any = {
      trends: rankedTrends,
      sources: sourcesToFetch,
      timestamp: new Date().toISOString(),
      errors: errors.length > 0 ? errors : undefined
    }
    
    if (includePrompts) {
      response.contextualPrompts = generateContextualPrompts(rankedTrends)
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error fetching tech trends:', error)
    
    return NextResponse.json({
      error: 'Failed to fetch tech trends',
      fallback: true,
      trends: [
        { topic: 'Modern web development', relevance: 100, source: 'fallback', category: 'concept' },
        { topic: 'Full-stack engineering', relevance: 95, source: 'fallback', category: 'concept' },
        { topic: 'Software architecture', relevance: 90, source: 'fallback', category: 'concept' }
      ]
    }, { status: 500 })
  }
}
