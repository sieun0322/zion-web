'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-light-bg text-light-text px-6 py-20 max-w-3xl mx-auto text-center
                 dark:bg-dark-bg dark:text-dark-text"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-6 text-light-accent dark:text-dark-accent"
      >
        Contact
      </motion.h2>

      <motion.a
        href="mailto:lce322@naver.com"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block mb-8 border px-6 py-3 rounded transition
                   text-light-accent border-light-accent hover:bg-light-accent hover:text-light-bg
                   dark:text-dark-accent dark:border-dark-accent dark:hover:bg-dark-accent dark:hover:text-dark-bg"
      >
        Say Hello
      </motion.a>

      <div className="flex justify-center gap-6 text-2xl
                      text-light-accent dark:text-dark-accent"
      >
        <a
          href="https://github.com/sieun0322"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-light-bg dark:hover:text-dark-bg"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/zionlee"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-light-bg dark:hover:text-dark-bg"
        >
          <FaLinkedin />
        </a>
      </div>
    </section>
  );
}
