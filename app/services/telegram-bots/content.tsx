'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  MessageCircle,
  UserCheck,
  CalendarCheck,
  TrendingUp,
  Check,
  Users,
  ShieldCheck,
  ArrowRight,
  Zap,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BackButton } from '@/components/shared/BackButton';
import { DetailPricingSection } from '@/components/shared/DetailPricingSection';
import { RelatedArticles } from '@/components/seo/RelatedArticles';
import { X as XIcon } from 'lucide-react';

// ─── Scroll-reveal hook ──────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── FAQ Accordion ───────────────────────────────────────────
const faqItems = [
  {
    question: 'Что если клиент напишет ночью?',
    answer:
      'AI работает 24 часа в сутки, 7 дней в неделю без перерывов. Клиент получит ответ за 30 секунд — неважно, час ночи или воскресенье.',
  },
  {
    question: 'Как AI понимает, горячий лид или нет?',
    answer:
      'AI задаёт несколько простых вопросов: что интересует клиента, когда планирует купить, есть ли бюджет. По ответам автоматически определяет статус — Холодный / Тёплый / Горячий. Горячих сразу передаёт менеджеру.',
  },
  {
    question: 'В каких мессенджерах работает?',
    answer:
      'Telegram, Instagram Direct и WhatsApp. Можно подключить один канал или все три — AI будет отвечать везде одинаково хорошо.',
  },
  {
    question: 'Нужно ли обучать AI под мой бизнес?',
    answer:
      'Да, мы обучаем AI на ваших данных: прайс, FAQ, описание услуг. Это занимает 3-5 дней. После этого AI отвечает как хороший менеджер — знает продукт, умеет продавать.',
  },
  {
    question: 'Что если AI не знает ответа?',
    answer:
      'Если вопрос выходит за рамки знаний AI — он честно скажет об этом и либо задаст уточняющий вопрос, либо сразу переключит на живого менеджера.',
  },
  {
    question: 'Как быстро всё запускается?',
    answer:
      'Стартер — за 5 рабочих дней. Профессиональный план с подключением CRM — за 7-10 дней. После запуска даём 14 дней поддержки, чтобы всё работало как надо.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 rounded-sm"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base md:text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-gray-600 leading-relaxed text-[15px]">{answer}</div>
      )}
    </div>
  );
}

// ─── Form schema ─────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  telegram: z.string().min(2, 'Введите Telegram или WhatsApp'),
});

type FormData = z.infer<typeof formSchema>;

