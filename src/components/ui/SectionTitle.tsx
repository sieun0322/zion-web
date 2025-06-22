'use client';
import { motion } from 'framer-motion';

export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl font-bold mb-8 text-light-accent dark:text-dark-accent"
    >
      {children}
    </motion.h2>
  );
}
