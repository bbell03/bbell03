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
import siteMetadata from './data/siteMetadata';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import type { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
// --- Notion integration DISABLED for now ---
const NOTION_ENABLED = process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID;

let notion, n2m;
if (NOTION_ENABLED) {
  const { Client } = require('@notionhq/client');
  const { NotionToMarkdown } = require('notion-to-md');
  notion = new Client({ auth: process.env.NOTION_API_KEY });
  n2m = new NotionToMarkdown({ notionClient: notion });
}

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

export async function translateNotionBlogsToMDX(databaseId: string, outputDir: string) {
  if (!NOTION_ENABLED) return; // Notion integration disabled
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Fetch Notion blogs
  const notionBlogs: Blog[] = await fetchNotionBlogs(databaseId);
  // console.log(notionBlogs);
  // console.log(notionBlogs[1].object);
  // Iterate through each blog and save as MDX
  for (const blog of notionBlogs) {
    try {
      // Ensure the blog ID is defined
      if (!blog.id) {
        console.error(`Blog ID is undefined for blog: ${blog.title}`);
        continue; // Skip this blog if ID is undefined
      }
      // console.log(blog);
      // Fetch page content from Notion using the page ID
      // console.log(`Fetching content for page: ${blog.id}`); // Log the UUID
      // const mdBlocks = await n2m.pageToMarkdown(blog.id); // Use the Notion page ID    6 
      // const pageContent = n2m.toMarkdownString(mdBlocks);
      const pageContent = await notion.blocks.children.list({
        block_id: blog.id,
      });

      // Get cover image if it exists
      const coverImage = blog.object?.cover?.type === 'external' 
        ? blog.object.cover.external.url 
        : blog.object?.cover?.file?.url || '';

      const content = pageContent.results
      .map((block: any) => {
        switch (block.type) {
          case 'paragraph':
            return block.paragraph.rich_text[0]?.plain_text || '';
          case 'heading_1':
            return `# ${block.heading_1.rich_text[0]?.plain_text || ''}`;
          case 'heading_2':
            return `## ${block.heading_2.rich_text[0]?.plain_text || ''}`;
          case 'heading_3':
            return `### ${block.heading_3.rich_text[0]?.plain_text || ''}`;
          case 'bulleted_list_item':
            return `- ${block.bulleted_list_item.rich_text[0]?.plain_text || ''}`;
          case 'numbered_list_item':
            return `1. ${block.numbered_list_item.rich_text[0]?.plain_text || ''}`;
          case 'quote':
            return `> ${block.quote.rich_text[0]?.plain_text || ''}`;
          case 'code':
            return `\`\`\`\n${block.code.rich_text[0]?.plain_text || ''}\n\`\`\``;
          case 'to_do':
            return `- [ ] ${block.to_do.rich_text[0]?.plain_text || ''}`;
          case 'toggle':
            return `> ${block.toggle.rich_text[0]?.plain_text || ''}`;
          case 'callout':
            return `> ${block.callout.rich_text[0]?.plain_text || ''}`;
          case 'divider':
            return '---';
          case 'image':
            const imageUrl = block.image.type === 'external' 
              ? block.image.external.url 
              : block.image.file?.url || '';
            return `![${block.image.caption?.[0]?.plain_text || 'Image'}](${imageUrl})`;
          default:
            return '';
        }
      })
      .filter(Boolean)
      .join('\n\n');

      //console.log(content);
      // Generate MDX content
      const mdxContent = `
---
title: "${blog.title}"
date: "${blog.date}"
tags: ${JSON.stringify(blog.tags)}
draft: ${blog.draft}
summary: "${blog.summary || ''}"
layout: "${blog.layout || 'PostLayout'}"
authors: ${JSON.stringify(blog.authors || [])}
cover: "${coverImage}"
---

${content}
      `.trim();

      // Save the MDX file
      const filePath = path.join(outputDir, `${blog.slug}.mdx`);
      fs.writeFileSync(filePath, mdxContent, 'utf8');
      // console.log(`Saved Notion blog as MDX: ${filePath}`);
    } catch (error) {
      console.error(`Failed to fetch or save content for page: ${blog.id}`, error);
    }
  }
}

export async function fetchNotionBlogs(databaseId: string): Promise<Blog[]> {
  if (!NOTION_ENABLED) return [];
  const response = await notion.databases.query({ database_id: databaseId });

  // console.log('Fetched Notion Blogs:', response.results);

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map((page) => {
      const properties = page.properties;

      const getTextContent = (richTextArray: RichTextItemResponse[] | undefined): string => {
        if (!richTextArray || richTextArray.length === 0) return '';
        const richTextItem = richTextArray[0];
        if ('text' in richTextItem && richTextItem.text.content) {
          return richTextItem.text.content;
        }
        return '';
      };

      const title =
        properties.Title?.type === 'title' && properties.Title.title.length > 0
          ? getTextContent(properties.Title.title) || ''
          : 'Untitled';

      const slug =
        properties.Slug?.type === 'rich_text' && properties.Slug.rich_text.length > 0
          ? getTextContent(properties.Slug.rich_text) || ''
          : `notion-${page.id}`; // Use the page ID as a fallback for the slug

      const date =
        properties.Date?.type === 'date' && properties.Date.date
          ? properties.Date.date.start
          : '1970-01-01';

      const tags =
        properties.Tags?.type === 'multi_select'
          ? properties.Tags.multi_select.map((tag) => tag.name)
          : [];

      const summary =
        properties.Summary?.type === 'rich_text' && properties.Summary.rich_text.length > 0
          ? getTextContent(properties.Summary.rich_text) || ''
          : '';

      const draft =
        properties.Draft?.type === 'checkbox' ? properties.Draft.checkbox : false;

      return {
        object: page, // Include the object property
        id: page.id, // Add the Notion page ID (UUID)
        page: page, // Add the page property
        title,
        slug,
        date,
        tags,
        summary,
        draft,
        layout: 'PostLayout',
        authors: [], // Default to an empty array
        images: [],
        bibliography: '',
        canonicalUrl: '',
      };
    });
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