// ─── Component ───────────────────────────────────────────────
export default function TelegramBotsContent() {
  const { i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.telegram,
          email: '',
          consent: true,
          source: 'telegram-bots-page',
          service: 'ai-sales-bot',
          language: i18n.language,
          website: '',
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Заявка отправлена! Напишем в течение часа.');
      reset();
    } catch {
      toast.error('Ошибка при отправке. Попробуйте ещё раз.');
    }
  };

  const howItWorksReveal = useScrollReveal(0.1);
  const featuresReveal = useScrollReveal(0.1);
  const channelsReveal = useScrollReveal(0.1);

  return (
    <div className="min-h-screen bg-white">
      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-24 w-full">
          <BackButton
            href="/"
            label="← На главную"
            className="text-white/90 hover:text-white mb-8"
          />

          <Breadcrumb
            className="text-white/80 mb-8"
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги' },
              { label: 'AI Продавец' },
            ]}
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            AI-ассистент отвечает за 30 секунд
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            Ваш клиент написал в Telegram. Пока менеджер спит — AI уже ответил,
            узнал имя и понял, горячий ли лид.
          </p>

          <Link
            href="#cta-form"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            Попробовать бесплатно
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Ответ за 30 сек</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>Telegram + Instagram + WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>24/7 без выходных</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — HOW IT WORKS (3 простых шага)
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Как это работает
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">
            Три простых шага — и у вас есть AI-продавец
          </p>

          <div
            ref={howItWorksReveal.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '1',
                title: 'Клиент пишет',
                desc: 'В Telegram, Instagram или WhatsApp. AI отвечает за 30 секунд — в любое время суток.',
                color: 'bg-blue-600',
              },
              {
                step: '2',
                title: 'AI квалифицирует',
                desc: 'Узнаёт имя, спрашивает о потребности и бюджете. Ставит метку: Холодный / Тёплый / Горячий.',
                color: 'bg-blue-600',
              },
              {
                step: '3',
                title: 'Горячий — к менеджеру',
                desc: 'Когда лид готов купить — AI автоматически уведомляет менеджера с резюме разговора.',
                color: 'bg-blue-600',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center"
                style={{
                  opacity: howItWorksReveal.isVisible ? 1 : 0,
                  transform: howItWorksReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 500ms ease-out',
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <div className={`w-16 h-16 rounded-full ${item.color} text-white flex items-center justify-center text-2xl font-bold mb-5 shadow-lg shadow-blue-500/25`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — WHAT DOES IT DO (4 cards)
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Что умеет AI-ассистент
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">
            Работает как лучший менеджер — только быстрее и без выходных
          </p>

          <div
            ref={featuresReveal.ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: MessageCircle,
                title: 'Отвечает на вопросы',
                desc: 'Знает ваш продукт, цены и условия. Отвечает грамотно и по делу.',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: UserCheck,
                title: 'Квалифицирует лидов',
                desc: 'Сам выясняет бюджет и срочность. Вы получаете только тёплых клиентов.',
                color: 'bg-cyan-50 text-cyan-600',
              },
              {
                icon: CalendarCheck,
                title: 'Записывает на встречу',
                desc: 'Договаривается о звонке и записывает в календарь — без вашего участия.',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: TrendingUp,
                title: 'Передаёт горячих',
                desc: 'Когда клиент готов — менеджер получает уведомление с историей чата.',
                color: 'bg-cyan-50 text-cyan-600',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                  style={{
                    opacity: featuresReveal.isVisible ? 1 : 0,
                    transform: featuresReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 500ms ease-out',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — CHANNELS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Где работает AI
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">
            Подключите один канал или все три — везде один AI
          </p>

          <div
            ref={channelsReveal.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                name: 'Telegram',
                desc: 'Самый популярный мессенджер для бизнеса в СНГ. Быстрые ответы, группы, каналы.',
                bg: 'bg-[#2AABEE]/10',
                iconColor: 'text-[#2AABEE]',
                emoji: '✈️',
              },
              {
                name: 'Instagram',
                desc: 'Direct-сообщения в Instagram. AI отвечает на комментарии и запросы в директ.',
                bg: 'bg-pink-50',
                iconColor: 'text-pink-500',
                emoji: '📸',
              },
              {
                name: 'WhatsApp',
                desc: 'Миллиарды пользователей по всему миру. Бизнес-аккаунт с AI-ответами 24/7.',
                bg: 'bg-green-50',
                iconColor: 'text-green-500',
                emoji: '💬',
              },
            ].map((ch, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 ${ch.bg} border border-gray-100`}
                style={{
                  opacity: channelsReveal.isVisible ? 1 : 0,
                  transform: channelsReveal.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 500ms ease-out',
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <div className="text-4xl mb-4">{ch.emoji}</div>
                <h3 className={`text-xl font-bold mb-2 ${ch.iconColor}`}>{ch.name}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — PRICING
          ════════════════════════════════════════════════════════ */}
      <DetailPricingSection
        title="Тарифные планы"
        subtitle="Всё включено: настройка, обучение AI и поддержка в первые две недели."
        tiers={[
          {
            name: 'СТАРТЕР',
            price: '$199',
            period: '/месяц',
            setupNote: '+ $299 настройка',
            roi: { payback: 'Окупается за 7 дней', savings: 'Экономия ~$500/мес' },
            features: [
              '1 канал (Telegram или WhatsApp)',
              'Ответы на вопросы 24/7',
              'Квалификация лидов',
              'Уведомления менеджеру',
              'Поддержка в Telegram',
            ],
            minContract: 'Минимум 3 месяца',
          },
          {
            name: 'ПРОФЕССИОНАЛ',
            price: '$399',
            period: '/месяц',
            setupNote: '+ $499 настройка',
            popular: true,
            roi: { payback: 'Окупается за 4 дня', savings: 'Экономия ~$1,200/мес' },
            features: [
              '3 канала (TG + IG + WA)',
              'Всё из Стартера',
              'CRM интеграция',
              'Запись на встречи',
              'Приоритетная поддержка',
            ],
            minContract: 'Минимум 3 месяца',
          },
          {
            name: 'ЭНТЕРПРАЙЗ',
            price: 'Custom',
            period: '',
            setupNote: 'По запросу',
            tier3Label: 'Для крупного бизнеса',
            tier3Sub: 'Кастомные интеграции',
            features: [
              'Все каналы + кастом',
              'Глубокая интеграция с CRM/ERP',
              'Несколько AI-агентов',
              'SLA 99.9%',
              '24/7 поддержка + менеджер',
            ],
            minContract: 'По запросу',
          },
        ]}
        contactHref="#cta-form"
        comparisonTable={{
          headers: ['Стартер', 'Профессионал ⭐', 'Энтерпрайз'],
          rows: [
            { label: 'Каналы', values: ['1', <strong key="r1">3 (TG/IG/WA)</strong>, 'Все + кастом'] },
            { label: 'Квалификация лидов', values: [<Check key="c1" className="w-5 h-5 text-green-600 mx-auto" />, <Check key="c2" className="w-5 h-5 text-green-600 mx-auto" />, <Check key="c3" className="w-5 h-5 text-green-600 mx-auto" />] },
            { label: 'CRM интеграция', values: [<XIcon key="x1" className="w-5 h-5 text-red-500 mx-auto" />, <Check key="c4" className="w-5 h-5 text-green-600 mx-auto" />, <Check key="c5" className="w-5 h-5 text-green-600 mx-auto" />] },
            { label: 'Запись на встречи', values: [<XIcon key="x2" className="w-5 h-5 text-red-500 mx-auto" />, <Check key="c6" className="w-5 h-5 text-green-600 mx-auto" />, <Check key="c7" className="w-5 h-5 text-green-600 mx-auto" />] },
            { label: 'Поддержка', values: ['Telegram', 'Приоритетная', '24/7 + менеджер'] },
          ],
        }}
      />

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — FAQ
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Частые вопросы
          </h2>
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl px-6">
            {faqItems.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — CTA FORM
          ════════════════════════════════════════════════════════ */}
      <section
        id="cta-form"
        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 md:py-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Попробуйте бесплатно 14 дней
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-[700px] mx-auto mb-12">
            Запустим AI-ассистента в вашем Telegram за 5 рабочих дней.
            Никаких технических знаний не нужно.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="max-w-[480px] mx-auto flex flex-col gap-4"
          >
            <div>
              <input
                {...register('name')}
                placeholder="Ваше имя"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.name && (
                <p className="text-white/80 text-sm mt-1 text-left">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('telegram')}
                placeholder="Telegram или WhatsApp (@username)"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {errors.telegram && (
                <p className="text-white/80 text-sm mt-1 text-left">{errors.telegram.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-blue-600 w-full py-4 rounded-lg font-semibold hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-60"
            >
              {isSubmitting ? 'Отправляем...' : 'Начать бесплатно →'}
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50+ активных клиентов</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>14 дней бесплатно</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Запуск за 5 дней</span>
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles articles={[
        { slug: 'avtomatizaciya-prodazh-telegram', title: 'Автоматизация продаж через Telegram бот — руководство для бизнеса' },
        { slug: 'ai-chatbot-dlya-biznesa-uzbekistan', title: 'AI чат-бот для бизнеса в Узбекистане — полное руководство' },
      ]} />
    </div>
  );
}
