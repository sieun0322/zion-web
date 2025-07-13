// src/components/ProjectCarousel.tsx
'use client';

import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type Props = {
  images: string[];
  title: string;
};

export default function ProjectCarousel({ images, title }: Props) {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
      interval={4000}
      swipeable
      emulateTouch
    >
      {images.map((src, i) => (
        <div key={i}>
          <Image
            src={src}
            alt={`${title} screenshot ${i + 1}`}
            width={800}
            height={450}
            className="rounded-lg"
          />
        </div>
      ))}
    </Carousel>
  );
}
