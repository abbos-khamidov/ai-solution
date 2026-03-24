import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'llm-bot-manager-telegram';
const TITLE = 'LLM и бот-менеджер в Telegram — что это и зачем бизнесу в 2025';
const DESCRIPTION =
  'LLM (Large Language Model) — это мозг вашего бот-менеджера в Telegram. Узнайте, как LLM-боты заменяют менеджеров, автоматизируют продажи и работают личным ассистентом ИИ для руководителей в Ташкенте.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'LLM для бизнеса',
    'LLM Ташкент',
    'бот менеджер Telegram',
    'Large Language Model бизнес',
    'личный ассистент ИИ',
    'LLM чат-бот Узбекистан',
    'GPT бот для бизнеса',
    'AI менеджер Telegram',
    'LLM автоматизация',
    'умный бот Telegram Ташкент',
  ],
  alternates: createAlternates(`${SITE_URL}/blog/${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog/${SLUG}`,
    type: 'article',
    locale: 'ru_RU',
    siteName: 'AI Solution',
  },
  robots: { index: true, follow: true },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  author: { '@type': 'Organization', name: 'AI Solution', url: SITE_URL },
  publisher: {
    '@type': 'Organization',
    name: 'AI Solution',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
  },
  datePublished: '2026-03-15',
  dateModified: '2026-03-15',
  url: `${SITE_URL}/blog/${SLUG}`,
  inLanguage: 'ru',
  image: `${SITE_URL}/og-image.png`,
  about: [
    { '@type': 'Thing', name: 'LLM' },
    { '@type': 'Thing', name: 'Бот-менеджер' },
    { '@type': 'Thing', name: 'Личный ассистент ИИ' },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-background">
        <div className="pt-28 pb-10 bg-background-secondary border-b border-border">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[#94A3B8]">Блог</span>
              <span>/</span>
              <span className="text-foreground">LLM и бот-менеджер</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>15 февраля 2025</span>
              <span>·</span>
              <span>11 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(124,58,237,0.12)', color: '#7C3AED' }}>
                Технологии
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              ChatGPT — это потребительский продукт. LLM в бизнесе — это другое: обученная
              на ваших данных модель, которая ведёт переговоры, квалифицирует лидов и
              управляет командой в Telegram вместо менеджера.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Что такое LLM простыми словами
              </h2>
              <div className="relative w-full h-48 rounded-xl overflow-hidden my-6">
                <Image
                  src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80"
                  alt="LLM бот менеджер в Telegram для бизнеса"
                  title="LLM бот менеджер в Telegram для бизнеса"
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <p>
                LLM (Large Language Model — большая языковая модель) — это тип искусственного
                интеллекта, обученный на огромных массивах текстов. Именно на LLM работают
                ChatGPT, Claude, Gemini и другие известные AI-системы. Главное свойство LLM —
                способность понимать естественный язык и отвечать связно, как человек.
              </p>
              <p>
                Для бизнеса в Ташкенте важно понимать: публичные LLM вроде ChatGPT — это
                общие инструменты. Они не знают ваши продукты, ваши цены, ваши скрипты
                продаж. Бизнес-LLM — это модель, дообученная на данных конкретной компании
                и развёрнутая в виде бот-менеджера в Telegram, где работает большинство
                узбекских бизнесов.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Бот-менеджер на базе LLM — что умеет
              </h2>
              <p>
                Бот-менеджер — это LLM, развёрнутый в Telegram-боте и настроенный под
                задачи вашего бизнеса. В отличие от обычных чат-ботов, которые работают
                по заранее написанным сценариям, бот-менеджер на базе LLM умеет вести
                полноценный диалог:
              </p>
              <p>
                <strong className="text-foreground">Отвечает на нестандартные вопросы.</strong>
                Клиент спрашивает «А если я куплю два, будет скидка?» — обычный бот
                не знает ответа и передаёт менеджеру. LLM-бот знает вашу ценовую политику
                и отвечает корректно: «Да, при покупке от двух единиц скидка 10%.»
              </p>
              <p>
                <strong className="text-foreground">Квалифицирует лидов естественно.</strong>
                Вместо формальных вопросов-анкет LLM-бот ведёт разговор: выясняет потребности,
                бюджет и срочность через органичный диалог. Клиент не чувствует, что его
                «обрабатывают» — он просто консультируется.
              </p>
              <p>
                <strong className="text-foreground">Работает на нескольких языках.</strong>
                Клиент пишет на узбекском — бот отвечает на узбекском. Переключается
                на русский если клиент начинает на русском. Это критически важно для
                работы по всему Узбекистану: от Ташкента до Ферганы и Андижана.
              </p>
              <p>
                <strong className="text-foreground">Запоминает контекст диалога.</strong>
                Если клиент вернулся через три дня, LLM-бот помнит предыдущий разговор
                и продолжает с того же места: «Вы хотели узнать про тарифы — готовы
                рассказать подробнее?»
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Личный ассистент ИИ для руководителя
              </h2>
              <p>
                Кроме бот-менеджера для клиентов, LLM используется как личный ассистент
                ИИ для собственника или директора. Это Telegram-бот, который:
              </p>
              <p>
                — Присылает ежеутренний брифинг: что произошло вчера, какие задачи горят,
                какие встречи сегодня.
              </p>
              <p>
                — Отвечает на вопросы по данным компании: «Какова выручка за последние
                30 дней в сравнении с прошлым месяцем?» или «Кто из менеджеров не сдал
                отчёт за эту неделю?»
              </p>
              <p>
                — Помогает с документами: составляет деловые письма, резюмирует переговоры,
                переводит тексты — всё это прямо в Telegram, без переключения на другие
                приложения.
              </p>
              <p>
                — Управляет командой: принимает ежедневные отчёты от сотрудников, напоминает
                о дедлайнах, формирует еженедельный срез по каждому отделу.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                LLM vs обычный чат-бот: в чём разница
              </h2>
              <p>
                Обычный чат-бот работает по скриптам: дерево диалогов, кнопки, заранее
                написанные ответы. Если клиент уходит в сторону от скрипта — бот теряется.
                LLM-бот понимает смысл вопроса и отвечает содержательно в любой ситуации.
              </p>
              <p>
                Аналогия: обычный бот — это меню на кассе самообслуживания. LLM-бот —
                это опытный консультант, который знает весь ассортимент, помнит ваши
                предпочтения и может порекомендовать то, о чём вы ещё не спрашивали.
              </p>
              <p>
                Для бизнеса в Ташкенте это означает: с LLM-ботом вы не теряете клиентов,
                которые задают нестандартные вопросы. А таких клиентов — самые интересные,
                с самым большим средним чеком — большинство.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Как внедрить LLM-бота в Ташкенте
              </h2>
              <p>
                Внедрение бот-менеджера на базе LLM занимает 1-3 недели. Основные этапы:
                сбор базы знаний (прайсы, скрипты, FAQ), настройка модели, интеграция
                с Telegram, тестирование диалогов, запуск в продакшн.
              </p>
              <p>
                Стоимость зависит от объёма базы знаний и каналов: от $3 000 за
                базовый LLM-бот в одном канале до $15 000+ за полную платформу
                с несколькими каналами и интеграциями с CRM и 1С. Точную стоимость
                рассчитываем после бесплатного 60-минутного аудита.
              </p>
            </section>

          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-foreground mb-3">LLM-решения от AI Solution</h2>
            <p className="text-[#64748B] mb-8">Выберите AI-продукт под задачи вашей компании</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/products/customer-service" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="text-2xl mb-3">🤖</div>
                <h3 className="font-bold text-foreground mb-2">Customer Service Bot</h3>
                <p className="text-sm text-[#64748B] mb-3">LLM-бот в Telegram, Instagram, WhatsApp. Квалификация лидов 24/7.</p>
                <span className="text-sm font-semibold text-[#3B82F6]">От $1 000 →</span>
              </Link>
              <Link href="/services/ai-assistant" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div className="text-2xl mb-3">🧠</div>
                <h3 className="font-bold text-foreground mb-2">Личный ассистент ИИ</h3>
                <p className="text-sm text-[#64748B] mb-3">ChatGPT на данных вашей компании. Экономит 15 часов в неделю.</p>
                <span className="text-sm font-semibold text-[#7C3AED]">От $2 000 →</span>
              </Link>
              <Link href="/products/management-assistant" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-foreground mb-2">Management Assistant</h3>
                <p className="text-sm text-[#64748B] mb-3">Бот-менеджер для собственника: команда, финансы, отчёты.</p>
                <span className="text-sm font-semibold text-[#06B6D4]">От $3 000 →</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
