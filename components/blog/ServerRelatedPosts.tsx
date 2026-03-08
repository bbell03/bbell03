import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Highlights } from './Highlights'
import { ArrowRight } from 'lucide-react'

interface ServerRelatedPostsProps {
  currentPost: any
  maxPosts?: number
}

function toHighlightItem(post: any) {
  const minutes = typeof post.readingTime?.minutes === 'number'
    ? Math.max(1, Math.round(post.readingTime.minutes))
    : null
  return {
    title: post.title,
    dek: post.summary || 'No summary available',
    time: minutes != null ? `${minutes} min read` : '—',
    href: `/${post.path}`,
  }
}

export default function ServerRelatedPosts({ currentPost, maxPosts = 5 }: ServerRelatedPostsProps) {
  // Get posts with similar tags
  const relatedPosts = allBlogs
    .filter((post) => {
      if (post.slug === currentPost.slug) return false
      if (currentPost.tags && post.tags) {
        return currentPost.tags.some((tag: string) => post.tags.includes(tag))
      }
      return false
    })
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, maxPosts)

  const posts = relatedPosts.length > 0 ? relatedPosts : allBlogs
    .filter((post) => post.slug !== currentPost.slug)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, maxPosts)

  const title = relatedPosts.length > 0 ? "Related" : "Today's Highlights"
  const items = posts.map(toHighlightItem)

  return (
    <section className="mt-12">
      <Highlights
        items={items}
        title={title}
        variant="grid"
        rightLabel="Editors' Desk"
      />
      <div className="mt-6 flex justify-end">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          View all posts
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  )
}
