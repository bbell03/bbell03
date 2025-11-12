'use client'

import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogCard } from '@/components/blog/BlogCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Grid3X3, 
  List, 
  Newspaper,
  SortAsc, 
  SortDesc, 
  Calendar,
  Clock,
  Tag as TagIcon,
  Filter,
  X,
  Mail,
  CheckCircle2,
  AlertCircle,
  User,
  TrendingUp,
  ArrowRight,
  Layers3
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import { DynamicSubtitle } from '@/components/shared/DynamicSubtitle'
import { AdminSubtitleControls } from '@/components/shared/AdminSubtitleControls'

interface BlogLayoutSystemProps {
  posts: any[]
}

type ViewMode = 'newspaper' | 'list' | 'modules' | 'grid'
type SortOption = 'date' | 'title' | 'readingTime' | 'topic'
type SortOrder = 'asc' | 'desc'

interface NewsletterState {
  email: string
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

// Separate clock component to isolate re-renders
const LiveClock = memo(() => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-6">
      <time className="font-mono">
        {format(currentTime, "EEEE, MMMM d, yyyy")}
      </time>
      <span className="hidden sm:inline">
        {format(currentTime, "h:mm:ss a")}
      </span>
    </div>
  )
})

LiveClock.displayName = 'LiveClock'

