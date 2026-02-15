'use client';

/**
 * Footer - Minimal premium footer (i18n enabled)
 */

import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    [t('footer.product')]: [
      { label: t('footer.links.solutions'), href: '#features' },
      { label: t('footer.links.process'), href: '#process' },
      { label: t('footer.links.pricing'), href: '#' },
      { label: t('footer.links.enterprise'), href: '#' },
    ],
    [t('footer.company')]: [
      { label: t('footer.links.about'), href: '#about' },
      { label: t('footer.links.careers'), href: '#' },
      { label: t('footer.links.blog'), href: '#' },
      { label: t('footer.links.press'), href: '#' },
    ],
    [t('footer.resources')]: [
      { label: t('footer.links.documentation'), href: '#' },
      { label: t('footer.links.apiReference'), href: '#' },
      { label: t('footer.links.status'), href: '#' },
      { label: t('footer.links.support'), href: '#' },
    ],
  };

  return (
    <footer className="relative bg-[#0F1419] text-white">
      {/* Gradient top edge */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D9FF] flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">ai</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">
                aisolution
              </span>
            </div>
            <p className="text-sm text-[#8899A6] leading-relaxed mb-6">
              {t('footer.brand')}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#8899A6]" />
                  </a>
                );
              })}
            </div>
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
                      className="text-sm text-[#8899A6] hover:text-white transition-colors inline-flex items-center gap-1"
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
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#8899A6] hover:text-white transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-xs text-[#8899A6] hover:text-white transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
