import Hero from '../components/sections/Hero';
import Contact from '../components/sections/Contact';
import Projects from '../components/sections/Projects';
import About from '../components/sections/About';

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
