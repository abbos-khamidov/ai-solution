import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'ai-chatbot-dlya-biznesa-uzbekistan';
const TITLE = 'AI чат-бот для бизнеса в Узбекистане — полное руководство';
const DESCRIPTION =
  'Что такое AI чат-бот и как он увеличивает продажи бизнеса в Узбекистане. Telegram, Instagram, WhatsApp — квалификация лидов Cold/Warm/Hot, 24/7 без выходных.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'AI чат-бот для бизнеса Узбекистан',
    'чат-бот для бизнеса Ташкент',
    'автоответчик в Telegram Instagram WhatsApp',
    'AI ассистент для Instagram WhatsApp',
    'квалификация лидов автоматически',
    'умный чат-бот для сайта',
    'biznes uchun AI chatbot Toshkent',
    'AI chatbot Uzbekistan',
  ],
  alternates: createAlternates(`${SITE_URL}/blog/${SLUG}`),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog/${SLUG}`,
    type: 'article',
    locale: 'ru_RU',
    siteName: 'AI Solution',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: TITLE }],
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
  datePublished: '2025-01-25',
  dateModified: '2026-03-15',
  url: `${SITE_URL}/blog/${SLUG}`,
  image: `${SITE_URL}/og-image.png`,
  inLanguage: 'ru',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen" style={{ background: '#05050A' }}>
        <div className="pt-28 pb-10" style={{ background: '#0D0D1A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-6">
              <Link href="/" className="hover:text-white transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[#94A3B8]">Блог</span>
              <span>/</span>
              <span className="text-[#F8FAFC]">AI чат-бот для бизнеса</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>25 января 2025</span>
              <span>·</span>
              <span>9 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>
                Гайд
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              Каждый день тысячи клиентов пишут в Telegram, Instagram и WhatsApp узбекских компаний
              и не получают ответа вовремя. AI чат-бот решает эту проблему раз и навсегда.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Что такое AI чат-бот и чем он отличается от обычного бота
              </h2>
              <div className="relative w-full h-48 rounded-xl overflow-hidden my-6">
                <Image
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80"
                  alt="AI чат-бот для бизнеса в Узбекистане"
                  title="AI чат-бот для бизнеса в Узбекистане"
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <p>
                Обычный чат-бот работает по жёсткому сценарию: клиент выбирает из кнопок, бот
                выдаёт заранее написанный ответ. Такие боты решают только те вопросы, которые
                разработчик предусмотрел заранее. Стоит клиенту написать что-то нестандартное —
                бот теряется и либо зависает, либо показывает бессмысленное сообщение об ошибке.
              </p>
              <p>
                AI чат-бот принципиально другой. Он понимает естественную речь: "сколько стоит
                ваш товар?" и "цена?" и "почём?" — это один и тот же вопрос, на который AI даст
                правильный ответ. Он обучается на реальных диалогах вашего бизнеса, понимает
                контекст разговора и может вести полноценную беседу, собирая информацию о клиенте
                по ходу диалога.
              </p>
              <p>
                Главное отличие: AI чат-бот не просто отвечает — он думает. Он анализирует, что
                хочет клиент, насколько он готов к покупке, какой продукт ему подойдёт. И на
                основе этого анализа выстраивает дальнейший разговор.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Как работает AI чат-бот в мессенджерах
              </h2>
              <p>
                Клиент пишет в Telegram, Instagram или WhatsApp. AI мгновенно — за 30 секунд —
                обрабатывает сообщение и отвечает. При этом он одновременно решает несколько задач:
                отвечает на вопрос, собирает информацию о потребности клиента и оценивает его
                готовность к покупке.
              </p>
              <p>
                Один AI-ассистент работает во всех трёх каналах одновременно. Клиент может написать
                сначала в Instagram, потом продолжить в Telegram — AI помнит контекст разговора и
                не заставляет объяснять всё заново. Это принципиально важно для узбекского рынка,
                где клиенты активно используют несколько платформ.
              </p>
              <p>
                В нерабочее время AI полностью заменяет менеджера: отвечает на вопросы, проводит
                консультацию, собирает контакты. Утром менеджер получает готовый список обращений
                с краткой сводкой по каждому клиенту — кто чем интересовался, насколько серьёзно,
                на какой стадии разговора остановился.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Квалификация лидов: Cold, Warm, Hot
              </h2>
              <p>
                Не каждый, кто написал в мессенджер, готов купить прямо сейчас. AI чат-бот
                автоматически определяет "температуру" каждого лида на основе его ответов и
                поведения в диалоге.
              </p>
              <p>
                <strong className="text-[#F8FAFC]">Cold</strong> — первый контакт, человек
                только знакомится с продуктом, не готов к покупке в ближайшее время. AI ставит
                напоминание и возвращается к нему через несколько дней с полезным контентом.
              </p>
              <p>
                <strong className="text-[#F8FAFC]">Warm</strong> — клиент активно интересуется,
                задаёт конкретные вопросы, сравнивает варианты. AI собирает все детали и готовит
                почву для закрытия сделки.
              </p>
              <p>
                <strong className="text-[#F8FAFC]">Hot</strong> — клиент готов купить. В этот
                момент AI мгновенно уведомляет менеджера и передаёт полный контекст разговора.
                Менеджер подключается к "горячему" клиенту и закрывает сделку — без лишних
                вводных и повторных объяснений.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Какие отрасли в Узбекистане получают наибольшую выгоду
              </h2>
              <p>
                AI чат-боты уже активно используются в разных секторах узбекской экономики. В
                ритейле и интернет-торговле боты обрабатывают потоки входящих вопросов об остатках,
                доставке и оплате — не оставляя ни одного обращения без ответа. Конверсия растёт,
                потому что клиенты больше не уходят из-за долгого ожидания.
              </p>
              <p>
                В сфере услуг — медицина, образование, юридические услуги, красота — AI берёт
                на себя первичное консультирование и запись. Администраторы освобождаются от
                рутины и могут уделять больше времени клиентам, которые уже пришли.
              </p>
              <p>
                В B2B-продажах AI чат-бот — мощный инструмент для обработки корпоративных
                запросов. Он собирает требования, уточняет бюджет и сроки, определяет лицо,
                принимающее решение. К моменту, когда к разговору подключается менеджер,
                он уже знает всё необходимое о потенциальном клиенте.
              </p>
              <p>
                Недвижимость — один из самых показательных кейсов. Агентства в Ташкенте тратили
                огромные ресурсы на обработку нецелевых обращений. AI фильтрует их, оставляя
                менеджерам только серьёзных покупателей с реальным бюджетом.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC]">
                Стоимость, окупаемость и первые шаги
              </h2>
              <p>
                Стоимость AI чат-бота для бизнеса зависит от сложности сценариев, количества
                каналов и необходимых интеграций. Базовое решение стартует от $1 000 за внедрение
                плюс ежемесячная поддержка. Это меньше, чем месячная зарплата одного менеджера
                по продажам — при этом AI работает 24/7 и обрабатывает неограниченное количество
                обращений одновременно.
              </p>
              <p>
                Средняя окупаемость внедрения — 2-3 месяца. После этого каждый последующий месяц
                AI чат-бот генерирует дополнительную прибыль: за счёт обработки лидов, которые
                раньше терялись ночью и в выходные, за счёт ускорения работы менеджеров и за
                счёт повышения конверсии из обращения в сделку.
              </p>
            </section>
          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-[#F8FAFC] mb-3">Решения AI Solution для вашего бизнеса</h2>
            <p className="text-[#64748B] mb-8">Выберите AI-продукт под задачи вашей компании</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/products/customer-service" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="text-2xl mb-3">🤖</div>
                <h3 className="font-bold text-[#F8FAFC] mb-2">Customer Service Bot</h3>
                <p className="text-sm text-[#64748B] mb-3">AI в Telegram, Instagram, WhatsApp. Ответ за 30 сек, квалификация лидов 24/7.</p>
                <span className="text-sm font-semibold text-[#3B82F6]">От $1 000 →</span>
              </Link>
              <Link href="/products/management-assistant" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-[#F8FAFC] mb-2">Management Assistant</h3>
                <p className="text-sm text-[#64748B] mb-3">Контроль команды, финансовый трекер, еженедельные отчёты в Telegram.</p>
                <span className="text-sm font-semibold text-[#06B6D4]">От $3 000 →</span>
              </Link>
              <Link href="/products/corporate-ai" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div className="text-2xl mb-3">🏢</div>
                <h3 className="font-bold text-[#F8FAFC] mb-2">Corporate AI (RAG)</h3>
                <p className="text-sm text-[#64748B] mb-3">База знаний компании с AI. Интеграция с 1С, Bitrix24, amoCRM.</p>
                <span className="text-sm font-semibold text-[#7C3AED]">От $8 000 →</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
