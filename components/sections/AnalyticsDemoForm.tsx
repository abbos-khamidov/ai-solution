'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics/gtag';

type DemoFormState = {
  name: string;
  company: string;
  contact: string;
  role: string;
  goal: string;
};

const INITIAL_STATE: DemoFormState = {
  name: '',
  company: '',
  contact: '',
  role: '',
  goal: '',
};

export function AnalyticsDemoForm() {
  const [form, setForm] = useState<DemoFormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const isValid = form.name.trim() && form.contact.trim();

  const setField = (key: keyof DemoFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          contact: form.contact.trim(),
          company: form.company.trim(),
          message:
            `Запрос: Демо AI-аналитики\n` +
            `Роль: ${form.role.trim() || '-'}\n` +
            `Цель: ${form.goal.trim() || '-'}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      track('form_submit_analytics_demo', {
        location: 'product_ai_analytics',
        form: 'analytics_demo',
      });

      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch {
      setSubmitError('Не удалось отправить заявку. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div id="demo" className="rounded-2xl p-6 border border-emerald-400/30 bg-emerald-500/10">
        <p className="text-lg font-semibold text-emerald-100">Демо-заявка отправлена</p>
        <p className="mt-2 text-sm text-emerald-50/90">
          Спасибо! Покажем, как AI-аналитика работает на ваших данных.
        </p>
      </div>
    );
  }

  return (
    <div id="demo">
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder="Имя *"
          required
          className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <input
          type="text"
          value={form.company}
          onChange={(e) => setField('company', e.target.value)}
          placeholder="Компания"
          className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <input
          type="text"
          value={form.contact}
          onChange={(e) => setField('contact', e.target.value)}
          placeholder="Телефон / Telegram *"
          required
          className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <input
          type="text"
          value={form.role}
          onChange={(e) => setField('role', e.target.value)}
          placeholder="Роль (CEO / Sales / Marketing / Finance)"
          className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <textarea
          value={form.goal}
          onChange={(e) => setField('goal', e.target.value)}
          rows={4}
          placeholder="Какие отчеты и метрики нужны в первую очередь?"
          className="md:col-span-2 rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <button
          type="submit"
          disabled={loading || !isValid}
          className="md:col-span-2 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-[#0B1220] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Отправка...' : 'Получить демо'}
        </button>
      </form>
      {submitError ? <p className="mt-3 text-sm text-rose-200">{submitError}</p> : null}
    </div>
  );
}
