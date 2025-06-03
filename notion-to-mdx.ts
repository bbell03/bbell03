

// import { Client, PageObjectResponse, RichTextItemResponse } from '@notionhq/client';
// import { NotionToMarkdown } from 'notion-to-md'; // Install this library: npm install notion-to-md
// const notion = new Client({ auth: process.env.NOTION_API_KEY });
// const n2m = new NotionToMarkdown({ notionClient: notion });
// import path from 'path';
// import fs from 'fs';

// type Blog = {
//     page: object;
//     id?: string; // Add the Notion page ID (UUID)
//     title: string;
//     slug: string;
//     date: string;
//     tags: string[];
//     summary?: string;
//     draft?: boolean;
//     layout?: string;
//     authors?: string[];
//     images?: any[];
//     bibliography?: string;
//     canonicalUrl?: string;
//   };

// export async function fetchNotionBlogs(databaseId: string): Promise<Blog[]> {
//     const response = await notion.databases.query({ database_id: databaseId });
  
//     // console.log('Fetched Notion Blogs:', response.results);
  
//     return response.results
//       .filter((page): page is PageObjectResponse => 'properties' in page)
//       .map((page) => {
//         const properties = page.properties;
  
//         const getTextContent = (richTextArray: RichTextItemResponse[] | undefined): string => {
//           if (!richTextArray || richTextArray.length === 0) return '';
//           const richTextItem = richTextArray[0];
//           if ('text' in richTextItem && richTextItem.text.content) {
//             return richTextItem.text.content;
//           }
//           return '';
//         };
  
//         const title =
//           properties.Name?.type === 'title' && properties.Name.title.length > 0
//             ? getTextContent(properties.Name.title) || 'Untitled'
//             : 'Untitled';
  
//         const slug =
//           properties.Slug?.type === 'rich_text' && properties.Slug.rich_text.length > 0
//             ? getTextContent(properties.Slug.rich_text) || ''
//             : `notion-${page.id}`; // Use the page ID as a fallback for the slug
  
//         const date =
//           properties.Date?.type === 'date' && properties.Date.date
//             ? properties.Date.date.start
//             : '1970-01-01';
  
//         const tags =
//           properties.Tags?.type === 'multi_select'
//             ? properties.Tags.multi_select.map((tag) => tag.name)
//             : [];
  
//         const summary =
//           properties.Summary?.type === 'rich_text' && properties.Summary.rich_text.length > 0
//             ? getTextContent(properties.Summary.rich_text) || ''
//             : '';
  
//         const draft =
//           properties.Draft?.type === 'checkbox' ? properties.Draft.checkbox : false;
  
//         return {
//           object: page, // Include the object property
//           id: page.id, // Add the Notion page ID (UUID)
//           title,
//           slug,
//           date,
//           tags,
//           summary,
//           draft,
//           layout: 'PostLayout',
//           authors: [], // Default to an empty array
//           images: [],
//           bibliography: '',
//           canonicalUrl: '',
//         };
//       });
//   }

// export async function translateNotionBlogsToMDX(databaseId: string, outputDir: string) {
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true });
//     }
  
//     // Fetch Notion blogs
//     const notionBlogs: Blog[] = await fetchNotionBlogs(databaseId);
  
//     // Iterate through each blog and save as MDX
//     for (const blog of notionBlogs) {
//       try {
//         // Ensure the blog ID is defined
//         if (!blog.id) {
//           console.error(`Blog ID is undefined for blog: ${blog.title}`);
//           continue; // Skip this blog if ID is undefined
//         }
  
//         // Fetch page content from Notion using the page ID
//         console.log(`Fetching content for page: ${blog.id}`); // Log the UUID
//         const mdBlocks = await n2m.pageToMarkdown(blog.id); // Use the Notion page ID
//         const pageContent = n2m.toMarkdownString(mdBlocks);
  
//         // Handle empty or undefined content
//         const content = pageContent?.content?.trim() || 'No content available.';
  
//         // Generate MDX content
//         const mdxContent = `
//   ---
//   title: "${blog.title}"
//   date: "${blog.date}"
//   tags: ${JSON.stringify(blog.tags)}
//   draft: ${blog.draft}
//   summary: "${blog.summary || ''}"
//   layout: "${blog.layout || 'PostLayout'}"
//   authors: ${JSON.stringify(blog.authors || [])}
//   ---
  
//   ${content}
//         `.trim();
  
//         // Save the MDX file
//         const filePath = path.join(outputDir, `${blog.slug}.mdx`);
//         fs.writeFileSync(filePath, mdxContent, 'utf8');
//         console.log(`Saved Notion blog as MDX: ${filePath}`);
//       } catch (error) {
//         console.error(`Failed to fetch or save content for page: ${blog.id}`, error);
//       }
//     }
//   }