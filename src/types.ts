export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  // Shown only in the detail modal. `details` is a longer write-up (paragraphs
  // split on blank lines); `highlights` is a feature/bullet list. Both optional
  // so a project with nothing extra still opens with its card description.
  details?: string;
  highlights?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  author?: string;
  draft: boolean;
  html: string;
  readingTime: number;
}

export interface OpenSourceContribution {
  id: string;
  repo: string;
  description: string;
  prUrl: string;
  status: 'merged' | 'open' | 'closed';
}
