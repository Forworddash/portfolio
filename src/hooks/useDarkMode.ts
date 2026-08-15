import { useState, useEffect } from 'react';

// The `dark` class is applied before first paint by the inline script in
// index.html, which reads the same key and falls back the same way. This hook
// owns the class from mount onward; the two must agree or the theme flips on
// hydration. Changing the logic here means changing that script — and
// recomputing the sha256- value in the CSP that allows it to run.
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  return { isDark, toggleDarkMode: () => setIsDark(!isDark) };
}
