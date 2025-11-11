'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

interface ArticleLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  date?: string
  author?: string
  readingTime?: string
}

export default function ArticleLayout({ 
  children, 
  title, 
  subtitle, 
  date,
  author = "Brandon Bell",
  readingTime
}: ArticleLayoutProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="article-layout">
      {/* Header */}
      <header className="article-header">
        <div className="article-content">
          <div className="flex items-center justify-between">
            {/* Back to blog */}
            <Link href="/blog" className="back-link">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="article-content">
        {/* Article Header */}
        <header className="mb-8">
          {title && (
            <h1 className="article-title">
              {title}
            </h1>
          )}
          
          {subtitle && (
            <p className="article-subtitle">
              {subtitle}
            </p>
          )}

          {/* Meta information */}
          <div className="article-meta">
            {date && (
              <span>{date}</span>
            )}
            {readingTime && (
              <>
                <span>•</span>
                <span>{readingTime} min read</span>
              </>
            )}
            <span>•</span>
            <span>By {author}</span>
          </div>

          {/* Action buttons */}
          <div className="article-actions">
            <button className="article-button">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
            <button className="article-button">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save
            </button>
          </div>
        </header>

        {/* Article Body */}
        <article className="article-body">
          {children}
        </article>

        {/* Author Section */}
        <section className="author-section">
          <div className="flex items-start gap-4">
            <div className="author-avatar">
              <span className="text-white font-bold text-lg">{author.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h3 className="author-name">{author}</h3>
              <p className="author-title">Software Engineer & Designer</p>
              <div className="author-actions">
                <button className="author-button">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
                <button className="author-button">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="comments-section">
          <button className="comments-button">
            Load Comments
          </button>
        </section>
      </main>
    </div>
  )
}
