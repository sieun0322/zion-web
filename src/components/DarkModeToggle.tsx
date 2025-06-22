'use client';
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
    onClick={toggleDarkMode}
    aria-label="Toggle Dark Mode"
    className={`relative w-14 h-8 rounded-full transition-colors duration-300
      ${isDark ? 'bg-teal-500' : 'bg-orange-400'}`}
  >
    <span
      className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-300
        ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
    />
    <span className="sr-only">Toggle Dark Mode</span>
  </button>
  );
}
