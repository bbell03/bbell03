import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Types for Notion integration
export class NotionClient {
  constructor() {
    if (!process.env.NOTION_API_KEY) {
      throw new Error('NOTION_API_KEY environment variable is required');
    }

    this.client = new Client({ auth: process.env.NOTION_API_KEY });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
    this.cachePath = path.join(process.cwd(), 'data/blog/notion/cache/notion-cache.json');
    this.cache = null;
  }

  async loadCache() {
    try {
      if (fs.existsSync(this.cachePath)) {
        const cacheData = fs.readFileSync(this.cachePath, 'utf8');
        return JSON.parse(cacheData);
      }
    } catch (error) {
      console.warn('Failed to load cache:', error);
    }
    return null;
  }

  async saveCache(cache) {
    try {
      const cacheDir = path.dirname(this.cachePath);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      fs.writeFileSync(this.cachePath, JSON.stringify(cache, null, 2));
    } catch (error) {
      console.error('Failed to save cache:', error);
    }
  }

  generateContentHash(posts) {
    const content = posts.map(p => `${p.id}-${p.lastModified}`).join('|');
    return crypto.createHash('md5').update(content).digest('hex');
  }

  async fetchBlogPosts(databaseId) {
    // Load existing cache
    this.cache = await this.loadCache();
    
    try {
      // Fetch from Notion API
      const response = await this.client.databases.query({
        database_id: databaseId,
        sorts: [{ property: 'Date', direction: 'descending' }]
        // Removed Draft filter - will include all posts for now
        // Add back when Draft property exists in database
      });

      const posts = [];

      for (const page of response.results) {
        if ('properties' in page) {
          const post = await this.processNotionPage(page);
          if (post) {
            posts.push(post);
          }
        }
      }

      // Check if content has changed
      const newContentHash = this.generateContentHash(posts);
      const hasChanged = !this.cache || 
                        this.cache.contentHash !== newContentHash ||
                        this.cache.databaseId !== databaseId;

      if (hasChanged) {
        // Update cache
        this.cache = {
          lastFetched: new Date().toISOString(),
          databaseId,
          posts: posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {}),
          contentHash: newContentHash
        };
        await this.saveCache(this.cache);
        console.log('Notion cache updated');
      } else {
        console.log('Using cached Notion content');
      }

      return posts;
    } catch (error) {
      console.error('Failed to fetch Notion posts:', error);
      // Return cached posts if available
      if (this.cache) {
        return Object.values(this.cache.posts);
      }
      return [];
    }
  }

  async processNotionPage(page) {
    try {
      const properties = page.properties;
      
      // Extract basic properties
      const title = this.extractTextContent(properties.Title?.title) || 'Untitled';
      const slug = this.extractTextContent(properties.Slug?.rich_text) || 
                   `notion-${page.id}`;
      const date = properties.Date?.date?.start || new Date().toISOString().split('T')[0];
      const tags = properties.Tags?.multi_select?.map((tag) => tag.name) || [];
      const summary = this.extractTextContent(properties.Summary?.rich_text) || '';
      const draft = properties.Draft?.checkbox || false;
      const authors = properties.Authors?.multi_select?.map((author) => author.name) || [];

      // Skip draft posts
      if (draft) return null;

      // Fetch page content
      const mdBlocks = await this.n2m.pageToMarkdown(page.id);
      const content = this.n2m.toMarkdownString(mdBlocks);

      // Extract cover image
      const cover = page.cover?.type === 'external' 
        ? page.cover.external.url 
        : page.cover?.file?.url || '';

      return {
        id: page.id,
        title,
        slug,
        date,
        tags,
        summary,
        draft,
        layout: 'PostLayout',
        authors,
        cover,
        content: content.parent,
        lastModified: page.last_edited_time || page.created_time
      };
    } catch (error) {
      console.error(`Failed to process page ${page.id}:`, error);
      return null;
    }
  }

  extractTextContent(richTextArray) {
    if (!richTextArray || richTextArray.length === 0) return '';
    return richTextArray
      .map(item => item.plain_text || '')
      .join('')
      .trim();
  }

  async exportToMDX(posts, outputDir) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const post of posts) {
      try {
        const mdxContent = this.generateMDXContent(post);
        const filePath = path.join(outputDir, `${post.slug}.mdx`);
        fs.writeFileSync(filePath, mdxContent, 'utf8');
        console.log(`Exported: ${post.slug}.mdx`);
      } catch (error) {
        console.error(`Failed to export ${post.slug}:`, error);
      }
    }
  }

  generateMDXContent(post) {
    return `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.date}"
tags: ${JSON.stringify(post.tags)}
draft: ${post.draft}
summary: "${(post.summary || '').replace(/"/g, '\\"')}"
layout: "${post.layout}"
authors: ${JSON.stringify(post.authors)}
${post.cover ? `cover: "${post.cover}"` : ''}
lastmod: "${post.lastModified}"
---

${post.content}
`.trim();
  }
}

// Export the class instead of an instance
// Scripts will instantiate it after loading environment variables
// export const notionClient = new NotionClient();
