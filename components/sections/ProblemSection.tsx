'use client';

import React, { useState, useEffect, useRef } from 'react';
import { XCircle } from 'lucide-react';

const pains = [
  'Менеджер отвечает через 4 часа — клиент уже у конкурента',
  'Ночью и в выходные заявки теряются — никто не отвечает',
  'Повторяющиеся вопросы съедают 60% рабочего времени',
];

const TICK_MS = 100;
const AMOUNT_PER_TICK = (30 * 300 * 0.3) / (24 * 3600) * (TICK_MS / 1000); // ~0.003125

const metrics = [
  { value: '4 часа',  label: 'столько ждёт клиент ответа от менеджера' },
  { value: '30%',     label: 'лидов уходит к конкурентам пока вы спите' },
  { value: '$0',      label: 'зарабатывает ваш отдел продаж ночью' },
];

function formatMoney(n: number): string {
  const [int, dec] = n.toFixed(2).split('.');
  const formatted = Number(int).toLocaleString('en-US');
  return `$${formatted}.${dec}`;
}

export function ProblemSection() {
  const [amount, setAmount] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    setAmount(0);
    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      setAmount(elapsed * (30 * 300 * 0.3) / (24 * 3600));
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const handleReset = () => {
    startRef.current = Date.now();
    setAmount(0);
  };

  return (
    <section
      className="py-16 md:py-24 bg-[#05050A] relative overflow-hidden"
      id="about"
    >
      {/* Subtle red radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(239,68,68,0.05), transparent)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
        {/* Heading */}
        <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B] mb-4">
          прямо сейчас
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-16">
          Пока вы читаете эту страницу...
        </h2>

        {/* Counter block */}
        <div className="mb-4">
          <div
            className="tabular-nums font-black leading-none"
            style={{
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              background: 'linear-gradient(135deg, #EF4444, #F97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {formatMoney(amount)}
          </div>
        </div>

        <p className="text-base text-[#94A3B8] mb-2">потеряно на пропущенных заявках</p>
        <p className="text-xs text-[#475569] mb-5">
          расчёт: 30 лидов/день × средний чек $300 × 30% потерь
        </p>

        <button
          onClick={handleReset}
          className="text-xs text-[#334155] hover:text-[#64748B] transition-colors duration-200 underline underline-offset-2"
        >
          Начать заново
        </button>

        {/* Pain points */}
        <div className="mt-10 text-left max-w-xl mx-auto">
          {pains.map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-3"
              style={i > 0 ? { borderTop: '1px solid rgba(255,255,255,0.05)' } : undefined}
            >
              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-[#94A3B8]">{text}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="my-14 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
        />

        {/* Three metrics */}
        <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col items-center px-8 py-6 sm:py-0 gap-2 w-full sm:w-auto">
              <span
                className="text-4xl font-bold tabular-nums"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {m.value}
              </span>
              <span className="text-sm text-[#64748B] max-w-[160px] leading-snug">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
