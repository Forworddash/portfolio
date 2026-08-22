import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Contact from './components/Contact';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import { useDocumentMeta } from './hooks/useDocumentMeta';
import './App.css';

const HOME_DESCRIPTION =
  'Full-stack developer and EDI consultant. Built an in-house EDI platform from scratch — 30+ trading-partner integrations, AS2, X12 mapping, chargeback remediation.';

function Home() {
  useDocumentMeta({
    title: 'Samuel Baker — Developer & EDI Consultant',
    description: HOME_DESCRIPTION,
    path: '/',
  });

  return (
    <>
      <About />
      <Projects />
      <OpenSource />
      <Contact />
    </>
  );
}

function NotFound() {
  const location = useLocation();

  // GitHub Pages serves 404.html with a 200 status, so a crawler cannot tell
  // this apart from a real page — noindex is what keeps it out of the index.
  useDocumentMeta({
    title: 'Page not found — Samuel Baker',
    description: 'There is nothing at this address.',
    path: location.pathname,
    noindex: true,
  });

  return (
    <section className="min-h-screen bg-white dark:bg-slate-900 px-6 pt-32 pb-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Page not found</h1>
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
