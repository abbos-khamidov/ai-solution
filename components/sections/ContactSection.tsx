'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function ContactSection() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1419] mb-4">
              Начать бесплатно
            </h2>
            <p className="text-lg text-[#536471]">
              Оставьте контакт — настроим AI-ассистента под ваш бизнес за 2 часа
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <h3 className="text-2xl font-bold text-[#0F1419]">Заявка принята!</h3>
              <p className="text-[#536471]">Свяжемся с вами в течение 30 минут.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0F1419] mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-[#0F1419] bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F1419] mb-2">
                  Telegram или Email
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="@username или email@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-[#0F1419] bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !name.trim() || !contact.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Отправляем...</span>
                ) : (
                  <>
                    Получить демо
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-xs text-center text-[#8899A6]">
                Никакого спама. Только по делу.
              </p>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-[#536471]">
            Или напишите напрямую в Telegram:{' '}
            <a href="https://t.me/aisolution" className="text-blue-600 font-medium hover:underline">
              @aisolution
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
