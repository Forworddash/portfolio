export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
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
