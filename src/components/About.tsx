'use client';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Tag from './ui/Tag';

export default function About() {
  return (
    <section
      id="about"
      className="bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text px-6 py-20 max-w-4xl mx-auto"
    >
      <SectionTitle>About Me</SectionTitle>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4 text-lg leading-relaxed text-light-subtle dark:text-dark-subtle"
      >
        <p>
          안녕하세요! 저는{' '}
          <span className="text-light-accent dark:text-dark-accent font-semibold">
            Zion Lee
          </span>
          입니다. 웹 기술과 서버 인프라에 관심이 많고, React와 Next.js를 중심으로
          사용자 중심의 인터랙티브한 웹사이트를 만드는 것을 좋아합니다.
        </p>
        <p>
          최근에는{' '}
          <span className="text-light-accent dark:text-dark-accent font-semibold">
            Mac mini 서버
          </span>
          를 활용하여 포트폴리오와 실험적인 웹 프로젝트를 직접 배포하고 있어요.
        </p>
        <p>아래는 제가 주로 사용하는 기술 스택입니다:</p>

        <ul className="grid grid-cols-2 gap-3 mt-4">
  {[
    'JavaScript (ES6+)',
    'React / Next.js',
    'Tailwind CSS',
    'Framer Motion',
    'Node.js / Express',
    'Docker / Nginx',
  ].map((tech, index) => (
    <li key={index}>
      <Tag>{tech}</Tag>
    </li>
  ))}
</ul>
      </motion.div>
    </section>
  );
}
