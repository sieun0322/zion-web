'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 py-20 
                 bg-light-bg text-light-text 
                 dark:bg-dark-bg dark:text-dark-text"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-light-accent dark:text-dark-accent text-sm mb-2"
      >
        Hi, my name is
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-6xl font-bold text-light-text dark:text-dark-text"
      >
        Zion Lee.
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-5xl font-bold text-light-subtle dark:text-dark-subtle mt-2"
      >
        I build things for the web.
      </motion.h2>
    </section>
  );
}
