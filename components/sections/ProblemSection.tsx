'use client';

/**
 * Problem Section - Shows 3 key problems AI sales assistant solves
 */

import React from 'react';
import { DollarSign, Clock, TrendingDown } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const problems = [
  {
    icon: DollarSign,
    emoji: '💸',
    title: '30% лидов потеряно',
    description: 'Менеджеры отвечают через 2-4 часа. Клиент уже ушёл к конкурентам.',
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    borderColor: 'border-red-200',
  },
  {
    icon: Clock,
    emoji: '⏰',
    title: 'Работаем только 9-18',
    description: 'Лиды приходят ночью, в выходные. Никто не отвечает.',
    color: 'orange',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-200',
  },
  {
    icon: TrendingDown,
    emoji: '💰',
    title: 'Упущенная прибыль',
    description: 'Каждый потерянный лид = $500-5000 упущенных.',
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
];

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="about">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1419] mb-4">
              Знакомая ситуация?
            </h2>
            <p className="text-lg md:text-xl text-[#536471] max-w-2xl mx-auto">
              Пока ваши менеджеры спят, конкуренты забирают клиентов
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <ScrollReveal
                key={idx}
                direction="up"
                duration={0.6}
                delay={idx * 0.1}
              >
                <div
                  className={`relative p-6 md:p-8 rounded-2xl border-2 ${problem.borderColor} ${problem.bgColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  {/* Emoji badge */}
                  <div className="text-5xl mb-4">{problem.emoji}</div>

                  {/* Title */}
                  <h3 className={`text-xl md:text-2xl font-bold ${problem.textColor} mb-3`}>
                    {problem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#536471] leading-relaxed">
                    {problem.description}
                  </p>

                  {/* Decorative corner */}
                  <div
                    className={`absolute top-4 right-4 w-12 h-12 rounded-full ${problem.bgColor} opacity-50 blur-xl`}
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom stat */}
        <ScrollReveal duration={0.6} delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border-2 border-red-200 shadow-lg">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-lg md:text-xl font-semibold text-[#0F1419]">
                В среднем бизнес теряет <span className="text-red-600">30% лидов</span> из-за медленного ответа
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
