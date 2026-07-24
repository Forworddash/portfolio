import type { Project, OpenSourceContribution } from './types';

export const projects: Project[] = [
  {
    id: '5',
    title: 'CrunchPDF',
    description: 'Browser-based PDF tools with no backend and no upload path. Compression runs client-side via Ghostscript compiled to WebAssembly inside a Web Worker, behind a swappable engine interface so the AGPL dependency stays isolated to one directory (enforced in CI).',
    tags: ['TypeScript', 'WebAssembly', 'Web Workers', 'Vite'],
    githubUrl: 'https://github.com/Forworddash/CrunchPDF',
    liveUrl: '',
  },
  {
    id: '6',
    title: 'Parsnip',
    description: 'A high-performance EDI parser and translation engine in Rust. Parses X12 and EDIFACT through a four-layer structural pipeline, then translates to business JSON (850 POs, 810 Invoices, 997 Acks) at ~1.6µs per document, with streaming support for files larger than memory.',
    tags: ['Rust', 'Parsing', 'EDI', 'JSON'],
    githubUrl: 'https://github.com/Forworddash/Parsnip',
    liveUrl: '',
  },
  {
    id: '7',
    title: 'KanaBanana',
    description: 'A Kanban board built with React, TypeScript, and @dnd-kit. Supports multiple boards, drag-and-drop for both cards and columns, card detail modals with checklists and due dates, undo/redo, JSON export/import, and localStorage persistence.',
    tags: ['TypeScript', 'React', 'Vite', 'Drag & Drop'],
    githubUrl: 'https://github.com/Forworddash/KanaBanana',
    liveUrl: '',
  },
  {
    id: '8',
    title: 'RegexInt',
    description: 'A regular-expression interpreter written from scratch in TypeScript. Tokenizes and parses patterns into an AST with a recursive-descent parser, then matches input using a continuation-passing backtracking engine — the same design as PCRE-style engines.',
    tags: ['TypeScript', 'Parsing', 'CLI'],
    githubUrl: 'https://github.com/Forworddash/RegexInt',
    liveUrl: '',
  },
  {
    id: '9',
    title: 'Markdown2Blog',
    description: 'A markdown-to-blog static site generator in TypeScript. Turns a folder of frontmatter-tagged markdown files into a static site with post pages, tag pages, and an RSS feed, deriving titles, excerpts, and slugs when they are omitted.',
    tags: ['TypeScript', 'Node.js', 'Static Site', 'CLI'],
    githubUrl: 'https://github.com/Forworddash/Markdown2Blog',
    liveUrl: '',
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
