import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Server, FileText, CreditCard, Layers, CheckCircle } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SITE_URL, createAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Безопасность данных и условия работы | AI Solution',
  description:
    'NDA до старта, on-premise вариант, официальный договор по законам РУз. Предоплата 50% + постоплата. Условия работы с AI Solution в Ташкенте.',
  alternates: createAlternates(`${SITE_URL}/security`),
};

const SECTIONS = [
  {
    icon: Shield,
    h2: 'Конфиденциальность и NDA',
    text: 'До начала любых работ подписываем соглашение о неразглашении (NDA). Информация о вашем бизнесе, клиентах, процессах и данных не передаётся третьим лицам. Соглашение составляется по законодательству Республики Узбекистан и имеет юридическую силу.',
  },
  {
    icon: Server,
    h2: 'Данные на вашем сервере',
    text: 'Предлагаем on-premise вариант развёртывания — бот и база данных работают на вашем собственном сервере или облаке. После сдачи проекта мы не имеем доступа к переписке ваших клиентов. Ваши данные не покидают вашу инфраструктуру.',
  },
  {
    icon: FileText,
    h2: 'Официальный договор',
    text: 'Работаем только по официальному договору. Юрисдикция: Республика Узбекистан. Договор фиксирует полный объём работ, сроки сдачи, стоимость и гарантии качества. Все обязательства сторон прописаны чётко и прозрачно.',
  },
  {
    icon: CreditCard,
    h2: 'Условия оплаты',
    text: 'Предоплата 50% при подписании договора — фиксирует старт работ. Постоплата 50% после приёмки, тестирования и вашего подтверждения. Оплата через официальные банковские каналы Узбекистана.',
  },
  {
    icon: Layers,
    h2: 'Параллельное внедрение',
    text: 'Внедрение не останавливает ваши текущие бизнес-процессы. Бот подключается к существующим каналам (Telegram, Instagram, WhatsApp) параллельно с работой менеджеров. Переход происходит плавно — вы контролируете каждый этап.',
  },
  {
    icon: CheckCircle,
    h2: 'Гарантии и поддержка',
    text: '30 дней бесплатной технической поддержки после сдачи проекта. SLA соглашение для Enterprise тарифа. Оперативная поддержка по Telegram в рабочее время. Доработки по согласованному ТЗ включены в стоимость.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', url: '/' },
          { name: 'Безопасность данных и условия работы', url: '/security/' },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-background text-foreground pb-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Безопасность данных и условия работы
          </h1>
          <p className="text-lg text-[#94A3B8] mb-12">
            Работаем официально, прозрачно и по законам Республики Узбекистан
          </p>

          <div className="space-y-6">
            {SECTIONS.map(({ icon: Icon, h2, text }) => (
              <div
                key={h2}
                className="rounded-2xl p-6 md:p-8 border border-white/10"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)', color: '#3B82F6' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{h2}</h2>
                </div>
                <p className="text-[#94A3B8] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
