# Developer Portfolio

A modern, high-performance portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design with smooth animations, project filtering, and open source contribution showcase.

## ✨ Features

- **Single Page Application** with smooth scrolling navigation
- **About Section** with profile image and introduction
- **Projects Section** with filtering by programming language tags
- **Open Source Contributions** section with GitHub links
- **Responsive Design** optimized for all devices
- **Performance Optimized** with code splitting and lazy loading
- **Security Headers** implemented for production
- **SEO Friendly** with meta tags
- **Smooth Animations** using Tailwind CSS

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Modern ES6+** - Latest JavaScript features

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build for Production

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📝 Customization

### Update Your Information

1. **Profile Image**: Update the image URL in `src/components/About.tsx`
2. **About Text**: Edit the lorem ipsum text in `src/components/About.tsx`
3. **Projects**: Modify `src/data.ts` to add your own projects
4. **Open Source Contributions**: Update `src/data.ts` with your contributions
5. **GitHub Links**: Replace placeholder URLs throughout the components
6. **Contact Info**: Update social links in `src/components/Footer.tsx`

### Adding New Projects

Edit `src/data.ts`:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'Your Project',
    description: 'Project description',
    tags: ['TypeScript', 'React', 'Node.js'],
    githubUrl: 'https://github.com/yourusername/project',
    liveUrl: 'https://yourproject.com', // Optional
  },
  // Add more projects...
];
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify

1. Push your code to GitHub
2. Connect your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

```bash
npm run build
# Deploy the dist folder to GitHub Pages
```

## 🔒 Security Features

- Content Security Policy (CSP)
- X-Frame-Options header
- X-Content-Type-Options header
- Referrer Policy
- No console logs in production
- Sanitized external links (noopener, noreferrer)

## ⚡ Performance

- Code splitting for optimal loading
- Lazy loading of components
- Optimized images
- Minified production build
- Minimal JavaScript bundle size

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
