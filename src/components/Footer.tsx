import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    services: [
      { name: 'Telegram боты', href: '#services' },
      { name: 'Автоматизация', href: '#services' },
      { name: 'Внедрение ИИ', href: '#services' },
      { name: 'Кастомная разработка', href: '#services' },
    ],
    company: [
      { name: 'О нас', href: '#about' },
      { name: 'Кейсы', href: '#cases' },
      { name: 'Контакты', href: '#contact' },
    ],
  };

  const socials = [
    { icon: MessageCircle, href: 'https://t.me/aisolution_uz', label: 'Telegram' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="relative bg-[#030303] border-t border-white/5 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-bold text-white">aisolution</h3>
            </div>
            <p className="text-[#888] mb-6 max-w-md text-sm leading-relaxed">
              Создаем AI-решения, которые автоматизируют бизнес и увеличивают прибыль.
              Telegram боты, внедрение ИИ, кастомная разработка.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@aisolution.uz"
                className="flex items-center gap-3 text-[#888] hover:text-[#D4A853] transition-colors group text-sm"
              >
                <div className="w-9 h-9 rounded-lg glass flex items-center justify-center group-hover:border-[#D4A853]/30 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@aisolution.uz</span>
              </a>
              <a
                href="https://t.me/aisolution_uz"
                className="flex items-center gap-3 text-[#888] hover:text-[#D4A853] transition-colors group text-sm"
              >
                <div className="w-9 h-9 rounded-lg glass flex items-center justify-center group-hover:border-[#D4A853]/30 transition-all">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>@aisolution_uz</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-[#E8E8E8]">Услуги</h4>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-[#888] hover:text-[#D4A853] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-[#E8E8E8]">Компания</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-[#888] hover:text-[#D4A853] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#555] text-sm">
            © {currentYear} aisolution
          </p>

          <div className="flex gap-3">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[#888] hover:text-[#D4A853] hover:border-[#D4A853]/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#444]">
            Все права защищены. Политика конфиденциальности
          </p>
        </div>
      </div>
    </footer>
  );
}
