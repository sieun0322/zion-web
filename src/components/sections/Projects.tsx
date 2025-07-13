'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { projects } from '@/lib/projects';
export default function Projects() {
  const router = useRouter();
  return (
    <section
      id="projects"
      className="bg-light-bg text-light-text py-20 px-6 max-w-6xl mx-auto dark:bg-dark-bg dark:text-dark-text"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-light-accent dark:text-dark-accent mb-16"
      >
        Projects
      </motion.h2>

      <div className="grid gap-12 md:grid-cols-2">
        {projects.map((project, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-light-soft rounded-lg p-8 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group
                       dark:bg-[#112240]"
                       onClick={() => router.push(`/projects/${project.slug}`)}
          >
            {/* 프로젝트 번호 */}
            <span className="absolute top-6 left-6 font-mono text-sm select-none opacity-30 text-light-accent dark:text-dark-accent">
              0{idx + 1}.
            </span>

            {/* 프로젝트 제목 및 링크 */}
            <h3 className="text-2xl font-semibold mb-3 text-light-text group-hover:text-light-accent transition
                           dark:text-dark-text dark:group-hover:text-dark-accent"
            >
              {project.name}
            </h3>

            {/* 프로젝트 설명 */}
            <p className="text-light-subtle mb-6 leading-relaxed dark:text-dark-subtle">
              {project.description}
            </p>

            {/* 기술 스택 태그 */}
            <ul className="flex flex-wrap gap-3 mb-6">
              {project.tech.map((tech, i) => (
                <li
                  key={i}
                  className="text-sm bg-light-bg text-light-accent px-3 py-1 rounded border border-light-accent
                             hover:bg-light-accent hover:text-light-bg transition
                             dark:bg-dark-bg dark:text-dark-accent dark:border-dark-accent dark:hover:bg-dark-accent dark:hover:text-dark-bg"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {/* 링크 버튼 */}
            <div className="flex gap-6 text-sm font-mono text-light-accent dark:text-dark-accent">
              {project.github && (
                
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-light-bg dark:hover:text-dark-bg"
                  onClick={e => e.stopPropagation()}
                >
                  GitHub →
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-light-bg dark:hover:text-dark-bg"
                  onClick={e => e.stopPropagation()}
                >
                  Live Site →
                </a>
              )}
              {project.android && (
                <a
                  href={project.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-light-bg dark:hover:text-dark-bg"
                  onClick={e => e.stopPropagation()}
                >
                  Android →
                </a>
              )}
              {project.ios && (
                <a
                  href={project.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-light-bg dark:hover:text-dark-bg"
                  onClick={e => e.stopPropagation()}
                >
                  iOS →
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
