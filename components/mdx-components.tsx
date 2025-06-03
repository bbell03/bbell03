'use client'

import { MDXRemote } from 'next-mdx-remote'
import Image from './Image'
import Link from './Link'
import TableWrapper from './TableWrapper'

const components = {
  Image,
  a: Link,
  table: TableWrapper,
}

export function Mdx({ code }: { code: string }) {
  return <MDXRemote {...code} components={components} />
} 