export interface NotionDatabaseSchema {
  title: string;
  slug: string;
  date: string;
  tags: string;
  summary: string;
  draft: string;
  authors: string;
  cover: string;
}

export const NOTION_CONFIG = {
  // Database property names (adjust these to match your Notion database)
  properties: {
    title: 'Title',
    slug: 'Slug',
    date: 'Date',
    tags: 'Tags',
    summary: 'Summary',
    draft: 'Draft',
    authors: 'Authors',
    cover: 'Cover'
  } as NotionDatabaseSchema,

  // Content processing options
  content: {
    // Maximum content length to fetch (in characters)
    maxLength: 50000,
    
    // Whether to include images in the content
    includeImages: true,
    
    // Whether to include code blocks
    includeCodeBlocks: true,
    
    // Whether to include tables
    includeTables: true,
    
    // Whether to include callouts
    includeCallouts: true
  },

  // Caching options
  cache: {
    // Cache duration in milliseconds (24 hours)
    duration: 24 * 60 * 60 * 1000,
    
    // Whether to use cache in development
    useInDev: true,
    
    // Whether to use cache in production
    useInProd: true
  },

  // Export options
  export: {
    // Output directory for MDX files
    outputDir: 'data/blog/notion',
    
    // Whether to clean up old files
    cleanupOldFiles: true,
    
    // File naming convention
    namingConvention: 'slug' // 'slug' | 'id' | 'title'
  }
};

export function validateNotionConfig() {
  const requiredEnvVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export function getNotionConfig() {
  validateNotionConfig();
  return NOTION_CONFIG;
}
