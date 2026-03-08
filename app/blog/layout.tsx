import type { Metadata } from "next"
import BlogLayout from "@/components/blog/BlogLayout"

export const metadata: Metadata = {
  title: "Blog | Brandon Bell",
  description: "Articles and insights from Brandon Bell",
}

export default function BlogRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BlogLayout>{children}</BlogLayout>
}
