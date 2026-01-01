export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface OpenSourceContribution {
  id: string;
  repo: string;
  description: string;
  prUrl: string;
  status: 'merged' | 'open' | 'closed';
}
