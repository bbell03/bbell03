import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'

interface BlogCardProps {
  post: any
  variant?: 'default' | 'main' | 'list' | 'newspaper'
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const isMain = variant === 'main'
  const isList = variant === 'list'
  const isNewspaper = variant === 'newspaper'
  
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative ${isList || isNewspaper ? 'flex' : 'flex flex-col'} h-full ${isNewspaper ? 'rounded-none border-0 border-b border-slate-200 dark:border-slate-700 bg-transparent hover:bg-gradient-to-r hover:from-accent-50 hover:to-accent-50 dark:hover:from-accent-900/20 dark:hover:to-accent-900/20 hover:shadow-lg hover:shadow-accent-200 dark:hover:shadow-accent-900' : `rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-500 dark:hover:shadow-accent-400 hover:border-accent-300 dark:hover:border-accent-500 hover:bg-gradient-to-br hover:from-white/80 hover:via-accent-50 hover:to-accent-50 dark:hover:from-slate-800/80 dark:hover:via-accent-900 dark:hover:to-accent-900 ${isMain ? 'hover:shadow-accent-600 dark:hover:shadow-accent-400' : ''} before:absolute before:inset-0 before:bg-glow-accent-subtle before:rounded-2xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:-z-10`} transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-accent focus:shadow-lg focus:shadow-accent-300 ${
        isMain ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      aria-label={post.title}
    >
      {/* Image Container */}
      <div className={`relative ${isList || isNewspaper ? (isNewspaper ? 'w-24 flex-shrink-0' : 'w-48 flex-shrink-0') : 'w-full'} overflow-hidden ${isList ? 'rounded-l-2xl' : isNewspaper ? 'rounded' : 'rounded-t-2xl'} ${
        isMain ? 'aspect-[16/9]' : (isList || isNewspaper) ? 'aspect-[4/3]' : 'aspect-[4/3]'
      }`}>
        {post.images?.[0] ? (
          <Image
            src={post.images[0]}
            alt={post.title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            sizes={isMain ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            priority={isMain}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <div className="text-slate-400 dark:text-slate-500 text-4xl font-light">
              {post.title.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && !isList && !isNewspaper && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag: string) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-0 hover:bg-accent-100 dark:hover:bg-accent-900 hover:text-accent-600 dark:hover:text-accent-400 hover:shadow-lg hover:shadow-accent-300 dark:hover:shadow-accent-600 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col ${isNewspaper ? 'p-4' : 'p-6'} ${isMain ? 'lg:p-8' : ''} ${isList || isNewspaper ? 'justify-between' : ''}`}>
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
          {post.readingTime?.minutes && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readingTime.minutes} min read</span>
              </div>
            </>
          )}
        </div>

                      {/* Title */}
              <h2 className={`font-playfair font-semibold text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 group-hover:text-glow-accent-sm transition-all duration-300 mb-3 leading-tight ${
                isMain ? 'text-2xl lg:text-3xl group-hover:text-glow-accent' : isNewspaper ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'
              }`}>
                {post.title}
              </h2>

        {/* Summary */}
        <p className={`font-source-serif text-slate-600 dark:text-slate-300 ${isList || isNewspaper ? 'line-clamp-2' : 'line-clamp-3'} mb-4 flex-1 ${
          isMain ? 'text-base lg:text-lg' : isNewspaper ? 'text-xs' : 'text-sm'
        }`}>
          {post.summary || "No summary available"}
        </p>

        {/* Tags in list and newspaper view */}
        {(isList || isNewspaper) && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag: string) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs hover:bg-accent-100 dark:hover:bg-accent-900 hover:text-accent-600 dark:hover:text-accent-400 hover:shadow-lg hover:shadow-accent-300 dark:hover:shadow-accent-600 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Author and Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>By {siteMetadata.author}</span>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-accent-600 dark:text-accent-400 group-hover:gap-2 transition-all duration-200">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
