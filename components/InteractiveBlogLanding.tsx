'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogCard } from '@/components/BlogCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc, 
  Calendar,
  Clock,
  Tag as TagIcon,
  Filter,
  X,
  Mail,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { AnimatedText } from '@/components/animated-text'

interface InteractiveBlogLandingProps {
  posts: any[]
}

type ViewMode = 'grid' | 'list'
type SortOption = 'date' | 'title' | 'readingTime'
type SortOrder = 'asc' | 'desc'

interface NewsletterState {
  email: string
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export function InteractiveBlogLanding({ posts }: InteractiveBlogLandingProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
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
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [posts, searchTerm, selectedTags, sortOption, sortOrder])

  const [featured, ...rest] = filteredAndSortedPosts

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

  return (
    <div className="space-y-16">
      {/* Hero Section with Search */}
      <motion.div 
        className="text-center space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <AnimatedText 
            text="Explore My Blog"
            className="text-4xl lg:text-5xl font-playfair font-bold text-slate-900 dark:text-white"
          />
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover insights on software engineering, design, and technology. 
            {posts.length} articles and growing.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 peer-focus:text-accent transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="peer pl-12 h-12 text-base rounded-full border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-accent focus:border-transparent hover:shadow-lg hover:shadow-accent-200 dark:hover:shadow-accent-900 focus:shadow-lg focus:shadow-accent-300 dark:focus:shadow-accent-800 transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(selectedTags.length > 0 || sortOption !== 'date' || sortOrder !== 'desc') && (
                <Badge className="ml-2 bg-blue-600 text-white">
                  {selectedTags.length + (sortOption !== 'date' || sortOrder !== 'desc' ? 1 : 0)}
                </Badge>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-full"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-full"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

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
                      { value: 'readingTime', label: 'Reading Time', icon: Clock }
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
                          className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
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

      {/* Featured Post */}
      {featured && !searchTerm && selectedTags.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-slate-900 dark:text-white mb-2">
              Featured Post
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Latest insights and thoughts
            </p>
          </div>
          <BlogCard post={featured} variant="main" />
        </motion.div>
      )}

      {/* Posts Grid/List */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-slate-900 dark:text-white mb-2">
            {featured && !searchTerm && selectedTags.length === 0 ? 'More Posts' : 'All Posts'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {filteredAndSortedPosts.length === posts.length 
              ? 'Explore all articles and insights'
              : `${filteredAndSortedPosts.length} articles found`
            }
          </p>
        </div>

        <AnimatePresence mode="wait">
          {filteredAndSortedPosts.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTags([])
                  setSortOption('date')
                  setSortOrder('desc')
                }}
                variant="outline"
                className="rounded-full"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={`${viewMode}-${searchTerm}-${selectedTags.join(',')}`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {(featured && !searchTerm && selectedTags.length === 0 ? rest : filteredAndSortedPosts).map((post, index) => (
                <motion.div
                  key={post.slug}
                  variants={itemVariants}
                  custom={index}
                >
                  <BlogCard 
                    post={post} 
                    variant={viewMode === 'list' ? 'list' : 'default'} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
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
                  className="px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
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
  )
}
