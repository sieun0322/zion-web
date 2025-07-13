'use client';
import { usePathname } from 'next/navigation';
import DarkModeToggle from './DarkModeToggle';
import Link from 'next/link';

const navItems = [
  { name: 'About', to: 'about' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === '/';
  return (
    <nav className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text fixed w-full z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 로고 */}
        <Link href="/"
          className="text-xl font-bold text-light-accent dark:text-dark-accent"
        >
          Home
        </Link>

        {/* 메뉴 */}

        {isHome && (
        <ul className="flex flex-grow justify-end space-x-12 text-sm font-semibold items-center">

  {navItems.map((item) => (
    <li key={item.to} className="w-auto inline-block">
      <a
        href={`#${item.to}`}
        className="px-4 py-2 rounded-md hover:bg-light-soft dark:hover:bg-dark-accent/20 hover:text-light-accent dark:hover:text-dark-accent transition whitespace-nowrap block"
      >
        {item.name}
      </a>
    </li>
  ))}
  <li>
    <DarkModeToggle />
  </li>
</ul>
)}
      </div>
    </nav>
  );
}
