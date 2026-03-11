import type { Metadata } from 'next';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'kak-vybrat-chatbot-dlya-biznesa';
const TITLE = 'Как выбрать чатбот для бизнеса: полное руководство 2025';
const DESCRIPTION =
  'Критерии выбора чатбота для бизнеса в 2025: сценарий vs ИИ, каналы, квалификация лидов, интеграции, цены. Пошаговый гайд для компаний в Узбекистане и СНГ.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'как выбрать чатбот для бизнеса',
    'чатбот для бизнеса 2025',
    'выбор чатбота критерии',
    'AI чатбот или сценарий',
    'чатбот для бизнеса Узбекистан',
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
  datePublished: '2025-03-01',
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
              <span className="text-[#F8FAFC]">Как выбрать чатбот</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>1 марта 2025</span>
              <span>·</span>
              <span>12 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>Гайд</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-4">{TITLE}</h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              Решение внедрить чатбот часто упирается в выбор: сценарий или ИИ, один канал или несколько, сколько платить и на что смотреть при выборе подрядчика. В этом руководстве — критерии выбора чатбота для бизнеса в 2025 году и пошаговый чеклист для компаний в Узбекистане и СНГ.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Сценарий или ИИ: что выбрать</h2>
              <p>
                Чатбот по сценарию работает по жёсткому дереву: кнопки, шаги, заранее прописанные ответы. Подходит для простых задач: запись на приём, ответ на 5–10 типовых вопросов. Стоит клиенту написать что-то не из сценария — бот не понимает. ИИ-чатбот понимает естественный язык, ведёт диалог гибко и может квалифицировать лидов по ходу разговора. Для продаж, консультаций и приёма заявок в 2025 году чаще выбирают ИИ: выше конверсия и меньше «тупиковых» диалогов.
              </p>
              <p>
                Итог: если нужны только запись и 3–5 вопросов — можно начать со сценария. Если важны продажи, квалификация и масштаб обращений — логичнее ИИ.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Каналы: один или несколько</h2>
              <p>
                Клиенты пишут в Telegram, Instagram, WhatsApp и на сайт. Отдельный бот в каждом канале — дублирование логики и потери контекста при переходе клиента из канала в канал. Единый ИИ-движок для всех каналов даёт одну воронку, одну квалификацию и один контекст для менеджера. При выборе подрядчика уточняйте: один бот на все каналы или отдельные решения. Для бизнеса в Узбекистане чаще всего стартуют с Telegram, затем подключают Instagram и WhatsApp без потери истории.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Квалификация лидов и передача менеджеру</h2>
              <p>
                Цель чатбота — не только ответить, но и отфильтровать горячих лидов и передать их менеджеру с контекстом. Убедитесь, что решение умеет: вести диалог до выяснения потребности и готовности к покупке, присваивать статус (например Cold/Warm/Hot), отправлять уведомление менеджеру с кратким резюме диалога. Без этого менеджеры получают «сырые» заявки и тратят время на первичный отбор.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Интеграции и данные</h2>
              <p>
                Нужна ли интеграция с CRM, учётной системой или сайтом? Если да — уточняйте у подрядчика список поддерживаемых систем и сроки подключения. Отдельно — вопрос данных: где хранятся диалоги, можно ли не передавать их в сторонние облака, есть ли on-premise при необходимости. Для медицины, финансов и госсектора это критично.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Бюджет и сроки</h2>
              <p>
                Базовый ИИ-чатбот для приёма заявок и квалификации — от $1 000 за запуск и от $500/мес. С интеграциями и несколькими каналами — от $2 000 за запуск. Срок запуска простого сценария — 5–7 рабочих дней, с интеграциями — 2–3 недели. При выборе сравнивайте не только цену, но и что входит: обучение на ваших данных, количество каналов, поддержка и дообучение.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">Чеклист перед запуском</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Чётко сформулировать цель: приём заявок, запись, консультации, квалификация.</li>
                <li>Определить каналы: с какого начать и планируется ли расширение.</li>
                <li>Подготовить FAQ и типовые возражения для обучения бота.</li>
                <li>Понять, кто получает уведомления о горячих лидах и в каком виде.</li>
                <li>Обсудить с подрядчиком интеграции и политику данных.</li>
              </ul>
            </section>
          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">Читайте также</h2>
            <ul className="space-y-2 text-[#94A3B8]">
              <li><Link href="/blog/ai-chatbot-dlya-biznesa-uzbekistan" className="text-[#93C5FD] hover:underline">AI чат-бот для бизнеса в Узбекистане — полное руководство</Link></li>
              <li><Link href="/blog/avtomatizaciya-prodazh-telegram" className="text-[#93C5FD] hover:underline">Автоматизация продаж через Telegram бот</Link></li>
              <li><Link href="/tseny-na-chatboty-tashkent" className="text-[#93C5FD] hover:underline">Стоимость чатбота для бизнеса в Ташкенте</Link></li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
