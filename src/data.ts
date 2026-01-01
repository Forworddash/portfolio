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
    repo: 'LVoicechanger/Rust',
    description: 'Updated repository to modern Rust support and added error handling.',
    prUrl: 'https://github.com/sourcepirate/L-voice-changer/pull/4',
    status: 'merged',
  },
];
