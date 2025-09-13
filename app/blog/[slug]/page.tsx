import { notFound } from "next/navigation"
import { allBlogs } from "contentlayer/generated"
import { Mdx } from "@/components/mdx-components"
import { serialize } from "next-mdx-remote/serialize"
import UnifiedBlogLayout from "@/components/UnifiedBlogLayout"
import ServerRelatedPosts from "@/components/ServerRelatedPosts"

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
    <>
      <UnifiedBlogLayout content={post}>
        <Mdx code={mdxSource} />
      </UnifiedBlogLayout>
      <ServerRelatedPosts currentPost={post} />
    </>
  )
} 