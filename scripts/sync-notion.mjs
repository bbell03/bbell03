#!/usr/bin/env node

// Load environment variables from .env.local BEFORE any imports
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { NotionClient } from '../lib/notion-client.mjs';
import path from 'path';
import fs from 'fs';

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const OUTPUT_DIR = path.join(process.cwd(), 'data/blog/notion');

async function syncNotionContent() {
  console.log('🔄 Starting Notion content sync...');

  if (!NOTION_DATABASE_ID) {
    console.error('❌ NOTION_DATABASE_ID environment variable is required');
    process.exit(1);
  }

  try {
    // Create NotionClient instance after environment variables are loaded
    const notionClient = new NotionClient();

    // Fetch posts from Notion
    console.log('📥 Fetching posts from Notion...');
    const posts = await notionClient.fetchBlogPosts(NOTION_DATABASE_ID);
    
    if (posts.length === 0) {
      console.log('⚠️  No posts found in Notion database');
      return;
    }

    console.log(`✅ Found ${posts.length} posts`);

    // Export to MDX
    console.log('📝 Exporting to MDX...');
    await notionClient.exportToMDX(posts, OUTPUT_DIR);

    // Clean up old files that are no longer in Notion
    await cleanupOldFiles(posts);

    console.log('🎉 Notion sync completed successfully!');
  } catch (error) {
    console.error('❌ Failed to sync Notion content:', error);
    process.exit(1);
  }
}

async function cleanupOldFiles(currentPosts) {
  try {
    const currentSlugs = currentPosts.map(post => post.slug);
    const existingFiles = fs.readdirSync(OUTPUT_DIR)
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''));

    const filesToRemove = existingFiles.filter(slug => !currentSlugs.includes(slug));

    for (const slug of filesToRemove) {
      const filePath = path.join(OUTPUT_DIR, `${slug}.mdx`);
      fs.unlinkSync(filePath);
      console.log(`🗑️  Removed old file: ${slug}.mdx`);
    }
  } catch (error) {
    console.warn('⚠️  Failed to cleanup old files:', error);
  }
}

// Run the sync
syncNotionContent();
