'use client';

import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Flower2,
  GraduationCap,
  Megaphone,
  HeartPulse,
  ShoppingBag,
  Users,
  Building,
  Shirt,
  Wrench,
  BriefcaseBusiness,
  BarChart3,
  Headphones,
  Factory,
  BookOpen,
  Network,
} from 'lucide-react';

type Case = {
  icon: LucideIcon;
  title: string;
  problem: string;
  effect: string;
  color: string;
};

const segments: { label: string; cases: Case[] }[] = [
  {
    label: 'Малый бизнес',
    cases: [
      { icon: Flower2,         title: 'Цветочные магазины',  problem: 'заявки ночью не теряются',              effect: 'больше продаж без найма менеджера',                  color: '#F472B6' },
      { icon: GraduationCap,   title: 'Учебные центры',      problem: 'отвечает на частые вопросы',            effect: 'администратор не тратит часы на переписку',          color: '#38BDF8' },
      { icon: HeartPulse,      title: 'Клиники',             problem: 'запись и перенос визитов',              effect: 'меньше пропущенных пациентов',                       color: '#34D399' },
      { icon: Megaphone,       title: 'Агентства и услуги',  problem: 'быстрый ответ и квалификация',          effect: 'выше шанс закрытия заявки',                         color: '#A78BFA' },
      { icon: ShoppingBag,     title: 'Онлайн-магазины',     problem: 'отвечает сразу в каналах',              effect: 'меньше брошенных заказов',                          color: '#FB923C' },
    ],
  },
  {
    label: 'Средний бизнес',
    cases: [
      { icon: Users,           title: 'Отдел продаж',            problem: 'лиды распределяются, follow-up не забывается', effect: 'растёт конверсия сделок',                           color: '#3B82F6' },
      { icon: Building,        title: 'Учебные центры (сеть)',   problem: 'единый сценарий и контроль',                  effect: 'меньше хаоса в филиалах',                           color: '#38BDF8' },
      { icon: Shirt,           title: 'Текстиль и опт',          problem: 'заявки собираются автоматически',             effect: 'менеджеры работают только с готовыми клиентами',    color: '#F59E0B' },
      { icon: Wrench,          title: 'Сервисные компании',      problem: 'порядок в каналах и аналитика',               effect: 'понятно, откуда приходят деньги',                   color: '#64748B' },
      { icon: BriefcaseBusiness, title: 'Консалтинг',            problem: 'квалификация лидов',                          effect: 'менеджеры не тратят время на нецелевых',            color: '#A78BFA' },
    ],
  },
  {
    label: 'Крупный бизнес',
    cases: [
      { icon: BarChart3,   title: 'Руководство',                  problem: 'видит узкие места продаж и процессов',     effect: 'решения принимаются на основе данных',              color: '#06B6D4' },
      { icon: Headphones,  title: 'Колл-центр / админы',          problem: 'снижает нагрузку и расходы на поддержку', effect: 'экономия на персонале',                             color: '#F472B6' },
      { icon: Factory,     title: 'Производство / дистрибуция',   problem: 'заявки идут в CRM/ERP',                   effect: 'прозрачность и контроль SLA',                       color: '#64748B' },
      { icon: BookOpen,    title: 'Корпоративные знания',          problem: 'сотрудники находят ответы мгновенно',     effect: 'ускорение решений и меньше ошибок',                 color: '#34D399' },
      { icon: Network,     title: 'Сети клиник / филиалов',       problem: 'единый стандарт коммуникаций',            effect: 'контроль качества и аналитика по филиалам',         color: '#38BDF8' },
    ],
  },
];

export function SocialProofSection() {
  const [active, setActive] = useState(0);
  const current = segments[active];

  function scrollToPricing() {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="py-14 md:py-20 bg-[#05050A]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F8FAFC]">
            Кому уже помогает AI&nbsp;Solution
          </h2>
          <p className="mt-2 text-[#64748B] max-w-xl mx-auto">
            Выберите масштаб бизнеса — и посмотрите, какие задачи AI уже закрывает и где он приносит деньги.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex rounded-xl p-1 gap-1"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {segments.map((seg, idx) => (
              <button
                key={seg.label}
                onClick={() => setActive(idx)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  active === idx
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white shadow-lg shadow-blue-500/20'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards — key forces remount → replays CSS animation on tab switch */}
        <div
          key={active}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-[fadeIn_0.25s_ease-out]"
        >
          {current.cases.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3.5 rounded-xl p-4"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
              >
                <item.icon style={{ color: item.color, width: 18, height: 18 }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F8FAFC]">{item.title}</p>
                <p className="text-sm text-[#64748B] leading-snug mt-0.5">
                  {item.problem}{' '}
                  <span className="text-[#34D399] font-medium">→ {item.effect}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={scrollToPricing}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-sm transition-opacity hover:opacity-90"
          >
            Посмотреть решение для моего бизнеса
          </button>
          <p className="mt-2 text-xs text-[#64748B] max-w-sm mx-auto">
            Покажем, как AI Solution может увеличить заявки или снизить расходы именно у вас.
          </p>
          <p className="mt-4 text-xs text-[#475569]">
            AI Solution уже внедряется в бизнесы разных масштабов — от локальных компаний до сетевых организаций.
          </p>
        </div>

      </div>
    </section>
  );
}
