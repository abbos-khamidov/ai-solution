'use client';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  title: string;
}

export function LandingHeroImage({ src, alt, title }: Props) {
  return (
    <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mt-6 mb-8">
      <Image
        src={src}
        alt={alt}
        title={title}
        fill
        className="object-cover"
        style={{ opacity: 0.7 }}
        sizes="(max-width: 768px) 100vw, 800px"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
