var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// data/siteMetadata.js
var require_siteMetadata = __commonJS({
  "data/siteMetadata.js"(exports, module) {
    var siteMetadata2 = {
      title: "Software Engineering & Design",
      author: "Brandon Bell",
      headerTitle: "Brandon Bell",
      description: "A blog created with Next.js and Tailwind.css",
      language: "en-us",
      theme: "system",
      // system, dark or light
      siteUrl: "https://tailwind-nextjs-starter-blog.vercel.app",
      siteRepo: "https://github.com/timlrx/tailwind-nextjs-starter-blog",
      siteLogo: "/static/images/logo.png",
      socialBanner: "/static/images/twitter-card.png",
      mastodon: "https://mastodon.social/@mastodonuser",
      email: "address@yoursite.com",
      github: "https://github.com",
      x: "https://twitter.com/x",
      // twitter: 'https://twitter.com/Twitter',
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      linkedin: "https://www.linkedin.com",
      threads: "https://www.threads.net",
      instagram: "https://www.instagram.com",
      locale: "en-US",
      analytics: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
        umamiAnalytics: {
          // We use an env variable for this site to avoid other users cloning our analytics ID
          umamiWebsiteId: process.env.NEXT_UMAMI_ID
          // e.g. 123e4567-e89b-12d3-a456-426614174000
          // You may also need to overwrite the script if you're storing data in the US - ex:
          // src: 'https://us.umami.is/script.js'
          // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
        }
        // plausibleAnalytics: {
        //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
        // },
        // simpleAnalytics: {},
        // posthogAnalytics: {
        //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
        // },
        // googleAnalytics: {
        //   googleAnalyticsId: '', // e.g. G-XXXXXXX
        // },
      },
      newsletter: {
        // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
        // Please add your .env file and modify it according to your selection
        provider: "buttondown"
      },
      comments: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // Select a provider and use the environment variables associated to it
        // https://vercel.com/docs/environment-variables
        provider: "giscus",
        // supported providers: giscus, utterances, disqus
        giscusConfig: {
          // Visit the link below, and follow the steps in the 'configuration' section
          // https://giscus.app/
          repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
          repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
          category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
          categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
          mapping: "pathname",
          // supported options: pathname, url, title
          reactions: "1",
          // Emoji reactions: 1 = enable / 0 = disable
          // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
          metadata: "0",
          // theme example: light, dark, dark_dimmed, dark_high_contrast
          // transparent_dark, preferred_color_scheme, custom
          theme: "light",
          // theme when dark mode
          darkTheme: "transparent_dark",
          // If the theme option above is set to 'custom`
          // please provide a link below to your custom theme css file.
          // example: https://giscus.app/themes/custom_example.css
          themeURL: "",
          // This corresponds to the `data-lang="en"` in giscus's configurations
          lang: "en"
        }
      },
      search: {
        provider: "kbar",
        // kbar or algolia
        kbarConfig: {
          searchDocumentsPath: "search.json"
          // path to load documents to search
        }
        // provider: 'algolia',
        // algoliaConfig: {
        //   // The application ID provided by Algolia
        //   appId: 'R2IYF7ETH7',
        //   // Public API key: it is safe to commit it
        //   apiKey: '599cec31baffa4868cae4e79f180729b',
        //   indexName: 'docsearch',
        // },
      }
    };
    module.exports = siteMetadata2;
  }
});

