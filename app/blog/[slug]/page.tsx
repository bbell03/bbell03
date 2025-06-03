import { notFound } from "next/navigation"
import { allBlogs } from "contentlayer/generated"
import { format } from "date-fns"
import { Mdx } from "@/components/mdx-components"

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

  return (
    <article className="prose prose-lg mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-4xl font-bold text-gray-900">{post.title}</h1>
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          {post.tags && (
            <div className="flex space-x-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <Mdx code={post.body.code} />
    </article>
  )
} 