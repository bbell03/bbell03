import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { BlogCard } from './BlogCard'
import { ArrowRight } from 'lucide-react'

interface RelatedPostsProps {
  currentPost: any
  maxPosts?: number
}

export default function RelatedPosts({ currentPost, maxPosts = 3 }: RelatedPostsProps) {
  // Get posts with similar tags
  const relatedPosts = allBlogs
    .filter((post) => {
      // Exclude current post
      if (post.slug === currentPost.slug) return false
      
      // Check if posts share any tags
      if (currentPost.tags && post.tags) {
        return currentPost.tags.some((tag: string) => 
          post.tags.includes(tag)
        )
      }
      
      return false
    })
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, maxPosts)

  // If no related posts by tags, get recent posts
  if (relatedPosts.length === 0) {
    const recentPosts = allBlogs
      .filter((post) => post.slug !== currentPost.slug)
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
      .slice(0, maxPosts)

    return (
      <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-slate-900 dark:text-white mb-2">
            Recent Posts
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Explore more articles and insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-slate-900 dark:text-white mb-2">
          Related Posts
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          More articles you might enjoy
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          View all posts
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
