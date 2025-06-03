import type { ReactNode } from "react"

interface SectionHeadingProps {
  children: ReactNode
  className?: string
}

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`font-playfair text-2xl font-light mb-6 relative inline-block ${className}`}>
      <span className="gradient-text">{children}</span>
      <span className="absolute -bottom-1 left-0 w-1/3 h-px bg-current opacity-30"></span>
    </h2>
  )
}
