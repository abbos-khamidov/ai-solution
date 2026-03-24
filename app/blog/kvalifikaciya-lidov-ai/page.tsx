import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'kvalifikaciya-lidov-ai';
const TITLE = 'Автоматическая квалификация лидов с помощью AI — система Cold/Warm/Hot';
const DESCRIPTION =
  'Как AI автоматически квалифицирует лидов по системе Cold/Warm/Hot и увеличивает конверсию продаж. Принцип работы, сценарии для разных ниш, реальные результаты.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'квалификация лидов автоматически',
    'AI квалификация лидов',
    'Cold Warm Hot лиды',
    'автоматизация продаж AI',
    'AI менеджер по продажам',
    'квалификация лидов Telegram',
    'AI чат-бот для бизнеса Узбекистан',
    'конверсия продаж AI',
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
  datePublished: '2026-03-15',
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

      <main className="min-h-screen bg-background">
        <div className="pt-28 pb-10 bg-background-secondary border-b border-border">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-sm text-[#64748B] mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
              <span>/</span>
              <span className="text-[#94A3B8]">Блог</span>
              <span>/</span>
              <span className="text-foreground">Квалификация лидов с AI</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>15 февраля 2025</span>
              <span>·</span>
              <span>10 мин чтения</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}>
                Продажи
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
              Большинство менеджеров по продажам тратят 60-70% времени на работу с лидами,
              которые никогда не купят. AI меняет эту картину — автоматически определяет
              готовность каждого клиента и направляет усилия команды туда, где они реально
              дают результат.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Что такое квалификация лидов и почему она определяет выручку
              </h2>
              <div className="relative w-full h-48 rounded-xl overflow-hidden my-6">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Квалификация лидов через AI — Cold Warm Hot"
                  title="Квалификация лидов через AI — Cold Warm Hot"
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <p>
                Квалификация лида — это процесс оценки потенциального покупателя: насколько
                он соответствует портрету целевого клиента, есть ли у него реальная потребность,
                достаточный бюджет и готовность принять решение в обозримые сроки. Без
                квалификации отдел продаж тратит одинаковое время на человека, который
                купит завтра, и на того, кто "просто смотрит".
              </p>
              <p>
                Последствия отсутствия квалификации — предсказуемы. Менеджеры перегружены
                нецелевыми обращениями, конверсия из лида в сделку остаётся низкой, а
                лучшие клиенты — те, кто готов покупать прямо сейчас — иногда теряются,
                потому что менеджер был занят работой с менее перспективными контактами.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Система Cold / Warm / Hot: три стадии готовности клиента
              </h2>
              <p>
                AI Solution использует трёхуровневую систему квалификации, которая точно
                отражает реальную картину воронки продаж.
              </p>
              <p>
                <strong className="text-foreground">Cold — холодный лид.</strong> Человек
                проявил первичный интерес: написал в мессенджер, спросил общий вопрос о
                продукте или компании. Он находится в самом начале пути — сравнивает варианты,
                ещё не сформировал чёткое решение. Передавать такого лида менеджеру сейчас —
                преждевременно и неэффективно. AI ведёт его самостоятельно: отвечает на
                вопросы, отправляет релевантную информацию, устанавливает доверие.
              </p>
              <p>
                <strong className="text-foreground">Warm — тёплый лид.</strong> Клиент активно
                изучает продукт, задаёт конкретные вопросы о характеристиках, условиях,
                стоимости. Он явно рассматривает покупку, но ещё не принял окончательного
                решения. AI продолжает вести диалог, предоставляет детальную информацию,
                снимает возражения. Менеджер получает уведомление и готовится к более
                активному участию.
              </p>
              <p>
                <strong className="text-foreground">Hot — горячий лид.</strong> Клиент готов
                купить: спрашивает о способах оплаты, уточняет дату поставки, просит
                выставить счёт. Это момент для немедленного подключения менеджера. AI
                мгновенно отправляет уведомление с полным контекстом разговора — и менеджер
                переключается на этого клиента в приоритетном порядке.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Как AI определяет статус лида автоматически
              </h2>
              <p>
                AI анализирует диалог по множеству параметров одновременно: содержание
                вопросов, скорость ответов клиента, конкретность запросов, наличие сигналов
                покупательской готовности (вопросы про оплату, доставку, гарантию), а также
                поведенческие паттерны.
              </p>
              <p>
                Алгоритм квалификации настраивается под специфику каждого бизнеса. Для
                интернет-магазина сигнал Hot — вопрос о наличии конкретного SKU и способах
                оплаты. Для агентства недвижимости — уточнение бюджета и срока переезда.
                Для медицинской клиники — запрос на запись к конкретному специалисту
                в конкретную дату.
              </p>
              <p>
                AI постоянно учится на новых диалогах. Если менеджер вручную меняет статус
                лида (например, переводит Warm в Cold после личного разговора), система
                учитывает эту корректировку и уточняет свои алгоритмы. Чем дольше работает
                система — тем точнее становится квалификация.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Сценарии квалификации для разных ниш
              </h2>
              <p>
                <strong className="text-foreground">Недвижимость.</strong> AI задаёт серию
                вопросов: тип объекта (квартира/дом/коммерция), бюджет, предпочтительный
                район, срок покупки, готовность к ипотеке или наличие собственных средств.
                Клиент с чётким бюджетом и сроком "до конца месяца" немедленно получает
                статус Hot и передаётся агенту.
              </p>
              <p>
                <strong className="text-foreground">Образование и курсы.</strong> Квалификация
                включает уточнение цели обучения, текущего уровня знаний, предпочтительного
                формата (онлайн/офлайн), бюджета и наличия времени для учёбы. Студент,
                готовый записаться прямо сейчас с понятным запросом — Hot-лид.
              </p>
              <p>
                <strong className="text-foreground">B2B-услуги.</strong> В корпоративных
                продажах ключевой вопрос квалификации — ЛПР (лицо, принимающее решение).
                AI выясняет, кто инициирует запрос — конечный пользователь или человек,
                полномочный подписать договор. Контакты с ЛПР автоматически получают
                повышенный приоритет в очереди менеджеров.
              </p>
              <p>
                <strong className="text-foreground">Медицина.</strong> Квалификация помогает
                направить пациента к нужному специалисту без звонков в регистратуру. AI
                уточняет симптомы или запрос, определяет профиль врача и предлагает
                свободные слоты для записи. Острые обращения (ситуации требующие срочной
                консультации) немедленно эскалируются к администратору.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Передача горячего лида: момент истины
              </h2>
              <p>
                Скорость реакции на горячий лид — критически важный фактор. Исследования
                показывают: если менеджер связывается с горячим лидом в течение 5 минут,
                вероятность закрытия сделки в 21 раз выше, чем при контакте через 30 минут.
                Этот показатель резко падает при ожидании в несколько часов.
              </p>
              <p>
                Система AI Solution уведомляет менеджера мгновенно, как только лид получает
                статус Hot. Уведомление содержит полный контекст: имя клиента, контактные
                данные, краткое резюме диалога, выявленную потребность и ключевые сигналы
                готовности к покупке. Менеджер видит всё необходимое для профессионального
                начала разговора — без необходимости читать всю переписку с нуля.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Антифрод: защита от ботов и спама
              </h2>
              <p>
                Параллельно с квалификацией лидов AI ведёт непрерывный мониторинг качества
                входящего трафика. Система выявляет и блокирует несколько типов нежелательных
                обращений: автоматизированные боты (слишком быстрые механические ответы,
                нетипичные паттерны поведения), спам-обращения (нерелевантные запросы),
                попытки накрутки акций и промокодов.
              </p>
              <p>
                Подозрительные обращения не блокируются автоматически — они помечаются
                флагом и направляются на ручную проверку менеджером. Это позволяет избежать
                ситуации, когда система ошибочно заблокирует реального клиента с нестандартным
                запросом.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Влияние на конверсию: реальные цифры
              </h2>
              <p>
                Компании, внедрившие автоматическую квалификацию лидов через AI, фиксируют
                стабильный рост конверсии на 25-40% в первые три месяца. Основные источники
                роста: обработка 100% обращений (включая ночные и выходные), которые раньше
                терялись; сокращение времени ответа до 30 секунд; фокус менеджеров исключительно
                на горячих лидах.
              </p>
              <p>
                Дополнительный эффект — рост продуктивности отдела продаж. Менеджеры
                перестают тратить время на нецелевые обращения и концентрируются на реальных
                продажах. Количество закрытых сделок на одного сотрудника растёт в среднем
                в 2-3 раза без увеличения штата. Для большинства компаний это делает
                внедрение AI окупаемым уже на второй месяц работы.
              </p>
            </section>
          </article>

          <section className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-bold text-foreground mb-3">Решения AI Solution для вашего бизнеса</h2>
            <p className="text-[#64748B] mb-8">Выберите AI-продукт под задачи вашей компании</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/products/customer-service" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="text-2xl mb-3">🤖</div>
                <h3 className="font-bold text-foreground mb-2">Customer Service Bot</h3>
                <p className="text-sm text-[#64748B] mb-3">AI в Telegram, Instagram, WhatsApp. Ответ за 30 сек, квалификация лидов 24/7.</p>
                <span className="text-sm font-semibold text-[#3B82F6]">От $1 000 →</span>
              </Link>
              <Link href="/products/management-assistant" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-foreground mb-2">Management Assistant</h3>
                <p className="text-sm text-[#64748B] mb-3">Контроль команды, финансовый трекер, еженедельные отчёты в Telegram.</p>
                <span className="text-sm font-semibold text-[#06B6D4]">От $3 000 →</span>
              </Link>
              <Link href="/products/corporate-ai" className="group block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <div className="text-2xl mb-3">🏢</div>
                <h3 className="font-bold text-foreground mb-2">Corporate AI (RAG)</h3>
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
