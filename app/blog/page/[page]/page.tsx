import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import BlogPagination from '@/components/blog/BlogPagination'
import { BlogCard } from '@/components/blog/BlogCard'

const POSTS_PER_PAGE = 9

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function Page({ params }: { params: { page: string } }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl lg:text-4xl font-playfair font-semibold text-slate-900 dark:text-white mb-4">
          Blog Posts
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Page {pageNumber} of {pagination.totalPages}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialDisplayPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <BlogPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  )
}
