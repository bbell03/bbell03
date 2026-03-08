import { allBlogs } from 'contentlayer/generated'
import { Metadata } from 'next'

export async function generateStaticParams() {
  // Filter for single-level slugs (no nested paths)
  return allBlogs
    .filter((p) => !p.slug.includes('/'))
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((p) => p.slug === params.slug)
  if (!post) {
    return
  }

  // Re-export from [...slug] for the actual page rendering
  const { generateMetadata: generateMetadataNested } = await import('../[...slug]/page')
  return generateMetadataNested({ params: { slug: [params.slug] } })
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Re-export from [...slug] for the actual page rendering
  const PageComponent = (await import('../[...slug]/page')).default
  return <PageComponent params={{ slug: [params.slug] }} />
}