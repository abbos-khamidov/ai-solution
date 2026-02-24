'use client';

import React from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { PricingCards, PricingPlan } from '@/components/shared/PricingCards';

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    setupPrice: '$390',
    monthlyPrice: '$150 / мес',
    description: 'Быстрый тест AI для малого бизнеса',
    problem: 'Теряете заявки в нерабочее время',
    result: 'AI отвечает 24/7, вы не теряете ни одного лида',
    roi: {
      label: 'Окупается за 1–2 месяца',
      detail: 'Заменяет ночную смену оператора',
    },
    highlighted: false,
    features: [
      'AI-бот в Telegram',
      '1 сценарий общения',
      'До 500 диалогов / мес',
      'Квалификация лидов Cold / Warm / Hot',
      'Уведомления менеджеру о горячих лидах',
      'Запуск за 1–2 дня',
    ],
    whenNeeded: [
      'Отвечаете клиентам вручную',
      'Много одинаковых вопросов каждый день',
      'Заявки теряются в нерабочее время',
    ],
    ctaText: 'Попробовать за $390',
  },
  {
    name: 'Growth',
    badge: 'Популярный',
    setupPrice: '$2 900',
    monthlyPrice: '$900 / мес',
    description: 'Рост продаж через AI-автоматизацию',
    problem: 'Менеджеры не справляются с потоком, заявки теряются',
    result: 'Рост заявок на 30–70%, полная воронка под контролем',
    roi: {
      label: 'Увеличивает заявки на 30–70%',
      detail: 'Средний чек внедрения $4 200 · окупается за 2–4 месяца',
    },
    highlighted: true,
    features: [
      'Telegram + Instagram + WhatsApp',
      'До 3 000 диалогов / мес',
      'Интеграция с CRM (Bitrix24, amoCRM)',
      'AI-аналитика и дашборд руководителя',
      'Антифрод и фильтрация спама',
      'Приоритетная поддержка 24/7',
      'Настройка за 3–5 дней',
    ],
    whenNeeded: [
      'Есть менеджеры, но заявки теряются',
      'Клиенты ждут ответа слишком долго',
      'Нет аналитики по лидам и воронке',
    ],
    ctaText: 'Обсудить внедрение',
  },
  {
    name: 'Enterprise',
    setupPrice: 'от $7 500',
    monthlyPrice: 'от $2 500 / мес',
    description: 'AI-система управления для среднего и крупного бизнеса',
    problem: 'Нет прозрачности: данные в разных системах, решения принимаются вслепую',
    result: 'Единый AI-контроль бизнеса, экономия 1–3 зарплат сотрудников',
    roi: {
      label: 'Экономит 1–3 зарплаты сотрудников',
      detail: 'Заменяет ручную аналитику, контроль задач и отчётность',
    },
    highlighted: false,
    features: [
      'Все каналы + API-интеграции',
      'AI-аналитика, KPI-дашборды, финансы',
      'Корпоративная база знаний (RAG)',
      'Контроль задач и дедлайнов команды',
      'Еженедельные отчёты руководителю',
      'White-label и On-premise',
      'Выделенный менеджер + SLA',
    ],
    whenNeeded: [
      'Есть команда, но нет прозрачности',
      'Решения принимаются без данных',
      'Нужно контролировать продажи и процессы',
    ],
    ctaText: 'Запросить расчёт',
  },
];

export function SimplePricingSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="pricing" style={{ background: '#0D0D1A' }}>
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
              Инвестиция в рост, а не расход на IT
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
              Каждый тариф окупается за счёт роста продаж или экономии на персонале
            </p>
          </div>
        </ScrollReveal>

        <PricingCards plans={plans} defaultCtaHref="#contact" />

        <ScrollReveal duration={0.6} delay={0.4}>
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div
              className="rounded-xl p-5 text-sm text-[#94A3B8] leading-relaxed"
              style={{
                background: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
              }}
            >
              Точную стоимость считаем после бесплатного 60-минутного аудита — цена зависит от каналов, сценариев и интеграций. Аудит ни к чему не обязывает.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
