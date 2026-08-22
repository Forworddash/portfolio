import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

interface ScrollState {
  scrollTo?: string;
}

const SECTIONS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Open Source', id: 'opensource' },
  { label: 'Contact', id: 'contact' },
];

// scrollIntoView is JavaScript, so the `scroll-behavior: auto` that index.css
// forces under prefers-reduced-motion does not reach it.
function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Arriving home from another route: scroll once the sections have mounted.
  useEffect(() => {
    const target = (location.state as ScrollState | null)?.scrollTo;
    if (!isHome || !target) return;

    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: scrollBehavior() });
    });
    navigate('/', { replace: true, state: null });
  }, [isHome, location.state, navigate]);

  // Close the mobile menu whenever the route changes, and on Escape.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() });
  };

  const linkClasses = 'text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav aria-label="Main" className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('about')}
          className="text-xl font-bold text-slate-900 dark:text-white transition-colors"
        >
          Samuel Baker
        </button>

        {/* Desktop navigation. Below md it collapses into the menu button on the
            right — five items plus the theme toggle do not fit on a phone. */}
        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((section) => (
            <button key={section.id} onClick={() => scrollToSection(section.id)} className={linkClasses}>
              {section.label}
            </button>
          ))}

          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
              location.pathname.startsWith('/blog')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-700 dark:text-slate-300'
            }`}
            aria-current={location.pathname.startsWith('/blog') ? 'page' : undefined}
          >
            Blog
          </Link>

          <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden mt-4 px-6 pb-4 border-t border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col pt-4">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="py-3 text-left text-base font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {section.label}
              </button>
            ))}
            <Link
              to="/blog"
              className={`py-3 text-base font-medium transition-colors ${
                location.pathname.startsWith('/blog')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
              aria-current={location.pathname.startsWith('/blog') ? 'page' : undefined}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
      ) : (
        <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      )}
    </button>
  );
}
