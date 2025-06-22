import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import Projects from '../components/Projects';
import About from '../components/About';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
