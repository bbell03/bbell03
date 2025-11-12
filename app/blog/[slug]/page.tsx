import { notFound } from "next/navigation"
import { allBlogs } from "contentlayer/generated"
import { Mdx } from "@/components/blog/mdx-components"
import { serialize } from "next-mdx-remote/serialize"
import ArticleLayout from "@/components/blog/ArticleLayout"
import ServerRelatedPosts from "@/components/blog/ServerRelatedPosts"

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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).replace(/\//g, ' / ')
  }

  return (
    <ArticleLayout
      title={post.title}
      subtitle={post.summary}
      date={formatDate(post.date)}
      author="Brandon Bell"
      readingTime={post.readingTime?.minutes?.toString()}
    >
      <Mdx code={mdxSource} />
      <div className="mt-12">
        <ServerRelatedPosts currentPost={post} />
      </div>
    </ArticleLayout>
  )
} 