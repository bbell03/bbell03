import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer2/source-files';
import fs from 'fs';
import { writeFileSync } from 'fs';
import readingTime from 'reading-time';
import { slug } from 'github-slugger';
import path from 'path';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
// Remark packages
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { remarkAlert } from 'remark-github-blockquote-alert';
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js';
// Rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';
// Use CommonJS require for siteMetadata to avoid default export issues
// eslint-disable-next-line @typescript-eslint/no-var-requires
const siteMetadata = require('./data/siteMetadata');
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import type { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
// --- Notion integration ---
const NOTION_ENABLED = process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID;

type Blog = {
  object?: PageObjectResponse;
  id?: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  summary?: string;
  draft?: boolean;
  layout?: string;
  authors?: string[];
  images?: any[];
  bibliography?: string;
  canonicalUrl?: string;
};

// Defer importing the Notion client to runtime only when enabled

export async function translateNotionBlogsToMDX(databaseId: string, outputDir: string) {
  if (!NOTION_ENABLED) {
    console.log('Notion integration is disabled. Skipping Notion blog import.');
    return;
  }

  try {
    console.log('🔄 Syncing Notion content...');
    const { notionClient } = await import('./lib/notion-client.mjs');
    const posts = await notionClient.fetchBlogPosts(databaseId);
    await notionClient.exportToMDX(posts, outputDir);
    console.log('✅ Notion content synced successfully');
  } catch (error) {
    console.error('❌ Failed to sync Notion content:', error);
  }
}

// This function is now handled by the notionClient
export async function fetchNotionBlogs(databaseId: string): Promise<Blog[]> {
  if (!NOTION_ENABLED) return [];
  
  try {
    const { notionClient } = await import('./lib/notion-client.mjs');
    const posts = await notionClient.fetchBlogPosts(databaseId);
    return posts.map(post => ({
      object: undefined,
      id: post.id,
      title: post.title,
      slug: post.slug,
      date: post.date,
      tags: post.tags,
      summary: post.summary,
      draft: post.draft,
      layout: post.layout,
      authors: post.authors,
      images: post.cover ? [post.cover] : [],
      bibliography: '',
      canonicalUrl: '',
    }));
  } catch (error) {
    console.error('Failed to fetch Notion blogs:', error);
    return [];
  }
}

const root = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';

// Heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l-1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
);

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {};
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount));
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    );
    // console.log('Local search index generated...');
  }
}

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFilePath,
    },
  },
}));

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    cover: { type: 'string' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}));


export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs: importedBlogs } = await importData();
    const allBlogs: Blog[] = importedBlogs.map((blog, index) => ({
      object: undefined, // No Notion object for non-Notion blogs
      id: blog.slug || `default-id-${index}`,
      title: blog.title,
      slug: blog.slug,
      date: blog.date,
      tags: blog.tags,
      summary: blog.summary,
      draft: blog.draft,
      layout: blog.layout,
      authors: blog.authors,
      images: blog.images,
      bibliography: blog.bibliography,
      canonicalUrl: blog.canonicalUrl,
    }));

    // Example usage of 'allBlogs' to avoid unused variable warnings
    allBlogs.forEach((blog) => {
      // console.log(`Blog Title: ${blog.title}, ID: ${blog.id}`);
    });

    if (NOTION_ENABLED) {
      // Translate Notion blogs to MDX and save them
      const notionOutputDir = path.join(process.cwd(), 'data/blog/notion');
      await translateNotionBlogsToMDX(process.env.NOTION_DATABASE_ID || '', notionOutputDir);
      console.log('Notion blogs have been translated to MDX and saved.');
    } else {
      console.log('Notion integration is disabled. Skipping Notion blog import.');
    }
  },
});
