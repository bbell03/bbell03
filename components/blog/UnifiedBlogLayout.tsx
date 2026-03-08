'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/blog/Comments'
import ScrollTopAndComment from '@/components/blog/ScrollTopAndComment'

interface UnifiedBlogLayoutProps {
  content: CoreContent<Blog>
  authorDetails?: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
  showComments?: boolean
}

export default function UnifiedBlogLayout({
  content,
  authorDetails = [],
  next,
  prev,
  children,
  showComments = true,
}: UnifiedBlogLayoutProps) {
  const { slug, date, title, tags, images, summary, readingTime } = content
  const authorName = authorDetails[0]?.name || siteMetadata.author
  const featuredImage = Array.isArray(images) && images.length > 0 ? images[0] : undefined
  const roundedReadingTime =
    typeof readingTime?.minutes === 'number' ? Math.max(1, Math.round(readingTime.minutes)) : undefined
  const publishedLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
  const shortDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))

  return (
    <>
      <ScrollTopAndComment />

      <div className="article-page min-h-screen relative">
        <div className="paper-fiber" aria-hidden />

        <main className="relative w-full max-w-[min(100%,1200px)] mx-auto px-3 sm:px-4 py-6 md:py-8 z-10">
          <div className="paper-shell">
            <Link
              href="/blog"
              className="group inline-flex w-max items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-4"
            >
              <ArrowLeft className="h-3 w-3 transition group-hover:-translate-x-0.5" />
              Back to blog
            </Link>

            <div className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-slate-600 dark:text-slate-300 pb-2 border-b border-slate-200 dark:border-slate-700">
              <span>{shortDate}</span>
              <span>{siteMetadata.title}</span>
            </div>

            <div className="pt-4 pb-4 space-y-3">
              {tags && tags.length > 0 && (
                <p className="kicker">{tags.join(' · ')}</p>
              )}
              <h1 className="headline text-3xl md:text-4xl lg:text-5xl text-slate-900 dark:text-white">
                {title}
              </h1>
              {summary && (
                <p className="deck">{summary}</p>
              )}
              <div className="byline">
                <span className="byline-name">By {authorName}</span>
                <span className="byline-rule" aria-hidden />
                <span className="font-mono text-[11px] uppercase text-slate-600 dark:text-slate-400">
                  {publishedLabel}
                  {roundedReadingTime != null && ` · ${roundedReadingTime} min read`}
                </span>
              </div>
            </div>

            <div className="newspaper-rule mb-4" />

            {featuredImage && (
              <figure className="overflow-hidden rounded-sm mb-6">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={featuredImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <figcaption className="sr-only">{summary ?? title}</figcaption>
              </figure>
            )}

            <div className="newspaper-body dropcap newspaper-columns space-y-6 prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-slate-900 prose-a:text-accent-600 hover:prose-a:text-accent-500 dark:prose-headings:text-slate-100 dark:prose-p:text-slate-200 dark:prose-strong:text-slate-100 dark:prose-code:bg-slate-800 dark:prose-code:text-slate-100 dark:prose-a:text-accent-400 dark:hover:prose-a:text-accent-300">
              {children}
            </div>

            <div className="newspaper-rule mt-8 mb-4" />

            <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-100 text-base font-semibold text-white dark:text-slate-900">
                  {authorName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100 normal-case tracking-normal">
                    {authorName}
                  </p>
                  <p className="text-[10px]">Software Engineering & Design</p>
                </div>
              </div>
              <nav className="flex flex-wrap items-center gap-4">
                {prev?.path && (
                  <Link href={`/${prev.path}`} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                    &larr; {prev.title}
                  </Link>
                )}
                {next?.path && (
                  <Link href={`/${next.path}`} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                    {next.title} &rarr;
                  </Link>
                )}
              </nav>
            </footer>

            {showComments && siteMetadata.comments && (
              <section className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                <Comments slug={slug} />
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
