'use client'

import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from './Image'
import Link from './Link'
import TableWrapper from './TableWrapper'

const components = {
  // Map HTML elements to theme-consistent components
  img: (props: any) => (
    <Image {...props} alt={props.alt || ''} className={`rounded-xl border border-slate-200 dark:border-slate-800 ${props.className || ''}`} />
  ),
  Image,
  a: (props: any) => (
    <Link {...props} className={`text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 ${props.className || ''}`} />
  ),
  h1: (props: any) => (
    <h1 {...props} className={`font-playfair text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mt-8 mb-4 ${props.className || ''}`} />
  ),
  h2: (props: any) => (
    <h2 {...props} className={`font-playfair text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-white mt-10 mb-3 ${props.className || ''}`} />
  ),
  h3: (props: any) => (
    <h3 {...props} className={`font-playfair text-2xl lg:text-3xl font-semibold text-slate-900 dark:text-white mt-8 mb-2 ${props.className || ''}`} />
  ),
  p: (props: any) => (
    <p {...props} className={`font-source-serif text-slate-700 dark:text-slate-300 leading-relaxed ${props.className || ''}`} />
  ),
  ul: (props: any) => (
    <ul {...props} className={`list-disc pl-6 space-y-2 ${props.className || ''}`} />
  ),
  ol: (props: any) => (
    <ol {...props} className={`list-decimal pl-6 space-y-2 ${props.className || ''}`} />
  ),
  blockquote: (props: any) => (
    <blockquote {...props} className={`border-l-4 border-blue-500 bg-blue-50/60 dark:bg-blue-900/20 px-4 py-2 my-4 rounded ${props.className || ''}`} />
  ),
  code: (props: any) => (
    <code {...props} className={`px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${props.className || ''}`} />
  ),
  table: (props: any) => <TableWrapper {...props} />,
}

export function Mdx({ code }: { code: MDXRemoteSerializeResult }) {
  return <MDXRemote {...code} components={components} />
}