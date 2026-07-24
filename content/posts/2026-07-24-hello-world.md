---
title: Hello, world
date: 2026-07-24
description: How this blog works — drop a markdown file in content/posts/, commit, and it publishes itself.
tags: [meta, TypeScript]
author: Sam
draft: false
---

This blog has no database, no CMS, and no admin panel. Every post is a markdown
file in `content/posts/`. Vite reads them at build time with `import.meta.glob`,
so publishing is just:

```bash
git add content/posts/my-new-post.md
git commit -m "new post"
git push
```

The GitHub Actions workflow builds the site and pushes it to Pages. The post is
live a minute later.

## Frontmatter

Every field is optional. Omit one and it gets derived:

| Field | Default if omitted |
| --- | --- |
| `title` | the first `#` heading, then the filename |
| `date` | the `YYYY-MM-DD-` prefix on the filename |
| `description` | the first paragraph of the body |
| `tags` | none |
| `draft` | `false` |

A file named `2026-07-24-hello-world.md` becomes `/blog/hello-world` — the date
prefix keeps the directory sorted chronologically without leaking into the URL.

## Drafts

Set `draft: true` and the post shows up while running `npm run dev` but is
stripped from production builds. It's a way to keep work-in-progress in the repo
without publishing it.

That's the whole system. Write markdown, commit, done.
