'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { allBlogs } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  Code, 
  User,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react'
import { AnimatedText } from '@/components/animated-text'
import siteMetadata from '@/data/siteMetadata'

interface NewspaperHomepageProps {
  className?: string
}

export function NewspaperHomepage({ className = '' }: NewspaperHomepageProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Get sorted posts
  const posts = allBlogs
    .filter(post => !post.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const [featuredPost, ...otherPosts] = posts
  const recentPosts = otherPosts.slice(0, 4)
  const sidebarPosts = otherPosts.slice(4, 8)

  // Get unique tags for trending section
  const allTags = posts.reduce((tags: string[], post) => {
    if (post.tags) {
      post.tags.forEach(tag => {
        if (!tags.includes(tag)) tags.push(tag)
      })
    }
    return tags
  }, []).slice(0, 8)

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-900 ${className}`}>
      {/* Newspaper Header */}
      <header className="border-b-4 border-black dark:border-white bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar with date and weather */}
          <div className="flex justify-between items-center py-2 text-xs border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-6">
              <time className="font-mono">
                {format(currentTime, "EEEE, MMMM d, yyyy")}
              </time>
              <span className="hidden sm:inline">
                {format(currentTime, "h:mm:ss a")}
              </span>
            </div>
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
                className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-black dark:text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                The Brandon Bell
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl font-source-serif italic text-slate-600 dark:text-slate-400 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                "All the Code That's Fit to Print"
              </motion.p>
              
              {/* Navigation */}
              <nav className="flex justify-center items-center gap-8 text-sm font-semibold uppercase tracking-wider">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About' },
                  { href: '/work', label: 'Projects' },
                  { href: '/blog', label: 'Articles' },
                  { href: '/contact', label: 'Contact' }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b-2 border-transparent hover:border-current pb-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Breaking News / Featured Story */}
            {featuredPost && (
              <motion.section 
                className="mb-12 border-b-2 border-slate-200 dark:border-slate-700 pb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Featured
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {format(new Date(featuredPost.date), "MMM d, yyyy")}
                  </div>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Featured Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-lg">
                      {featuredPost.images?.[0] ? (
                        <Image
                          src={featuredPost.images[0]}
                          alt={featuredPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl text-slate-400 dark:text-slate-500">
                          {featuredPost.title.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Featured Content */}
                    <div className="flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-black dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-lg md:text-xl font-source-serif text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                        {featuredPost.summary || "Explore the latest insights and developments..."}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>By {siteMetadata.author}</span>
                        </div>
                        {featuredPost.readingTime?.minutes && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{featuredPost.readingTime.minutes} min read</span>
                            </div>
                          </>
                        )}
                      </div>

                      {featuredPost.tags && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {featuredPost.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.section>
            )}

            {/* Recent Articles Grid */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-black dark:text-white border-b-2 border-black dark:border-white pb-1">
                  Latest Articles
                </h2>
                <Link 
                  href="/blog" 
                  className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {recentPosts.map((post, index) => (
                  <article 
                    key={post.slug}
                    className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-b-0"
                  >
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <div className="flex gap-4">
                        {/* Article Image */}
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 rounded">
                          {post.images?.[0] ? (
                            <Image
                              src={post.images[0]}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl text-slate-400 dark:text-slate-500">
                              {post.title.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Article Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-playfair font-semibold text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                            {post.summary}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <time>
                              {format(new Date(post.date), "MMM d")}
                            </time>
                            {post.readingTime?.minutes && (
                              <>
                                <span>•</span>
                                <span>{post.readingTime.minutes}m</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </motion.div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* About the Author */}
            <motion.section 
              className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                About the Author
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600 dark:text-slate-400">
                  BB
                </div>
                <div>
                  <h4 className="font-semibold text-black dark:text-white mb-1">
                    {siteMetadata.author}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Software Engineer & Designer crafting digital experiences
                  </p>
                  <div className="flex gap-2">
                    {[
                      { icon: Github, href: siteMetadata.github },
                      { icon: Linkedin, href: siteMetadata.linkedin },
                      { icon: Twitter, href: siteMetadata.x }
                    ].map(({ icon: Icon, href }) => (
                      <Link
                        key={href}
                        href={href}
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Trending Topics */}
            <motion.section 
              className="border border-slate-200 dark:border-slate-700 p-6 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase()}`}
                    className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent-300 dark:hover:shadow-accent-600 hover:scale-105 transition-all duration-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </motion.section>

            {/* More Articles */}
            <motion.section 
              className="border border-slate-200 dark:border-slate-700 p-6 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                More to Read
              </h3>
              <div className="space-y-4">
                {sidebarPosts.map((post, index) => (
                  <article key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <h4 className="text-sm font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
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

            {/* Newsletter Signup */}
            <motion.section 
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Daily Digest
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Get the latest articles delivered to your inbox every morning.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-black dark:text-white"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                  Subscribe
                </Button>
              </div>
            </motion.section>
          </aside>
        </div>

        {/* Bottom Section - Quick Links */}
        <motion.section 
          className="mt-12 pt-8 border-t-2 border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Development
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/work" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Recent Projects</Link></li>
                <li><Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Technical Articles</Link></li>
                <li><Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tech Stack</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tags" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Browse by Topic</Link></li>
                <li><Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Articles</Link></li>
                <li><Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Get in Touch</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-playfair font-bold text-black dark:text-white mb-4">
                Connect
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: siteMetadata.github, label: 'GitHub' },
                  { icon: Linkedin, href: siteMetadata.linkedin, label: 'LinkedIn' },
                  { icon: Twitter, href: siteMetadata.x, label: 'Twitter' },
                  { icon: Mail, href: `mailto:${siteMetadata.email}`, label: 'Email' }
                ].map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-center w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-black dark:hover:text-white transition-colors rounded-full"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-black dark:bg-slate-950 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm">
                © {new Date().getFullYear()} The Brandon Bell. All rights reserved.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                "Democracy dies in darkness, but code lives in the light."
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
              <Link href="/blog" className="hover:text-slate-300 transition-colors">Archive</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
