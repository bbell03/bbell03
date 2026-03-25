# Blog Management Guide

This guide covers all aspects of managing the blog, including local MDX content and the Notion integration.

## 1. Professional Newspaper Aesthetic
The blog uses a "newspaper" aesthetic with a paper-fiber background and high-quality typography.
- **Font Switching**: Users can toggle between **Courier** (Typewriter/Journal) and **Garamond** (Modern/High-end) via the global header.
- **Styling**: All blog posts are rendered via `UnifiedBlogLayout` which enforces the standard styling.

---

## 2. Managing Content

### Option A: Local MDX (Recommended for core content)
1. Add your `.mdx` files to `data/blog/`.
2. Ensure the frontmatter includes the required fields:
   ```yaml
   title: "Your Post Title"
   date: "2026-03-25"
   tags: ["engineering", "design"]
   summary: "A brief description of the post."
   draft: false
   ```

### Option B: Notion Integration
1. **Sync**: Run `npm run sync-notion` to import posts from your Notion database.
2. **Setup**: Ensure your `.env.local` has `NOTION_API_KEY` and `NOTION_DATABASE_ID`.
3. **Database Rules**: Your Notion database must have `Title`, `Slug`, `Date`, `Tags`, `Summary`, `Draft`, and `Layout` properties.

---

## 3. Advanced Layouts & Customization

### Blog Layouts
- **UnifiedBlogLayout**: The standard newspaper layout for individual articles.
- **BlogLayoutSystem**: The main blog landing page with search and pagination.
- **ListLayoutWithTags**: Used for the tag-filtered views.

### Troubleshooting Contentlayer
If you see "extra fields" warnings, check `contentlayer.config.ts`. We have added `format` and `source` to the allowed fields.

---

## 4. Maintenance

### Cleaning the Cache
If the Notion sync is stuck or showing incorrect data:
```bash
rm -rf data/blog/notion/cache/
npm run sync-notion
```

### Search Index
The search index is automatically generated during the build process to ensure users can find your content efficiently.
