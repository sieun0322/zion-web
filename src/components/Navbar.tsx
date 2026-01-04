'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import DarkModeToggle from './DarkModeToggle';
import Link from 'next/link';

const navItems: Array<{name: string, to: string, isExternal?: boolean}> = [
   { name: 'Home', to: '' },
  { name: 'About', to: 'about' },
  { name: 'Projects', to: 'projects' },
  { name: 'Works', to: '/works', isExternal: true },
  { name: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-light-bg/95 backdrop-blur-sm shadow-lg dark:bg-dark-bg/95' 
        : 'bg-light-bg dark:bg-dark-bg shadow-md'
    } text-light-text dark:text-dark-text`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/profile_character.png"
            alt="Sieun Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-light-accent dark:text-dark-accent">
            Sieun
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        {isHome && (
          <div className="hidden md:flex">
            <ul className="flex space-x-8 text-sm font-semibold items-center">
              {navItems.map((item) => (
                <li key={item.to} className="w-auto inline-block">
                  {item.isExternal ? (
                    <Link
                      href={item.to}
                      className="px-3 py-2 rounded-md hover:bg-light-soft dark:hover:bg-dark-accent/20 hover:text-light-accent dark:hover:text-dark-accent transition whitespace-nowrap block"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={`#${item.to}`}
                      className="px-3 py-2 rounded-md hover:bg-light-soft dark:hover:bg-dark-accent/20 hover:text-light-accent dark:hover:text-dark-accent transition whitespace-nowrap block"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <DarkModeToggle />
              </li>
            </ul>
          </div>
        )}
        
        {/* 모바일 햄버거 버튼 */}
        {isHome && (
          <button
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        )}
      </div>
      
      {/* 모바일 메뉴 */}
      {isHome && isMobileMenuOpen && (
        <div className="md:hidden bg-light-bg dark:bg-dark-bg border-t border-gray-200 dark:border-gray-700">
          <ul className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                {item.isExternal ? (
                  <Link
                    href={item.to}
                    className="block px-3 py-2 rounded-md hover:bg-light-soft dark:hover:bg-dark-accent/20 hover:text-light-accent dark:hover:text-dark-accent transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    href={`#${item.to}`}
                    className="block px-3 py-2 rounded-md hover:bg-light-soft dark:hover:bg-dark-accent/20 hover:text-light-accent dark:hover:text-dark-accent transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="px-3">
                <DarkModeToggle />
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
