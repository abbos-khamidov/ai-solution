'use client';

import React from 'react';
import { MessageSquare, Target, Bell, UserCheck, Send, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const stepKeys = [
  { number: '1', icon: MessageSquare, titleKey: 'solution.step1Title' as const, descKey: 'solution.step1Desc' as const },
  { number: '2', icon: Target, titleKey: 'solution.step2Title' as const, descKey: 'solution.step2Desc' as const },
  { number: '3', icon: Bell, titleKey: 'solution.step3Title' as const, descKey: 'solution.step3Desc' as const },
  { number: '4', icon: UserCheck, titleKey: 'solution.step4Title' as const, descKey: 'solution.step4Desc' as const },
];

const channels: { name: string; icon: React.ElementType; available: boolean; soon?: boolean }[] = [
  { name: 'Telegram', icon: Send, available: true },
  { name: 'Instagram', icon: Instagram, available: true },
  { name: 'WhatsApp', icon: MessageSquare, available: false, soon: true },
];

export function SolutionSection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="process" style={{ background: '#0D0D1A' }}>
      {/* Subtle gradient */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.06), transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal duration={0.6}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-4">
              {t('solution.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
              {t('solution.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stepKeys.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal
                key={idx}
                direction="up"
                duration={0.6}
                delay={idx * 0.1}
              >
                <div className="relative text-center group">
                  {/* Step number with gradient */}
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] opacity-20 group-hover:opacity-30 transition-opacity" />
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        padding: '2px',
                        background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        borderRadius: '9999px',
                      }}
                    />
                    <span className="relative text-gradient font-bold text-lg">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <Icon className="w-7 h-7 text-[#3B82F6]" />
                  </div>

                  <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-sm text-[#64748B]">
                    {t(step.descKey)}
                  </p>
                  {idx < stepKeys.length - 1 && (
                    <div className="hidden lg:block absolute top-7 -right-3 w-6">
                      <svg width="24" height="2" viewBox="0 0 24 2" className="text-white/10">
                        <line x1="0" y1="1" x2="24" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      </svg>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Channels */}
        <ScrollReveal duration={0.6} delay={0.4}>
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-6 text-center">
              {t('solution.channelsTitle')}
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              {channels.map((channel, idx) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                      channel.available
                        ? 'hover:border-[#3B82F6]/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                        : 'opacity-50'
                    }`}
                    style={{
                      background: channel.available ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${channel.available ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'}`,
                    }}
                  >
                    <Icon className={`w-5 h-5 ${channel.available ? 'text-[#3B82F6]' : 'text-[#64748B]'}`} />
                    <span className={`font-semibold ${channel.available ? 'text-[#F8FAFC]' : 'text-[#64748B]'}`}>
                      {channel.name}
                    </span>
                    {channel.soon && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: '#FBBF24',
                          border: '1px solid rgba(245, 158, 11, 0.2)',
                        }}
                      >
                        {t('solution.soon')}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-[#64748B] mt-6">
              {t('solution.channelsNote')}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
