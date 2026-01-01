import type { Project, OpenSourceContribution } from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management and payment processing.',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://demo.example.com',
  },
  {
    id: '2',
    title: 'Task Management API',
    description: 'RESTful API for task management with authentication, rate limiting, and comprehensive testing.',
    tags: ['Python', 'FastAPI', 'MongoDB', 'Docker'],
    githubUrl: 'https://github.com/yourusername/task-api',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Real-time weather visualization with location-based forecasts and historical data analysis.',
    tags: ['JavaScript', 'Vue.js', 'Chart.js'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather.example.com',
  },
  {
    id: '4',
    title: 'Machine Learning Pipeline',
    description: 'Automated ML pipeline for data preprocessing, model training, and deployment.',
    tags: ['Python', 'TensorFlow', 'Kubernetes'],
    githubUrl: 'https://github.com/yourusername/ml-pipeline',
  },
  {
    id: '5',
    title: 'Portfolio Generator',
    description: 'CLI tool to generate customizable developer portfolios from JSON configuration.',
    tags: ['Rust', 'CLI'],
    githubUrl: 'https://github.com/yourusername/portfolio-gen',
  },
  {
    id: '6',
    title: 'Chat Application',
    description: 'Real-time chat with WebSocket support, message encryption, and file sharing.',
    tags: ['TypeScript', 'Socket.io', 'Redis'],
    githubUrl: 'https://github.com/yourusername/chat-app',
  },
];

export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: '1',
    repo: 'facebook/react',
    description: 'Fixed memory leak in useEffect hook cleanup',
    prUrl: 'https://github.com/facebook/react/pull/12345',
    status: 'merged',
  },
  {
    id: '2',
    repo: 'microsoft/vscode',
    description: 'Added TypeScript syntax highlighting improvements',
    prUrl: 'https://github.com/microsoft/vscode/pull/67890',
    status: 'merged',
  },
  {
    id: '3',
    repo: 'tailwindlabs/tailwindcss',
    description: 'Contributed new utility classes for grid layouts',
    prUrl: 'https://github.com/tailwindlabs/tailwindcss/pull/11111',
    status: 'open',
  },
  {
    id: '4',
    repo: 'nodejs/node',
    description: 'Performance optimization for stream processing',
    prUrl: 'https://github.com/nodejs/node/pull/22222',
    status: 'merged',
  },
];
