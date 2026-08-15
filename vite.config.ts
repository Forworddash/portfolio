import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The GitHub Pages project path. Shared by `base` and the sitemap so the two
// can never drift. Moving to a custom domain means changing SITE_ORIGIN and,
// if the site then lives at the root, setting BASE to '/'.
const SITE_ORIGIN = 'https://forworddash.github.io';
const BASE = '/portfolio/';

// GitHub Pages has no SPA fallback, so a deep link like /portfolio/blog/my-post
// would 404 on refresh. Serving a copy of index.html as 404.html hands those
// requests to the router instead.
function githubPagesSpaFallback() {
  return {
    name: 'gh-pages-spa-fallback',
    apply: 'build' as const,
    closeBundle() {
      const dist = fileURLToPath(new URL('./dist/', import.meta.url));
      copyFileSync(`${dist}index.html`, `${dist}404.html`);
    },
  };
}

/**
 * Writes dist/sitemap.xml from the routes the router actually serves. Posts are
 * read from content/posts/ at build time — the same source src/blog.ts globs —
 * so publishing a post updates the sitemap without a second edit.
 *
 * Standalone pages under public/ are deliberately absent: they are shared by
 * direct link, and listing them here would be an open invitation to index them.
 */
function sitemap() {
  return {
    name: 'sitemap',
    apply: 'build' as const,
    closeBundle() {
      const postsDir = fileURLToPath(new URL('./content/posts/', import.meta.url));
      const dist = fileURLToPath(new URL('./dist/', import.meta.url));

      const urls: { loc: string; lastmod?: string }[] = [
        { loc: `${SITE_ORIGIN}${BASE}` },
        { loc: `${SITE_ORIGIN}${BASE}blog` },
      ];

      const posts = readdirSync(postsDir)
        .filter((file) => file.endsWith('.md'))
        .sort();

      for (const file of posts) {
        const raw = readFileSync(`${postsDir}${file}`, 'utf8');
        const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1] ?? '';

        // Mirrors the reader in src/blog.ts: quoted values, trailing comments.
        const field = (key: string) =>
          new RegExp(`^${key}\\s*:\\s*(.*)$`, 'm')
            .exec(frontmatter)?.[1]
            .replace(/\s+#.*$/, '')
            .trim()
            .replace(/^(["'])([\s\S]*)\1$/, '$2');

        // Drafts are dropped from builds, so they have no URL to advertise.
        if (field('draft')?.toLowerCase() === 'true') continue;

        const slug =
          field('slug') ||
          file
            .replace(/\.md$/, '')
            .replace(/^\d{4}-\d{2}-\d{2}-/, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        urls.push({
          loc: `${SITE_ORIGIN}${BASE}blog/${slug}`,
          lastmod: field('date') || /^(\d{4}-\d{2}-\d{2})-/.exec(file)?.[1],
        });
      }

      const escape = (value: string) =>
        value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const body = urls
        .map(({ loc, lastmod }) =>
          [
            '  <url>',
            `    <loc>${escape(loc)}</loc>`,
            ...(lastmod ? [`    <lastmod>${escape(lastmod)}</lastmod>`] : []),
            '  </url>',
          ].join('\n'),
        )
        .join('\n');

      writeFileSync(
        `${dist}sitemap.xml`,
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [react(), githubPagesSpaFallback(), sitemap()],
  build: {
    // Optimize for production
    minify: 'terser',
    // Terser type definitions can conflict with some TS setups. Cast to `any`
    // so we can keep `drop_console` without a type error.
    terserOptions: ({
      compress: {
        drop_console: true, // Remove console logs in production
      },
    } as any),
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    // Security headers for development
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
});
