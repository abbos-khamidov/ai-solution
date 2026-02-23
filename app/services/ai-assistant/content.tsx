'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Brain, BookOpen, MessageSquare, Cpu,
  Globe, Shield, Workflow, Zap,
  Check, Users, ShieldCheck, Phone,
  ArrowRight, TrendingUp,
} from 'lucide-react';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BackButton } from '@/components/shared/BackButton';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { DetailPricingSection } from '@/components/shared/DetailPricingSection';
import { CounterAnimation } from '@/components/shared/CounterAnimation';
import { RelatedArticles } from '@/components/seo/RelatedArticles';

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

const featureIcons = [Brain, BookOpen, MessageSquare, Cpu, Globe, Shield, Workflow, Zap];

const features = [
  { title: 'Обучение на корпоративных данных', description: 'ИИ изучает все документы, контракты, email и базу знаний вашей компании.', benefits: ['Автоматическая индексация', 'Обновление в реальном времени', 'Поиск по всей базе'] },
  { title: 'Интеграция с рабочими инструментами', description: 'Подключение к Notion, Slack, Google Workspace, Microsoft 365.', benefits: ['Единый интерфейс', 'Синхронизация данных', 'Автоматические уведомления'] },
  { title: 'Контекстные ответы', description: 'Понимает контекст вопроса и даёт точные ответы на основе ваших данных.', benefits: ['Понимание намерений', 'Ссылки на источники', 'Многоходовые диалоги'] },
  { title: 'Кастомизация по отделам', description: 'Разные инструкции и доступ для продаж, маркетинга, HR, IT.', benefits: ['Ролевой доступ', 'Отдельные базы знаний', 'Кастомные промпты'] },
  { title: 'Многоязычная поддержка', description: 'Работает на русском, английском, узбекском и китайском языках.', benefits: ['4 языка из коробки', 'Автоопределение языка', 'Кросс-язычный поиск'] },
  { title: 'Безопасность данных', description: 'Полное шифрование, соответствие GDPR, возможность on-premise развёртывания.', benefits: ['AES-256 шифрование', 'Аудит доступа', 'Изоляция данных'] },
  { title: 'Автоматизация задач', description: 'Генерация отчётов, заполнение документов, создание задач автоматически.', benefits: ['Шаблоны документов', 'Автоматические действия', 'Интеграция с таск-менеджерами'] },
  { title: 'Аналитика использования', description: 'Отслеживание частых вопросов, пробелов в знаниях, эффективности.', benefits: ['Дашборд использования', 'Топ вопросов', 'ROI отчёты'] },
];

const steps = [
  { title: 'Аудит данных', description: 'Анализируем структуру ваших данных, документов и рабочих процессов.', duration: '1-2 дня' },
  { title: 'Настройка и индексация', description: 'Подключаем источники данных, индексируем документы и базу знаний.', duration: '3-5 дней' },
  { title: 'Обучение модели', description: 'Тонкая настройка ИИ под специфику вашего бизнеса и терминологию.', duration: '1-2 недели' },
  { title: 'Тестирование', description: 'Проверяем точность ответов, корректируем инструкции и доступ.', duration: '3-5 дней' },
  { title: 'Пилотный запуск', description: 'Запускаем для одного отдела, собираем обратную связь.', duration: '1-2 недели' },
  { title: 'Масштабирование', description: 'Разворачиваем на всю компанию, обучаем сотрудников.', duration: 'Непрерывно' },
];

const faqData = [
  { question: 'На каких данных обучается ассистент?', answer: 'На любых корпоративных документах: PDF, Word, Google Docs, Notion, Confluence, email, Slack-переписки. Мы индексируем всё, к чему вы дадите доступ.' },
  { question: 'Насколько точны ответы?', answer: 'Точность 90-95% при правильной настройке. Ассистент всегда ссылается на источник, что позволяет верифицировать ответ.' },
  { question: 'Безопасно ли передавать корпоративные данные?', answer: 'Полностью. AES-256 шифрование, изолированная среда, GDPR compliance. Доступен on-premise вариант для максимальной безопасности.' },
  { question: 'Сколько времени занимает внедрение?', answer: 'Базовая настройка — 2-3 недели. Полная кастомизация с интеграциями — 4-6 недель.' },
  { question: 'Можно ли ограничить доступ по отделам?', answer: 'Да, настраиваем ролевой доступ. Каждый отдел видит только свою базу знаний и документы.' },
  { question: 'Какие языки поддерживаются?', answer: 'Русский, английский, узбекский, китайский. Можем добавить другие языки по запросу.' },
  { question: 'Как обновляется база знаний?', answer: 'Автоматически при изменении источников данных. Также доступно ручное обновление через панель управления.' },
  { question: 'Есть ли пробный период?', answer: 'Да, 14 дней бесплатно на плане Advanced. Полный функционал без ограничений.' },
];

