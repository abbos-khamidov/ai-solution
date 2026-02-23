'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics/gtag';

type FormState = {
  name: string;
  company: string;
  contact: string;
  niche: string;
  goal: string;
};

const INITIAL_STATE: FormState = {
  name: '',
  company: '',
  contact: '',
  niche: '',
  goal: '',
};

export function AiBusinessAuditForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const isValid = form.name.trim() && form.contact.trim();

  const onChange = (key: keyof FormState, value: string) => {
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
          message: `Ниша: ${form.niche.trim() || '-'}\nЗадача: ${form.goal.trim() || '-'}`,
        }),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      track('form_submit_audit', {
        location: 'ai_dlya_biznesa',
        form: 'audit',
      });
      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch {
      setSubmitError('Не удалось отправить форму. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div id="audit" className="rounded-2xl p-6 border border-emerald-400/30 bg-emerald-500/10">
        <p className="text-lg font-semibold text-emerald-100">Заявка отправлена</p>
        <p className="mt-2 text-sm text-emerald-50/90">
          Спасибо! Мы свяжемся с вами, чтобы согласовать аудит бизнеса.
        </p>
      </div>
    );
  }

  return (
    <div id="audit">
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Имя *"
          required
          className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <input
          type="text"
          value={form.company}
          onChange={(e) => onChange('company', e.target.value)}
          placeholder="Компания"
          className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <input
          type="text"
          value={form.contact}
          onChange={(e) => onChange('contact', e.target.value)}
          placeholder="Телефон / Telegram *"
          required
          className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <input
          type="text"
          value={form.niche}
          onChange={(e) => onChange('niche', e.target.value)}
          placeholder="Сфера бизнеса"
          className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <textarea
          value={form.goal}
          onChange={(e) => onChange('goal', e.target.value)}
          rows={4}
          placeholder="Что хотите автоматизировать?"
          className="md:col-span-2 rounded-lg px-4 py-3 bg-white/10 border border-white/20 placeholder:text-slate-300 text-white outline-none focus:ring-2 focus:ring-[#3B82F6]/40"
        />
        <button
          type="submit"
          disabled={loading || !isValid}
          className="md:col-span-2 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-[#0B1220] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Отправка...' : 'Получить аудит бизнеса'}
        </button>
      </form>
      {submitError ? <p className="mt-3 text-sm text-rose-200">{submitError}</p> : null}
    </div>
  );
}
