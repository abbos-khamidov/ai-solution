'use client';

import { useRef } from 'react';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { useRevealAnimation } from '@/motion/hooks';

export function Services() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // Fade-in when entering viewport
  useRevealAnimation({
    ref: card1Ref,
    variant: 'fade-up',
    duration: 0.5,
    delay: 0,
  });

  useRevealAnimation({
    ref: card2Ref,
    variant: 'fade-up',
    duration: 0.5,
    delay: 0.1,
  });

  useRevealAnimation({
    ref: card3Ref,
    variant: 'fade-up',
    duration: 0.5,
    delay: 0.2,
  });

  useRevealAnimation({
    ref: card4Ref,
    variant: 'fade-up',
    duration: 0.5,
    delay: 0.3,
  });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-400">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            ref={card1Ref}
            className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {t('services.service1Title')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('services.service1Desc')}
            </p>
            <p className="text-sm text-gray-500">
              {t('services.service1Example')}
            </p>
          </div>

          <div
            ref={card2Ref}
            className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {t('services.service2Title')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('services.service2Desc')}
            </p>
            <p className="text-sm text-gray-500">
              {t('services.service2Example')}
            </p>
          </div>

          <div
            ref={card3Ref}
            className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {t('services.service3Title')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('services.service3Desc')}
            </p>
            <p className="text-sm text-gray-500">
              {t('services.service3Example')}
            </p>
          </div>

          <div
            ref={card4Ref}
            className="border border-zinc-800 rounded-lg p-6 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {t('services.service4Title')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('services.service4Desc')}
            </p>
            <p className="text-sm text-gray-500">
              {t('services.service4Example')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
