'use client';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Tag from '../ui/Tag';

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
          안녕하세요! 저는{' '} 웹 개발자,
          <span className="text-light-accent dark:text-dark-accent font-semibold">
            이시은
          </span>
          입니다. 
        </p>
        <p>
         Spring/React 기반 환경에서 설계, 개발, CI/CD, 운영까지 웹 시스템의 전 과정을 직접 경험했으며,유지보수와 확장성이 뛰어난 시스템 설계와, 누구나 이해하기 쉬운 클린 코드 작성을 중요하게 생각합니다.
        </p>
        <p>
          호기심과 학습에 대한 열정이 커, 꾸준히 새로운 기술을 학습하며 기술 스펙트럼을 넓혔고, 3년 넘게 앱 개발 프로젝트에도 참여하면서 실전 중심의 개발 역량을 키워가고 있습니다.
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
    'Java',
    'React / Next.js',
    'Spring Boot',
    'Spring Batch',
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
