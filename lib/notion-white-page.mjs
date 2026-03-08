const WHITE_PAGE_DEFAULTS = {
  layout: 'PostLayout',
  format: 'white-page',
  source: 'notion',
};

function escapeString(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n');
}

function normalizeDate(value) {
  if (!value) return undefined;
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
}

function shouldSkipField(value) {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return false;
}

function formatFrontMatter(frontMatter) {
  return Object.entries(frontMatter)
    .filter(([, value]) => !shouldSkipField(value))
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}: "${escapeString(value)}"`;
      }
      if (value instanceof Date) {
        return `${key}: "${value.toISOString()}"`;
      }
      if (Array.isArray(value) || typeof value === 'object') {
        return `${key}: ${JSON.stringify(value)}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');
}

export function createWhitePageFrontMatter(post, overrides = {}) {
  const base = {
    ...WHITE_PAGE_DEFAULTS,
    title: post.title,
    slug: post.slug,
    date: normalizeDate(post.date),
    lastmod: normalizeDate(post.lastModified),
    summary: post.summary,
    tags: post.tags,
    draft: post.draft,
  };

  return { ...base, ...overrides };
}

export function renderWhitePageDocument(post, options = {}) {
  const { overrides = {} } = options;
  const frontMatter = createWhitePageFrontMatter(post, overrides);
  const frontMatterBlock = formatFrontMatter(frontMatter);
  const body = (post.content || '').trim();

  return `---\n${frontMatterBlock}\n---\n\n${body}\n`;
}

export const WHITE_PAGE_MARKDOWN = {
  defaults: WHITE_PAGE_DEFAULTS,
  render: renderWhitePageDocument,
};

