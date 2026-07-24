import { marked } from 'marked';
import type { BlogPost } from './types';

// Every .md file under content/posts/ becomes a post. Vite inlines them at
// build time, so adding a file and committing is all it takes to publish.
const files = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

interface Frontmatter {
  [key: string]: string | string[];
}

/**
 * Minimal YAML-ish frontmatter reader. Deliberately not a full YAML parser —
 * it covers `key: value`, quoted values, inline arrays (`[a, b]`) and dashed
 * lists, which is everything the post format uses.
 */
function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Frontmatter = {};
  const lines = match[1].split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;

    const key = kv[1];
    let value = kv[2].trim();

    // A bare key introduces a dashed list on the following lines.
    if (!value) {
      const items: string[] = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        items.push(unquote(lines[++i].replace(/^\s*-\s+/, '').trim()));
      }
      if (items.length) data[key] = items;
      continue;
    }

    // Strip trailing comments on unquoted values (`draft: false # optional`).
    if (!/^["'[]/.test(value)) value = value.replace(/\s+#.*$/, '').trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => unquote(item.trim()))
        .filter(Boolean);
    } else {
      data[key] = unquote(value);
    }
  }

  return { data, body: raw.slice(match[0].length) };
}

function unquote(value: string): string {
  const quoted = /^(["'])([\s\S]*)\1$/.exec(value);
  return quoted ? quoted[2] : value;
}

function asString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value.join(', ');
  return value ?? '';
}

function asArray(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

/** `content/posts/2026-07-24-hello-world.md` -> `hello-world` */
function slugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? path;
  return filename
    .replace(/\.md$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Falls back to a `YYYY-MM-DD` prefix on the filename, then to the epoch. */
function dateFromPath(path: string): string {
  const filename = path.split('/').pop() ?? path;
  const match = /^(\d{4}-\d{2}-\d{2})-/.exec(filename);
  return match ? match[1] : '1970-01-01';
}

/** First paragraph of the body, with markdown syntax knocked off. */
function firstParagraph(body: string): string {
  const paragraph = body
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('```'));

  if (!paragraph) return '';

  return paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleFromBody(body: string, slug: string): string {
  const heading = /^#\s+(.+)$/m.exec(body);
  if (heading) return heading[1].trim();
  return slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

marked.setOptions({ gfm: true, breaks: false });

function toPost(path: string, raw: string): BlogPost {
  const { data, body } = parseFrontmatter(raw);
  const slug = asString(data.slug) || slugFromPath(path);
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: asString(data.title) || titleFromBody(body, slug),
    date: asString(data.date) || dateFromPath(path),
    description: asString(data.description) || firstParagraph(body),
    tags: asArray(data.tags),
    author: asString(data.author) || undefined,
    draft: asString(data.draft).toLowerCase() === 'true',
    html: marked.parse(body, { async: false }) as string,
    readingTime: Math.max(1, Math.round(words / 200)),
  };
}

// Drafts stay visible while running `npm run dev` and are dropped from builds.
export const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export const allTags: string[] = [...new Set(posts.flatMap((post) => post.tags))].sort();

/** Parsed as local time — `new Date('2026-07-24')` is UTC and can slip a day. */
export function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day) return date;
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
