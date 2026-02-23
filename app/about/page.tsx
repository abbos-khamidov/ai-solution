import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DEFAULT_TWITTER_IMAGE, SITE_URL, createAlternates } from '@/lib/seo';

const SLUG = '/about';
const TITLE = 'О нас — команда AI Solution';
const DESCRIPTION =
  'Команда AI Solution: опытные сооснователи и инженеры по AI, ML и Fullstack-разработке. Внедряем искусственный интеллект в бизнес-процессы компаний в Ташкенте и Узбекистане.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'AI Solution команда',
    'о нас AI Solution',
    'внедрение ИИ Ташкент команда',
    'ML инженер Ташкент',
    'разработка Telegram ботов Узбекистан',
  ],
  alternates: createAlternates(`${SITE_URL}${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${SLUG}`,
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ'],
    siteName: 'AI Solution',
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: DEFAULT_TWITTER_IMAGE }],
  },
  robots: { index: true, follow: true },
};

const team = [
  {
    name: 'Диер Осимжонов',
    role: 'Сооснователь',
    photo: '/team/dier-osimjonov.png',
    stack: 'Разработчик Telegram-ботов, интеграции с WhatsApp и Instagram',
    experience: 'Более 3 лет опыта в коммерческих проектах',
    details: [
      'Проектирует и запускает ботов для продаж, поддержки и квалификации лидов.',
      'Отвечает за стабильность интеграций между мессенджерами и CRM-системами.',
      'Сфокусирован на быстром time-to-market и предсказуемом качестве релизов.',
    ],
  },
  {
    name: 'Аббос Хамидов',
    role: 'Основатель',
    photo: '/team/abbos-khamidov.png',
    stack: 'Data Scientist, ML/DL инженер, Fullstack-разработчик',
    experience: '6+ лет опыта в коммерческих и некоммерческих проектах',
    details: [
      'Отвечает за внедрение искусственного интеллекта в бизнес-процессы и компании.',
      'Строит ML/DL-архитектуры: от прототипа до production с измеримым ROI.',
      'Ведет стратегию продукта, техническую архитектуру и масштабирование решений.',
    ],
  },
  {
    name: 'Зиедулла Ташмухаммадов',
    role: 'Сооснователь',
    photo: '/team/ziyodulla-tashmuhammadov-2026.png',
    stack: 'Fullstack-разработчик, ML-инженер',
    experience: 'Более 3 лет практического опыта',
    details: [
      'Отвечает за структуру backend, проектирование API и архитектуру базы данных.',
      'Обеспечивает надежность инфраструктуры и корректную обработку данных.',
      'Ведет внедрение решений у клиентов и лично сопровождает интеграции в компаниях.',
    ],
  },
];

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}${SLUG}`,
  mainEntity: {
    '@type': 'Organization',
    name: 'AI Solution',
    url: SITE_URL,
    employee: team.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: `${member.role}, ${member.stack}`,
      worksFor: {
        '@type': 'Organization',
        name: 'AI Solution',
      },
      description: `${member.experience}. ${member.details.join(' ')}`,
    })),
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Header />

      <main className="min-h-screen bg-[#05050A] text-white pt-28 pb-16">
        <section className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/[0.02]">
            <p className="text-sm text-[#93C5FD] mb-3">About AI Solution</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Мы внедряем ИИ в бизнес-процессы и строим решения, которые работают в реальной
              операционке компаний
            </h1>
            <p className="mt-4 text-[#94A3B8] max-w-4xl text-base md:text-lg leading-relaxed">
              Наша команда объединяет сильную экспертизу в Data Science, ML/DL, Fullstack и
              мессенджер-автоматизации. Мы не просто пишем код — мы выстраиваем системы, которые
              ускоряют продажи, повышают качество клиентского сервиса и дают руководителям понятную
              управленческую картину.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <article
                key={member.name}
                className="rounded-2xl p-6 border border-white/10 bg-white/[0.02]"
              >
                {member.photo ? (
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/15 mb-5">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/4] rounded-xl border border-dashed border-white/20 bg-[#0B1020] flex items-center justify-center text-[#64748B] text-sm mb-5">
                    Место для фото
                  </div>
                )}

                <h2 className="text-xl font-bold text-[#F8FAFC]">{member.name}</h2>
                <p className="mt-1 text-sm text-[#93C5FD] font-medium">{member.role}</p>
                <p className="mt-3 text-sm text-[#CBD5E1] leading-relaxed">{member.stack}</p>
                <p className="mt-2 text-sm text-[#94A3B8]">{member.experience}</p>

                <ul className="mt-4 space-y-2 text-sm text-[#CBD5E1]">
                  {member.details.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
          <div className="rounded-2xl p-8 border border-[#3B82F6]/30 bg-[#3B82F6]/10">
            <h2 className="text-2xl md:text-3xl font-bold">Что это значит для вашего бизнеса</h2>
            <p className="mt-4 text-[#CFE2FF] max-w-4xl leading-relaxed">
              Вы получаете команду, которая одинаково хорошо понимает и технологии, и бизнес-логику.
              Мы умеем внедрять ИИ так, чтобы это приносило не “демо-эффект”, а конкретные цифры:
              быстрее обработка лидов, выше конверсия, прозрачнее контроль процессов и меньше
              операционных потерь.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
              >
                Обсудить проект
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/20 text-[#F8FAFC] hover:bg-white/5 transition-colors"
              >
                Смотреть услуги
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