export function BlogLayoutSystem({ posts }: BlogLayoutSystemProps) {
  const [subtitleData, setSubtitleData] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('newspaper')
  const [sortOption, setSortOption] = useState<SortOption>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [showFilters, setShowFilters] = useState(false)
  const [newsletter, setNewsletter] = useState<NewsletterState>({
    email: '',
    status: 'idle',
    message: ''
  })

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach((tag: string) => tagSet.add(tag))
      }
    })
    return Array.from(tagSet).sort()
  }, [posts])

  // Group posts by topic/tag for modules view
  const postsByTopic = useMemo(() => {
    const topics: Record<string, any[]> = {}
    
    posts.forEach(post => {
      if (post.tags && post.tags.length > 0) {
        post.tags.forEach((tag: string) => {
          if (!topics[tag]) topics[tag] = []
          topics[tag].push(post)
        })
      } else {
        if (!topics['General']) topics['General'] = []
        topics['General'].push(post)
      }
    })

    // Sort posts within each topic by date
    Object.keys(topics).forEach(topic => {
      topics[topic].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    })

    return topics
  }, [posts])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      // Search filter
      const searchContent = `${post.title} ${post.summary} ${post.tags?.join(' ') || ''}`.toLowerCase()
      const matchesSearch = searchContent.includes(searchTerm.toLowerCase())
      
      // Tag filter
      const matchesTags = selectedTags.length === 0 || 
        (post.tags && selectedTags.every(tag => post.tags.includes(tag)))
      
      return matchesSearch && matchesTags
    })

    // Sort posts
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortOption) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'readingTime':
          const aTime = a.readingTime?.minutes || 0
          const bTime = b.readingTime?.minutes || 0
          comparison = aTime - bTime
          break
        case 'topic':
          const aTopic = a.tags?.[0] || 'zzz'
          const bTopic = b.tags?.[0] || 'zzz'
          comparison = aTopic.localeCompare(bTopic)
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [posts, searchTerm, selectedTags, sortOption, sortOrder])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newsletter.email) {
      setNewsletter(prev => ({ ...prev, status: 'error', message: 'Please enter your email address' }))
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletter.email)) {
      setNewsletter(prev => ({ ...prev, status: 'error', message: 'Please enter a valid email address' }))
      return
    }

    setNewsletter(prev => ({ ...prev, status: 'loading', message: '' }))

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter.email })
      })

      if (response.ok) {
        setNewsletter({
          email: '',
          status: 'success',
          message: 'Successfully subscribed! Check your email for confirmation.'
        })
      } else {
        throw new Error('Subscription failed')
      }
    } catch (error) {
      setNewsletter(prev => ({
        ...prev,
        status: 'error',
        message: 'Failed to subscribe. Please try again later.'
      }))
    }
  }

  // Toggle tag function
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  // Layout Components
  const GridLayout = () => {
    const [mainFeatured, ...otherPosts] = filteredAndSortedPosts
    const featuredPosts = otherPosts.slice(0, 5)
    const remainingPosts = otherPosts.slice(5)

    return (
      <div className="max-w-7xl mx-auto">
        {/* Magazine Header */}
        <motion.div 
          className="flex items-center justify-between mb-8 pb-6 border-b-2 border-slate-900 dark:border-white hover:border-accent-600 dark:hover:border-accent-400 transition-all duration-500"
          variants={itemVariants}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-accent-500 dark:hover:shadow-accent-400 hover:scale-105 transition-all duration-300 cursor-pointer">
              <span className="text-white dark:text-slate-900 font-bold text-lg">BB</span>
            </div>
            <div>
              <h2 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white">
                Magazine
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Featured Stories & Insights
              </p>
            </div>
          </div>
          <div className="text-right text-sm text-slate-600 dark:text-slate-400">
            <div>{filteredAndSortedPosts.length} Articles</div>
            <div className="font-mono">{format(new Date(), "MMM yyyy")}</div>
          </div>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Featured Story */}
          <div className="col-span-12 lg:col-span-8">
            {mainFeatured && (
              <motion.div variants={itemVariants} className="mb-8">
                <BlogCard post={mainFeatured} variant="main" />
              </motion.div>
            )}

            {/* Divider */}
            <div className="border-t border-slate-300 dark:border-slate-600 mb-8"></div>

            {/* Secondary Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.div key={post.slug} variants={itemVariants}>
                  <BlogCard post={post} variant="default" />
                </motion.div>
              ))}
            </div>

            {/* Horizontal Divider */}
            <div className="border-t border-slate-200 dark:border-slate-700 my-8"></div>

            {/* Three Column Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-playfair font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                More Stories
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {featuredPosts.slice(2, 5).map((post, index) => (
                  <motion.div key={post.slug} variants={itemVariants} className="w-full">
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <div className="flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-accent-300 dark:hover:border-accent-600 hover:shadow-lg hover:shadow-accent-100 dark:hover:shadow-accent-900/20 transition-all duration-300 bg-white dark:bg-slate-800/50">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg shadow-sm">
                          {post.images?.[0] ? (
                            <Image
                              src={post.images[0]}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-slate-400 dark:text-slate-500">
                              {post.title.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <h4 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors leading-tight line-clamp-2">
                            {post.title}
                          </h4>
                          
                          {post.summary && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {post.summary}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <time className="flex-shrink-0">
                              {format(new Date(post.date), "MMM d, yyyy")}
                            </time>
                            {post.readingTime?.minutes && (
                              <>
                                <span>•</span>
                                <span>{post.readingTime.minutes} min read</span>
                              </>
                            )}
                          </div>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {post.tags.slice(0, 3).map((tag: string) => (
                                <span 
                                  key={tag}
                                  className="inline-block px-2 py-0.5 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-xs rounded-md font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md">
                                  +{post.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              {/* Sidebar Header */}
              <div className="border-b border-slate-300 dark:border-slate-600 pb-4">
                <h3 className="text-lg font-playfair font-semibold text-slate-900 dark:text-white mb-2">
                  Latest Stories
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Stay updated with recent posts
                </p>
              </div>

              {/* Sidebar Articles */}
              <div className="space-y-6">
                {remainingPosts.slice(0, 4).map((post, index) => (
                  <motion.div 
                    key={post.slug} 
                    variants={itemVariants}
                    className="pb-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
                  >
                    <BlogCard post={post} variant="list" />
                  </motion.div>
                ))}
              </div>

              {/* Categories Section */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-700/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-slate-50 hover:to-accent-50 dark:hover:from-slate-800/50 dark:hover:to-accent-900">
                <h4 className="text-base font-playfair font-semibold text-slate-900 dark:text-white mb-4">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 8).map(tag => (
                    <Badge 
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "secondary"}
                      className={`cursor-pointer text-xs transition-all duration-300 ${selectedTags.includes(tag) ? 'shadow-lg shadow-accent-300 dark:shadow-accent-600' : 'hover:shadow-md hover:shadow-accent-200 dark:hover:shadow-accent-700 hover:scale-105 hover:bg-accent-100 dark:hover:bg-accent-900'}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - More Articles */}
        {remainingPosts.length > 4 && (
          <motion.section variants={containerVariants} className="mt-16">
            <div className="border-t-2 border-slate-300 dark:border-slate-600 pt-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-playfair font-semibold text-slate-900 dark:text-white mb-2">
                  Archive
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Explore our complete collection
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.slice(4).map((post, index) => (
                  <motion.div
                    key={post.slug}
                    variants={itemVariants}
                    custom={index}
                  >
                    <BlogCard post={post} variant="default" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    )
  }

  const NewspaperLayout = () => {
    const [featured, ...rest] = filteredAndSortedPosts
    const recentPosts = rest.slice(0, 4)
    const sidebarPosts = rest.slice(4, 8)

    return (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured Story */}
            {featured && (
              <motion.section 
                className="mb-12 border-b-2 border-slate-200 dark:border-slate-700 pb-8"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Featured
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {format(new Date(featured.date), "MMM d, yyyy")}
                  </div>
                </div>

                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-lg">
                      {featured.images?.[0] ? (
                        <Image
                          src={featured.images[0]}
                          alt={featured.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl text-slate-400 dark:text-slate-500">
                          {featured.title.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-black dark:text-white mb-4 leading-tight group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                        {featured.title}
                      </h2>
                      
                      <p className="text-lg md:text-xl font-source-serif text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                        {featured.summary || "Explore the latest insights and developments..."}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>By {siteMetadata.author}</span>
                        </div>
                        {featured.readingTime?.minutes && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{featured.readingTime.minutes} min read</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.section>
            )}

            {/* Recent Articles Grid */}
            <section>
              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.map((post, index) => (
                  <motion.article 
                    key={post.slug}
                    className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-b-0"
                    variants={itemVariants}
                    custom={index}
                  >
                    <BlogCard post={post} variant="newspaper" />
                  </motion.article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Trending Topics */}
            <motion.section 
              className="border border-slate-200 dark:border-slate-700 p-6 rounded-lg"
              variants={itemVariants}
            >
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 8).map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedTags.includes(tag) 
                        ? 'bg-accent text-white shadow-lg shadow-accent-300 dark:shadow-accent-600' 
                        : 'hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent-300 dark:hover:shadow-accent-600 hover:scale-105'
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </motion.section>

            {/* More Articles */}
            <motion.section 
              className="border border-slate-200 dark:border-slate-700 p-6 rounded-lg"
              variants={itemVariants}
            >
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                More to Read
              </h3>
              <div className="space-y-4">
                {sidebarPosts.map((post) => (
                  <article key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <h4 className="text-sm font-semibold text-black dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <time>
                          {format(new Date(post.date), "MMM d")}
                        </time>
                        {post.readingTime?.minutes && (
                          <>
                            <span>•</span>
                            <span>{post.readingTime.minutes}m read</span>
                          </>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </motion.section>
          </aside>
        </div>
      </div>
    )
  }

  const ListLayout = () => (
    <div className="max-w-4xl mx-auto">
      <motion.div className="space-y-6" variants={containerVariants}>
        {filteredAndSortedPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            variants={itemVariants}
            custom={index}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
          >
            <BlogCard post={post} variant="list" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )

  const ModulesLayout = () => {
    // Filter topics based on current filters
    const filteredTopics = Object.entries(postsByTopic).filter(([topic, topicPosts]) => {
      if (selectedTags.length > 0 && !selectedTags.includes(topic)) return false
      
      return topicPosts.some(post => {
        const searchContent = `${post.title} ${post.summary} ${post.tags?.join(' ') || ''}`.toLowerCase()
        return searchContent.includes(searchTerm.toLowerCase())
      })
    })

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Magazine Title */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-slate-900 dark:text-white mb-6">
            Magazine
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated collection of articles, insights, and stories organized by topic
          </p>
        </motion.div>

        {/* Topic Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 magazine-grid"
          variants={containerVariants}
        >
          {filteredTopics.map(([topic, topicPosts], index) => (
            <motion.article
              key={topic}
              variants={itemVariants}
              custom={index}
              className="group relative"
            >
              {/* Main Topic Card */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 hover:border-accent-400 dark:hover:border-accent-500 shadow-xl hover:shadow-2xl hover:shadow-accent-300/20 dark:hover:shadow-accent-600/20 transition-all duration-500 overflow-hidden flex flex-col magazine-module-card">
                
                {/* Topic Header */}
                <header className="relative bg-gradient-to-br from-accent-50 via-accent-100 to-accent-200 dark:from-accent-900/30 dark:via-accent-800/40 dark:to-accent-700/30 p-8 border-b-2 border-accent-300/50 dark:border-accent-600/50 flex-shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-accent rounded-full shadow-lg animate-pulse"></div>
                      <h2 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">
                        {topic}
                      </h2>
                    </div>
                    <Badge className="bg-accent text-white px-4 py-2 text-base font-semibold shadow-lg">
                      {topicPosts.length} {topicPosts.length === 1 ? 'Article' : 'Articles'}
                    </Badge>
                  </div>
                  <p className="text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    Explore the latest insights and developments in {topic.toLowerCase()}
                  </p>
                </header>

                {/* Featured Article */}
                {topicPosts[0] && (
                  <section className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <Link
                      href={`/blog/${topicPosts[0].slug}`}
                      className="group/featured block"
                    >
                      <div className="flex gap-3 items-center">
                        {/* Featured Image */}
                        <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg shadow-md">
                          {topicPosts[0].images?.[0] ? (
                            <Image
                              src={topicPosts[0].images[0]}
                              alt={topicPosts[0].title}
                              fill
                              className="object-cover group-hover/featured:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-400 dark:text-slate-500">
                              {topicPosts[0].title.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Featured Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 border-accent-300 dark:border-accent-600 font-semibold text-xs px-1.5 py-0.5">
                              Featured
                            </Badge>
                            <time className="text-xs text-slate-500 dark:text-slate-400">
                              {format(new Date(topicPosts[0].date), "MMM d")}
                            </time>
                          </div>
                          
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover/featured:text-accent-600 dark:group-hover/featured:text-accent-400 transition-colors leading-tight line-clamp-1 mb-1">
                            {topicPosts[0].title}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-medium">By {siteMetadata.author}</span>
                            {topicPosts[0].readingTime?.minutes && (
                              <>
                                <span>•</span>
                                <span>{topicPosts[0].readingTime.minutes}m</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </section>
                )}

                {/* Additional Articles */}
                <section className="p-6 flex-grow">
                  <div className="space-y-4">
                    {topicPosts.slice(1, 4).map((post, postIndex) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group/post flex gap-3 items-start hover:bg-slate-50 dark:hover:bg-slate-700/20 rounded-xl p-3 -m-3 transition-all duration-300"
                      >
                        {/* Post Thumbnail */}
                        <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg shadow-md">
                          {post.images?.[0] ? (
                            <Image
                              src={post.images[0]}
                              alt={post.title}
                              fill
                              className="object-cover group-hover/post:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-400 dark:text-slate-500">
                              {post.title.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Post Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover/post:text-accent-600 dark:group-hover/post:text-accent-400 transition-colors leading-tight line-clamp-2">
                            {post.title}
                          </h4>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <time className="flex-shrink-0">
                              {format(new Date(post.date), "MMM d")}
                            </time>
                            {post.readingTime?.minutes && (
                              <>
                                <span className="flex-shrink-0">•</span>
                                <span className="flex-shrink-0">{post.readingTime.minutes}m</span>
                              </>
                            )}
                          </div>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {post.tags.slice(0, 2).map((tag: string) => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary" 
                                  className="text-xs px-1.5 py-0.5 bg-accent-50/70 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 hover:bg-accent-100 dark:hover:bg-accent-900/50 transition-colors flex-shrink-0"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 2 && (
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex-shrink-0"
                                >
                                  +{post.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* View All Button */}
                  {topicPosts.length > 4 && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <Link
                        href={`/tags/${topic.toLowerCase()}`}
                        className="flex items-center justify-center gap-2 w-full text-accent-600 dark:text-accent-400 hover:text-white font-semibold text-sm bg-gradient-to-r from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/30 hover:from-accent-500 hover:to-accent-600 rounded-xl py-3 px-4 transition-all duration-300 group/cta border border-accent-200 dark:border-accent-700 hover:border-accent-500 shadow-sm hover:shadow-md"
                      >
                        <span>View All {topicPosts.length}</span>
                        <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  )}
                </section>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div 
          className="text-center mt-20 pt-12 border-t-2 border-slate-200 dark:border-slate-700"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white mb-6">
            Ready for More?
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Dive deeper into our complete archive of articles, tutorials, and insights
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-accent-400/30 dark:hover:shadow-accent-500/30 group"
          >
            Browse Complete Archive
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 relative">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 bg-glow-accent-layered pointer-events-none z-0" />
      <div className="fixed inset-0 bg-glow-accent-animated pointer-events-none z-0 opacity-50" />
      
      {/* Newspaper Header */}
      <header className="relative z-10 border-b-4 border-black dark:border-white bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar with date and weather */}
          <div className="flex justify-between items-center py-2 text-xs border-b border-slate-200 dark:border-slate-700">
            <LiveClock />
            <div className="flex items-center gap-4">
              <span className="text-slate-600 dark:text-slate-400">
                Software Engineering & Design
              </span>
            </div>
          </div>

          {/* Main header */}
          <div className="py-6">
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-black dark:text-white mb-2 transition-all duration-500 cursor-default"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                The Brandon Bell
              </motion.h1>
              <DynamicSubtitle 
                className="hover:text-accent-600 dark:hover:text-accent-300 hover:text-glow-accent-sm"
                showRefreshButton={false}
                showTrends={false}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Minimized Search and Controls */}
      <motion.div 
        className="flex justify-end mb-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          {/* Compact Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 peer-focus:text-accent transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="peer pl-9 h-9 w-48 text-sm rounded-full border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-accent focus:border-transparent hover:shadow-lg hover:shadow-accent-200 dark:hover:shadow-accent-900 focus:shadow-lg focus:shadow-accent-300 dark:focus:shadow-accent-800 transition-all duration-300"
            />
          </div>

          {/* Compact View Toggles */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 hover:shadow-lg hover:shadow-slate-300/50 dark:hover:shadow-slate-700/50 transition-all duration-300">
            <Button
              variant={viewMode === 'newspaper' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('newspaper')}
              className={`rounded-full px-2 py-1 h-8 transition-all duration-300 ${viewMode === 'newspaper' ? 'shadow-lg shadow-accent-300 dark:shadow-accent-600' : 'hover:shadow-md hover:shadow-accent-200 dark:hover:shadow-accent-700 hover:scale-105'}`}
            >
              <Newspaper className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`rounded-full px-2 py-1 h-8 transition-all duration-300 ${viewMode === 'grid' ? 'shadow-lg shadow-accent-300 dark:shadow-accent-600' : 'hover:shadow-md hover:shadow-accent-200 dark:hover:shadow-accent-700 hover:scale-105'}`}
              title="Magazine"
            >
              <Grid3X3 className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`rounded-full px-2 py-1 h-8 transition-all duration-300 ${viewMode === 'list' ? 'shadow-lg shadow-accent-300 dark:shadow-accent-600' : 'hover:shadow-md hover:shadow-accent-200 dark:hover:shadow-accent-700 hover:scale-105'}`}
            >
              <List className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === 'modules' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('modules')}
              className={`rounded-full px-2 py-1 h-8 transition-all duration-300 ${viewMode === 'modules' ? 'shadow-lg shadow-accent-300 dark:shadow-accent-600' : 'hover:shadow-md hover:shadow-accent-200 dark:hover:shadow-accent-700 hover:scale-105'}`}
            >
              <Layers3 className="w-3 h-3" />
            </Button>
          </div>

          {/* Compact Filters */}
          <Button
            variant={showFilters ? "default" : "ghost"}
            onClick={() => setShowFilters(!showFilters)}
            size="sm"
            className={`rounded-full h-8 px-3 transition-all duration-300 ${showFilters ? 'shadow-lg shadow-accent-300 dark:shadow-accent-600' : 'hover:shadow-md hover:shadow-accent-200 dark:hover:shadow-accent-700 hover:scale-105'}`}
          >
            <Filter className="w-3 h-3" />
            {(selectedTags.length > 0 || sortOption !== 'date' || sortOrder !== 'desc') && (
              <Badge className="ml-1 bg-accent text-white text-xs h-4 px-1">
                {selectedTags.length + (sortOption !== 'date' || sortOrder !== 'desc' ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </motion.div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6"
              >
                {/* Sort Options */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Sort By
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'date', label: 'Date', icon: Calendar },
                      { value: 'title', label: 'Title', icon: TagIcon },
                      { value: 'readingTime', label: 'Reading Time', icon: Clock },
                      { value: 'topic', label: 'Topic', icon: TrendingUp }
                    ].map(({ value, label, icon: Icon }) => (
                      <Button
                        key={value}
                        variant={sortOption === value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortOption(value as SortOption)}
                        className="rounded-full"
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {label}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="rounded-full"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />}
                    </Button>
                  </div>
                </div>

                {/* Tag Filter */}
                {allTags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <TagIcon className="w-4 h-4" />
                      Filter by Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-accent hover:text-white transition-colors"
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear Filters */}
                {(selectedTags.length > 0 || sortOption !== 'date' || sortOrder !== 'desc') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedTags([])
                      setSortOption('date')
                      setSortOrder('desc')
                    }}
                    className="w-full rounded-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      {/* Results Summary */}
      {(searchTerm || selectedTags.length > 0) && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-slate-600 dark:text-slate-400">
            Found {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
          </p>
        </motion.div>
      )}

      {/* Layout Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className="min-h-[600px]"
        >
          {viewMode === 'grid' && <GridLayout />}
          {viewMode === 'newspaper' && <NewspaperLayout />}
          {viewMode === 'list' && <ListLayout />}
          {viewMode === 'modules' && <ModulesLayout />}
        </motion.div>
      </AnimatePresence>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-50 to-accent-50 dark:from-accent-900 dark:to-accent-900 border border-accent-300 dark:border-accent-600"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/5" />
        <div className="relative text-center py-12 px-6">
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl lg:text-2xl font-playfair font-semibold text-slate-900 dark:text-white">
                Stay Updated
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Get notified when new posts are published. No spam, just quality content.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletter.email}
                    onChange={(e) => setNewsletter(prev => ({ ...prev, email: e.target.value, status: 'idle', message: '' }))}
                    className="pl-10 h-11 rounded-lg border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-accent focus:border-transparent hover:shadow-lg hover:shadow-accent-200 dark:hover:shadow-accent-900 focus:shadow-lg focus:shadow-accent-300 dark:focus:shadow-accent-800 transition-all duration-300"
                    disabled={newsletter.status === 'loading'}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={newsletter.status === 'loading'}
                  className="px-6 h-11 bg-accent hover:bg-accent text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {newsletter.status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {newsletter.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 text-sm ${
                      newsletter.status === 'success' 
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {newsletter.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {newsletter.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </motion.div>
      </div>
      
      {/* Admin Controls - Only show in development or for admin users */}
      {process.env.NODE_ENV === 'development' && (
        <AdminSubtitleControls
          onRefresh={() => window.location.reload()}
          subtitle={subtitleData?.subtitle}
          trends={subtitleData?.trends}
          cached={subtitleData?.cached}
          fallback={subtitleData?.fallback}
        />
      )}
    </div>
  )
}
