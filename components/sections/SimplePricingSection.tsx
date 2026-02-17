'use client';

/**
 * Simple Pricing Section - 3 clear pricing tiers
 */

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { MagneticButton } from '@/components/animations/MagneticButton';

const plans = [
  {
    name: 'Starter',
    price: '$199',
    period: '/мес',
    description: 'Для малого бизнеса',
    features: [
      'До 200 диалогов/мес',
      '1 канал (Telegram)',
      'Базовая аналитика',
      'Email поддержка',
      'Настройка за 1 день',
    ],
    cta: 'Начать',
    href: '#contact',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$399',
    period: '/мес',
    description: 'Для растущего бизнеса',
    features: [
      'До 1000 диалогов/мес',
      '3 канала (Telegram + Instagram + WhatsApp)',
      'Продвинутая аналитика',
      'Приоритетная поддержка 24/7',
      'Интеграция с CRM',
      'Настройка за 2 часа',
    ],
    cta: 'Начать',
    href: '#contact',
    highlighted: true,
    badge: 'Популярный',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Для крупного бизнеса',
    features: [
      'Неограниченные диалоги',
      'Все каналы + API',
      'White-label решение',
      'Выделенный менеджер',
      'SLA 99.9%',
      'Кастомная интеграция',
    ],
    cta: 'Связаться',
    href: '#contact',
    highlighted: false,
  },
];

export function SimplePricingSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1419] mb-4">
              Прозрачные цены
            </h2>
            <p className="text-lg md:text-xl text-[#536471] max-w-2xl mx-auto">
              Выберите тариф под ваши задачи. Без скрытых платежей.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              duration={0.6}
              delay={idx * 0.1}
            >
              <div
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl md:scale-105'
                    : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-sm font-semibold shadow-lg">
                    {plan.badge}
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      plan.highlighted ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span
                      className={`text-xl ${
                        plan.highlighted ? 'text-white/80' : 'text-gray-500'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      plan.highlighted ? 'text-white/90' : 'text-gray-600'
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-green-300' : 'text-green-600'
                        }`}
                      />
                      <span
                        className={`text-sm leading-relaxed ${
                          plan.highlighted ? 'text-white/95' : 'text-gray-700'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <MagneticButton strength={0.15} radius={80} className="w-full">
                  <a
                    href={plan.href}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-white text-blue-600 hover:bg-gray-50 shadow-lg'
                        : 'bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white hover:shadow-lg'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </MagneticButton>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom note */}
        <ScrollReveal duration={0.6} delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              💡 Все тарифы включают бесплатную настройку и обучение команды
            </p>
            <p className="text-sm text-gray-500">
              Не нашли подходящий тариф? <a href="#contact" className="text-blue-600 hover:underline font-medium">Свяжитесь с нами</a> для индивидуального предложения
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
