import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { BlogLayoutSystem } from '@/components/BlogLayoutSystem'
import { BlogCard } from '@/components/BlogCard'

function FeaturedPost({ post }) {
  if (!post) return null
  
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-slate-900 dark:text-white mb-2">
          Featured Post
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Latest insights and thoughts
        </p>
      </div>
      <BlogCard post={post} variant="main" />
    </div>
  )
}

function PostGrid({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          No posts yet
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Check back soon for new content!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default function BlogPage() {
  const posts = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return <BlogLayoutSystem posts={posts} />
}
