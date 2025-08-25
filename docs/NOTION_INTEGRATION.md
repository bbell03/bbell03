# Notion Integration Guide

This guide explains how to set up and use the streamlined Notion integration for importing blog posts.

## Overview

The new Notion integration provides:
- **Intelligent Caching**: Reduces API calls and improves performance
- **Automatic Sync**: Keeps your blog content up-to-date with Notion
- **Better Error Handling**: Graceful fallbacks and detailed logging
- **Content Validation**: Ensures proper formatting and metadata
- **Cleanup**: Removes old files automatically

## Setup

### 1. Environment Variables

Create a `.env.local` file in your project root:

```bash
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

### 2. Notion Database Schema

Your Notion database should have the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| Title | Title | ✅ | The blog post title |
| Slug | Text | ✅ | URL-friendly identifier |
| Date | Date | ✅ | Publication date |
| Tags | Multi-select | ❌ | Categories/tags |
| Summary | Text | ❌ | Brief description |
| Draft | Checkbox | ❌ | Whether post is draft |
| Authors | Multi-select | ❌ | Author names |
| Cover | Files & Media | ❌ | Cover image |

### 3. Notion API Setup

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the integration token
4. Share your database with the integration

## Usage

### Manual Sync

```bash
npm run sync-notion
```

### Automatic Sync (Development)

The integration runs automatically during build:

```bash
npm run build
```

### Watch Mode (Development)

```bash
npm run sync-notion:watch
```

## Configuration

Edit `lib/notion-config.ts` to customize:

- Database property names
- Content processing options
- Caching behavior
- Export settings

## File Structure

```
data/blog/notion/
├── cache/
│   ├── notion-cache.json      # Cached content
│   └── cache-metadata.json    # Cache metadata
├── post-1.mdx                 # Generated MDX files
├── post-2.mdx
└── ...
```

## Troubleshooting

### Common Issues

1. **"Missing environment variables"**
   - Ensure `.env.local` exists with correct values
   - Restart your development server

2. **"Failed to fetch Notion posts"**
   - Check your API key is correct
   - Verify database ID is correct
   - Ensure integration has access to database

3. **"Content not updating"**
   - Clear cache: delete `data/blog/notion/cache/`
   - Run sync manually: `npm run sync-notion`

4. **"Poor content formatting"**
   - Check Notion page structure
   - Ensure proper heading hierarchy
   - Verify rich text formatting

### Debug Mode

Enable debug logging by setting:

```bash
DEBUG=notion:* npm run sync-notion
```

## Advanced Features

### Custom Content Processing

Extend the `NotionClient` class in `lib/notion-client.ts` to add custom processing:

```typescript
class CustomNotionClient extends NotionClient {
  protected async processNotionPage(page: any): Promise<NotionBlogPost | null> {
    const post = await super.processNotionPage(page);
    
    // Add custom processing here
    if (post) {
      post.content = this.customProcessContent(post.content);
    }
    
    return post;
  }
}
```

### Custom MDX Templates

Modify the `generateMDXContent` method to use custom templates:

```typescript
private generateMDXContent(post: NotionBlogPost): string {
  return `---
title: "${post.title}"
date: "${post.date}"
tags: ${JSON.stringify(post.tags)}
draft: ${post.draft}
summary: "${post.summary || ''}"
layout: "PostLayout"
authors: ${JSON.stringify(post.authors)}
${post.cover ? `cover: "${post.cover}"` : ''}
lastmod: "${post.lastModified}"
---

${post.content}
`.trim();
}
```

## Performance Optimization

### Caching Strategy

- **Content Hash**: Detects changes efficiently
- **Time-based**: Respects cache duration settings
- **Fallback**: Uses cached content on API failures

### API Rate Limiting

The integration respects Notion's rate limits:
- Automatic retry with exponential backoff
- Request throttling
- Graceful error handling

## Monitoring

### Logs

The integration provides detailed logging:
- ✅ Success messages
- ⚠️ Warnings
- ❌ Error messages
- 🔄 Progress indicators

### Metrics

Track sync performance:
- Posts processed
- Cache hit rate
- API response times
- Error rates

## Best Practices

1. **Database Organization**
   - Use consistent naming conventions
   - Keep properties simple and clear
   - Use tags for categorization

2. **Content Structure**
   - Use proper heading hierarchy
   - Include summaries for all posts
   - Add cover images when possible

3. **Workflow**
   - Write in Notion
   - Preview locally
   - Deploy when ready

4. **Maintenance**
   - Regular cache cleanup
   - Monitor API usage
   - Update integration token periodically