// lib/notion-client.mjs
var notion_client_exports = {};
__export(notion_client_exports, {
  NotionClient: () => NotionClient
});
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs";
import path from "path";
import crypto from "crypto";
var NotionClient;
var init_notion_client = __esm({
  "lib/notion-client.mjs"() {
    NotionClient = class {
      constructor() {
        if (!process.env.NOTION_API_KEY) {
          throw new Error("NOTION_API_KEY environment variable is required");
        }
        this.client = new Client({ auth: process.env.NOTION_API_KEY });
        this.n2m = new NotionToMarkdown({ notionClient: this.client });
        this.cachePath = path.join(process.cwd(), "data/blog/notion/cache/notion-cache.json");
        this.cache = null;
      }
      async loadCache() {
        try {
          if (fs.existsSync(this.cachePath)) {
            const cacheData = fs.readFileSync(this.cachePath, "utf8");
            return JSON.parse(cacheData);
          }
        } catch (error) {
          console.warn("Failed to load cache:", error);
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
          console.error("Failed to save cache:", error);
        }
      }
      generateContentHash(posts) {
        const content = posts.map((p) => `${p.id}-${p.lastModified}`).join("|");
        return crypto.createHash("md5").update(content).digest("hex");
      }
      async fetchBlogPosts(databaseId) {
        this.cache = await this.loadCache();
        try {
          const response = await this.client.databases.query({
            database_id: databaseId,
            sorts: [{ property: "Date", direction: "descending" }]
            // Removed Draft filter - will include all posts for now
            // Add back when Draft property exists in database
          });
          const posts = [];
          for (const page of response.results) {
            if ("properties" in page) {
              const post = await this.processNotionPage(page);
              if (post) {
                posts.push(post);
              }
            }
          }
          const newContentHash = this.generateContentHash(posts);
          const hasChanged = !this.cache || this.cache.contentHash !== newContentHash || this.cache.databaseId !== databaseId;
          if (hasChanged) {
            this.cache = {
              lastFetched: (/* @__PURE__ */ new Date()).toISOString(),
              databaseId,
              posts: posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {}),
              contentHash: newContentHash
            };
            await this.saveCache(this.cache);
            console.log("Notion cache updated");
          } else {
            console.log("Using cached Notion content");
          }
          return posts;
        } catch (error) {
          console.error("Failed to fetch Notion posts:", error);
          if (this.cache) {
            return Object.values(this.cache.posts);
          }
          return [];
        }
      }
      async processNotionPage(page) {
        try {
          const properties = page.properties;
          const title = this.extractTextContent(properties.Title?.title) || "Untitled";
          const slug2 = this.extractTextContent(properties.Slug?.rich_text) || `notion-${page.id}`;
          const date = properties.Date?.date?.start || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const tags = properties.Tags?.multi_select?.map((tag) => tag.name) || [];
          const summary = this.extractTextContent(properties.Summary?.rich_text) || "";
          const draft = properties.Draft?.checkbox || false;
          const authors = properties.Authors?.multi_select?.map((author) => author.name) || [];
          if (draft)
            return null;
          const mdBlocks = await this.n2m.pageToMarkdown(page.id);
          const content = this.n2m.toMarkdownString(mdBlocks);
          const cover = page.cover?.type === "external" ? page.cover.external.url : page.cover?.file?.url || "";
          return {
            id: page.id,
            title,
            slug: slug2,
            date,
            tags,
            summary,
            draft,
            layout: "PostLayout",
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
        if (!richTextArray || richTextArray.length === 0)
          return "";
        return richTextArray.map((item) => item.plain_text || "").join("").trim();
      }
      async exportToMDX(posts, outputDir) {
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        for (const post of posts) {
          try {
            const mdxContent = this.generateMDXContent(post);
            const filePath = path.join(outputDir, `${post.slug}.mdx`);
            fs.writeFileSync(filePath, mdxContent, "utf8");
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
summary: "${(post.summary || "").replace(/"/g, '\\"')}"
layout: "${post.layout}"
authors: ${JSON.stringify(post.authors)}
${post.cover ? `cover: "${post.cover}"` : ""}
lastmod: "${post.lastModified}"
---

${post.content}
`.trim();
      }
    };
  }
});

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import { writeFileSync } from "fs";
import readingTime from "reading-time";
import { slug } from "github-slugger";
import path2 from "path";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkAlert } from "remark-github-blockquote-alert";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings
} from "pliny/mdx-plugins/index.js";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
var siteMetadata = require_siteMetadata();
var NOTION_ENABLED = process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID;
async function translateNotionBlogsToMDX(databaseId, outputDir) {
  if (!NOTION_ENABLED) {
    console.log("Notion integration is disabled. Skipping Notion blog import.");
    return;
  }
  try {
    console.log("\u{1F504} Syncing Notion content...");
    const { notionClient } = await Promise.resolve().then(() => (init_notion_client(), notion_client_exports));
    const posts = await notionClient.fetchBlogPosts(databaseId);
    await notionClient.exportToMDX(posts, outputDir);
    console.log("\u2705 Notion content synced successfully");
  } catch (error) {
    console.error("\u274C Failed to sync Notion content:", error);
  }
}
async function fetchNotionBlogs(databaseId) {
  if (!NOTION_ENABLED)
    return [];
  try {
    const { notionClient } = await Promise.resolve().then(() => (init_notion_client(), notion_client_exports));
    const posts = await notionClient.fetchBlogPosts(databaseId);
    return posts.map((post) => ({
      object: void 0,
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
      bibliography: "",
      canonicalUrl: ""
    }));
  } catch (error) {
    console.error("Failed to fetch Notion blogs:", error);
    return [];
  }
}
var root = process.cwd();
var isProduction = process.env.NODE_ENV === "production";
var icon = fromHtmlIsomorphic(
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
var computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath
  },
  toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) }
};
var Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
    },
    path: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath
    },
    filePath: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFilePath
    }
  }
}));
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "json" },
    cover: { type: "string" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`
      })
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          headingProperties: {
            className: ["content-header"]
          },
          content: icon
        }
      ],
      rehypeKatex,
      [rehypeCitation, { path: path2.join(root, "data") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify
    ]
  },
  onSuccess: async (importData) => {
    const { allBlogs: importedBlogs } = await importData();
    const allBlogs = importedBlogs.map((blog, index) => ({
      object: void 0,
      // No Notion object for non-Notion blogs
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
      canonicalUrl: blog.canonicalUrl
    }));
    allBlogs.forEach((blog) => {
    });
    if (NOTION_ENABLED) {
      const notionOutputDir = path2.join(process.cwd(), "data/blog/notion");
      await translateNotionBlogsToMDX(process.env.NOTION_DATABASE_ID || "", notionOutputDir);
      console.log("Notion blogs have been translated to MDX and saved.");
    } else {
      console.log("Notion integration is disabled. Skipping Notion blog import.");
    }
  }
});
export {
  Authors,
  Blog,
  contentlayer_config_default as default,
  fetchNotionBlogs,
  translateNotionBlogsToMDX
};
//# sourceMappingURL=compiled-contentlayer-config-NRTBCA7W.mjs.map
