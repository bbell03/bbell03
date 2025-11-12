'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: TocItem[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
          Table of Contents
        </h4>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`group flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeId === heading.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                style={{ paddingLeft: `${(heading.level - 1) * 16 + 12}px` }}
              >
                {heading.level > 2 && (
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                )}
                <span className="truncate">{heading.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
