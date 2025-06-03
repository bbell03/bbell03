import Link from 'next/link'
import Image from 'next/image'
import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import siteMetadata from '@/data/siteMetadata'
import { Separator } from '@/components/ui/separator'

function BlogCard({ post, variant = 'default' }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col h-full rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-transform hover:scale-[1.025] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/50 ${
        variant === 'main' ? 'md:col-span-2 md:row-span-2 p-6' : 'p-4'
      }`}
      aria-label={post.title}
    >
      <div className={`relative w-full ${variant === 'main' ? 'aspect-[16/7]' : 'aspect-[4/3]'} overflow-hidden rounded-md mb-4`}>
        {post.images?.[0] && (
          <Image
            src={post.images[0]}
            alt={post.title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={variant === 'main'}
          />
        )}
      </div>
      <h2 className={`font-playfair ${variant === 'main' ? 'text-3xl md:text-4xl font-bold' : 'text-lg font-semibold'} text-gray-900 dark:text-white group-hover:text-secondary transition-colors mb-2 leading-tight truncate`}>{post.title}</h2>
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <span>By {siteMetadata.author}</span>
        <span className="mx-1">&bull;</span>
        <span>
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        {post.readingTime?.minutes && <span className="ml-2">• {post.readingTime.minutes} min read</span>}
      </div>
      <p className={`font-source-serif ${variant === 'main' ? 'text-lg' : 'text-sm'} text-gray-700 dark:text-gray-300 line-clamp-3 mb-1`}>{post.summary}</p>
    </Link>
  )
}

export default function BlogPage() {
  const posts = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )
  const [main, ...rest] = posts

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8 flex flex-col gap-12">
      {/* Main Feature + Grid of Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
        {main && <BlogCard post={main} variant="main" />}
        {rest.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <Separator className="my-2" />
    </div>
  )
}