const formSchema = z.object({ name: z.string().min(1), email: z.string().email(), phone: z.string().min(5), message: z.string().optional() });
type FormData = z.infer<typeof formSchema>;

export default function AIAssistantContent() {
  const { i18n } = useTranslation();
  const featuresReveal = useScrollReveal(0.1);
  const timelineReveal = useScrollReveal(0.1);
  const casesReveal = useScrollReveal(0.1);

  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(formSchema) });
  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, consent: true, source: 'ai-assistant-page', service: 'ai-assistant', language: i18n.language, website: '' }) });
      if (!res.ok) throw new Error();
      toast.success('Заявка отправлена!');
      reset();
    } catch { toast.error('Ошибка. Попробуйте ещё раз.'); }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1 - HERO */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 py-24 w-full">
          <BackButton href="/#solutions" label="Ко всем решениям" className="text-white/90 hover:text-white mb-8" />
          <Breadcrumb className="text-white/80 mb-8" items={[{ label: 'Главная', href: '/' }, { label: 'Услуги' }, { label: 'ИИ-ассистент' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">Персональный ИИ-ассистент на базе знаний компании</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">ChatGPT, обученный на ваших данных. Мгновенные ответы на любые вопросы о компании. Экономия 15+ часов в неделю.</p>
          <Link href="#cta-form" className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            Начать проект <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="flex flex-wrap items-center gap-6 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>500+ клиентов</span></div>
            <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /><span>15 ч/неделю экономии</span></div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>24/7 поддержка</span></div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - FEATURES */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Возможности и преимущества</h2>
          <div ref={featuresReveal.ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {features.map((feature, idx) => {
              const Icon = featureIcons[idx] ?? Brain;
              return (
                <div key={idx} className="flex gap-5 transition-all duration-500" style={{ opacity: featuresReveal.isVisible ? 1 : 0, transform: featuresReveal.isVisible ? 'translateY(0)' : 'translateY(40px)', transitionDelay: `${idx * 100}ms` }}>
                  <div className="flex-shrink-0"><div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center"><Icon className="w-6 h-6 text-purple-600" /></div></div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">{feature.description}</p>
                    <ul className="space-y-2">{feature.benefits.map((b, i) => (<li key={i} className="flex items-center gap-2 text-gray-600 text-sm"><Check className="w-4 h-4 text-purple-600 flex-shrink-0" />{b}</li>))}</ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 - TIMELINE */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-gray-900">Процесс внедрения</h2>
          <div ref={timelineReveal.ref} className="relative">
            <div className="absolute left-10 top-0 bottom-0 w-1 bg-purple-200 origin-top transition-transform duration-[1500ms] ease-out" style={{ transform: timelineReveal.isVisible ? 'scaleY(1)' : 'scaleY(0)' }} />
            <div className="space-y-12">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-8" style={{ opacity: timelineReveal.isVisible ? 1 : 0, transform: timelineReveal.isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)', transition: 'all 500ms ease-out', transitionDelay: `${300 + idx * 200}ms` }}>
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/20 z-10">{idx + 1}</div>
                  <div className="pt-3">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700 mb-3 leading-relaxed">{step.description}</p>
                    <span className="inline-block text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">{step.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - PRICING */}
      <DetailPricingSection
        title="Тарифные планы"
        subtitle="Выберите план, который подходит вашей компании. Все планы включают базу данных, админ-панель и техподдержку."
        tiers={[
          { name: 'ПРОФЕССИОНАЛ', price: '$197', period: '/месяц', setupNote: '+ $997 настройка', roi: { payback: 'Окупается за 5 дней', savings: 'Экономия 15+ часов/неделю' }, features: ['Обучен на ваших данных', 'Безлимитные запросы', 'Интеграция Notion/Slack', 'Кастомная логика', '24/7 поддержка'], minContract: 'Минимум 6 месяцев' },
          { name: 'БИЗНЕС', price: '$397', period: '/месяц', setupNote: '+ $1,497 настройка', popular: true, roi: { payback: 'Окупается за 7 дней', savings: 'Экономия 20+ часов/неделю' }, features: ['Всё из Профессионал', 'Мультиотделы', 'API доступ', 'Dedicated менеджер', 'Приоритетная поддержка'], minContract: 'Минимум 6 месяцев' },
          { name: 'ENTERPRISE', price: 'Custom', period: '', setupNote: 'По запросу', tier3Label: 'Для крупных компаний', tier3Sub: 'On-premise и полная кастомизация', features: ['Неограниченные пользователи', 'On-premise', 'Полная кастомизация', 'SLA 99.9%', 'Персональный менеджер'], minContract: 'По запросу' },
        ]}
        contactHref="#cta-form"
        comparisonTable={{
          headers: ['Профессионал', 'Бизнес ⭐', 'Enterprise'],
          rows: [
            { label: 'Пользователи', values: ['До 50', <strong key="r1">До 500</strong>, 'Безлимит'] },
            { label: 'Запросы', values: ['Безлимит', 'Безлимит', 'Безлимит'] },
            { label: 'Интеграции', values: ['Notion/Slack', 'Все + API', 'On-premise'] },
            { label: 'Поддержка', values: ['24/7', 'Приоритетная', 'Dedicated менеджер'] },
          ],
        }}
      />

      {/* SECTION 5 - CASE STUDIES */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Кейсы и результаты</h2>
          <div ref={casesReveal.ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {[
              { client: 'IT Consulting Firm', industry: 'Консалтинг', challengeTitle: 'Вызов', challenge: 'Консультанты тратили 3 часа в день на поиск информации в корпоративной базе знаний из 10,000+ документов.', solutionTitle: 'Решение', solution: 'Внедрили ИИ-ассистента с доступом ко всем документам, шаблонам и процедурам компании.', resultsTitle: 'Результаты', metrics: [{ value: 15, suffix: ' ч', label: 'Экономия в неделю', change: 'на команду' }, { value: 95, suffix: '%', label: 'Точность ответов', change: 'с верификацией' }, { value: 40, suffix: '%', label: 'Рост продуктивности', change: 'за 2 месяца' }, { value: 4, suffix: 'x', label: 'ROI', change: 'за первый квартал' }] },
              { client: 'Manufacturing Corp', industry: 'Производство', challengeTitle: 'Вызов', challenge: 'HR отдел получал 200+ одинаковых вопросов в месяц от сотрудников о политиках, льготах и процедурах.', solutionTitle: 'Решение', solution: 'Развернули ИИ-ассистента для HR с базой всех политик, инструкций и FAQ для сотрудников.', resultsTitle: 'Результаты', metrics: [{ value: 85, suffix: '%', label: 'Автоматизация HR', change: 'запросов' }, { value: 30, suffix: ' сек', label: 'Время ответа', change: 'было 4 часа' }, { value: 50, suffix: '%', label: 'Снижение нагрузки', change: 'на HR отдел' }, { value: 96, suffix: '%', label: 'Удовлетворённость', change: 'сотрудников' }] },
            ].map((cs, cIdx) => (
              <div key={cIdx} className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-500" style={{ opacity: casesReveal.isVisible ? 1 : 0, transform: casesReveal.isVisible ? 'translateY(0)' : 'translateY(30px)', transitionDelay: `${cIdx * 200}ms` }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-[120px] h-10 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500 font-medium">{cs.client}</div>
                  <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded font-medium">{cs.industry}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{cs.challengeTitle}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{cs.challenge}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{cs.solutionTitle}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{cs.solution}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{cs.resultsTitle}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-gray-50 rounded-xl p-4 text-center">
                      <CounterAnimation target={m.value} suffix={m.suffix} className="text-3xl md:text-4xl font-bold text-purple-600" />
                      <p className="text-sm text-gray-600 mt-1">{m.label}</p>
                      <p className="text-xs text-green-600 font-medium mt-1 flex items-center justify-center gap-1"><TrendingUp className="w-3 h-3" />{m.change}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - FAQ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Часто задаваемые вопросы</h2>
          <FAQAccordion items={faqData} />
        </div>
      </section>

      {/* SECTION 7 - CTA */}
      <section id="cta-form" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Готовы внедрить ИИ-ассистента?</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-[800px] mx-auto mb-12">Запишитесь на бесплатную демонстрацию и оцените возможности на ваших данных</p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-[600px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input {...register('name')} placeholder="Ваше имя" className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white" />
            <input {...register('email')} type="email" placeholder="Email" className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white" />
            <input {...register('phone')} type="tel" placeholder="Телефон" className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white" />
            <textarea {...register('message')} placeholder="Расскажите о вашем проекте" rows={4} className="sm:col-span-2 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white resize-none" />
            <button type="submit" disabled={isSubmitting} className="sm:col-span-2 bg-white text-purple-600 w-full py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 disabled:opacity-60">
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-white/80">
            <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>500+ довольных клиентов</span></div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /><span>Гарантия качества</span></div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>Бесплатная демо</span></div>
          </div>
        </div>
      </section>

      <RelatedArticles articles={[
        { slug: 'lichny-ii-bot-assistant', title: 'Личный AI бот-ассистент для руководителя бизнеса' },
        { slug: 'sozdat-chatgpt-dlya-kompanii', title: 'Как создать свой ChatGPT для компании — корпоративный AI' },
      ]} />
    </div>
  );
}
