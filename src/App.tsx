import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import './App.css';

function Home() {
  return (
    <>
      <About />
      <Projects />
      <OpenSource />
    </>
  );
}

function NotFound() {
  return (
    <section className="min-h-screen bg-white dark:bg-slate-900 px-6 pt-32 pb-20">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Page not found</h3>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          There's nothing at this address.
        </p>
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          ← Back home
        </Link>
      </div>
    </section>
  );
}

function App() {
  return (
    // BASE_URL is '/portfolio/' — the GitHub Pages project path from vite.config.ts.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen dark:bg-slate-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
