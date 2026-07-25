import type { Project, OpenSourceContribution } from './types';
import parsnip1 from './assets/parsnip-1.png';
import parsnip2 from './assets/parsnip-2.png';
import md2blog1 from './assets/md2blog-1.png';
import crunchpdf1 from './assets/crunchpdf-1.png';
import crunchpdf2 from './assets/crunchpdf-2.png';
import crunchpdf3 from './assets/crunchpdf-3.png';
import kanaBanana1 from './assets/kanabanana-1.png';

export const projects: Project[] = [
  {
    id: '5',
    title: 'CrunchPDF',
    description: 'Browser-based PDF tools with no backend and no upload path. Compression runs client-side via Ghostscript compiled to WebAssembly inside a Web Worker, behind a swappable engine interface so the AGPL dependency stays isolated to one directory (enforced in CI).',
    tags: ['TypeScript', 'WebAssembly', 'Web Workers', 'Vite'],
    githubUrl: 'https://github.com/Forworddash/CrunchPDF',
    liveUrl: '',
    images: [crunchpdf1, crunchpdf2, crunchpdf3],
    details:
      'PDF tools that run entirely in the browser — your files are never uploaded. The site is fully static, so there is no server that could receive a document in the first place.\n\nCompression runs client-side in WebAssembly inside a Web Worker. The engine sits behind a narrow interface and is resolved lazily, today to Ghostscript compiled to WASM. The ~16MB engine is fetched on first use and cached by the browser, so it is never part of the initial page load.\n\nThe licensing seam is deliberate: only src/engines/ghostscript touches the AGPL dependency, and a CI check enforces the boundary. That means the compressor can be swapped for a permissively-licensed engine by pointing the registry at a different module, without rewriting the app.',
    highlights: [
      'Fully client-side — no backend, no upload path',
      'Ghostscript compiled to WebAssembly, run in a Web Worker',
      'Lazy ~16MB engine, cached after first use',
      'Isolated AGPL seam enforced in CI',
      'Compress first; merge and split next',
    ],
  },
  {
    id: '6',
    title: 'Parsnip',
    description: 'A high-performance EDI parser and translation engine in Rust. Parses X12 and EDIFACT through a four-layer structural pipeline, then translates to business JSON (850 POs, 810 Invoices, 997 Acks) at ~1.6µs per document, with streaming support for files larger than memory.',
    tags: ['Rust', 'Parsing', 'EDI', 'JSON'],
    githubUrl: 'https://github.com/Forworddash/Parsnip',
    liveUrl: '',
    images: [parsnip1, parsnip2],
    details:
      'A complete, high-performance Rust solution for parsing and translating X12 and EDIFACT EDI formats into business-ready JSON. Built for production EDI SaaS platforms and enterprise integration needs.\n\nThe pipeline runs from raw text through a four-layer structural parser (interchange envelopes, functional groups, transaction sets, and segment/element parsing) into a translation layer that converts EDI structure into clean business JSON. Transaction-specific translators handle 850 Purchase Orders, 810 Invoices, and 997 Functional Acknowledgments, with a generic fallback for unknown types.\n\nThe design keeps concerns strictly separate: the parser knows nothing about business rules, the translator knows nothing about parsing mechanics, and standard modules stay loosely coupled. Schema-driven validation layers are the next milestone.',
    highlights: [
      'Sub-microsecond parsing — ~1.6µs per EDI document',
      'Four-layer structural parser for X12 and EDIFACT',
      'Built-in translators: 850 POs, 810 Invoices, 997 Acks',
      'Streaming parser handles files larger than memory',
      'Byte-level error location and rich error context',
      '80+ tests plus criterion benchmarks',
    ],
  },
  {
    id: '7',
    title: 'KanaBanana',
    description: 'A Kanban board built with React, TypeScript, and @dnd-kit. Supports multiple boards, drag-and-drop for both cards and columns, card detail modals with checklists and due dates, undo/redo, JSON export/import, and localStorage persistence.',
    tags: ['TypeScript', 'React', 'Vite', 'Drag & Drop'],
    githubUrl: 'https://github.com/Forworddash/KanaBanana',
    liveUrl: '',
    images: [kanaBanana1],
    details:
      'A tiny Kanban board built with React, TypeScript, and Vite, with drag-and-drop by @dnd-kit and everything saved to localStorage — refresh-safe, with migration from an earlier single-board format.\n\nCards open a detail modal with a description, due date, and a checklist that drives a progress bar; badges on each card surface due dates, checklists, and notes at a glance. Drag reorders cards, moves them between columns, and reorders whole columns. Multiple boards live in header tabs.\n\nUndo/redo is the interesting part. Drag gestures fire many intermediate updates, so the history hook exposes a "replace" for the live drag and folds the whole gesture into a single undo step on drop — only if something actually moved.',
    highlights: [
      'Drag-and-drop cards and columns via @dnd-kit',
      'Card detail modal: description, due date, checklist, badges',
      'Multiple boards with header tabs',
      'Undo / redo with drag folded into single steps',
      'JSON export / import of everything',
      'localStorage persistence with format migration',
      'Light and dark theme following the OS',
    ],
  },
  {
    id: '8',
    title: 'RegexInt',
    description: 'A regular-expression interpreter written from scratch in TypeScript. Tokenizes and parses patterns into an AST with a recursive-descent parser, then matches input using a continuation-passing backtracking engine — the same design as PCRE-style engines.',
    tags: ['TypeScript', 'Parsing', 'CLI'],
    githubUrl: 'https://github.com/Forworddash/RegexInt',
    liveUrl: '',
    details:
      'A small regular-expression interpreter written in TypeScript as a learning project. It parses a pattern into an AST and matches input with a backtracking engine — the same overall design as PCRE-style regex engines.\n\nThe pipeline is short enough to hold in your head: a pattern string goes through a recursive-descent parser into an AST, then a continuation-passing matcher produces a result. Alternation binds loosest and quantifiers tightest, exactly like a real engine — and that precedence falls out of how the parser is layered rather than any explicit rule.\n\nIt is not a replacement for the built-in RegExp — that engine is faster and more complete. It is useful for understanding how regex actually works: tokenizing, recursive-descent parsing, and backtracking matching. A CLI prints whether a pattern matched, the span, captured groups, and the full parsed AST.',
    highlights: [
      'Recursive-descent parser producing a typed AST',
      'Continuation-passing backtracking matcher',
      'Precedence emerges from parser layering',
      'test / search / findAll and lazy quantifiers',
      'CLI that also prints the parsed AST',
      '~500 lines, written to be read',
    ],
  },
  {
    id: '9',
    title: 'Markdown2Blog',
    description: 'A markdown-to-blog static site generator in TypeScript. Turns a folder of frontmatter-tagged markdown files into a static site with post pages, tag pages, and an RSS feed, deriving titles, excerpts, and slugs when they are omitted.',
    tags: ['TypeScript', 'Node.js', 'Static Site', 'CLI'],
    images: [md2blog1],
    githubUrl: 'https://github.com/Forworddash/Markdown2Blog',
    liveUrl: '',
    details:
      'A tiny markdown-to-blog static site generator written in TypeScript. Drop markdown files in a content folder, run one command, and get a fast static site with post pages, tag pages, and an RSS feed.\n\nEvery .md file becomes a post. Frontmatter sets the title, date, description, tags, author, and draft flag — and anything omitted is derived: the title falls back to the filename, the excerpt to the first paragraph, and the slug to a URL-safe version of the title. Drafts are excluded from builds unless explicitly included.\n\nThe same idea powers the blog on this very site.',
    highlights: [
      'One command: markdown in, static site out',
      'Post pages, tag pages, and an RSS feed',
      'Frontmatter for title, date, tags, author, drafts',
      'Sensible fallbacks for title, excerpt, and slug',
      'GitHub-flavored markdown',
    ],
  },
  {
    id: '1',
    title: 'Travel Blog',
    description: 'Full-stack travel blog built with Hugo and TypeScript, featuring a custom admin portal for content management. Deployed on Netlify with a focus on performance, security, and developer experience.',
    tags: ['TypeScript', 'React', 'Node.js', 'Netlify'],
    githubUrl: 'https://github.com/Forworddash',
    liveUrl: 'https://travellingwithtoomany.com/',
  },
  {
    id: '2',
    title: 'Aliaser',
    description: 'A Rust command-line tool that allows users to create and manage custom Aliases and Passwords for various services. It securely stores data using AES-256-GCM with Argon2id key derivation. All data is stored locally on the users computer with no data collected',
    tags: ['Rust', 'CLI', 'Cryptography'],
    githubUrl: 'https://github.com/Forworddash/Aliaser',
    liveUrl: '',
  },
  {
    id: '3',
    title: 'Voice Modulator',
    description: 'A real-time voice modulation application built in Rust. It captures audio input from the microphone, applies various voice effects, and plays the modified audio through the speakers with minimal latency.',
    tags: ['Rust', 'Audio Processing', 'Real-time', 'CLI'],
    githubUrl: 'https://github.com/Forworddash/voice_modulator',
    liveUrl: '',
  },
  {
    id: '4',
    title: 'P2P File Sharing App',
    description: 'The Python project is a P2P (peer-to-peer) file transfer system comprising two main components: a server and a client. The project utilizes Python and the Tkinter library for creating a simple graphical user interface (GUI) for the client.',
    tags: ['Python', 'Tkinter', 'Socket Programming'],
    githubUrl: 'https://github.com/Forworddash/P2P-File-Transfer-Py',
    liveUrl: '',
  }
  // {
  //   id: '2',
  //   title: 'Task Management API',
  //   description: 'RESTful API for task management with authentication, rate limiting, and comprehensive testing.',
  //   tags: ['Python', 'FastAPI', 'MongoDB', 'Docker'],
  //   githubUrl: 'https://github.com/yourusername/task-api',
  // },
  
];

export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: '1',
    repo: 'LVoicechanger/Rust',
    description: 'Updated repository to modern Rust support and added error handling.',
    prUrl: 'https://github.com/sourcepirate/L-voice-changer/pull/4',
    status: 'merged',
  },
];
