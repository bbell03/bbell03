import Link from 'next/link'

export interface HighlightItem {
  title: string
  dek: string
  time: string
  href?: string
}

interface HighlightsProps {
  items: HighlightItem[]
  title?: string
  /** 'list' = vertical list (article page); 'grid' = 3-col with dividers (newspaper style) */
  variant?: 'list' | 'grid'
  /** Right-side header label for grid variant (e.g. "Editors' Desk") */
  rightLabel?: string
}

export function Highlights({
  items,
  title = 'More to Read',
  variant = 'list',
  rightLabel = "Editors' Desk",
}: HighlightsProps) {
  if (items.length === 0) return null

  if (variant === 'grid') {
    const gridItems = items.slice(0, 6)
    return (
      <section className="mt-12">
        <div className="highlights-section-header">
          <span>{title}</span>
          <span>{rightLabel}</span>
        </div>
        <div className="highlights-grid">
          {gridItems.map((item, index) => (
            <div key={index} className="highlights-grid-item">
              {item.href ? (
                <Link href={item.href} className="block group">
                  <span className="headline text-base font-playfair font-bold text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2 block mb-2">
                    {item.title}
                  </span>
                  {item.dek && (
                    <p className="deck text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                      {item.dek}
                    </p>
                  )}
                  <span className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-500">
                    {item.time}
                  </span>
                </Link>
              ) : (
                <>
                  <span className="headline text-base block mb-2">{item.title}</span>
                  {item.dek && <p className="deck text-sm mb-2">{item.dek}</p>}
                  <span className="font-mono text-[11px] uppercase">{item.time}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mt-12">
      <h2 className="highlights-title">{title}</h2>
      <div className="highlights-list">
        {items.map((item, index) => {
          const content = (
            <>
              <span className="highlights-item-title">{item.title}</span>
              {item.dek && (
                <p className="highlights-item-dek">{item.dek}</p>
              )}
              <span className="highlights-item-time">{item.time}</span>
            </>
          )
          return (
            <div key={index} className="highlights-item">
              {item.href ? (
                <Link href={item.href} className="block group">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
