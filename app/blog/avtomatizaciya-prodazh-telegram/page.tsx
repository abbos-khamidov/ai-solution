import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createAlternates } from '@/lib/seo';

const SITE_URL = 'https://aisolution.uz';
const SLUG = 'avtomatizaciya-prodazh-telegram';
const TITLE = 'Автоматизация продаж через Telegram бот — руководство для бизнеса';
const DESCRIPTION =
  'Как Telegram-бот с AI автоматизирует продажи в Узбекистане: квалификация лидов, работа 24/7, интеграция с CRM. Реальные цифры и кейсы.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'автоматизация продаж Telegram бот',
    'Telegram бот для продаж Узбекистан',
    'AI в Telegram бизнес',
    'автоответчик в Telegram',
    'квалификация лидов Telegram',
    'Telegram бот для бизнеса Ташкент',
    'AI менеджер по продажам',
    'автоматизация мессенджеров',
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
              <span className="text-foreground">Автоматизация продаж Telegram</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
              <span>8 февраля 2025</span>
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
              Telegram — основной канал коммуникации в Узбекистане и СНГ. Каждый день туда
              пишут тысячи потенциальных клиентов. Без автоматизации большинство этих
              обращений превращается в упущенные сделки.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <article className="space-y-8 text-[#94A3B8] leading-relaxed text-base md:text-lg">

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Почему Telegram — главный канал продаж в Узбекистане
              </h2>
              <div className="relative w-full h-48 rounded-xl overflow-hidden my-6">
                <Image
                  src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80"
                  alt="Автоматизация продаж через Telegram-бот"
                  title="Автоматизация продаж через Telegram-бот"
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              <p>
                Статистика говорит сама за себя: в Узбекистане Telegram занимает первое место
                среди мессенджеров по проникновению. По данным исследований, более 80% активных
                интернет-пользователей страны регулярно пользуются Telegram для личного общения
                и общения с бизнесом. Это не просто мессенджер — это де-факто национальная
                коммуникационная платформа.
              </p>
              <p>
                Клиенты привыкли находить товары и услуги через Telegram: каналы с прайсами,
                боты для заказа, прямые сообщения в компании. Покупательское поведение
                изменилось — люди ждут мгновенной реакции в мессенджере так же, как ждут
                быстрой загрузки сайта. Заставил клиента ждать два часа — потерял его.
              </p>
              <p>
                Для бизнеса Telegram удобен тем, что снижает барьер входа для клиента:
                не нужно искать сайт, заполнять формы, ждать звонка. Написал — получил ответ.
                Именно этот пользовательский опыт делает Telegram самым конверсионным каналом
                для многих узбекских компаний.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Что теряет бизнес без автоматизации в Telegram
              </h2>
              <p>
                Представьте типичный сценарий: пятница, 19:30. Клиент пишет в Telegram вашей
                компании — хочет уточнить наличие товара и цену. Менеджеры уже ушли домой.
                Бот либо молчит, либо отвечает шаблонным "мы перезвоним в рабочее время".
                К понедельнику клиент уже купил у конкурента.
              </p>
              <p>
                По данным наших клиентов, 35-45% обращений в Telegram приходят в нерабочее
                время: вечером, ночью, в выходные. Это не маргинальный сегмент — это люди,
                которые принимают решения о покупке в то время, когда у них есть свободная
                минута. Без автоматизации весь этот трафик уходит конкурентам.
              </p>
              <p>
                Вторая проблема — скорость ответа в рабочее время. Менеджеры параллельно
                общаются с несколькими клиентами, работают в CRM, выполняют операционные
                задачи. Среднее время первого ответа в мессенджере у компаний без автоматизации —
                47 минут. Исследования показывают: конверсия падает на 80% если ответ не
                получен в течение первых 5 минут.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Как работает AI Telegram-бот для продаж
              </h2>
              <p>
                AI Telegram-бот — это не кнопочное меню с ограниченным набором ответов. Это
                полноценный продажный ассистент, который ведёт естественный диалог, понимает
                контекст и движется к конкретной цели: квалифицировать лида и либо завершить
                сделку, либо передать горячий контакт менеджеру.
              </p>
              <p>
                Когда клиент пишет в Telegram, AI отвечает в течение 30 секунд — в любое время
                суток. Первое сообщение — приветствие и уточнение запроса. AI задаёт открытые
                вопросы, чтобы понять потребность: что ищете, для чего, какой бюджет,
                в какие сроки нужно решение.
              </p>
              <p>
                По ходу диалога AI одновременно отвечает на вопросы клиента и собирает
                профиль: контактные данные, потребности, бюджет, срочность. Вся эта информация
                автоматически фиксируется и передаётся менеджеру в момент, когда требуется
                человеческое участие.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Квалификация лидов и передача менеджеру
              </h2>
              <p>
                Главная функция AI Telegram-бота для продаж — не просто ответить на вопрос,
                а определить реальный потенциал клиента. Система присваивает каждому обращению
                статус: Cold, Warm или Hot.
              </p>
              <p>
                Cold-лидов (не готовы к покупке сейчас) AI ведёт самостоятельно: отправляет
                полезный контент, отвечает на вопросы, периодически возвращается с актуальными
                предложениями. Менеджер не тратит время на тех, кто ещё не созрел для покупки.
              </p>
              <p>
                При появлении Hot-лида — сигнал моментальный. Менеджер получает уведомление
                с полным контекстом разговора: что спрашивал клиент, какие возражения высказал,
                какой бюджет обозначил, как долго думал. Это позволяет войти в разговор
                профессионально — не заставляя клиента повторять всё сначала.
              </p>
              <p>
                Важный нюанс: AI умеет грамотно завершать диалог, если клиент принял негативное
                решение. Он не давит, не спамит повторными сообщениями, а закрывает диалог
                с предложением вернуться, когда потребность снова станет актуальной. Клиент
                остаётся с хорошим впечатлением — и часто возвращается.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Интеграция с CRM и системами учёта
              </h2>
              <p>
                Telegram-бот с AI не работает в изоляции — он встраивается в существующую
                IT-инфраструктуру компании. Каждый новый контакт автоматически создаётся
                в CRM-системе (Bitrix24, amoCRM) с заполненными полями: имя, контакт, источник,
                краткое описание потребности, присвоенный статус. Менеджер открывает CRM
                утром и видит готовый список лидов с приоритетами — без ручного внесения данных.
              </p>
              <p>
                Для компаний, работающих с 1С, возможна двусторонняя интеграция: бот проверяет
                реальный остаток товара перед ответом клиенту, а новый заказ через бота
                автоматически фиксируется в учётной системе. Это исключает ситуации, когда
                AI обещает наличие товара, которого уже нет на складе.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Реальные цифры и результаты
              </h2>
              <p>
                Компании, внедрившие AI Telegram-бота с квалификацией лидов, фиксируют схожие
                результаты: конверсия из обращения в сделку вырастает на 25-40% — главным
                образом за счёт обработки ночных и выходных обращений, которые раньше
                терялись. Время ответа сокращается с десятков минут до 30 секунд.
              </p>
              <p>
                Продуктивность менеджеров растёт: освободившись от рутинных ответов на
                повторяющиеся вопросы, они фокусируются на реальных переговорах. Количество
                обработанных "горячих" сделок на одного менеджера вырастает в среднем в 2-3 раза.
                При этом удовлетворённость клиентов не падает — а часто растёт, потому что
                они получают ответ мгновенно, а не ждут.
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
