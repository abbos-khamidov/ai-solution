import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Users, Zap, ExternalLink, ShoppingCart, BarChart3, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    title: 'Автоматизация интернет-магазина',
    industry: 'E-commerce',
    description: 'AI-бот обрабатывает заказы, отвечает на вопросы и рекомендует товары',
    results: [
      { label: 'Увеличение продаж', value: '+285%', icon: TrendingUp },
      { label: 'Обработано клиентов', value: '5000+/мес', icon: Users },
      { label: 'Время ответа', value: '< 1 сек', icon: Zap },
    ],
    gradient: 'from-[#D4A853] to-[#C9A227]',
    Icon: ShoppingCart,
  },
  {
    title: 'Интеграция AmoCRM + WhatsApp',
    industry: 'B2B услуги',
    description: 'Лиды из WhatsApp автоматически в AmoCRM, автоответы и воронки продаж',
    results: [
      { label: 'Экономия времени', value: '40 часов/мес', icon: Zap },
      { label: 'Точность прогнозов', value: '94%', icon: TrendingUp },
      { label: 'Закрытых сделок', value: '+67%', icon: Users },
    ],
    gradient: 'from-[#B8923D] to-[#D4A853]',
    Icon: BarChart3,
  },
  {
    title: 'Telegram-бот для клиники',
    industry: 'Медицина',
    description: 'Запись к врачам, напоминания, онлайн-консультации через AI',
    results: [
      { label: 'Записей онлайн', value: '92%', icon: Users },
      { label: 'Снижение нагрузки', value: '-80%', icon: Zap },
      { label: 'Удовлетворенность', value: '4.9/5', icon: TrendingUp },
    ],
    gradient: 'from-[#C9A227] to-[#E8B86D]',
    Icon: Building2,
  },
];

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
      });
      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
        opacity: 0, y: 50, duration: 0.5, stagger: 0.12, ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="cases"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#030303] overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-[25%] w-96 h-96 bg-[#D4A853] rounded-full blur-[200px] opacity-[0.04]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Реальные результаты</span>
            <br />
            <span className="text-[#E8E8E8]">наших клиентов</span>
          </h2>
          <p className="text-lg text-[#666] max-w-3xl mx-auto">
            Цифры и факты, которые говорят сами за себя
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((caseStudy, index) => (
            <CaseCard key={index} caseStudy={caseStudy} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong border border-[#333] hover:border-[#D4A853]/50 transition-all duration-300"
          >
            <span className="text-lg">Посмотреть все кейсы</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ caseStudy }: { caseStudy: (typeof cases)[0] }) {
  const Icon = caseStudy.Icon;

  return (
    <div className="group">
      <div className="glass-strong rounded-2xl overflow-hidden border border-[#222] hover:border-[#D4A853]/30 transition-all duration-300 h-full">
        {/* Header */}
        <div className={`relative p-8 bg-gradient-to-br ${caseStudy.gradient}`}>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm text-sm text-white/90 mb-4">
              {caseStudy.industry}
            </div>
            <h3 className="text-xl font-bold text-[#030303]">{caseStudy.title}</h3>
          </div>
          <Icon className="absolute top-6 right-6 w-12 h-12 text-black/10" />
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-[#888] mb-6 text-sm">{caseStudy.description}</p>

          <div className="space-y-3">
            {caseStudy.results.map((result, i) => {
              const ResultIcon = result.icon;
              return (
                <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#D4A853]/10 flex items-center justify-center">
                      <ResultIcon className="w-4 h-4 text-[#D4A853]" />
                    </div>
                    <span className="text-sm text-[#888]">{result.label}</span>
                  </div>
                  <span className="font-bold text-gradient">{result.value}</span>
                </div>
              );
            })}
          </div>

          <a
            href="#contact"
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full glass border border-transparent hover:border-[#D4A853]/20 transition-all duration-300 group/btn"
          >
            <span className="text-sm">Подробнее</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
