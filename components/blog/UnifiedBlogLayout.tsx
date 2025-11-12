'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import { format } from 'date-fns'
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import siteMetadata from '@/data/siteMetadata'
import TableOfContents from '@/components/blog/TableOfContents'
import Comments from '@/components/blog/Comments'
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment'

interface UnifiedBlogLayoutProps {
  content: CoreContent<Blog>
  authorDetails?: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
  showSidebar?: boolean
  showRelatedPosts?: boolean
  showComments?: boolean
  layout?: 'default' | 'simple' | 'banner'
}

export default function UnifiedBlogLayout({
  content,
  authorDetails = [],
  next,
  prev,
  children,
  showSidebar = true,
  showRelatedPosts = true,
  showComments = true,
  layout = 'default'
}: UnifiedBlogLayoutProps) {
  const { filePath, path, slug, date, title, tags, images, summary } = content
  const basePath = path.split('/')[0]

  // Layout-specific rendering
  if (layout === 'simple') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollTopAndComment />
        <article>
          <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
            <dl>
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>{format(new Date(date), "MMMM d, yyyy")}</time>
                </dd>
              </div>
            </dl>
            <div>
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                {title}
              </h1>
            </div>
            {summary && (
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-source-serif">
                {summary}
              </p>
            )}
          </div>
          <div className="prose prose-lg max-w-none pb-8 pt-10 dark:prose-invert">
            {children}
          </div>
          {showComments && siteMetadata.comments && (
            <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
              <Comments slug={slug} />
            </div>
          )}
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </article>
      </div>
    )
  }

  if (layout === 'banner') {
    const displayImage = images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollTopAndComment />
        <article>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <div className="relative aspect-[2/1] w-full">
                <Image src={displayImage} alt={title} fill className="object-cover rounded-2xl" />
              </div>
            </div>
            <div className="relative pt-10">
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                {title}
              </h1>
            </div>
            {summary && (
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-source-serif">
                {summary}
              </p>
            )}
          </div>
          <div className="prose prose-lg max-w-none py-4 dark:prose-invert">{children}</div>
          {showComments && siteMetadata.comments && (
            <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
              <Comments slug={slug} />
            </div>
          )}
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </article>
      </div>
    )
  }

  // Default layout (full-featured)
  return (
    <div className="w-full">
      <ScrollTopAndComment />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        {/* Main Content */}
        <article className="max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>

            {/* Summary */}
            {summary && (
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-source-serif">
                {summary}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={date}>
                  {format(new Date(date), "MMMM d, yyyy")}
                </time>
              </div>
              {content.readingTime?.minutes && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{content.readingTime.minutes} min read</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By {siteMetadata.author}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          {images && images[0] && (
            <div className="mb-12">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src={images[0]}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-slate-900 dark:prose-strong:text-white prose-code:text-slate-900 dark:prose-code:text-white prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20">
            {children}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {siteMetadata.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {siteMetadata.author}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Software Engineer & Designer
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
              </div>
            </div>
          </footer>

          {/* Related Posts - Removed to fix build error */}
        </article>

        {/* Sidebar */}
        {showSidebar && (
          <aside className="lg:pl-8">
            <TableOfContents headings={(() => {
              try {
                if (!content.toc || typeof content.toc !== 'string') return []
                return JSON.parse(content.toc)
              } catch (error) {
                // Silently handle TOC parsing errors - this is expected for some posts
                return []
              }
            })()} />
          </aside>
        )}
      </div>

      {/* Comments */}
      {showComments && siteMetadata.comments && (
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-4xl">
            <Comments slug={slug} />
          </div>
        </div>
      )}
    </div>
  )
}
