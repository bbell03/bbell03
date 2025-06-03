var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

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

// contentlayer.config.ts
var import_siteMetadata = __toESM(require_siteMetadata());
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import fs from "fs";
import { writeFileSync } from "fs";
import readingTime from "reading-time";
import { slug } from "github-slugger";
import path from "path";
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
var NOTION_ENABLED = process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID;
var notion;
var n2m;
if (NOTION_ENABLED) {
  const { Client } = __require("@notionhq/client");
  const { NotionToMarkdown } = __require("notion-to-md");
  notion = new Client({ auth: process.env.NOTION_API_KEY });
  n2m = new NotionToMarkdown({ notionClient: notion });
}
async function translateNotionBlogsToMDX(databaseId, outputDir) {
  if (!NOTION_ENABLED)
    return;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const notionBlogs = await fetchNotionBlogs(databaseId);
  for (const blog of notionBlogs) {
    try {
      if (!blog.id) {
        console.error(`Blog ID is undefined for blog: ${blog.title}`);
        continue;
      }
      const pageContent = await notion.blocks.children.list({
        block_id: blog.id
      });
      const coverImage = blog.object?.cover?.type === "external" ? blog.object.cover.external.url : blog.object?.cover?.file?.url || "";
      const content = pageContent.results.map((block) => {
        switch (block.type) {
          case "paragraph":
            return block.paragraph.rich_text[0]?.plain_text || "";
          case "heading_1":
            return `# ${block.heading_1.rich_text[0]?.plain_text || ""}`;
          case "heading_2":
            return `## ${block.heading_2.rich_text[0]?.plain_text || ""}`;
          case "heading_3":
            return `### ${block.heading_3.rich_text[0]?.plain_text || ""}`;
          case "bulleted_list_item":
            return `- ${block.bulleted_list_item.rich_text[0]?.plain_text || ""}`;
          case "numbered_list_item":
            return `1. ${block.numbered_list_item.rich_text[0]?.plain_text || ""}`;
          case "quote":
            return `> ${block.quote.rich_text[0]?.plain_text || ""}`;
          case "code":
            return `\`\`\`
${block.code.rich_text[0]?.plain_text || ""}
\`\`\``;
          case "to_do":
            return `- [ ] ${block.to_do.rich_text[0]?.plain_text || ""}`;
          case "toggle":
            return `> ${block.toggle.rich_text[0]?.plain_text || ""}`;
          case "callout":
            return `> ${block.callout.rich_text[0]?.plain_text || ""}`;
          case "divider":
            return "---";
          case "image":
            const imageUrl = block.image.type === "external" ? block.image.external.url : block.image.file?.url || "";
            return `![${block.image.caption?.[0]?.plain_text || "Image"}](${imageUrl})`;
          default:
            return "";
        }
      }).filter(Boolean).join("\n\n");
      const mdxContent = `
---
title: "${blog.title}"
date: "${blog.date}"
tags: ${JSON.stringify(blog.tags)}
draft: ${blog.draft}
summary: "${blog.summary || ""}"
layout: "${blog.layout || "PostLayout"}"
authors: ${JSON.stringify(blog.authors || [])}
cover: "${coverImage}"
---

${content}
      `.trim();
      const filePath = path.join(outputDir, `${blog.slug}.mdx`);
      fs.writeFileSync(filePath, mdxContent, "utf8");
    } catch (error) {
      console.error(`Failed to fetch or save content for page: ${blog.id}`, error);
    }
  }
}
async function fetchNotionBlogs(databaseId) {
  if (!NOTION_ENABLED)
    return [];
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.filter((page) => "properties" in page).map((page) => {
    const properties = page.properties;
    const getTextContent = (richTextArray) => {
      if (!richTextArray || richTextArray.length === 0)
        return "";
      const richTextItem = richTextArray[0];
      if ("text" in richTextItem && richTextItem.text.content) {
        return richTextItem.text.content;
      }
      return "";
    };
    const title = properties.Title?.type === "title" && properties.Title.title.length > 0 ? getTextContent(properties.Title.title) || "" : "Untitled";
    const slug2 = properties.Slug?.type === "rich_text" && properties.Slug.rich_text.length > 0 ? getTextContent(properties.Slug.rich_text) || "" : `notion-${page.id}`;
    const date = properties.Date?.type === "date" && properties.Date.date ? properties.Date.date.start : "1970-01-01";
    const tags = properties.Tags?.type === "multi_select" ? properties.Tags.multi_select.map((tag) => tag.name) : [];
    const summary = properties.Summary?.type === "rich_text" && properties.Summary.rich_text.length > 0 ? getTextContent(properties.Summary.rich_text) || "" : "";
    const draft = properties.Draft?.type === "checkbox" ? properties.Draft.checkbox : false;
    return {
      object: page,
      // Include the object property
      id: page.id,
      // Add the Notion page ID (UUID)
      page,
      // Add the page property
      title,
      slug: slug2,
      date,
      tags,
      summary,
      draft,
      layout: "PostLayout",
      authors: [],
      // Default to an empty array
      images: [],
      bibliography: "",
      canonicalUrl: ""
    };
  });
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
        image: doc.images ? doc.images[0] : import_siteMetadata.default.socialBanner,
        url: `${import_siteMetadata.default.siteUrl}/${doc._raw.flattenedPath}`
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
      [rehypeCitation, { path: path.join(root, "data") }],
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
      const notionOutputDir = path.join(process.cwd(), "data/blog/notion");
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
//# sourceMappingURL=compiled-contentlayer-config-NZNXYJZP.mjs.map
