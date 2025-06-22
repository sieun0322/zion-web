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

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-light-subtle mb-8 text-lg leading-relaxed dark:text-dark-subtle"
      >
        저에게 관심이 있으시거나 협업 제안이 있으시다면 언제든지 이메일이나 소셜 링크를 통해 연락해주세요.
      </motion.p>

      <motion.a
        href="mailto:zionlee.dev@gmail.com"
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
