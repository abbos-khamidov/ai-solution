'use client';

/**
 * Solution Section - Shows how AI sales assistant works
 */

import React from 'react';
import { MessageSquare, Target, Bell, UserCheck, Send, ChevronRight, Instagram } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const steps = [
  {
    number: '1',
    icon: MessageSquare,
    title: 'Клиент пишет',
    description: 'AI отвечает за 30 секунд',
    color: 'blue',
  },
  {
    number: '2',
    icon: Target,
    title: 'AI квалифицирует',
    description: 'Cold / Warm / Hot',
    color: 'purple',
  },
  {
    number: '3',
    icon: Bell,
    title: 'Hot lead',
    description: 'Уведомление менеджеру',
    color: 'orange',
  },
  {
    number: '4',
    icon: UserCheck,
    title: 'Менеджер вступает',
    description: 'В диалог с теплым клиентом',
    color: 'green',
  },
];

const channels: { name: string; icon: React.ElementType; available: boolean; soon?: boolean; color: string }[] = [
  { name: 'Telegram', icon: Send, available: true, color: 'text-blue-500' },
  { name: 'Instagram', icon: Instagram, available: true, color: 'text-pink-500' },
  { name: 'WhatsApp', icon: MessageSquare, available: false, soon: true, color: 'text-green-500' },
];

export function SolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="process">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1419] mb-4">
              Как работает AI-ассистент
            </h2>
            <p className="text-lg md:text-xl text-[#536471] max-w-2xl mx-auto">
              Простая автоматизация, которая возвращает деньги в бизнес
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const colorMap = {
              blue: 'bg-blue-100 text-blue-600 border-blue-200',
              purple: 'bg-purple-100 text-purple-600 border-purple-200',
              orange: 'bg-orange-100 text-orange-600 border-orange-200',
              green: 'bg-green-100 text-green-600 border-green-200',
            };
            const color = colorMap[step.color as keyof typeof colorMap];

            return (
              <ScrollReveal
                key={idx}
                direction="up"
                duration={0.6}
                delay={idx * 0.1}
              >
                <div className="relative text-center">
                  {/* Step number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-2 ${color} font-bold text-lg mb-4`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <Icon className={`w-8 h-8 ${color.split(' ')[1]}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#0F1419] mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#536471]">
                    {step.description}
                  </p>

                  {/* Arrow connector (except last) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-6 -right-3 w-6 items-center justify-center text-[#CBD5E1]">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Channels */}
        <ScrollReveal duration={0.6} delay={0.4}>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0F1419] mb-6 text-center">
              Каналы связи
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              {channels.map((channel, idx) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={idx}
                    className={`
                      flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all
                      ${channel.available
                        ? 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${channel.available ? channel.color : 'text-gray-400'}`} />
                    <span className={`font-semibold ${channel.available ? 'text-[#0F1419]' : 'text-gray-500'}`}>
                      {channel.name}
                    </span>
                    {channel.soon && (
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-600 font-medium">
                        скоро
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom note */}
            <p className="text-center text-sm text-[#536471] mt-6">
              Подключаем любой канал связи с клиентами за 1 день
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
