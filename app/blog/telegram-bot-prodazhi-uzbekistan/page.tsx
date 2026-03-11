import type { Metadata } from 'next';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'telegram-bot-prodazhi-uzbekistan';
const TITLE = 'Telegram-бот для продаж: кейсы из Узбекистана';
const DESCRIPTION =
  'Как компании в Узбекистане используют Telegram-ботов для продаж: квалификация лидов, приём заявок 24/7, интеграция с CRM. Реальные кейсы Studify.uz и Marsit.uz.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Telegram бот для продаж Узбекистан',
    'кейсы Telegram бот бизнес',
    'автоматизация продаж Telegram Ташкент',
    'Studify Marsit кейсы',
  ],
  alternates: createAlternates(`${SITE_URL}/blog/${SLUG}`),
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/blog/${SLUG}`, type: 'article', locale: 'ru_RU', siteName: 'AI Solution', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: TITLE }] },
  robots: { index: true, follow: true },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  author: { '@type': 'Organization', name: 'AI Solution', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'AI Solution', logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` } },
  datePublished: '2025-03-08',
  dateModified: '2025-03-11',
  url: `${SITE_URL}/blog/${SLUG}`,
  image: `${SITE_URL}/og-image.png`,
  inLanguage: 'ru',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="min-h-screen" style={{ background: '#05050A' }}>
        <div className="pt-28 pb-10" style={{ background: '#0D0D1A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-6">
              <Link href="/" className="hover:text-white transition-colors">Главная</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Блог</Link>
              <span>/</span>
              <span className="text-[#F8FAFC]">Telegram-бот для продаж</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>8 марта 2025</span>
              <span>·</span>
              <span>8 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>Кейсы</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-4">{TITLE}</h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              В Узбекистане Telegram остаётся одним из главных каналов для заявок и продаж. Компании, которые автоматизировали первый контакт через ИИ-бота в Telegram, получили быстрый ответ клиенту, стабильный приём лидов 24/7 и прозрачную воронку. Ниже — два реальных кейса из Ташкента: образовательная платформа Studify.uz и IT-компания Marsit.uz.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Кейс Studify.uz: образование</h2>
              <p>
                Образовательная платформа получала заявки в Telegram и на сайте. Менеджеры не успевали отвечать в первые минуты — часть абитуриентов уходила к конкурентам или теряла интерес. Задача: ускорить первичный ответ и улучшить квалификацию входящих лидов. Внедрили ИИ-бота для коммуникаций и управленческие сводки по KPI для руководства.
              </p>
              <p>
                Результат: ответ клиенту за секунды вместо часов, прозрачная воронка по лидам, руководитель видит ежедневные сводки в одном окне. Менеджеры получают квалифицированные заявки с контекстом и тратят меньше времени на рутинный первичный отбор. Подробнее — в полном <Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">кейсе Studify.uz</Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Кейс Marsit.uz: IT и B2B</h2>
              <p>
                IT-компания получала заявки в Telegram и на сайте. В нерабочее время часть обращений терялась; кроме того, не все заявки были одинаково готовы к диалогу — менеджеры тратили время на отбор. Задача: не терять заявки по ночам и в выходные и повысить конверсию в целевой звонок. Внедрили AI-квалификацию Cold/Warm/Hot и передачу горячих лидов менеджеру с контекстом.
              </p>
              <p>
                Результат: стабильный приём лидов 24/7, рост доли качественных заявок, снижение нагрузки на отдел продаж при сохранении и росте конверсии. Подробнее — в <Link href="/cases/marsit-lead-automation" className="text-[#93C5FD] hover:underline">кейсе Marsit.uz</Link>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Что общего в подходах</h2>
              <p>
                В обоих кейсах использовался единый ИИ-движок в Telegram (и при необходимости в других каналах): первый ответ за 30 секунд, квалификация по ходу диалога, передача горячих лидов менеджеру с кратким резюме. Никаких отдельных «ботов-визиток» — один бот решает задачу приёма, квалификации и маршрутизации. Для компаний в Узбекистане такой формат особенно удобен: Telegram уже основной канал общения с клиентами, расширение на Instagram и WhatsApp при необходимости не требует переписывания логики.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">С чего начать</h2>
              <p>
                Если вы рассматриваете Telegram-бота для продаж — начните с аудита входящего потока: откуда приходят заявки, в какое время, как быстро вы отвечаете и какая доля лидов «остывает». Затем определите цель: только приём заявок или ещё квалификация и сводки для руководства. На основе этого можно оценить сроки и бюджет внедрения и получить ориентир по ROI. В AI Solution мы проводим бесплатный 60-минутный аудит и предлагаем сценарий под вашу воронку — можно оставить заявку на сайте или написать в Telegram @aisolution_uz.
              </p>
            </section>
          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
            <ul className="space-y-2 text-[#94A3B8]">
              <li><Link href="/cases/studify-ai-automation" className="text-[#93C5FD] hover:underline">Кейс Studify.uz: AI-автоматизация лидов</Link></li>
              <li><Link href="/cases/marsit-lead-automation" className="text-[#93C5FD] hover:underline">Кейс Marsit.uz: AI-автоматизация продаж</Link></li>
              <li><Link href="/blog/avtomatizaciya-prodazh-telegram" className="text-[#93C5FD] hover:underline">Автоматизация продаж через Telegram бот</Link></li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
