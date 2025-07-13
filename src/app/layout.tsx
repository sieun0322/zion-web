// app/layout.tsx
import '@/styles/globals.css'; // Tailwind CSS 전역 스타일 임포트
import Navbar from '../components/Navbar';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'Zion Lee Portfolio',
  description: 'Personal portfolio website of Zion Lee - Web Developer',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="en">
<body className={`${inter.className} bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text`}>

    <Navbar />
    <main className="pt-24">{children}</main>
  </body>
</html>
  );
}
