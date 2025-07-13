'use client';

import dynamic from 'next/dynamic';

// dynamic import로 Carousel이 클라이언트 사이드에서만 로드되도록 함
const ProjectCarousel = dynamic(() => import('./ProjectCarousel'), { ssr: false });

type Props = {
  images: string[];
  title: string;
};

export default function ProjectCarouselWrapper({ images, title }: Props) {
  return <ProjectCarousel images={images} title={title} />;
}
