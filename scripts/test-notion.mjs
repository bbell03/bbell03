#!/usr/bin/env node

// Load environment variables from .env.local BEFORE any imports
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { NotionClient } from '../lib/notion-client.mjs';
import { getNotionConfig } from '../lib/notion-config.mjs';

async function testNotionIntegration() {
  console.log('🧪 Testing Notion integration...');

  try {
    // Create NotionClient instance after environment variables are loaded
    const notionClient = new NotionClient();

    // Test configuration
    console.log('📋 Testing configuration...');
    const config = getNotionConfig();
    console.log('✅ Configuration valid');

    // Test API connection
    console.log('🔗 Testing API connection...');
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID not found in environment variables');
    }

    // Fetch a small sample of posts
    console.log('📥 Fetching test posts...');
    const posts = await notionClient.fetchBlogPosts(databaseId);
    
    console.log(`✅ Successfully fetched ${posts.length} posts`);
    
    if (posts.length > 0) {
      const samplePost = posts[0];
      console.log('\n📄 Sample post:');
      console.log(`  Title: ${samplePost.title}`);
      console.log(`  Slug: ${samplePost.slug}`);
      console.log(`  Date: ${samplePost.date}`);
      console.log(`  Tags: ${samplePost.tags.join(', ')}`);
      console.log(`  Content length: ${samplePost.content.length} characters`);
    }
    
    console.log('\n🎉 All tests passed! Notion integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testNotionIntegration();
