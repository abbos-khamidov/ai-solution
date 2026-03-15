'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── data ──────────────────────────────────────────────── */

type Msg = { from: 'client' | 'bot'; text: string };
type BadgeKey = 'Cold' | 'Warm' | 'Hot' | 'deal';

const ALL_MSGS: Msg[] = [
  { from: 'client', text: 'Здравствуйте, хочу узнать цену на ваши услуги' },
  { from: 'bot',    text: 'Добрый день! Расскажите о вашем бизнесе — подберём решение 👋' },
  { from: 'bot',    text: 'У вас какой канал — Telegram, Instagram или WhatsApp?' },
  { from: 'client', text: 'Telegram, у нас цветочный магазин' },
  { from: 'bot',    text: '🔥 Передаю менеджеру — он свяжется через 2 минуты' },
  { from: 'bot',    text: '✅ Алексей из команды уже написал вам. Хорошего дня!' },
];

const STEPS = [
  {
    step: 1,
    title: 'Клиент пишет — AI отвечает за 30 сек',
    body:  'Пока ваш менеджер спит, AI уже обрабатывает заявку. В любое время суток, без выходных и праздников.',
    metric: '⚡ Ответ за 30 секунд',
  },
  {
    step: 2,
    title: 'AI анализирует и квалифицирует',
    body:  'За 3 секунды определяет намерение клиента и присваивает статус Cold / Warm / Hot. Холодных греет контентом, горячих — сразу менеджеру.',
    metric: '🎯 Точность квалификации 94%',
  },
  {
    step: 3,
    title: 'Hot lead — мгновенное уведомление',
    body:  'Менеджер получает в Telegram: имя клиента, его запрос и статус. Не нужно проверять CRM — всё уже готово.',
    metric: '📲 Уведомление мгновенно',
  },
  {
    step: 4,
    title: 'Менеджер входит в тёплый диалог',
    body:  'Клиент уже прогрет и знает о продукте. Менеджер видит всю историю диалога. Конверсия в 3 раза выше чем с холодного звонка.',
    metric: '📈 Конверсия x3',
  },
];

const BADGE: Record<BadgeKey, { label: string; bg: string; border: string; color: string }> = {
  Cold: { label: 'Cold',              bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)',  color: '#93C5FD' },
  Warm: { label: 'Warm',              bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.3)',  color: '#FDBA74' },
  Hot:  { label: '🔥 Hot',            bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   color: '#FCA5A5' },
  deal: { label: '✅ Сделка в работе', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.3)', color: '#6EE7B7' },
};

/* ─── component ─────────────────────────────────────────── */

export function SolutionSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  // Show step 1 immediately on mount so chat is never empty
  useEffect(() => {
    setCurrentStep(1);
  }, []);

  // IntersectionObserver — activates steps as triggers scroll into viewport
  useEffect(() => {
    const elements = document.querySelectorAll('[data-step]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = Number((entry.target as HTMLElement).dataset.step);
            setCurrentStep((prev) => Math.max(prev, step));
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Reveal chat messages progressively as currentStep increases
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (currentStep >= 1) {
      setRevealedCount((p) => Math.max(p, 1));
      timers.push(setTimeout(() => setRevealedCount((p) => Math.max(p, 2)), 800));
    }
    if (currentStep >= 2) setRevealedCount((p) => Math.max(p, 3));
    if (currentStep >= 3) setRevealedCount((p) => Math.max(p, 4));
    if (currentStep >= 4) setRevealedCount((p) => Math.max(p, 6));

    return () => timers.forEach(clearTimeout);
  }, [currentStep]);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [revealedCount]);

  const badgeKey: BadgeKey =
    currentStep >= 4 ? 'deal' :
    currentStep >= 3 ? 'Hot'  :
    currentStep >= 2 ? 'Warm' : 'Cold';

  const badge = BADGE[badgeKey];

  return (
    <section className="relative py-16 bg-[#05050A]" id="process">
      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg-in { animation: msgIn 0.4s ease forwards; }
        .chat-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.06), transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
            Смотрите как работает AI-ассистент
          </h2>
          <p className="text-lg text-[#64748B]">
            Один диалог — и клиент уже в CRM менеджера
          </p>
        </div>

        {/* Scrollytelling grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-start">

          {/* LEFT — sticky chat panel (desktop only) */}
          <div className="hidden md:block md:sticky md:top-24">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(13,13,26,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)' }}
                >
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F8FAFC]">AI Solution</p>
                  <p className="text-xs" style={{ color: '#34D399' }}>🟢 онлайн</p>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={chatRef}
                className="h-[480px] p-4 flex flex-col gap-3 overflow-y-auto chat-scroll"
                style={{ scrollbarWidth: 'none' }}
              >
                {ALL_MSGS.slice(0, revealedCount).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex msg-in ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed"
                      style={
                        msg.from === 'client'
                          ? {
                              background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                              color: '#fff',
                              borderRadius: '16px 16px 4px 16px',
                            }
                          : {
                              background: 'rgba(255,255,255,0.05)',
                              color: '#CBD5E1',
                              border: '1px solid rgba(255,255,255,0.07)',
                              borderRadius: '16px 16px 16px 4px',
                            }
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status badge */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs" style={{ color: '#475569' }}>Статус лида:</span>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: badge.bg,
                  border: `1px solid ${badge.border}`,
                  color: badge.color,
                  transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                }}
              >
                {badge.label}
              </span>
            </div>
          </div>

          {/* RIGHT — scrollable step triggers (desktop) */}
          <div className="hidden md:flex flex-col">
            {STEPS.map(({ step, title, body, metric }) => {
              const active = currentStep >= step;
              return (
                <div
                  key={step}
                  data-step={step}
                  className="min-h-screen flex items-center px-6 py-20"
                >
                  <div
                    className="pl-6 border-l-2 w-full"
                    style={{
                      borderColor: active ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                      transition: 'border-color 0.3s ease',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{
                          background: active
                            ? 'linear-gradient(135deg, #3B82F6, #06B6D4)'
                            : 'rgba(255,255,255,0.06)',
                          color: active ? '#fff' : '#475569',
                          boxShadow: active ? '0 0 16px rgba(59,130,246,0.35)' : 'none',
                          transition: 'background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
                        }}
                      >
                        {step}
                      </div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{
                          color: active ? '#3B82F6' : '#334155',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        Шаг {String(step).padStart(2, '0')}
                      </span>
                    </div>

                    <h3
                      className="text-xl md:text-2xl font-bold mb-3"
                      style={{
                        color: active ? '#F8FAFC' : '#475569',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: active ? '#94A3B8' : '#334155',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {body}
                    </p>
                    <p className="text-xs text-[#3B82F6] font-medium mt-2">{metric}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE — simple vertical steps list */}
        <div className="md:hidden flex flex-col gap-6 mt-8">
          {STEPS.map((s) => (
            <div key={s.step} className="p-4 rounded-xl border border-white/10">
              <div className="text-blue-400 text-sm font-bold mb-1">ШАГ {s.step}</div>
              <div className="text-white font-semibold">{s.title}</div>
              <div className="text-[#94A3B8] text-sm mt-1">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
