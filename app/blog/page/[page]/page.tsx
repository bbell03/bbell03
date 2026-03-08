// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
// import BlogPagination from '@/components/blog/BlogPagination'
// import { BlogCard } from '@/components/blog/BlogCard'

// const POSTS_PER_PAGE = 9

// export const generateStaticParams = async () => {
//   const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
//   const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

//   return paths
// }

// export default function Page({ params }: { params: { page: string } }) {
//   const posts = allCoreContent(sortPosts(allBlogs))
//   const pageNumber = parseInt(params.page as string)
//   const initialDisplayPosts = posts.slice(
//     POSTS_PER_PAGE * (pageNumber - 1),
//     POSTS_PER_PAGE * pageNumber
//   )
//   const pagination = {
//     currentPage: pageNumber,
//     totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
//   }

//   return (
//     <div className="space-y-16">
//       {/* Page Header */}
//       <div className="text-center">
//         <h1 className="text-3xl lg:text-4xl font-playfair font-semibold text-slate-900 dark:text-white mb-4">
//           Blog Posts
//         </h1>
//         <p className="text-slate-600 dark:text-slate-400">
//           Page {pageNumber} of {pagination.totalPages}
//         </p>
//       </div>

//       {/* Posts Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {initialDisplayPosts.map((post) => (
//           <BlogCard key={post.slug} post={post} />
//         ))}
//       </div>

//       {/* Pagination */}
//       <BlogPagination
//         currentPage={pagination.currentPage}
//         totalPages={pagination.totalPages}
//       />
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { Highlights } from '../components/highlights'

const highlights = [
  {
    title: 'Woman Says Tal Alexander Assaulted Her When She Was 13',
    dek: 'The woman told police she was at a party when she was drugged and assaulted by five boys, including Mr. Alexander, who is currently on trial for sex trafficking.',
    time: '4 min read',
  },
  {
    title: 'What to Know About the Rafah Border Crossing in Gaza',
    dek: 'The only crossing that connects Gaza with Egypt is reopening after nearly a year of closures, allowing residents to leave for medical care or return to families.',
    time: '4 min read',
  },
  {
    title: 'Mamdani’s 31-Day Challenge Tests Voters’ Resolve',
    dek: 'Can a relentless ground game and a moral appeal reshape a skeptical electorate?',
    time: '6 min read',
  },
  {
    title: 'Why Donetsk Still Matters to Moscow',
    dek: 'Control of the region has become a political and symbolic priority for the Kremlin.',
    time: '4 min read',
  },
  {
    title: 'Right-Wing Populist Surges Ahead in Costa Rica',
    dek: 'A surprise lead reshapes the race, stunning establishment parties days before the vote.',
    time: '6 min read',
  },
  {
    title: '59-Vehicle Pileup on Fog-Shrouded California Highway',
    dek: 'Ten injured as low visibility turned a routine commute into a chain-reaction crash.',
    time: '1 min read',
  },
]

export default function Home() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark))
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <div className="min-h-screen bg-paper text-ink relative overflow-hidden">
      <div className="paper-fiber" aria-hidden />
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 z-10">
        <div className="paper-shell">
          <div className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 pb-2 border-b border-black/10 dark:border-white/10">
            <span>Volume XXVII · No. 142</span>
            <span>Arlington, Virginia</span>
            <span>Five Cents</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-6 pb-5">
            <div className="space-y-2">
              <p className="kicker">Special Intelligence Edition</p>
              <h1 className="masthead text-3xl md:text-4xl text-ink">The Quantum Ledger</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-xs uppercase tracking-[0.12em] text-gray-700 dark:text-gray-300 leading-tight">
                <div>Wednesday, January 15, 2025</div>
                <div>Established 2018</div>
              </div>
              <button
                onClick={toggleTheme}
                className="ink-toggle"
                aria-label="Toggle theme"
              >
                <span className="hidden sm:inline">{isDark ? 'Day' : 'Night'} Ink</span>
                <span className="sm:hidden">{isDark ? 'Day' : 'Night'}</span>
              </button>
            </div>
          </div>

          <div className="newspaper-rule mb-6" />

          <div className="space-y-3 mb-8">
            <div className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
              Federal Contract Awarded
            </div>
            <h2 className="headline text-4xl md:text-5xl">
              QuantumEdge Analytics Secures $2.1B Federal Contract for AI-Powered Intelligence Platform
            </h2>
            <p className="deck text-lg md:text-xl leading-relaxed">
              Revolutionary machine learning infrastructure to transform national security data processing and real-time threat assessment capabilities
            </p>
            <div className="byline flex items-center gap-2">
              <span className="small-caps">Staff Correspondent</span>
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent dark:via-gray-500/50" />
              <span className="font-mono text-[11px] uppercase text-gray-600 dark:text-gray-300">NASDAQ: QEA</span>
            </div>
          </div>

          <article className="space-y-8">
            <div className="newspaper-body dropcap space-y-6">
              <p className="leading-relaxed">
                <strong>ARLINGTON—</strong> QuantumEdge Analytics Corp. today announced a landmark $2.1 billion contract with the Department of Defense to deploy its next-generation artificial intelligence platform across multiple intelligence agencies. The five-year agreement marks the largest federal AI contract in the company&apos;s history and promises to redefine how the nation processes and analyzes classified intelligence.
              </p>

              <p className="leading-relaxed">
                Since 2019, QuantumEdge has refined quantum-enhanced machine learning, crafting proprietary algorithms that sift encrypted data streams at unprecedented speeds. The new Sentinel AI platform marries quantum principles with disciplined neural networks to surface patterns traditional systems might miss for months. It will stand watch in 47 federal facilities, sorting more than 2.3 petabytes of intelligence each day while preserving strict clearances and compliance.
              </p>
            </div>

            <div className="notice-card">
              <h3>Contract Particulars</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li><strong className="font-display">$2.1B</strong> total value over five years</li>
                <li><strong className="font-display">47 facilities</strong> across 12 states and territories</li>
                <li><strong className="font-display">2.3PB daily</strong> encrypted data processing capacity</li>
                <li><strong className="font-display">Quantum-assisted</strong> machine learning algorithms</li>
                <li><strong className="font-display">Real-time</strong> threat detection and assessment</li>
              </ul>
            </div>

            <div className="newspaper-body space-y-6">
              <p className="leading-relaxed">
                Sentinel AI represents a quiet but decisive leap in intelligence operations. Rather than decrypting information before analysis, the platform works on ciphered material directly, reducing exposure while increasing processing speed more than fourfold. It is engineered to meet existing federal infrastructure where it stands, offering clarity on global threat patterns, supply chain fragility, and emerging challenges.
              </p>

              <p className="leading-relaxed italic font-display text-gray-700 dark:text-gray-200">
                &ldquo;This contract marks a shift in how we approach national security intelligence,&rdquo; said Dr. Elena Rodriguez, Chief Executive of QuantumEdge Analytics. &ldquo;Our quantum-enhanced AI gives analysts sharper tools to anticipate evolving threats in an increasingly complex landscape.&rdquo;
              </p>
            </div>
          </article>

          <div className="newspaper-rule mt-12 mb-6" />

          <Highlights items={highlights} />

          <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs uppercase tracking-[0.14em] text-gray-700 dark:text-gray-300 gap-2">
            <span>QuantumEdge Analytics Corporation</span>
            <span>Press Office · press@quantumedge.com</span>
          </footer>
        </div>
      </main>
    </div>
  )
}

