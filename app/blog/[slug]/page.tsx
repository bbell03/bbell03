import { allBlogs } from 'contentlayer/generated'
import { Metadata } from 'next'

export async function generateStaticParams() {
  // Filter for single-level slugs (no nested paths)
  return allBlogs
    .filter((p) => !p.slug.includes('/'))
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const post = allBlogs.find((p) => p.slug === params.slug)
  if (!post) {
    return
  }

  // Re-export from [...slug] for the actual page rendering
  const { generateMetadata: generateMetadataNested } = await import('../[...slug]/page')
  return generateMetadataNested({ params: { slug: [params.slug] } })
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  // Re-export from [...slug] for the actual page rendering
  const PageComponent = (await import('../[...slug]/page')).default
  return <PageComponent params={{ slug: [params.slug] } as any} />
}