import { ReactNode } from 'react'

/**
 * Newspaper-style callout box for MDX. Use in posts for key facts, pull quotes, or "Contract Particulars" style lists.
 * Renders with .notice-card styling (border, subtle background, rounded).
 */
export function NoticeCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="notice-card my-8">
      <h3 className="!mb-3 !text-lg">{title}</h3>
      <div className="space-y-2 text-sm md:text-base [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-6 [&>p]:leading-relaxed">
        {children}
      </div>
    </div>
  )
}
