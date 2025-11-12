import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function BlogPagination({ 
  currentPage, 
  totalPages, 
  basePath = '/blog' 
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-center mt-16" aria-label="Blog pagination">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        {currentPage > 1 && (
          <Link
            href={currentPage === 2 ? basePath : `${basePath}/page/${currentPage - 1}`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Link>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-slate-400 dark:text-slate-500"
                >
                  ...
                </span>
              )
            }

            const isCurrent = page === currentPage
            const href = page === 1 ? basePath : `${basePath}/page/${page}`

            return (
              <Link
                key={page}
                href={href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {page}
              </Link>
            )
          })}
        </div>

        {/* Next Button */}
        {currentPage < totalPages && (
          <Link
            href={`${basePath}/page/${currentPage + 1}`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </nav>
  )
}
