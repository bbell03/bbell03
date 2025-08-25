import { notFound } from "next/navigation"
import { allBlogs } from "contentlayer/generated"
import { format } from "date-fns"
import { Mdx } from "@/components/mdx-components"
import { serialize } from "next-mdx-remote/serialize"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import siteMetadata from "@/data/siteMetadata"
import TableOfContents from "@/components/TableOfContents"
import RelatedPosts from "@/components/RelatedPosts"

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const post = allBlogs.find((post) => post.slug === params.slug)
  if (!post) return null
  return post
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const mdxSource = await serialize(post.body.raw)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        {/* Main Content */}
        <article className="max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Summary */}
            {post.summary && (
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-source-serif">
                {post.summary}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
              </div>
              {post.readingTime?.minutes && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime.minutes} min read</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>By {siteMetadata.author}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>
          </header>

          {/* Featured Image */}
          {post.images && post.images[0] && (
            <div className="mb-12">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-slate-900 dark:prose-strong:text-white prose-code:text-slate-900 dark:prose-code:text-white prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20">
            <Mdx code={mdxSource} />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {siteMetadata.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {siteMetadata.author}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Software Engineer & Designer
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </footer>

          {/* Related Posts */}
          <RelatedPosts currentPost={post} />
        </article>

        {/* Sidebar */}
        <aside className="lg:pl-8">
          <TableOfContents headings={post.toc ? JSON.parse(post.toc) : []} />
        </aside>
      </div>
    </div>
  )
} 