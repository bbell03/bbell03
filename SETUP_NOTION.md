# Quick Setup Guide for Notion Integration

## 🚀 Step-by-Step Setup

### 1. Create Environment File
Create a `.env.local` file in your project root:

```bash
# Notion Integration Settings
NOTION_API_KEY=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

### 2. Get Your Notion API Key
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name it (e.g., "Blog Sync")
4. Copy the "Internal Integration Token"

### 3. Get Your Database ID
1. Open your Notion database
2. Copy the ID from the URL: `https://www.notion.so/workspace/DATABASE_ID?v=...`
3. The database ID is the long string after the workspace name

### 4. Share Your Database
1. In your Notion database, click "Share" (top right)
2. Click "Invite" and search for your integration name
3. Select it and give it access

### 5. Test the Integration
```bash
npm run test-notion
```

### 6. Sync Your Content
```bash
npm run sync-notion
```

### 7. Start Development
```bash
npm run dev
```

## 📋 Required Notion Database Properties

Your Notion database needs these properties:

| Property | Type | Required | Example |
|----------|------|----------|---------|
| Title | Title | ✅ | "My Blog Post" |
| Slug | Text | ✅ | "my-blog-post" |
| Date | Date | ✅ | 2025-01-01 |
| Tags | Multi-select | ❌ | ["tech", "blog"] |
| Summary | Text | ❌ | "Brief description" |
| Draft | Checkbox | ❌ | ☐ (unchecked = published) |
| Authors | Multi-select | ❌ | ["Your Name"] |
| Cover | Files & Media | ❌ | Image file |

## 🔧 Troubleshooting

### "NOTION_API_KEY environment variable is required"
- Make sure `.env.local` exists in your project root
- Restart your terminal/development server

### "Failed to fetch Notion posts"
- Check your API key is correct
- Verify database ID is correct
- Ensure integration has access to database

### "Module not found" errors
- Run `npm install` to ensure all dependencies are installed

## 📚 Next Steps

1. **Test the integration**: `npm run test-notion`
2. **Sync your content**: `npm run sync-notion`
3. **Preview your blog**: `npm run dev`
4. **Build for production**: `npm run build`

Your Notion posts will appear in `data/blog/notion/` as MDX files and will be automatically included in your blog!
