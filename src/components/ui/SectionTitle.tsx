'use client';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function SectionTitle({ title, subtitle, children }: SectionTitleProps) {
  return (
    <div className="text-center">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4 text-light-accent dark:text-dark-accent"
        >
          {title}
        </motion.h2>
      )}
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-light-subtle dark:text-dark-subtle mb-8"
        >
          {subtitle}
        </motion.p>
      )}
      
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-light-accent dark:text-dark-accent"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
