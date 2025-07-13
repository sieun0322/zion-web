// src/app/projects/[slug]/page.tsx
'use client';

import {  use } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import dynamic from 'next/dynamic';
import { projects } from '@/lib/projects';
import ProjectCarousel from '@/components/ProjectCarousel';
export default function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) return 'loading...';

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-light-text dark:text-dark-text">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8 text-light-accent dark:text-dark-accent"
      >
        {project.title}
      </motion.h1>
      <motion.h2
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.5 }}
    className="text-xl font-medium mb-8 text-light-subtle dark:text-dark-subtle"
  >
    {project.subtitle}
  </motion.h2>

      {project.images &&  project.images?.length > 0 && (
        <div className="mb-10 rounded-lg overflow-hidden">
          <ProjectCarousel images={project.images} title={project.title} />
  
        </div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8 leading-relaxed text-lg text-light-subtle dark:text-dark-subtle"
      >
        {project.description}
      </motion.p>

      {project.features && project.features?.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-light-accent dark:text-dark-accent">🧩 핵심 기능</h3>
          <ul className="list-disc list-inside space-y-1">
            {project.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-light-accent dark:text-dark-accent">🌐 기술 스택</h3>
        <div className="flex flex-wrap gap-3">
          {project.tag.map((tech, idx) => (
            <span
              key={idx}
              className="bg-light-bg text-light-accent px-3 py-1 rounded border border-light-accent text-sm
                         dark:bg-dark-bg dark:text-dark-accent dark:border-dark-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {project.architecture && (
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-light-accent dark:text-dark-accent">아키텍처</h3>
          {/* <Image
            src={project.architecture}
            alt="Architecture Diagram"
            width={900}
            height={500}
            className="rounded-lg border border-light-accent dark:border-dark-accent"
          /> */}
          <Image
            src={project.architecture}
            alt="Architecture Diagram"
            width={900}
            height={500}
          />
        </section>
      )}

      <div className="flex flex-col gap-2 text-sm mb-10">
        {project.github && (
          <a
            href={project.github}
            className="underline hover:text-light-bg dark:hover:text-dark-bg"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            className="underline hover:text-light-bg dark:hover:text-dark-bg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Site →
          </a>
        )}
        {project.android && (
          <a
            href={project.android}
            className="underline hover:text-light-bg dark:hover:text-dark-bg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Android →
          </a>
        )}
        {project.ios && (
          <a
            href={project.ios}
            className="underline hover:text-light-bg dark:hover:text-dark-bg"
            target="_blank"
            rel="noopener noreferrer"
          >
            iOS →
          </a>
        )}
      </div>

      <a
        href="/#projects"
        className="block mt-12 text-light-accent underline hover:text-light-bg dark:text-dark-accent dark:hover:text-dark-bg transition"
      >
        ← Back to Projects
      </a>
    </main>
  );
}
