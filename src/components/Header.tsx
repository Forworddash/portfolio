import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('about')}
          className={`text-xl font-bold transition-colors ${
            scrolled ? 'text-slate-900' : 'text-slate-900'
          }`}
        >
          Portfolio
        </button>

        <div className="flex gap-8">
          {['About', 'Projects', 'Open Source'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                scrolled ? 'text-slate-700' : 'text-slate-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
