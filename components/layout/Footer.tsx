'use client';

import React from 'react';

const footerLinks = {
  'Продукт': [
    { label: 'Как работает', href: '#process' },
    { label: 'Тарифы', href: '#pricing' },
    { label: 'Каналы связи', href: '#process' },
  ],
  'Компания': [
    { label: 'О нас', href: '#solutions' },
    { label: 'Контакты', href: '#contact' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#0F1419] text-white">
      {/* Gradient top edge */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D9FF] flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">AI</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">
                AI Solution
              </span>
            </div>
            <p className="text-sm text-[#8899A6] leading-relaxed">
              AI-ассистенты для автоматизации продаж. Отвечаем клиентам за 30 секунд в Telegram, Instagram и WhatsApp.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#8899A6] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8899A6]">
            &copy; {new Date().getFullYear()} AI Solution. Все права защищены.
          </p>
          <p className="text-xs text-[#8899A6]">
            hello@aisolution.ai
          </p>
        </div>
      </div>
    </footer>
  );
}
